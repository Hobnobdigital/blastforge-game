/**
 * HUD - Heads Up Display with responsive mobile support
 *
 * Features:
 * - Dynamic info text based on input method
 * - Mobile-responsive layout
 * - Touch device detection
 */
export class HUD {
    isTouchDevice;
    hasShownTouchHint = false;
    constructor(containerId = 'hud') {
        // Validate HUD container exists
        if (!document.getElementById(containerId)) {
            console.warn(`HUD container #${containerId} not found`);
        }
        // Detect touch capability
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        // Update initial instructions
        this.updateInstructions();
    }
    /**
     * Update instructions based on device type
     */
    updateInstructions() {
        const info = document.getElementById('game-info');
        if (!info)
            return;
        if (this.isTouchDevice) {
            info.textContent = 'BLASTFORGE — Use joystick to move, tap buttons for actions';
        }
        else {
            info.textContent = 'BLASTFORGE v0.1 — WASD to move, SPACE for bomb, Q/E/R for fuse';
        }
    }
    /**
     * Get mobile-optimized stats text
     */
    getStatsText(state) {
        const p = state.players[0];
        if (!p)
            return '';
        if (!p.alive)
            return 'ELIMINATED';
        // Compact format for mobile
        const bombs = `${p.maxBombs - p.activeBombs}/${p.maxBombs}`;
        const range = p.bombRange;
        const fuse = p.fuseCharges;
        const speed = p.speed.toFixed(1);
        // Shorter text for small screens
        if (window.innerWidth < 400) {
            return `♦${bombs}  ◊${range}  ⚡${fuse}`;
        }
        return `Bombs: ${bombs}  Range: ${range}  Fuse: ${fuse}  Speed: ${speed}`;
    }
    update(state) {
        const p = state.players[0];
        if (!p)
            return;
        const info = document.getElementById('game-info');
        if (info) {
            if (p.alive) {
                info.textContent = this.getStatsText(state);
            }
            else {
                info.textContent = 'ELIMINATED — Press R to restart';
            }
        }
    }
    /**
     * Show a temporary message to the player
     */
    showMessage(message, duration = 2000) {
        const info = document.getElementById('game-info');
        if (!info)
            return;
        const originalText = info.textContent;
        info.textContent = message;
        info.style.opacity = '1';
        setTimeout(() => {
            if (info.textContent === message) {
                info.textContent = originalText;
                info.style.opacity = '';
            }
        }, duration);
    }
    /**
     * Check if running on touch device
     */
    isTouchEnabled() {
        return this.isTouchDevice;
    }
}
//# sourceMappingURL=HUD.js.map