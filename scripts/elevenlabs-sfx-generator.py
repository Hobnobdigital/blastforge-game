#!/usr/bin/env python3
"""
ElevenLabs SFX Generator for BLASTFORGE

Generates high-quality sound effects using ElevenLabs Sound Effects API.
All sounds are designed to be modern, impactful, and fit the industrial/demolition theme.

Usage:
    python elevenlabs-sfx-generator.py --all              # Generate all sounds
    python elevenlabs-sfx-generator.py --category explosions  # Generate explosions only
    python elevenlabs-sfx-generator.py --sound bomb_place     # Generate specific sound
    python elevenlabs-sfx-generator.py --list               # List available sounds

Environment:
    Requires ELEVENLABS_API_KEY environment variable
"""

import os
import sys
import json
import urllib.request
import urllib.error
import argparse
from datetime import datetime
from pathlib import Path
from typing import Optional, Dict, List
from dataclasses import dataclass


@dataclass
class SoundDefinition:
    """Definition of a sound effect to generate"""
    name: str
    prompt: str
    duration: Optional[float]
    influence: float
    category: str
    filename: str
    description: str


# Sound effect definitions with ElevenLabs prompts
# All prompts designed for modern, impactful sounds (not 8-bit retro)
SOUND_DEFINITIONS: List[SoundDefinition] = [
    # Explosions - Different intensities
    SoundDefinition(
        name="explosion_small",
        prompt="Small controlled explosion, compact bomb blast, sharp crack with debris, industrial demolition charge, modern game sound effect, punchy and satisfying",
        duration=1.5,
        influence=0.4,
        category="explosions",
        filename="explosion_small.mp3",
        description="Small explosion for low-range bombs"
    ),
    SoundDefinition(
        name="explosion_medium",
        prompt="Medium explosion, bomb blast with echo, powerful boom with debris scattering, industrial foundry explosion, cinematic impact, modern game audio",
        duration=2.0,
        influence=0.4,
        category="explosions",
        filename="explosion_medium.mp3",
        description="Standard explosion for normal bombs"
    ),
    SoundDefinition(
        name="explosion_large",
        prompt="Massive explosion, huge bomb detonation, deep resonant boom with shockwave, industrial demolition blast, earth-shaking impact, cinematic game audio, powerful and satisfying",
        duration=2.5,
        influence=0.45,
        category="explosions",
        filename="explosion_large.mp3",
        description="Large explosion for high-range bombs"
    ),
    SoundDefinition(
        name="explosion_chain",
        prompt="Chain reaction explosions, multiple bombs detonating in sequence, cascading blasts with overlapping echoes, industrial demolition chain, rhythmic explosive impacts",
        duration=3.0,
        influence=0.4,
        category="explosions",
        filename="explosion_chain.mp3",
        description="Chain reaction explosion sequence"
    ),
    
    # Bomb placement
    SoundDefinition(
        name="bomb_place",
        prompt="Heavy mechanical object placing sound, industrial bomb deployment, satisfying mechanical clunk, metal and ceramic impact, modern arcade game audio, crisp and clear",
        duration=0.5,
        influence=0.35,
        category="bombs",
        filename="bomb_place.mp3",
        description="Sound when placing a bomb"
    ),
    
    # Fuse ticking - Different speeds for Prime/Rush mechanics
    SoundDefinition(
        name="fuse_tick_normal",
        prompt="Bomb fuse ticking, steady rhythmic clicking, mechanical timer sound, industrial detonator ticking, moderate pace, building tension, loopable",
        duration=3.0,
        influence=0.35,
        category="fuse",
        filename="fuse_tick_normal.mp3",
        description="Normal fuse ticking (3 second fuse)"
    ),
    SoundDefinition(
        name="fuse_tick_primed",
        prompt="Bomb fuse slow ticking, deep resonant mechanical clicks, extended timer, slower pace for primed bombs, industrial clockwork, ominous and deliberate",
        duration=4.5,
        influence=0.35,
        category="fuse",
        filename="fuse_tick_primed.mp3",
        description="Slow fuse ticking for Primed bombs (4.5 second fuse)"
    ),
    SoundDefinition(
        name="fuse_tick_rushed",
        prompt="Bomb fuse rapid ticking, fast urgent mechanical clicks, accelerated timer, quick pace for rushed bombs, industrial alarm clock, tension building",
        duration=1.5,
        influence=0.35,
        category="fuse",
        filename="fuse_tick_rushed.mp3",
        description="Fast fuse ticking for Rushed bombs (1.5 second fuse)"
    ),
    
    # Fuse manipulation sounds
    SoundDefinition(
        name="fuse_prime",
        prompt="Mechanical extension sound, industrial gear engaging, bomb timer extending, hydraulic hiss with mechanical click, power-up activation, positive feedback",
        duration=0.8,
        influence=0.4,
        category="fuse",
        filename="fuse_prime.mp3",
        description="Sound when Priming a bomb (extending fuse)"
    ),
    SoundDefinition(
        name="fuse_rush",
        prompt="Mechanical acceleration sound, industrial gears spinning up, bomb timer compressing, servo motor whir with click, urgency activation, aggressive feedback",
        duration=0.6,
        influence=0.4,
        category="fuse",
        filename="fuse_rush.mp3",
        description="Sound when Rushing a bomb (shortening fuse)"
    ),
    SoundDefinition(
        name="fuse_detonate",
        prompt="Remote detonation trigger, mechanical switch activation, bomb remote firing, sharp electronic click with charge build-up, instant trigger sound",
        duration=0.5,
        influence=0.4,
        category="fuse",
        filename="fuse_detonate.mp3",
        description="Sound when remotely detonating a bomb"
    ),
    
    # Power-ups
    SoundDefinition(
        name="powerup_collect",
        prompt="Power-up collection sound, energy absorption, positive item pickup, bright ascending chimes, magical tech sound, satisfying reward feedback, modern game audio",
        duration=0.8,
        influence=0.35,
        category="powerups",
        filename="powerup_collect.mp3",
        description="Standard power-up collection"
    ),
    SoundDefinition(
        name="powerup_rare",
        prompt="Rare power-up collection, legendary item pickup, epic reward sound, orchestral hit mixed with electronic shimmer, golden sparkle effect, highly satisfying",
        duration=1.2,
        influence=0.4,
        category="powerups",
        filename="powerup_rare.mp3",
        description="Rare/legendary power-up collection"
    ),
    SoundDefinition(
        name="powerup_spawn",
        prompt="Power-up spawn appearance, item materializing, magical object appearing, shimmer and sparkle sound, tech-magic hybrid, brief and magical",
        duration=0.6,
        influence=0.35,
        category="powerups",
        filename="powerup_spawn.mp3",
        description="When a power-up spawns from a destroyed block"
    ),
    
    # Player sounds
    SoundDefinition(
        name="player_death",
        prompt="Character death sound, player elimination, dramatic defeat impact, explosion hit on character, game over sting, quick and punchy",
        duration=1.5,
        influence=0.4,
        category="player",
        filename="player_death.mp3",
        description="Player death sound"
    ),
    SoundDefinition(
        name="player_respawn",
        prompt="Character respawn sound, player revival, energy reconstitution, teleport in effect, hopeful restart sound, magical tech reappearance",
        duration=1.0,
        influence=0.35,
        category="player",
        filename="player_respawn.mp3",
        description="Player respawn sound"
    ),
    SoundDefinition(
        name="player_hit",
        prompt="Character hit sound, player taking damage, impact grunt, shield hit, warning feedback, quick and sharp",
        duration=0.4,
        influence=0.35,
        category="player",
        filename="player_hit.mp3",
        description="Player taking damage (if health system exists)"
    ),
    
    # Movement
    SoundDefinition(
        name="footstep",
        prompt="Quick footstep on industrial floor, tile floor step, light mechanical impact, character movement sound, subtle and rhythmic",
        duration=0.2,
        influence=0.3,
        category="movement",
        filename="footstep.mp3",
        description="Player footstep"
    ),
    
    # Environment
    SoundDefinition(
        name="block_break",
        prompt="Wooden crate destruction, block breaking, satisfying smash, debris scattering, industrial crate shatter, game destruction sound",
        duration=0.8,
        influence=0.35,
        category="environment",
        filename="block_break.mp3",
        description="Soft block destruction"
    ),
    
    # UI Sounds
    SoundDefinition(
        name="ui_click",
        prompt="UI button click, menu selection, satisfying digital click, modern interface sound, crisp and clean",
        duration=0.15,
        influence=0.3,
        category="ui",
        filename="menu_click.mp3",
        description="Menu button click"
    ),
    SoundDefinition(
        name="ui_hover",
        prompt="UI hover sound, menu highlight, soft selection tick, subtle interface feedback, gentle and modern",
        duration=0.1,
        influence=0.3,
        category="ui",
        filename="menu_hover.mp3",
        description="Menu hover highlight"
    ),
    SoundDefinition(
        name="ui_back",
        prompt="UI back button, menu return, cancel action, lower tone click, negative feedback, clear and responsive",
        duration=0.15,
        influence=0.3,
        category="ui",
        filename="menu_back.mp3",
        description="Menu back/cancel"
    ),
    SoundDefinition(
        name="countdown",
        prompt="Match countdown beep, game start timer, electronic beep, tense anticipation, crisp and clear",
        duration=0.3,
        influence=0.3,
        category="ui",
        filename="countdown.mp3",
        description="Match countdown (3-2-1)"
    ),
    
    # Victory/Defeat
    SoundDefinition(
        name="victory",
        prompt="Victory fanfare, game win jingle, triumphant orchestral hit with electronic elements, celebration sound, epic and satisfying",
        duration=3.0,
        influence=0.45,
        category="ui",
        filename="victory.mp3",
        description="Victory jingle when winning"
    ),
    SoundDefinition(
        name="defeat",
        prompt="Defeat sound, game over, sad but not harsh, descending musical phrase, failure sting, encouraging retry feel",
        duration=2.0,
        influence=0.4,
        category="ui",
        filename="defeat.mp3",
        description="Defeat sound when losing"
    ),
]


def get_api_key() -> str:
    """Get ElevenLabs API key from environment"""
    api_key = os.environ.get("ELEVENLABS_API_KEY")
    if not api_key:
        raise ValueError(
            "ELEVENLABS_API_KEY environment variable not set.\n"
            "Get your API key from: https://elevenlabs.io/app/settings/api-keys"
        )
    return api_key


def generate_sound_effect(
    definition: SoundDefinition,
    output_dir: Path,
    api_key: str
) -> Path:
    """
    Generate a sound effect using ElevenLabs API
    
    Args:
        definition: Sound definition with prompt and parameters
        output_dir: Directory to save the generated audio
        api_key: ElevenLabs API key
        
    Returns:
        Path to the generated audio file
    """
    category_dir = output_dir / definition.category
    category_dir.mkdir(parents=True, exist_ok=True)
    
    output_file = category_dir / definition.filename
    
    # Prepare API request
    url = "https://api.elevenlabs.io/v1/sound-generation"
    
    payload = {
        "text": definition.prompt,
        "prompt_influence": definition.influence
    }
    
    if definition.duration is not None:
        payload["duration_seconds"] = definition.duration
    
    headers = {
        "xi-api-key": api_key,
        "Content-Type": "application/json"
    }
    
    print(f"\n🎵 Generating: {definition.name}")
    print(f"   Category: {definition.category}")
    print(f"   Prompt: {definition.prompt[:60]}...")
    if definition.duration:
        print(f"   Duration: {definition.duration}s")
    print(f"   Influence: {definition.influence}")
    
    # Make request
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers=headers,
        method='POST'
    )
    
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            if resp.status != 200:
                error_body = resp.read().decode('utf-8')
                raise RuntimeError(f"ElevenLabs API failed ({resp.status}): {error_body}")
            
            # Save audio file
            audio_data = resp.read()
            
            with open(output_file, 'wb') as f:
                f.write(audio_data)
            
            file_size = len(audio_data) / 1024  # KB
            print(f"   ✅ Saved: {output_file} ({file_size:.1f} KB)")
            
            # Save metadata
            metadata = {
                "name": definition.name,
                "description": definition.description,
                "prompt": definition.prompt,
                "duration_seconds": definition.duration,
                "prompt_influence": definition.influence,
                "category": definition.category,
                "filename": definition.filename,
                "generated_at": datetime.now().isoformat(),
                "file_size_kb": round(file_size, 2)
            }
            
            metadata_file = category_dir / f"{definition.name}.json"
            with open(metadata_file, 'w') as f:
                json.dump(metadata, f, indent=2)
            
            return output_file
            
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        raise RuntimeError(f"ElevenLabs API failed ({e.code}): {error_body}") from e
    except urllib.error.URLError as e:
        raise RuntimeError(f"Network error: {e.reason}") from e


def list_sounds():
    """List all available sound definitions"""
    print("\n📋 Available Sound Effects:\n")
    
    categories = {}
    for sound in SOUND_DEFINITIONS:
        if sound.category not in categories:
            categories[sound.category] = []
        categories[sound.category].append(sound)
    
    for category, sounds in sorted(categories.items()):
        print(f"\n📁 {category.upper()}")
        print("-" * 50)
        for sound in sounds:
            duration_str = f"{sound.duration}s" if sound.duration else "auto"
            print(f"  • {sound.name}")
            print(f"    File: {sound.filename}")
            print(f"    Duration: {duration_str}")
            print(f"    Desc: {sound.description}")
            print()


def generate_category(category: str, output_dir: Path, api_key: str):
    """Generate all sounds in a category"""
    sounds = [s for s in SOUND_DEFINITIONS if s.category == category]
    
    if not sounds:
        print(f"❌ Unknown category: {category}")
        print(f"   Available categories: {', '.join(set(s.category for s in SOUND_DEFINITIONS))}")
        return
    
    print(f"\n🎯 Generating {len(sounds)} sounds for category: {category}\n")
    
    success = 0
    failed = 0
    
    for sound in sounds:
        try:
            generate_sound_effect(sound, output_dir, api_key)
            success += 1
        except Exception as e:
            print(f"   ❌ Failed: {e}")
            failed += 1
    
    print(f"\n📊 Category Complete: {success} succeeded, {failed} failed")


def generate_all(output_dir: Path, api_key: str):
    """Generate all sound effects"""
    categories = set(s.category for s in SOUND_DEFINITIONS)
    total_sounds = len(SOUND_DEFINITIONS)
    
    print(f"\n🚀 Generating all {total_sounds} sound effects...\n")
    print("=" * 60)
    
    success = 0
    failed = 0
    
    for category in sorted(categories):
        sounds = [s for s in SOUND_DEFINITIONS if s.category == category]
        print(f"\n📁 Category: {category.upper()} ({len(sounds)} sounds)")
        print("-" * 40)
        
        for sound in sounds:
            try:
                generate_sound_effect(sound, output_dir, api_key)
                success += 1
            except Exception as e:
                print(f"   ❌ Failed: {e}")
                failed += 1
    
    print("\n" + "=" * 60)
    print(f"\n📊 Generation Complete: {success}/{total_sounds} succeeded")
    if failed > 0:
        print(f"   ⚠️  {failed} sounds failed")
    print(f"\n📂 Output directory: {output_dir}")


def generate_single(sound_name: str, output_dir: Path, api_key: str):
    """Generate a single sound effect"""
    sound = next((s for s in SOUND_DEFINITIONS if s.name == sound_name), None)
    
    if not sound:
        print(f"❌ Unknown sound: {sound_name}")
        print(f"   Use --list to see available sounds")
        return
    
    print(f"\n🎯 Generating single sound: {sound_name}\n")
    
    try:
        output_file = generate_sound_effect(sound, output_dir, api_key)
        print(f"\n✅ Success! Saved to: {output_file}")
    except Exception as e:
        print(f"\n❌ Failed: {e}")
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(
        description="Generate sound effects using ElevenLabs API for BLASTFORGE",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Generate all sounds
  python elevenlabs-sfx-generator.py --all
  
  # Generate specific category
  python elevenlabs-sfx-generator.py --category explosions
  
  # Generate single sound
  python elevenlabs-sfx-generator.py --sound bomb_place
  
  # List all available sounds
  python elevenlabs-sfx-generator.py --list
  
  # Custom output directory
  python elevenlabs-sfx-generator.py --all --output ./my-audio

Environment:
  Requires ELEVENLABS_API_KEY environment variable.
  Get your API key from: https://elevenlabs.io/app/settings/api-keys
        """
    )
    
    parser.add_argument('--all', action='store_true',
                       help='Generate all sound effects')
    parser.add_argument('--category', type=str,
                       help='Generate all sounds in a category')
    parser.add_argument('--sound', type=str,
                       help='Generate a specific sound by name')
    parser.add_argument('--list', action='store_true',
                       help='List all available sound definitions')
    parser.add_argument('--output', type=str, default='./assets/audio',
                       help='Output directory (default: ./assets/audio)')
    parser.add_argument('--check-api', action='store_true',
                       help='Check if API key is configured')
    
    args = parser.parse_args()
    
    # Check API key if requested or if generating sounds
    if args.check_api or args.all or args.category or args.sound:
        try:
            api_key = get_api_key()
            if args.check_api:
                print("✅ ELEVENLABS_API_KEY is configured")
                return 0
        except ValueError as e:
            print(f"❌ {e}")
            return 1
    
    # List sounds
    if args.list:
        list_sounds()
        return 0
    
    # Setup output directory
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Generate sounds based on arguments
    if args.all:
        generate_all(output_dir, api_key)
    elif args.category:
        generate_category(args.category, output_dir, api_key)
    elif args.sound:
        generate_single(args.sound, output_dir, api_key)
    else:
        parser.print_help()
        print("\n❌ No action specified. Use --all, --category, --sound, or --list")
        return 1
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
