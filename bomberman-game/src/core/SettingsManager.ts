import { GameSettings, DEFAULT_SETTINGS, GameStats, DEFAULT_STATS } from './ExtendedTypes';

const SETTINGS_KEY = 'blastforge_settings';
const STATS_KEY = 'blastforge_stats';

export class SettingsManager {
  private settings: GameSettings;
  private stats: GameStats;

  constructor() {
    this.settings = this.loadSettings();
    this.stats = this.loadStats();
  }

  // ── Settings ──
  private loadSettings(): GameSettings {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load settings:', e);
    }
    return { ...DEFAULT_SETTINGS };
  }

  private saveSettings(): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settings));
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
  }

  getSettings(): GameSettings {
    return { ...this.settings };
  }

  updateSettings(updates: Partial<GameSettings>): void {
    this.settings = { ...this.settings, ...updates };
    this.saveSettings();
  }

  setMusicVolume(value: number): void {
    this.settings.musicVolume = Math.max(0, Math.min(1, value));
    this.saveSettings();
  }

  setSfxVolume(value: number): void {
    this.settings.sfxVolume = Math.max(0, Math.min(1, value));
    this.saveSettings();
  }

  setUiVolume(value: number): void {
    this.settings.uiVolume = Math.max(0, Math.min(1, value));
    this.saveSettings();
  }

  setFullscreen(value: boolean): void {
    this.settings.fullscreen = value;
    this.saveSettings();
    if (value) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  setShowFPS(value: boolean): void {
    this.settings.showFPS = value;
    this.saveSettings();
  }

  setVibration(value: boolean): void {
    this.settings.vibration = value;
    this.saveSettings();
  }

  // ── Stats ──
  private loadStats(): GameStats {
    try {
      const stored = localStorage.getItem(STATS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_STATS, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load stats:', e);
    }
    return { ...DEFAULT_STATS };
  }

  private saveStats(): void {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(this.stats));
    } catch (e) {
      console.warn('Failed to save stats:', e);
    }
  }

  getStats(): GameStats {
    return { ...this.stats };
  }

  recordWin(levelId: number, timeSeconds: number): void {
    this.stats.totalWins++;
    if (!this.stats.levelsCompleted.includes(levelId)) {
      this.stats.levelsCompleted.push(levelId);
    }
    // Track best time
    const currentBest = this.stats.bestTimes[levelId];
    if (!currentBest || timeSeconds < currentBest) {
      this.stats.bestTimes[levelId] = timeSeconds;
    }
    this.saveStats();
  }

  recordLoss(): void {
    this.stats.totalLosses++;
    this.saveStats();
  }

  addPlayTime(seconds: number): void {
    this.stats.totalPlayTime += seconds;
    this.saveStats();
  }

  incrementBombsPlaced(): void {
    this.stats.bombsPlaced++;
    this.saveStats();
  }

  incrementPowerUpsCollected(): void {
    this.stats.powerUpsCollected++;
    this.saveStats();
  }

  incrementEnemiesDefeated(): void {
    this.stats.enemiesDefeated++;
    this.saveStats();
  }

  incrementGamesStarted(): void {
    this.stats.gamesStarted++;
    this.saveStats();
  }

  resetStats(): void {
    this.stats = { ...DEFAULT_STATS };
    this.saveStats();
  }

  // ── Vibration ──
  vibrate(pattern: number | number[]): void {
    if (this.settings.vibration && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }
}

// Singleton instance
export const settingsManager = new SettingsManager();
