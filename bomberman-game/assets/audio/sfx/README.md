# BLASTFORGE Audio Effects

This directory contains all sound effects for the BLASTFORGE game, generated using ElevenLabs Sound Effects API.

## Quick Reference

**Total Files:** 19 sound effects  
**Format:** MP3 (128 kbps, 44.1 kHz, Stereo)  
**Generated:** 2025-02-01

## File Categories

### Bomb Sounds (4)
- `bomb_place.mp3` - Place bomb
- `fuse_tick_normal.mp3` - Normal countdown (loop)
- `fuse_tick_primed.mp3` - Extended fuse (loop)
- `fuse_tick_rushed.mp3` - Fast countdown (loop)

### Explosions (3)
- `explosion_small.mp3` - Small blast
- `explosion_medium.mp3` - Medium blast
- `explosion_large.mp3` - Large blast

### Power-ups (2)
- `powerup_collect.mp3` - Collect item
- `powerup_spawn.mp3` - Item appears

### Player (3)
- `footstep.mp3` - Movement
- `death.mp3` - Game over
- `respawn.mp3` - Respawn

### UI (4)
- `menu_click.mp3` - Button click
- `menu_hover.mp3` - Button hover
- `victory.mp3` - Win fanfare
- `defeat.mp3` - Lose sound

### Fuse Abilities (3)
- `fuse_prime.mp3` - Extend fuse time
- `fuse_rush.mp3` - Shorten fuse time
- `fuse_detonate.mp3` - Manual trigger

## Documentation

See `AUDIO_MANIFEST.md` for complete details including prompts, durations, and usage notes.

## Integration

All files are ready for direct integration into your game engine. Consider:
- Looping the `fuse_tick_*.mp3` files seamlessly
- Volume normalization across all effects
- Pitch variation on repetitive sounds (footsteps)

