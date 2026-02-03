// ── Core types for BLASTFORGE ──

export const GRID_SIZE = 17; // Larger board for more strategic gameplay
export const TILE_WORLD_SIZE = 1.0;
export const SIM_RATE = 60;
export const SIM_DT = 1 / SIM_RATE;

export enum TileType {
  Floor = 0,
  HardBlock = 1,
  SoftBlock = 2,
}

export enum FuseAction {
  Prime = 'prime',
  Rush = 'rush',
  Detonate = 'detonate',
}

export enum Direction {
  None = 0,
  Up = 1,
  Down = 2,
  Left = 3,
  Right = 4,
}

export interface Vec2 {
  x: number;
  y: number;
}

export interface GridPos {
  col: number;
  row: number;
}

export interface PlayerState {
  id: number;
  gridPos: GridPos;
  worldPos: Vec2;
  moveDir: Direction;
  speed: number;
  bombRange: number;
  maxBombs: number;
  activeBombs: number;
  fuseCharges: number;
  alive: boolean;
}

export interface BombState {
  id: number;
  gridPos: GridPos;
  ownerId: number;
  fuseRemaining: number;
  range: number;
  primed: boolean;
  rushed: boolean;
}

export interface ExplosionState {
  gridPos: GridPos;
  remaining: number;
}

export interface PowerUpState {
  gridPos: GridPos;
  type: PowerUpType;
}

export enum PowerUpType {
  BombRange = 'bomb_range',
  BombCount = 'bomb_count',
  Speed = 'speed',
  FuseCharge = 'fuse_charge',
}

export interface GameState {
  tick: number;
  grid: TileType[][];
  players: PlayerState[];
  bombs: BombState[];
  explosions: ExplosionState[];
  powerUps: PowerUpState[];
}
