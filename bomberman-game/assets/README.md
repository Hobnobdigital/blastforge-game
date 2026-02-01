# 3D Bomberman Game - Asset Library

**Status:** 🚧 In Development  
**Pipeline Version:** 1.0  
**Target:** Premium 3D web game, IP-safe, <50MB total

---

## 📚 Documentation

### **Core Documents:**
1. **[ASSET_MANIFEST.md](ASSET_MANIFEST.md)** ⭐ START HERE
   - Complete asset inventory
   - Sourcing strategy (CC0/licensed sources)
   - AI generation workflows
   - Quality assurance checklists
   - Attribution log

2. **[STYLE_BIBLE.md](STYLE_BIBLE.md)** 🎨 VISUAL REFERENCE
   - Color palette
   - Shape language
   - Lighting & materials
   - Typography
   - UI style guidelines
   - **STATUS:** 🚧 DRAFT - Needs design review

3. **[ASSET_PIPELINE_DOCS.md](ASSET_PIPELINE_DOCS.md)** 🛠️ HOW-TO GUIDE
   - Step-by-step workflows
   - AI generation tutorials
   - Optimization techniques
   - Troubleshooting guide

4. **[PROGRESS_CHECKLIST.md](PROGRESS_CHECKLIST.md)** ✅ TASK TRACKER
   - Phase-by-phase progress
   - Asset acquisition status
   - QA milestones

---

## 📂 Folder Structure

```
assets/
├── README.md                      ← You are here
├── ASSET_MANIFEST.md              ← Master inventory & strategy
├── STYLE_BIBLE.md                 ← Visual identity (DRAFT)
├── ASSET_PIPELINE_DOCS.md         ← Workflows & tutorials
├── PROGRESS_CHECKLIST.md          ← Task tracker
├── generation-logs/               ← JSON metadata for AI assets
├── models/
│   ├── raw/                       ← Source files (Blender, FBX, OBJ)
│   └── processed/                 ← Web-optimized (GLTF, Draco)
├── textures/
│   ├── raw/                       ← Source (4K PNG)
│   └── processed/                 ← Optimized (2K WebP/Basis)
├── vfx/
│   ├── raw/                       ← Sprite sheets (PNG sequences)
│   └── processed/                 ← Atlases, compressed
├── ui/
│   ├── raw/                       ← Source (SVG, high-res PNG)
│   └── processed/                 ← Web-optimized
└── audio/
    ├── sfx/
    ├── music/
    └── ui/
```

---

## 🚀 Quick Start

### **New Team Member?**
1. Read [ASSET_MANIFEST.md](ASSET_MANIFEST.md) (20 min)
2. Review [STYLE_BIBLE.md](STYLE_BIBLE.md) (10 min) — **PENDING APPROVAL**
3. Follow [ASSET_PIPELINE_DOCS.md](ASSET_PIPELINE_DOCS.md) workflows
4. Update [PROGRESS_CHECKLIST.md](PROGRESS_CHECKLIST.md) as you work

### **Need to Generate an Asset?**
1. Check if it exists: Search `ASSET_MANIFEST.md` → "Asset Inventory"
2. If not, choose workflow:
   - **3D Model:** [AI 3D Model Generation](ASSET_PIPELINE_DOCS.md#workflow-ai-3d-model-generation)
   - **Texture:** [AI Texture Generation](ASSET_PIPELINE_DOCS.md#workflow-ai-texture-generation)
   - **VFX:** [AI VFX Generation](ASSET_PIPELINE_DOCS.md#workflow-ai-vfx-generation)
   - **UI Icon:** [UI Icon Generation](ASSET_PIPELINE_DOCS.md#workflow-ui-icon-generation)
3. **MUST LOG METADATA:** Create JSON in `/generation-logs/`

### **Need to Source Free Assets?**
1. Check [ASSET_MANIFEST.md](ASSET_MANIFEST.md) → "Sourcing Strategy"
2. Priority sources:
   - **Textures:** [Poly Haven](https://polyhaven.com) (CC0)
   - **3D Models/UI:** [Kenney.nl](https://kenney.nl/assets) (CC0)
   - **VFX:** [itch.io](https://itch.io/game-assets/free/tag-explosions) (free)
3. Follow [Sourcing Workflow](ASSET_PIPELINE_DOCS.md#workflow-sourcing-free-assets)

---

## ⚠️ Critical Rules

### **IP Safety (Spec Section 1):**
- ❌ NO Bomberman characters, names, logos, or silhouettes
- ✅ All assets must be original or properly licensed
- ✅ Log all CC-BY attributions in ASSET_MANIFEST.md

### **Metadata Tracking (Spec Section 8):**
- **MANDATORY:** Log every AI-generated asset in `/generation-logs/`
- Required fields: prompt, tool, settings, license, files
- Format: JSON (see [template](ASSET_PIPELINE_DOCS.md#metadata-logging))

### **Style Consistency (Spec Section 8):**
- Target: 90%+ coherence across all assets
- Reference STYLE_BIBLE.md for every asset creation
- QA check every 10 assets (see [QA Process](ASSET_PIPELINE_DOCS.md#qa-approval-process))

### **Readability (Spec Section 6):**
- All gameplay elements must be clearly distinguishable
- VFX must NOT obscure critical info
- Test at max stress: 8 players + 20 explosions

---

## 📊 Current Status

**Phase:** Research & Foundation  
**Progress:** 15% (Docs complete, awaiting style bible approval)

**Next Steps:**
1. [ ] Finalize STYLE_BIBLE.md (design review)
2. [ ] Download foundation assets (Kenney, Poly Haven)
3. [ ] Generate 5 test assets (validation)
4. [ ] Begin full production (Week 2)

See [PROGRESS_CHECKLIST.md](PROGRESS_CHECKLIST.md) for detailed status.

---

## 🤝 Team Coordination

**Asset Pipeline Lead:** [Your Name]  
**Coordinate With:**
- **Audio Team:** Share STYLE_BIBLE.md, discuss SFX/music direction
- **Dev Team:** Confirm asset formats (GLTF vs FBX), texture compression
- **Design Team:** Review style bible draft before AI generation

**Questions?** Check [Troubleshooting](ASSET_PIPELINE_DOCS.md#troubleshooting) or ask in team chat.

---

## 📈 Quality Targets

**Performance:**
- Total package: <50MB compressed
- 3D models: <10k tris (standard), <20k (hero)
- Textures: 2K standard, 4K hero (downscale for web)

**Visual:**
- Style consistency: 90%+ (random sample test)
- Readability: 100% (no cheap deaths)
- AAA polish: "10/10" per spec definition

**Legal:**
- IP-safe: 100% (no infringement)
- Licensed: All sources documented

---

## 🔗 External Resources

**Free Asset Sources:**
- [Kenney.nl](https://kenney.nl/assets) - 60k+ CC0 assets
- [Poly Haven](https://polyhaven.com) - 1,700+ CC0 PBR textures/models
- [ambientCG](https://ambientcg.com) - 1,000+ CC0 textures
- [OpenGameArt](https://opengameart.org) - CC0 3D models
- [itch.io VFX](https://itch.io/game-assets/free/tag-explosions) - Free sprite sheets

**AI Tools:**
- [Meshy.ai](https://www.meshy.ai) - Text/image-to-3D
- ChatGPT (DALL-E 3) - Textures, UI, VFX
- Stable Diffusion - Batch generation, full control

**Optimization Tools:**
- [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline) - GLTF compression
- [Texture Packer](https://www.codeandweb.com/texturepacker) - Sprite atlases
- ImageMagick - Batch image processing

---

**Last Updated:** 2025-01-XX  
**Maintained By:** Asset Pipeline Engineer (Subagent)
