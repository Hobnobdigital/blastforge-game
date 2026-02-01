import { Direction } from '@core/types';

export interface InputState {
  moveDir: Direction;
  placeBomb: boolean;
  fuseAction: 'prime' | 'rush' | 'detonate' | null;
  pause: boolean;
  menuBack: boolean;
  menuSelect: boolean;
  menuUp: boolean;
  menuDown: boolean;
  menuLeft: boolean;
  menuRight: boolean;
}

export class InputManager {
  private keys = new Set<string>();
  private justPressed = new Set<string>();
  private gamepadIndex: number | null = null;
  private pauseCallback: (() => void) | null = null;

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    window.addEventListener('keydown', (e) => {
      // Prevent default for game keys to avoid scrolling
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }
      
      if (!this.keys.has(e.code)) {
        this.justPressed.add(e.code);
        
        // Handle pause on key press (not hold)
        if (e.code === 'KeyP' || e.code === 'Escape') {
          this.pauseCallback?.();
        }
      }
      this.keys.add(e.code);
    });
    
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
    });
    
    window.addEventListener('gamepadconnected', (e) => {
      this.gamepadIndex = e.gamepad.index;
    });
    
    window.addEventListener('gamepaddisconnected', () => {
      this.gamepadIndex = null;
    });
  }

  setPauseCallback(callback: () => void): void {
    this.pauseCallback = callback;
  }

  poll(): InputState {
    const state: InputState = {
      moveDir: this.getMoveDirection(),
      placeBomb: this.justPressed.has('Space'),
      fuseAction: this.getFuseAction(),
      pause: this.justPressed.has('KeyP') || this.justPressed.has('Escape'),
      menuBack: this.justPressed.has('Escape') || this.justPressed.has('Backspace'),
      menuSelect: this.justPressed.has('Enter') || this.justPressed.has('Space'),
      menuUp: this.justPressed.has('ArrowUp') || this.justPressed.has('KeyW'),
      menuDown: this.justPressed.has('ArrowDown') || this.justPressed.has('KeyS'),
      menuLeft: this.justPressed.has('ArrowLeft') || this.justPressed.has('KeyA'),
      menuRight: this.justPressed.has('ArrowRight') || this.justPressed.has('KeyD'),
    };

    // Merge gamepad input
    if (this.gamepadIndex !== null) {
      const gp = navigator.getGamepads()[this.gamepadIndex];
      if (gp) {
        const [lx, ly] = [gp.axes[0], gp.axes[1]];
        const deadzone = 0.3;
        
        // Gamepad movement (only if keyboard not used)
        if (state.moveDir === Direction.None) {
          if (ly < -deadzone) state.moveDir = Direction.Up;
          else if (ly > deadzone) state.moveDir = Direction.Down;
          else if (lx < -deadzone) state.moveDir = Direction.Left;
          else if (lx > deadzone) state.moveDir = Direction.Right;
        }
        
        // Gamepad buttons
        if (gp.buttons[0]?.pressed) state.placeBomb = true; // A/Cross
        if (gp.buttons[1]?.pressed) state.fuseAction = 'rush'; // B/Circle
        if (gp.buttons[2]?.pressed) state.fuseAction = 'prime'; // X/Square
        if (gp.buttons[3]?.pressed) state.fuseAction = 'detonate'; // Y/Triangle
        if (gp.buttons[9]?.pressed) state.pause = true; // Start/Options
        if (gp.buttons[8]?.pressed) state.menuBack = true; // Select/Share
        if (gp.buttons[12]?.pressed) state.menuUp = true; // D-pad Up
        if (gp.buttons[13]?.pressed) state.menuDown = true; // D-pad Down
        if (gp.buttons[14]?.pressed) state.menuLeft = true; // D-pad Left
        if (gp.buttons[15]?.pressed) state.menuRight = true; // D-pad Right
      }
    }

    this.justPressed.clear();
    return state;
  }

  private getMoveDirection(): Direction {
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) return Direction.Up;
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) return Direction.Down;
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) return Direction.Left;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) return Direction.Right;
    return Direction.None;
  }

  private getFuseAction(): InputState['fuseAction'] {
    if (this.justPressed.has('KeyQ')) return 'prime';
    if (this.justPressed.has('KeyE')) return 'rush';
    if (this.justPressed.has('KeyR')) return 'detonate';
    return null;
  }

  // For menu navigation - continuous polling for held keys
  pollMenuNav(): { up: boolean; down: boolean; left: boolean; right: boolean } {
    return {
      up: this.keys.has('ArrowUp') || this.keys.has('KeyW'),
      down: this.keys.has('ArrowDown') || this.keys.has('KeyS'),
      left: this.keys.has('ArrowLeft') || this.keys.has('KeyA'),
      right: this.keys.has('ArrowRight') || this.keys.has('KeyD'),
    };
  }

  isKeyHeld(code: string): boolean {
    return this.keys.has(code);
  }
}
