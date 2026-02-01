import { GameState, BombState, GridPos } from '@core/types';

let nextBombId = 1;

const DEFAULT_FUSE = 3.0; // seconds
const PRIMED_FUSE = 5.0;
const RUSHED_FUSE = 1.5;

export function placeBomb(state: GameState, playerId: number): boolean {
  const player = state.players[playerId];
  if (!player || !player.alive) return false;
  if (player.activeBombs >= player.maxBombs) return false;
  if (state.bombs.some(b => b.gridPos.col === player.gridPos.col && b.gridPos.row === player.gridPos.row)) return false;

  const bomb: BombState = {
    id: nextBombId++,
    gridPos: { ...player.gridPos },
    ownerId: playerId,
    fuseRemaining: DEFAULT_FUSE,
    range: player.bombRange,
    primed: false,
    rushed: false,
  };

  state.bombs.push(bomb);
  player.activeBombs++;
  return true;
}

export function tickBombs(state: GameState, dt: number): GridPos[] {
  const detonated: GridPos[] = [];

  for (let i = state.bombs.length - 1; i >= 0; i--) {
    state.bombs[i].fuseRemaining -= dt;
    if (state.bombs[i].fuseRemaining <= 0) {
      detonated.push({ ...state.bombs[i].gridPos });
      const owner = state.players[state.bombs[i].ownerId];
      if (owner) owner.activeBombs--;
      state.bombs.splice(i, 1);
    }
  }

  return detonated;
}

export function primeBomb(state: GameState, playerId: number): boolean {
  const player = state.players[playerId];
  if (!player || player.fuseCharges <= 0) return false;

  const bomb = state.bombs.find(b => b.ownerId === playerId && !b.primed);
  if (!bomb) return false;

  bomb.fuseRemaining = PRIMED_FUSE;
  bomb.primed = true;
  player.fuseCharges--;
  return true;
}

export function rushBomb(state: GameState, playerId: number): boolean {
  const player = state.players[playerId];
  if (!player || player.fuseCharges <= 0) return false;

  const bomb = state.bombs.find(b => b.ownerId === playerId && !b.rushed);
  if (!bomb) return false;

  bomb.fuseRemaining = Math.min(bomb.fuseRemaining, RUSHED_FUSE);
  bomb.rushed = true;
  player.fuseCharges--;
  return true;
}

export function detonateBomb(state: GameState, playerId: number): GridPos | null {
  const player = state.players[playerId];
  if (!player || player.fuseCharges <= 0) return null;

  const idx = state.bombs.findIndex(b => b.ownerId === playerId);
  if (idx === -1) return null;

  const bomb = state.bombs[idx];
  const pos = { ...bomb.gridPos };
  state.bombs.splice(idx, 1);
  player.activeBombs--;
  player.fuseCharges--;
  return pos;
}

export { DEFAULT_FUSE, PRIMED_FUSE, RUSHED_FUSE };
