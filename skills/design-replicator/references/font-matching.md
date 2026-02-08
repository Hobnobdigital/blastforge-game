# Font Matching Reference

## Google Fonts - Most Common Matches

### Sans-Serif Families

| If it looks like... | Use Google Font | CSS |
|---------------------|----------------|-----|
| Helvetica/Arial | Inter, Roboto | `font-family: 'Inter', sans-serif` |
| Futura | Poppins, Raleway | `font-family: 'Poppins', sans-serif` |
| Avenir | Nunito, Nunito Sans | `font-family: 'Nunito Sans', sans-serif` |
| Gotham | Montserrat | `font-family: 'Montserrat', sans-serif` |
| Proxima Nova | Lato, Source Sans 3 | `font-family: 'Lato', sans-serif` |
| SF Pro | Inter, DM Sans | `font-family: 'DM Sans', sans-serif` |
| Gill Sans | Raleway, Cabin | `font-family: 'Cabin', sans-serif` |
| Frutiger | Open Sans, Hind | `font-family: 'Open Sans', sans-serif` |
| Trade Gothic | Oswald, Barlow Condensed | `font-family: 'Oswald', sans-serif` |
| DIN | Work Sans, Space Grotesk | `font-family: 'Space Grotesk', sans-serif` |
| Brandon Grotesque | Josefin Sans | `font-family: 'Josefin Sans', sans-serif` |

### Serif Families

| If it looks like... | Use Google Font | CSS |
|---------------------|----------------|-----|
| Times New Roman | Noto Serif, Libre Baskerville | `font-family: 'Noto Serif', serif` |
| Georgia | Merriweather, Lora | `font-family: 'Merriweather', serif` |
| Garamond | EB Garamond, Cormorant Garamond | `font-family: 'EB Garamond', serif` |
| Bodoni | Playfair Display | `font-family: 'Playfair Display', serif` |
| Baskerville | Libre Baskerville | `font-family: 'Libre Baskerville', serif` |
| Didot | Playfair Display | `font-family: 'Playfair Display', serif` |
| Century | Crimson Text | `font-family: 'Crimson Text', serif` |
| Palatino | Spectral | `font-family: 'Spectral', serif` |

### Display / Bold

| If it looks like... | Use Google Font |
|---------------------|----------------|
| Impact | Anton |
| Bebas | Bebas Neue |
| Futura Bold Condensed | Oswald |
| Ultra bold display | Black Ops One, Righteous |

### Monospace

| If it looks like... | Use Google Font |
|---------------------|----------------|
| Consolas | Fira Code |
| Monaco | JetBrains Mono |
| Courier | Source Code Pro |
| SF Mono | IBM Plex Mono |

## Font Weight Mapping

| CSS Weight | Name | Visual |
|-----------|------|--------|
| 100 | Thin | Very thin strokes |
| 200 | Extra Light | Slightly thicker |
| 300 | Light | Noticeably lighter than normal |
| 400 | Regular/Normal | Standard weight |
| 500 | Medium | Slightly bolder than normal |
| 600 | Semi Bold | Clearly bolder |
| 700 | Bold | Standard bold |
| 800 | Extra Bold | Very bold |
| 900 | Black | Maximum weight |

## Font Size Visual Guide

For documents at 96 DPI:

| Use Case | Typical Size |
|----------|-------------|
| Small caption | 10-11px |
| Body text | 14-16px |
| Subheading | 18-22px |
| Heading | 24-32px |
| Title | 36-48px |
| Hero/display | 48-72px+ |

## Loading Google Fonts

```html
<!-- Single font with multiple weights -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Multiple fonts -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet">
```

## Safe System Font Stacks

When Google Fonts aren't available (e.g., PowerPoint):

```
Sans-serif: Arial, Helvetica, Calibri, Segoe UI
Serif: Georgia, Times New Roman, Garamond, Cambria
Monospace: Consolas, Courier New, Lucida Console
```
