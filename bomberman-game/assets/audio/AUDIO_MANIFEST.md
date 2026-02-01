# 3D Bomberman Audio Manifest
**Version:** 1.0  
**Date:** 2025-01-03  
**Audio Designer:** Subagent (audio-designer)

---

## 📋 Overview
Complete audio package for award-winning 3D Bomberman game. All assets sourced from CC0/royalty-free libraries or generated using AI tools with full provenance tracking.

**Technical Specs:**
- **Formats:** OGG (primary), MP3 (fallback)
- **Sample Rate:** 44.1kHz or 48kHz
- **Bit Depth:** 16-bit minimum
- **Channels:** Stereo for music, mono/stereo for SFX as appropriate
- **Mobile-Safe:** Touch-to-start audio implementation required

---

## 🎵 MUSIC ASSETS

### 1. Main Menu Theme
**Purpose:** Looping background music for main menu/lobby  
**Duration:** 2-3 minutes (seamless loop)  
**Style:** Upbeat, energetic, arcade-inspired with modern production  
**Mood:** Exciting, welcoming, slightly retro

**Sourcing Options:**
1. **AI Generation (Recommended):**
   - **Tool:** Suno AI or Udio
   - **Prompt:** "Upbeat electronic arcade game menu music, energetic synth melodies, driving beat, modern production, retro gaming vibes, seamless loop, no lyrics, 120 BPM"
   - **Settings:** Instrumental only, Electronic/Arcade genre
   - **License:** Check Suno/Udio free tier for commercial rights

2. **Pre-Made CC0:**
   - **Source:** OpenGameArt.org (filter CC0)
   - **Search:** "menu music electronic upbeat"
   - **Backup:** FreePD.com - Electronic/Game Music section
   - **Alternative:** Incompetech.com - "Pixel Peeker Polka" or similar (requires attribution)

### 2. Gameplay Music (Main Theme)
**Purpose:** High-energy looping music during active gameplay  
**Duration:** 3-4 minutes (seamless loop)  
**Style:** Fast-paced, intense, builds tension  
**Mood:** Competitive, adrenaline-pumping, strategic

**Sourcing Options:**
1. **AI Generation (Recommended):**
   - **Tool:** Beatoven.ai or Soundraw
   - **Prompt:** "High energy action game music, intense electronic beats, fast tempo 140 BPM, competitive gaming atmosphere, building tension, seamless loop, orchestral hybrid elements"
   - **Settings:** Action/Game genre, High Energy mood, 140-160 BPM
   - **Variations:** Generate 2-3 variations for different intensity levels

2. **Pre-Made CC0:**
   - **Source:** OpenGameArt.org - search "action game music"
   - **Backup:** Pixabay Music (requires attribution for free tier)

### 3. Gameplay Music (Escalation Track)
**Purpose:** Plays when match time is running low (last 30-60 seconds)  
**Duration:** 1-2 minutes  
**Style:** Even more intense than main theme, urgency  
**Mood:** Panic, climax, final showdown

**Sourcing Options:**
1. **AI Generation:**
   - **Tool:** Udio
   - **Prompt:** "Urgent intense game music finale, extreme energy, fast percussion, rising tension, countdown urgency, 160 BPM, electronic orchestral hybrid"
   - **Settings:** Extend from main gameplay theme for consistency

### 4. Victory Jingle
**Purpose:** Plays when player wins a match  
**Duration:** 5-10 seconds  
**Style:** Triumphant, celebratory, satisfying  
**Mood:** Accomplishment, joy

**Sourcing Options:**
1. **AI Generation:**
   - **Tool:** Suno AI (short generation)
   - **Prompt:** "Short victory fanfare, triumphant brass and synths, celebratory game win stinger, 5 seconds"
   
2. **Pre-Made:**
   - **Source:** Freesound.org (filter CC0)
   - **Search:** "victory fanfare game win"
   - **Example:** Search for retro game victory sounds

### 5. Defeat Sound/Jingle
**Purpose:** Plays when player loses/dies  
**Duration:** 3-5 seconds  
**Style:** Descending, sad but not harsh  
**Mood:** Disappointment, "try again"

**Sourcing Options:**
1. **AI Generation:**
   - **Tool:** GenSFX or AISFX
   - **Prompt:** "Sad game over sound, descending musical notes, game loss, melancholic but gentle, 3 seconds"
   
2. **Pre-Made:**
   - **Source:** Freesound.org (CC0)
   - **Search:** "game over lose defeat sound"

---

## 🔊 SOUND EFFECTS (SFX)

### BOMB CATEGORY

#### 1. Bomb Place
**Purpose:** Feedback when player places bomb  
**Duration:** 0.1-0.3 seconds  
**Style:** Solid "thud" or "plonk" with slight mechanical element  

**Sourcing:**
- **Primary:** Kenney.nl - Game Audio Packs (CC0)
- **AI Generation:** LoudMe - "Heavy object being placed on ground, bomb placement sound"
- **Freesound:** Search "place object thud"
- **Files:** `bomb_place_01.ogg`, `bomb_place_02.ogg` (variation)

#### 2. Fuse Burning (Loop)
**Purpose:** Looping sound while bomb counts down  
**Duration:** 0.5-1 second loop  
**Style:** Sizzling, ticking, building tension  
**Technical:** Must pitch-shift up as timer approaches zero

**Sourcing:**
- **Primary:** Freesound.org - "fuse burning" "timer ticking"
- **AI Generation:** GenSFX - "Bomb fuse sizzling and burning, looping sound, tension building"
- **Processing:** Create 3 versions with increasing pitch (normal, +10%, +20%)
- **Files:** `fuse_burn_slow.ogg`, `fuse_burn_medium.ogg`, `fuse_burn_fast.ogg`

### EXPLOSION CATEGORY

#### 3. Explosion (Primary)
**Purpose:** Main bomb explosion sound  
**Duration:** 1-2 seconds  
**Style:** Powerful, satisfying boom with echo/reverb  
**Technical:** Needs variations to prevent repetition fatigue

**Sourcing:**
- **Primary:** Mixkit.co - 36 free explosion SFX (royalty-free, no attribution)
- **Alternative:** Zapsplat.com - CC0 explosions
- **Backup:** Gfx Sounds - explosion packs (WAV/MP3)
- **AI Generation:** ElevenLabs Sound Effects - "Large explosive blast, satisfying bomb explosion, arcade game style"
- **Files:** `explosion_01.ogg`, `explosion_02.ogg`, `explosion_03.ogg` (3 variations minimum)

#### 4. Explosion Chain Reaction
**Purpose:** When explosions trigger other bombs  
**Duration:** 1-2 seconds  
**Style:** Layered, cascading explosions  

**Sourcing:**
- **Method:** Layer 2-3 explosion sounds with slight delay
- **AI Generation:** "Chain reaction explosions, cascading bomb blasts, sequential booms"
- **Files:** `explosion_chain_01.ogg`, `explosion_chain_02.ogg`

#### 5. Explosion (Muffled/Distant)
**Purpose:** For explosions farther from player (spatial audio)  
**Duration:** 1-2 seconds  
**Style:** Same as primary but filtered, less bassy  

**Sourcing:**
- **Method:** Take primary explosion, apply low-pass filter and reverb
- **Files:** `explosion_distant_01.ogg`

### ENVIRONMENT CATEGORY

#### 6. Block Break (Soft Block)
**Purpose:** When destructible block is destroyed  
**Duration:** 0.5-1 second  
**Style:** Crumbling, shattering, satisfying destruction  

**Sourcing:**
- **Primary:** Freesound.org - "wood break" "crate smash" "block destroy"
- **BigSoundBank:** General SFX (CC0)
- **AI Generation:** LoudMe - "Wooden crate breaking and shattering, game block destruction"
- **Files:** `block_break_01.ogg`, `block_break_02.ogg`, `block_break_03.ogg`

#### 7. Block Break (Different Materials)
**Purpose:** Variety for different block types if implemented  
**Duration:** 0.5-1 second  
**Variations:** Wood, stone, metal, ice, etc.

**Sourcing:**
- **Freesound:** Search by material type
- **AI Generation:** "Stone block crumbling", "Metal block clanging and breaking", "Ice block shattering"
- **Files:** `block_break_stone.ogg`, `block_break_metal.ogg`, `block_break_ice.ogg`

### POWERUP CATEGORY

#### 8. Power-Up Collect (Generic)
**Purpose:** Positive feedback for collecting power-ups  
**Duration:** 0.3-0.8 seconds  
**Style:** Bright, ascending tones, "power-up" arcade feel  

**Sourcing:**
- **Primary:** Kenney.nl - Power-up sound collection
- **Freesound:** "power up collect pickup"
- **AI Generation:** AISFX - "Bright power-up collection sound, ascending electronic chimes, positive feedback"
- **Files:** `powerup_collect_01.ogg`, `powerup_collect_02.ogg`

#### 9. Power-Up Collect (Rare/Special)
**Purpose:** Extra satisfying sound for rare power-ups  
**Duration:** 0.5-1 second  
**Style:** More elaborate, "legendary" feel  

**Sourcing:**
- **AI Generation:** "Legendary item pickup sound, epic power-up, magical chimes, special reward"
- **Files:** `powerup_collect_rare.ogg`

#### 10. Power-Up Spawn/Appear
**Purpose:** When power-up drops from destroyed block  
**Duration:** 0.3-0.5 seconds  
**Style:** Magical appearance, sparkle sound  

**Sourcing:**
- **Freesound:** "sparkle appear spawn"
- **AI Generation:** "Magical item appearing, sparkle sound, power-up spawn"
- **Files:** `powerup_spawn.ogg`

### MOVEMENT CATEGORY

#### 11. Footsteps (Default Surface)
**Purpose:** Player movement feedback  
**Duration:** 0.1-0.2 seconds each  
**Style:** Quick, subtle, not overwhelming  
**Technical:** Randomly alternate between 4-6 variations

**Sourcing:**
- **Primary:** Sonniss GDC Archives - Footstep packs
- **Freesound:** "footstep concrete" "game character walk"
- **AI Generation:** LoudMe - "Quick footstep on tile floor, game character walking"
- **Files:** `footstep_01.ogg` through `footstep_06.ogg`

#### 12. Footsteps (Alternate Surfaces)
**Purpose:** Variety for different arena materials  
**Duration:** 0.1-0.2 seconds each  
**Variations:** Grass, metal, wood, stone

**Sourcing:**
- **Sonniss GDC Archives:** Material-specific footsteps
- **AI Generation:** Generate per material type
- **Files:** `footstep_grass_01.ogg`, `footstep_metal_01.ogg`, etc.

### PLAYER FEEDBACK CATEGORY

#### 13. Death/Respawn
**Purpose:** Player eliminated by explosion  
**Duration:** 1-2 seconds  
**Style:** Dramatic but quick, clear feedback  

**Sourcing:**
- **Freesound:** "game death character die"
- **AI Generation:** "Game character death sound, dramatic elimination, quick feedback"
- **Files:** `player_death.ogg`, `player_respawn.ogg`

#### 14. Player Hit/Damage
**Purpose:** If health system exists  
**Duration:** 0.2-0.5 seconds  
**Style:** Impact, pain grunt, warning sound  

**Sourcing:**
- **Freesound:** "impact hit damage"
- **Files:** `player_hit.ogg`

### UI CATEGORY

#### 15. Menu Navigation (Hover)
**Purpose:** Hovering over menu buttons  
**Duration:** 0.05-0.1 seconds  
**Style:** Subtle click, modern UI sound  

**Sourcing:**
- **Primary:** Kenney.nl - UI Audio Pack (CC0)
- **AI Generation:** GenSFX - "Soft UI hover sound, menu highlight, subtle click"
- **Files:** `ui_hover.ogg`

#### 16. Menu Navigation (Click/Select)
**Purpose:** Clicking/selecting menu options  
**Duration:** 0.1-0.2 seconds  
**Style:** Satisfying click, confirmation  

**Sourcing:**
- **Kenney.nl:** UI sounds
- **AI Generation:** "UI button click, satisfying selection sound, menu confirm"
- **Files:** `ui_click.ogg`, `ui_select.ogg`

#### 17. Menu Navigation (Back/Cancel)
**Purpose:** Going back in menus  
**Duration:** 0.1-0.2 seconds  
**Style:** Slightly lower tone than select  

**Sourcing:**
- **Kenney.nl:** UI sounds
- **Files:** `ui_back.ogg`

#### 18. UI Notification
**Purpose:** Alerts, warnings, timer warnings  
**Duration:** 0.2-0.5 seconds  
**Style:** Attention-grabbing but not jarring  

**Sourcing:**
- **Freesound:** "notification alert UI"
- **AI Generation:** "UI notification sound, alert chime, attention grabbing"
- **Files:** `ui_notification.ogg`, `ui_warning.ogg`

#### 19. Match Start Countdown
**Purpose:** 3-2-1-GO sound effects  
**Duration:** 0.3-0.5 seconds each  
**Style:** Building tension, clear numbers  

**Sourcing:**
- **AI Generation:** "Game countdown beep, match start timer, 3-2-1 sound"
- **Freesound:** "countdown timer beep"
- **Files:** `countdown_3.ogg`, `countdown_2.ogg`, `countdown_1.ogg`, `countdown_go.ogg`

#### 20. Timer Warning (Low Time)
**Purpose:** When match time < 30 seconds  
**Duration:** 0.2-0.3 seconds (repeating)  
**Style:** Urgent beeping, increasing frequency  

**Sourcing:**
- **AI Generation:** "Urgent timer warning beep, time running out, alarm sound"
- **Files:** `timer_warning.ogg`

---

## 🎚️ AUDIO IMPLEMENTATION GUIDE

### Volume Mixer Architecture

```javascript
// Separate volume controls required
const audioMixer = {
  master: 1.0,    // Master volume (0.0 - 1.0)
  music: 0.7,     // Background music
  sfx: 0.8,       // Sound effects
  ui: 0.5         // UI feedback sounds
};

// Calculate final volume
function getFinalVolume(category) {
  return audioMixer.master * audioMixer[category];
}
```

### File Organization Structure

```
/assets/audio/
├── music/
│   ├── menu_theme.ogg
│   ├── gameplay_main.ogg
│   ├── gameplay_intense.ogg
│   ├── victory_jingle.ogg
│   └── defeat_sound.ogg
├── sfx/
│   ├── bomb/
│   │   ├── bomb_place_01.ogg
│   │   ├── bomb_place_02.ogg
│   │   ├── fuse_burn_slow.ogg
│   │   ├── fuse_burn_medium.ogg
│   │   └── fuse_burn_fast.ogg
│   ├── explosion/
│   │   ├── explosion_01.ogg
│   │   ├── explosion_02.ogg
│   │   ├── explosion_03.ogg
│   │   ├── explosion_chain_01.ogg
│   │   └── explosion_distant_01.ogg
│   ├── environment/
│   │   ├── block_break_01.ogg
│   │   ├── block_break_02.ogg
│   │   └── block_break_03.ogg
│   ├── powerup/
│   │   ├── powerup_collect_01.ogg
│   │   ├── powerup_collect_rare.ogg
│   │   └── powerup_spawn.ogg
│   └── movement/
│       ├── footstep_01.ogg
│       ├── footstep_02.ogg
│       └── player_death.ogg
└── ui/
    ├── ui_hover.ogg
    ├── ui_click.ogg
    ├── ui_back.ogg
    ├── countdown_3.ogg
    └── timer_warning.ogg
```

### Spatial Audio Implementation

**Requirement:** Directional audio cues for explosions and hazards

```javascript
// Pseudo-code for spatial audio
function playSpatialSound(soundFile, position, listener) {
  const distance = calculateDistance(position, listener);
  const angle = calculateAngle(position, listener);
  
  // Adjust volume based on distance
  const volumeFalloff = Math.max(0, 1 - (distance / maxAudibleDistance));
  
  // Adjust pan based on angle (-1 left, 1 right)
  const pan = Math.sin(angle);
  
  // Play with calculated spatial parameters
  playSound(soundFile, volumeFalloff, pan);
}
```

**Key Rules:**
- Explosions within 3 tiles: Full volume with spatial pan
- Explosions 4-8 tiles: Medium volume with spatial pan
- Explosions 9+ tiles: Distant/muffled version, low volume
- Off-screen explosions: Must be audible with clear direction

### Mobile Implementation (Touch-to-Start)

```javascript
// Audio context must be initialized after user interaction on mobile
let audioContext = null;
let audioReady = false;

document.addEventListener('touchstart', initAudio, { once: true });
document.addEventListener('click', initAudio, { once: true });

function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioReady = true;
    console.log('Audio system initialized');
  }
}
```

### Dynamic Mixing Rules

**Priority System** (when max simultaneous sounds reached):
1. **Critical UI** - Timer warnings, match start
2. **Player Feedback** - Own bomb placement, own power-up collection
3. **Explosions** - All explosion sounds
4. **Other SFX** - Footsteps, distant sounds
5. **Music** - Always playing but can be muted by settings

**Simultaneous Sound Limits:**
- Max explosions playing at once: 8
- Max footsteps: 4 (one per player max)
- Max UI sounds: 2
- Music: 1 (with crossfade for transitions)

### Fuse Audio Dynamic Behavior

```javascript
// Fuse sound pitch increases as timer counts down
function updateFuseSound(bombTimer, maxTime) {
  const timeRemaining = maxTime - bombTimer;
  const urgencyPercent = 1 - (timeRemaining / maxTime);
  
  if (urgencyPercent < 0.5) {
    playLoop('fuse_burn_slow.ogg');
  } else if (urgencyPercent < 0.8) {
    playLoop('fuse_burn_medium.ogg');
  } else {
    playLoop('fuse_burn_fast.ogg');
  }
}
```

### Music Transition System

```javascript
// Smooth crossfade between music tracks
function transitionMusic(fromTrack, toTrack, duration = 2000) {
  const fadeStep = 50; // ms
  const steps = duration / fadeStep;
  const volumeStep = 1 / steps;
  
  let currentStep = 0;
  const interval = setInterval(() => {
    currentStep++;
    
    // Fade out old track
    fromTrack.volume = Math.max(0, 1 - (volumeStep * currentStep));
    
    // Fade in new track
    toTrack.volume = Math.min(1, volumeStep * currentStep);
    
    if (currentStep >= steps) {
      clearInterval(interval);
      fromTrack.stop();
    }
  }, fadeStep);
}
```

---

## 📊 AUDIO BUDGET & PERFORMANCE

### File Size Targets
- **Total Audio Assets:** < 50 MB
- **Individual Music Track:** 2-5 MB each (OGG)
- **Individual SFX:** 10-100 KB each
- **UI Sounds:** 5-20 KB each

### Optimization Strategies
1. **OGG Format:** Better compression than MP3, native web support
2. **Mono SFX:** Use mono for sounds that don't need stereo imaging
3. **Lower Sample Rates:** 22.05kHz for UI sounds, 44.1kHz for music
4. **Seamless Loops:** Ensure music loops have no clicks/gaps
5. **Sound Pooling:** Reuse audio buffer instances

### Loading Strategy
```javascript
// Preload critical sounds, lazy-load others
const criticalSounds = [
  'bomb_place', 'explosion_01', 'ui_click', 'menu_theme'
];

const deferredSounds = [
  'block_break_ice', 'footstep_grass', 'player_respawn'
];

async function loadAudio() {
  // Load critical sounds first
  await loadSoundBatch(criticalSounds);
  showPlayButton(); // Game ready to start
  
  // Load remaining sounds in background
  loadSoundBatch(deferredSounds);
}
```

---

## 🔧 TOOLS & RESOURCES

### Primary Audio Sources

**CC0/Public Domain Libraries:**
1. **Kenney.nl** - https://kenney.nl/assets
   - Category: Audio
   - License: CC0 (Public Domain)
   - Best for: UI sounds, retro game SFX

2. **OpenGameArt.org** - https://opengameart.org/
   - Filter: CC0 license
   - Best for: Music loops, general game SFX

3. **FreePD.com** - http://freepd.com/
   - License: Public Domain
   - Best for: Background music

4. **Freesound.org** - https://freesound.org/
   - Filter: CC0 license ONLY
   - Best for: Specific SFX, explosions, impacts

5. **Mixkit** - https://mixkit.co/free-sound-effects/
   - License: Mixkit License (free, no attribution)
   - Best for: Explosions (36 free effects)

6. **Zapsplat** - https://www.zapsplat.com/
   - Filter: CC0 1.0 Universal
   - Best for: Explosions, professional SFX

7. **Sonniss GDC Archives** - https://sonniss.com/gameaudiogdc/
   - License: Royalty-free, no attribution
   - Size: 27+ GB (selective download)
   - Best for: Professional footsteps, ambience

8. **BigSoundBank** - (search for latest URL)
   - License: CC0
   - Best for: High-quality general SFX

### AI Generation Tools

**Music Generation:**
1. **Suno AI** - https://suno.ai/
   - Free tier: Limited projects
   - License: Check current terms for commercial use
   - Best for: Full soundtrack generation with custom prompts

2. **Udio** - https://www.udio.com/
   - Free tier: High-quality output
   - Best for: Professional-quality game music, extensions

3. **Beatoven.ai** - https://www.beatoven.ai/
   - Free trial available
   - License: Royalty-free perpetual commercial clearance
   - Best for: Game-specific background music

4. **Soundraw** - https://soundraw.io/
   - Free generation, paid for downloads
   - License: 100% royalty-free, keep all profits
   - Best for: Customizable loops, genre blending

**SFX Generation:**
1. **LoudMe** - https://loudme.ai/sound-effect-generator
   - Completely free, unlimited
   - License: Royalty-free
   - Best for: Custom SFX, realistic sounds

2. **AISFX** - https://aisfx.org/
   - Free tier: 10 sound effects, no signup
   - Best for: Quick SFX prototyping

3. **Aidubbing.io** - https://aidubbing.io/ai-sound-effect-generator
   - Unlimited free generations
   - License: Royalty-free personal/commercial
   - Best for: High-quality MP3 output

4. **GenSFX** - https://gensfx.com/
   - Free instant text-to-SFX
   - Best for: Professional SFX with controls

5. **ElevenLabs Sound Effects** - https://elevenlabs.io/sound-effects
   - Free tier: 50 generations
   - License: Requires attribution (free), commercial upgrade available
   - Best for: High-fidelity sound effects

### Audio Processing Tools

**Free Audio Editors:**
1. **Audacity** - https://www.audacityteam.org/
   - Export to OGG/MP3
   - Effects: Normalize, EQ, Compression, Reverb
   - Loop seamlessly: Use "Find Zero Crossings"

2. **Ocenaudio** - https://www.ocenaudio.com/
   - Real-time preview of effects
   - Batch processing

3. **Online Converters:**
   - **Convertio** - https://convertio.co/audio-converter/
   - **Online Audio Converter** - https://online-audio-converter.com/

### Format Conversion

```bash
# Using FFmpeg (command line)
# Convert WAV to OGG (high quality)
ffmpeg -i input.wav -c:a libvorbis -q:a 6 output.ogg

# Convert MP3 to OGG
ffmpeg -i input.mp3 -c:a libvorbis -q:a 6 output.ogg

# Reduce sample rate for smaller file size
ffmpeg -i input.wav -ar 22050 -c:a libvorbis -q:a 4 output.ogg

# Create seamless loop (trim silence at ends)
ffmpeg -i input.wav -af silenceremove=start_periods=1:stop_periods=1 output.ogg
```

---

## 📝 GENERATION LOG TEMPLATE

For each AI-generated asset, record:

```markdown
### [Asset Name]
- **Date Generated:** YYYY-MM-DD
- **Tool:** [Suno/Udio/LoudMe/etc.]
- **Model Version:** [if available]
- **Prompt:** "[exact prompt text]"
- **Negative Prompt:** "[if used]"
- **Settings:**
  - Genre: [Electronic/Action/etc.]
  - Mood: [High Energy/Calm/etc.]
  - BPM: [if applicable]
  - Duration: [seconds]
  - Style: [Instrumental/Lyrical]
- **Seed:** [if available]
- **Iterations:** [number of attempts]
- **Selected Variation:** [which version chosen]
- **Post-Processing:** [any edits made]
- **License:** [terms from generation tool]
- **Commercial Use:** [Yes/No/With Attribution]
- **File Path:** `/assets/audio/[category]/[filename].ogg`
```

---

## ✅ QUALITY CHECKLIST

### Before Integration:
- [ ] All music loops seamlessly (no clicks/gaps)
- [ ] All sounds normalized to consistent volume levels
- [ ] File sizes within budget (< 50 MB total)
- [ ] All files converted to OGG format (MP3 fallback optional)
- [ ] Spatial audio tested (explosions audible from all directions)
- [ ] Mobile audio initialization tested
- [ ] Volume sliders functional (Master/Music/SFX/UI)
- [ ] No copyright issues (all CC0, public domain, or properly licensed)
- [ ] Generation logs complete for all AI-generated assets

### Audio Mix Pass:
- [ ] Explosions don't drown out UI feedback
- [ ] Music doesn't overpower important SFX
- [ ] Footsteps audible but not distracting
- [ ] UI sounds clear and satisfying
- [ ] Fuse sound builds tension effectively
- [ ] Victory/defeat stingers feel rewarding/fair

### Readability Test (Per Spec Section 9):
- [ ] Players can locate threats by sound direction
- [ ] Off-screen explosions clearly indicate direction
- [ ] Timer warning audible during chaos
- [ ] Death sound distinct from other explosions
- [ ] Power-up collection feels satisfying

---

## 🚀 IMPLEMENTATION PRIORITY

### Phase 1: Core Gameplay Audio (Week 1)
**Critical for MVP:**
1. Bomb place sound
2. Fuse burning (single version)
3. Explosion sound (1 variation minimum)
4. Block break sound
5. Power-up collect sound
6. Basic UI sounds (click, hover)
7. Gameplay music (main track)

### Phase 2: Polish & Variety (Week 2)
**Enhances experience:**
1. Multiple explosion variations
2. Fuse pitch shift variants
3. Multiple block break sounds
4. Footsteps
5. Menu music
6. Victory/defeat sounds
7. Spatial audio implementation

### Phase 3: Delight Features (Week 3)
**10/10 quality additions:**
1. Material-specific footsteps
2. Different material block breaks
3. Escalation music track
4. Rare power-up sound
5. Match countdown sounds
6. Advanced spatial audio
7. Dynamic music mixing

---

## 📄 LICENSE COMPLIANCE

### CC0 Assets
- No attribution required
- Commercial use allowed
- Can modify and redistribute
- **Sources:** Kenney, OpenGameArt (filtered), FreePD, Zapsplat (CC0), BigSoundBank

### Royalty-Free with Attribution
- Credit in game credits/readme
- Commercial use allowed
- **Sources:** Incompetech (Kevin MacLeod), some Freesound tracks

### AI-Generated Assets
- Check terms of service for each tool
- Record all generation parameters
- Most tools allow commercial use for paid tiers
- Free tiers may require attribution (ElevenLabs)

### Attribution Template
```
Audio Assets:
- Music: [Tool Name] AI Generation / [Library Name] (CC0)
- Sound Effects: [Tool Name] AI Generation, Kenney.nl (CC0), Freesound (CC0)
- Additional SFX: Mixkit.co, Sonniss GDC Archives

Special Thanks:
- Kevin MacLeod (incompetech.com) - [if used]
- Freesound.org contributors - [list usernames if not CC0]
```

---

## 🎯 NEXT STEPS FOR DEVELOPER

1. **Review this manifest** - Familiarize with all audio requirements
2. **Set up audio engine** - Implement Web Audio API or library (Howler.js recommended)
3. **Create volume mixer** - Separate sliders for Master/Music/SFX/UI
4. **Implement spatial audio** - Directional cues for explosions
5. **Start with placeholder audio** - Use free libraries while AI assets generate
6. **Test mobile audio** - Touch-to-start implementation
7. **Generate AI assets** - Follow prompts in this manifest
8. **Optimize & compress** - Keep total < 50 MB
9. **Final audio pass** - Balance levels, test readability
10. **Update generation log** - Track all AI-generated assets

---

## 📞 CONTACT & SUPPORT

For questions about this audio package:
- **Audio Designer:** Subagent (audio-designer)
- **Session:** agent:main:subagent:73364b4d-ed84-4817-beb0-f04f15862539
- **Date Created:** 2025-01-03

**Recommended Libraries:**
- **Web Audio:** Howler.js (https://howlerjs.com/)
- **Audio Sprites:** Combine multiple SFX into single file for performance

---

**END OF AUDIO MANIFEST**
