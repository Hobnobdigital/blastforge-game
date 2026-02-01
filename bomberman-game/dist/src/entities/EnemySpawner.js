import { Enemy } from './Enemy';
export class EnemySpawner {
    grid;
    scene;
    enemies = [];
    spawnQueue = [];
    spawnTimer = 0;
    spawnInterval = 1.0; // Delay between spawns
    powerUpDrops = [];
    constructor(grid, scene) {
        this.grid = grid;
        this.scene = scene;
    }
    /**
     * Spawn enemies at predefined positions
     */
    spawnEnemiesAtPositions(positions, baseSpeed) {
        for (const pos of positions) {
            this.spawnQueue.push({
                type: pos.type,
                gridX: pos.x,
                gridY: pos.y,
                speed: baseSpeed,
            });
        }
    }
    /**
     * Spawn a single enemy immediately
     */
    spawnEnemy(config) {
        // Validate spawn position
        const cell = this.grid.getCell(config.gridX, config.gridY);
        if (!cell || !cell.isWalkable()) {
            console.warn(`Cannot spawn enemy at (${config.gridX}, ${config.gridY}): cell not walkable`);
            return null;
        }
        // Check if position is occupied by another enemy
        if (this.isPositionOccupied(config.gridX, config.gridY)) {
            console.warn(`Cannot spawn enemy at (${config.gridX}, ${config.gridY}): position occupied`);
            return null;
        }
        const enemy = new Enemy(config, this.grid);
        this.enemies.push(enemy);
        this.scene.add(enemy.mesh);
        console.log(`Spawned ${config.type} enemy at (${config.gridX}, ${config.gridY})`);
        return enemy;
    }
    /**
     * Spawn enemies randomly throughout the map
     */
    spawnRandomEnemies(count, types, baseSpeed) {
        const validPositions = [];
        // Find all valid spawn positions (avoid spawn areas and walls)
        for (let y = 2; y < this.grid.HEIGHT - 2; y++) {
            for (let x = 2; x < this.grid.WIDTH - 2; x++) {
                const cell = this.grid.getCell(x, y);
                if (cell && cell.isWalkable() && !this.isNearPlayerSpawn(x, y)) {
                    validPositions.push({ x, y });
                }
            }
        }
        // Shuffle positions
        for (let i = validPositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [validPositions[i], validPositions[j]] = [validPositions[j], validPositions[i]];
        }
        // Spawn enemies
        for (let i = 0; i < Math.min(count, validPositions.length); i++) {
            const pos = validPositions[i];
            const type = types[Math.floor(Math.random() * types.length)];
            this.spawnQueue.push({
                type,
                gridX: pos.x,
                gridY: pos.y,
                speed: baseSpeed,
            });
        }
    }
    /**
     * Check if position is near player spawn points
     */
    isNearPlayerSpawn(x, y) {
        const spawnPoints = [
            { x: 1, y: 1 },
            { x: this.grid.WIDTH - 2, y: 1 },
            { x: 1, y: this.grid.HEIGHT - 2 },
            { x: this.grid.WIDTH - 2, y: this.grid.HEIGHT - 2 },
        ];
        for (const spawn of spawnPoints) {
            const dist = Math.abs(x - spawn.x) + Math.abs(y - spawn.y);
            if (dist <= 3)
                return true;
        }
        return false;
    }
    /**
     * Check if grid position is occupied by an enemy
     */
    isPositionOccupied(gridX, gridY) {
        return this.enemies.some(e => e.alive && e.gridX === gridX && e.gridY === gridY);
    }
    /**
     * Update all enemies and handle spawning
     */
    update(dt, playerGridX, playerGridY, bombPositions) {
        // Process spawn queue
        if (this.spawnQueue.length > 0) {
            this.spawnTimer -= dt;
            if (this.spawnTimer <= 0) {
                const config = this.spawnQueue.shift();
                this.spawnEnemy(config);
                this.spawnTimer = this.spawnInterval;
            }
        }
        // Update all enemies
        for (const enemy of this.enemies) {
            if (enemy.alive) {
                enemy.update(dt, this.grid, playerGridX, playerGridY, bombPositions);
            }
        }
        // Check for dead enemies and handle power-up drops
        this.processDeaths();
    }
    /**
     * Process enemy deaths and spawn power-ups
     */
    processDeaths() {
        for (const enemy of this.enemies) {
            if (!enemy.alive && enemy.mesh.visible) {
                // Enemy just died
                enemy.die();
                // Check for power-up drop
                const drop = enemy.getDropPowerUp();
                if (drop) {
                    this.powerUpDrops.push({
                        x: enemy.gridX,
                        y: enemy.gridY,
                        type: drop,
                    });
                }
                // Remove mesh from scene
                this.scene.remove(enemy.mesh);
            }
        }
    }
    /**
     * Check if any enemy is at the given grid position (for explosions)
     */
    checkExplosionHit(gridX, gridY) {
        let hit = false;
        for (const enemy of this.enemies) {
            if (enemy.alive && enemy.gridX === gridX && enemy.gridY === gridY) {
                enemy.takeDamage();
                hit = true;
            }
        }
        return hit;
    }
    /**
     * Get all enemies for rendering/collision
     */
    getEnemies() {
        return this.enemies.filter(e => e.alive);
    }
    /**
     * Get number of alive enemies
     */
    getAliveCount() {
        return this.enemies.filter(e => e.alive).length;
    }
    /**
     * Get and clear power-up drops
     */
    consumePowerUpDrops() {
        const drops = [...this.powerUpDrops];
        this.powerUpDrops = [];
        return drops;
    }
    /**
     * Reset all enemies
     */
    reset() {
        // Remove all enemy meshes
        for (const enemy of this.enemies) {
            this.scene.remove(enemy.mesh);
        }
        this.enemies = [];
        this.spawnQueue = [];
        this.powerUpDrops = [];
        this.spawnTimer = 0;
    }
    /**
     * Check if all enemies are defeated
     */
    areAllDefeated() {
        return this.enemies.length > 0 && this.enemies.every(e => !e.alive);
    }
}
//# sourceMappingURL=EnemySpawner.js.map