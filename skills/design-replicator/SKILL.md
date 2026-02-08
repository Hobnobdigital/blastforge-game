---
name: design-replicator
description: "Pixel-perfect 1:1 replication of document designs, website layouts, flyers, brochures, and presentations from images or screenshots. Converts source designs into editable HTML/CSS, PDF, or PowerPoint (.pptx) with exact text placement, font matching, image positioning, colors, and layout structure. Use when the user provides an image/screenshot/PDF of a design and wants an identical editable reproduction. Triggers on: 'replicate this design', 'copy this layout', 'recreate this document', 'convert to editable', 'match this exactly', screenshot-to-code, design-to-document, or any request to reproduce a visual design faithfully."
---

# Design Replicator

Pixel-perfect 1:1 replication of any visual design into editable formats.

## Workflow Overview

```
Source Image/PDF → Vision Analysis → Layout Extraction → Output Generation → Visual QA → Iterate
```

**Supported outputs:** HTML/CSS, PDF (via HTML→PDF), editable PowerPoint (.pptx)

---

## Step 1: Analyze the Source

### Vision Analysis (Claude's Eyes)

When given a source image, extract ALL of the following:

```
LAYOUT ANALYSIS CHECKLIST:
□ Overall dimensions and aspect ratio
□ Background color(s) / gradients / images
□ Grid structure (columns, rows, sections)
□ Every text element: content, approximate position, size, weight, color, alignment
□ Every image: position, dimensions, aspect ratio, description
□ Spacing: margins, padding, gaps between elements
□ Typography: font family identification, sizes, weights, line heights
□ Colors: exact hex values (sample from the image)
□ Decorative elements: borders, lines, shapes, icons, shadows
□ Z-index/layering: what overlaps what
```

### Font Identification

Identify fonts by visual characteristics:

| Characteristic | Common Matches |
|---------------|---------------|
| Geometric sans-serif | Montserrat, Poppins, Raleway, Futura |
| Humanist sans-serif | Open Sans, Lato, Source Sans Pro, Nunito |
| Neo-grotesque | Inter, Roboto, Helvetica Neue, Arial |
| Modern serif | Playfair Display, Merriweather, Lora |
| Slab serif | Roboto Slab, Bitter, Arvo |
| Monospace | JetBrains Mono, Fira Code, Source Code Pro |
| Script/handwritten | Dancing Script, Pacifico, Caveat |
| Condensed | Oswald, Barlow Condensed, Roboto Condensed |
| Display/bold | Anton, Bebas Neue, Impact |

**Process:**
1. Describe font characteristics (serif vs sans, weight, width, x-height)
2. Match to closest Google Font or system font
3. If uncertain, provide 2-3 candidates and note which is primary choice
4. Use Google Fonts CDN: `https://fonts.googleapis.com/css2?family=Font+Name:wght@300;400;600;700`

### Color Extraction

Describe colors precisely. When analyzing an image:
- Use CSS color values: `#hex`, `rgb()`, `hsl()`
- Note opacity/transparency
- Identify primary, secondary, accent, and background colors
- Check text colors against backgrounds for contrast

---

## Step 2: Generate Output

### Output A: HTML/CSS (Recommended for Most Cases)

**This is the highest-fidelity output.** Use absolute or CSS Grid positioning for pixel-perfect placement.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Document Title]</title>
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=[Font]&display=swap" rel="stylesheet">
  <style>
    /* Reset */
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    /* Page container - match source dimensions exactly */
    .page {
      width: [exact_width]px;
      height: [exact_height]px;
      position: relative;
      overflow: hidden;
      background: [background];
      font-family: '[Font]', sans-serif;
    }

    /* Position every element absolutely for pixel-perfect placement */
    .element {
      position: absolute;
      left: [x]px;
      top: [y]px;
      width: [w]px;
      height: [h]px;
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- Each element positioned exactly -->
  </div>
</body>
</html>
```

**Key rules for HTML output:**
- Use `position: absolute` for exact placement when layout is fixed
- Use CSS Grid/Flexbox when layout has clear grid structure
- Include ALL spacing as explicit values (no `auto`)
- Match font-size in `px` (not em/rem) for exact reproduction
- Use `line-height` in px for exact text spacing
- Include `letter-spacing` if text appears tracked
- Set exact `width` on text containers to match line breaks
- Use `background-size: cover` or exact dimensions for images

### Output B: PDF (via HTML)

Generate HTML first (as above), then convert:

```javascript
// Using Puppeteer (Node.js)
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Load the HTML file
  await page.goto('file:///path/to/design.html', { waitUntil: 'networkidle0' });

  // Set viewport to match document dimensions
  await page.setViewport({ width: PAGE_WIDTH, height: PAGE_HEIGHT, deviceScaleFactor: 2 });
  await page.emulateMediaType('screen');

  // Generate PDF with exact dimensions
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

**Alternative: ReportLab (Python) for programmatic PDF:**
```python
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch

c = canvas.Canvas("output.pdf", pagesize=(WIDTH, HEIGHT))
# Place elements at exact coordinates
c.drawString(x, y, "Text content")
c.drawImage("image.png", x, y, width, height)
c.save()
```

### Output C: Editable PowerPoint (.pptx)

Use PptxGenJS (Node.js) for creation from scratch:

```javascript
const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();

// Set slide dimensions to match source (in inches)
// Standard: 10" x 7.5", Widescreen: 13.33" x 7.5"
pptx.defineLayout({ name: 'CUSTOM', width: WIDTH_INCHES, height: HEIGHT_INCHES });
pptx.layout = 'CUSTOM';

const slide = pptx.addSlide();

// Add text at exact position (all values in inches)
slide.addText("Heading Text", {
  x: X_INCHES,        // from left edge
  y: Y_INCHES,        // from top edge
  w: WIDTH_INCHES,    // text box width
  h: HEIGHT_INCHES,   // text box height
  fontSize: FONT_SIZE_PT,
  fontFace: "Font Name",
  color: "HEXCOLOR",  // without #
  bold: true,
  align: "left",      // left, center, right
  valign: "top",      // top, middle, bottom
  margin: 0,          // remove default padding
});

// Add image at exact position
slide.addImage({
  path: "image.png",  // or data: base64
  x: X_INCHES,
  y: Y_INCHES,
  w: WIDTH_INCHES,
  h: HEIGHT_INCHES,
});

// Add shape
slide.addShape(pptx.ShapeType.rect, {
  x: X_INCHES, y: Y_INCHES, w: WIDTH_INCHES, h: HEIGHT_INCHES,
  fill: { color: "HEXCOLOR" },
  line: { color: "HEXCOLOR", width: 1 },
});

pptx.writeFile({ fileName: "output.pptx" });
```

**Coordinate conversion:**
- Pixels to inches: `pixels / 96` (at 96 DPI)
- Points to inches: `points / 72`
- Always set `margin: 0` on text boxes for accurate positioning

---

## Step 3: Visual QA (MANDATORY)

**Never skip this step. Your first render is almost never perfect.**

### QA Process

1. **Render the output** to an image for comparison
2. **Compare side-by-side** with the original source
3. **Check every element** against this list:

```
VISUAL QA CHECKLIST:
□ Overall layout matches source proportions
□ Text content is correct (no typos, no missing text)
□ Text positions match (±5px tolerance)
□ Font sizes match visually
□ Font weights match (bold, regular, light)
□ Text colors match
□ Text alignment matches (left/center/right)
□ Line breaks occur at same positions
□ Images are correct size and position
□ Image aspect ratios preserved
□ Background colors/gradients match
□ Spacing between elements matches
□ Margins from edges match
□ Decorative elements present and positioned
□ No overlapping elements that shouldn't overlap
□ No cut-off text or images
□ Overall "feel" matches the original
```

### For HTML output:
```bash
# Screenshot with Puppeteer
node -e "
const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({headless:'new'});
  const p = await b.newPage();
  await p.setViewport({width:PAGE_WIDTH, height:PAGE_HEIGHT, deviceScaleFactor:2});
  await p.goto('file:///path/to/output.html', {waitUntil:'networkidle0'});
  await p.screenshot({path:'qa-screenshot.png', fullPage:true});
  await b.close();
})();
"
```

### For PPTX output:
```bash
# Convert to images via LibreOffice
python scripts/office/soffice.py --headless --convert-to pdf output.pptx
pdftoppm -jpeg -r 150 output.pdf slide
# Compare slide-01.jpg with source
```

### Iteration Loop

```
Generate → Screenshot → Compare with source → List differences → Fix → Re-screenshot → Compare again
```

**Repeat until visual match is ≥95%.** Common issues to fix:
- Font size off by 1-2px
- Spacing gaps slightly different
- Colors slightly off (re-sample from source)
- Text wrapping differently (adjust container width)
- Missing subtle elements (thin lines, small icons, shadows)

---

## Step 4: Coordinate Extraction Helpers

### Using OCR for Text Positions (Python)

When precision is critical, extract text bounding boxes from the source:

```python
import pytesseract
from pytesseract import Output
import cv2
import json

img = cv2.imread('source_design.png')
data = pytesseract.image_to_data(img, output_type=Output.DICT)

elements = []
for i in range(len(data['text'])):
    if int(data['conf'][i]) > 50 and data['text'][i].strip():
        elements.append({
            'text': data['text'][i],
            'x': data['left'][i],
            'y': data['top'][i],
            'w': data['width'][i],
            'h': data['height'][i],
            'conf': data['conf'][i]
        })

with open('layout_data.json', 'w') as f:
    json.dump(elements, f, indent=2)
```

### Using Claude Vision for Layout Analysis

Prompt for structured extraction:

```
Analyze this design image and extract the EXACT layout as JSON:

{
  "dimensions": { "width": px, "height": px },
  "background": "#hex or gradient description",
  "elements": [
    {
      "type": "text|image|shape|line",
      "content": "text content or image description",
      "x": pixels_from_left,
      "y": pixels_from_top,
      "width": pixels,
      "height": pixels,
      "font": { "family": "name", "size": pt, "weight": "normal|bold", "color": "#hex" },
      "alignment": "left|center|right",
      "zIndex": number
    }
  ]
}

Be precise about positions. Estimate coordinates based on the image dimensions.
```

---

## Common Document Types

### Flyer / Poster (Single Page)
- Use HTML with absolute positioning
- Set page dimensions to match (e.g., 8.5"×11" = 816×1056px at 96dpi)
- Convert to PDF for print

### Multi-page Document
- Use HTML with `@page` CSS rules and page breaks
- Or generate each page separately

### Presentation / Slide Deck
- Use PptxGenJS for editable PPTX
- One slide per page/screen
- All text in editable text boxes

### Website Screenshot
- Use HTML/CSS with responsive structure
- CSS Grid or Flexbox for layout
- Include hover states if visible

### Business Card / Brochure
- HTML with absolute positioning
- Convert to high-DPI PDF (deviceScaleFactor: 3)

---

## Dependencies

```bash
# Node.js
npm install puppeteer pptxgenjs

# Python
pip install pytesseract opencv-python reportlab Pillow pdfplumber

# System
# Tesseract OCR: sudo apt install tesseract-ocr (Linux)
# LibreOffice: for PPTX→PDF conversion
# Poppler: for PDF→image (pdftoppm)
```

---

## Tips for Pixel-Perfect Results

1. **Measure, don't guess.** Use OCR bounding boxes or vision analysis for coordinates.
2. **Font matching is 80% of the battle.** Get the font right and everything looks closer.
3. **Use exact px values.** Never use `em`, `rem`, or `%` for reproduction work.
4. **Set explicit dimensions on everything.** No `auto` widths or heights.
5. **Check line-height.** Default line-height varies by browser/font. Set it explicitly.
6. **Letter-spacing matters.** Headlines often have custom tracking.
7. **Don't forget subtle elements.** Thin dividers, small icons, drop shadows, rounded corners.
8. **Compare at same zoom level.** Screenshots must match source dimensions exactly.
9. **Iterate aggressively.** 3-5 QA rounds is normal for high-fidelity work.
10. **Use deviceScaleFactor: 2** for screenshots to catch sub-pixel rendering issues.
