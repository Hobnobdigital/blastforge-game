# BLASTFORGE Audio System

Complete audio system using ElevenLabs API integration with Howler.js for the BLASTFORGE 3D Bomberman game.

## Features

- ✅ **ElevenLabs API Integration** - Generate custom high-quality SFX
- ✅ **AudioManager Class** - Singleton pattern with full game integration
- ✅ **Audio Pooling** - Performance-optimized sound reuse
- ✅ **Volume Control** - Master/Music/SFX/UI separate sliders
- ✅ **Spatial Audio** - Distance-based volume and stereo panning
- ✅ **Fuse Ticking** - Different rates for Prime (slow) and Rush (fast)
- ✅ **Dynamic Mixing** - Priority system with simultaneous sound limits
- ✅ **Music System** - Crossfade between tracks

## Quick Start

### 1. Install Dependencies

```bash
cd bomberman-game
npm install
```

### 2. Generate Sounds with ElevenLabs

```bash
# Set your API key
export ELEVENLABS_API_KEY="your-api-key-here"

# Generate all sounds
python scripts/elevenlabs-sfx-generator.py --all

# Or generate specific categories
python scripts/elevenlabs-sfx-generator.py --category explosions
python scripts/elevenlabs-sfx-generator.py --category fuse

# List available sounds
python scripts/elevenlabs-sfx-generator.py --list
```

### 3. Use in Game

```typescript
import { AudioManager, MusicTrack, AudioCategory } from '@audio/AudioManager';

// Get singleton instance
const audio = AudioManager.getInstance();

// Initialize (call after user interaction)
await audio.initialize();

// Set volumes
audio.setVolume(AudioCategory.MASTER, 1.0);
audio.setVolume(AudioCategory.SFX, 0.8);
audio.setVolume(AudioCategory.MUSIC, 0.7);

// Play sounds
audio.playBombPlace();
audio.playExplosion(3, { x: 10, y: 5 });
audio.playPowerUpCollect();

// Play music
audio.playMusic(MusicTrack.GAMEPLAY);
```

## AudioManager API

### Initialization

```typescript
const audio = AudioManager.getInstance();
await audio.initialize(); // Must be called after user gesture
```

### Volume Control

```typescript
// Set category volumes (0.0 - 1.0)
audio.setVolume(AudioCategory.MASTER, 1.0);
audio.setVolume(AudioCategory.MUSIC, 0.7);
audio.setVolume(AudioCategory.SFX, 0.8);
audio.setVolume(AudioCategory.UI, 0.5);

// Mute/unmute
audio.setMute(true);
audio.setMute(false);

// Get current volume
const sfxVol = audio.getVolume(AudioCategory.SFX);
```

### Sound Effects

```typescript
// Explosions (auto-selects based on range)
audio.playExplosion(range: number, position?: Vec3);

// Bombs
audio.playBombPlace(position?: Vec3);
audio.playFusePrime();
audio.playFuseRush();
audio.playFuseDetonate();

// Power-ups
audio.playPowerUpCollect(isRare?: boolean);
audio.playPowerUpSpawn();

// Player
audio.playPlayerDeath();
audio.playPlayerRespawn();
audio.playFootstep(position?: Vec3);

// UI
audio.playUIClick();
audio.playUIHover();
audio.playVictory();
audio.playDefeat();
```

### Fuse Ticking System

```typescript
// Start ticking when bomb is placed
audio.startFuseTick(bombId: number, isPrimed: boolean, isRushed: boolean);

// Update in game loop (called automatically in main.ts)
audio.updateFuseTick(bombId, remainingTime, isPrimed, isRushed);

// Stop when bomb explodes
audio.stopFuseTick(bombId: number);

// Stop all fuse sounds
audio.stopAllFuseTicks();
```

### Music

```typescript
// Play music track with optional crossfade
audio.playMusic(MusicTrack.GAMEPLAY, fadeDuration?: number);
audio.playMusic(MusicTrack.INTENSE);
audio.playMusic(MusicTrack.VICTORY);

// Stop music
audio.stopMusic(fadeDuration?: number);

// Check if playing
if (audio.isMusicPlaying()) {
  // ...
}
```

### Spatial Audio

```typescript
// Update listener position (player position)
audio.setListenerPosition(x, y, z?);

// Play sound at position
audio.playExplosion(range, { x: 10, y: 5, z: 0 });

// Sounds automatically:
// - Get quieter with distance
// - Pan left/right based on position
// - Cut off beyond maxDistance
```

## ElevenLabs Sound Generator

### Setup

1. Get API key from https://elevenlabs.io/app/settings/api-keys
2. Set environment variable: `export ELEVENLABS_API_KEY="your-key"`

### Usage

```bash
# Generate all sounds
python scripts/elevenlabs-sfx-generator.py --all

# Generate by category
python scripts/elevenlabs-sfx-generator.py --category explosions
python scripts/elevenlabs-sfx-generator.py --category bombs
python scripts/elevenlabs-sfx-generator.py --category fuse
python scripts/elevenlabs-sfx-generator.py --category powerups
python scripts/elevenlabs-sfx-generator.py --category player
python scripts/elevenlabs-sfx-generator.py --category ui

# Generate specific sound
python scripts/elevenlabs-sfx-generator.py --sound bomb_place

# List all available sounds
python scripts/elevenlabs-sfx-generator.py --list

# Custom output directory
python scripts/elevenlabs-sfx-generator.py --all --output ./my-audio

# Check API key
python scripts/elevenlabs-sfx-generator.py --check-api
```

### Categories

- **explosions** - Small, medium, large, chain reaction explosions
- **bombs** - Bomb placement sounds
- **fuse** - Ticking sounds (normal, primed=slow, rushed=fast) + manipulation sounds
- **powerups** - Collection and spawn sounds
- **player** - Death, respawn, hit, footstep sounds
- **environment** - Block breaking
- **ui** - Menu clicks, victory/defeat jingles

## Sound Design Philosophy

### Modern & Impactful (Not 8-bit Retro)

All sounds are designed to feel:
- **Industrial** - Metallic, mechanical, foundry-themed
- **Impactful** - Heavy, satisfying, powerful
- **Modern** - Cinematic quality, not chiptune/retro
- **Clear** - Readable in gameplay, distinct from each other

### Fuse System Audio

| State | Visual | Audio |
|-------|--------|-------|
| Normal | Orange glow | fuse_tick_normal (3s, steady) |
| Primed | Blue slow pulse | fuse_tick_primed (4.5s, slower) |
| Rushed | Red rapid pulse | fuse_tick_rushed (1.5s, faster) |

## File Structure

```
bomberman-game/
├── src/
│   └── audio/
│       ├── AudioManager.ts    # Main audio system
│       └── index.ts           # Module exports
├── assets/
│   └── audio/
│       ├── sfx/
│       │   ├── explosion_small.mp3
│       │   ├── explosion_medium.mp3
│       │   ├── explosion_large.mp3
│       │   ├── bomb_place.mp3
│       │   ├── fuse_tick_normal.mp3
│       │   ├── fuse_tick_primed.mp3
│       │   ├── fuse_tick_rushed.mp3
│       │   ├── fuse_prime.mp3
│       │   ├── fuse_rush.mp3
│       │   ├── fuse_detonate.mp3
│       │   ├── powerup_collect.mp3
│       │   ├── powerup_spawn.mp3
│       │   ├── death.mp3
│       │   ├── respawn.mp3
│       │   ├── footstep.mp3
│       │   └── block_break.mp3
│       ├── ui/
│       │   ├── menu_click.mp3
│       │   ├── menu_hover.mp3
│       │   ├── victory.mp3
│       │   └── defeat.mp3
│       └── music/
│           ├── menu_theme.mp3
│           ├── gameplay_main.mp3
│           └── gameplay_intense.mp3
└── scripts/
    └── elevenlabs-sfx-generator.py  # SFX generation script
```

## Technical Details

### Audio Pooling

Sounds that play frequently (explosions, footsteps, fuse ticks) use pooling:
- Pre-allocated Howl instances
- Reduces garbage collection
- Allows overlapping playback

### Simultaneous Limits

- **SFX**: 16 sounds max
- **UI**: 4 sounds max
- **Music**: 1 track max
- Oldest sounds stopped when limit reached

### Spatial Audio

```
Distance    Volume
0-3 tiles   100%
4-8 tiles   50-100%
9-15 tiles  0-50%
15+ tiles   Silent
```

Stereo panning based on angle from listener.

### Performance

- OGG/MP3 compressed audio
- Pooling reduces allocation
- Spatial culling (don't play distant sounds)
- Category-based limits

## Integration with Game Systems

The audio system is already integrated in `main.ts`:

```typescript
// Initialization on first user interaction
initAudio();

// Automatic sound triggers:
// - Bomb placement → playBombPlace()
// - Bomb detonation → playExplosion() + stopFuseTick()
// - Prime/Rush/Detonate → playFusePrime/Rush/Detonate()
// - Power-up collect → playPowerUpCollect()
// - Player death → playPlayerDeath()
// - Movement → playFootstep() (occasionally)

// Fuse ticking updates every frame
updateFuseTick(bombId, remainingTime, isPrimed, isRushed);
```

## Troubleshooting

### Audio doesn't play on mobile
- Audio must be initialized after user interaction
- The system handles this automatically with click/touch/key listeners

### Sounds cut off
- Check simultaneous limits (16 for SFX)
- Priority system may be dropping less important sounds

### Music gaps when looping
- Use seamless loop points in audio files
- Howler.js handles looping automatically

### Files not found
- Ensure assets are in correct directory structure
- Check browser console for 404 errors
- Verify build process includes audio assets

## License

ElevenLabs-generated sounds follow ElevenLabs' terms of service:
- Free tier: Attribution required
- Paid tier: Commercial use allowed

See https://elevenlabs.io/terms for details.

## Credits

- Audio System: Implemented with ElevenLabs Sound Effects API
- Audio Library: Howler.js (https://howlerjs.com/)
- Game: BLASTFORGE - "Master the Fuse. Control the Chaos."
