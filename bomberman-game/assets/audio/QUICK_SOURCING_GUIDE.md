# Quick Audio Sourcing Guide
**Get audio assets FAST - Complete checklist for 3D Bomberman**

---

## 🚀 Fastest Path: 30 Minutes to Complete Audio Package

### Step 1: Download Free SFX Packs (10 minutes)

**Priority 1: Kenney Audio Pack**
1. Go to: https://kenney.nl/assets/category:Audio
2. Download: "UI Audio" pack
3. Download: "Impact Sounds" pack
4. Extract to: `/bomberman-game/assets/audio/temp/kenney/`
5. Use for: UI sounds, bomb placement, basic impacts

**Priority 2: Mixkit Explosions**
1. Go to: https://mixkit.co/free-sound-effects/explosion/
2. Download: 3-5 different explosion sounds
3. Save to: `/bomberman-game/assets/audio/sfx/explosion/`
4. Rename: `explosion_01.wav`, `explosion_02.wav`, etc.

**Priority 3: Freesound Essentials**
1. Go to: https://freesound.org/
2. Filter: License → "Creative Commons 0"
3. Search & download:
   - "fuse burning" → `fuse_burn.wav`
   - "footsteps tile" → `footstep_01.wav` (get 4-6 variations)
   - "wood crate break" → `block_break.wav` (get 2-3)
   - "power up collect" → `powerup_collect.wav`
4. Save to appropriate folders

### Step 2: Generate Music with AI (15 minutes)

**Use Suno AI for Music** (Fastest & Best Quality)
1. Go to: https://suno.ai/ (sign up free)
2. Generate **Menu Theme:**
   - Prompt: "Upbeat electronic arcade game menu music, energetic synth melodies, driving beat, modern production, retro gaming vibes, seamless loop, instrumental only, 120 BPM"
   - Settings: Instrumental
   - Generate → Download best version
3. Generate **Gameplay Music:**
   - Prompt: "High energy action game music, intense electronic beats, fast tempo 140 BPM, competitive gaming atmosphere, building tension, seamless loop, orchestral hybrid elements"
   - Settings: Instrumental
   - Generate → Download
4. Generate **Victory Jingle:**
   - Prompt: "Short 8 second victory fanfare, triumphant brass and synths, celebratory game win stinger"
   - Settings: Short form
   - Generate → Download

**Alternative: Beatoven.ai** (If Suno limits reached)
- Go to: https://www.beatoven.ai/
- Use templates: "Game Menu", "Action", "Victory"
- Generate and download

### Step 3: Convert & Organize (5 minutes)

```bash
# Convert all WAV files to OGG using FFmpeg
cd /home/ec2-user/clawd/bomberman-game/assets/audio/

# Convert SFX
find sfx/ -name "*.wav" -exec sh -c 'ffmpeg -i "$1" -c:a libvorbis -q:a 6 "${1%.wav}.ogg"' _ {} \;

# Convert Music
find music/ -name "*.wav" -exec sh -c 'ffmpeg -i "$1" -c:a libvorbis -q:a 6 "${1%.wav}.ogg"' _ {} \;

# Delete WAV files (optional, keep as backup)
# find . -name "*.wav" -delete
```

---

## 📋 Asset Checklist - Minimum Viable Audio

### ✅ CRITICAL (Must Have for MVP)

#### Music (3 files)
- [ ] `music/menu_theme.ogg` - Menu background music
- [ ] `music/gameplay_main.ogg` - Main gameplay loop
- [ ] `music/victory_jingle.ogg` - Victory sound

#### Bomb SFX (5 files)
- [ ] `sfx/bomb/bomb_place_01.ogg` - Place bomb
- [ ] `sfx/bomb/fuse_burn_slow.ogg` - Fuse loop (slow)
- [ ] `sfx/bomb/fuse_burn_medium.ogg` - Fuse loop (medium)
- [ ] `sfx/bomb/fuse_burn_fast.ogg` - Fuse loop (fast)

#### Explosion SFX (3 files)
- [ ] `sfx/explosion/explosion_01.ogg` - Main explosion
- [ ] `sfx/explosion/explosion_02.ogg` - Variation 2
- [ ] `sfx/explosion/explosion_03.ogg` - Variation 3

#### Environment SFX (2 files)
- [ ] `sfx/environment/block_break_01.ogg` - Block destruction

#### Power-up SFX (2 files)
- [ ] `sfx/powerup/powerup_collect_01.ogg` - Collect power-up

#### UI SFX (3 files)
- [ ] `ui/ui_click.ogg` - Button click
- [ ] `ui/ui_hover.ogg` - Button hover
- [ ] `ui/ui_back.ogg` - Back/cancel

**Total Critical: ~20 files**

### 🎨 POLISH (Nice to Have)

- [ ] `music/gameplay_intense.ogg` - Escalation music
- [ ] `music/defeat_sound.ogg` - Defeat jingle
- [ ] `sfx/explosion/explosion_chain_01.ogg` - Chain reaction
- [ ] `sfx/movement/footstep_01.ogg` (x6 variations)
- [ ] `sfx/powerup/powerup_spawn.ogg` - Power-up appears
- [ ] `sfx/powerup/powerup_collect_rare.ogg` - Rare pickup
- [ ] `sfx/environment/block_break_02.ogg` (variations)
- [ ] `ui/countdown_3.ogg`, `countdown_2.ogg`, `countdown_1.ogg`, `countdown_go.ogg`

---

## 🎯 Direct Download Links

### Free SFX Libraries (No Account Required)

**Kenney.nl - Game Audio**
- URL: https://kenney.nl/assets/ui-audio
- Download: Click "Download" button
- License: CC0 (Public Domain)
- Best for: UI sounds, basic game SFX

**Mixkit - Explosions**
- URL: https://mixkit.co/free-sound-effects/explosion/
- Download: Click individual sounds
- License: Mixkit License (Free, no attribution)
- Best for: Explosion sounds

**Zapsplat - CC0 Sounds**
- URL: https://www.zapsplat.com/sound-effect-category/cc0-sounds/
- Note: Free account required (quick signup)
- License: CC0 (Public Domain)
- Best for: Professional quality SFX

### AI Generation Tools (Quick Sign-Up)

**Suno AI - Music Generation**
- URL: https://suno.ai/
- Free tier: ~50 generations/month
- Best for: Complete music tracks
- Output: MP3 (convert to OGG)

**LoudMe - SFX Generation**
- URL: https://loudme.ai/sound-effect-generator
- Free tier: Unlimited
- No signup required!
- Best for: Custom sound effects
- Output: WAV (convert to OGG)

**AISFX - Quick SFX**
- URL: https://aisfx.org/
- Free tier: 10 sounds (no signup)
- Best for: Quick SFX prototyping
- Output: MP3

---

## 🎼 AI Generation Prompts (Copy-Paste Ready)

### Music Prompts

**Menu Theme:**
```
Upbeat electronic arcade game menu music, energetic synth melodies, driving beat, modern production, retro gaming vibes, seamless loop, instrumental only, 120 BPM
```

**Gameplay Music:**
```
High energy action game music, intense electronic beats, fast tempo 140 BPM, competitive gaming atmosphere, building tension, seamless loop, orchestral hybrid elements, instrumental
```

**Gameplay Intense:**
```
Urgent intense game music finale, extreme energy, fast percussion, rising tension, countdown urgency, 160 BPM, electronic orchestral hybrid, instrumental
```

**Victory Jingle:**
```
Short 8 second victory fanfare, triumphant brass and synths, celebratory game win stinger, uplifting
```

**Defeat Sound:**
```
Short 4 second sad game over sound, descending musical notes, melancholic but gentle, try again vibe
```

### SFX Prompts

**Bomb Place:**
```
Heavy object being placed on ground firmly, bomb placement sound, solid thud with slight metallic element
```

**Fuse Burning:**
```
Bomb fuse sizzling and burning, looping sound, tension building, sparkler crackling
```

**Explosion:**
```
Large explosive blast, satisfying bomb explosion, arcade game style, powerful boom with echo
```

**Block Break:**
```
Wooden crate breaking and shattering, game block destruction, satisfying crumble
```

**Power-up Collect:**
```
Bright power-up collection sound, ascending electronic chimes, positive feedback, 1 second
```

**Footsteps:**
```
Quick footstep on tile floor, game character walking, subtle step sound
```

**UI Click:**
```
Soft UI button click sound, modern menu selection, satisfying confirmation, short
```

**UI Hover:**
```
Subtle UI hover sound, menu highlight, soft click, very short
```

---

## ⚡ Super Quick Alternative: Pre-Made Packs

If you need audio **immediately** without any generation:

### Complete Game Audio Packs (All-in-One)

**1. Sonniss GDC Bundle** (Professional Quality)
- URL: https://sonniss.com/gameaudiogdc/
- Size: 27GB+ (download selectively)
- License: Royalty-free, no attribution
- Contains: Everything you need
- Download time: ~1-2 hours
- **Pro tip:** Just download the "Explosions" and "UI" folders

**2. OpenGameArt Collections**
- URL: https://opengameart.org/art-search-advanced
- Filter: Type → "Sound Effect" | License → "CC0"
- Search: "game audio pack"
- Pre-curated: User-made game audio bundles

**3. Itch.io Audio Bundles**
- URL: https://itch.io/game-assets/free/tag-sound-effects
- Filter: Free, Sort by: Most popular
- Look for: "Game Audio Pack", "Arcade SFX"
- Many complete bundles for free

---

## 🔧 Essential Tools

### Audio Conversion

**FFmpeg (Command Line)**
```bash
# Install on Linux
sudo yum install ffmpeg  # Amazon Linux
sudo apt install ffmpeg  # Ubuntu/Debian

# Convert WAV to OGG
ffmpeg -i input.wav -c:a libvorbis -q:a 6 output.ogg

# Batch convert all WAV files
for f in *.wav; do ffmpeg -i "$f" -c:a libvorbis -q:a 6 "${f%.wav}.ogg"; done
```

**Online Converters (No Install)**
- Convertio: https://convertio.co/wav-ogg/
- Online Audio Converter: https://online-audio-converter.com/
- CloudConvert: https://cloudconvert.com/wav-to-ogg

### Audio Editing (Free)

**Audacity** (Best for Editing)
- URL: https://www.audacityteam.org/
- Use for: Trimming, looping, effects
- Export: OGG Vorbis format

**Basic Audacity Workflow:**
1. Open sound file
2. Select all (Ctrl+A)
3. Effect → Normalize → OK (consistent volume)
4. Effect → Compressor → OK (louder, punchier)
5. File → Export → Export as OGG

---

## 📦 Delivery Checklist

### Before Submitting Audio Package:

- [ ] All files in OGG format (MP3 fallback optional)
- [ ] Files organized in correct folder structure
- [ ] Total size < 50 MB
- [ ] All music loops seamlessly (no clicks)
- [ ] Sounds normalized to consistent volume
- [ ] AUDIO_MANIFEST.md updated with sources
- [ ] Generation logs recorded for AI assets
- [ ] Tested in browser (Chrome/Firefox)
- [ ] Mobile audio initialization tested

### Folder Structure Verification:

```
/assets/audio/
├── music/
│   ├── menu_theme.ogg
│   ├── gameplay_main.ogg
│   └── victory_jingle.ogg
├── sfx/
│   ├── bomb/
│   ├── explosion/
│   ├── environment/
│   ├── powerup/
│   └── movement/
└── ui/
    ├── ui_click.ogg
    └── ui_hover.ogg
```

---

## 🆘 Troubleshooting

**"I can't find good explosion sounds"**
→ Go to Mixkit.co, download 5 different ones, pick the best 3

**"AI music doesn't loop properly"**
→ Use Audacity: Fade out last 0.5s, fade in first 0.5s, trim silence

**"Files are too large (> 50 MB total)"**
→ Lower OGG quality: `ffmpeg -i input.wav -c:a libvorbis -q:a 4 output.ogg`

**"Sounds don't match in volume"**
→ Use Audacity Effect → Normalize on all files before converting

**"Can't convert to OGG"**
→ Use online converter: https://convertio.co/wav-ogg/

---

## ⏱️ Time Estimates

| Task | Time | Priority |
|------|------|----------|
| Download Kenney packs | 5 min | HIGH |
| Download Mixkit explosions | 5 min | HIGH |
| Freesound SFX hunting | 15 min | HIGH |
| Generate music (Suno) | 15 min | HIGH |
| Convert to OGG | 5 min | MEDIUM |
| Organize files | 5 min | MEDIUM |
| Test in browser | 10 min | HIGH |
| **TOTAL MVP** | **60 min** | |
| Generate additional SFX | 20 min | LOW |
| Create variations | 15 min | LOW |
| Polish & effects | 30 min | LOW |
| **TOTAL POLISHED** | **125 min** | |

---

## 🎉 Done!

You now have:
✅ Complete sourcing strategy  
✅ Direct download links  
✅ AI generation prompts  
✅ Conversion commands  
✅ Organized file structure  
✅ Ready to implement  

**Next step:** Start with Step 1 above and work through the checklist!

---

**Questions? Check AUDIO_MANIFEST.md for detailed information on each sound.**
