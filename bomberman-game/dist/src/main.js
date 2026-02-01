import { GameLoop } from '@core/GameLoop';
import { createInitialState } from '@core/StateManager';
import { InputManager } from '@input/InputManager';
import { SceneManager } from '@rendering/SceneManager';
import { AudioEngine } from '@audio/AudioEngine';
import { HUD } from '@ui/HUD';
import { movePlayer } from '@systems/GridSystem';
import { placeBomb, tickBombs, primeBomb, rushBomb, detonateBomb } from '@systems/BombSystem';
import { spawnExplosion, tickExplosions } from '@systems/ExplosionSystem';
import { collectPowerUps } from '@systems/PowerUpSystem';
// ── Bootstrap ──
const state = createInitialState();
const input = new InputManager();
const scene = new SceneManager();
const audio = new AudioEngine();
const hud = new HUD();
const fpsEl = document.getElementById('fps-counter');
// Detect touch device for adaptive UI
const isTouchDevice = input.isTouchAvailable();
if (isTouchDevice) {
    console.log('Touch controls enabled');
}
function update(dt, tick) {
    state.tick = tick;
    // Read input (keyboard, gamepad, or touch)
    const inp = input.poll();
    const player = state.players[0];
    if (player?.alive) {
        player.moveDir = inp.moveDir;
        movePlayer(state, 0, dt);
        if (inp.placeBomb) {
            if (placeBomb(state, 0))
                audio.playBombPlace();
        }
        if (inp.fuseAction === 'prime')
            primeBomb(state, 0);
        else if (inp.fuseAction === 'rush')
            rushBomb(state, 0);
        else if (inp.fuseAction === 'detonate') {
            const pos = detonateBomb(state, 0);
            if (pos) {
                spawnExplosion(state, pos, player.bombRange);
                audio.playExplosion();
            }
        }
    }
    // Tick bombs
    const detonated = tickBombs(state, dt);
    for (const pos of detonated) {
        spawnExplosion(state, pos, state.players[0]?.bombRange ?? 2);
        audio.playExplosion();
    }
    // Tick explosions
    tickExplosions(state, dt);
    // Collect power-ups
    collectPowerUps(state);
    // Update HUD
    hud.update(state);
}
function render(alpha) {
    scene.syncState(state, alpha);
    scene.render();
    fpsEl.textContent = `${gameLoop.fps} FPS`;
}
const gameLoop = new GameLoop(update, render);
gameLoop.start();
//# sourceMappingURL=main.js.map