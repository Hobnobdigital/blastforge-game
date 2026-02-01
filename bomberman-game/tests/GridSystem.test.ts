import { describe, it, expect } from 'vitest';
import { isWalkable, worldToGrid, gridToWorld } from '../src/systems/GridSystem';
import { TileType, GRID_SIZE } from '../src/core/types';

function makeEmptyGrid(): TileType[][] {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => TileType.Floor)
  );
}

describe('GridSystem', () => {
  it('worldToGrid rounds correctly', () => {
    expect(worldToGrid({ x: 1.4, y: 2.6 })).toEqual({ col: 1, row: 3 });
  });

  it('gridToWorld maps to center', () => {
    expect(gridToWorld({ col: 3, row: 5 })).toEqual({ x: 3, y: 5 });
  });

  it('isWalkable returns false for out of bounds', () => {
    const grid = makeEmptyGrid();
    expect(isWalkable(grid, { col: -1, row: 0 })).toBe(false);
    expect(isWalkable(grid, { col: 0, row: GRID_SIZE })).toBe(false);
  });

  it('isWalkable returns false for hard blocks', () => {
    const grid = makeEmptyGrid();
    grid[3][3] = TileType.HardBlock;
    expect(isWalkable(grid, { col: 3, row: 3 })).toBe(false);
  });

  it('isWalkable returns true for floor', () => {
    const grid = makeEmptyGrid();
    expect(isWalkable(grid, { col: 1, row: 1 })).toBe(true);
  });
});
