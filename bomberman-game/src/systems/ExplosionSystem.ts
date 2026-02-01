import { GameState, GridPos, TileType, GRID_SIZE, PowerUpType } from '@core/types';

const EXPLOSION_DURATION = 0.5; // seconds

export function spawnExplosion(state: GameState, origin: GridPos, range: number): void {
  const affected = getExplosionTiles(state, origin, range);

  for (const pos of affected) {
    // Destroy soft blocks
    if (state.grid[pos.row][pos.col] === TileType.SoftBlock) {
      state.grid[pos.row][pos.col] = TileType.Floor;
      maybeSpawnPowerUp(state, pos);
    }

    state.explosions.push({ gridPos: pos, remaining: EXPLOSION_DURATION });

    // Kill players standing here
    for (const player of state.players) {
      if (player.alive && player.gridPos.col === pos.col && player.gridPos.row === pos.row) {
        player.alive = false;
      }
    }

    // Chain-detonate bombs
    for (let i = state.bombs.length - 1; i >= 0; i--) {
      const b = state.bombs[i];
      if (b.gridPos.col === pos.col && b.gridPos.row === pos.row) {
        state.bombs.splice(i, 1);
        const owner = state.players[b.ownerId];
        if (owner) owner.activeBombs--;
        // Recursively explode (next tick would be more correct, but this is simpler for now)
        spawnExplosion(state, b.gridPos, b.range);
      }
    }
  }
}

function getExplosionTiles(state: GameState, origin: GridPos, range: number): GridPos[] {
  const tiles: GridPos[] = [{ ...origin }];
  const dirs = [
    { dc: 0, dr: -1 }, // up
    { dc: 0, dr: 1 },  // down
    { dc: -1, dr: 0 }, // left
    { dc: 1, dr: 0 },  // right
  ];

  for (const { dc, dr } of dirs) {
    for (let i = 1; i <= range; i++) {
      const col = origin.col + dc * i;
      const row = origin.row + dr * i;
      if (col < 0 || col >= GRID_SIZE || row < 0 || row >= GRID_SIZE) break;
      if (state.grid[row][col] === TileType.HardBlock) break;

      tiles.push({ col, row });
      if (state.grid[row][col] === TileType.SoftBlock) break; // stop after destroying one
    }
  }

  return tiles;
}

export function tickExplosions(state: GameState, dt: number): void {
  for (let i = state.explosions.length - 1; i >= 0; i--) {
    state.explosions[i].remaining -= dt;
    if (state.explosions[i].remaining <= 0) {
      state.explosions.splice(i, 1);
    }
  }
}

function maybeSpawnPowerUp(state: GameState, pos: GridPos): void {
  if (Math.random() > 0.3) return;
  const types = [PowerUpType.BombRange, PowerUpType.BombCount, PowerUpType.Speed, PowerUpType.FuseCharge];
  const type = types[Math.floor(Math.random() * types.length)];
  state.powerUps.push({ gridPos: { ...pos }, type });
}
