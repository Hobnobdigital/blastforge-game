# Style Bible
**Project:** 3D Bomberman-Inspired Web Game  
**Version:** DRAFT v0.1  
**Status:** 🚧 TO BE DEFINED 🚧

---

## 📋 Purpose
This document defines the visual identity for the game. **ALL assets (3D models, textures, VFX, UI) must conform to this style.**

Use this as reference for:
- AI generation prompts
- Manual asset creation
- QA review (consistency checks)
- Third-party asset selection

---

## 🎨 Visual Direction

### **Core Aesthetic:**
[ ] **Option A: Stylized Low-Poly** (clean, geometric, vibrant)
[ ] **Option B: Voxel/Blocky** (Minecraft-inspired, chunky)
[ ] **Option C: Cartoon/Toon-Shaded** (cel-shading, thick outlines)
[ ] **Option D: Retro PSX** (nostalgic, low-res textures, vertex jitter)
[ ] **Option E: Neon/Cyberpunk** (glowing edges, dark backgrounds)
[ ] **Option F: Custom** (describe below)

**Chosen Direction:** _[TO BE SELECTED]_

**Reference Games/Art:**
- _[Link or describe 3-5 reference images]_
- Example: "Fall Guys meets Splatoon" or "Monument Valley meets Bomberman"

---

## 🌈 Color Palette

### **Primary Colors** (Main gameplay elements)
- **Color 1:** `#RRGGBB` | RGB(r, g, b) | _[Usage: e.g., player characters]_
- **Color 2:** `#RRGGBB` | RGB(r, g, b) | _[Usage: e.g., soft blocks]_
- **Color 3:** `#RRGGBB` | RGB(r, g, b) | _[Usage: e.g., hard blocks]_

### **Secondary Colors** (Accents, power-ups)
- **Accent 1:** `#RRGGBB` | _[Usage: e.g., explosions]_
- **Accent 2:** `#RRGGBB` | _[Usage: e.g., power-up glow]_
- **Accent 3:** `#RRGGBB` | _[Usage: e.g., UI highlights]_

### **Neutral Colors** (Backgrounds, shadows)
- **Background:** `#RRGGBB` | _[Arena floor, sky]_
- **Shadow:** `#RRGGBB` | _[AO, shading]_
- **Highlight:** `#RRGGBB` | _[Specular, edges]_

### **Danger/Warning Colors**
- **Danger:** `#RRGGBB` | _[Bomb fuse, explosion warning]_
- **Safe:** `#RRGGBB` | _[Spawn protection, safe zones]_

**Palette Export:**
```
[Export as .ase (Adobe Swatch), .png (color grid), or CSS variables]
```

**Accessibility:**
- [ ] High contrast for color-blind players (protanopia, deuteranopia, tritanopia)
- [ ] Test with Color Oracle or similar tool
- [ ] Shapes/icons differ beyond color alone

---

## 🔷 Shape Language

### **Characters:**
- **Silhouette:** _[Rounded / Angular / Mix]_
- **Proportions:** _[e.g., "Big head, small body" or "Realistic proportions"]_
- **Details:** _[Simplified / Detailed / Minimal]_
- **Key Shapes:** _[Circles, squares, triangles - which dominate?]_

**Example Guidelines:**
- "All characters use rounded edges (no sharp corners)"
- "Heads are 40% of total height"
- "Primary shapes: circles and rounded rectangles"

### **Environment (Tiles, Blocks):**
- **Grid Alignment:** _[Snap to grid / Organic variation]_
- **Edge Treatment:** _[Beveled / Sharp / Chamfered]_
- **Surface Detail:** _[Smooth / Textured / Paneled]_
- **Scale:** _[1 unit = X meters in-game]_

**Example:**
- "Hard blocks: Perfect cubes with 2mm beveled edges"
- "Soft blocks: Slightly rounded, visible wood grain"

### **UI Elements:**
- **Buttons:** _[Rounded rectangles / Capsules / Hard edges]_
- **Icons:** _[Outlined / Filled / Duotone]_
- **Panels:** _[Flat / Card-style / Glassmorphic]_
- **Corners:** _[Border radius: Xpx]_

---

## 💡 Lighting & Mood

### **Overall Mood:**
- [ ] Bright & Cheerful (high saturation, even lighting)
- [ ] Dramatic & Intense (high contrast, dark shadows)
- [ ] Mysterious & Moody (low-key, fog/haze)
- [ ] Retro & Nostalgic (flat lighting, low dynamic range)

**Chosen Mood:** _[TO BE SELECTED]_

### **Lighting Setup (For 3D Scenes):**
- **Primary Light:** _[Direction, color, intensity]_
  - Example: "Sun from 45° angle, warm yellow (#FFF8DC), intensity 1.2"
- **Ambient Light:** _[Color, intensity]_
  - Example: "Cool blue (#B0C4DE), intensity 0.3"
- **Shadows:** _[Hard / Soft / None]_
  - Example: "Soft shadows, 50% opacity"
- **HDRI:** _[Link to Poly Haven HDRI or describe]_

### **VFX Lighting:**
- **Explosions:** _[Bloom intensity, glow color, falloff]_
- **Power-Ups:** _[Glow/aura strength, pulse animation]_
- **UI Feedback:** _[Flash intensity, duration]_

**Readability Rule (Critical):**
> "VFX must never obscure tile state. Max bloom/glow: [X%]. Explosions degrade to simple sprites in heavy scenes."

---

## 🎭 Materials & Finishes

### **PBR Workflow:**
**All textures use:**
- [ ] Metallic/Roughness workflow (Unity, Unreal default)
- [ ] Specular/Glossiness workflow (legacy)

**Map Requirements:**
- Base Color (Albedo)
- Normal Map
- Roughness
- Metallic (or Specular)
- Ambient Occlusion (AO)

### **Material Categories:**

#### **Hard Blocks (Indestructible):**
- **Material Type:** _[Stone / Metal / Concrete / Crystal]_
- **Roughness Range:** _[0.0 = mirror, 1.0 = matte]_
- **Metallic:** _[Yes/No, value]_
- **Surface Detail:** _[Smooth / Chipped / Weathered]_

**Example:**
- "Concrete: Roughness 0.7, Metallic 0.0, subtle cracks in normal map"

#### **Soft Blocks (Destructible):**
- **Material Type:** _[Wood / Fabric / Cardboard / Ice]_
- **Roughness Range:** _[...]_
- **Breakability Visual:** _[Cracks pre-destruction? Splintering?]_

**Example:**
- "Wooden crates: Roughness 0.8, visible grain, cracks appear 0.5s before explosion"

#### **Floor Tiles:**
- **Material Type:** _[Grass / Stone / Tile / Metal Grating]_
- **Roughness:** _[...]_
- **Tiling:** _[Seamless, X units per repeat]_

#### **Characters:**
- **Skin/Clothing:** _[Matte / Slightly glossy / Velvet]_
- **Eyes:** _[Emissive glow? Reflective?]_
- **Accessories:** _[Metallic highlights, fabric cloth sim?]_

---

## ✏️ Line Weight & Outlining

### **Toon/Cel-Shading:**
- [ ] **Enabled** (thick black outlines, flat shading)
- [ ] **Disabled** (standard PBR shading)

**If Enabled:**
- **Outline Thickness:** _[1-3px at standard camera distance]_
- **Outline Color:** _[Black / Dark brown / Colored per object]_
- **Shading Bands:** _[2-tone / 3-tone / Gradient]_

**Example:**
- "2-pixel black outlines on all objects. 3-tone cel-shading (shadow, mid, highlight)."

---

## 🖋️ Typography

### **Primary Font (Headings, Titles):**
- **Font Family:** _[e.g., "Poppins", "Montserrat", custom]_
- **Weight:** _[Bold / ExtraBold / Black]_
- **Style:** _[Sans-serif / Serif / Display / Handwritten]_
- **Use Cases:** Game title, level names, victory screen

**Example:**
- "Poppins ExtraBold, all-caps, 2px letter-spacing"

### **Secondary Font (Body Text, UI):**
- **Font Family:** _[e.g., "Inter", "Roboto"]_
- **Weight:** _[Regular / Medium]_
- **Use Cases:** Menu text, tooltips, HUD labels

### **Monospace Font (Stats, Timers):**
- **Font Family:** _[e.g., "JetBrains Mono", "Courier"]_
- **Use Cases:** Timer, bomb count, score

**Font Licensing:**
- [ ] Google Fonts (SIL Open Font License)
- [ ] Adobe Fonts (subscription required)
- [ ] Custom/Paid (link to license)

**Text Effects:**
- **Drop Shadow:** _[Yes/No, color, offset]_
- **Stroke/Outline:** _[Thickness, color]_
- **Gradient:** _[Yes/No, colors]_

**Example:**
- "Poppins ExtraBold with 4px white stroke, 2px black drop shadow"

---

## 🎯 UI Style Guidelines

### **Overall Style:**
- [ ] Flat Design (no shadows, 2D shapes)
- [ ] Skeuomorphic (realistic textures, 3D buttons)
- [ ] Neumorphic (soft shadows, embossed)
- [ ] Glassmorphic (frosted glass, blur effects)
- [ ] Custom (describe)

**Chosen Style:** _[TO BE SELECTED]_

### **Button Design:**
**States (Must define all 4):**
1. **Normal:** _[Color, shadow, border]_
2. **Hover:** _[Change on mouse-over]_
3. **Pressed:** _[Active/click state]_
4. **Disabled:** _[Grayed out]_

**Example:**
```
Normal: Blue (#4A90E2), 4px drop shadow, 8px border radius
Hover: Lighter blue (#6BA3E8), glow effect
Pressed: Darker blue (#3A70C2), inner shadow
Disabled: Gray (#CCCCCC), 50% opacity
```

### **Icon Design:**
- **Size:** _[Base size in px, e.g., 64x64]_
- **Padding:** _[% of icon reserved for margin]_
- **Style:** _[Outlined / Filled / Duotone / Line art]_
- **Stroke Width:** _[If outlined, e.g., 3px]_
- **Background:** _[Transparent / Solid / Gradient / Frame]_

**Consistency Rule:**
> "All power-up icons must use [frame shape, e.g., octagon] with [glow color] and [icon style]."

**Example:**
- "64x64px, 10% padding, filled duotone style, octagonal frame, cyan glow"

### **Panel/Modal Design:**
- **Background:** _[Color, opacity, blur]_
- **Border:** _[Thickness, color, style]_
- **Drop Shadow:** _[Offset, blur, color]_
- **Corner Radius:** _[px]_

**Example:**
- "Dark blue (#1A1A3E) at 90% opacity, 2px white border, 16px corner radius, 8px shadow"

---

## 🎬 Animation Principles

### **Character Animation:**
- **Style:** _[Realistic / Exaggerated / Snappy]_
- **Timing:** _[Slow-in-slow-out / Linear / Elastic]_
- **Keyframe Count:** _[Low (puppet-like) / High (smooth)]_

**Example:**
- "Walk cycle: 12 frames, exaggerated bounce, slow-in-slow-out easing"

### **UI Animation:**
- **Transitions:** _[Fade / Slide / Scale / None]_
- **Duration:** _[ms]_
- **Easing:** _[Ease-in-out / Cubic-bezier / Spring]_

**Example:**
- "Button hover: 150ms ease-in-out scale to 1.05x"
- "Menu open: 300ms slide-in from left with ease-out"

### **VFX Animation:**
- **Explosion Frames:** _[8-12 frames recommended]_
- **Framerate:** _[30fps / 60fps]_
- **Loop:** _[Yes/No for particle effects]_

**Example:**
- "Explosion: 10 frames at 60fps, no loop. Power-up sparkle: 8 frames looping at 30fps."

---

## 🔍 Readability Checklist (Critical)

**Section 6 Requirements (Spec):**
- [ ] **Tile Clarity:** Player can distinguish walkable vs blocked at max zoom-out
- [ ] **Block Types:** Hard vs soft blocks instantly recognizable (color + shape)
- [ ] **Bomb State:** Fuse countdown visible (color change? Flashing?)
- [ ] **Power-Up Rarity:** Visually distinct tiers (e.g., glow intensity)
- [ ] **Explosion Warning:** Tiles about to explode telegraph clearly (pulse? Outline?)
- [ ] **UI Legibility:** HUD readable at 1280x720 minimum
- [ ] **Color-Blind Safe:** Shapes/icons differ beyond color
- [ ] **No Offscreen Cheap Deaths:** Hazards have audio/visual cues

**Test Scenario:**
> "8 players, 20 explosions on screen. Can player still see safe tiles?"

**VFX Degradation (Performance):**
- **Low Stress:** Full particle effects, bloom, glow
- **Medium Stress:** Reduce particle count by 50%
- **High Stress:** Switch to simple sprite explosions, disable bloom

---

## 📐 Technical Specifications

### **3D Models:**
- **Polygon Budget:**
  - Minor props: <1,000 tris
  - Tiles/blocks: <2,000 tris
  - Characters: <10,000 tris
  - Hero assets: <20,000 tris
- **Pivot Point:** _[Center bottom / World origin / Custom]_
- **Scale:** _[1 unit = 1 meter in-game]_
- **Topology:** Clean quads preferred, no N-gons

### **Textures:**
- **Resolution:**
  - Minor assets: 512x512 or 1024x1024
  - Standard assets: 2048x2048
  - Hero assets: 4096x4096 (downscale to 2K for web)
- **Format:** PNG (source), WebP/Basis Universal (web)
- **Channels:** sRGB for color, Linear for data (normal, roughness)
- **Tiling:** Power-of-2 dimensions (512, 1024, 2048)

### **VFX Sprites:**
- **Resolution:** 512x512 per frame (smaller if low-detail)
- **Format:** PNG with alpha (source), WebP (web)
- **Framerate:** 30-60fps
- **Sprite Sheet Layout:** _[Grid / Packed / Separate files]_

### **UI Elements:**
- **Source Format:** SVG (vector, scalable) or high-res PNG (2x-4x target size)
- **Web Format:** PNG or WebP at 1x, 2x (Retina) sizes
- **Icon Grid:** Align to 8px grid for crispness

---

## 🎨 Prompt Templates (AI Generation)

### **3D Model Generation (Meshy.ai):**
```
[Object], [style from aesthetic], [shape language keywords], 
[material type], [color palette colors], game asset, 
low-poly, PBR textures, clean topology, [specific details]

Example:
"Soft destructible block, stylized low-poly, rounded edges, 
wooden crate material, warm brown (#8B4513) and tan (#D2B48C), 
game asset, low-poly, PBR textures, clean topology, visible wood grain"
```

**Settings:**
- Art Style: _[Low Poly / Realistic / Stylized]_
- Topology: Game-Optimized
- Texture Resolution: 2K

---

### **Texture Generation (DALL-E/Stable Diffusion):**
```
[Material] texture, [style], [color palette], seamless tileable, 
4K resolution, PBR, [specific details], clean, game asset

Negative: photorealistic, text, watermark, low quality, blurry

Example:
"Stone brick texture, stylized low-poly, gray (#808080) with 
moss green (#556B2F) accents, seamless tileable, 4K resolution, 
PBR, slight weathering, clean, game asset"

Negative: photorealistic, text, watermark, low quality, blurry
```

---

### **VFX Sprite Generation (DALL-E/SD):**
```
[Effect type] sprite, [style], [color palette], frame [N] of [total], 
2D game VFX, transparent background, high contrast, [specific details]

Negative: 3D render, realistic, blurry, text

Example:
"Explosion sprite, cartoon style, bright orange (#FF6600) and 
yellow (#FFD700), thick black outlines, frame 5 of 10, 
2D game VFX, transparent background, high contrast, radial burst"

Negative: 3D render, realistic, blurry, text, smoke only
```

---

### **UI Icon Generation (DALL-E):**
```
[Icon subject], game UI icon, [style], [frame shape], 
[color palette], [specific details], 512x512, flat design, 
sharp edges, transparent background

Negative: 3D, realistic, blurry, text, watermark

Example:
"Speed boost power-up icon, game UI icon, stylized, octagonal frame, 
bright cyan (#00FFFF) glow, lightning bolt symbol, 512x512, 
flat design, sharp edges, transparent background"

Negative: 3D, realistic, blurry, text, watermark
```

---

## ✅ Style Consistency QA Process

**Before Asset Approval:**
1. [ ] Compare against style bible (this doc)
2. [ ] Check color palette adherence (extract dominant colors)
3. [ ] Verify shape language (rounded vs angular)
4. [ ] Test readability at gameplay scale
5. [ ] Place next to 3 existing assets (does it fit?)

**Batch QA (Every 10 Assets):**
1. [ ] Visual grid review (all 10 side-by-side)
2. [ ] Color consistency score (manual or CLIP similarity)
3. [ ] Lighting/shadow consistency
4. [ ] Material property consistency (roughness, metallic)

**Final QA (90% Consistency Target):**
- Random sample 30 UI icons → 90%+ must look like one set
- Random sample 10 3D models → 90%+ must share style
- If below 90%, regenerate outliers

---

## 📚 Reference Materials

**Mood Board:**
- _[Link to Figma, Miro, or image folder]_
- _[Include 10-20 reference images]_

**Inspiration Games:**
1. _[Game Name]_ - _[What to borrow: color palette? Shape language?]_
2. _[Game Name]_ - _[...]_
3. _[Game Name]_ - _[...]_

**Art Style References:**
- _[Link to ArtStation, Pinterest boards, etc.]_

---

## 🚧 Status & Next Steps

**Current Status:** 🚧 **DRAFT - Awaiting Design Review** 🚧

**To Complete This Document:**
1. [ ] Choose visual direction (low-poly, voxel, toon, etc.)
2. [ ] Define color palette (primary, secondary, neutral)
3. [ ] Establish shape language (rounded vs angular)
4. [ ] Select lighting mood (bright vs dramatic)
5. [ ] Define material properties (roughness, metallic ranges)
6. [ ] Choose typography (fonts for headings, body, stats)
7. [ ] Design UI style (flat, neumorphic, glassmorphic)
8. [ ] Create mood board (10-20 reference images)
9. [ ] Generate 5-10 test assets to validate style
10. [ ] Stakeholder review & approval

**Once Approved:**
- Lock this document (version control)
- Use as reference for ALL asset generation
- Update only with formal change requests

---

**Document Version:** 0.1 (DRAFT)  
**Last Updated:** 2025-01-XX  
**Maintained By:** Asset Pipeline Engineer + Art Director
