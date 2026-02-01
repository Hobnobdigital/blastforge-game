import { GameState, PowerUpType } from '@core/types';

export function collectPowerUps(state: GameState): boolean {
  let collected = false;
  
  for (const player of state.players) {
    if (!player.alive) continue;

    for (let i = state.powerUps.length - 1; i >= 0; i--) {
      const pu = state.powerUps[i];
      if (pu.gridPos.col === player.gridPos.col && pu.gridPos.row === player.gridPos.row) {
        applyPowerUp(state, player.id, pu.type);
        state.powerUps.splice(i, 1);
        collected = true;
      }
    }
  }
  
  return collected;
}

function applyPowerUp(state: GameState, playerId: number, type: PowerUpType): void {
  const player = state.players[playerId];
  if (!player) return;

  switch (type) {
    case PowerUpType.BombRange:
      player.bombRange = Math.min(player.bombRange + 1, 8);
      break;
    case PowerUpType.BombCount:
      player.maxBombs = Math.min(player.maxBombs + 1, 8);
      break;
    case PowerUpType.Speed:
      player.speed = Math.min(player.speed + 0.5, 6);
      break;
    case PowerUpType.FuseCharge:
      player.fuseCharges = Math.min(player.fuseCharges + 1, 5);
      break;
  }
}
