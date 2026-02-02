import * as THREE from 'three';
import { Grid } from '../systems/Grid';
import { CELL_SIZE } from '../utils/Constants';
import type { PowerUpType } from '../utils/Constants';

export type EnemyType = 'balloon' | 'onion' | 'tiger';

export interface EnemyConfig {
  type: EnemyType;
  gridX: number;
  gridY: number;
  speed: number;
}

// Colors for different enemy types
const ENEMY_COLORS: Record<EnemyType, number> = {
  balloon: 0xFF6B6B,  // Red/pink
  onion: 0xFFA726,    // Orange
  tiger: 0xFFCA28,    // Golden yellow
};

// AI Difficulty settings
const AI_SETTINGS: Record<EnemyType, {
  speedMultiplier: number;
  changeDirTime: number;
  seesBombs: boolean;
  seeksPowerUps: boolean;
  pathfinds: boolean;
}> = {
  balloon: {
    speedMultiplier: 0.8,
    changeDirTime: 2.0,
    seesBombs: false,
    seeksPowerUps: false,
    pathfinds: false,
  },
  onion: {
    speedMultiplier: 1.2,
    changeDirTime: 1.5,
    seesBombs: false,
    seeksPowerUps: false,
    pathfinds: true,
  },
  tiger: {
    speedMultiplier: 1.5,
    changeDirTime: 1.0,
    seesBombs: true,
    seeksPowerUps: true,
    pathfinds: true,
  },
};

export class Enemy {
  type: EnemyType;
  gridX: number;
  gridY: number;
  worldX: number = 0;
  worldZ: number = 0;
  speed: number;
  alive: boolean = true;
  mesh: THREE.Group;
  
  // Movement
  private direction: { x: number; y: number } = { x: 0, y: 0 };
  private changeDirTimer: number = 0;
  private aiSettings: typeof AI_SETTINGS[EnemyType];
  
  // Visual
  private bodyMesh!: THREE.Mesh;
  private eyeLeft!: THREE.Mesh;
  private eyeRight!: THREE.Mesh;
  private animOffset: number = Math.random() * 100;

  constructor(config: EnemyConfig, grid: Grid) {
    this.type = config.type;
    this.gridX = config.gridX;
    this.gridY = config.gridY;
    this.aiSettings = AI_SETTINGS[config.type];
    this.speed = config.speed * this.aiSettings.speedMultiplier;
    
    const pos = grid.gridToWorld(this.gridX, this.gridY);
    this.worldX = pos.x;
    this.worldZ = pos.z;
    
    // Create mesh
    this.mesh = new THREE.Group();
    this.createVisuals();
    this.mesh.position.set(this.worldX, 0, this.worldZ);
    
    // Pick initial random direction
    this.pickNewDirection(grid);
  }
  
  private createVisuals(): void {
    const color = ENEMY_COLORS[this.type];
    
    // Body shape varies by type - scaled up 2x for visibility
    if (this.type === 'balloon') {
      // Balloon - round, bouncy
      const bodyGeo = new THREE.SphereGeometry(0.6, 16, 16);
      const bodyMat = new THREE.MeshStandardMaterial({ color });
      this.bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      this.bodyMesh.position.y = 0.7;
      this.bodyMesh.castShadow = true;
      this.mesh.add(this.bodyMesh);
      
      // String
      const stringGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.4);
      const stringMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const string = new THREE.Mesh(stringGeo, stringMat);
      string.position.y = 0.2;
      this.mesh.add(string);
    } else if (this.type === 'onion') {
      // Onion - layered, onion-like - scaled up 2x
      const bodyGeo = new THREE.ConeGeometry(0.6, 1.2, 16);
      const bodyMat = new THREE.MeshStandardMaterial({ color });
      this.bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      this.bodyMesh.position.y = 0.8;
      this.bodyMesh.castShadow = true;
      this.mesh.add(this.bodyMesh);
      
      // Layers detail
      const ringGeo = new THREE.TorusGeometry(0.5, 0.06, 8, 16);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.8;
      this.mesh.add(ring);
    } else {
      // Tiger - sleek, angular - scaled up 2x
      const bodyGeo = new THREE.BoxGeometry(0.8, 1.0, 1.2);
      const bodyMat = new THREE.MeshStandardMaterial({ color });
      this.bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      this.bodyMesh.position.y = 0.7;
      this.bodyMesh.castShadow = true;
      this.mesh.add(this.bodyMesh);
      
      // Stripes
      const stripeGeo = new THREE.BoxGeometry(0.84, 0.2, 0.8);
      const stripeMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
      const stripe = new THREE.Mesh(stripeGeo, stripeMat);
      stripe.position.y = 0.9;
      this.mesh.add(stripe);
    }
    
    // Eyes (common to all) - scaled up 2x
    const eyeGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const pupilGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const pupilMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
    
    this.eyeLeft = new THREE.Mesh(eyeGeo, eyeMat);
    this.eyeLeft.position.set(-0.2, 1.1, 0.4);
    this.mesh.add(this.eyeLeft);
    
    this.eyeRight = new THREE.Mesh(eyeGeo, eyeMat);
    this.eyeRight.position.set(0.2, 1.1, 0.4);
    this.mesh.add(this.eyeRight);
    
    const pupilLeft = new THREE.Mesh(pupilGeo, pupilMat);
    pupilLeft.position.z = 0.05;
    this.eyeLeft.add(pupilLeft);
    
    const pupilRight = new THREE.Mesh(pupilGeo, pupilMat);
    pupilRight.position.z = 0.05;
    this.eyeRight.add(pupilRight);
  }
  
  update(dt: number, grid: Grid, playerGridX: number, playerGridY: number, bombPositions: Array<{x: number, y: number}>): void {
    if (!this.alive) return;
    
    this.changeDirTimer -= dt;
    
    // Update animation
    this.animate(dt);
    
    // AI behavior based on type
    if (this.aiSettings.pathfinds && this.changeDirTimer <= 0) {
      if (this.type === 'tiger') {
        this.updateTigerAI(grid, playerGridX, playerGridY, bombPositions);
      } else if (this.type === 'onion') {
        this.updateOnionAI(grid, playerGridX, playerGridY);
      }
    } else if (this.type === 'balloon' && this.changeDirTimer <= 0) {
      this.updateBalloonAI(grid);
    }
    
    // Try to move in current direction
    this.tryMove(dt, grid, bombPositions);
    
    // Update grid position
    const gp = grid.worldToGrid(this.worldX, this.worldZ);
    this.gridX = gp.x;
    this.gridY = gp.y;
  }
  
  private animate(dt: number): void {
    this.animOffset += dt * 5;
    
    if (this.type === 'balloon') {
      // Balloon bounces
      this.mesh.position.y = Math.abs(Math.sin(this.animOffset)) * 0.1;
      this.mesh.scale.y = 1 + Math.sin(this.animOffset * 2) * 0.05;
    } else if (this.type === 'onion') {
      // Onion wobbles
      this.mesh.rotation.z = Math.sin(this.animOffset) * 0.05;
    } else {
      // Tiger prowls
      this.bodyMesh.position.y = 0.35 + Math.abs(Math.sin(this.animOffset * 1.5)) * 0.05;
    }
    
    // Update mesh position
    this.mesh.position.x = this.worldX;
    this.mesh.position.z = this.worldZ;
  }
  
  private updateBalloonAI(grid: Grid): void {
    // Simple random movement - no intelligence
    this.pickNewDirection(grid);
    this.changeDirTimer = this.aiSettings.changeDirTime;
  }
  
  private updateOnionAI(grid: Grid, playerX: number, playerY: number): void {
    // Basic pathfinding toward player
    const dx = playerX - this.gridX;
    const dy = playerY - this.gridY;
    
    const directions: Array<{x: number, y: number}> = [];
    
    // Prioritize direction toward player
    if (Math.abs(dx) > Math.abs(dy)) {
      directions.push({ x: Math.sign(dx), y: 0 });
      directions.push({ x: 0, y: Math.sign(dy) });
    } else {
      directions.push({ x: 0, y: Math.sign(dy) });
      directions.push({ x: Math.sign(dx), y: 0 });
    }
    
    // Add perpendicular directions
    directions.push({ x: -directions[0].y, y: directions[0].x });
    directions.push({ x: directions[0].y, y: -directions[0].x });
    
    // Try each direction
    for (const dir of directions) {
      if (this.canMoveInDirection(dir, grid)) {
        this.direction = dir;
        break;
      }
    }
    
    this.changeDirTimer = this.aiSettings.changeDirTime;
  }
  
  private updateTigerAI(grid: Grid, playerX: number, playerY: number, bombPositions: Array<{x: number, y: number}>): void {
    // Advanced AI: avoid bombs, collect power-ups, track player
    
    // Find nearest power-up
    let nearestPowerUp: {x: number, y: number} | null = null;
    let nearestPowerUpDist = Infinity;
    
    for (let y = 0; y < grid.HEIGHT; y++) {
      for (let x = 0; x < grid.WIDTH; x++) {
        const cell = grid.getCell(x, y);
        if (cell?.powerUp) {
          const dist = Math.abs(x - this.gridX) + Math.abs(y - this.gridY);
          if (dist < nearestPowerUpDist) {
            nearestPowerUpDist = dist;
            nearestPowerUp = { x, y };
          }
        }
      }
    }
    
    // Determine target (power-up if nearby, otherwise player)
    let targetX = playerX;
    let targetY = playerY;
    
    if (this.aiSettings.seeksPowerUps && nearestPowerUp && nearestPowerUpDist < 5) {
      targetX = nearestPowerUp.x;
      targetY = nearestPowerUp.y;
    }
    
    // Find valid moves (avoiding bombs if configured)
    const validMoves: Array<{x: number, y: number, score: number}> = [];
    const directions = [{x: 0, y: -1}, {x: 0, y: 1}, {x: -1, y: 0}, {x: 1, y: 0}];
    
    for (const dir of directions) {
      if (this.canMoveInDirection(dir, grid)) {
        const nextX = this.gridX + dir.x;
        const nextY = this.gridY + dir.y;
        
        let score = 0;
        
        // Distance to target (closer is better)
        const distToTarget = Math.abs(nextX - targetX) + Math.abs(nextY - targetY);
        score -= distToTarget;
        
        // Avoid bombs (huge penalty)
        if (this.aiSettings.seesBombs) {
          for (const bomb of bombPositions) {
            const distToBomb = Math.abs(nextX - bomb.x) + Math.abs(nextY - bomb.y);
            if (distToBomb <= 2) {
              score -= (3 - distToBomb) * 10;
            }
          }
        }
        
        validMoves.push({ ...dir, score });
      }
    }
    
    // Pick best move
    if (validMoves.length > 0) {
      validMoves.sort((a, b) => b.score - a.score);
      this.direction = { x: validMoves[0].x, y: validMoves[0].y };
    }
    
    this.changeDirTimer = this.aiSettings.changeDirTime;
  }
  
  private tryMove(dt: number, grid: Grid, bombPositions: Array<{x: number, y: number}>): void {
    const r = 0.25; // Collision radius
    const moveDist = this.speed * dt;
    
    const newX = this.worldX + this.direction.x * moveDist;
    const newZ = this.worldZ + this.direction.y * moveDist;
    
    // Check collision in X direction
    const canMoveX = this.direction.x !== 0 && this.canMove(newX, this.worldZ, r, grid, bombPositions);
    // Check collision in Y (Z) direction  
    const canMoveZ = this.direction.y !== 0 && this.canMove(this.worldX, newZ, r, grid, bombPositions);
    
    if (canMoveX) {
      this.worldX = newX;
    }
    if (canMoveZ) {
      this.worldZ = newZ;
    }
    
    // Face movement direction
    if (this.direction.x !== 0 || this.direction.y !== 0) {
      this.mesh.rotation.y = Math.atan2(this.direction.x, this.direction.y);
    }
    
    // If stuck, pick new direction
    if (!canMoveX && !canMoveZ && this.changeDirTimer <= 0) {
      this.pickNewDirection(grid);
      this.changeDirTimer = 0.5;
    }
  }
  
  private canMove(wx: number, wz: number, r: number, grid: Grid, bombPositions: Array<{x: number, y: number}> = []): boolean {
    const corners = [
      { x: wx - r, z: wz - r },
      { x: wx + r, z: wz - r },
      { x: wx - r, z: wz + r },
      { x: wx + r, z: wz + r },
    ];
    
    for (const c of corners) {
      const gp = grid.worldToGrid(c.x, c.z);
      const cell = grid.getCell(gp.x, gp.y);
      
      // Check walls
      if (!cell || !cell.isWalkable()) {
        return false;
      }
      
      // Check bombs (if enemy can see them)
      if (this.aiSettings.seesBombs) {
        for (const bomb of bombPositions) {
          if (gp.x === bomb.x && gp.y === bomb.y) {
            return false;
          }
        }
      }
    }
    
    return true;
  }
  
  private canMoveInDirection(dir: {x: number, y: number}, grid: Grid): boolean {
    const nextX = this.gridX + dir.x;
    const nextY = this.gridY + dir.y;
    const cell = grid.getCell(nextX, nextY);
    return cell !== null && cell.isWalkable();
  }
  
  private pickNewDirection(grid: Grid): void {
    const directions = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ];
    
    // Filter valid directions
    const valid = directions.filter(dir => this.canMoveInDirection(dir, grid));
    
    if (valid.length > 0) {
      // Don't reverse unless necessary
      const nonReverse = valid.filter(dir => 
        !(dir.x === -this.direction.x && dir.y === -this.direction.y)
      );
      
      if (nonReverse.length > 0) {
        this.direction = nonReverse[Math.floor(Math.random() * nonReverse.length)];
      } else {
        this.direction = valid[Math.floor(Math.random() * valid.length)];
      }
    }
  }
  
  takeDamage(): void {
    if (!this.alive) return;
    this.alive = false;
    
    // Death animation
    this.mesh.scale.set(1.2, 0.2, 1.2);
    
    // Determine if drops power-up (15% chance)
    if (Math.random() < 0.15) {
      // Return type for power-up drop
    }
  }
  
  die(): void {
    this.alive = false;
    this.mesh.visible = false;
  }
  
  getDropPowerUp(): PowerUpType | null {
    // 15% chance to drop power-up
    if (Math.random() < 0.15) {
      const types: PowerUpType[] = ['bomb', 'fire', 'speed'];
      return types[Math.floor(Math.random() * types.length)];
    }
    return null;
  }
}
