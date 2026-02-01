import {
  GameState,
  TileType,
  GRID_SIZE,
  Direction,
  PlayerState,
} from './types';

export function createInitialState(): GameState {
  const grid = createGrid();
  const players: PlayerState[] = [
    createPlayer(0, { col: 1, row: 1 }),
  ];

  return {
    tick: 0,
    grid,
    players,
    bombs: [],
    explosions: [],
    powerUps: [],
  };
}

function createGrid(): TileType[][] {
  const grid: TileType[][] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    grid[row] = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      if (row === 0 || row === GRID_SIZE - 1 || col === 0 || col === GRID_SIZE - 1) {
        grid[row][col] = TileType.HardBlock;
      } else if (row % 2 === 0 && col % 2 === 0) {
        grid[row][col] = TileType.HardBlock;
      } else {
        grid[row][col] = TileType.Floor;
      }
    }
  }

  // Place soft blocks on floor tiles (skip player spawn corners)
  const spawnSafe = new Set([
    '1,1', '1,2', '2,1',
    `${GRID_SIZE - 2},${GRID_SIZE - 2}`, `${GRID_SIZE - 2},${GRID_SIZE - 3}`, `${GRID_SIZE - 3},${GRID_SIZE - 2}`,
    `1,${GRID_SIZE - 2}`, `1,${GRID_SIZE - 3}`, `2,${GRID_SIZE - 2}`,
    `${GRID_SIZE - 2},1`, `${GRID_SIZE - 3},1`, `${GRID_SIZE - 2},2`,
  ]);

  for (let row = 1; row < GRID_SIZE - 1; row++) {
    for (let col = 1; col < GRID_SIZE - 1; col++) {
      if (grid[row][col] === TileType.Floor && !spawnSafe.has(`${col},${row}`)) {
        if (Math.random() < 0.4) {
          grid[row][col] = TileType.SoftBlock;
        }
      }
    }
  }

  return grid;
}

function createPlayer(id: number, gridPos: { col: number; row: number }): PlayerState {
  return {
    id,
    gridPos: { ...gridPos },
    worldPos: { x: gridPos.col, y: gridPos.row },
    moveDir: Direction.None,
    speed: 3.5,
    bombRange: 2,
    maxBombs: 1,
    activeBombs: 0,
    fuseCharges: 3,
    alive: true,
  };
}
