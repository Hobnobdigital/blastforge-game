import { Direction } from '@core/types';

export interface InputState {
  moveDir: Direction;
  placeBomb: boolean;
  fuseAction: 'prime' | 'rush' | 'detonate' | null;
}

export class InputManager {
  private keys = new Set<string>();
  private justPressed = new Set<string>();
  private gamepadIndex: number | null = null;

  constructor() {
    window.addEventListener('keydown', (e) => {
      if (!this.keys.has(e.code)) this.justPressed.add(e.code);
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

  poll(): InputState {
    const state: InputState = {
      moveDir: this.getMoveDirection(),
      placeBomb: this.justPressed.has('Space'),
      fuseAction: this.getFuseAction(),
    };

    // Merge gamepad
    if (this.gamepadIndex !== null) {
      const gp = navigator.getGamepads()[this.gamepadIndex];
      if (gp) {
        const [lx, ly] = [gp.axes[0], gp.axes[1]];
        const deadzone = 0.3;
        if (state.moveDir === Direction.None) {
          if (ly < -deadzone) state.moveDir = Direction.Up;
          else if (ly > deadzone) state.moveDir = Direction.Down;
          else if (lx < -deadzone) state.moveDir = Direction.Left;
          else if (lx > deadzone) state.moveDir = Direction.Right;
        }
        if (gp.buttons[0]?.pressed) state.placeBomb = true;
        if (gp.buttons[2]?.pressed) state.fuseAction = 'prime';
        if (gp.buttons[1]?.pressed) state.fuseAction = 'rush';
        if (gp.buttons[3]?.pressed) state.fuseAction = 'detonate';
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
}
