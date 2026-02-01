import { DEFAULT_SETTINGS, DEFAULT_STATS } from './ExtendedTypes';
const SETTINGS_KEY = 'blastforge_settings';
const STATS_KEY = 'blastforge_stats';
export class SettingsManager {
    settings;
    stats;
    constructor() {
        this.settings = this.loadSettings();
        this.stats = this.loadStats();
    }
    // ── Settings ──
    loadSettings() {
        try {
            const stored = localStorage.getItem(SETTINGS_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...DEFAULT_SETTINGS, ...parsed };
            }
        }
        catch (e) {
            console.warn('Failed to load settings:', e);
        }
        return { ...DEFAULT_SETTINGS };
    }
    saveSettings() {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settings));
        }
        catch (e) {
            console.warn('Failed to save settings:', e);
        }
    }
    getSettings() {
        return { ...this.settings };
    }
    updateSettings(updates) {
        this.settings = { ...this.settings, ...updates };
        this.saveSettings();
    }
    setMusicVolume(value) {
        this.settings.musicVolume = Math.max(0, Math.min(1, value));
        this.saveSettings();
    }
    setSfxVolume(value) {
        this.settings.sfxVolume = Math.max(0, Math.min(1, value));
        this.saveSettings();
    }
    setUiVolume(value) {
        this.settings.uiVolume = Math.max(0, Math.min(1, value));
        this.saveSettings();
    }
    setFullscreen(value) {
        this.settings.fullscreen = value;
        this.saveSettings();
        if (value) {
            document.documentElement.requestFullscreen?.().catch(() => { });
        }
        else {
            document.exitFullscreen?.().catch(() => { });
        }
    }
    setShowFPS(value) {
        this.settings.showFPS = value;
        this.saveSettings();
    }
    setVibration(value) {
        this.settings.vibration = value;
        this.saveSettings();
    }
    // ── Stats ──
    loadStats() {
        try {
            const stored = localStorage.getItem(STATS_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...DEFAULT_STATS, ...parsed };
            }
        }
        catch (e) {
            console.warn('Failed to load stats:', e);
        }
        return { ...DEFAULT_STATS };
    }
    saveStats() {
        try {
            localStorage.setItem(STATS_KEY, JSON.stringify(this.stats));
        }
        catch (e) {
            console.warn('Failed to save stats:', e);
        }
    }
    getStats() {
        return { ...this.stats };
    }
    recordWin(levelId, timeSeconds) {
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
    recordLoss() {
        this.stats.totalLosses++;
        this.saveStats();
    }
    addPlayTime(seconds) {
        this.stats.totalPlayTime += seconds;
        this.saveStats();
    }
    incrementBombsPlaced() {
        this.stats.bombsPlaced++;
        this.saveStats();
    }
    incrementPowerUpsCollected() {
        this.stats.powerUpsCollected++;
        this.saveStats();
    }
    incrementEnemiesDefeated() {
        this.stats.enemiesDefeated++;
        this.saveStats();
    }
    incrementGamesStarted() {
        this.stats.gamesStarted++;
        this.saveStats();
    }
    resetStats() {
        this.stats = { ...DEFAULT_STATS };
        this.saveStats();
    }
    // ── Vibration ──
    vibrate(pattern) {
        if (this.settings.vibration && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    }
}
// Singleton instance
export const settingsManager = new SettingsManager();
//# sourceMappingURL=SettingsManager.js.map