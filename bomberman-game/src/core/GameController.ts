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
import { AudioEngine } from '@audio/AudioEngine';
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
  detonateBomb 
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
    
    // Show main menu
    this.menuManager.showScreen(MenuScreen.MAIN);
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
    
    // Resume audio context if needed
    this.audio.setMusicVolume(this.state.settings.musicVolume);
    
    console.log(`Starting Level ${levelId}: ${levelConfig.name}`);
  }

  private resumeGame(): void {
    if (this.state.phase === GamePhase.PAUSED) {
      // Add pause duration to total
      if (this.state.pausedAt) {
        this.state.totalPauseTime += Date.now() - this.state.pausedAt;
      }
      this.state.pausedAt = null;
      this.state.phase = GamePhase.PLAYING;
      this.menuManager.hide();
    }
  }

  private quitToMenu(): void {
    // Save play time
    const sessionTime = Math.floor((Date.now() - this.state.session.startTime) / 1000);
    settingsManager.addPlayTime(sessionTime);
    
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
    // Always update FPS
    this.state.base.tick = tick;
    
    // Handle input for all phases
    const input = this.input.poll();
    
    switch (this.state.phase) {
      case GamePhase.PLAYING:
        this.updatePlaying(dt, input);
        break;
      case GamePhase.PAUSED:
        // Don't update game state when paused
        break;
      case GamePhase.VICTORY:
      case GamePhase.DEFEAT:
        // Wait for menu interaction
        break;
      case GamePhase.MENU:
        // Menu handles its own input
        break;
    }
    
    // Update HUD
    this.hud.update(this.state.base, this.state);
  }

  private updatePlaying(dt: number, input: ExtendedInputState): void {
    const player = this.state.base.players[0];
    
    if (player?.alive) {
      // Movement
      if (input.moveDir !== Direction.None) {
        player.moveDir = input.moveDir;
        movePlayer(this.state.base, 0, dt);
      }

      // Bomb placement
      if (input.placeBomb) {
        if (placeBomb(this.state.base, 0)) {
          this.audio.playBombPlace();
          this.sessionBombsPlaced++;
          settingsManager.incrementBombsPlaced();
        }
      }

      // Fuse actions
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

    // Tick bombs
    const detonated = tickBombs(this.state.base, dt);
    for (const pos of detonated) {
      spawnExplosion(this.state.base, pos, this.state.base.players[0]?.bombRange ?? 2);
      this.audio.playExplosion();
    }

    // Tick explosions
    tickExplosions(this.state.base, dt);

    // Collect power-ups
    const powerUpCollected = collectPowerUps(this.state.base);
    if (powerUpCollected) {
      this.audio.playPowerUp();
      this.sessionPowerUpsCollected++;
      settingsManager.incrementPowerUpsCollected();
      settingsManager.vibrate(50);
    }

    // Check win/lose conditions
    this.checkGameEndConditions();
  }

  private checkGameEndConditions(): void {
    const player = this.state.base.players[0];
    
    // Check defeat - player died
    if (!player?.alive) {
      this.handleDefeat();
      return;
    }
    
    // Check victory - all enemies defeated or all soft blocks destroyed
    const enemies = (this.state.base as any).enemies || [];
    const aliveEnemies = enemies.filter((e: any) => e.alive);
    
    // Victory condition: No enemies left (or all destroyed soft blocks in single player)
    if (aliveEnemies.length === 0 && enemies.length > 0) {
      this.handleVictory();
      return;
    }
    
    // Alternative victory: All soft blocks destroyed
    let softBlocksRemaining = 0;
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (this.state.base.grid[row][col] === TileType.SoftBlock) {
          softBlocksRemaining++;
        }
      }
    }
    
    // Victory if no enemies and few soft blocks remain (optional condition)
    // For now, let's use a simpler condition: clear all enemies or survive
  }

  private handleVictory(): void {
    this.state.phase = GamePhase.VICTORY;
    
    const levelTime = Math.floor((Date.now() - this.state.levelStartTime - this.state.totalPauseTime) / 1000);
    
    // Update stats
    settingsManager.recordWin(this.state.currentLevel, levelTime);
    
    // Vibrate for feedback
    settingsManager.vibrate([100, 50, 100]);
    
    // Show victory screen
    this.menuManager.showGameOver(true, {
      time: levelTime,
      bombs: this.sessionBombsPlaced,
      powerUps: this.sessionPowerUpsCollected,
    });
    
    console.log(`Victory! Level ${this.state.currentLevel} completed in ${levelTime}s`);
  }

  private handleDefeat(): void {
    this.state.phase = GamePhase.DEFEAT;
    
    // Update stats
    settingsManager.recordLoss();
    
    // Vibrate for feedback
    settingsManager.vibrate([200, 100, 200]);
    
    // Show defeat screen
    const levelTime = Math.floor((Date.now() - this.state.levelStartTime - this.state.totalPauseTime) / 1000);
    this.menuManager.showGameOver(false, {
      time: levelTime,
      bombs: this.sessionBombsPlaced,
      powerUps: this.sessionPowerUpsCollected,
    });
    
    console.log(`Defeat! Level ${this.state.currentLevel} failed after ${levelTime}s`);
  }

  private render(alpha: number): void {
    // Always render the scene (even when paused, for background)
    this.scene.syncState(this.state.base, alpha);
    this.scene.render();
    
    // Update FPS display
    if (this.state.settings.showFPS) {
      this.fpsEl.textContent = `${this.gameLoop.fps} FPS`;
    }
  }

  private applySettings(): void {
    const settings = settingsManager.getSettings();
    
    // Apply audio settings
    this.audio.setMusicVolume(settings.musicVolume);
    this.audio.setSfxVolume(settings.sfxVolume);
    this.audio.setUiVolume(settings.uiVolume);
    
    // Apply display settings
    this.fpsEl.style.display = settings.showFPS ? 'block' : 'none';
    
    // Apply fullscreen
    if (settings.fullscreen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else if (!settings.fullscreen && document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  // Public API for external access
  getState(): ExtendedGameState {
    return this.state;
  }

  getPhase(): GamePhase {
    return this.state.phase;
  }
}
