# BLASTFORGE Audio Manifest

**Generated:** 2025-02-01  
**Generator:** ElevenLabs Sound Effects API  
**Total Files:** 19 sound effects  

---

## 1. Bomb Sounds (4 files)

### bomb_place.mp3
- **Prompt:** "Soft thud sound, placing object on ground, short"
- **Duration:** 0.8 seconds
- **Size:** 14K
- **Usage:** Played when player places a bomb

### fuse_tick_normal.mp3
- **Prompt:** "Slow ticking sound, countdown timer, looping"
- **Duration:** 2.0 seconds
- **Size:** 33K
- **Usage:** Normal bomb fuse countdown (loop)

### fuse_tick_primed.mp3
- **Prompt:** "Very slow ticking, deep, ominous, looping"
- **Duration:** 3.0 seconds
- **Size:** 48K
- **Usage:** Primed bomb with extended fuse (loop)

### fuse_tick_rushed.mp3
- **Prompt:** "Fast frantic ticking, urgent, looping"
- **Duration:** 1.5 seconds
- **Size:** 25K
- **Usage:** Rushed bomb with shortened fuse (loop)

---

## 2. Explosion Sounds (3 files)

### explosion_small.mp3
- **Prompt:** "Cartoon explosion, short burst, 8-bit style"
- **Duration:** 1.0 seconds
- **Size:** 17K
- **Usage:** Single tile explosion

### explosion_medium.mp3
- **Prompt:** "Bigger explosion with bass, impactful"
- **Duration:** 1.5 seconds
- **Size:** 25K
- **Usage:** Multi-tile explosion

### explosion_large.mp3
- **Prompt:** "Massive explosion, dramatic, powerful"
- **Duration:** 2.0 seconds
- **Size:** 33K
- **Usage:** Chain reaction or max power explosion

---

## 3. Power-up Sounds (2 files)

### powerup_collect.mp3
- **Prompt:** "Bright cheerful chime, pickup sound, satisfying"
- **Duration:** 0.8 seconds
- **Size:** 14K
- **Usage:** Player collects a power-up

### powerup_spawn.mp3
- **Prompt:** "Magical sparkle, item appearing"
- **Duration:** 1.0 seconds
- **Size:** 17K
- **Usage:** Power-up appears on map

---

## 4. Player Sounds (3 files)

### footstep.mp3
- **Prompt:** "Light footstep on hard surface, short"
- **Duration:** 0.5 seconds
- **Size:** 8.7K
- **Usage:** Player movement (can be pitched/varied for variety)

### death.mp3
- **Prompt:** "Sad game over sound, short melody"
- **Duration:** 1.5 seconds
- **Size:** 25K
- **Usage:** Player dies

### respawn.mp3
- **Prompt:** "Bright positive sound, player returning"
- **Duration:** 1.0 seconds
- **Size:** 17K
- **Usage:** Player respawns after death

---

## 5. UI Sounds (4 files)

### menu_click.mp3
- **Prompt:** "Button click, crisp, satisfying"
- **Duration:** 0.5 seconds
- **Size:** 8.7K
- **Usage:** Menu button clicks

### menu_hover.mp3
- **Prompt:** "Subtle hover sound, soft"
- **Duration:** 0.5 seconds
- **Size:** 8.7K
- **Usage:** Menu button hover

### victory.mp3
- **Prompt:** "Victory fanfare, triumphant, 2-3 seconds"
- **Duration:** 2.5 seconds
- **Size:** 40K
- **Usage:** Player wins the match

### defeat.mp3
- **Prompt:** "Defeat sound, somber, 2 seconds"
- **Duration:** 2.0 seconds
- **Size:** 33K
- **Usage:** Player loses the match

---

## 6. Fuse Ability Sounds (3 files)

### fuse_prime.mp3
- **Prompt:** "Power charging up, extending time"
- **Duration:** 1.2 seconds
- **Size:** 20K
- **Usage:** Player activates Prime ability (extends fuse time)

### fuse_rush.mp3
- **Prompt:** "Speed up sound, accelerating"
- **Duration:** 1.0 seconds
- **Size:** 17K
- **Usage:** Player activates Rush ability (shortens fuse time)

### fuse_detonate.mp3
- **Prompt:** "Trigger sound, immediate action"
- **Duration:** 0.6 seconds
- **Size:** 11K
- **Usage:** Player triggers manual detonation

---

## API Configuration

**Endpoint:** `https://api.elevenlabs.io/v1/sound-generation`  
**API Key:** `sk_e6ec98ef52b383f9b254643a6438e68f5e24694e0a4672e3`  
**Parameters Used:**
- `prompt_influence`: 0.5 (balanced between prompt and model creativity)
- `duration_seconds`: 0.5 - 3.0 (minimum 0.5s required by API)

## Implementation Notes

1. **Looping sounds:** `fuse_tick_*.mp3` files should be seamlessly looped in-game
2. **Footstep variation:** Consider pitch shifting `footstep.mp3` by ±5% for variety
3. **Explosion scaling:** Use the 3 explosion sounds based on bomb power level
4. **Volume balancing:** May need to normalize levels in-game for consistent experience

## Audio Format

- **Format:** MP3
- **Sample Rate:** Varies (API default)
- **Channels:** Mono/Stereo (API default)
- **Bitrate:** Variable

---

**Generation Status:** ✅ Complete (19/19 files generated successfully)
