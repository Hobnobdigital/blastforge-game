import { GamePhase } from '@core/ExtendedTypes';
export class HUD {
    container;
    gameInfo;
    levelInfo = null;
    timerInfo = null;
    constructor(containerId = 'hud') {
        this.container = document.getElementById(containerId);
        this.gameInfo = document.getElementById('game-info');
        // Create additional HUD elements
        this.createHUDElements();
    }
    createHUDElements() {
        // Level info
        this.levelInfo = document.createElement('div');
        this.levelInfo.id = 'level-info';
        this.levelInfo.style.cssText = `
      position: absolute;
      top: 8px;
      left: 12px;
      font-size: 14px;
      opacity: 0.8;
      color: #e94560;
      font-weight: 600;
    `;
        this.container.appendChild(this.levelInfo);
        // Timer info
        this.timerInfo = document.createElement('div');
        this.timerInfo.id = 'timer-info';
        this.timerInfo.style.cssText = `
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 18px;
      font-weight: bold;
      opacity: 0.9;
      color: #fff;
      font-variant-numeric: tabular-nums;
    `;
        this.container.appendChild(this.timerInfo);
    }
    update(state, extendedState) {
        const p = state.players[0];
        if (!p)
            return;
        // Update player stats
        if (this.gameInfo) {
            if (p.alive) {
                this.gameInfo.innerHTML = `
          <span style="color: #e94560;">BOMBS:</span> ${p.maxBombs - p.activeBombs}/${p.maxBombs} &nbsp;
          <span style="color: #e94560;">RANGE:</span> ${p.bombRange} &nbsp;
          <span style="color: #e94560;">FUSE:</span> ${p.fuseCharges} &nbsp;
          <span style="color: #e94560;">SPD:</span> ${p.speed.toFixed(1)}
        `;
            }
            else {
                this.gameInfo.innerHTML = '<span style="color: #ef4444; font-weight: bold;">☠ ELIMINATED</span>';
            }
        }
        // Update level info
        if (this.levelInfo && extendedState) {
            const levelName = this.getLevelName(extendedState.currentLevel);
            this.levelInfo.textContent = `LEVEL ${extendedState.currentLevel}: ${levelName}`;
        }
        // Update timer
        if (this.timerInfo && extendedState) {
            const elapsed = this.getElapsedTime(extendedState);
            this.timerInfo.textContent = this.formatTime(elapsed);
            // Change color when paused
            if (extendedState.phase === GamePhase.PAUSED) {
                this.timerInfo.style.color = '#fbbf24';
            }
            else {
                this.timerInfo.style.color = '#fff';
            }
        }
        // Update visibility based on phase
        if (extendedState) {
            const isPlaying = extendedState.phase === GamePhase.PLAYING ||
                extendedState.phase === GamePhase.PAUSED;
            this.levelInfo.style.display = isPlaying ? 'block' : 'none';
            this.timerInfo.style.display = isPlaying ? 'block' : 'none';
            this.gameInfo.style.display = isPlaying ? 'block' : 'none';
        }
    }
    getLevelName(levelId) {
        const levelNames = {
            1: 'Training Grounds',
            2: 'Ice Caverns',
            3: 'Volcano Core',
            4: 'Enchanted Forest',
            5: 'Desert Ruins',
            6: 'Space Station',
        };
        return levelNames[levelId] || 'Unknown';
    }
    getElapsedTime(state) {
        if (state.phase === GamePhase.PAUSED && state.pausedAt) {
            return Math.floor((state.pausedAt - state.levelStartTime - state.totalPauseTime) / 1000);
        }
        return Math.floor((Date.now() - state.levelStartTime - state.totalPauseTime) / 1000);
    }
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    showMessage(text, duration = 3000) {
        const msg = document.createElement('div');
        msg.textContent = text;
        msg.style.cssText = `
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(233, 69, 96, 0.9);
      color: white;
      padding: 16px 32px;
      border-radius: 8px;
      font-size: 1.2rem;
      font-weight: bold;
      z-index: 100;
      animation: fadeInOut ${duration}ms ease-in-out;
    `;
        this.container.appendChild(msg);
        setTimeout(() => msg.remove(), duration);
    }
}
//# sourceMappingURL=HUD.js.map