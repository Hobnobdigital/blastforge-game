// ── Extended Core types for BLASTFORGE Game Loop System ──
// Re-export everything from base types
export * from './types';
// ── Game States ──
export var GamePhase;
(function (GamePhase) {
    GamePhase["MENU"] = "menu";
    GamePhase["PLAYING"] = "playing";
    GamePhase["PAUSED"] = "paused";
    GamePhase["VICTORY"] = "victory";
    GamePhase["DEFEAT"] = "defeat";
    GamePhase["LEVEL_TRANSITION"] = "level_transition";
})(GamePhase || (GamePhase = {}));
// ── Menu Types ──
export var MenuScreen;
(function (MenuScreen) {
    MenuScreen["MAIN"] = "main";
    MenuScreen["SETTINGS"] = "settings";
    MenuScreen["HOW_TO_PLAY"] = "how_to_play";
    MenuScreen["STATS"] = "stats";
    MenuScreen["LEVEL_SELECT"] = "level_select";
})(MenuScreen || (MenuScreen = {}));
// ── Level Types ──
export var LevelTheme;
(function (LevelTheme) {
    LevelTheme["CLASSIC"] = "classic";
    LevelTheme["ICE"] = "ice";
    LevelTheme["VOLCANO"] = "volcano";
    LevelTheme["FOREST"] = "forest";
    LevelTheme["DESERT"] = "desert";
    LevelTheme["SPACE"] = "space";
})(LevelTheme || (LevelTheme = {}));
export const LEVELS = [
    { id: 1, name: 'Training Grounds', theme: LevelTheme.CLASSIC, description: 'Learn the basics', softBlockDensity: 0.4, enemyCount: 0 },
    { id: 2, name: 'Ice Caverns', theme: LevelTheme.ICE, description: 'Slippery surfaces', softBlockDensity: 0.45, enemyCount: 2 },
    { id: 3, name: 'Volcano Core', theme: LevelTheme.VOLCANO, description: 'Watch your step', softBlockDensity: 0.5, enemyCount: 3 },
    { id: 4, name: 'Enchanted Forest', theme: LevelTheme.FOREST, description: 'Nature\'s maze', softBlockDensity: 0.55, enemyCount: 4 },
    { id: 5, name: 'Desert Ruins', theme: LevelTheme.DESERT, description: 'Ancient dangers', softBlockDensity: 0.5, enemyCount: 5 },
    { id: 6, name: 'Space Station', theme: LevelTheme.SPACE, description: 'Zero gravity chaos', softBlockDensity: 0.6, enemyCount: 6 },
];
export const DEFAULT_SETTINGS = {
    musicVolume: 0.7,
    sfxVolume: 1.0,
    uiVolume: 0.8,
    fullscreen: false,
    showFPS: true,
    vibration: true,
};
export const DEFAULT_STATS = {
    totalWins: 0,
    totalLosses: 0,
    totalPlayTime: 0,
    levelsCompleted: [],
    bestTimes: {},
    bombsPlaced: 0,
    powerUpsCollected: 0,
    enemiesDefeated: 0,
    gamesStarted: 0,
};
// ── Enemy Types ──
export var EnemyType;
(function (EnemyType) {
    EnemyType["BASIC"] = "basic";
    EnemyType["FAST"] = "fast";
    EnemyType["SMART"] = "smart";
    EnemyType["TANK"] = "tank";
})(EnemyType || (EnemyType = {}));
//# sourceMappingURL=ExtendedTypes.js.map