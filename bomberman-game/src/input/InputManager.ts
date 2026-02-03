import { Direction } from '../core/types';
import type { ExtendedInputState } from '../core/ExtendedTypes';
import { TouchController, TouchState } from './TouchController';

export class InputManager {
  private keys: Set<string> = new Set();
  private bombPressed = false;
  private pausePressed = false;
  private anyKeyPressed = false;
  private pauseCallback: (() => void) | null = null;
  
  // Touch controller for mobile
  private touchController: TouchController;
  private lastTouchBombState = false;
  private touchBombPressed = false;

  constructor() {
    // Initialize touch controller
    this.touchController = new TouchController();
    
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
    // Get keyboard direction
    const keyDir = this.getDirection();
    
    // Get touch state
    const touchState = this.touchController.getState();
    const touchDir = this.touchController.convertJoystickToDirection();
    
    // Check for touch bomb button press (edge detection)
    if (touchState.bombButton && !this.lastTouchBombState) {
      this.touchBombPressed = true;
    }
    this.lastTouchBombState = touchState.bombButton;
    
    // Combine keyboard and touch input (touch overrides if active)
    let moveDir = Direction.None;
    
    if (touchState.joystick.active) {
      moveDir = touchDir;
    } else {
      if (keyDir.x < 0) moveDir = Direction.Left;
      else if (keyDir.x > 0) moveDir = Direction.Right;
      else if (keyDir.y < 0) moveDir = Direction.Up;
      else if (keyDir.y > 0) moveDir = Direction.Down;
    }
    
    // Get fuse action from touch or keyboard
    let fuseAction: 'prime' | 'rush' | 'detonate' | null = null;
    if (touchState.fuseButtons.prime || this.keys.has('KeyQ')) fuseAction = 'prime';
    else if (touchState.fuseButtons.rush || this.keys.has('KeyE')) fuseAction = 'rush';
    else if (touchState.fuseButtons.detonate || this.keys.has('KeyR')) fuseAction = 'detonate';

    return {
      moveDir,
      placeBomb: this.consumeBomb(),
      fuseAction,
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
    // Check keyboard bomb
    if (this.bombPressed) {
      this.bombPressed = false;
      return true;
    }
    // Check touch bomb (edge-triggered)
    if (this.touchBombPressed) {
      this.touchBombPressed = false;
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
  
  /**
   * Get touch controller for direct access if needed
   */
  getTouchController(): TouchController {
    return this.touchController;
  }
  
  /**
   * Check if touch is available
   */
  isTouchEnabled(): boolean {
    return this.touchController.isTouchEnabled();
  }
}
