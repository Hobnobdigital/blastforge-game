export class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain!: GainNode;
  private musicGain!: GainNode;
  private sfxGain!: GainNode;
  private uiGain!: GainNode;

  constructor() {
    // Defer creation until user gesture
  }

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.musicGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();
      this.uiGain = this.ctx.createGain();

      this.musicGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.uiGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  setMusicVolume(v: number): void { this.ensureContext(); this.musicGain.gain.value = v; }
  setSfxVolume(v: number): void { this.ensureContext(); this.sfxGain.gain.value = v; }
  setUiVolume(v: number): void { this.ensureContext(); this.uiGain.gain.value = v; }

  playSfx(frequency = 440, duration = 0.1): void {
    const ctx = this.ensureContext();
    const osc = ctx.createOscillator();
    osc.frequency.value = frequency;
    osc.type = 'square';
    osc.connect(this.sfxGain);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  playExplosion(): void { this.playSfx(80, 0.3); }
  playBombPlace(): void { this.playSfx(200, 0.05); }
  playPowerUp(): void { this.playSfx(880, 0.15); }
}
