import { GameState, GridPos, TileType, Direction, GRID_SIZE, Vec2 } from '@core/types';
import { EnemyState, EnemyType } from '@core/ExtendedTypes';

// Move speed in tiles per second
const ENEMY_SPEEDS: Record<EnemyType, number> = {
  [EnemyType.BASIC]: 1.0,
  [EnemyType.FAST]: 2.5,
  [EnemyType.SMART]: 1.5,
  [EnemyType.TANK]: 0.7,
};

const DIRECTION_CHANGE_INTERVAL = 1.5; // seconds

export function updateEnemies(state: GameState, playerPos: GridPos, dt: number): void {
  const enemies = (state as any).enemies as EnemyState[] | undefined;
  if (!enemies) return;
  
  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    
    // Update direction change timer
    (enemy as any).dirChangeTimer = ((enemy as any).dirChangeTimer || 0) + dt;
    
    // Get base speed for enemy type
    const baseSpeed = ENEMY_SPEEDS[enemy.type] || 1.0;
    
    // Determine new direction based on enemy type
    if ((enemy as any).dirChangeTimer >= DIRECTION_CHANGE_INTERVAL || enemy.moveDir === Direction.None) {
      (enemy as any).dirChangeTimer = 0;
      
      switch (enemy.type) {
        case EnemyType.SMART:
          // Smart enemies chase the player
          enemy.moveDir = getDirectionTowardTarget(enemy.gridPos, playerPos);
          break;
        case EnemyType.BASIC:
        case EnemyType.FAST:
        default:
          // Basic/Fast enemies move randomly but slightly toward player
          if (Math.random() < 0.3) {
            enemy.moveDir = getDirectionTowardTarget(enemy.gridPos, playerPos);
          } else {
            enemy.moveDir = getRandomDirection();
          }
          break;
        case EnemyType.TANK:
          // Tank enemies slowly but surely move toward player
          if (Math.random() < 0.5) {
            enemy.moveDir = getDirectionTowardTarget(enemy.gridPos, playerPos);
          } else {
            enemy.moveDir = getRandomDirection();
          }
          break;
      }
    }
    
    // Move enemy
    if (enemy.moveDir !== Direction.None) {
      const moveAmount = baseSpeed * dt;
      const { dx, dy } = getDirectionVector(enemy.moveDir);
      
      const newX = enemy.worldPos.x + dx * moveAmount;
      const newY = enemy.worldPos.y + dy * moveAmount;
      
      // Check collision with walls and bombs
      const newGridCol = Math.round(newX);
      const newGridRow = Math.round(newY);
      
      if (canMoveTo(state, newGridCol, newGridRow)) {
        enemy.worldPos.x = newX;
        enemy.worldPos.y = newY;
        enemy.gridPos.col = Math.round(enemy.worldPos.x);
        enemy.gridPos.row = Math.round(enemy.worldPos.y);
      } else {
        // Hit a wall, change direction
        enemy.moveDir = getRandomDirection();
        (enemy as any).dirChangeTimer = DIRECTION_CHANGE_INTERVAL;
      }
    }
  }
}

export function checkEnemyPlayerCollision(state: GameState, playerPos: Vec2): boolean {
  const enemies = (state as any).enemies as EnemyState[] | undefined;
  if (!enemies) return false;
  
  const collisionRadius = 0.6; // Collision radius in tiles
  
  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    
    const dx = enemy.worldPos.x - playerPos.x;
    const dy = enemy.worldPos.y - playerPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < collisionRadius) {
      return true; // Collision!
    }
  }
  
  return false;
}

export function killEnemyAt(state: GameState, gridPos: GridPos): boolean {
  const enemies = (state as any).enemies as EnemyState[] | undefined;
  if (!enemies) return false;
  
  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    
    if (enemy.gridPos.col === gridPos.col && enemy.gridPos.row === gridPos.row) {
      enemy.alive = false;
      return true;
    }
  }
  
  return false;
}

function getDirectionTowardTarget(from: GridPos, to: GridPos): Direction {
  const dx = to.col - from.col;
  const dy = to.row - from.row;
  
  // Prioritize the axis with greater distance
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? Direction.Right : Direction.Left;
  } else if (dy !== 0) {
    return dy > 0 ? Direction.Down : Direction.Up;
  }
  
  return Direction.None;
}

function getRandomDirection(): Direction {
  const directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
  return directions[Math.floor(Math.random() * directions.length)];
}

function getDirectionVector(dir: Direction): { dx: number; dy: number } {
  switch (dir) {
    case Direction.Up: return { dx: 0, dy: -1 };
    case Direction.Down: return { dx: 0, dy: 1 };
    case Direction.Left: return { dx: -1, dy: 0 };
    case Direction.Right: return { dx: 1, dy: 0 };
    default: return { dx: 0, dy: 0 };
  }
}

function canMoveTo(state: GameState, col: number, row: number): boolean {
  // Check bounds
  if (col < 0 || col >= GRID_SIZE || row < 0 || row >= GRID_SIZE) {
    return false;
  }
  
  // Check tile type
  const tile = state.grid[row]?.[col];
  if (tile === TileType.HardBlock || tile === TileType.SoftBlock) {
    return false;
  }
  
  // Check for bombs
  for (const bomb of state.bombs) {
    if (bomb.gridPos.col === col && bomb.gridPos.row === row) {
      return false;
    }
  }
  
  return true;
}
