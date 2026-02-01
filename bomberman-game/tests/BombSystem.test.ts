import { describe, it, expect } from 'vitest';
import { placeBomb, tickBombs, DEFAULT_FUSE } from '../src/systems/BombSystem';
import { createInitialState } from '../src/core/StateManager';

describe('BombSystem', () => {
  it('places a bomb at player position', () => {
    const state = createInitialState();
    const placed = placeBomb(state, 0);
    expect(placed).toBe(true);
    expect(state.bombs.length).toBe(1);
    expect(state.bombs[0].gridPos).toEqual(state.players[0].gridPos);
  });

  it('respects max bomb limit', () => {
    const state = createInitialState();
    state.players[0].maxBombs = 1;
    placeBomb(state, 0);
    const second = placeBomb(state, 0);
    expect(second).toBe(false);
  });

  it('detonates after fuse expires', () => {
    const state = createInitialState();
    placeBomb(state, 0);
    // Tick past fuse duration
    const detonated = tickBombs(state, DEFAULT_FUSE + 0.1);
    expect(detonated.length).toBe(1);
    expect(state.bombs.length).toBe(0);
  });
});
