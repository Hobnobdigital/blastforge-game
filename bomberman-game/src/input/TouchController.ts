import { Direction } from '@core/types';

/**
 * Interface for touch controller state
 */
export interface TouchState {
  joystick: { x: number; y: number; active: boolean };
  bombButton: boolean;
  fuseButtons: { prime: boolean; rush: boolean; detonate: boolean };
}

/**
 * Configuration for a touch button
 */
interface ButtonConfig {
  id: string;
  x: number;
  y: number;
  radius: number;
  element?: HTMLElement;
}

/**
 * Haptic feedback types
 */
enum HapticType {
  Light = 'light',
  Medium = 'medium',
  Heavy = 'heavy',
}

/**
 * TouchController - Complete touch control system for mobile/tablet
 * 
 * Features:
 * - Virtual joystick for movement (left side)
 * - Touch buttons for actions (right side)
 * - Haptic feedback support (where available)
 * - Responsive design for portrait/landscape
 * - Clean modern UI with visual feedback
 */
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
  private overlay: HTMLElement | null = null;
  private isTouchDevice: boolean;
  private resizeHandler: () => void;

  constructor() {
    // Detect touch support
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Bind resize handler for responsive updates
    this.resizeHandler = this.updateButtonPositions.bind(this);
    
    // Initialize the UI
    this.createTouchUI();
    this.initTouchHandlers();
    
    // Listen for orientation changes
    window.addEventListener('resize', this.resizeHandler);
    window.addEventListener('orientationchange', () => {
      // Delay to allow layout to settle
      setTimeout(() => this.updateButtonPositions(), 100);
    });
  }

  /**
   * Create the touch UI overlay with joystick and buttons
   */
  private createTouchUI(): void {
    // Create main overlay container
    this.overlay = document.createElement('div');
    this.overlay.id = 'touch-controls';
    this.overlay.className = 'touch-controls-overlay';
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1000;
      display: ${this.isTouchDevice ? 'block' : 'none'};
    `;

    // Add CSS variables for theming
    this.addTouchStyles();

    // Create joystick area (left side)
    this.createJoystick();

    // Create action buttons (right side)
    this.createActionButtons();

    // Append to document
    document.body.appendChild(this.overlay);

    // Calculate button positions
    this.updateButtonPositions();
  }

  /**
   * Add CSS styles for touch controls
   */
  private addTouchStyles(): void {
    const styleId = 'touch-controls-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      :root {
        --joystick-size: clamp(120px, 25vw, 160px);
        --joystick-stick-size: clamp(40px, 8vw, 60px);
        --bomb-btn-size: clamp(70px, 15vw, 90px);
        --fuse-btn-size: clamp(50px, 11vw, 70px);
        --touch-btn-gap: clamp(10px, 2vw, 16px);
        --touch-color-primary: rgba(0, 170, 255, 0.6);
        --touch-color-primary-active: rgba(0, 200, 255, 0.9);
        --touch-color-bomb: rgba(255, 80, 80, 0.7);
        --touch-color-bomb-active: rgba(255, 100, 100, 1);
        --touch-color-prime: rgba(80, 150, 255, 0.7);
        --touch-color-rush: rgba(255, 150, 50, 0.7);
        --touch-color-detonate: rgba(255, 220, 50, 0.8);
      }

      .touch-controls-overlay {
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      }

      #joystick-area {
        position: absolute;
        left: 5%;
        bottom: max(5%, env(safe-area-inset-bottom, 5%));
        width: var(--joystick-size);
        height: var(--joystick-size);
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        pointer-events: all;
        background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
        backdrop-filter: blur(2px);
        transition: border-color 0.2s, background 0.2s;
      }

      #joystick-area.active {
        border-color: rgba(0, 170, 255, 0.5);
        background: radial-gradient(circle, rgba(0,170,255,0.1) 0%, transparent 70%);
      }

      #joystick-stick {
        position: absolute;
        top: 50%;
        left: 50%;
        width: var(--joystick-stick-size);
        height: var(--joystick-stick-size);
        background: var(--touch-color-primary);
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: background 0.15s, transform 0.05s;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      }

      #joystick-area.active #joystick-stick {
        background: var(--touch-color-primary-active);
        box-shadow: 0 4px 20px rgba(0, 170, 255, 0.4);
      }

      .touch-button {
        position: absolute;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: clamp(12px, 2.5vw, 16px);
        color: white;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        pointer-events: all;
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        cursor: pointer;
        transition: transform 0.1s, opacity 0.15s, box-shadow 0.15s;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(2px);
      }

      .touch-button:active, .touch-button.pressed {
        transform: scale(0.92);
        opacity: 1 !important;
      }

      .touch-button-bomb {
        right: max(5%, env(safe-area-inset-right, 5%));
        bottom: max(5%, env(safe-area-inset-bottom, 5%));
        width: var(--bomb-btn-size);
        height: var(--bomb-btn-size);
        background: var(--touch-color-bomb);
        border: 2px solid rgba(255, 120, 120, 0.8);
        font-size: clamp(14px, 3vw, 18px);
      }

      .touch-button-bomb.pressed {
        background: var(--touch-color-bomb-active);
        box-shadow: 0 4px 25px rgba(255, 80, 80, 0.5);
      }

      .touch-button-fuse {
        width: var(--fuse-btn-size);
        height: var(--fuse-btn-size);
        font-size: clamp(14px, 3vw, 18px);
      }

      .touch-button-prime {
        right: max(5%, env(safe-area-inset-right, 5%));
        bottom: calc(max(5%, env(safe-area-inset-bottom, 5%)) + var(--bomb-btn-size) + var(--touch-btn-gap));
        background: var(--touch-color-prime);
        border: 2px solid rgba(100, 170, 255, 0.8);
      }

      .touch-button-rush {
        right: calc(max(5%, env(safe-area-inset-right, 5%)) + var(--fuse-btn-size) + var(--touch-btn-gap));
        bottom: calc(max(5%, env(safe-area-inset-bottom, 5%)) + var(--bomb-btn-size) + var(--touch-btn-gap));
        background: var(--touch-color-rush);
        border: 2px solid rgba(255, 180, 80, 0.8);
      }

      .touch-button-detonate {
        right: max(5%, env(safe-area-inset-right, 5%));
        bottom: calc(max(5%, env(safe-area-inset-bottom, 5%)) + var(--bomb-btn-size) + var(--fuse-btn-size) + var(--touch-btn-gap) * 2);
        background: var(--touch-color-detonate);
        border: 2px solid rgba(255, 240, 100, 0.9);
      }

      /* Portrait mode adjustments */
      @media (max-width: 480px) and (orientation: portrait) {
        :root {
          --joystick-size: 140px;
          --joystick-stick-size: 50px;
          --bomb-btn-size: 75px;
          --fuse-btn-size: 55px;
        }

        .touch-button-prime,
        .touch-button-rush,
        .touch-button-detonate {
          bottom: calc(max(5%, env(safe-area-inset-bottom, 5%)) + var(--bomb-btn-size) + var(--fuse-btn-size) * 0.5);
        }

        .touch-button-rush {
          right: calc(max(5%, env(safe-area-inset-right, 5%)) + var(--fuse-btn-size) + var(--touch-btn-gap));
        }

        .touch-button-detonate {
          right: max(5%, env(safe-area-inset-right, 5%));
          bottom: calc(max(5%, env(safe-area-inset-bottom, 5%)) + var(--bomb-btn-size) + var(--fuse-btn-size) + var(--touch-btn-gap) * 2);
        }
      }

      /* Landscape mode for small screens */
      @media (max-height: 500px) and (orientation: landscape) {
        :root {
          --joystick-size: 100px;
          --joystick-stick-size: 35px;
          --bomb-btn-size: 55px;
          --fuse-btn-size: 40px;
          --touch-btn-gap: 8px;
        }

        .touch-button-prime,
        .touch-button-rush,
        .touch-button-detonate {
          bottom: max(5%, env(safe-area-inset-bottom, 5%));
        }

        .touch-button-prime {
          right: calc(max(5%, env(safe-area-inset-right, 5%)) + var(--bomb-btn-size) + var(--touch-btn-gap));
        }

        .touch-button-rush {
          right: calc(max(5%, env(safe-area-inset-right, 5%)) + var(--bomb-btn-size) + var(--fuse-btn-size) + var(--touch-btn-gap) * 2);
        }

        .touch-button-detonate {
          right: calc(max(5%, env(safe-area-inset-right, 5%)) + var(--bomb-btn-size) + var(--fuse-btn-size) * 2 + var(--touch-btn-gap) * 3);
        }
      }

      /* Tablet optimizations */
      @media (min-width: 768px) {
        :root {
          --joystick-size: 180px;
          --joystick-stick-size: 70px;
          --bomb-btn-size: 100px;
          --fuse-btn-size: 80px;
        }
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        .touch-button {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
      }

      /* Reduce motion preference */
      @media (prefers-reduced-motion: reduce) {
        .touch-button,
        #joystick-stick {
          transition: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Create the virtual joystick
   */
  private createJoystick(): void {
    const joystickArea = document.createElement('div');
    joystickArea.id = 'joystick-area';
    joystickArea.setAttribute('role', 'button');
    joystickArea.setAttribute('aria-label', 'Movement joystick');

    const joystickStick = document.createElement('div');
    joystickStick.id = 'joystick-stick';

    joystickArea.appendChild(joystickStick);
    this.overlay!.appendChild(joystickArea);
  }

  /**
   * Create action buttons
   */
  private createActionButtons(): void {
    // Bomb button (large, primary)
    const bombBtn = this.createButton('bomb', 'BOMB', 'touch-button-bomb');
    
    // Fuse buttons (smaller, secondary)
    const primeBtn = this.createButton('prime', 'Q', 'touch-button-fuse touch-button-prime');
    const rushBtn = this.createButton('rush', 'E', 'touch-button-fuse touch-button-rush');
    const detonateBtn = this.createButton('detonate', 'R', 'touch-button-fuse touch-button-detonate');

    // Add tooltips/hints
    bombBtn.setAttribute('aria-label', 'Place bomb');
    primeBtn.setAttribute('aria-label', 'Prime bomb');
    rushBtn.setAttribute('aria-label', 'Rush bomb');
    detonateBtn.setAttribute('aria-label', 'Detonate bomb');

    this.overlay!.appendChild(bombBtn);
    this.overlay!.appendChild(primeBtn);
    this.overlay!.appendChild(rushBtn);
    this.overlay!.appendChild(detonateBtn);
  }

  /**
   * Create a button element
   */
  private createButton(id: string, label: string, className: string): HTMLElement {
    const btn = document.createElement('div');
    btn.id = `touch-btn-${id}`;
    btn.className = `touch-button ${className}`;
    btn.textContent = label;
    btn.setAttribute('role', 'button');
    return btn;
  }

  /**
   * Update button positions for hit detection
   */
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

    this.buttons.clear();
    
    const bomb = getButtonConfig('bomb');
    const prime = getButtonConfig('prime');
    const rush = getButtonConfig('rush');
    const detonate = getButtonConfig('detonate');

    if (bomb) this.buttons.set('bomb', bomb);
    if (prime) this.buttons.set('prime', prime);
    if (rush) this.buttons.set('rush', rush);
    if (detonate) this.buttons.set('detonate', detonate);
  }

  /**
   * Initialize touch event handlers
   */
  private initTouchHandlers(): void {
    const target = document.body;
    
    // Use passive: false to allow preventDefault for game controls
    target.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
    target.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
    target.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
    target.addEventListener('touchcancel', (e) => this.handleTouchEnd(e), { passive: false });

    // Prevent default touch behaviors that interfere with game
    document.addEventListener('touchmove', (e) => {
      if (e.target instanceof Element && e.target.closest('#touch-controls')) {
        e.preventDefault();
      }
    }, { passive: false });

    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, { passive: false });
  }

  /**
   * Handle touch start events
   */
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
        this.triggerHaptic(HapticType.Light);
        continue;
      }

      // Left side of screen = joystick area
      if (x < window.innerWidth * 0.4 && this.joystickId === null) {
        e.preventDefault();
        this.joystickId = touch.identifier;
        this.joystickCenter = { x, y };
        this.state.joystick.active = true;
        this.updateJoystickVisual(true);
        this.triggerHaptic(HapticType.Light);
      }
    }
  }

  /**
   * Handle touch move events
   */
  private handleTouchMove(e: TouchEvent): void {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      
      if (touch.identifier === this.joystickId && this.joystickCenter) {
        e.preventDefault();
        const dx = touch.clientX - this.joystickCenter.x;
        const dy = touch.clientY - this.joystickCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 45; // Max joystick range in pixels

        if (distance > 0) {
          const clampedDist = Math.min(distance, maxDistance);
          this.state.joystick.x = (dx / distance) * (clampedDist / maxDistance);
          this.state.joystick.y = (dy / distance) * (clampedDist / maxDistance);
        }
        this.updateJoystickVisual(true);
      }
    }
  }

  /**
   * Handle touch end/cancel events
   */
  private handleTouchEnd(e: TouchEvent): void {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      
      // Joystick release
      if (touch.identifier === this.joystickId) {
        this.joystickId = null;
        this.joystickCenter = null;
        this.state.joystick = { x: 0, y: 0, active: false };
        this.updateJoystickVisual(false);
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

  /**
   * Check if a touch point hits a button
   */
  private checkButtonHit(x: number, y: number): string | null {
    for (const [id, config] of this.buttons) {
      const dx = x - config.x;
      const dy = y - config.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Add slight padding for easier touch
      if (dist <= config.radius * 1.2) {
        return id;
      }
    }
    return null;
  }

  /**
   * Set the state of a button
   */
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

  /**
   * Update button visual state
   */
  private updateButtonVisual(buttonId: string, pressed: boolean): void {
    const config = this.buttons.get(buttonId);
    if (config?.element) {
      if (pressed) {
        config.element.classList.add('pressed');
      } else {
        config.element.classList.remove('pressed');
      }
    }
  }

  /**
   * Update joystick visual state
   */
  private updateJoystickVisual(active: boolean): void {
    const stick = document.getElementById('joystick-stick');
    const area = document.getElementById('joystick-area');
    
    if (!stick || !area) return;

    if (active) {
      area.classList.add('active');
      const x = this.state.joystick.x * 45; // 45px max offset
      const y = this.state.joystick.y * 45;
      stick.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    } else {
      area.classList.remove('active');
      stick.style.transform = 'translate(-50%, -50%)';
    }
  }

  /**
   * Trigger haptic feedback if supported
   */
  private triggerHaptic(type: HapticType): void {
    if (!navigator.vibrate) return;
    
    try {
      switch (type) {
        case HapticType.Light:
          navigator.vibrate(10);
          break;
        case HapticType.Medium:
          navigator.vibrate(20);
          break;
        case HapticType.Heavy:
          navigator.vibrate([30, 10, 30]);
          break;
      }
    } catch (e) {
      // Haptic not supported or permission denied
    }
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

    const deadzone = 0.25;
    if (Math.abs(x) < deadzone && Math.abs(y) < deadzone) return Direction.None;

    // Prioritize stronger axis
    if (Math.abs(y) > Math.abs(x)) {
      return y < 0 ? Direction.Up : Direction.Down;
    } else {
      return x < 0 ? Direction.Left : Direction.Right;
    }
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
    window.removeEventListener('resize', this.resizeHandler);
    
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
    
    const styles = document.getElementById('touch-controls-styles');
    if (styles && styles.parentNode) {
      styles.parentNode.removeChild(styles);
    }
  }
}
