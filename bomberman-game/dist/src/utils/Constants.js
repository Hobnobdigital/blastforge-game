import * as THREE from 'three';
export const GRID_WIDTH = 13;
export const GRID_HEIGHT = 13;
export const CELL_SIZE = 1;
export const BOMB_FUSE_TIME = 3.0;
export const DEFAULT_EXPLOSION_RANGE = 2;
export const DEFAULT_PLAYER_SPEED = 4;
export const DEFAULT_BOMB_COUNT = 1;
export const POWERUP_DROP_CHANCE = 0.2;
export const LEVEL_THEMES = {
    grasslands: {
        background: new THREE.Color(0x87CEEB),
        ambient: new THREE.Color(0xFFFFDD),
        floor: 0x4CAF50,
        floorAlt: 0x43A047,
        walls: 0xD2691E,
        indestructible: 0x616161,
    },
    cave: {
        background: new THREE.Color(0x1a0a2e),
        ambient: new THREE.Color(0xCCAA88),
        floor: 0x5D4037,
        floorAlt: 0x4E342E,
        walls: 0x8D6E63,
        indestructible: 0x37474F,
    },
    lava: {
        background: new THREE.Color(0x1a0000),
        ambient: new THREE.Color(0xFF6B35),
        floor: 0x8B0000,
        floorAlt: 0x7B0000,
        walls: 0x2F2F2F,
        indestructible: 0x212121,
    },
    ice: {
        background: new THREE.Color(0xE0F7FA),
        ambient: new THREE.Color(0xB3E5FC),
        floor: 0x81D4FA,
        floorAlt: 0x4FC3F7,
        walls: 0xB0BEC5,
        indestructible: 0x78909C,
    },
    space: {
        background: new THREE.Color(0x0a0020),
        ambient: new THREE.Color(0x7C4DFF),
        floor: 0x1A237E,
        floorAlt: 0x0D47A1,
        walls: 0x4A148C,
        indestructible: 0x311B92,
    },
};
export const LEVELS = [
    { number: 1, theme: 'grasslands', enemyCount: 3, enemyTypes: ['balloon'], enemySpeed: 1.5, musicTrack: 'level-gameplay' },
    { number: 2, theme: 'grasslands', enemyCount: 4, enemyTypes: ['balloon', 'ghost'], enemySpeed: 1.8, musicTrack: 'level-gameplay' },
    { number: 3, theme: 'cave', enemyCount: 5, enemyTypes: ['ghost', 'balloon'], enemySpeed: 2.0, musicTrack: 'level-gameplay' },
    { number: 4, theme: 'cave', enemyCount: 6, enemyTypes: ['balloon', 'ghost', 'knight'], enemySpeed: 2.2, musicTrack: 'level-gameplay' },
    { number: 5, theme: 'lava', enemyCount: 7, enemyTypes: ['knight', 'ghost'], enemySpeed: 2.5, musicTrack: 'boss-level' },
    { number: 6, theme: 'lava', enemyCount: 8, enemyTypes: ['knight', 'knight', 'ghost'], enemySpeed: 2.7, musicTrack: 'level-gameplay' },
    { number: 7, theme: 'ice', enemyCount: 8, enemyTypes: ['ghost', 'knight'], enemySpeed: 3.0, musicTrack: 'level-gameplay' },
    { number: 8, theme: 'ice', enemyCount: 9, enemyTypes: ['knight', 'knight', 'ghost'], enemySpeed: 3.2, musicTrack: 'boss-level' },
    { number: 9, theme: 'space', enemyCount: 10, enemyTypes: ['knight', 'ghost', 'knight'], enemySpeed: 3.5, musicTrack: 'level-gameplay' },
    { number: 10, theme: 'space', enemyCount: 12, enemyTypes: ['knight', 'knight', 'knight'], enemySpeed: 4.0, musicTrack: 'boss-level' },
];
//# sourceMappingURL=Constants.js.map