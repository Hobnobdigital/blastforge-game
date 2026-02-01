import { Direction } from '@core/types';
export function createPlayerState(id, spawnCol, spawnRow) {
    return {
        id,
        gridPos: { col: spawnCol, row: spawnRow },
        worldPos: { x: spawnCol, y: spawnRow },
        moveDir: Direction.None,
        speed: 3.5,
        bombRange: 2,
        maxBombs: 1,
        activeBombs: 0,
        fuseCharges: 3,
        alive: true,
    };
}
export const SPAWN_POSITIONS = [
    { col: 1, row: 1 },
    { col: 14, row: 14 },
    { col: 1, row: 14 },
    { col: 14, row: 1 },
];
//# sourceMappingURL=Player.js.map