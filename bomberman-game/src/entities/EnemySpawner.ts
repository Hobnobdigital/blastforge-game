import * as THREE from 'three';
import { Grid } from '../world/Grid';
import { Enemy, EnemyType, EnemyConfig } from './Enemy';
import { PowerUpType } from '../utils/Constants';

export interface SpawnPoint {
  x: number;
  y: number;
  type: EnemyType;
}

export class EnemySpawner {
  private grid: Grid;
  private scene: THREE.Scene;
  private enemies: Enemy[] = [];
  private spawnQueue: EnemyConfig[] = [];
  private spawnTimer: number = 0;
  private spawnInterval: number = 1.0; // Delay between spawns
  private powerUpDrops: Array<{x: number, y: number, type: PowerUpType}> = [];

  constructor(grid: Grid, scene: THREE.Scene) {
    this.grid = grid;
    this.scene = scene;
  }

  /**
   * Spawn enemies at predefined positions
   */
  spawnEnemiesAtPositions(positions: SpawnPoint[], baseSpeed: number): void {
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
  spawnEnemy(config: EnemyConfig): Enemy | null {
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
  spawnRandomEnemies(count: number, types: EnemyType[], baseSpeed: number): void {
    const validPositions: Array<{x: number, y: number}> = [];
    
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
  private isNearPlayerSpawn(x: number, y: number): boolean {
    const spawnPoints = [
      { x: 1, y: 1 },
      { x: this.grid.WIDTH - 2, y: 1 },
      { x: 1, y: this.grid.HEIGHT - 2 },
      { x: this.grid.WIDTH - 2, y: this.grid.HEIGHT - 2 },
    ];

    for (const spawn of spawnPoints) {
      const dist = Math.abs(x - spawn.x) + Math.abs(y - spawn.y);
      if (dist <= 3) return true;
    }
    return false;
  }

  /**
   * Check if grid position is occupied by an enemy
   */
  isPositionOccupied(gridX: number, gridY: number): boolean {
    return this.enemies.some(e => 
      e.alive && e.gridX === gridX && e.gridY === gridY
    );
  }

  /**
   * Update all enemies and handle spawning
   */
  update(dt: number, playerGridX: number, playerGridY: number, bombPositions: Array<{x: number, y: number}>): void {
    // Process spawn queue
    if (this.spawnQueue.length > 0) {
      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0) {
        const config = this.spawnQueue.shift()!;
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
  private processDeaths(): void {
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
  checkExplosionHit(gridX: number, gridY: number): boolean {
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
  getEnemies(): Enemy[] {
    return this.enemies.filter(e => e.alive);
  }

  /**
   * Get number of alive enemies
   */
  getAliveCount(): number {
    return this.enemies.filter(e => e.alive).length;
  }

  /**
   * Get and clear power-up drops
   */
  consumePowerUpDrops(): Array<{x: number, y: number, type: PowerUpType}> {
    const drops = [...this.powerUpDrops];
    this.powerUpDrops = [];
    return drops;
  }

  /**
   * Reset all enemies
   */
  reset(): void {
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
  areAllDefeated(): boolean {
    return this.enemies.length > 0 && this.enemies.every(e => !e.alive);
  }
}
