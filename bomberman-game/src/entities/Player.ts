import { PlayerState, Direction, GridPos } from '@core/types';

export function createPlayerState(id: number, spawnCol: number, spawnRow: number): PlayerState {
  return {
    id,
    gridPos: { col: spawnCol, row: spawnRow },
    worldPos: { x: spawnCol, y: spawnRow },
    moveDir: Direction.None,
    speed: 3.5,
    bombRange: 2,
    maxBombs: 1,
    activeBombs: 0,
    fuseCharges: 3,
    alive: true,
  };
}

export const SPAWN_POSITIONS: GridPos[] = [
  { col: 1, row: 1 },
  { col: 14, row: 14 },
  { col: 1, row: 14 },
  { col: 14, row: 1 },
];
