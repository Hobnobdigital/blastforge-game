# Touch Controls Implementation Guide

Quick start guide for implementing touch controls in BLASTFORGE.

## Step 1: Create TouchController Class

Create `src/input/TouchController.ts`:

```typescript
import { Direction } from '@core/types';

export interface TouchState {
  joystick: { x: number; y: number; active: boolean };
  bombButton: boolean;
  fuseButtons: { prime: boolean; rush: boolean; detonate: boolean };
}

interface ButtonConfig {
  id: string;
  x: number;
  y: number;
  radius: number;
  element?: HTMLElement;
}

export class TouchController {
  private joystickCenter: { x: number; y: number } | null = null;
  private joystickId: number | null = null;
  private state: TouchState = {
    joystick: { x: 0, y: 0, active: false },
    bombButton: false,
    fuseButtons: { prime: false, rush: false, detonate: false },
  };

  private buttons: Map<string, ButtonConfig> = new Map();
  private activeButtonTouches: Map<number, string> = new Map();

  constructor() {
    this.createTouchUI();
    this.initTouchHandlers();
  }

  private createTouchUI(): void {
    // Create touch UI overlay
    const overlay = document.createElement('div');
    overlay.id = 'touch-controls';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1000;
    `;

    // Only show on touch devices
    if (!('ontouchstart' in window)) {
      overlay.style.display = 'none';
    }

    // Joystick area (visual indicator)
    const joystickArea = document.createElement('div');
    joystickArea.id = 'joystick-area';
    joystickArea.style.cssText = `
      position: absolute;
      left: 5%;
      bottom: 5%;
      width: 140px;
      height: 140px;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      pointer-events: all;
    `;

    const joystickStick = document.createElement('div');
    joystickStick.id = 'joystick-stick';
    joystickStick.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50px;
      height: 50px;
      background: rgba(0, 170, 255, 0.5);
      border: 2px solid rgba(0, 170, 255, 0.8);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: background 0.1s;
    `;
    joystickArea.appendChild(joystickStick);

    // Bomb button (large, bottom right)
    const bombBtn = this.createButton('bomb', 'BOMB', 'right: 5%; bottom: 5%; width: 80px; height: 80px; background: rgba(255, 100, 100, 0.5); border: 2px solid rgba(255, 100, 100, 0.8);');
    
    // Fuse buttons (above bomb button)
    const primeBtn = this.createButton('prime', 'Q', 'right: 5%; bottom: 100px; width: 60px; height: 60px; background: rgba(50, 100, 255, 0.5); border: 2px solid rgba(50, 100, 255, 0.8);');
    const rushBtn = this.createButton('rush', 'E', 'right: 75px; bottom: 100px; width: 60px; height: 60px; background: rgba(255, 50, 50, 0.5); border: 2px solid rgba(255, 50, 50, 0.8);');
    const detonateBtn = this.createButton('detonate', 'R', 'right: 5%; bottom: 170px; width: 60px; height: 60px; background: rgba(255, 200, 50, 0.5); border: 2px solid rgba(255, 200, 50, 0.8);');

    overlay.appendChild(joystickArea);
    overlay.appendChild(bombBtn);
    overlay.appendChild(primeBtn);
    overlay.appendChild(rushBtn);
    overlay.appendChild(detonateBtn);

    document.body.appendChild(overlay);

    // Store button positions (for hit detection)
    this.updateButtonPositions();
  }

  private createButton(id: string, label: string, styleExtras: string): HTMLElement {
    const btn = document.createElement('div');
    btn.id = `touch-btn-${id}`;
    btn.className = 'touch-button';
    btn.textContent = label;
    btn.style.cssText = `
      position: absolute;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Segoe UI', sans-serif;
      font-weight: bold;
      font-size: 14px;
      color: white;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
      pointer-events: all;
      user-select: none;
      ${styleExtras}
    `;
    return btn;
  }

  private updateButtonPositions(): void {
    const getButtonConfig = (id: string): ButtonConfig | null => {
      const el = document.getElementById(`touch-btn-${id}`);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        id,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        radius: rect.width / 2,
        element: el,
      };
    };

    const bomb = getButtonConfig('bomb');
    const prime = getButtonConfig('prime');
    const rush = getButtonConfig('rush');
    const detonate = getButtonConfig('detonate');

    if (bomb) this.buttons.set('bomb', bomb);
    if (prime) this.buttons.set('prime', prime);
    if (rush) this.buttons.set('rush', rush);
    if (detonate) this.buttons.set('detonate', detonate);

    // Update on resize
    window.addEventListener('resize', () => this.updateButtonPositions());
  }

  private initTouchHandlers(): void {
    const target = document.body;
    
    target.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
    target.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
    target.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
    target.addEventListener('touchcancel', (e) => this.handleTouchEnd(e), { passive: false });
  }

  private handleTouchStart(e: TouchEvent): void {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      const x = touch.clientX;
      const y = touch.clientY;

      // Check if touching a button
      const buttonHit = this.checkButtonHit(x, y);
      if (buttonHit) {
        e.preventDefault();
        this.activeButtonTouches.set(touch.identifier, buttonHit);
        this.setButtonState(buttonHit, true);
        this.updateButtonVisual(buttonHit, true);
        continue;
      }

      // Left side = joystick
      if (x < window.innerWidth * 0.5 && this.joystickId === null) {
        e.preventDefault();
        this.joystickId = touch.identifier;
        this.joystickCenter = { x, y };
        this.state.joystick.active = true;
        this.updateJoystickVisual();
      }
    }
  }

  private handleTouchMove(e: TouchEvent): void {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      
      if (touch.identifier === this.joystickId && this.joystickCenter) {
        e.preventDefault();
        const dx = touch.clientX - this.joystickCenter.x;
        const dy = touch.clientY - this.joystickCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 60;

        if (distance > 0) {
          const clampedDist = Math.min(distance, maxDistance);
          this.state.joystick.x = (dx / distance) * (clampedDist / maxDistance);
          this.state.joystick.y = (dy / distance) * (clampedDist / maxDistance);
        }
        this.updateJoystickVisual();
      }
    }
  }

  private handleTouchEnd(e: TouchEvent): void {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      
      // Joystick release
      if (touch.identifier === this.joystickId) {
        this.joystickId = null;
        this.joystickCenter = null;
        this.state.joystick = { x: 0, y: 0, active: false };
        this.updateJoystickVisual();
      }

      // Button release
      const buttonId = this.activeButtonTouches.get(touch.identifier);
      if (buttonId) {
        this.setButtonState(buttonId, false);
        this.updateButtonVisual(buttonId, false);
        this.activeButtonTouches.delete(touch.identifier);
      }
    }
  }

  private checkButtonHit(x: number, y: number): string | null {
    for (const [id, config] of this.buttons) {
      const dx = x - config.x;
      const dy = y - config.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= config.radius) {
        return id;
      }
    }
    return null;
  }

  private setButtonState(buttonId: string, pressed: boolean): void {
    switch (buttonId) {
      case 'bomb':
        this.state.bombButton = pressed;
        break;
      case 'prime':
        this.state.fuseButtons.prime = pressed;
        break;
      case 'rush':
        this.state.fuseButtons.rush = pressed;
        break;
      case 'detonate':
        this.state.fuseButtons.detonate = pressed;
        break;
    }
  }

  private updateButtonVisual(buttonId: string, pressed: boolean): void {
    const config = this.buttons.get(buttonId);
    if (config?.element) {
      config.element.style.opacity = pressed ? '1' : '0.5';
      config.element.style.transform = pressed ? 'scale(0.95)' : 'scale(1)';
    }
  }

  private updateJoystickVisual(): void {
    const stick = document.getElementById('joystick-stick');
    if (!stick) return;

    if (this.state.joystick.active) {
      const x = this.state.joystick.x * 45; // 45px max offset
      const y = this.state.joystick.y * 45;
      stick.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      stick.style.background = 'rgba(0, 170, 255, 0.8)';
    } else {
      stick.style.transform = 'translate(-50%, -50%)';
      stick.style.background = 'rgba(0, 170, 255, 0.5)';
    }
  }

  getState(): TouchState {
    return this.state;
  }

  convertJoystickToDirection(): Direction {
    const { x, y, active } = this.state.joystick;
    if (!active) return Direction.None;

    const deadzone = 0.2;
    if (Math.abs(x) < deadzone && Math.abs(y) < deadzone) return Direction.None;

    // Prioritize stronger axis
    if (Math.abs(y) > Math.abs(x)) {
      return y < 0 ? Direction.Up : Direction.Down;
    } else {
      return x < 0 ? Direction.Left : Direction.Right;
    }
  }
}
```

## Step 2: Update InputManager

Modify `src/input/InputManager.ts`:

```typescript
import { Direction } from '@core/types';
import { TouchController } from './TouchController';

export interface InputState {
  moveDir: Direction;
  placeBomb: boolean;
  fuseAction: 'prime' | 'rush' | 'detonate' | null;
}

export class InputManager {
  private keys = new Set<string>();
  private justPressed = new Set<string>();
  private gamepadIndex: number | null = null;
  private touchController: TouchController; // NEW

  constructor() {
    // Keyboard
    window.addEventListener('keydown', (e) => {
      if (!this.keys.has(e.code)) this.justPressed.add(e.code);
      this.keys.add(e.code);
    });
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
    });

    // Gamepad
    window.addEventListener('gamepadconnected', (e) => {
      this.gamepadIndex = e.gamepad.index;
    });
    window.addEventListener('gamepaddisconnected', () => {
      this.gamepadIndex = null;
    });

    // Touch (NEW)
    this.touchController = new TouchController();
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

    // Merge touch (NEW)
    const touch = this.touchController.getState();
    if (touch.joystick.active && state.moveDir === Direction.None) {
      state.moveDir = this.touchController.convertJoystickToDirection();
    }
    if (touch.bombButton) state.placeBomb = true;
    if (touch.fuseButtons.prime && !state.fuseAction) state.fuseAction = 'prime';
    if (touch.fuseButtons.rush && !state.fuseAction) state.fuseAction = 'rush';
    if (touch.fuseButtons.detonate && !state.fuseAction) state.fuseAction = 'detonate';

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
```

## Step 3: Update HTML

Modify `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
  <title>BLASTFORGE</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #0a0a0a;
      touch-action: none;
      overscroll-behavior: none;
      -webkit-user-select: none;
      user-select: none;
    }
    canvas {
      display: block;
      touch-action: none;
    }
    #hud {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      font-family: 'Segoe UI', sans-serif;
      color: #fff;
    }
    #fps-counter {
      position: absolute;
      top: max(8px, env(safe-area-inset-top, 8px));
      right: max(12px, env(safe-area-inset-right, 12px));
      font-size: clamp(11px, 2vw, 13px);
      opacity: 0.6;
      font-variant-numeric: tabular-nums;
    }
    #game-info {
      position: absolute;
      bottom: max(12px, env(safe-area-inset-bottom, 12px));
      left: max(12px, env(safe-area-inset-left, 12px));
      font-size: clamp(12px, 2.5vw, 14px);
      opacity: 0.8;
    }

    /* Mobile portrait - move info to top */
    @media (max-width: 480px) and (orientation: portrait) {
      #game-info {
        bottom: auto;
        top: max(40px, env(safe-area-inset-top, 40px));
        font-size: 11px;
      }
    }

    /* Mobile landscape - smaller fonts */
    @media (max-width: 896px) and (orientation: landscape) and (max-height: 414px) {
      #fps-counter { font-size: 10px; }
      #game-info { font-size: 10px; }
    }
  </style>
</head>
<body>
  <div id="hud">
    <div id="fps-counter"></div>
    <div id="game-info">BLASTFORGE v0.1 — Touch to play</div>
  </div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

## Step 4: Test

1. Build the project:
```bash
npm run dev
```

2. Open on mobile device (or use Chrome DevTools device emulation)

3. Test:
   - Virtual joystick appears on left side
   - Buttons appear on right side
   - Touch joystick to move player
   - Tap bomb button to place bomb
   - Tap fuse buttons for special actions

## Troubleshooting

### Joystick not responding
- Check console for errors
- Ensure TouchController is instantiated in InputManager
- Verify touch events aren't being blocked by canvas

### Buttons not visible
- Check z-index of touch-controls overlay
- Ensure touch UI creation happens after DOM loaded
- Check button positioning calculations

### Performance issues
- Lower pixel ratio on mobile (see DEVICE_OPTIMIZATION_REPORT.md section H2)
- Disable shadows on low-end devices
- Reduce antialias quality

## Next Steps

After basic touch controls work:
1. Add haptic feedback (see report section M3)
2. Implement visual touch feedback
3. Add orientation detection
4. Optimize performance for mobile

See `DEVICE_OPTIMIZATION_REPORT.md` for complete roadmap.
