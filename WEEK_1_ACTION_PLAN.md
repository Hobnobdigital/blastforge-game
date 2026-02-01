# BLASTFORGE - Week 1 Action Plan

## Day 1-2: Foundation & Grid System
- [x] Set up Three.js project structure
- [x] Implement grid-based movement system
- [x] Create Cell class with walkable/obstacle states
- [x] Add destructible and indestructible walls

## Day 3-4: Player & Basic Systems  
- [x] Player entity with movement
- [x] Bomb placement system
- [x] Explosion propagation (cross pattern)
- [x] Wall destruction mechanics
- [x] Power-up collection

## Day 5-7: Enemy AI System ⭐ CURRENT FOCUS
- [x] Base Enemy class
  - Grid-based movement
  - Death detection
  - Visual representation
- [x] Three enemy types with distinct behaviors:
  - **Balloon (Easy)**: Random movement, no bomb awareness
  - **Onion (Medium)**: Pathfinding toward player, faster
  - **Tiger (Hard)**: Bomb avoidance, power-up seeking, advanced tracking
- [x] Enemy spawning system
- [x] Power-up drops on enemy death (15% chance)
- [x] Integration with GameState

## Implementation Details

### Enemy AI Behaviors

#### Balloon (Easy Difficulty)
- Movement: Pure random direction selection
- Speed: 0.8x base speed
- Intelligence: No awareness of player or bombs
- Visual: Round, bouncy red sphere

#### Onion (Medium Difficulty)  
- Movement: Basic pathfinding toward player
- Speed: 1.2x base speed
- Intelligence: Follows player but ignores bombs
- Visual: Layered orange cone shape

#### Tiger (Hard Difficulty)
- Movement: A* pathfinding with threat avoidance
- Speed: 1.5x base speed
- Intelligence:
  - Tracks player position
  - Avoids bomb blast radius
  - Seeks power-ups when nearby
  - Dynamic path recalculation
- Visual: Sleek golden box with stripes

### Spawn System
- Enemies spawn at predefined positions
- Spawn areas avoid player start locations
- Staggered spawn with 1-second intervals
- Type distribution varies by level

### Death & Drops
- Enemies die when caught in explosions
- 15% chance to drop power-up:
  - Bomb count increase (33%)
  - Fire range increase (33%)  
  - Speed increase (33%)
- Visual death animation before removal

### Integration Points
- EnemySpawner updates in main game loop
- Collision detection with explosions
- Power-up drop handling through Grid system
- Camera follows player (enemies visible on screen)

## Success Criteria
✅ All 3 enemy types functional with distinct behaviors
✅ Enemies spawn correctly without overlapping
✅ Death detection works with explosions
✅ Power-ups drop at 15% rate
✅ Visual differentiation between enemy types
✅ No performance issues with 10+ enemies

## Next Week Preview
- Level progression system
- Multiple arenas/themes
- Audio integration
- UI/HUD implementation
- Tutorial system
