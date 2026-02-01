# Asset Manifest
**Project:** 3D Bomberman-Inspired Web Game (IP-Safe)  
**Created:** 2025-01-XX  
**Purpose:** Complete asset tracking, licensing, sources, and generation workflows

---

## 📋 Asset Inventory & Requirements

### Based on Game Spec Analysis:

#### 🎮 **3D Models** (Section 7: Art Direction)
**Characters/Avatars:**
- [ ] Player character models (4+ unique designs, original IP)
- [ ] Bot/enemy variants (3+ types)
- [ ] Idle, walk, death animations

**Arena Tiles:**
- [ ] Hard blocks (indestructible walls)
- [ ] Soft blocks (destructible, multiple variants)
- [ ] Floor tiles (walkable surface, 3+ material types)
- [ ] Special tiles (twist-related: vents, shafts, ramps/lifts if multi-layer)

**Bombs & Props:**
- [ ] Standard bomb model (with visible fuse state)
- [ ] Bomb variants (if twist requires: primed, shortened fuse visuals)
- [ ] Explosion center/propagation visuals

**Power-Ups (Minimum 5):**
- [ ] +Bomb Count icon/model
- [ ] +Blast Range icon/model
- [ ] +Speed icon/model
- [ ] Twist power-up #1 (original)
- [ ] Twist power-up #2 (original)

**Arena Props:**
- [ ] Spawn platform markers
- [ ] Environmental decoration (genre-appropriate)
- [ ] Hazard indicators

---

#### 🎨 **Textures & Materials** (Section 8)
- [ ] PBR materials for tiles (hard block, soft block variants)
- [ ] Floor material variations (3+ types)
- [ ] Character skin textures
- [ ] Bomb materials
- [ ] Power-up textures
- [ ] UI panel backgrounds
- [ ] Seamless arena environment textures

**Requirements:**
- 2K-4K resolution minimum
- PBR workflow: Albedo, Normal, Roughness, Metallic, AO maps
- Style consistency with Style Bible (to be created)

---

#### ✨ **VFX** (Section 6: Readability Rules)
**Explosions (Critical - Must Look Amazing but Never Obscure Readability):**
- [ ] Explosion core sprite sheets (multi-frame)
- [ ] Cross-pattern blast propagation effects
- [ ] Soft block destruction particles
- [ ] Chain reaction visual feedback
- [ ] LOD variants for performance (heavy scene degradation)

**Power-Ups & Feedback:**
- [ ] Power-up spawn sparkle/glow
- [ ] Pickup collection effect
- [ ] Speed boost trail/aura
- [ ] Blast range indicator particles
- [ ] UI feedback flashes (non-epileptic)

**Environmental:**
- [ ] Fuse burning effect (clearly readable timing)
- [ ] Tile damage pre-destruction telegraph
- [ ] Spawn protection indicator
- [ ] Death/respawn effect

---

#### 🖼️ **UI Elements** (Section 7)
**HUD:**
- [ ] Bomb count indicator
- [ ] Blast range indicator
- [ ] Speed meter
- [ ] Player health/lives
- [ ] Timer display
- [ ] Mini-map (if applicable)

**Menus:**
- [ ] Main menu background
- [ ] Button states (normal, hover, pressed, disabled)
- [ ] Settings panels
- [ ] Tutorial overlays
- [ ] Victory/defeat screens
- [ ] Loading spinner/progress bar

**Icons (90% Consistency Target - Section 8):**
- [ ] Power-up icons (all 5+)
- [ ] Player avatar portraits
- [ ] Map selection thumbnails
- [ ] Game mode icons
- [ ] Settings icons (audio, video, controls)

**Typography:**
- [ ] Primary display font (headers, titles)
- [ ] Secondary UI font (body text, tooltips)
- [ ] Monospace font (if needed for stats)

---

## 🔍 Sourcing Strategy

### **Tier 1: CC0/Public Domain Sources (No Attribution Required)**

#### **Kenney.nl** ⭐ PRIORITY
- **License:** CC0 (Public Domain)
- **Assets Available:** 60,000+ game assets
- **Relevant Categories:**
  - 3D Models: City kits, builder packs, voxel models
  - UI: UI packs (pixel, adventure, space), icons, buttons, panels
  - Audio: 1,200+ SFX (coordinate with audio team)
- **Formats:** PNG, SVG, OBJ, FBX, GLTF
- **URL:** https://kenney.nl/assets
- **Notes:** Clean, consistent aesthetic; perfect for UI and placeholder 3D models

**Recommended Packs:**
- UI Adventure Pack (buttons, panels, icons)
- Voxel Pack (for soft/hard block inspiration)
- Particle Pack (explosion bases)

---

#### **Poly Haven** ⭐ PRIORITY
- **License:** CC0 (Public Domain)
- **Assets Available:** 1,700+ photorealistic assets
- **Relevant Categories:**
  - Textures: 8K+ seamless PBR (wood, metal, concrete, fabric, rocks)
  - HDRIs: 16K+ for arena lighting
  - 3D Models: Photoscanned props (rocks, plants, objects)
- **Formats:** Blender (.blend), FBX, glTF, USD, EXR (HDRIs)
- **URL:** https://polyhaven.com
- **Notes:** Professional quality, no login required

**Recommended Assets:**
- Rock/concrete textures for hard blocks
- Wood textures for soft blocks
- Outdoor HDRIs for lighting reference
- Debris models for destruction effects

---

#### **ambientCG**
- **License:** CC0 (Public Domain)
- **Assets Available:** 1,000+ PBR textures
- **Relevant Categories:** Building materials, ground, fabric, metal
- **URL:** https://ambientcg.com
- **Notes:** No attribution required; high quality

---

#### **OpenGameArt.org** (CC0 Filtered)
- **License:** CC0 (verify per asset)
- **Assets Available:** Low-poly 3D models, textures, sprites
- **Relevant Categories:**
  - Surt's CC0 Scraps (tanks, mechs, fantasy)
  - CC0 Items (low-poly objects, PBR)
  - ShareTextures integration (4K PBR textures)
- **URL:** https://opengameart.org (filter by CC0)
- **Notes:** Verify licenses manually; quality varies

---

### **Tier 2: CC Attribution Sources (Credit Required)**

#### **Sketchfab** (Free Downloads)
- **License:** CC Attribution (most free models)
- **Assets Available:** Millions of 3D models
- **Relevant Categories:**
  - Low-poly game-ready models
  - Characters, props, environments
  - PSX-style retro models
- **URL:** https://sketchfab.com
- **Filter:** Downloadable + sort by license
- **Notes:** Must credit creator; verify commercial use OK

**Attribution Format:**
```
Model: [Name] by [Creator] (Sketchfab), CC-BY 4.0
URL: [link]
```

---

#### **itch.io** (Free VFX)
- **License:** Varies (mostly royalty-free for commercial)
- **Assets Available:** Explosion sprite sheets, particle effects
- **Relevant Categories:**
  - Tags: "explosions," "2D," "free"
  - Pixel art effects packs
  - 60-FPS animated explosions
- **URL:** https://itch.io/game-assets/free/tag-explosions
- **Notes:** Verify license per pack; most allow commercial use

**Recommended Packs:**
- Pixel Explosion Sprite Pack - Let It Explode!
- Free Effect Bullet Impact Explosion 32x32
- Pixel art simulations (explosions | flames | smokes)

---

#### **LotPixel**
- **License:** Free for commercial use (verify terms)
- **Assets Available:** 1,500+ PBR texture sets (up to 8K)
- **Relevant Categories:** Asphalt, brick, concrete, metal, stone, wood
- **URL:** https://www.lotpixel.com (inferred from research)
- **Notes:** Complete PBR map sets; engine-compatible

---

#### **3D Textures** (3dtextures.me)
- **License:** CC0 (seamless PBR)
- **Assets Available:** High-quality seamless textures
- **URL:** https://3dtextures.me
- **Notes:** All essential PBR maps included

---

#### **Free PBR**
- **License:** Royalty-free (commercial use OK)
- **Assets Available:** 600+ materials at 2K resolution
- **URL:** https://freepbr.com
- **Notes:** Metalness/roughness and metallic/smoothness workflows

---

### **Tier 3: Paid Premium Assets (Budget Fallback)**

#### **Poliigon**
- **License:** Paid subscription or per-asset
- **Assets Available:** Curated PBR textures, models
- **URL:** https://www.poliigon.com/textures/free (free samples available)
- **Notes:** Professional quality; use for hero assets if budget allows

---

#### **Unity Asset Store / Unreal Marketplace**
- **License:** Varies (check per asset)
- **Assets Available:** Game-ready packs
- **Notes:** Consider for final polish if free sources insufficient

---

## 🤖 Generative AI Pipeline (Section 8 Requirements)

### **AI Image Generation** (Textures, UI, Concept Art)

#### **Recommended Services:**
1. **DALL-E 3** (via ChatGPT Plus or API)
   - Best for: UI icons, concept art, stylized textures
   - Prompt style: Descriptive, art direction-focused
   - Output: 1024x1024 or 1792x1024 PNG

2. **Midjourney** (via Discord)
   - Best for: High-quality concept art, character designs
   - Prompt style: Cinematic, detailed art direction
   - Output: Up to 2048x2048 (--v 6 or --niji for anime style)

3. **Stable Diffusion** (Local or via Stability AI API)
   - Best for: Batch generation, texture creation, full control
   - Models: SDXL, SD 1.5 + ControlNet for precision
   - Output: Flexible resolution

#### **Prompt Template for Consistency:**
```
[Asset Type], [Style Keywords], [Color Palette], [Material/Finish], 
[Lighting], [Composition], game asset, clean background, 4K resolution, 
professional game art

Negative Prompt: text, watermark, signature, blurry, low quality, 
realistic photo, human face (if not character)

Style Reference: [Attach style bible image or previous asset]
```

**Example Prompts:**
```
Soft Block Texture:
"Wooden crate texture, stylized low-poly game art, warm brown palette, 
slight weathering, soft ambient lighting, seamless tileable, 4K PBR, 
game asset, clean background"
Negative: "realistic photo, text, watermark"

Explosion VFX Frame:
"Cartoon explosion sprite, bright orange and yellow, thick black outlines, 
radial burst pattern, frame 3 of 8, 2D game VFX, transparent background, 
high contrast"
Negative: "3D render, realistic, smoke only"

Power-Up Icon (Speed Boost):
"Speed boost power-up icon, lightning bolt or wing symbol, bright cyan 
glow, octagonal frame, game UI asset, flat design, 512x512, sharp edges"
Negative: "3D, realistic, text, blurry"
```

---

### **AI 3D Model Generation**

#### **Meshy.ai** ⭐ PRIORITY
- **Best For:** Text-to-3D, image-to-3D, production-ready models
- **Features:**
  - Generates models in seconds
  - AI texture editing
  - Rigging/animation (biped, quadruped)
  - Exports: FBX, OBJ, GLTF, USD
- **Workflow:**
  1. Text prompt → 3D model generation
  2. Image reference → Multi-view 3D conversion
  3. AI texture pass for PBR materials
  4. Auto-rigging (if character)
  5. Export with clean mesh topology
- **URL:** https://www.meshy.ai
- **Pricing:** Free tier + paid plans
- **Notes:** 10x faster than manual modeling; may need post-processing

**Example Workflow:**
```
Input Prompt: "Low-poly stylized soft block, wooden crate design, 
game-ready topology, PBR textures"

Settings:
- Art Style: Low Poly
- Topology: Game-Optimized
- Texture Resolution: 2K
- Export: GLTF

Output: soft_block_v1.gltf + textures (albedo, normal, roughness)
```

---

#### **Rodin (Stability AI)**
- **Best For:** High-detail text-to-3D, realistic models
- **Features:** Scalable generation, strong detail coherence
- **Workflow:** Similar to Meshy; focus on realism
- **Notes:** Consider for hero assets or final polish

---

#### **CSM (Common Sense Machines)**
- **Best For:** Intuitive topology, rapid prototyping
- **Features:** Text/image-to-3D, minimal cleanup
- **Notes:** Good for early-stage asset iteration

---

#### **Alternative: Blender + AI Texture Tools**
- **Procedural generation** (Geometry Nodes) for blocks/tiles
- **AI texture plugins** (e.g., Substance 3D Sampler, Polyhaven Blender add-on)
- **Manual modeling** with AI-assisted texturing

---

### **Metadata Tracking (MANDATORY - Section 8)**

Every AI-generated asset MUST log:
1. **Prompt Text** (full prompt used)
2. **Negative Prompt** (if applicable)
3. **Seed/Settings** (model version, steps, CFG scale, etc.)
4. **Version ID / Timestamp** (YYYYMMDD_HHMMSS_assetname_v#)
5. **Tool/Model Used** (e.g., "DALL-E 3 via API," "Meshy.ai v4," "Midjourney --v 6")
6. **License/Terms** (output license; e.g., "Commercial use OK per Meshy TOS")
7. **Export Formats** (PNG, GLTF, FBX, etc.)
8. **Post-Processing Notes** (manual edits, Blender cleanup, etc.)

**Log Format (JSON):**
```json
{
  "asset_id": "soft_block_wood_v1",
  "type": "3D Model",
  "created": "2025-01-15T14:32:00Z",
  "tool": "Meshy.ai v4.0",
  "prompt": "Low-poly stylized soft block, wooden crate design, game-ready topology, PBR textures",
  "negative_prompt": "realistic, high-poly, text",
  "settings": {
    "art_style": "Low Poly",
    "topology": "Game-Optimized",
    "texture_resolution": "2K"
  },
  "seed": "N/A",
  "license": "Commercial use per Meshy TOS",
  "files": [
    "soft_block_wood_v1.gltf",
    "soft_block_wood_v1_albedo.png",
    "soft_block_wood_v1_normal.png"
  ],
  "post_processing": "None",
  "version": 1,
  "approved": true
}
```

Store logs in `/assets/generation-logs/[asset_id].json`

---

### **Style Consistency Enforcement**

#### **Style Bible (To Be Created):**
Must define before AI generation:
1. **Color Palette** (primary, secondary, accent colors)
2. **Shape Language** (rounded vs angular, organic vs geometric)
3. **Lighting Mood** (bright/vibrant vs dark/moody)
4. **Material Rules** (matte vs glossy, rough vs smooth)
5. **Line Weight / Outlining** (toon shaders? cel-shading?)
6. **UI Style** (flat, skeuomorphic, neumorphic)
7. **Typography** (font families, weight, spacing)

**Consistency Workflow:**
1. Generate **style reference sheet** (10-20 sample assets)
2. Use reference images in all AI prompts (img2img, ControlNet, style transfer)
3. Create **prompt template library** (reusable fragments)
4. **Visual QA pass:** Compare new assets against style bible
5. **Batch regeneration** if coherence drops below 90%

**QA Target (Section 8):**
> "Random sample of 30 UI icons: at least 90% look like one coherent set"

**Measurement:**
- Visual similarity scoring (manual review or CLIP embeddings)
- Color palette adherence (extract dominant colors, compare to bible)
- Shape language consistency (edge detection, roundness metrics)

---

## 📂 Asset Organization

### **Folder Structure:**
```
/home/ec2-user/clawd/bomberman-game/assets/
├── ASSET_MANIFEST.md              ← This file
├── STYLE_BIBLE.md                 ← To be created (color, shapes, lighting)
├── generation-logs/               ← JSON logs for every AI asset
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
│   └── processed/                 ← Optimized for web (GLTF, compressed)
│       ├── characters/
│       ├── tiles/
│       └── ...
├── textures/
│   ├── raw/                       ← Source textures (4K, uncompressed)
│   │   ├── tiles/
│   │   ├── characters/
│   │   ├── ui/
│   │   └── environment/
│   └── processed/                 ← Optimized (2K, compressed, atlas)
│       └── ...
├── vfx/
│   ├── raw/                       ← Source sprite sheets (PNG sequences)
│   │   ├── explosions/
│   │   ├── particles/
│   │   ├── powerups/
│   │   └── ui-feedback/
│   └── processed/                 ← Optimized (atlases, compressed)
│       └── ...
├── ui/
│   ├── raw/                       ← Source UI elements (SVG, high-res PNG)
│   │   ├── icons/
│   │   ├── buttons/
│   │   ├── panels/
│   │   ├── fonts/
│   │   └── menus/
│   └── processed/                 ← Web-optimized (PNG, WebP, sprite sheets)
│       └── ...
└── audio/                         ← Coordinate with audio team
    ├── sfx/
    ├── music/
    └── ui/
```

### **Naming Conventions:**
```
[category]_[description]_[variant]_v[version].[ext]

Examples:
- tile_hard_stone_v1.gltf
- tile_soft_wood_v3.gltf
- bomb_standard_primed_v1.gltf
- powerup_speed_icon_v2.png
- explosion_core_frame01_v1.png
- ui_button_primary_hover_v1.svg
```

**Version Suffix:**
- `_v1`, `_v2`, etc. for iterations
- `_final` for approved production assets

---

## 🎯 Asset Acquisition Plan

### **Phase 1: Foundation Assets (Week 1)**
**Goal:** Placeholder/prototype assets for core loop testing

**Sourcing:**
- Kenney.nl: UI elements, placeholders
- Poly Haven: PBR textures for tiles
- itch.io: Explosion sprite sheets

**Tasks:**
1. ✅ Research completed
2. [ ] Download Kenney UI Adventure Pack
3. [ ] Download 10+ Poly Haven textures (stone, wood, metal)
4. [ ] Download 3 explosion sprite packs from itch.io
5. [ ] Organize into `/raw/` folders
6. [ ] Create attribution log for CC-BY assets

**Deliverables:**
- Functional UI mockup (buttons, panels, HUD)
- Textured tiles (hard, soft, floor)
- Basic explosion VFX (sprite sheet)

---

### **Phase 2: AI Generation - Style Bible (Week 2)**
**Goal:** Establish visual identity and generate hero assets

**Tasks:**
1. [ ] Create STYLE_BIBLE.md (palette, shapes, lighting)
2. [ ] Generate 20 concept art pieces (Midjourney/DALL-E)
   - Character designs (5)
   - Arena environments (5)
   - Power-up icons (5)
   - UI themes (5)
3. [ ] Review with stakeholders, select direction
4. [ ] Refine prompt templates based on selected style
5. [ ] Generate style reference sheet (10 assets)

**AI Tools:**
- Midjourney for concept art
- DALL-E 3 for UI icons
- Style transfer for consistency

**Deliverables:**
- STYLE_BIBLE.md (approved)
- Style reference sheet (PNG grid)
- Prompt template library (Markdown)

---

### **Phase 3: AI 3D Model Generation (Week 3)**
**Goal:** Generate original 3D models using Meshy.ai

**Assets to Generate:**
1. **Characters (4 unique designs):**
   - Use Meshy text-to-3D + rigging
   - Export GLTF with animations (idle, walk, death)
2. **Tiles (10+ variants):**
   - Hard blocks (3 materials)
   - Soft blocks (5 materials)
   - Floor tiles (3 materials)
3. **Bombs & Power-Ups (7 items):**
   - Standard bomb + variants
   - 5 power-up models
4. **Props (5+ items):**
   - Spawn platforms, hazard markers

**Workflow Per Asset:**
1. Write prompt (use style bible keywords)
2. Generate in Meshy.ai
3. Export GLTF + textures
4. Log metadata (JSON)
5. Import to Blender for QA
6. Optimize (reduce poly count if >10k tris)
7. Move to `/processed/`

**Deliverables:**
- 30+ original 3D models (GLTF)
- 30+ generation logs (JSON)
- Optimization report (poly counts, texture sizes)

---

### **Phase 4: AI Texture & VFX Generation (Week 3-4)**
**Goal:** Generate original textures and VFX sprites

**Textures (20+):**
- Tile variations (use DALL-E or Stable Diffusion)
- Character skins (if needed beyond Meshy output)
- UI backgrounds

**VFX (15+ sprite sheets):**
- Explosion sequences (8-12 frames each)
  - Core blast
  - Directional propagation
  - Chain reaction
- Power-up effects (spawn, collect)
- UI feedback (button press, pickup)

**Workflow:**
1. Generate with DALL-E/SD (use ControlNet for frame-by-frame)
2. Organize into sprite sheets (Texture Packer or similar)
3. Log metadata
4. Create LOD variants (lower res for heavy scenes)

**Deliverables:**
- 20+ textures (2K PNG, PBR maps)
- 15+ VFX sprite sheets (PNG sequences + atlases)
- Generation logs (JSON)

---

### **Phase 5: UI Polish & Icon Set (Week 4)**
**Goal:** Cohesive UI with 90% consistency

**Tasks:**
1. Generate 50+ UI icons (DALL-E, consistent prompts)
2. Create button states (normal, hover, pressed, disabled)
3. Design menus (main, settings, pause)
4. HUD elements (bomb count, health, timer)
5. Typography selection (Google Fonts or custom)

**QA Process:**
- Generate in batches of 10
- Visual review after each batch
- Regenerate if style drift detected
- Final QA: 30 random icons, score consistency

**Deliverables:**
- 50+ UI icons (SVG + PNG)
- Button library (9-slice or full states)
- Menu mockups (Figma or HTML)
- Typography guide (fonts + usage rules)

---

### **Phase 6: Integration & Optimization (Week 5)**
**Goal:** Prepare all assets for web deployment

**Tasks:**
1. Compress textures (WebP, Basis Universal)
2. Optimize 3D models (Draco compression for GLTF)
3. Create texture atlases (reduce draw calls)
4. Generate mipmaps
5. Test asset loading pipeline (lazy loading, streaming)
6. Final file size audit (target: <50MB total)

**Tools:**
- gltf-pipeline (GLTF optimization)
- ImageMagick / Sharp (texture compression)
- Texture Packer (sprite atlases)

**Deliverables:**
- Optimized asset package (<50MB)
- Asset loading manifest (JSON)
- Performance report (load times, draw calls)

---

## 📊 Quality Assurance Checklist

### **Readability (Section 6 - Critical):**
- [ ] All tile states clearly distinguishable at gameplay camera angle
- [ ] Bomb fuse state visible at all times
- [ ] Explosions never obscure critical gameplay info
- [ ] Power-ups identifiable from silhouette alone
- [ ] UI readable at 1920x1080 and 1280x720
- [ ] Color-blind friendly (strong contrast, icon shapes differ)
- [ ] No essential hazards occur offscreen without warning

**Test Scenario:**
> "Max explosions + max players: can player predict danger tiles correctly?"

---

### **Style Consistency (Section 8 - 90% Target):**
- [ ] Random sample of 30 UI icons: 90%+ look cohesive
- [ ] Color palette adheres to style bible
- [ ] Shape language consistent across all 3D models
- [ ] Lighting mood matches style bible
- [ ] Materials use consistent PBR workflow
- [ ] Line weight / outlining (if any) applied uniformly

**Measurement:**
- Manual visual review (3-person panel, majority vote)
- Color palette extraction (compare dominant colors)
- Edge detection analysis (roundness vs angularity)

---

### **Performance (Section 5):**
- [ ] All 3D models <10k triangles (hero assets <20k)
- [ ] Textures 2K max (1K for minor assets)
- [ ] Sprite sheets power-of-2 dimensions (1024x1024, 2048x2048)
- [ ] Total asset package <50MB compressed
- [ ] Lazy loading implemented for non-critical assets
- [ ] LOD system for VFX (degrade gracefully under stress)

---

### **Legal/IP Safety (Section 1 - Hard Requirement):**
- [ ] No Bomberman characters, names, logos, silhouettes
- [ ] All sourced assets properly licensed (CC0, CC-BY logged)
- [ ] All AI-generated assets comply with tool TOS
- [ ] Attribution file created for CC-BY assets
- [ ] Style bible reviewed for accidental IP infringement

---

## 📝 Attribution Log (CC-BY Assets)

**Format:**
```markdown
### [Asset Name]
- **Source:** [URL]
- **Creator:** [Name]
- **License:** CC-BY 4.0 (or other)
- **Files:** [List of files using this asset]
- **Modifications:** [None / Retextured / Remodeled / etc.]
```

**Example:**
```markdown
### Explosion Sprite Sheet - Pixel Art
- **Source:** https://itch.io/example-pack
- **Creator:** ExampleArtist
- **License:** CC-BY 4.0
- **Files:** explosion_core_v1.png (frames 1-8)
- **Modifications:** Recolored to match style bible (orange → cyan)
```

---

## 🚀 Next Steps

### **Immediate Actions:**
1. ✅ Research asset sources (COMPLETE)
2. ✅ Create folder structure (COMPLETE)
3. ✅ Document sourcing strategy (COMPLETE)
4. [ ] **Download foundation assets (Kenney, Poly Haven, itch.io)**
5. [ ] **Create STYLE_BIBLE.md**
6. [ ] **Set up Meshy.ai account + test workflow**
7. [ ] **Generate 5 test assets (1 texture, 1 3D model, 1 VFX, 2 UI icons)**
8. [ ] **Validate metadata logging system**

### **Coordination:**
- **Audio Team:** Share STYLE_BIBLE.md once created; discuss SFX + music direction
- **Dev Team:** Confirm asset format requirements (GLTF vs FBX, texture compression)
- **Design Team:** Review style bible draft before full AI generation

---

## 📚 References

**Spec Sections:**
- Section 1: Hard Requirements (IP-safe, asset pipeline)
- Section 6: Camera and Readability Rules
- Section 7: Art Direction (asset list, style bible)
- Section 8: Generative AI Asset Pipeline (metadata, consistency)

**External Resources:**
- Kenney.nl: https://kenney.nl/assets
- Poly Haven: https://polyhaven.com
- Meshy.ai: https://www.meshy.ai
- itch.io VFX: https://itch.io/game-assets/free/tag-explosions
- OpenGameArt (CC0): https://opengameart.org

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-XX  
**Maintained By:** Asset Pipeline Engineer (Subagent)
