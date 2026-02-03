import { Direction } from '@core/types';

/**
 * Interface for touch controller state
 */
export interface TouchState {
  joystick: { x: number; y: number; active: boolean };
  bombButton: boolean;
  fuseButtons: { prime: boolean; rush: boolean; detonate: boolean };
}

// Singleton instance to prevent duplicate controls
let touchControllerInstance: TouchController | null = null;

/**
 * TouchController - Simple touch controls for mobile
 * 
 * Features:
 * - D-pad style buttons for movement (left side)
 * - Large bomb button (right side)
 * - Clean, obvious UI
 * - Singleton pattern to prevent duplicates
 */
export class TouchController {
  private state: TouchState = {
    joystick: { x: 0, y: 0, active: false },
    bombButton: false,
    fuseButtons: { prime: false, rush: false, detonate: false },
  };

  private overlay: HTMLElement | null = null;
  private isTouchDevice: boolean = false;
  private activeDirections: Set<Direction> = new Set();

  constructor() {
    // Return existing instance if already created (singleton)
    if (touchControllerInstance) {
      this.isTouchDevice = touchControllerInstance.isTouchDevice;
      this.state = touchControllerInstance.state;
      this.overlay = touchControllerInstance.overlay;
      this.activeDirections = touchControllerInstance.activeDirections;
      return;
    }
    
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (this.isTouchDevice) {
      this.createTouchUI();
    }
    
    touchControllerInstance = this;
  }

  /**
   * Create simple touch UI with D-pad and bomb button
   */
  private createTouchUI(): void {
    // Remove any existing touch controls first (prevent duplicates)
    const existing = document.getElementById('touch-controls');
    if (existing) {
      existing.remove();
    }
    
    // Create main overlay container
    this.overlay = document.createElement('div');
    this.overlay.id = 'touch-controls';
    this.overlay.innerHTML = `
      <style>
        #touch-controls {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
          user-select: none;
          -webkit-user-select: none;
        }
        
        .touch-btn {
          position: absolute;
          pointer-events: all;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: bold;
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          transition: transform 0.1s, opacity 0.1s;
          -webkit-tap-highlight-color: transparent;
        }
        
        .touch-btn:active, .touch-btn.pressed {
          transform: scale(0.9);
          opacity: 1 !important;
        }
        
        /* D-Pad buttons */
        .dpad-btn {
          width: 70px;
          height: 70px;
          background: rgba(255, 255, 255, 0.25);
          border: 3px solid rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(4px);
        }
        
        #btn-up {
          left: 85px;
          bottom: 160px;
        }
        
        #btn-down {
          left: 85px;
          bottom: 20px;
        }
        
        #btn-left {
          left: 15px;
          bottom: 90px;
        }
        
        #btn-right {
          left: 155px;
          bottom: 90px;
        }
        
        /* Bomb button - big and obvious */
        #btn-bomb {
          right: 20px;
          bottom: 60px;
          width: 100px;
          height: 100px;
          background: rgba(255, 60, 60, 0.7);
          border: 4px solid rgba(255, 100, 100, 0.9);
          font-size: 18px;
          box-shadow: 0 4px 20px rgba(255, 0, 0, 0.3);
        }
        
        #btn-bomb.pressed {
          background: rgba(255, 100, 100, 1);
          box-shadow: 0 4px 30px rgba(255, 0, 0, 0.6);
        }
        
        /* Hide on desktop */
        @media (hover: hover) and (pointer: fine) {
          #touch-controls {
            display: none !important;
          }
        }
      </style>
      
      <!-- D-Pad for movement -->
      <div id="btn-up" class="touch-btn dpad-btn">▲</div>
      <div id="btn-down" class="touch-btn dpad-btn">▼</div>
      <div id="btn-left" class="touch-btn dpad-btn">◀</div>
      <div id="btn-right" class="touch-btn dpad-btn">▶</div>
      
      <!-- Bomb button -->
      <div id="btn-bomb" class="touch-btn">💣<br>BOMB</div>
    `;

    document.body.appendChild(this.overlay);

    // Setup touch handlers for each button
    this.setupButton('btn-up', Direction.Up);
    this.setupButton('btn-down', Direction.Down);
    this.setupButton('btn-left', Direction.Left);
    this.setupButton('btn-right', Direction.Right);
    this.setupBombButton();
  }

  private setupButton(id: string, direction: Direction): void {
    const btn = document.getElementById(id);
    if (!btn) return;

    const activate = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this.activeDirections.add(direction);
      this.updateJoystickFromDirections();
      btn.classList.add('pressed');
    };

    const deactivate = (e: Event) => {
      e.preventDefault();
      this.activeDirections.delete(direction);
      this.updateJoystickFromDirections();
      btn.classList.remove('pressed');
    };

    btn.addEventListener('touchstart', activate, { passive: false });
    btn.addEventListener('touchend', deactivate, { passive: false });
    btn.addEventListener('touchcancel', deactivate, { passive: false });
    
    // Also support mouse for testing
    btn.addEventListener('mousedown', activate);
    btn.addEventListener('mouseup', deactivate);
    btn.addEventListener('mouseleave', deactivate);
  }

  private setupBombButton(): void {
    const btn = document.getElementById('btn-bomb');
    if (!btn) return;

    const activate = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this.state.bombButton = true;
      btn.classList.add('pressed');
    };

    const deactivate = (e: Event) => {
      e.preventDefault();
      this.state.bombButton = false;
      btn.classList.remove('pressed');
    };

    btn.addEventListener('touchstart', activate, { passive: false });
    btn.addEventListener('touchend', deactivate, { passive: false });
    btn.addEventListener('touchcancel', deactivate, { passive: false });
    
    // Also support mouse for testing
    btn.addEventListener('mousedown', activate);
    btn.addEventListener('mouseup', deactivate);
    btn.addEventListener('mouseleave', deactivate);
  }

  private updateJoystickFromDirections(): void {
    let x = 0;
    let y = 0;
    
    if (this.activeDirections.has(Direction.Left)) x -= 1;
    if (this.activeDirections.has(Direction.Right)) x += 1;
    if (this.activeDirections.has(Direction.Up)) y -= 1;
    if (this.activeDirections.has(Direction.Down)) y += 1;
    
    this.state.joystick = {
      x,
      y,
      active: this.activeDirections.size > 0
    };
  }

  /**
   * Get current touch state
   */
  getState(): TouchState {
    return { ...this.state };
  }

  /**
   * Convert joystick position to Direction enum
   */
  convertJoystickToDirection(): Direction {
    const { x, y, active } = this.state.joystick;
    if (!active) return Direction.None;

    // Prioritize vertical movement if stronger
    if (Math.abs(y) > Math.abs(x)) {
      return y < 0 ? Direction.Up : Direction.Down;
    } else if (Math.abs(x) > 0) {
      return x < 0 ? Direction.Left : Direction.Right;
    }
    
    return Direction.None;
  }

  /**
   * Check if device is touch-capable
   */
  isTouchEnabled(): boolean {
    return this.isTouchDevice;
  }

  /**
   * Show/hide touch controls
   */
  setVisible(visible: boolean): void {
    if (this.overlay) {
      this.overlay.style.display = visible ? 'block' : 'none';
    }
  }

  /**
   * Destroy the touch controller and clean up
   */
  destroy(): void {
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
  }
}
