export class AudioEngine {
    ctx = null;
    masterGain;
    musicGain;
    sfxGain;
    uiGain;
    constructor() {
        // Defer creation until user gesture
    }
    ensureContext() {
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
    setMusicVolume(v) { this.ensureContext(); this.musicGain.gain.value = v; }
    setSfxVolume(v) { this.ensureContext(); this.sfxGain.gain.value = v; }
    setUiVolume(v) { this.ensureContext(); this.uiGain.gain.value = v; }
    playSfx(frequency = 440, duration = 0.1) {
        const ctx = this.ensureContext();
        const osc = ctx.createOscillator();
        osc.frequency.value = frequency;
        osc.type = 'square';
        osc.connect(this.sfxGain);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    }
    playExplosion() { this.playSfx(80, 0.3); }
    playBombPlace() { this.playSfx(200, 0.05); }
    playPowerUp() { this.playSfx(880, 0.15); }
}
//# sourceMappingURL=AudioEngine.js.map