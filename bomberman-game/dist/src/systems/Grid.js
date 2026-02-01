import * as THREE from 'three';
import { Cell } from './Cell';
import { GRID_WIDTH, GRID_HEIGHT, CELL_SIZE, LEVEL_THEMES, POWERUP_DROP_CHANCE } from '../utils/Constants';
const _boxGeo = new THREE.BoxGeometry(CELL_SIZE, CELL_SIZE, CELL_SIZE);
const _floorGeo = new THREE.BoxGeometry(CELL_SIZE, 0.1, CELL_SIZE);
const _powerUpGeo = new THREE.SphereGeometry(0.25, 8, 8);
const POWERUP_COLORS = {
    bomb: 0xFF4081,
    fire: 0xFF9800,
    speed: 0x00E676,
};
export class Grid {
    WIDTH = GRID_WIDTH;
    HEIGHT = GRID_HEIGHT;
    cells = [];
    group = new THREE.Group();
    theme = LEVEL_THEMES.grasslands;
    constructor() {
        this.buildCells();
    }
    buildCells() {
        for (let y = 0; y < this.HEIGHT; y++) {
            this.cells[y] = [];
            for (let x = 0; x < this.WIDTH; x++) {
                const isEdge = x === 0 || y === 0 || x === this.WIDTH - 1 || y === this.HEIGHT - 1;
                const isFixedWall = !isEdge && x % 2 === 0 && y % 2 === 0;
                this.cells[y][x] = new Cell({
                    x, y,
                    type: (isEdge || isFixedWall) ? 'indestructible' : 'floor',
                    hasDestructibleWall: !isEdge && !isFixedWall && Math.random() > 0.3,
                });
            }
        }
        this.clearSpawnArea(1, 1);
        this.clearSpawnArea(this.WIDTH - 2, 1);
        this.clearSpawnArea(1, this.HEIGHT - 2);
        this.clearSpawnArea(this.WIDTH - 2, this.HEIGHT - 2);
    }
    clearSpawnArea(cx, cy) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                const cell = this.getCell(cx + dx, cy + dy);
                if (cell && cell.type !== 'indestructible') {
                    cell.hasDestructibleWall = false;
                }
            }
        }
    }
    getCell(x, y) {
        if (x < 0 || x >= this.WIDTH || y < 0 || y >= this.HEIGHT)
            return null;
        return this.cells[y][x];
    }
    gridToWorld(gx, gy) {
        return {
            x: (gx - this.WIDTH / 2 + 0.5) * CELL_SIZE,
            z: (gy - this.HEIGHT / 2 + 0.5) * CELL_SIZE,
        };
    }
    worldToGrid(wx, wz) {
        return {
            x: Math.floor(wx / CELL_SIZE + this.WIDTH / 2),
            y: Math.floor(wz / CELL_SIZE + this.HEIGHT / 2),
        };
    }
    applyTheme(themeName) {
        this.theme = LEVEL_THEMES[themeName] || LEVEL_THEMES.grasslands;
        this.rebuildMeshes();
    }
    rebuildMeshes() {
        while (this.group.children.length) {
            const c = this.group.children[0];
            this.group.remove(c);
        }
        for (let y = 0; y < this.HEIGHT; y++) {
            for (let x = 0; x < this.WIDTH; x++) {
                const cell = this.cells[y][x];
                const pos = this.gridToWorld(x, y);
                // Floor
                const floorColor = (x + y) % 2 === 0 ? this.theme.floor : this.theme.floorAlt;
                const floorMat = new THREE.MeshStandardMaterial({ color: floorColor });
                const floor = new THREE.Mesh(_floorGeo, floorMat);
                floor.position.set(pos.x, -0.05, pos.z);
                floor.receiveShadow = true;
                this.group.add(floor);
                cell.floorMesh = floor;
                // Wall
                if (cell.type === 'indestructible') {
                    const mat = new THREE.MeshStandardMaterial({ color: this.theme.indestructible });
                    const wall = new THREE.Mesh(_boxGeo, mat);
                    wall.position.set(pos.x, 0.5, pos.z);
                    wall.castShadow = true;
                    wall.receiveShadow = true;
                    this.group.add(wall);
                    cell.wallMesh = wall;
                }
                else if (cell.hasDestructibleWall) {
                    const mat = new THREE.MeshStandardMaterial({ color: this.theme.walls });
                    const wall = new THREE.Mesh(_boxGeo, mat);
                    wall.position.set(pos.x, 0.5, pos.z);
                    wall.castShadow = true;
                    this.group.add(wall);
                    cell.wallMesh = wall;
                }
            }
        }
    }
    destroyWall(x, y) {
        const cell = this.getCell(x, y);
        if (!cell || !cell.hasDestructibleWall)
            return null;
        cell.hasDestructibleWall = false;
        if (cell.wallMesh) {
            this.group.remove(cell.wallMesh);
            cell.wallMesh = null;
        }
        if (Math.random() < POWERUP_DROP_CHANCE) {
            const types = ['bomb', 'fire', 'speed'];
            const pu = types[Math.floor(Math.random() * types.length)];
            cell.powerUp = pu;
            this.spawnPowerUpMesh(cell);
            return pu;
        }
        return null;
    }
    spawnPowerUpMesh(cell) {
        if (!cell.powerUp)
            return;
        const pos = this.gridToWorld(cell.x, cell.y);
        const mat = new THREE.MeshStandardMaterial({ color: POWERUP_COLORS[cell.powerUp], emissive: POWERUP_COLORS[cell.powerUp], emissiveIntensity: 0.5 });
        const mesh = new THREE.Mesh(_powerUpGeo, mat);
        mesh.position.set(pos.x, 0.3, pos.z);
        this.group.add(mesh);
        cell.powerUpMesh = mesh;
    }
    collectPowerUp(x, y) {
        const cell = this.getCell(x, y);
        if (!cell || !cell.powerUp)
            return null;
        const pu = cell.powerUp;
        cell.powerUp = null;
        if (cell.powerUpMesh) {
            this.group.remove(cell.powerUpMesh);
            cell.powerUpMesh = null;
        }
        return pu;
    }
    reset() {
        this.cells = [];
        this.buildCells();
    }
}
//# sourceMappingURL=Grid.js.map