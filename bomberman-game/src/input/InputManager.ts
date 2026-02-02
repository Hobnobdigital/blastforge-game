import { Direction } from '../core/types';
import type { ExtendedInputState } from '../core/ExtendedTypes';

export class InputManager {
  private keys: Set<string> = new Set();
  private bombPressed = false;
  private pausePressed = false;
  private anyKeyPressed = false;
  private pauseCallback: (() => void) | null = null;

  constructor() {
    window.addEventListener('keydown', (e) => {
      this.keys.add(e.code);
      if (e.code === 'Space') this.bombPressed = true;
      if (e.code === 'Escape' || e.code === 'KeyP') {
        this.pausePressed = true;
        this.pauseCallback?.();
      }
      this.anyKeyPressed = true;
      e.preventDefault();
    });
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
    });
  }

  setPauseCallback(callback: () => void): void {
    this.pauseCallback = callback;
  }

  poll(): ExtendedInputState {
    const dir = this.getDirection();
    let moveDir = Direction.None;
    if (dir.x < 0) moveDir = Direction.Left;
    else if (dir.x > 0) moveDir = Direction.Right;
    else if (dir.y < 0) moveDir = Direction.Up;
    else if (dir.y > 0) moveDir = Direction.Down;

    return {
      moveDir,
      placeBomb: this.consumeBomb(),
      fuseAction: null,
      pause: this.consumePause(),
      menuBack: this.keys.has('Escape'),
      menuSelect: this.keys.has('Enter') || this.keys.has('Space'),
      menuUp: this.keys.has('ArrowUp') || this.keys.has('KeyW'),
      menuDown: this.keys.has('ArrowDown') || this.keys.has('KeyS'),
      menuLeft: this.keys.has('ArrowLeft') || this.keys.has('KeyA'),
      menuRight: this.keys.has('ArrowRight') || this.keys.has('KeyD'),
    };
  }

  getDirection(): { x: number; y: number } {
    let x = 0;
    let y = 0;
    if (this.keys.has('ArrowLeft') || this.keys.has('KeyA')) x -= 1;
    if (this.keys.has('ArrowRight') || this.keys.has('KeyD')) x += 1;
    if (this.keys.has('ArrowUp') || this.keys.has('KeyW')) y -= 1;
    if (this.keys.has('ArrowDown') || this.keys.has('KeyS')) y += 1;
    return { x, y };
  }

  consumeBomb(): boolean {
    if (this.bombPressed) {
      this.bombPressed = false;
      return true;
    }
    return false;
  }

  consumePause(): boolean {
    if (this.pausePressed) {
      this.pausePressed = false;
      return true;
    }
    return false;
  }

  consumeAnyKey(): boolean {
    if (this.anyKeyPressed) {
      this.anyKeyPressed = false;
      return true;
    }
    return false;
  }
}
