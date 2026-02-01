import { SIM_DT, SIM_RATE } from './types';

export type UpdateFn = (dt: number, tick: number) => void;
export type RenderFn = (alpha: number) => void;

export class GameLoop {
  private accumulator = 0;
  private tick = 0;
  private lastTime = 0;
  private rafId = 0;
  private running = false;

  // FPS tracking
  private frameCount = 0;
  private fpsAccum = 0;
  fps = 0;

  constructor(
    private onUpdate: UpdateFn,
    private onRender: RenderFn,
  ) {}

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame((t) => this.loop(t));
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  private loop(now: number): void {
    if (!this.running) return;

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

  getTick(): number {
    return this.tick;
  }

  getSimRate(): number {
    return SIM_RATE;
  }
}
