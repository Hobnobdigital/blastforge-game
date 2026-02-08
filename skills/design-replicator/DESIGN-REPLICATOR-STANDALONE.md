# Design Replicator Skill (Standalone)

Upload this file to Claude Code or Claude.ai as a custom skill for pixel-perfect 1:1 document/design replication.

---

## Purpose

Replicate any document design, website layout, flyer, brochure, or presentation from an image/screenshot into an editable format:
- **HTML/CSS** (highest fidelity)
- **PDF** (via HTML→PDF with Puppeteer)
- **Editable PowerPoint (.pptx)** (via PptxGenJS)

All text, images, shapes, and layout elements are placed at their EXACT original positions.

---

## Step 1: Analyze the Source Design

When given an image of a design to replicate, extract ALL of the following:

### Layout Analysis Prompt

```
Analyze this design and extract the complete layout as structured data:

1. DIMENSIONS: Overall width × height
2. BACKGROUND: Color, gradient, or image
3. GRID: Column/row structure
4. FOR EACH ELEMENT:
   - Type: text / image / shape / line / icon
   - Content: exact text or image description
   - Position: x (from left), y (from top) in pixels
   - Size: width × height in pixels
   - Typography: font family, size (px), weight, color (#hex), alignment
   - Spacing: letter-spacing, line-height, margin around element
5. COLORS: List all unique colors used
6. FONTS: Identify all font families used
7. DECORATIVE: Borders, shadows, rounded corners, overlays
```

### Font Identification

Match fonts to closest Google Fonts:

| Looks Like | Use |
|-----------|-----|
| Helvetica/Arial | Inter, Roboto |
| Futura | Poppins, Raleway |
| Gotham | Montserrat |
| Proxima Nova | Lato |
| Avenir | Nunito Sans |
| Garamond | EB Garamond |
| Bodoni/Didot | Playfair Display |
| Georgia | Merriweather |
| DIN | Work Sans, Space Grotesk |
| Impact | Anton |

Load via: `https://fonts.googleapis.com/css2?family=Font+Name:wght@300;400;600;700&display=swap`

### Color Extraction

- Sample ALL colors from the source image
- Use exact #hex values
- Note opacity if elements are transparent
- Identify: primary, secondary, accent, background, text colors

---

## Step 2: Generate the Output

### Option A: HTML/CSS (Best for Web, PDF, Print)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=[FONT]&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    
    .page {
      width: [WIDTH]px;
      height: [HEIGHT]px;
      position: relative;
      overflow: hidden;
      background: [BG_COLOR];
      font-family: '[FONT]', sans-serif;
    }
    
    /* Position EVERY element with absolute coordinates */
    .el-1 { position: absolute; left: [X]px; top: [Y]px; width: [W]px; height: [H]px; }
  </style>
</head>
<body>
  <div class="page">
    <div class="el-1">[content]</div>
  </div>
</body>
</html>
```

**Rules:**
- Use `position: absolute` for fixed layouts (flyers, posters, documents)
- Use CSS Grid for grid-based layouts (websites)
- ALL sizes in `px` (never em/rem/%)
- Set explicit `line-height` in px
- Set explicit `letter-spacing` if text appears tracked
- Set exact `width` on text containers to match line breaks
- Include ALL decorative elements (borders, shadows, gradients)

### Option B: PDF (via Puppeteer)

Generate HTML first, then:

```javascript
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: PAGE_WIDTH, height: PAGE_HEIGHT, deviceScaleFactor: 2 });
  await page.emulateMediaType('screen');
  await page.goto('file:///path/to/design.html', { waitUntil: 'networkidle0' });
  await page.pdf({
    path: 'output.pdf',
    width: `${PAGE_WIDTH}px`,
    height: `${PAGE_HEIGHT}px`,
    printBackground: true,
    preferCSSPageSize: true,
    scale: 1,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  await browser.close();
})();
```

### Option C: Editable PowerPoint (.pptx)

```javascript
const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();

// Set custom dimensions (convert pixels to inches: px / 96)
pptx.defineLayout({ name: 'CUSTOM', width: W_INCHES, height: H_INCHES });
pptx.layout = 'CUSTOM';

const slide = pptx.addSlide();

// Background
slide.background = { fill: "HEXCOLOR" };

// Text (editable!) - all positions in inches
slide.addText("Heading", {
  x: X/96, y: Y/96, w: W/96, h: H/96,
  fontSize: SIZE_PT,
  fontFace: "Arial",
  color: "333333",    // no # prefix
  bold: true,
  align: "left",
  valign: "top",
  margin: 0,          // CRITICAL: remove default padding
});

// Image
slide.addImage({
  path: "image.png",
  x: X/96, y: Y/96, w: W/96, h: H/96,
});

// Shape (rectangle, line, etc.)
slide.addShape(pptx.ShapeType.rect, {
  x: X/96, y: Y/96, w: W/96, h: H/96,
  fill: { color: "FF0000" },
  rectRadius: 0.05,  // rounded corners
});

pptx.writeFile({ fileName: "output.pptx" });
```

**Key:** `margin: 0` on ALL text boxes. Default padding shifts text positions.

---

## Step 3: Visual QA (MANDATORY - NEVER SKIP)

### QA Checklist

After generating output, screenshot it and compare with the source:

```
□ Overall layout proportions match
□ All text present and correct (no typos/missing)
□ Text positions match (±5px tolerance)
□ Font sizes match visually
□ Font weights correct (bold/regular/light)
□ Text colors match exactly
□ Text alignment correct (left/center/right)
□ Line breaks at same positions
□ Images correct size and position
□ Image aspect ratios preserved
□ Background colors/gradients match
□ Spacing between elements matches
□ Margins from edges match
□ All decorative elements present
□ No overlapping that shouldn't exist
□ No cut-off text or images
□ Overall visual match ≥95%
```

### QA Loop

```
Generate → Screenshot → Compare → List issues → Fix → Re-screenshot → Repeat
```

3-5 rounds is normal. Common fixes:
- Font size off by 1-2px
- Spacing gaps slightly different
- Colors need re-sampling
- Text wrapping differently (adjust container width)
- Missing subtle elements (thin lines, shadows)

---

## Dependencies

```bash
npm install puppeteer pptxgenjs
pip install pytesseract opencv-python reportlab Pillow
```

---

## Quick Reference

| Document Type | Best Output | Method |
|--------------|-------------|--------|
| Flyer/Poster | HTML → PDF | Absolute positioning |
| Brochure | HTML → PDF | Multi-page with @page |
| Presentation | PPTX | PptxGenJS |
| Website | HTML/CSS | Grid/Flexbox |
| Business Card | HTML → PDF | High-DPI (3x) |
| Social Media Post | HTML → PNG | Puppeteer screenshot |

---

## Pro Tips

1. **Font matching is 80% of the battle.** Nail the font and everything looks closer.
2. **Use px for everything.** No relative units for reproduction work.
3. **Set explicit dimensions on every element.** No `auto`.
4. **Set `margin: 0` on PPTX text boxes.** Default padding ruins positioning.
5. **Use `deviceScaleFactor: 2`** for screenshots to catch sub-pixel issues.
6. **Compare at identical zoom levels.** Screenshots must match source dimensions.
7. **Don't forget subtle elements.** Thin dividers, small icons, shadows, corners.
8. **Iterate aggressively.** Perfection takes 3-5 QA rounds.
