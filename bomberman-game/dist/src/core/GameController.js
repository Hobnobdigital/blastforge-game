import { GamePhase, MenuScreen, } from './ExtendedTypes';
import { settingsManager } from './SettingsManager';
import { levelSystem } from './LevelSystem';
import { MenuManager } from '@ui/MenuManager';
import { InputManager } from '@input/InputManager';
import { AudioEngine } from '@audio/AudioEngine';
import { SceneManager } from '@rendering/SceneManager';
import { HUD } from '@ui/HUD';
import { GameLoop } from './GameLoop';
import { Direction, } from './types';
import { createInitialState as createBaseState } from './StateManager';
import { movePlayer } from '@systems/GridSystem';
import { placeBomb, tickBombs, primeBomb, rushBomb, detonateBomb, } from '@systems/BombSystem';
import { spawnExplosion, tickExplosions } from '@systems/ExplosionSystem';
import { collectPowerUps } from '@systems/PowerUpSystem';
export class GameController {
    state;
    input;
    scene;
    audio;
    menuManager;
    hud;
    gameLoop;
    sessionBombsPlaced = 0;
    sessionPowerUpsCollected = 0;
    _sessionEnemiesDefeated = 0;
    fpsEl;
    constructor() {
        // Initialize core systems
        this.input = new InputManager();
        this.scene = new SceneManager();
        this.audio = new AudioEngine();
        this.hud = new HUD();
        // Load settings into audio
        const settings = settingsManager.getSettings();
        this.audio.setMusicVolume(settings.musicVolume);
        this.audio.setSfxVolume(settings.sfxVolume);
        this.audio.setUiVolume(settings.uiVolume);
        // Initialize extended game state
        this.state = this.createInitialExtendedState();
        // Setup menu manager
        this.menuManager = new MenuManager((levelId) => this.startGame(levelId), () => this.resumeGame(), () => this.quitToMenu());
        // Setup FPS counter
        this.fpsEl = document.getElementById('fps-counter');
        this.fpsEl.style.display = settings.showFPS ? 'block' : 'none';
        // Setup pause callback
        this.input.setPauseCallback(() => this.togglePause());
        // Initialize game loop
        this.gameLoop = new GameLoop((dt, tick) => this.update(dt, tick), (alpha) => this.render(alpha));
        // Show main menu
        this.menuManager.showScreen(MenuScreen.MAIN);
    }
    createInitialExtendedState() {
        return {
            base: createBaseState(),
            phase: GamePhase.MENU,
            currentLevel: 1,
            levelStartTime: 0,
            totalPauseTime: 0,
            pausedAt: null,
            session: {
                bombsPlaced: 0,
                powerUpsCollected: 0,
                enemiesDefeated: 0,
                startTime: Date.now(),
            },
            settings: settingsManager.getSettings(),
            stats: settingsManager.getStats(),
        };
    }
    start() {
        this.gameLoop.start();
    }
    startGame(levelId) {
        settingsManager.incrementGamesStarted();
        // Set the level
        levelSystem.setLevel(levelId - 1);
        this.state.currentLevel = levelId;
        // Create level state
        const levelConfig = levelSystem.getCurrentLevel();
        this.state.base = levelSystem.createLevelState(levelConfig);
        // Reset session stats
        this.sessionBombsPlaced = 0;
        this.sessionPowerUpsCollected = 0;
        this._sessionEnemiesDefeated = 0;
        this.state.levelStartTime = Date.now();
        this.state.totalPauseTime = 0;
        this.state.pausedAt = null;
        // Apply settings
        this.applySettings();
        // Transition to playing
        this.state.phase = GamePhase.PLAYING;
        this.menuManager.hide();
        console.log(`Starting Level ${levelId}: ${levelConfig.name}`);
    }
    resumeGame() {
        if (this.state.phase === GamePhase.PAUSED) {
            if (this.state.pausedAt) {
                this.state.totalPauseTime += Date.now() - this.state.pausedAt;
            }
            this.state.pausedAt = null;
            this.state.phase = GamePhase.PLAYING;
            this.menuManager.hide();
        }
    }
    quitToMenu() {
        const sessionTime = Math.floor((Date.now() - this.state.session.startTime) / 1000);
        settingsManager.addPlayTime(sessionTime);
        this.state.phase = GamePhase.MENU;
        this.menuManager.showScreen(MenuScreen.MAIN);
    }
    togglePause() {
        if (this.state.phase === GamePhase.PLAYING) {
            this.state.phase = GamePhase.PAUSED;
            this.state.pausedAt = Date.now();
            this.menuManager.showPauseMenu();
        }
        else if (this.state.phase === GamePhase.PAUSED) {
            this.resumeGame();
        }
    }
    update(dt, tick) {
        this.state.base.tick = tick;
        const input = this.input.poll();
        switch (this.state.phase) {
            case GamePhase.PLAYING:
                this.updatePlaying(dt, input);
                break;
            case GamePhase.PAUSED:
                break;
            case GamePhase.VICTORY:
            case GamePhase.DEFEAT:
                break;
            case GamePhase.MENU:
                break;
        }
        this.hud.update(this.state.base, this.state);
    }
    updatePlaying(dt, input) {
        const player = this.state.base.players[0];
        if (player?.alive) {
            if (input.moveDir !== Direction.None) {
                player.moveDir = input.moveDir;
                movePlayer(this.state.base, 0, dt);
            }
            if (input.placeBomb) {
                if (placeBomb(this.state.base, 0)) {
                    this.audio.playBombPlace();
                    this.sessionBombsPlaced++;
                    settingsManager.incrementBombsPlaced();
                }
            }
            if (input.fuseAction === 'prime')
                primeBomb(this.state.base, 0);
            else if (input.fuseAction === 'rush')
                rushBomb(this.state.base, 0);
            else if (input.fuseAction === 'detonate') {
                const pos = detonateBomb(this.state.base, 0);
                if (pos) {
                    spawnExplosion(this.state.base, pos, player.bombRange);
                    this.audio.playExplosion();
                }
            }
        }
        const detonated = tickBombs(this.state.base, dt);
        for (const pos of detonated) {
            spawnExplosion(this.state.base, pos, this.state.base.players[0]?.bombRange ?? 2);
            this.audio.playExplosion();
        }
        tickExplosions(this.state.base, dt);
        const powerUpCollected = collectPowerUps(this.state.base);
        if (powerUpCollected) {
            this.audio.playPowerUp();
            this.sessionPowerUpsCollected++;
            settingsManager.incrementPowerUpsCollected();
            settingsManager.vibrate(50);
        }
        this.checkGameEndConditions();
    }
    checkGameEndConditions() {
        const player = this.state.base.players[0];
        if (!player?.alive) {
            this.handleDefeat();
            return;
        }
        const enemies = this.state.base.enemies || [];
        const aliveEnemies = enemies.filter((e) => e.alive);
        if (aliveEnemies.length === 0 && enemies.length > 0) {
            this.handleVictory();
            return;
        }
    }
    handleVictory() {
        this.state.phase = GamePhase.VICTORY;
        const levelTime = Math.floor((Date.now() - this.state.levelStartTime - this.state.totalPauseTime) / 1000);
        settingsManager.recordWin(this.state.currentLevel, levelTime);
        settingsManager.vibrate([100, 50, 100]);
        this.menuManager.showGameOver(true, {
            time: levelTime,
            bombs: this.sessionBombsPlaced,
            powerUps: this.sessionPowerUpsCollected,
        });
        console.log(`Victory! Level ${this.state.currentLevel} completed in ${levelTime}s`);
    }
    handleDefeat() {
        this.state.phase = GamePhase.DEFEAT;
        settingsManager.recordLoss();
        settingsManager.vibrate([200, 100, 200]);
        const levelTime = Math.floor((Date.now() - this.state.levelStartTime - this.state.totalPauseTime) / 1000);
        this.menuManager.showGameOver(false, {
            time: levelTime,
            bombs: this.sessionBombsPlaced,
            powerUps: this.sessionPowerUpsCollected,
        });
        console.log(`Defeat! Level ${this.state.currentLevel} failed after ${levelTime}s`);
    }
    render(alpha) {
        this.scene.syncState(this.state.base, alpha);
        this.scene.render();
        if (this.state.settings.showFPS) {
            this.fpsEl.textContent = `${this.gameLoop.fps} FPS`;
        }
    }
    applySettings() {
        const settings = settingsManager.getSettings();
        this.audio.setMusicVolume(settings.musicVolume);
        this.audio.setSfxVolume(settings.sfxVolume);
        this.audio.setUiVolume(settings.uiVolume);
        this.fpsEl.style.display = settings.showFPS ? 'block' : 'none';
        if (settings.fullscreen && !document.fullscreenElement) {
            document.documentElement.requestFullscreen?.().catch(() => { });
        }
        else if (!settings.fullscreen && document.fullscreenElement) {
            document.exitFullscreen?.().catch(() => { });
        }
    }
    getState() {
        return this.state;
    }
    getPhase() {
        return this.state.phase;
    }
}
//# sourceMappingURL=GameController.js.map