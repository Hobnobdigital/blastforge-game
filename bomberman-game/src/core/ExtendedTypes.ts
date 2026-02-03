// ── Extended Core types for BLASTFORGE Game Loop System ──

// Re-export everything from base types first
export * from './types';

import { 
  GameState as BaseGameState, 
  GridPos,
  Vec2 
} from './types';

// ── Game States ──
export enum GamePhase {
  MENU = 'menu',
  PLAYING = 'playing',
  PAUSED = 'paused',
  VICTORY = 'victory',
  DEFEAT = 'defeat',
  LEVEL_TRANSITION = 'level_transition',
}

// ── Menu Types ──
export enum MenuScreen {
  MAIN = 'main',
  SETTINGS = 'settings',
  HOW_TO_PLAY = 'how_to_play',
  STATS = 'stats',
  LEVEL_SELECT = 'level_select',
}

export interface MenuState {
  currentScreen: MenuScreen;
  selectedLevel: number;
}

// ── Level Types ──
export enum LevelTheme {
  CLASSIC = 'classic',
  ICE = 'ice',
  VOLCANO = 'volcano',
  FOREST = 'forest',
  DESERT = 'desert',
  SPACE = 'space',
  MIAMI_BEACH = 'miami_beach',
  LAHO_VIDEO = 'laho_video', // Special video background level
}

export interface LevelConfig {
  id: number;
  name: string;
  theme: LevelTheme;
  description: string;
  softBlockDensity: number;
  enemyCount: number;
  timeLimit?: number; // seconds, undefined = no limit
  videoBackground?: string; // Path to video file for video background levels
  useVideoAudio?: boolean; // If true, use video audio instead of background music
}

export const LEVELS: LevelConfig[] = [
  { id: 1, name: 'Laho II', theme: LevelTheme.LAHO_VIDEO, description: 'Flying carpet vibes', softBlockDensity: 0.4, enemyCount: 2, videoBackground: '/video/laho-ii-music-video.mp4', useVideoAudio: true },
  { id: 2, name: 'Training Grounds', theme: LevelTheme.CLASSIC, description: 'Learn the basics', softBlockDensity: 0.4, enemyCount: 1 },
  { id: 3, name: 'Ice Caverns', theme: LevelTheme.ICE, description: 'Slippery surfaces', softBlockDensity: 0.45, enemyCount: 3 },
  { id: 4, name: 'Volcano Core', theme: LevelTheme.VOLCANO, description: 'Watch your step', softBlockDensity: 0.5, enemyCount: 4 },
  { id: 5, name: 'Enchanted Forest', theme: LevelTheme.FOREST, description: 'Nature\'s maze', softBlockDensity: 0.55, enemyCount: 5 },
  { id: 6, name: 'Desert Ruins', theme: LevelTheme.DESERT, description: 'Ancient dangers', softBlockDensity: 0.5, enemyCount: 6 },
  { id: 7, name: 'Space Station', theme: LevelTheme.SPACE, description: 'Zero gravity chaos', softBlockDensity: 0.6, enemyCount: 7 },
  { id: 8, name: 'Miami Beach', theme: LevelTheme.MIAMI_BEACH, description: 'Sunset vibes and neon lights', softBlockDensity: 0.5, enemyCount: 6 },
];

// ── Settings Types ──
export interface GameSettings {
  musicVolume: number;
  sfxVolume: number;
  uiVolume: number;
  fullscreen: boolean;
  showFPS: boolean;
  vibration: boolean;
}

export const DEFAULT_SETTINGS: GameSettings = {
  musicVolume: 0.7,
  sfxVolume: 1.0,
  uiVolume: 0.8,
  fullscreen: false,
  showFPS: true,
  vibration: true,
};

// ── Stats Types ──
export interface GameStats {
  totalWins: number;
  totalLosses: number;
  totalPlayTime: number; // seconds
  levelsCompleted: number[];
  bestTimes: Record<number, number>; // levelId -> best time in seconds
  bombsPlaced: number;
  powerUpsCollected: number;
  enemiesDefeated: number;
  gamesStarted: number;
}

export const DEFAULT_STATS: GameStats = {
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

// ── Extended Game State ──
export interface ExtendedGameState {
  // Base game state
  base: BaseGameState;
  
  // Game flow
  phase: GamePhase;
  currentLevel: number;
  levelStartTime: number;
  totalPauseTime: number;
  pausedAt: number | null;
  
  // Session stats
  session: {
    bombsPlaced: number;
    powerUpsCollected: number;
    enemiesDefeated: number;
    startTime: number;
  };
  
  // Settings (loaded from storage)
  settings: GameSettings;
  
  // Persistent stats (loaded from storage)
  stats: GameStats;
}

// ── Enemy Types ──
export enum EnemyType {
  BASIC = 'basic',
  FAST = 'fast',
  SMART = 'smart',
  TANK = 'tank',
}

export interface EnemyState {
  id: number;
  gridPos: GridPos;
  worldPos: Vec2;
  moveDir: import('./types').Direction;
  speed: number;
  alive: boolean;
  type: EnemyType;
  aiState: 'idle' | 'chase' | 'flee' | 'wander';
}

// ── Input extensions ──
export interface ExtendedInputState {
  moveDir: import('./types').Direction;
  placeBomb: boolean;
  fuseAction: 'prime' | 'rush' | 'detonate' | null;
  pause: boolean;
  menuBack: boolean;
  menuSelect: boolean;
  menuUp: boolean;
  menuDown: boolean;
  menuLeft: boolean;
  menuRight: boolean;
}
