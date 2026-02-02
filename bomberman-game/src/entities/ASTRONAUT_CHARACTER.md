# Astronaut Character

## Overview

The `AstronautCharacter` class is a procedural 3D character implementation for the Bomberman game, featuring a big helmet astronaut design with chibi proportions and modern AAA mobile game aesthetics.

## Character Design Features

- **Oversized Round Helmet**: 60% of body proportion, glossy reflective glass material
- **Chibi/Cute Proportions**: Small body with big head for adorable aesthetic
- **Modern 2026 AAA Mobile Style**: Smooth rounded forms, PBR materials
- **White and Orange Spacesuit**: Configurable color schemes per player
- **Backpack/Jetpack**: Detail with animated particle effects

## Technical Implementation

### Procedural Geometry
- **Helmet**: SphereGeometry with physical glass material
- **Body**: CapsuleGeometry for smooth rounded torso
- **Limbs**: CapsuleGeometry for arms and legs with accent stripes
- **Backpack**: RoundedBoxGeometry with jetpack nozzles

### PBR Materials
- **Suit**: MeshStandardMaterial (roughness: 0.6, metalness: 0.1)
- **Accents**: MeshStandardMaterial with emissive glow
- **Glass Helmet**: MeshPhysicalMaterial with transmission for realistic glass
- **Backpack**: Dark metallic finish

### Animation System
- **Idle**: Gentle bobbing, breathing, subtle arm sway
- **Walk**: Limb movement with bounce and body tilt
- **Death**: Spin and shrink animation with flailing limbs
- **Place Bomb**: Crouch and extend arms
- **Victory**: Jumping celebration with raised arms

## Usage

### Basic Usage

```typescript
import { AstronautCharacter, AstronautAnimationState } from '@entities/AstronautCharacter';

// Create character for player 0
const astronaut = new AstronautCharacter({
  playerId: 0,
  scale: 1.0,
});

// Add to scene
scene.add(astronaut.root);

// Set position
astronaut.setPosition(5, 0, 5);

// Update in game loop
function update(deltaTime: number) {
  astronaut.update(deltaTime);
}
```

### Configuration Options

```typescript
interface AstronautConfig {
  suitColor?: number;    // Main suit color (default: white)
  accentColor?: number;  // Secondary color (default: orange)
  glassTint?: number;    // Helmet glass tint (default: gold)
  scale?: number;        // Character scale (default: 1)
  playerId?: number;     // Player ID for auto color scheme
}
```

### Animation States

```typescript
enum AstronautAnimationState {
  IDLE = 'idle',
  WALK = 'walk',
  DEATH = 'death',
  PLACE_BOMB = 'place_bomb',
  VICTORY = 'victory',
}

// Set animation state
astronaut.setAnimationState(AstronautAnimationState.WALK);

// Trigger death
astronaut.die();

// Reset after death
astronaut.reset();
```

### Player Color Schemes

The character automatically assigns color schemes based on player ID:

| Player ID | Suit Color | Accent Color | Glass Tint |
|-----------|------------|--------------|------------|
| 0 | White | Orange | Gold |
| 1 | Light Gray | Cyan | Sky Blue |
| 2 | White | Pink | Hot Pink |
| 3 | Off-white | Green | Light Green |
| 4 | Gray | Purple | Plum |
| 5 | White | Gold | Gold |
| 6 | White | Red | Light Red |
| 7 | Gray | Blue | Light Blue |

## API Reference

### Methods

- `setPosition(x, y, z)` - Set character world position
- `setRotationY(angle)` - Set character rotation (radians)
- `setAnimationState(state)` - Change animation state
- `update(deltaTime)` - Update animations (call every frame)
- `die()` - Trigger death animation
- `reset()` - Reset to initial state
- `setVisible(visible)` - Show/hide character
- `flash(duration)` - Flash white (damage feedback)
- `setEmissiveIntensity(intensity)` - Boost accent glow
- `dispose()` - Clean up resources

### Getters

- `getPosition()` - Get current position (Vector3)
- `getRotationY()` - Get current rotation
- `getAnimationState()` - Get current animation state
- `isDeathComplete()` - Check if death animation finished
- `getBoundingRadius()` - Get collision radius

## Integration with SceneManager

The `SceneManager` automatically creates and manages `AstronautCharacter` instances for each player:

```typescript
// In SceneManager.syncPlayers()
const astronaut = new AstronautCharacter({
  playerId: playerIndex,
  scale: 1.0,
});
scene.add(astronaut.root);

// Animation is determined by player movement state
if (player.moveDir !== 0) {
  astronaut.setAnimationState(AstronautAnimationState.WALK);
} else {
  astronaut.setAnimationState(AstronautAnimationState.IDLE);
}
```

## Performance Considerations

- Characters are pooled and reused based on player count
- Animation updates are batched in the render loop
- Materials are shared where possible
- Geometry is created procedurally (no external asset loading)
- Death animation automatically hides character when complete

## Visual Effects

- **Jetpack Particles**: Animated flame particles from backpack
- **Glass Reflection**: Physical material with environment reflection
- **Emissive Accents**: Glow effect on colored sections
- **Shadow Casting**: All parts cast and receive shadows
- **Flash Effect**: White flash for damage/hit feedback
