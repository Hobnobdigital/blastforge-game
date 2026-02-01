import { SIM_DT, SIM_RATE } from './types';
export class GameLoop {
    onUpdate;
    onRender;
    accumulator = 0;
    tick = 0;
    lastTime = 0;
    rafId = 0;
    running = false;
    // FPS tracking
    frameCount = 0;
    fpsAccum = 0;
    fps = 0;
    constructor(onUpdate, onRender) {
        this.onUpdate = onUpdate;
        this.onRender = onRender;
    }
    start() {
        if (this.running)
            return;
        this.running = true;
        this.lastTime = performance.now();
        this.rafId = requestAnimationFrame((t) => this.loop(t));
    }
    stop() {
        this.running = false;
        cancelAnimationFrame(this.rafId);
    }
    loop(now) {
        if (!this.running)
            return;
        const frameTime = Math.min((now - this.lastTime) / 1000, 0.25); // cap spiral-of-death
        this.lastTime = now;
        this.accumulator += frameTime;
        // FPS counter
        this.fpsAccum += frameTime;
        this.frameCount++;
        if (this.fpsAccum >= 1) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.fpsAccum -= 1;
        }
        // Fixed-timestep simulation
        while (this.accumulator >= SIM_DT) {
            this.onUpdate(SIM_DT, this.tick);
            this.tick++;
            this.accumulator -= SIM_DT;
        }
        // Render with interpolation alpha
        const alpha = this.accumulator / SIM_DT;
        this.onRender(alpha);
        this.rafId = requestAnimationFrame((t) => this.loop(t));
    }
    getTick() {
        return this.tick;
    }
    getSimRate() {
        return SIM_RATE;
    }
}
//# sourceMappingURL=GameLoop.js.map