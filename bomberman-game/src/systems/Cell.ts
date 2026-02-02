import * as THREE from 'three';
import { CELL_SIZE } from '../utils/Constants';
import type { PowerUpType } from '../utils/Constants';

export class Cell {
  x: number;
  y: number;
  type: 'floor' | 'indestructible';
  hasDestructibleWall: boolean;
  hasBomb: boolean = false;
  powerUp: PowerUpType | null = null;
  explosionTimer: number = 0;

  floorMesh: THREE.Mesh | null = null;
  wallMesh: THREE.Mesh | null = null;
  powerUpMesh: THREE.Mesh | null = null;

  constructor(opts: { x: number; y: number; type: 'floor' | 'indestructible'; hasDestructibleWall: boolean }) {
    this.x = opts.x;
    this.y = opts.y;
    this.type = opts.type;
    this.hasDestructibleWall = opts.hasDestructibleWall;
  }

  isWalkable(): boolean {
    return this.type === 'floor' && !this.hasDestructibleWall && !this.hasBomb;
  }

  isExplodable(): boolean {
    return this.type !== 'indestructible';
  }
}
