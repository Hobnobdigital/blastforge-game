import { GameState } from '@core/types';

export class HUD {
  constructor(containerId = 'hud') {
    // Validate HUD container exists
    if (!document.getElementById(containerId)) {
      console.warn(`HUD container #${containerId} not found`);
    }
  }

  update(state: GameState): void {
    const p = state.players[0];
    if (!p) return;
    const info = document.getElementById('game-info');
    if (info) {
      info.textContent = p.alive
        ? `Bombs: ${p.maxBombs - p.activeBombs}/${p.maxBombs}  Range: ${p.bombRange}  Fuse: ${p.fuseCharges}  Speed: ${p.speed.toFixed(1)}`
        : 'ELIMINATED';
    }
  }
}
