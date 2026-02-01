# Week 1 Action Plan - Make BLASTFORGE Playable

**Goal:** One complete match from start to finish  
**Timeline:** 5-7 days  
**Success Metric:** Can beat AI opponent and see victory screen

---

## 🎯 Day 1-2: Enemy AI Foundation

### Task 1.1: Enemy State & Types (3 hours)
```typescript
// File: src/entities/Enemy.ts

export enum EnemyType {
  Balloon = 'balloon',  // Week 1: This one only
  Onion = 'onion',      // Week 5: Future
  Tiger = 'tiger',      // Week 5: Future
}

export interface EnemyState {
  id: number;
  type: EnemyType;
  gridPos: GridPos;
  worldPos: Vec2;
  moveDir: Direction;
  speed: number;
  alive: boolean;
}

export function createEnemy(
  id: number,
  type: EnemyType,
  spawnCol: number,
  spawnRow: number
): EnemyState {
  return {
    id,
    type,
    gridPos: { col: spawnCol, row: spawnRow },
    worldPos: { x: spawnCol, y: spawnRow },
    moveDir: Direction.None,
    speed: type === EnemyType.Balloon ? 2.0 : 3.0,
    alive: true,
  };
}
```

### Task 1.2: Random Movement AI (4 hours)
```typescript
// File: src/systems/EnemyAI.ts

export function tickEnemies(state: GameState, dt: number): void {
  for (const enemy of state.enemies) {
    if (!enemy.alive) continue;
    
    // Simple random movement for Week 1
    if (enemy.moveDir === Direction.None || Math.random() < 0.05) {
      enemy.moveDir = randomDirection();
    }
    
    // Move in current direction
    const vel = directionToVec(enemy.moveDir);
    const nx = enemy.worldPos.x + vel.x * enemy.speed * dt;
    const ny = enemy.worldPos.y + vel.y * enemy.speed * dt;
    
    const targetGrid = worldToGrid({ x: nx, y: ny });
    
    // Check if walkable (no walls, no bombs)
    if (isWalkable(state.grid, targetGrid) && !hasBombAt(state, targetGrid)) {
      enemy.worldPos.x = nx;
      enemy.worldPos.y = ny;
      enemy.gridPos = worldToGrid(enemy.worldPos);
    } else {
      // Hit wall, change direction
      enemy.moveDir = randomDirection();
    }
  }
}

function randomDirection(): Direction {
  const dirs = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
  return dirs[Math.floor(Math.random() * dirs.length)];
}
```

### Task 1.3: Enemy Death Detection (2 hours)
```typescript
// File: src/systems/ExplosionSystem.ts (add to existing)

export function checkEnemyDeaths(state: GameState): void {
  for (const enemy of state.enemies) {
    if (!enemy.alive) continue;
    
    // Check if enemy is on an explosion tile
    const onExplosion = state.explosions.some(
      exp => exp.gridPos.col === enemy.gridPos.col && 
             exp.gridPos.row === enemy.gridPos.row
    );
    
    if (onExplosion) {
      enemy.alive = false;
      // TODO Week 3: Play death SFX
    }
  }
}
```

### Task 1.4: Enemy Spawning (2 hours)
```typescript
// File: src/core/StateManager.ts (modify existing init)

export function initGameState(): GameState {
  const state: GameState = {
    // ... existing fields ...
    enemies: [],
  };
  
  // Spawn 5 enemies for Week 1 (increase in Week 5)
  const enemySpawns = [
    { col: 7, row: 7 },
    { col: 8, row: 7 },
    { col: 7, row: 8 },
    { col: 8, row: 8 },
    { col: 14, row: 14 }, // Far corner
  ];
  
  let enemyId = 1;
  for (const spawn of enemySpawns) {
    state.enemies.push(
      createEnemy(enemyId++, EnemyType.Balloon, spawn.col, spawn.row)
    );
  }
  
  return state;
}
```

**Testing Checkpoint (End of Day 2):**
- [ ] 5 enemies spawn on level start
- [ ] Enemies move randomly
- [ ] Enemies change direction when hitting walls
- [ ] Enemies die when hit by explosions
- [ ] No crashes, 60 FPS maintained

---

## 🎯 Day 3: Victory/Defeat System

### Task 2.1: Player Death Detection (2 hours)
```typescript
// File: src/systems/ExplosionSystem.ts (add to existing)

export function checkPlayerDeaths(state: GameState): void {
  for (const player of state.players) {
    if (!player.alive) continue;
    
    // Check if player is on an explosion tile
    const onExplosion = state.explosions.some(
      exp => exp.gridPos.col === player.gridPos.col && 
             exp.gridPos.row === player.gridPos.row
    );
    
    if (onExplosion) {
      player.alive = false;
      // TODO Week 3: Play death SFX
    }
  }
}
```

### Task 2.2: Victory Condition (1 hour)
```typescript
// File: src/core/GameLoop.ts (modify existing)

export interface MatchResult {
  victory: boolean;
  stats: {
    enemiesKilled: number;
    survivalTime: number;
    bombsPlaced: number;
    fuseChargesUsed: number;
  };
}

export function checkVictoryCondition(state: GameState): MatchResult | null {
  const player = state.players[0]; // Single player for Week 1
  
  // Defeat: player died
  if (!player.alive) {
    return {
      victory: false,
      stats: calculateStats(state, player.id),
    };
  }
  
  // Victory: all enemies dead
  const aliveEnemies = state.enemies.filter(e => e.alive).length;
  if (aliveEnemies === 0) {
    return {
      victory: true,
      stats: calculateStats(state, player.id),
    };
  }
  
  return null; // Match ongoing
}

function calculateStats(state: GameState, playerId: number): any {
  // TODO: Track these during gameplay
  return {
    enemiesKilled: state.enemies.filter(e => !e.alive).length,
    survivalTime: state.tick / 60, // Convert ticks to seconds
    bombsPlaced: 0, // TODO: Track this
    fuseChargesUsed: 0, // TODO: Track this
  };
}
```

### Task 2.3: Victory Screen UI (3 hours)
```typescript
// File: src/ui/VictoryScreen.ts

export class VictoryScreen {
  private container: HTMLElement;
  
  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'victory-screen';
    this.container.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 40px;
      border-radius: 10px;
      text-align: center;
      display: none;
      z-index: 1000;
    `;
    document.body.appendChild(this.container);
  }
  
  show(result: MatchResult): void {
    const title = result.victory ? '🎉 VICTORY! 🎉' : '💀 DEFEAT 💀';
    const color = result.victory ? '#00ff00' : '#ff0000';
    
    this.container.innerHTML = `
      <h1 style="color: ${color}; font-size: 48px; margin-bottom: 20px;">
        ${title}
      </h1>
      <div style="font-size: 24px; margin-bottom: 30px;">
        <p>Enemies Killed: ${result.stats.enemiesKilled}</p>
        <p>Survival Time: ${result.stats.survivalTime.toFixed(1)}s</p>
        <p>Bombs Placed: ${result.stats.bombsPlaced}</p>
        <p>Fuse Charges Used: ${result.stats.fuseChargesUsed}</p>
      </div>
      <button id="rematch-btn" style="
        font-size: 24px;
        padding: 15px 40px;
        background: #0066ff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      ">
        Play Again
      </button>
    `;
    
    this.container.style.display = 'block';
    
    // Hook up rematch button
    document.getElementById('rematch-btn')?.addEventListener('click', () => {
      this.hide();
      window.location.reload(); // Simple restart for Week 1
    });
  }
  
  hide(): void {
    this.container.style.display = 'none';
  }
}
```

### Task 2.4: Integrate Victory Check (1 hour)
```typescript
// File: src/core/GameLoop.ts (modify tick function)

import { VictoryScreen } from '@ui/VictoryScreen';

const victoryScreen = new VictoryScreen();

export function tick(state: GameState, dt: number): void {
  // ... existing tick logic ...
  
  // Check for match end (add at end of tick)
  const result = checkVictoryCondition(state);
  if (result) {
    victoryScreen.show(result);
    // Pause game loop (implement pause mechanism)
  }
}
```

**Testing Checkpoint (End of Day 3):**
- [ ] Player dies when hit by explosion
- [ ] Victory screen shows when all enemies dead
- [ ] Defeat screen shows when player dies
- [ ] Stats display (even if zeros for now)
- [ ] "Play Again" button works

---

## 🎯 Day 4-5: Power-Up Spawning

### Task 3.1: Power-Up Drop System (3 hours)
```typescript
// File: src/systems/PowerUpSystem.ts (modify existing)

const DROP_RATE = 0.15; // 15% (classic balance)

// Power-up weights (higher = more common)
const POWER_UP_WEIGHTS = {
  [PowerUpType.BombRange]: 25,
  [PowerUpType.BombCount]: 25,
  [PowerUpType.Speed]: 20,
  [PowerUpType.FuseCharge]: 30,
};

export function onSoftBlockDestroyed(pos: GridPos, state: GameState): void {
  // Roll for power-up drop
  if (Math.random() < DROP_RATE) {
    const type = selectWeightedPowerUp();
    state.powerUps.push({
      gridPos: { ...pos },
      type,
    });
    // TODO Week 3: Play spawn SFX
  }
}

function selectWeightedPowerUp(): PowerUpType {
  const totalWeight = Object.values(POWER_UP_WEIGHTS).reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  
  for (const [type, weight] of Object.entries(POWER_UP_WEIGHTS)) {
    random -= weight;
    if (random <= 0) {
      return type as PowerUpType;
    }
  }
  
  return PowerUpType.BombRange; // Fallback
}
```

### Task 3.2: Hook Up Soft Block Destruction (2 hours)
```typescript
// File: src/systems/ExplosionSystem.ts (modify existing)

export function applyExplosions(state: GameState, positions: GridPos[]): void {
  for (const pos of positions) {
    // Check what's at this position
    const tileType = state.grid[pos.row][pos.col];
    
    if (tileType === TileType.SoftBlock) {
      // Destroy soft block
      state.grid[pos.row][pos.col] = TileType.Floor;
      
      // Try to spawn power-up
      onSoftBlockDestroyed(pos, state);
    }
    
    // Add explosion visual
    state.explosions.push({
      gridPos: { ...pos },
      remaining: 0.5, // 0.5 second explosion visual
    });
  }
}
```

### Task 3.3: Stat Tracking (2 hours)
```typescript
// File: src/core/types.ts (add to PlayerState)

export interface PlayerState {
  // ... existing fields ...
  
  // Week 1: Add stat tracking
  stats: {
    bombsPlaced: number;
    fuseChargesUsed: number;
    powerUpsCollected: number;
  };
}

// File: src/systems/BombSystem.ts (modify placeBomb)
export function placeBomb(state: GameState, playerId: number): boolean {
  // ... existing logic ...
  
  if (success) {
    player.stats.bombsPlaced++; // Track stat
  }
  
  return success;
}

// File: src/systems/BombSystem.ts (modify fuse abilities)
export function primeBomb(state: GameState, playerId: number): boolean {
  // ... existing logic ...
  
  if (success) {
    player.stats.fuseChargesUsed++; // Track stat
  }
  
  return success;
}

// Similar for rushBomb and detonateBomb

// File: src/systems/PowerUpSystem.ts (modify collectPowerUps)
function applyPowerUp(state: GameState, playerId: number, type: PowerUpType): void {
  // ... existing logic ...
  
  player.stats.powerUpsCollected++; // Track stat
}
```

**Testing Checkpoint (End of Day 5):**
- [ ] Soft blocks drop power-ups ~15% of time
- [ ] Power-ups appear at destroyed block position
- [ ] Power-ups can be collected
- [ ] Stats are tracked accurately
- [ ] Victory screen shows real stats

---

## 🎯 Day 6-7: Integration & Testing

### Task 4.1: Chain Reaction Verification (3 hours)
```typescript
// File: src/systems/ExplosionSystem.ts (verify/implement)

export function propagateExplosion(
  state: GameState,
  centerPos: GridPos,
  range: number
): GridPos[] {
  const explosionTiles: GridPos[] = [{ ...centerPos }];
  
  // Propagate in 4 directions
  for (const dir of [Direction.Up, Direction.Down, Direction.Left, Direction.Right]) {
    for (let i = 1; i <= range; i++) {
      const pos = offsetPos(centerPos, dir, i);
      
      // Out of bounds
      if (pos.col < 0 || pos.col >= GRID_SIZE || 
          pos.row < 0 || pos.row >= GRID_SIZE) break;
      
      const tile = state.grid[pos.row][pos.col];
      
      // Hit hard block, stop
      if (tile === TileType.HardBlock) break;
      
      // Add to explosion
      explosionTiles.push({ ...pos });
      
      // Hit soft block, stop (but include this tile)
      if (tile === TileType.SoftBlock) break;
    }
  }
  
  // CRITICAL: Check if we hit other bombs (chain reaction)
  for (let i = state.bombs.length - 1; i >= 0; i--) {
    const bomb = state.bombs[i];
    const hitByExplosion = explosionTiles.some(
      exp => exp.col === bomb.gridPos.col && exp.row === bomb.gridPos.row
    );
    
    if (hitByExplosion) {
      // Remove bomb and trigger its explosion
      state.bombs.splice(i, 1);
      const owner = state.players[bomb.ownerId];
      if (owner) owner.activeBombs--;
      
      // Recursive chain reaction
      const chainExplosions = propagateExplosion(state, bomb.gridPos, bomb.range);
      explosionTiles.push(...chainExplosions);
    }
  }
  
  return explosionTiles;
}

function offsetPos(pos: GridPos, dir: Direction, distance: number): GridPos {
  const vel = directionToVec(dir);
  return {
    col: pos.col + vel.x * distance,
    row: pos.row + vel.y * distance,
  };
}
```

### Task 4.2: Full Playtest (4 hours)
**Checklist:**
- [ ] Can start game
- [ ] Player spawns in corner
- [ ] Enemies spawn in center
- [ ] Can move with WASD/arrows
- [ ] Can place bomb with Spacebar
- [ ] Bomb explodes after 3 seconds
- [ ] Explosion destroys soft blocks
- [ ] Power-ups drop from blocks
- [ ] Can collect power-ups
- [ ] Power-ups increase stats
- [ ] Can use Prime (Q key)
- [ ] Can use Rush (E key)
- [ ] Can use Detonate (R key)
- [ ] Fuse abilities consume charges
- [ ] Chain reactions trigger
- [ ] Enemies move randomly
- [ ] Enemies die to explosions
- [ ] Player dies to explosions
- [ ] Victory screen shows when enemies dead
- [ ] Defeat screen shows when player dies
- [ ] Stats are accurate
- [ ] Play Again button works
- [ ] No crashes, 60 FPS

### Task 4.3: Bug Fixes (Variable time)
**Common issues to watch for:**
- Bombs triggering on placement (should wait 3s)
- Chain reactions causing infinite loops
- Enemies getting stuck in corners
- Power-ups spawning on hard blocks
- Player able to move through walls
- Victory screen not appearing
- Stats not tracking correctly
- Fuse charges going negative

### Task 4.4: Performance Check (1 hour)
```typescript
// File: src/core/GameLoop.ts (add FPS counter)

let frameCount = 0;
let lastFpsUpdate = performance.now();

export function tick(state: GameState, dt: number): void {
  // ... existing tick logic ...
  
  // FPS monitoring (Week 1 only, remove later)
  frameCount++;
  const now = performance.now();
  if (now - lastFpsUpdate >= 1000) {
    console.log(`FPS: ${frameCount}`);
    frameCount = 0;
    lastFpsUpdate = now;
  }
}
```

**Performance Targets:**
- [ ] Stable 60 FPS with 5 enemies
- [ ] Stable 60 FPS with 10 bombs on screen
- [ ] Stable 60 FPS with 20 simultaneous explosions
- [ ] No frame drops during chain reactions

**Testing Checkpoint (End of Day 7):**
- [ ] Complete smoke test passes (5 min)
- [ ] Complete core loop test passes (15 min)
- [ ] No critical bugs
- [ ] 60 FPS stable
- [ ] Ready for Week 2 (audio polish)

---

## 📋 Quick Reference

### Files to Create/Modify

**New Files:**
- `src/entities/Enemy.ts` (create)
- `src/systems/EnemyAI.ts` (create)
- `src/ui/VictoryScreen.ts` (create)

**Modify Existing:**
- `src/core/types.ts` (add EnemyState, stats tracking)
- `src/core/StateManager.ts` (add enemy spawning)
- `src/core/GameLoop.ts` (add victory check)
- `src/systems/ExplosionSystem.ts` (add death checks, chain reactions)
- `src/systems/PowerUpSystem.ts` (add drop logic)
- `src/systems/BombSystem.ts` (add stat tracking)

### Key Functions to Implement

1. `createEnemy()` - Spawn enemy
2. `tickEnemies()` - Move enemies
3. `checkEnemyDeaths()` - Kill enemies in explosions
4. `checkPlayerDeaths()` - Kill player in explosion
5. `checkVictoryCondition()` - Detect match end
6. `VictoryScreen.show()` - Display results
7. `onSoftBlockDestroyed()` - Drop power-ups
8. `propagateExplosion()` - Chain reactions

### Testing Commands

```bash
# Run dev server
npm run dev

# Open browser console
# Check for errors
# Monitor FPS counter
# Test all controls:
#   WASD - move
#   Space - bomb
#   Q - prime
#   E - rush
#   R - detonate
```

---

## ⚠️ Common Pitfalls

### 1. Enemy Movement Jitter
**Problem:** Enemies teleport or jitter  
**Solution:** Use smooth interpolation like player movement

### 2. Chain Reaction Infinite Loop
**Problem:** Bombs trigger each other infinitely  
**Solution:** Remove bomb from array BEFORE propagating explosion

### 3. Power-Ups Under Bombs
**Problem:** Power-ups spawn but can't be collected  
**Solution:** Allow walking over bombs to collect power-ups

### 4. Victory Screen Too Early
**Problem:** Victory triggers before all explosions finish  
**Solution:** Check victory after explosions applied, not during

### 5. Stats Not Updating
**Problem:** Stats always show 0  
**Solution:** Initialize stats object in PlayerState creation

---

## ✅ Week 1 Success Criteria

**Must Have (Blocking Week 2):**
- [x] Can complete a full match
- [x] Enemies spawn and move
- [x] Victory/defeat works
- [x] Power-ups drop and work
- [x] Stats are tracked
- [x] No critical bugs
- [x] 60 FPS stable

**Nice to Have (Can defer to Week 2):**
- [ ] Audio (Week 3 priority)
- [ ] Visual telegraphs (Week 3 priority)
- [ ] Multiple enemy types (Week 5)
- [ ] Advanced AI (Week 5)

**Deliverable:**
> "Working game loop: Start match → Move/bomb → Collect power-ups → Kill enemies → Victory screen → Rematch"

---

## 🚀 Next Steps (Week 2-3)

**Week 2 Preview:**
- Generate audio SFX (bomb, explosion, pickup, death)
- Implement AudioEngine playback
- Add visual telegraphs (fuse auras)
- Tune movement feel

**Week 3 Preview:**
- Polish audio (fuse ticking, spatial)
- Add timer UI
- Improve victory screen visuals
- Balance testing

---

**Ready to Start? Begin with Day 1, Task 1.1!** 🎮
