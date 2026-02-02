# Astronaut Character - Visual Reference

## Design Specifications

### Proportions (Chibi Style)
```
Total Height: ~1.4 units

Helmet (60% of visual mass):
  - Radius: 0.45 units
  - Material: Physical glass with transmission
  - Rim: Accent color torus

Body (30% of height):
  - Capsule radius: 0.22 units
  - Height: 0.35 units
  - Material: Matte fabric

Limbs:
  - Arm length: 0.28 units
  - Leg length: 0.25 units
  - Radius: 0.08 units

Backpack:
  - Size: 0.35 x 0.4 x 0.2 units
  - Nozzles with particle effects
```

## Color Palette

### Primary: White Spacesuit
- Base: `#F5F5F5` (very light gray)
- Roughness: 0.6 (fabric-like)
- Metalness: 0.1 (slight)

### Secondary: Orange Accents
- Accent: `#FF6B35` (vibrant orange)
- Roughness: 0.3
- Metalness: 0.4
- Emissive: 0.1 intensity

### Glass Helmet
- Tint: `#FFD700` (gold)
- Transmission: 0.95
- Roughness: 0.05
- Clearcoat: 1.0
- IOR: 1.5

## Animation Details

### Idle Animation
```
Frequency: 2 Hz bobbing
Amplitude: 0.03 units Y-axis
Breathing: 1.5 Hz scale pulse (+2%)
Arm Sway: ±0.05 radians
Head Tilt: ±0.03 radians
```

### Walk Animation
```
Frequency: 8 Hz (fast steps)
Limb Swing: ±0.5 radians
Bounce: 0.08 units (absolute sine)
Body Tilt: ±0.05 radians Z-axis
Phase: Arms opposite to legs
```

### Death Animation
```
Duration: 1.5 seconds
Phase 1 (0-30%): Rise 1.5 units
Phase 2 (30-100%): Fall while spinning
Spin Rate: 5 → 15 rad/s
Scale: 100% → 0%
Arm Flail: ±0.8 radians
```

## Material Properties

### PBR Workflow: Metallic/Roughness

| Part | Color | Roughness | Metalness | Emissive |
|------|-------|-----------|-----------|----------|
| Suit | White | 0.6 | 0.1 | No |
| Accent | Orange | 0.3 | 0.4 | Yes (0.1) |
| Glass | Gold tint | 0.05 | 0.1 | No |
| Backpack | Dark Gray | 0.5 | 0.6 | No |

## Three.js Implementation

### Geometry Primitives Used
```typescript
// Helmet
new THREE.SphereGeometry(0.45, 32, 32)

// Body  
new THREE.CapsuleGeometry(0.22, 0.35, 4, 16)

// Limbs
new THREE.CapsuleGeometry(0.08, 0.28, 4, 12)

// Backpack
new RoundedBoxGeometry(0.35, 0.4, 0.2, 4, 0.05)

// Nozzles
new THREE.CylinderGeometry(0.05, 0.04, 0.15, 8)

// Helmet Rim
new THREE.TorusGeometry(0.3825, 0.04, 8, 32)
```

### Material Setup
```typescript
// Glass Material
new THREE.MeshPhysicalMaterial({
  color: 0xffd700,
  metalness: 0.1,
  roughness: 0.05,
  transmission: 0.95,
  thickness: 0.5,
  ior: 1.5,
  clearcoat: 1.0,
  clearcoatRoughness: 0.05,
  transparent: true,
  opacity: 0.3
})
```

## Scene Integration

### Scale Reference
```
Grid Tile: 1.0 x 1.0 units
Character Height: ~1.4 units (with helmet)
Character Width: ~0.9 units (helmet diameter)
Base Scale: 0.6 (relative to world)
```

### Positioning
```
Y-offset: 0 (feet on ground)
Center offset: X and Z at tile center
Rotation: Y-axis facing movement direction
```

## Performance Budget

- **Polygons**: ~2,500 tris per character
- **Materials**: 4 unique materials (shared across instances)
- **Draw Calls**: 1 per character part batch
- **Particles**: 6 jetpack particles per character
- **Recommended Max**: 8 characters on screen

## Visual Effects

### Jetpack Particles
- Count: 6 particles
- Color: Match accent color
- Animation: Sine wave cycle, fade out
- Light: PointLight with pulse

### Glass Reflection
- Environment mapping recommended
- Reflection intensity: 1.5
- Subtle inner glow highlight

### Shadows
- Cast: Enabled on all parts
- Receive: Enabled
- Map size: 1024x1024 (directional light)
