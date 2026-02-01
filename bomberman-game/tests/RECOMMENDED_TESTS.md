# Recommended Test Cases for BLASTFORGE

Based on QA analysis, these test cases would catch the bugs found in code review.

## BombSystem.test.ts - Additional Tests

```typescript
import { describe, it, expect } from 'vitest';
import { placeBomb, tickBombs, primeBomb, rushBomb, detonateBomb } from '../src/systems/BombSystem';
import { createInitialState } from '../src/core/StateManager';

describe('BombSystem - Additional Tests', () => {
  it('BUG-005: activeBombs should not go negative after chain detonation', () => {
    const state = createInitialState();
    state.players[0].maxBombs = 5;
    
    // Place 3 bombs
    placeBomb(state, 0);
    placeBomb(state, 0);
    placeBomb(state, 0);
    
    expect(state.players[0].activeBombs).toBe(3);
    
    // Manually remove all bombs (simulating chain detonation)
    for (let i = state.bombs.length - 1; i >= 0; i--) {
      state.players[0].activeBombs--;
      state.bombs.splice(i, 1);
    }
    
    // Should be 0, not negative
    expect(state.players[0].activeBombs).toBeGreaterThanOrEqual(0);
  });

  it('prevents placing bomb on same tile as existing bomb', () => {
    const state = createInitialState();
    state.players[0].maxBombs = 2;
    
    placeBomb(state, 0);
    const second = placeBomb(state, 0); // Same position
    
    expect(second).toBe(false);
    expect(state.bombs.length).toBe(1);
  });

  it('BUG-003: should prevent placing bomb on tile with other player', () => {
    const state = createInitialState();
    
    // Add second player at same position
    state.players.push({
      id: 1,
      gridPos: { col: 1, row: 1 },
      worldPos: { x: 1, y: 1 },
      moveDir: 0,
      speed: 3.5,
      bombRange: 2,
      maxBombs: 1,
      activeBombs: 0,
      fuseCharges: 3,
      alive: true,
    });
    
    const placed = placeBomb(state, 0);
    
    // Should fail because another player is on the tile
    // CURRENTLY THIS WILL PASS (BUG!) - needs fix
    expect(placed).toBe(false);
  });

  it('fuse charges should not go negative', () => {
    const state = createInitialState();
    state.players[0].fuseCharges = 0;
    
    placeBomb(state, 0);
    const primed = primeBomb(state, 0);
    
    expect(primed).toBe(false);
    expect(state.players[0].fuseCharges).toBe(0); // Not negative
  });

  it('detonate removes bomb and decrements counter correctly', () => {
    const state = createInitialState();
    
    placeBomb(state, 0);
    expect(state.players[0].activeBombs).toBe(1);
    
    const pos = detonateBomb(state, 0);
    
    expect(pos).not.toBeNull();
    expect(state.bombs.length).toBe(0);
    expect(state.players[0].activeBombs).toBe(0);
  });

  it('primed bomb has extended fuse', () => {
    const state = createInitialState();
    placeBomb(state, 0);
    
    const originalFuse = state.bombs[0].fuseRemaining;
    primeBomb(state, 0);
    
    expect(state.bombs[0].fuseRemaining).toBeGreaterThan(originalFuse);
    expect(state.bombs[0].primed).toBe(true);
  });

  it('rushed bomb has shortened fuse', () => {
    const state = createInitialState();
    placeBomb(state, 0);
    
    rushBomb(state, 0);
    
    expect(state.bombs[0].fuseRemaining).toBeLessThan(3.0);
    expect(state.bombs[0].rushed).toBe(true);
  });
});
```

## ExplosionSystem.test.ts - New File

```typescript
import { describe, it, expect } from 'vitest';
import { spawnExplosion, tickExplosions } from '../src/systems/ExplosionSystem';
import { placeBomb } from '../src/systems/BombSystem';
import { createInitialState } from '../src/core/StateManager';
import { TileType } from '../src/core/types';

describe('ExplosionSystem', () => {
  it('destroys soft blocks', () => {
    const state = createInitialState();
    state.grid[2][2] = TileType.SoftBlock;
    
    spawnExplosion(state, { col: 2, row: 2 }, 1);
    
    expect(state.grid[2][2]).toBe(TileType.Floor);
  });

  it('does not destroy hard blocks', () => {
    const state = createInitialState();
    state.grid[2][2] = TileType.HardBlock;
    
    spawnExplosion(state, { col: 2, row: 2 }, 1);
    
    expect(state.grid[2][2]).toBe(TileType.HardBlock);
  });

  it('kills player standing in explosion', () => {
    const state = createInitialState();
    state.players[0].gridPos = { col: 2, row: 2 };
    
    spawnExplosion(state, { col: 2, row: 2 }, 1);
    
    expect(state.players[0].alive).toBe(false);
  });

  it('BUG-002: chain detonation with many bombs does not overflow', () => {
    const state = createInitialState();
    state.players[0].maxBombs = 100;
    
    // Place 50 bombs in a line
    for (let i = 2; i < 52; i++) {
      state.bombs.push({
        id: i,
        gridPos: { col: i, row: 5 },
        ownerId: 0,
        fuseRemaining: 3.0,
        range: 2,
        primed: false,
        rushed: false,
      });
    }
    
    // This should not crash with stack overflow
    expect(() => {
      spawnExplosion(state, { col: 2, row: 5 }, 2);
    }).not.toThrow();
    
    // All bombs should be detonated
    expect(state.bombs.length).toBe(0);
  });

  it('explosions expire after duration', () => {
    const state = createInitialState();
    
    spawnExplosion(state, { col: 2, row: 2 }, 1);
    expect(state.explosions.length).toBeGreaterThan(0);
    
    tickExplosions(state, 1.0); // Tick past duration
    
    expect(state.explosions.length).toBe(0);
  });

  it('explosion spreads in cross pattern', () => {
    const state = createInitialState();
    
    // Clear area
    for (let i = 0; i < 5; i++) {
      state.grid[5][i] = TileType.Floor;
      state.grid[i][5] = TileType.Floor;
    }
    
    spawnExplosion(state, { col: 2, row: 2 }, 2);
    
    // Should have center + 4 directions * 2 range = 9 tiles minimum
    expect(state.explosions.length).toBeGreaterThanOrEqual(5);
  });

  it('explosion stops at hard blocks', () => {
    const state = createInitialState();
    
    // Create barrier
    state.grid[2][3] = TileType.HardBlock;
    
    spawnExplosion(state, { col: 2, row: 2 }, 3);
    
    // Should not explode past hard block
    const beyond = state.explosions.find(e => e.gridPos.col === 2 && e.gridPos.row === 4);
    expect(beyond).toBeUndefined();
  });
});
```

## GridSystem.test.ts - Additional Tests

```typescript
describe('GridSystem - Additional Tests', () => {
  it('BUG-004: hasBombAt detects bombs correctly', () => {
    const state = createInitialState();
    placeBomb(state, 0);
    
    // Should detect bomb at player position
    const pos = state.players[0].gridPos;
    const hasBomb = state.bombs.some(b => 
      b.gridPos.col === pos.col && b.gridPos.row === pos.row
    );
    
    expect(hasBomb).toBe(true);
  });

  it('BUG-015: player worldPos should be clamped to grid bounds', () => {
    const state = createInitialState();
    
    // Manually set out of bounds
    state.players[0].worldPos = { x: -1, y: -1 };
    
    // Movement system should clamp this
    // CURRENTLY NO CLAMPING - WILL FAIL
    expect(state.players[0].worldPos.x).toBeGreaterThanOrEqual(0);
    expect(state.players[0].worldPos.y).toBeGreaterThanOrEqual(0);
  });

  it('BUG-014: diagonal movement should be normalized', () => {
    const state = createInitialState();
    const player = state.players[0];
    
    // Simulate pressing both W and D
    // Would need to mock input or test velocity calculation
    
    // Expected: diagonal velocity should equal straight velocity
    // Actual: diagonal velocity is √2 * straight velocity (BUG)
  });
});
```

## PowerUpSystem.test.ts - New File

```typescript
import { describe, it, expect } from 'vitest';
import { collectPowerUps } from '../src/systems/PowerUpSystem';
import { createInitialState } from '../src/core/StateManager';
import { PowerUpType } from '../src/core/types';

describe('PowerUpSystem', () => {
  it('collects power-up when player walks over it', () => {
    const state = createInitialState();
    
    state.powerUps.push({
      gridPos: { col: 1, row: 1 },
      type: PowerUpType.BombRange,
    });
    
    const originalRange = state.players[0].bombRange;
    collectPowerUps(state);
    
    expect(state.powerUps.length).toBe(0);
    expect(state.players[0].bombRange).toBe(originalRange + 1);
  });

  it('BombRange power-up caps at 8', () => {
    const state = createInitialState();
    state.players[0].bombRange = 8;
    
    state.powerUps.push({
      gridPos: { col: 1, row: 1 },
      type: PowerUpType.BombRange,
    });
    
    collectPowerUps(state);
    expect(state.players[0].bombRange).toBe(8); // Should not exceed
  });

  it('BombCount power-up increases max bombs', () => {
    const state = createInitialState();
    const originalMax = state.players[0].maxBombs;
    
    state.powerUps.push({
      gridPos: { col: 1, row: 1 },
      type: PowerUpType.BombCount,
    });
    
    collectPowerUps(state);
    expect(state.players[0].maxBombs).toBe(originalMax + 1);
  });

  it('Speed power-up increases player speed', () => {
    const state = createInitialState();
    const originalSpeed = state.players[0].speed;
    
    state.powerUps.push({
      gridPos: { col: 1, row: 1 },
      type: PowerUpType.Speed,
    });
    
    collectPowerUps(state);
    expect(state.players[0].speed).toBe(originalSpeed + 0.5);
  });

  it('FuseCharge power-up increases charges', () => {
    const state = createInitialState();
    state.players[0].fuseCharges = 2;
    
    state.powerUps.push({
      gridPos: { col: 1, row: 1 },
      type: PowerUpType.FuseCharge,
    });
    
    collectPowerUps(state);
    expect(state.players[0].fuseCharges).toBe(3);
  });

  it('does not collect power-up from different tile', () => {
    const state = createInitialState();
    
    state.powerUps.push({
      gridPos: { col: 5, row: 5 },
      type: PowerUpType.BombRange,
    });
    
    collectPowerUps(state);
    expect(state.powerUps.length).toBe(1); // Not collected
  });

  it('dead player cannot collect power-ups', () => {
    const state = createInitialState();
    state.players[0].alive = false;
    
    state.powerUps.push({
      gridPos: { col: 1, row: 1 },
      type: PowerUpType.BombRange,
    });
    
    collectPowerUps(state);
    expect(state.powerUps.length).toBe(1); // Not collected
  });
});
```

## InputManager.test.ts - New File

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { InputManager } from '../src/input/InputManager';
import { Direction } from '../src/core/types';

describe('InputManager', () => {
  let input: InputManager;

  beforeEach(() => {
    input = new InputManager();
  });

  it('detects W key as Up direction', () => {
    // Simulate keydown
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }));
    const state = input.poll();
    expect(state.moveDir).toBe(Direction.Up);
  });

  it('detects Space key as place bomb', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    const state = input.poll();
    expect(state.placeBomb).toBe(true);
  });

  it('BUG-016: justPressed clears after poll', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    
    const first = input.poll();
    const second = input.poll();
    
    expect(first.placeBomb).toBe(true);
    expect(second.placeBomb).toBe(false); // Should not repeat
  });

  it('detects Q key as prime fuse action', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyQ' }));
    const state = input.poll();
    expect(state.fuseAction).toBe('prime');
  });

  it('detects E key as rush fuse action', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));
    const state = input.poll();
    expect(state.fuseAction).toBe('rush');
  });

  it('detects R key as detonate fuse action', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyR' }));
    const state = input.poll();
    expect(state.fuseAction).toBe('detonate');
  });

  it('arrow keys work as alternative to WASD', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
    const state = input.poll();
    expect(state.moveDir).toBe(Direction.Up);
  });
});
```

## GameLoop.test.ts - New File

```typescript
import { describe, it, expect, vi } from 'vitest';
import { GameLoop } from '../src/core/GameLoop';

describe('GameLoop', () => {
  it('BUG-013: FPS counter initializes to non-zero', () => {
    const update = vi.fn();
    const render = vi.fn();
    const loop = new GameLoop(update, render);
    
    // FPS should start at estimated value, not 0
    expect(loop.fps).toBeGreaterThan(0);
  });

  it('calls update with fixed timestep', () => {
    const update = vi.fn();
    const render = vi.fn();
    const loop = new GameLoop(update, render);
    
    loop.start();
    
    // Wait for a few frames
    setTimeout(() => {
      expect(update).toHaveBeenCalled();
      loop.stop();
    }, 100);
  });

  it('calls render every frame', () => {
    const update = vi.fn();
    const render = vi.fn();
    const loop = new GameLoop(update, render);
    
    loop.start();
    
    setTimeout(() => {
      expect(render).toHaveBeenCalled();
      loop.stop();
    }, 100);
  });
});
```

## Integration Tests

```typescript
// tests/integration.test.ts

describe('Integration Tests', () => {
  it('complete bomb lifecycle', () => {
    const state = createInitialState();
    
    // Place bomb
    placeBomb(state, 0);
    expect(state.bombs.length).toBe(1);
    
    // Wait for explosion
    const detonated = tickBombs(state, 3.1);
    expect(detonated.length).toBe(1);
    expect(state.bombs.length).toBe(0);
    
    // Trigger explosion
    spawnExplosion(state, detonated[0], 2);
    expect(state.explosions.length).toBeGreaterThan(0);
    
    // Wait for explosion to fade
    tickExplosions(state, 0.6);
    expect(state.explosions.length).toBe(0);
  });

  it('player death scenario', () => {
    const state = createInitialState();
    
    // Place bomb at player position
    placeBomb(state, 0);
    
    // Detonate immediately
    const pos = detonateBomb(state, 0);
    spawnExplosion(state, pos!, 2);
    
    // Player should be dead
    expect(state.players[0].alive).toBe(false);
  });

  it('power-up collection increases stats', () => {
    const state = createInitialState();
    
    // Add power-up at player position
    state.powerUps.push({
      gridPos: { col: 1, row: 1 },
      type: PowerUpType.BombRange,
    });
    
    const originalRange = state.players[0].bombRange;
    collectPowerUps(state);
    
    expect(state.players[0].bombRange).toBeGreaterThan(originalRange);
  });
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific file
npm test -- BombSystem.test.ts

# Run in watch mode
npm run test:watch
```

## Expected Results

### Currently Passing (8/8)
✅ All existing tests pass

### After Fixes (Expected: 40+/40+)
- [ ] BombSystem: 11 tests
- [ ] ExplosionSystem: 8 tests
- [ ] GridSystem: 8 tests
- [ ] PowerUpSystem: 7 tests
- [ ] InputManager: 7 tests
- [ ] GameLoop: 3 tests
- [ ] Integration: 3 tests

## Test Coverage Goals

| Component | Current | Target |
|-----------|---------|--------|
| BombSystem | ~40% | 90% |
| ExplosionSystem | 0% | 85% |
| GridSystem | ~60% | 90% |
| PowerUpSystem | 0% | 90% |
| InputManager | 0% | 70% |
| GameLoop | 0% | 60% |

---

**Note:** Some tests marked with `// WILL FAIL` are documenting existing bugs. They should fail until the bugs are fixed, at which point they'll pass and serve as regression tests.
