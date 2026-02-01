#!/usr/bin/env python3
"""
Generate sound effects using ElevenLabs Sound Effects API
"""
import os
import sys
import json
import urllib.request
import urllib.error
from datetime import datetime

def generate_sound_effect(prompt, duration_seconds=None, prompt_influence=0.3, output_dir="./tmp/elevenlabs-sfx"):
    """
    Generate a sound effect using ElevenLabs API
    
    Args:
        prompt: Text description of the sound effect
        duration_seconds: Length of sound (optional, API will choose if not specified)
        prompt_influence: How closely to follow the prompt (0.0-1.0, default 0.3)
        output_dir: Directory to save the generated audio
    """
    api_key = os.environ.get("ELEVENLABS_API_KEY")
    if not api_key:
        raise ValueError("ELEVENLABS_API_KEY environment variable not set")
    
    # Create output directory
    timestamp = datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
    out_path = os.path.join(output_dir, timestamp)
    os.makedirs(out_path, exist_ok=True)
    
    # Prepare API request
    url = "https://api.elevenlabs.io/v1/sound-generation"
    
    payload = {
        "text": prompt,
        "prompt_influence": prompt_influence
    }
    
    if duration_seconds is not None:
        payload["duration_seconds"] = duration_seconds
    
    headers = {
        "xi-api-key": api_key,
        "Content-Type": "application/json"
    }
    
    print(f"Generating sound: {prompt}")
    print(f"Duration: {duration_seconds}s" if duration_seconds else "Duration: Auto")
    print(f"Prompt influence: {prompt_influence}")
    
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
            output_file = os.path.join(out_path, "sound.mp3")
            
            with open(output_file, 'wb') as f:
                f.write(audio_data)
            
            print(f"\nSaved: {output_file}")
            print(f"Size: {len(audio_data)} bytes")
            
            # Save metadata
            metadata = {
                "prompt": prompt,
                "duration_seconds": duration_seconds,
                "prompt_influence": prompt_influence,
                "timestamp": timestamp,
                "file": "sound.mp3"
            }
            
            metadata_file = os.path.join(out_path, "metadata.json")
            with open(metadata_file, 'w') as f:
                json.dump(metadata, f, indent=2)
            
            return output_file
            
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        raise RuntimeError(f"ElevenLabs Sound Effects API failed ({e.code}): {error_body}") from e
    except urllib.error.URLError as e:
        raise RuntimeError(f"Network error: {e.reason}") from e

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description="Generate sound effects with ElevenLabs")
    parser.add_argument("prompt", help="Description of the sound effect to generate")
    parser.add_argument("--duration", type=float, help="Duration in seconds (optional)")
    parser.add_argument("--influence", type=float, default=0.3, 
                       help="Prompt influence 0.0-1.0 (default: 0.3)")
    parser.add_argument("--out-dir", default="./tmp/elevenlabs-sfx",
                       help="Output directory (default: ./tmp/elevenlabs-sfx)")
    
    args = parser.parse_args()
    
    try:
        output_file = generate_sound_effect(
            args.prompt,
            duration_seconds=args.duration,
            prompt_influence=args.influence,
            output_dir=args.out_dir
        )
        return 0
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return 1

if __name__ == "__main__":
    sys.exit(main())
