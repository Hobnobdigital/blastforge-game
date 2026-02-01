import { TileType, GRID_SIZE, Direction } from '@core/types';
export function isWalkable(grid, pos) {
    if (pos.col < 0 || pos.col >= GRID_SIZE || pos.row < 0 || pos.row >= GRID_SIZE)
        return false;
    return grid[pos.row][pos.col] === TileType.Floor;
}
export function gridToWorld(pos) {
    return { x: pos.col, y: pos.row };
}
export function worldToGrid(pos) {
    return { col: Math.round(pos.x), row: Math.round(pos.y) };
}
export function directionToVec(dir) {
    switch (dir) {
        case Direction.Up: return { x: 0, y: -1 };
        case Direction.Down: return { x: 0, y: 1 };
        case Direction.Left: return { x: -1, y: 0 };
        case Direction.Right: return { x: 1, y: 0 };
        default: return { x: 0, y: 0 };
    }
}
export function neighborPos(pos, dir) {
    const v = directionToVec(dir);
    return { col: pos.col + v.x, row: pos.row + v.y };
}
export function movePlayer(state, playerId, dt) {
    const player = state.players[playerId];
    if (!player || !player.alive || player.moveDir === Direction.None)
        return;
    const vel = directionToVec(player.moveDir);
    const nx = player.worldPos.x + vel.x * player.speed * dt;
    const ny = player.worldPos.y + vel.y * player.speed * dt;
    // Snap to grid for collision check
    const targetGrid = worldToGrid({ x: nx, y: ny });
    if (isWalkable(state.grid, targetGrid) && !hasBombAt(state, targetGrid, player.id)) {
        player.worldPos.x = nx;
        player.worldPos.y = ny;
        player.gridPos = worldToGrid(player.worldPos);
    }
}
function hasBombAt(state, pos, _ignoreOwnerId) {
    return state.bombs.some(b => b.gridPos.col === pos.col && b.gridPos.row === pos.row);
}
//# sourceMappingURL=GridSystem.js.map