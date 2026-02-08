# PowerPoint Coordinate System Reference

## Units

PptxGenJS uses **inches** as the default unit.

### Conversion Table

| From | To Inches | Formula |
|------|-----------|---------|
| Pixels (96 DPI) | inches | `px / 96` |
| Pixels (72 DPI) | inches | `px / 72` |
| Points | inches | `pt / 72` |
| Centimeters | inches | `cm / 2.54` |
| EMU | inches | `emu / 914400` |

### Standard Slide Sizes

| Type | Width (in) | Height (in) |
|------|-----------|------------|
| Standard (4:3) | 10 | 7.5 |
| Widescreen (16:9) | 13.33 | 7.5 |
| Widescreen (16:10) | 10 | 6.25 |
| A4 Portrait | 7.5 | 10 |
| A4 Landscape | 10 | 7.5 |
| Letter Portrait | 8.5 | 11 |
| Letter Landscape | 10 | 7.5 |
| Custom | Any | Any |

## PptxGenJS Element Positioning

### Text Box
```javascript
slide.addText("Content", {
  x: 1.0,          // inches from left
  y: 1.0,          // inches from top
  w: 4.0,          // width in inches
  h: 0.5,          // height in inches
  fontSize: 14,    // points
  fontFace: "Arial",
  color: "333333", // hex without #
  bold: false,
  italic: false,
  underline: false,
  align: "left",   // left, center, right, justify
  valign: "top",   // top, middle, bottom
  margin: 0,       // IMPORTANT: set to 0 for exact positioning
  lineSpacing: 20, // points
  charSpacing: 0,  // points (letter-spacing)
  wrap: true,
});
```

### Image
```javascript
slide.addImage({
  path: "path/to/image.png",  // local file
  // OR
  data: "data:image/png;base64,...",  // base64
  x: 1.0,
  y: 1.0,
  w: 4.0,
  h: 3.0,
  rounding: true,  // rounded corners
  sizing: {
    type: "cover",   // cover, contain, crop
    w: 4.0,
    h: 3.0,
  },
});
```

### Shape
```javascript
slide.addShape(pptx.ShapeType.rect, {
  x: 1.0, y: 1.0, w: 4.0, h: 0.5,
  fill: { color: "FF0000" },
  line: { color: "000000", width: 1 },
  rectRadius: 0.1,  // rounded corners in inches
  shadow: {
    type: "outer",
    blur: 3,
    offset: 2,
    angle: 45,
    color: "000000",
    opacity: 0.3,
  },
});
```

### Line
```javascript
slide.addShape(pptx.ShapeType.line, {
  x: 1.0, y: 1.0,
  w: 5.0,  // line length
  h: 0,    // 0 for horizontal
  line: { color: "CCCCCC", width: 1 },
});
```

## Common Gotchas

1. **Text box padding**: Default margin is NOT zero. Always set `margin: 0` for exact positioning.
2. **Font availability**: PowerPoint uses system fonts. Stick to common fonts or embed.
3. **Image resolution**: Use high-res images. Low-res will look blurry when opened.
4. **Color format**: No `#` prefix. Use `"FF0000"` not `"#FF0000"`.
5. **Overlapping elements**: Later additions render on top. Order matters.
