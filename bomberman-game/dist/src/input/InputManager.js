import { Direction } from '@core/types';
import { TouchController } from './TouchController';
/**
 * InputManager - Unified input handling for keyboard, gamepad, and touch
 *
 * Priority order:
 * 1. Keyboard (highest priority)
 * 2. Gamepad
 * 3. Touch controls (lowest priority, merged with others)
 */
export class InputManager {
    keys = new Set();
    justPressed = new Set();
    gamepadIndex = null;
    touchController;
    // Track previous touch states for edge detection
    prevTouchState = {
        bombButton: false,
        fuseButtons: { prime: false, rush: false, detonate: false },
    };
    constructor() {
        // Initialize touch controller
        this.touchController = new TouchController();
        // Keyboard events
        window.addEventListener('keydown', (e) => {
            // Prevent default for game keys to avoid page scrolling
            if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault();
            }
            if (!this.keys.has(e.code))
                this.justPressed.add(e.code);
            this.keys.add(e.code);
        });
        window.addEventListener('keyup', (e) => {
            this.keys.delete(e.code);
        });
        // Gamepad events
        window.addEventListener('gamepadconnected', (e) => {
            console.log(`Gamepad connected: ${e.gamepad.id}`);
            this.gamepadIndex = e.gamepad.index;
        });
        window.addEventListener('gamepaddisconnected', () => {
            console.log('Gamepad disconnected');
            this.gamepadIndex = null;
        });
    }
    poll() {
        const state = {
            moveDir: this.getMoveDirection(),
            placeBomb: this.justPressed.has('Space'),
            fuseAction: this.getFuseAction(),
        };
        // Merge gamepad input
        if (this.gamepadIndex !== null) {
            const gp = navigator.getGamepads()[this.gamepadIndex];
            if (gp) {
                const [lx, ly] = [gp.axes[0], gp.axes[1]];
                const deadzone = 0.3;
                if (state.moveDir === Direction.None) {
                    if (ly < -deadzone)
                        state.moveDir = Direction.Up;
                    else if (ly > deadzone)
                        state.moveDir = Direction.Down;
                    else if (lx < -deadzone)
                        state.moveDir = Direction.Left;
                    else if (lx > deadzone)
                        state.moveDir = Direction.Right;
                }
                if (gp.buttons[0]?.pressed)
                    state.placeBomb = true;
                if (gp.buttons[2]?.pressed)
                    state.fuseAction = 'prime';
                if (gp.buttons[1]?.pressed)
                    state.fuseAction = 'rush';
                if (gp.buttons[3]?.pressed)
                    state.fuseAction = 'detonate';
            }
        }
        // Merge touch input
        const touch = this.touchController.getState();
        // Joystick movement (only if no keyboard/gamepad input)
        if (state.moveDir === Direction.None) {
            const touchDir = this.touchController.convertJoystickToDirection();
            if (touchDir !== Direction.None) {
                state.moveDir = touchDir;
            }
        }
        // Touch bomb button (edge detection - only on press, not hold)
        if (touch.bombButton && !this.prevTouchState.bombButton) {
            state.placeBomb = true;
        }
        // Touch fuse buttons (edge detection)
        if (touch.fuseButtons.prime && !this.prevTouchState.fuseButtons.prime && !state.fuseAction) {
            state.fuseAction = 'prime';
        }
        if (touch.fuseButtons.rush && !this.prevTouchState.fuseButtons.rush && !state.fuseAction) {
            state.fuseAction = 'rush';
        }
        if (touch.fuseButtons.detonate && !this.prevTouchState.fuseButtons.detonate && !state.fuseAction) {
            state.fuseAction = 'detonate';
        }
        // Store current touch state for next frame
        this.prevTouchState = {
            bombButton: touch.bombButton,
            fuseButtons: { ...touch.fuseButtons },
        };
        this.justPressed.clear();
        return state;
    }
    getMoveDirection() {
        if (this.keys.has('KeyW') || this.keys.has('ArrowUp'))
            return Direction.Up;
        if (this.keys.has('KeyS') || this.keys.has('ArrowDown'))
            return Direction.Down;
        if (this.keys.has('KeyA') || this.keys.has('ArrowLeft'))
            return Direction.Left;
        if (this.keys.has('KeyD') || this.keys.has('ArrowRight'))
            return Direction.Right;
        return Direction.None;
    }
    getFuseAction() {
        if (this.justPressed.has('KeyQ'))
            return 'prime';
        if (this.justPressed.has('KeyE'))
            return 'rush';
        if (this.justPressed.has('KeyR'))
            return 'detonate';
        return null;
    }
    /**
     * Check if touch controls are available
     */
    isTouchAvailable() {
        return this.touchController.isTouchEnabled();
    }
    /**
     * Get direct access to touch controller for advanced usage
     */
    getTouchController() {
        return this.touchController;
    }
}
//# sourceMappingURL=InputManager.js.map