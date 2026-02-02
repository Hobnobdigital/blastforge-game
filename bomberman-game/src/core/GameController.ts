import {
  ExtendedGameState,
  GamePhase,
  ExtendedInputState,
  MenuScreen,
} from './ExtendedTypes';
import { settingsManager } from './SettingsManager';
import { levelSystem } from './LevelSystem';
import { MenuManager } from '@ui/MenuManager';
import { InputManager } from '@input/InputManager';
import { AudioEngine, audioEngine } from '@audio/AudioEngine';
import { SceneManager } from '@rendering/SceneManager';
import { HUD } from '@ui/HUD';
import { GameLoop } from './GameLoop';
import {
  Direction,
  TileType,
  GRID_SIZE,
} from './types';
import {
  createInitialState as createBaseState
} from './StateManager';
import {
  movePlayer
} from '@systems/GridSystem';
import {
  placeBomb,
  tickBombs,
  primeBomb,
  rushBomb,
  detonateBomb,
} from '@systems/BombSystem';
import {
  spawnExplosion,
  tickExplosions
} from '@systems/ExplosionSystem';
import {
  collectPowerUps
} from '@systems/PowerUpSystem';

export class GameController {
  private state: ExtendedGameState;
  private input: InputManager;
  private scene: SceneManager;
  private audio: AudioEngine;
  private menuManager: MenuManager;
  private hud: HUD;
  private gameLoop: GameLoop;

  private sessionBombsPlaced = 0;
  private sessionPowerUpsCollected = 0;
  private _sessionEnemiesDefeated = 0;
  private fpsEl: HTMLElement;
  
  // Track previous enemy count for death detection
  private previousEnemyCount = 0;
  private playerWasAlive = true;

  private audioInitialized = false;

  constructor() {
    // Initialize core systems
    this.input = new InputManager();
    this.scene = new SceneManager();
    this.audio = audioEngine;
    this.hud = new HUD();

    // Load settings into audio
    const settings = settingsManager.getSettings();
    this.audio.setMusicVolume(settings.musicVolume);
    this.audio.setSfxVolume(settings.sfxVolume);
    this.audio.setUiVolume(settings.uiVolume);

    // Initialize extended game state
    this.state = this.createInitialExtendedState();

    // Setup menu manager
    this.menuManager = new MenuManager(
      (levelId) => this.startGame(levelId),
      () => this.resumeGame(),
      () => this.quitToMenu()
    );

    // Setup FPS counter
    this.fpsEl = document.getElementById('fps-counter')!;
    this.fpsEl.style.display = settings.showFPS ? 'block' : 'none';

    // Setup pause callback
    this.input.setPauseCallback(() => this.togglePause());

    // Initialize game loop
    this.gameLoop = new GameLoop(
      (dt, tick) => this.update(dt, tick),
      (alpha) => this.render(alpha)
    );

    // Setup audio initialization on first interaction
    this.setupAudioInitialization();

    // Show main menu
    this.menuManager.showScreen(MenuScreen.MAIN);
  }

  /**
   * Initialize audio on first user interaction (required by browsers)
   */
  private setupAudioInitialization(): void {
    const initAudio = () => {
      if (!this.audioInitialized) {
        this.audio.initialize();
        this.audioInitialized = true;
        this.audio.playMenuMusic();
        console.log('[GameController] Audio initialized');
      }
    };

    // Listen for first interaction
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, initAudio, { once: true });
    });
  }

  private createInitialExtendedState(): ExtendedGameState {
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

  start(): void {
    this.gameLoop.start();
  }

  private startGame(levelId: number): void {
    settingsManager.incrementGamesStarted();

    // Initialize audio if not already done
    if (!this.audioInitialized) {
      this.audio.initialize();
      this.audioInitialized = true;
    }

    // Set the level
    levelSystem.setLevel(levelId - 1);
    this.state.currentLevel = levelId;

    // Create level state
    const levelConfig = levelSystem.getCurrentLevel();
    this.state.base = levelSystem.createLevelState(levelConfig);

    // Initialize enemy count tracking
    const initialEnemies = (this.state.base as any).enemies || [];
    this.previousEnemyCount = initialEnemies.filter((e: any) => e.alive).length;

    // Apply theme and weather
    const themeColors = levelSystem.getThemeColors(levelConfig.theme);
    this.scene.setTheme(levelConfig.theme);
    this.scene.setWeatherEnabled(true);

    // Reset session stats
    this.sessionBombsPlaced = 0;
    this.sessionPowerUpsCollected = 0;
    this._sessionEnemiesDefeated = 0;
    this.previousEnemyCount = 0;
    this.playerWasAlive = true;
    this.state.levelStartTime = Date.now();
    this.state.totalPauseTime = 0;
    this.state.pausedAt = null;

    // Apply settings
    this.applySettings();

    // Play gameplay music
    this.audio.playGameplayMusic();

    // Transition to playing
    this.state.phase = GamePhase.PLAYING;
    this.menuManager.hide();

    console.log(`Starting Level ${levelId}: ${levelConfig.name}`);
  }

  private resumeGame(): void {
    if (this.state.phase === GamePhase.PAUSED) {
      if (this.state.pausedAt) {
        this.state.totalPauseTime += Date.now() - this.state.pausedAt;
      }
      this.state.pausedAt = null;
      this.state.phase = GamePhase.PLAYING;
      this.menuManager.hide();
    }
  }

  private quitToMenu(): void {
    const sessionTime = Math.floor((Date.now() - this.state.session.startTime) / 1000);
    settingsManager.addPlayTime(sessionTime);

    // Stop gameplay music and play menu music
    this.audio.stopMusic();
    this.audio.playMenuMusic();

    this.state.phase = GamePhase.MENU;
    this.menuManager.showScreen(MenuScreen.MAIN);
  }

  private togglePause(): void {
    if (this.state.phase === GamePhase.PLAYING) {
      this.state.phase = GamePhase.PAUSED;
      this.state.pausedAt = Date.now();
      this.menuManager.showPauseMenu();
    } else if (this.state.phase === GamePhase.PAUSED) {
      this.resumeGame();
    }
  }

  private update(dt: number, tick: number): void {
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

  private updatePlaying(dt: number, input: ExtendedInputState): void {
    const player = this.state.base.players[0];

    // Check for player damage (was alive, now hurt)
    if (this.playerWasAlive && player && !player.alive) {
      this.audio.playPlayerDamage();
    }
    this.playerWasAlive = player?.alive ?? false;

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

      if (input.fuseAction === 'prime') primeBomb(this.state.base, 0);
      else if (input.fuseAction === 'rush') rushBomb(this.state.base, 0);
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

    // Track enemy deaths
    this.trackEnemyDeaths();

    this.checkGameEndConditions();
  }

  /**
   * Track enemy deaths and play sounds
   */
  private trackEnemyDeaths(): void {
    const enemies = (this.state.base as any).enemies || [];
    const aliveEnemies = enemies.filter((e: any) => e.alive);
    
    // Check if enemies died since last frame
    if (aliveEnemies.length < this.previousEnemyCount) {
      const deaths = this.previousEnemyCount - aliveEnemies.length;
      for (let i = 0; i < deaths; i++) {
        this.audio.playEnemyDeath();
        this._sessionEnemiesDefeated++;
        settingsManager.incrementEnemiesDefeated();
      }
    }
    
    this.previousEnemyCount = aliveEnemies.length;
  }

  private checkGameEndConditions(): void {
    const player = this.state.base.players[0];

    if (!player?.alive) {
      this.handleDefeat();
      return;
    }

    const enemies = (this.state.base as any).enemies || [];
    const aliveEnemies = enemies.filter((e: any) => e.alive);

    if (aliveEnemies.length === 0 && enemies.length > 0) {
      this.handleVictory();
      return;
    }
  }

  private handleVictory(): void {
    this.state.phase = GamePhase.VICTORY;

    const levelTime = Math.floor((Date.now() - this.state.levelStartTime - this.state.totalPauseTime) / 1000);

    settingsManager.recordWin(this.state.currentLevel, levelTime);
    settingsManager.vibrate([100, 50, 100]);

    // Play victory sound and stop gameplay music
    this.audio.stopMusic();
    this.audio.playVictory();

    this.menuManager.showGameOver(true, {
      time: levelTime,
      bombs: this.sessionBombsPlaced,
      powerUps: this.sessionPowerUpsCollected,
    });

    console.log(`Victory! Level ${this.state.currentLevel} completed in ${levelTime}s`);
  }

  private handleDefeat(): void {
    this.state.phase = GamePhase.DEFEAT;

    settingsManager.recordLoss();
    settingsManager.vibrate([200, 100, 200]);

    // Play defeat sound and stop gameplay music
    this.audio.stopMusic();
    this.audio.playDefeat();

    const levelTime = Math.floor((Date.now() - this.state.levelStartTime - this.state.totalPauseTime) / 1000);
    this.menuManager.showGameOver(false, {
      time: levelTime,
      bombs: this.sessionBombsPlaced,
      powerUps: this.sessionPowerUpsCollected,
    });

    console.log(`Defeat! Level ${this.state.currentLevel} failed after ${levelTime}s`);
  }

  private render(alpha: number): void {
    this.scene.syncState(this.state.base, alpha);
    this.scene.render();

    if (this.state.settings.showFPS) {
      this.fpsEl.textContent = `${this.gameLoop.fps} FPS`;
    }
  }

  private applySettings(): void {
    const settings = settingsManager.getSettings();

    this.audio.setMusicVolume(settings.musicVolume);
    this.audio.setSfxVolume(settings.sfxVolume);
    this.audio.setUiVolume(settings.uiVolume);

    this.fpsEl.style.display = settings.showFPS ? 'block' : 'none';

    if (settings.fullscreen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else if (!settings.fullscreen && document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  getState(): ExtendedGameState {
    return this.state;
  }

  getPhase(): GamePhase {
    return this.state.phase;
  }
}
