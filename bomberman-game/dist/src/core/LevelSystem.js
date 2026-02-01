import { LEVELS, LevelTheme, TileType, GRID_SIZE, Direction, EnemyType, } from './ExtendedTypes';
import { createInitialState as createBaseState } from './StateManager';
export class LevelSystem {
    currentLevelIndex = 0;
    getCurrentLevel() {
        return LEVELS[this.currentLevelIndex] ?? LEVELS[0];
    }
    getAllLevels() {
        return [...LEVELS];
    }
    setLevel(index) {
        this.currentLevelIndex = Math.max(0, Math.min(LEVELS.length - 1, index));
    }
    canProgressToLevel(levelId, completedLevels) {
        // Level 1 is always available
        if (levelId === 1)
            return true;
        // Must have completed previous level
        return completedLevels.includes(levelId - 1);
    }
    getNextLevel() {
        const next = LEVELS[this.currentLevelIndex + 1];
        return next ?? null;
    }
    progressToNext() {
        if (this.currentLevelIndex < LEVELS.length - 1) {
            this.currentLevelIndex++;
            return true;
        }
        return false;
    }
    createLevelState(levelConfig) {
        const base = createBaseState();
        // Customize grid based on level theme and density
        this.applyLevelTheme(base, levelConfig);
        // Add enemies
        this.spawnEnemies(base, levelConfig);
        return base;
    }
    applyLevelTheme(base, config) {
        // Reset soft blocks with level-specific density
        const spawnSafe = new Set([
            '1,1', '1,2', '2,1',
            `${GRID_SIZE - 2},${GRID_SIZE - 2}`, `${GRID_SIZE - 2},${GRID_SIZE - 3}`, `${GRID_SIZE - 3},${GRID_SIZE - 2}`,
            `1,${GRID_SIZE - 2}`, `1,${GRID_SIZE - 3}`, `2,${GRID_SIZE - 2}`,
            `${GRID_SIZE - 2},1`, `${GRID_SIZE - 3},1`, `${GRID_SIZE - 2},2`,
        ]);
        for (let row = 1; row < GRID_SIZE - 1; row++) {
            for (let col = 1; col < GRID_SIZE - 1; col++) {
                if (base.grid[row][col] === TileType.SoftBlock) {
                    base.grid[row][col] = TileType.Floor;
                }
                if (base.grid[row][col] === TileType.Floor && !spawnSafe.has(`${col},${row}`)) {
                    if (Math.random() < config.softBlockDensity) {
                        base.grid[row][col] = TileType.SoftBlock;
                    }
                }
            }
        }
        // Apply theme-specific modifications
        switch (config.theme) {
            case LevelTheme.ICE:
                // Ice levels have fewer soft blocks but more open space
                break;
            case LevelTheme.VOLCANO:
                // Add some "lava" hazards (implemented as special tiles)
                break;
            case LevelTheme.FOREST:
                // More dense vegetation
                break;
        }
    }
    spawnEnemies(base, config) {
        const spawnPositions = [
            { col: GRID_SIZE - 2, row: GRID_SIZE - 2 },
            { col: 1, row: GRID_SIZE - 2 },
            { col: GRID_SIZE - 2, row: 1 },
            { col: 7, row: 7 },
            { col: 8, row: 8 },
            { col: 7, row: 8 },
        ];
        for (let i = 0; i < config.enemyCount && i < spawnPositions.length; i++) {
            const pos = spawnPositions[i];
            // Clear the spawn position
            base.grid[pos.row][pos.col] = TileType.Floor;
            // Create enemy (stored in a custom property we'll add)
            const enemy = createEnemyState(i, pos.col, pos.row, this.getEnemyTypeForLevel(config.id));
            base.enemies = base.enemies || [];
            base.enemies.push(enemy);
        }
    }
    getEnemyTypeForLevel(levelId) {
        if (levelId >= 5)
            return EnemyType.SMART;
        if (levelId >= 3)
            return EnemyType.FAST;
        return EnemyType.BASIC;
    }
    getThemeColors(theme) {
        switch (theme) {
            case LevelTheme.ICE:
                return { background: 0x0a1a2a, floor: 0x2a4a6a, accent: 0x88ccff };
            case LevelTheme.VOLCANO:
                return { background: 0x1a0a0a, floor: 0x4a2a2a, accent: 0xff6644 };
            case LevelTheme.FOREST:
                return { background: 0x0a1a0a, floor: 0x2a4a2a, accent: 0x66ff88 };
            case LevelTheme.DESERT:
                return { background: 0x1a1a0a, floor: 0x6a5a3a, accent: 0xffcc66 };
            case LevelTheme.SPACE:
                return { background: 0x050510, floor: 0x2a2a4a, accent: 0xaa88ff };
            case LevelTheme.CLASSIC:
            default:
                return { background: 0x0a0a0a, floor: 0x2a2a2a, accent: 0x00aaff };
        }
    }
}
function createEnemyState(id, col, row, type) {
    const speedMap = {
        [EnemyType.BASIC]: 2.0,
        [EnemyType.FAST]: 3.5,
        [EnemyType.SMART]: 2.5,
        [EnemyType.TANK]: 1.5,
    };
    return {
        id,
        gridPos: { col, row },
        worldPos: { x: col, y: row },
        moveDir: Direction.None,
        speed: speedMap[type],
        alive: true,
        type,
        aiState: 'wander',
    };
}
// Singleton instance
export const levelSystem = new LevelSystem();
//# sourceMappingURL=LevelSystem.js.map