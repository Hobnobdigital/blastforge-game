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
import { AudioManager, MusicTrack, AudioCategory } from '@audio/AudioManager';
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
  BombState 
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
  private audio: AudioManager;
  private menuManager: MenuManager;
  private hud: HUD;
  private gameLoop: GameLoop;
  
  private sessionBombsPlaced = 0;
  private sessionPowerUpsCollected = 0;
  private sessionEnemiesDefeated = 0;
  private fpsEl: HTMLElement;
  
  // Track previous bomb states for fuse tick management
  private previousBombs: Map<number, BombState> = new Map();
  private fuseSoundsInitialized = false;

  constructor() {
    // Initialize core systems
    this.input = new InputManager();
    this.scene = new SceneManager();
    this.audio = AudioManager.getInstance();
    this.hud = new HUD();
    
    // Initialize audio after user interaction
    this.initializeAudio();
    
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
    this.fpsEl.style.display = 'none'; // Will show based on settings
    
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
  
  /**
   * Initialize audio system after user interaction
   */
  private initializeAudio(): void {
    const initAudio = async () => {
      await this.audio.initialize();
      
      // Load settings into audio
      const settings = settingsManager.getSettings();
      this.audio.setVolume(AudioCategory.MASTER, 1.0);
      this.audio.setVolume(AudioCategory.MUSIC, settings.musicVolume);
      this.audio.setVolume(AudioCategory.SFX, settings.sfxVolume);
      this.audio.setVolume(AudioCategory.UI, settings.uiVolume);
      
      // Start menu music
      this.audio.playMusic(MusicTrack.MENU);
      
      // Remove listeners after initialization
      document.removeEventListener('click', initAudio);
      document.removeEventListener('touchstart', initAudio);
      document.removeEventListener('keydown', initAudio);
      
      this.fuseSoundsInitialized = true;
      console.log('[GameController] Audio initialized');
    };
    
    // Wait for user interaction to initialize audio (required for mobile)
    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('touchstart', initAudio, { once: true });
    document.addEventListener('keydown', initAudio, { once: true });
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
    
    // Play UI click
    this.audio.playUIClick();
    
    // Set the level
    levelSystem.setLevel(levelId - 1);
    this.state.currentLevel = levelId;
    
    // Create level state
    const levelConfig = levelSystem.getCurrentLevel();
    this.state.base = levelSystem.createLevelState(levelConfig);
    
    // Reset session stats
    this.sessionBombsPlaced = 0;
    this.sessionPowerUpsCollected = 0;
    this.sessionEnemiesDefeated = 0;
    this.state.levelStartTime = Date.now();
    this.state.totalPauseTime = 0;
    this.state.pausedAt = null;
    
    // Clear previous bomb tracking
    this.previousBombs.clear();
    
    // Apply settings
    this.applySettings();
    
    // Transition to playing
    this.state.phase = GamePhase.PLAYING;
    this.menuManager.hide();
    
    // Switch to gameplay music
    this.audio.playMusic(MusicTrack.GAMEPLAY);
    
    console.log(`Starting Level ${levelId}: ${levelConfig.name}`);
  }

  private resumeGame(): void {
    if (this.state.phase === GamePhase.PAUSED) {
      // Play UI click
      this.audio.playUIClick();
      
      // Add pause duration to total
      if (this.state.pausedAt) {
        this.state.totalPauseTime += Date.now() - this.state.pausedAt;
      }
      this.state.pausedAt = null;
      this.state.phase = GamePhase.PLAYING;
      this.menuManager.hide();
      
      // Resume music
      if (!this.audio.isMusicPlaying()) {
        this.audio.playMusic(MusicTrack.GAMEPLAY);
      }
    }
  }

  private quitToMenu(): void {
    // Play UI click
    this.audio.playUIClick();
    
    // Save play time
    const sessionTime = Math.floor((Date.now() - this.state.session.startTime) / 1000);
    settingsManager.addPlayTime(sessionTime);
    
    // Stop all game sounds
    this.audio.stopAllFuseTicks();
    
    this.state.phase = GamePhase.MENU;
    this.menuManager.showScreen(MenuScreen.MAIN);
    
    // Switch to menu music
    this.audio.playMusic(MusicTrack.MENU);
  }

  private togglePause(): void {
    if (this.state.phase === GamePhase.PLAYING) {
      this.state.phase = GamePhase.PAUSED;
      this.state.pausedAt = Date.now();
      this.menuManager.showPauseMenu();
      
      // Pause music
      this.audio.pause();
    } else if (this.state.phase === GamePhase.PAUSED) {
      this.resumeGame();
      
      // Resume music
      this.audio.resume();
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
    
    // Update listener position for spatial audio
    if (player) {
      this.audio.setListenerPosition(player.worldPos.x, player.worldPos.y, 0);
    }
    
    if (player?.alive) {
      // Movement
      if (input.moveDir !== Direction.None) {
        player.moveDir = input.moveDir;
        movePlayer(this.state.base, 0, dt);
        
        // Play footstep occasionally
        if (tick % 15 === 0) {
          this.audio.playFootstep({ x: player.worldPos.x, y: player.worldPos.y });
        }
      }

      // Bomb placement
      if (input.placeBomb) {
        if (placeBomb(this.state.base, 0)) {
          const newBomb = this.state.base.bombs[this.state.base.bombs.length - 1];
          this.audio.playBombPlace({ x: player.worldPos.x, y: player.worldPos.y });
          this.audio.startFuseTick(newBomb.id, false, false);
          this.sessionBombsPlaced++;
          settingsManager.incrementBombsPlaced();
        }
      }

      // Fuse actions
      if (input.fuseAction === 'prime') {
        if (primeBomb(this.state.base, 0)) {
          this.audio.playFusePrime();
        }
      } else if (input.fuseAction === 'rush') {
        if (rushBomb(this.state.base, 0)) {
          this.audio.playFuseRush();
        }
      } else if (input.fuseAction === 'detonate') {
        const pos = detonateBomb(this.state.base, 0);
        if (pos) {
          // Stop fuse sound for detonated bomb
          const bomb = this.state.base.bombs.find(b => 
            b.gridPos.col === pos.col && b.gridPos.row === pos.row
          );
          if (bomb) {
            this.audio.stopFuseTick(bomb.id);
          }
          
          this.audio.playFuseDetonate();
          spawnExplosion(this.state.base, pos, player.bombRange);
          this.audio.playExplosion(player.bombRange, { x: pos.col, y: pos.row });
        }
      }
    }

    // Update fuse ticking sounds
    this.updateFuseSounds();

    // Tick bombs
    const detonated = tickBombs(this.state.base, dt);
    for (const pos of detonated) {
      const range = this.state.base.players[0]?.bombRange ?? 2;
      spawnExplosion(this.state.base, pos, range);
      this.audio.playExplosion(range, { x: pos.col, y: pos.row });
    }

    // Tick explosions
    tickExplosions(this.state.base, dt);

    // Collect power-ups
    const powerUpsBefore = this.state.base.powerUps.length;
    collectPowerUps(this.state.base);
    if (this.state.base.powerUps.length < powerUpsBefore) {
      this.audio.playPowerUpCollect();
      this.sessionPowerUpsCollected++;
      settingsManager.incrementPowerUpsCollected();
      settingsManager.vibrate(50);
    }

    // Check win/lose conditions
    this.checkGameEndConditions();
    
    // Update previous bomb states
    this.previousBombs.clear();
    for (const bomb of this.state.base.bombs) {
      this.previousBombs.set(bomb.id, { ...bomb });
    }
  }
  
  /**
   * Update fuse ticking sounds for all active bombs
   */
  private updateFuseSounds(): void {
    for (const bomb of this.state.base.bombs) {
      this.audio.updateFuseTick(
        bomb.id,
        bomb.fuseRemaining,
        bomb.primed,
        bomb.rushed
      );
    }
    
    // Stop fuse sounds for detonated bombs
    for (const [bombId, prevBomb] of this.previousBombs) {
      const stillExists = this.state.base.bombs.find(b => b.id === bombId);
      if (!stillExists) {
        this.audio.stopFuseTick(bombId);
      }
    }
  }

  private checkGameEndConditions(): void {
    const player = this.state.base.players[0];
    
    // Check defeat - player died
    if (!player?.alive) {
      this.handleDefeat();
      return;
    }
    
    // Check victory - all enemies defeated
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
    
    // Update stats
    settingsManager.recordWin(this.state.currentLevel, levelTime);
    
    // Play victory sounds
    this.audio.stopAllFuseTicks();
    this.audio.playVictory();
    
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
    
    // Play defeat sounds
    this.audio.stopAllFuseTicks();
    this.audio.playPlayerDeath();
    setTimeout(() => this.audio.playDefeat(), 500);
    
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
      this.fpsEl.style.display = 'block';
    } else {
      this.fpsEl.style.display = 'none';
    }
  }

  private applySettings(): void {
    const settings = settingsManager.getSettings();
    
    // Apply audio settings
    this.audio.setVolume(AudioCategory.MUSIC, settings.musicVolume);
    this.audio.setVolume(AudioCategory.SFX, settings.sfxVolume);
    this.audio.setVolume(AudioCategory.UI, settings.uiVolume);
    
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
  
  /**
   * Get audio manager for external control
   */
  getAudio(): AudioManager {
    return this.audio;
  }
}
