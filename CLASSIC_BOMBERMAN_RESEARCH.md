# Classic Bomberman Research & Reference

## Core Game Mechanics

### Grid System
- Orthogonal grid (typically 13x13 or 15x13)
- Tile-based movement (no free-form)
- Fixed cell sizes for collision

### Bomb Mechanics
- Cross-shaped explosion pattern
- Range increases with power-ups
- Chain reactions when bombs touch flames
- Timed fuse (typically 3 seconds)

### Enemy Patterns (Classic Bomberman)

#### Balloon (バルーン)
- **Behavior**: Random movement, changes direction on collision
- **Speed**: Slow
- **Intelligence**: None - pure random
- **Visual**: Round, floating red enemy
- **Strategy**: Easy to trap, predictable patterns

#### Onion (オニオン)
- **Behavior**: Moves toward player when in line of sight
- **Speed**: Medium
- **Intelligence**: Basic tracking
- **Visual**: Onion-shaped, layered appearance
- **Strategy**: Can follow but easily confused by obstacles

#### Doll (ピンキー/ダル)
- **Behavior**: Active pursuit with pathfinding
- **Speed**: Fast
- **Intelligence**: High - finds player through obstacles
- **Visual**: Humanoid shape
- **Strategy**: Requires careful bomb placement

## Key Design Principles

### Readability
- Enemy types visually distinct
- Clear telegraph of movement direction
- No off-screen enemies attacking

### Fairness
- Enemies follow same collision rules as player
- Spawn areas protected from immediate danger
- Predictable patterns allow skill expression

### Difficulty Curve
- Early levels: More slow/random enemies
- Later levels: Mix of all types, faster speeds
- Final levels: Mostly smart enemies

## AI Implementation Patterns

### Random Movement (Balloon-style)
```
1. Pick random direction from valid moves
2. Move until collision
3. Pick new random direction
4. Optional: Change direction periodically
```

### Line-of-Sight Tracking (Onion-style)
```
1. Check if player is in same row/column
2. If yes, move toward player
3. If blocked or player not visible, random movement
4. Recheck periodically
```

### Pathfinding (Tiger-style)
```
1. Calculate path to player (A* or similar)
2. Avoid bomb blast radius (if smart)
3. Prioritize power-ups when nearby
4. Dynamic repathing on obstacles
```

## Classic Power-Up System

### Types
- **Bomb Up**: +1 max bombs
- **Fire Up**: +1 explosion range
- **Speed Up**: +movement speed
- **Remote Control**: Manual bomb detonation
- **Pass Through Bombs**: Walk through own bombs
- **Pass Through Walls**: Walk through destructible walls

### Drop Mechanics
- Destroyed blocks have chance to reveal
- Enemies drop on death (varies by game)
- Typically 15-20% drop rate

## Visual Design References

### Enemy Silhouettes
- Balloon: Round, buoyant
- Onion: Tapered, layered
- Tiger: Sleek, angular

### Color Coding
- Easy enemies: Warm colors (red, orange)
- Hard enemies: Cool colors (blue, purple) or gold
- Consistent within type across levels

### Animation
- Idle: Gentle bounce/bob
- Moving: Directional lean
- Death: Quick squash or fade

## Technical Considerations

### Grid-Based AI Advantages
- Deterministic movement
- Easy collision prediction
- Simple pathfinding (A* on grid)
- Consistent timing

### Performance
- Enemies update every frame but grid positions change infrequently
- Pathfinding can be throttled (not every frame)
- Collision checks only at grid cell level

### Edge Cases
- Enemies trapped by bombs
- Multiple enemies in same area
- Player cornering scenarios
- Chain reaction timing

## BLASTFORGE Adaptations

### Modern Enhancements
- Smooth visual movement while grid-logical
- 3D models with distinct silhouettes
- Dynamic lighting on enemies
- Particle effects on death

### Simplifications
- No enemy-to-enemy collision
- Uniform hit box sizes
- Fixed spawn points per level

### Difficulty Scaling
- Enemy speed multiplier per level
- Type distribution changes
- Spawn count increases
