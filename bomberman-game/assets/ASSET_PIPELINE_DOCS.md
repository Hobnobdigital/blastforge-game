# Asset Pipeline Documentation
**Project:** 3D Bomberman-Inspired Web Game  
**Version:** 1.0  
**Purpose:** Complete guide to asset creation, sourcing, and optimization workflows

---

## 📋 Table of Contents
1. [Overview](#overview)
2. [Folder Structure](#folder-structure)
3. [Workflow: Sourcing Free Assets](#workflow-sourcing-free-assets)
4. [Workflow: AI 3D Model Generation](#workflow-ai-3d-model-generation)
5. [Workflow: AI Texture Generation](#workflow-ai-texture-generation)
6. [Workflow: AI VFX Generation](#workflow-ai-vfx-generation)
7. [Workflow: UI Icon Generation](#workflow-ui-icon-generation)
8. [Asset Optimization](#asset-optimization)
9. [Metadata Logging](#metadata-logging)
10. [QA & Approval Process](#qa-approval-process)
11. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

### **Pipeline Goals:**
1. **Speed:** Generate/source assets 10x faster than manual creation
2. **Consistency:** 90%+ visual coherence across all assets
3. **Quality:** AAA polish, web-optimized, <50MB total
4. **Legal Safety:** CC0/licensed sources, IP-safe AI generation
5. **Reproducibility:** Every asset logged with full metadata

### **Key Technologies:**
- **3D Generation:** Meshy.ai (text-to-3D, image-to-3D)
- **Image Generation:** DALL-E 3, Midjourney, Stable Diffusion
- **Texture Sources:** Poly Haven, ambientCG, LotPixel
- **3D Model Sources:** Kenney.nl, OpenGameArt, Sketchfab (CC-BY)
- **VFX Sources:** itch.io sprite packs
- **Optimization:** gltf-pipeline, ImageMagick, Texture Packer

---

## 📂 Folder Structure

```
/home/ec2-user/clawd/bomberman-game/assets/
├── ASSET_MANIFEST.md              ← Master inventory & sourcing guide
├── STYLE_BIBLE.md                 ← Visual identity reference
├── ASSET_PIPELINE_DOCS.md         ← This file
├── generation-logs/               ← JSON metadata for AI assets
│   ├── soft_block_wood_v1.json
│   ├── explosion_core_v2.json
│   └── ...
├── models/
│   ├── raw/                       ← Source files (Blender, FBX, OBJ)
│   │   ├── characters/
│   │   ├── tiles/
│   │   ├── bombs/
│   │   ├── powerups/
│   │   └── props/
│   └── processed/                 ← Web-optimized (GLTF, compressed)
├── textures/
│   ├── raw/                       ← Source (4K, uncompressed PNG)
│   └── processed/                 ← Optimized (2K, WebP/Basis)
├── vfx/
│   ├── raw/                       ← Source sprite sheets (PNG sequences)
│   └── processed/                 ← Atlases, compressed
├── ui/
│   ├── raw/                       ← Source (SVG, high-res PNG)
│   └── processed/                 ← Web-optimized (PNG, WebP)
└── audio/
    ├── sfx/
    ├── music/
    └── ui/
```

---

## 🌐 Workflow: Sourcing Free Assets

### **Step 1: Identify Needed Asset**
Refer to `ASSET_MANIFEST.md` → "Asset Inventory & Requirements" section.

**Example:**
> Need: Hard block texture (stone material)

---

### **Step 2: Search CC0 Sources (Priority Order)**

#### **A) Poly Haven (Textures, HDRIs)**
1. Go to https://polyhaven.com/textures
2. Search: "stone" or "concrete"
3. Filter: Sort by downloads (popular = quality)
4. Download:
   - Resolution: 2K or 4K
   - Maps: Albedo, Normal, Roughness, Displacement
   - Format: PNG or EXR

**Download Example:**
```bash
cd /home/ec2-user/clawd/bomberman-game/assets/textures/raw/tiles/
wget https://polyhaven.com/path/to/stone_texture_2k.zip
unzip stone_texture_2k.zip -d stone_hard_block_v1/
```

#### **B) Kenney.nl (3D Models, UI)**
1. Go to https://kenney.nl/assets
2. Browse: "3D Models" or "UI Packs"
3. Download pack (e.g., "UI Adventure Pack")
4. Extract to appropriate `/raw/` folder

**Download Example:**
```bash
cd /home/ec2-user/clawd/bomberman-game/assets/ui/raw/
wget https://kenney.nl/content/3-ui-pack/ui-pack-adventure.zip
unzip ui-pack-adventure.zip -d kenney_ui_adventure/
```

#### **C) OpenGameArt (CC0 Filter)**
1. Go to https://opengameart.org
2. Search: Asset type (e.g., "low poly sword")
3. Filter: License → "CC0"
4. Download .blend or .obj files

#### **D) itch.io (VFX Sprite Sheets)**
1. Go to https://itch.io/game-assets/free/tag-explosions
2. Browse free packs
3. Download (usually .zip with PNG sequences)

**Download Example:**
```bash
cd /home/ec2-user/clawd/bomberman-game/assets/vfx/raw/explosions/
# (Manual download from itch.io, then upload to server)
unzip explosion_pixel_pack.zip -d explosion_pixel_v1/
```

---

### **Step 3: Attribution Logging (If CC-BY)**

If asset requires attribution (not CC0):
1. Open `ASSET_MANIFEST.md`
2. Scroll to "Attribution Log"
3. Add entry:

```markdown
### Stone Texture - Hard Block
- **Source:** https://example.com/stone-texture
- **Creator:** ExampleArtist
- **License:** CC-BY 4.0
- **Files:** tile_hard_stone_v1_albedo.png, tile_hard_stone_v1_normal.png
- **Modifications:** None
```

---

### **Step 4: Organize & Rename**

Follow naming convention:
```
[category]_[description]_[variant]_v[version].[ext]
```

**Example:**
```bash
mv stone_texture_2k_albedo.png tile_hard_stone_v1_albedo.png
mv stone_texture_2k_normal.png tile_hard_stone_v1_normal.png
mv stone_texture_2k_roughness.png tile_hard_stone_v1_roughness.png
```

---

## 🤖 Workflow: AI 3D Model Generation

### **Tool: Meshy.ai**

#### **Step 1: Set Up Account**
1. Go to https://www.meshy.ai
2. Sign up (free tier available)
3. Confirm model export formats: GLTF, FBX, OBJ

---

#### **Step 2: Prepare Prompt**
Reference `STYLE_BIBLE.md` for:
- Aesthetic (low-poly, toon, etc.)
- Color palette
- Shape language
- Material properties

**Prompt Template:**
```
[Object], [style from aesthetic], [shape language], 
[material type], [color palette], game asset, 
low-poly, PBR textures, clean topology, [details]
```

**Example Prompt:**
```
Soft destructible block, stylized low-poly, rounded edges, 
wooden crate material, warm brown (#8B4513) and tan (#D2B48C), 
game asset, low-poly, PBR textures, clean topology, 
visible wood grain, slight weathering
```

---

#### **Step 3: Generate Model**
1. In Meshy.ai interface:
   - **Input:** Text prompt (paste from above)
   - **Art Style:** Low Poly (or match style bible)
   - **Topology:** Game-Optimized
   - **Texture Resolution:** 2K
2. Click **Generate**
3. Wait 30-60 seconds

---

#### **Step 4: Review & Refine**
1. View 3D preview in Meshy
2. Check:
   - [ ] Matches style bible (shape, color)
   - [ ] Poly count <10k triangles
   - [ ] Textures look correct (no artifacts)
3. If unsatisfactory:
   - Adjust prompt (more specific)
   - Regenerate (try 2-3 iterations)

---

#### **Step 5: Export**
1. Download:
   - Format: **GLTF 2.0** (with embedded textures) or separate textures
   - Include: Albedo, Normal, Roughness, Metallic maps
2. Save to `/models/raw/[category]/`

**Example:**
```bash
cd /home/ec2-user/clawd/bomberman-game/assets/models/raw/tiles/
# Download from Meshy UI, then:
mv meshy_export_12345.gltf soft_block_wood_v1.gltf
```

---

#### **Step 6: Log Metadata (MANDATORY)**
Create JSON log in `/generation-logs/`:

**Template: `soft_block_wood_v1.json`**
```json
{
  "asset_id": "soft_block_wood_v1",
  "type": "3D Model",
  "category": "tiles",
  "created": "2025-01-15T14:32:00Z",
  "tool": "Meshy.ai v4.0",
  "prompt": "Soft destructible block, stylized low-poly, rounded edges, wooden crate material, warm brown (#8B4513) and tan (#D2B48C), game asset, low-poly, PBR textures, clean topology, visible wood grain, slight weathering",
  "negative_prompt": "realistic, high-poly, text, watermark",
  "settings": {
    "art_style": "Low Poly",
    "topology": "Game-Optimized",
    "texture_resolution": "2K",
    "model_version": "Meshy 4.0"
  },
  "seed": "N/A",
  "license": "Commercial use per Meshy.ai TOS (verify current terms)",
  "files": [
    "soft_block_wood_v1.gltf",
    "soft_block_wood_v1_albedo.png",
    "soft_block_wood_v1_normal.png",
    "soft_block_wood_v1_roughness.png",
    "soft_block_wood_v1_metallic.png"
  ],
  "poly_count": 2847,
  "texture_size": "2048x2048",
  "post_processing": "None (pending QA)",
  "version": 1,
  "approved": false,
  "notes": "First iteration; may need slight color adjustment"
}
```

**Create File:**
```bash
cd /home/ec2-user/clawd/bomberman-game/assets/generation-logs/
nano soft_block_wood_v1.json
# Paste JSON, save (Ctrl+O, Enter, Ctrl+X)
```

---

#### **Step 7: Import to Blender (QA)**
1. Open Blender
2. `File → Import → glTF 2.0`
3. Check:
   - [ ] Model displays correctly
   - [ ] Textures load (albedo, normal, roughness)
   - [ ] Poly count acceptable (see info panel)
   - [ ] No inverted normals or holes
4. If issues: Re-export from Meshy or manually fix

---

#### **Step 8: Optimize (if needed)**
- **Reduce poly count:** Blender → Modifiers → Decimate (target <10k tris)
- **Re-export:** `File → Export → glTF 2.0` → Save to `/processed/`

---

## 🎨 Workflow: AI Texture Generation

### **Tools: DALL-E 3, Stable Diffusion, or Midjourney**

#### **Step 1: Prepare Prompt**
Reference `STYLE_BIBLE.md` → "Prompt Templates" section.

**Template:**
```
[Material] texture, [style], [color palette], seamless tileable, 
4K resolution, PBR, [details], clean, game asset

Negative: photorealistic, text, watermark, low quality, blurry
```

**Example:**
```
Stone brick texture, stylized low-poly, gray (#808080) with 
moss green (#556B2F) accents, seamless tileable, 4K resolution, 
PBR, slight weathering, clean, game asset

Negative: photorealistic, text, watermark, low quality, blurry
```

---

#### **Step 2: Generate Base Texture (DALL-E 3)**
1. Go to ChatGPT (Plus subscription) or DALL-E API
2. Input prompt
3. Generate 4 variations
4. Select best match to style bible
5. Download (usually 1024x1024 or 1792x1024)

---

#### **Step 3: Make Seamless (If Needed)**
**Option A: Photoshop/GIMP**
1. Open texture in Photoshop
2. `Filter → Other → Offset` (50% width/height)
3. Use Clone Stamp to fix seams
4. Save as PNG

**Option B: AI Seamless Tool**
- Use online tool (e.g., "Seamless Texture Generator")
- Or Stable Diffusion with inpainting

---

#### **Step 4: Generate PBR Maps**
**Option A: AI Generation (Stable Diffusion + ControlNet)**
- Generate Normal map from albedo using ControlNet
- Generate Roughness map (grayscale, darker = rougher)

**Option B: Materialize (Free Tool)**
1. Download Materialize: https://boundingboxsoftware.com/materialize/
2. Load albedo texture
3. Auto-generate: Normal, Height, AO, Roughness
4. Export all maps

**Option C: Poly Haven / ambientCG**
- Download complete PBR set (already has all maps)

---

#### **Step 5: Save & Log**
```bash
cd /home/ec2-user/clawd/bomberman-game/assets/textures/raw/tiles/
# Save generated textures:
# tile_hard_stone_v1_albedo.png (4096x4096)
# tile_hard_stone_v1_normal.png
# tile_hard_stone_v1_roughness.png
# tile_hard_stone_v1_ao.png
```

**Create Log:**
```json
{
  "asset_id": "tile_hard_stone_v1",
  "type": "Texture (PBR)",
  "category": "textures/tiles",
  "created": "2025-01-15T15:00:00Z",
  "tool": "DALL-E 3 + Materialize",
  "prompt": "Stone brick texture, stylized low-poly, gray (#808080) with moss green (#556B2F) accents, seamless tileable, 4K resolution, PBR, slight weathering, clean, game asset",
  "negative_prompt": "photorealistic, text, watermark, low quality, blurry",
  "settings": {
    "dalle_model": "DALL-E 3",
    "resolution": "1792x1024 (upscaled to 4096x4096)",
    "seamless": "Manual offset + clone stamp",
    "pbr_generation": "Materialize v1.3"
  },
  "files": [
    "tile_hard_stone_v1_albedo.png",
    "tile_hard_stone_v1_normal.png",
    "tile_hard_stone_v1_roughness.png",
    "tile_hard_stone_v1_ao.png"
  ],
  "license": "Commercial use per OpenAI TOS",
  "approved": false
}
```

---

## ✨ Workflow: AI VFX Generation

### **Tool: DALL-E 3 or Stable Diffusion**

#### **Step 1: Plan Sprite Sheet**
- **Frame Count:** 8-12 frames for explosion
- **Resolution:** 512x512 per frame
- **Style:** Match style bible (cartoon, realistic, pixel art)

---

#### **Step 2: Generate Keyframes**
**Prompt Template:**
```
[Effect] sprite, [style], [color palette], frame [N] of [total], 
2D game VFX, transparent background, high contrast, [details]

Negative: 3D render, realistic, blurry, text
```

**Example (Frame 1 of 10):**
```
Explosion sprite, cartoon style, bright orange (#FF6600) and 
yellow (#FFD700), thick black outlines, frame 1 of 10, 
2D game VFX, transparent background, high contrast, small fireball

Negative: 3D render, realistic, blurry, text, smoke only
```

**Generate frames 1, 3, 5, 7, 10** (keyframes) first.

---

#### **Step 3: Generate In-Betweens (Optional)**
- Use img2img in Stable Diffusion
- Provide frame N and frame N+2, ask for interpolation
- Or manually adjust prompts ("frame 2 of 10, slightly larger fireball")

---

#### **Step 4: Remove Backgrounds**
**Option A: Remove.bg**
1. Upload each frame to https://remove.bg
2. Download PNG with transparent background

**Option B: Photoshop/GIMP**
1. Magic Wand → Delete background
2. Save as PNG with alpha

---

#### **Step 5: Compile Sprite Sheet**
**Option A: Texture Packer**
1. Download Texture Packer: https://www.codeandweb.com/texturepacker
2. Drag all frames into Texture Packer
3. Settings:
   - Layout: Grid (if uniform) or Optimal (if sizes vary)
   - Format: PNG
   - Data format: JSON (for engine integration)
4. Export: `explosion_core_v1.png` + `explosion_core_v1.json`

**Option B: ImageMagick (CLI)**
```bash
cd /home/ec2-user/clawd/bomberman-game/assets/vfx/raw/explosions/
montage explosion_frame*.png -tile 4x3 -geometry +0+0 -background none explosion_core_v1_sheet.png
```

---

#### **Step 6: Save & Log**
```json
{
  "asset_id": "explosion_core_v1",
  "type": "VFX Sprite Sheet",
  "category": "vfx/explosions",
  "created": "2025-01-15T16:00:00Z",
  "tool": "DALL-E 3 + Remove.bg + Texture Packer",
  "prompt": "Explosion sprite, cartoon style, bright orange (#FF6600) and yellow (#FFD700), thick black outlines, frame [N] of 10, 2D game VFX, transparent background, high contrast",
  "negative_prompt": "3D render, realistic, blurry, text, smoke only",
  "settings": {
    "frame_count": 10,
    "frame_size": "512x512",
    "sprite_sheet_layout": "4x3 grid",
    "framerate": "60fps"
  },
  "files": [
    "explosion_core_v1_sheet.png",
    "explosion_core_v1.json",
    "explosion_frame01.png (source)",
    "explosion_frame02.png (source)",
    "..."
  ],
  "license": "Commercial use per OpenAI TOS",
  "approved": false
}
```

---

## 🖼️ Workflow: UI Icon Generation

### **Tool: DALL-E 3**

#### **Step 1: Batch Prompts**
Create prompt list for all icons needed (e.g., 50 icons).

**Template:**
```
[Icon subject], game UI icon, [style], [frame shape], 
[color palette], [details], 512x512, flat design, 
sharp edges, transparent background

Negative: 3D, realistic, blurry, text, watermark
```

**Example (Speed Boost):**
```
Speed boost power-up icon, game UI icon, stylized, octagonal frame, 
bright cyan (#00FFFF) glow, lightning bolt symbol, 512x512, 
flat design, sharp edges, transparent background

Negative: 3D, realistic, blurry, text, watermark
```

---

#### **Step 2: Generate Batch**
1. Use ChatGPT with DALL-E 3
2. Input 10 prompts at once (or use API for automation)
3. Download all 10 icons
4. Review batch for consistency

**Consistency Check:**
- Same frame shape?
- Same glow intensity?
- Same line weight?

If >10% look different, adjust prompts.

---

#### **Step 3: Post-Processing**
**Option A: Photoshop/GIMP**
1. Open icon
2. Apply consistent drop shadow (e.g., 4px, 50% opacity)
3. Add outer glow (if needed)
4. Resize to exact 512x512 (crop/scale)

**Option B: Batch Script (ImageMagick)**
```bash
cd /home/ec2-user/clawd/bomberman-game/assets/ui/raw/icons/
for file in powerup_*.png; do
  convert "$file" -resize 512x512 -background none -gravity center -extent 512x512 "${file%.png}_processed.png"
done
```

---

#### **Step 4: Save & Log**
```json
{
  "asset_id": "powerup_speed_icon_v1",
  "type": "UI Icon",
  "category": "ui/icons",
  "created": "2025-01-15T17:00:00Z",
  "tool": "DALL-E 3 + Photoshop",
  "prompt": "Speed boost power-up icon, game UI icon, stylized, octagonal frame, bright cyan (#00FFFF) glow, lightning bolt symbol, 512x512, flat design, sharp edges, transparent background",
  "negative_prompt": "3D, realistic, blurry, text, watermark",
  "settings": {
    "size": "512x512",
    "format": "PNG with alpha"
  },
  "files": [
    "powerup_speed_icon_v1.png"
  ],
  "post_processing": "4px drop shadow added in Photoshop",
  "license": "Commercial use per OpenAI TOS",
  "approved": false
}
```

---

## ⚙️ Asset Optimization

### **3D Models (GLTF Compression)**

**Tool: gltf-pipeline (Khronos official)**

#### **Install:**
```bash
npm install -g gltf-pipeline
```

#### **Optimize:**
```bash
cd /home/ec2-user/clawd/bomberman-game/assets/models/raw/tiles/
gltf-pipeline -i soft_block_wood_v1.gltf -o ../processed/tiles/soft_block_wood_v1.glb --draco.compressionLevel 10
```

**Options:**
- `--draco`: Enable Draco mesh compression (70-90% size reduction)
- `--draco.compressionLevel 10`: Max compression
- `-o .glb`: Binary GLTF (smaller than text .gltf)

**Expected Results:**
- Before: 5MB (.gltf + textures)
- After: 500KB (.glb with Draco)

---

### **Textures (WebP/Basis Universal)**

#### **WebP Compression (ImageMagick):**
```bash
cd /home/ec2-user/clawd/bomberman-game/assets/textures/raw/tiles/
convert tile_hard_stone_v1_albedo.png -resize 2048x2048 -quality 90 ../processed/tiles/tile_hard_stone_v1_albedo.webp
```

**Batch Script:**
```bash
for file in *.png; do
  convert "$file" -resize 2048x2048 -quality 90 "../processed/${file%.png}.webp"
done
```

#### **Basis Universal (Better for WebGL):**
```bash
npm install -g basis-universal
cd /home/ec2-user/clawd/bomberman-game/assets/textures/raw/tiles/
basisu tile_hard_stone_v1_albedo.png -output_path ../processed/tiles/
```

**Benefits:**
- GPU-native compression (faster decoding)
- ~50% smaller than PNG
- Supports mipmaps

---

### **VFX Sprite Sheets (WebP + Atlasing)**

#### **Compress Sprite Sheets:**
```bash
cd /home/ec2-user/clawd/bomberman-game/assets/vfx/raw/explosions/
convert explosion_core_v1_sheet.png -quality 90 ../processed/explosions/explosion_core_v1_sheet.webp
```

#### **Create Texture Atlas (Texture Packer):**
- Combine multiple sprite sheets into one atlas
- Reduces draw calls (1 texture instead of 10)

---

### **UI Icons (Multi-Resolution + WebP)**

#### **Generate 1x and 2x:**
```bash
cd /home/ec2-user/clawd/bomberman-game/assets/ui/raw/icons/
# 1x (512px)
convert powerup_speed_icon_v1.png -resize 512x512 ../processed/icons/powerup_speed_icon_v1.png
# 2x (1024px for Retina)
convert powerup_speed_icon_v1.png -resize 1024x1024 ../processed/icons/powerup_speed_icon_v1@2x.png
# WebP versions
convert ../processed/icons/powerup_speed_icon_v1.png -quality 90 ../processed/icons/powerup_speed_icon_v1.webp
```

---

## 📝 Metadata Logging

### **Why Log Metadata?**
- **Reproducibility:** Regenerate any asset with exact settings
- **Legal Safety:** Track licenses, terms, sources
- **Version Control:** Manage iterations (v1, v2, v3)
- **QA Traceability:** Identify which prompt/tool created an asset

---

### **Mandatory Fields (Section 8 Spec):**
```json
{
  "asset_id": "unique_name_v1",
  "type": "3D Model | Texture | VFX | UI",
  "category": "models/tiles | textures/characters | etc.",
  "created": "ISO 8601 timestamp",
  "tool": "Meshy.ai v4.0 | DALL-E 3 | etc.",
  "prompt": "Full text prompt",
  "negative_prompt": "If applicable",
  "settings": {
    "key": "value (model version, resolution, etc.)"
  },
  "seed": "If supported (Stable Diffusion, Meshy)",
  "license": "Commercial use per [TOS/License]",
  "files": ["list", "of", "files"],
  "post_processing": "None | Blender cleanup | etc.",
  "version": 1,
  "approved": false,
  "notes": "Optional comments"
}
```

---

### **File Naming:**
```
/generation-logs/[asset_id].json
```

**Example:**
```
/generation-logs/soft_block_wood_v1.json
/generation-logs/explosion_core_v2.json
/generation-logs/powerup_speed_icon_v1.json
```

---

### **Automation (Optional):**
**Python Script: `log_asset.py`**
```python
import json
from datetime import datetime

def log_asset(asset_id, asset_type, tool, prompt, files):
    log = {
        "asset_id": asset_id,
        "type": asset_type,
        "created": datetime.utcnow().isoformat() + "Z",
        "tool": tool,
        "prompt": prompt,
        "files": files,
        "approved": False
    }
    with open(f"generation-logs/{asset_id}.json", "w") as f:
        json.dump(log, f, indent=2)
    print(f"Logged: {asset_id}.json")

# Usage:
log_asset("soft_block_wood_v1", "3D Model", "Meshy.ai v4.0", 
          "Soft destructible block...", ["soft_block_wood_v1.gltf"])
```

---

## ✅ QA & Approval Process

### **Phase 1: Individual Asset QA**
**For Each Asset (Before Approval):**
1. [ ] **Matches Style Bible:**
   - Color palette adherence
   - Shape language consistency
   - Lighting/material properties
2. [ ] **Technical Specs Met:**
   - Poly count <10k (3D models)
   - Texture resolution 2K (standard) or 4K (hero)
   - File size acceptable
3. [ ] **Readability Test:**
   - View at gameplay camera distance
   - Distinguishable from similar assets
4. [ ] **Metadata Logged:**
   - JSON file exists in `/generation-logs/`
   - All mandatory fields filled

**Approval:**
- Update `approved: true` in JSON log
- Move to `/processed/` folder (if optimization done)

---

### **Phase 2: Batch Consistency QA**
**Every 10 Assets Generated:**
1. [ ] **Visual Grid Review:**
   - Display all 10 assets side-by-side
   - Manual review by 3-person panel
   - Vote: Does this batch look cohesive?
2. [ ] **Color Consistency:**
   - Extract dominant colors (Photoshop/Python script)
   - Compare to style bible palette
   - Flag outliers (>20% color deviation)
3. [ ] **Shape Consistency:**
   - Edge detection analysis (manual or automated)
   - Check: Rounded vs angular matches style bible

**If <90% Consistency:**
- Regenerate outliers
- Adjust prompts (add style keywords)

---

### **Phase 3: Final 90% Target QA (Spec Requirement)**
**Before Final Approval:**
1. **Random Sample 30 UI Icons:**
   - Manual review: 90%+ must look like one coherent set
   - Scoring: 1 (fits) or 0 (doesn't fit)
   - Pass: ≥27/30 score (90%)
2. **Random Sample 10 3D Models:**
   - Same process: 90%+ consistency
3. **Random Sample 10 Textures:**
   - Material property consistency
   - Lighting coherence

**If Failed:**
- Identify weak areas (e.g., "Icons too varied")
- Regenerate bottom 10% performers
- Re-test

---

## 🛠️ Troubleshooting

### **Issue: AI-Generated Model Has Too Many Polygons**
**Solution:**
1. Blender → Select model → Tab (Edit Mode)
2. Add Modifier → Decimate
3. Set Ratio: 0.5 (reduces by 50%)
4. Apply Modifier
5. Re-export as GLTF

---

### **Issue: Texture Seams Visible (Not Seamless)**
**Solution:**
1. Photoshop: `Filter → Other → Offset` (50% width/height)
2. Use Clone Stamp to fix center seam
3. Or regenerate with "seamless tileable" in prompt

---

### **Issue: VFX Sprite Has White Background (Not Transparent)**
**Solution:**
1. Upload to https://remove.bg
2. Or Photoshop: Magic Wand → Select white → Delete
3. Save as PNG with alpha channel

---

### **Issue: Icon Batch Looks Inconsistent**
**Solution:**
1. Review prompts: Are style keywords identical?
2. Regenerate in single session (AI model state can shift)
3. Use image-to-image with first icon as reference

---

### **Issue: GLTF File Won't Load in Engine**
**Solution:**
1. Validate with glTF Validator: https://github.khronos.org/glTF-Validator/
2. Check errors (e.g., missing textures, invalid UV maps)
3. Re-export from Blender with correct settings

---

### **Issue: Asset Too Large (File Size)**
**Solution:**
1. 3D Models: Use Draco compression (gltf-pipeline)
2. Textures: Reduce resolution (4K → 2K) or use WebP
3. VFX: Use sprite atlases (combine multiple sheets)

---

## 📚 Additional Resources

**Tools:**
- Meshy.ai: https://www.meshy.ai
- gltf-pipeline: https://github.com/CesiumGS/gltf-pipeline
- Texture Packer: https://www.codeandweb.com/texturepacker
- Materialize: https://boundingboxsoftware.com/materialize/
- glTF Validator: https://github.khronos.org/glTF-Validator/

**Learning:**
- Blender PBR Materials: https://www.youtube.com/results?search_query=blender+pbr+tutorial
- Seamless Textures: https://www.youtube.com/results?search_query=seamless+texture+photoshop
- Sprite Sheet Animation: https://www.youtube.com/results?search_query=sprite+sheet+animation+tutorial

**Spec References:**
- Section 7: Art Direction (asset list, style bible)
- Section 8: Generative AI Asset Pipeline (metadata, consistency)

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-XX  
**Maintained By:** Asset Pipeline Engineer
