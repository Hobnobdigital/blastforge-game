import requests
import json
import base64
import os

api_key = os.environ.get('OPENAI_API_KEY')
if not api_key:
    print("OPENAI_API_KEY not set")
    exit(1)

prompts = {
    "astronaut_character": "A cute 3D astronaut character for a mobile game, featuring an oversized round helmet that dominates the body proportion, stylized 2026 AAA mobile game art style, glossy reflective glass helmet with subtle blue tint, white and orange spacesuit with modern design, small chibi-like body proportions, soft lighting, clean minimalist aesthetic, Unreal Engine 5 mobile render style, transparent background, character facing forward, high detail but optimized for mobile, rounded smooth forms not blocky",
    "miami_beach_theme": "Miami Beach themed game level environment for a Bomberman-style game, isometric 3D view, vibrant sunset colors, golden sand with subtle wave patterns, palm trees with animated fronds, turquoise ocean water in background with gentle waves, pastel pink and orange sky, neon accents on buildings, beach umbrellas, surfboards as decorative elements, clean modern 2026 mobile game aesthetic, bright cheerful lighting, stylized but detailed, high quality mobile game environment art",
    "grassy_fields_theme": "Grassy Fields themed game level environment for a Bomberman-style game, isometric 3D view, lush vibrant green meadows, wildflowers in multiple colors (pink, yellow, purple), rolling hills background, large oak trees with detailed foliage, butterflies and small birds as ambient details, bright sunny day with soft clouds, organic natural shapes, fresh morning lighting, dew drops on grass, mushrooms and rocks as decorative elements, modern 2026 mobile game aesthetic, cheerful nature vibes",
    "cyberpunk_city_theme": "Cyberpunk City themed game level environment for a Bomberman-style game, isometric 3D view, neon-lit futuristic cityscape, holographic billboards, glowing pink and cyan neon lights reflecting on wet streets, flying cars in background, skyscrapers with LED patterns, rain-slicked surfaces, dark purple and blue color palette with bright neon accents, cyberpunk 2077 inspired but mobile-optimized, high tech aesthetic, volumetric fog with colored lights, 2026 AAA mobile game quality, sleek modern design",
    "space_station_theme": "Space Station themed game level environment for a Bomberman-style game, isometric 3D view, sci-fi metallic interior, sleek white and silver panels with blue LED accent lighting, view of Earth and stars through large windows, floating holographic displays, clean futuristic design, space crates and containers, artificial gravity sections, high-tech machinery, sterile but inviting atmosphere, metallic textures with brushed finish, modern 2026 mobile game aesthetic, volumetric lighting from above",
    "volcano_lava_theme": "Volcano Lava themed game level environment for a Bomberman-style game, isometric 3D view, dangerous volcanic landscape, flowing lava rivers with glow, obsidian black rock formations, steam rising from fissures, glowing cracks in ground, ash particles in air, dark orange and red color palette with intense yellow lava glow, volcanic boulders, charred ancient ruins, dramatic lighting from below, dangerous ominous atmosphere, molten metal structures, 2026 AAA mobile game quality, intense and energetic",
    "ice_world_theme": "Ice World themed game level environment for a Bomberman-style game, isometric 3D view, frozen crystalline landscape, translucent ice formations, snow-covered ground with sparkle effects, aurora borealis in night sky, blue and white color palette with purple aurora accents, ice crystals and icicles, frozen waterfalls, crystalline structures, magical winter atmosphere, soft cool lighting, frost patterns, penguins and snow elements, ethereal glow effects, 2026 AAA mobile game quality, serene and beautiful"
}

for name, prompt in prompts.items():
    print(f"Generating {name}...")
    try:
        response = requests.post(
            "https://api.openai.com/v1/images/generations",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-image-1",
                "prompt": prompt,
                "n": 1,
                "size": "1024x1024",
                "quality": "high"
            },
            timeout=300
        )
        data = response.json()
        if 'data' in data and len(data['data']) > 0:
            image_data = data['data'][0]['b64_json']
            with open(f"{name}.png", "wb") as f:
                f.write(base64.b64decode(image_data))
            print(f"  Saved {name}.png")
        else:
            print(f"  Error: {data}")
    except Exception as e:
        print(f"  Exception: {e}")

print("Done!")
