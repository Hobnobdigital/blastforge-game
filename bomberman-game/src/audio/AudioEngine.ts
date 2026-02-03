import { Howl, Howler } from 'howler';

interface SoundMap {
  [key: string]: Howl;
}

export class AudioEngine {
  private sounds: SoundMap = {};
  private music: Howl | null = null;
  private currentMusicTrack: string | null = null;
  
  private masterVolume = 1.0;
  private musicVolume = 0.5;
  private sfxVolume = 0.7;
  private uiVolume = 0.8;
  
  private isInitialized = false;
  private muted = false;
  
  // Web Audio context for procedural sounds
  private audioContext: AudioContext | null = null;
  private activeTicks: Map<number, { interval: number; timeout: number }> = new Map();
  private tickIdCounter = 0;

  // Sound file paths
  private readonly soundPaths = {
    // Music
    'music-menu': '/audio/music-menu.mp3',
    'music-gameplay': '/audio/music-gameplay.mp3',
    'music-level-1': '/audio/music-level-1.mp3',
    'music-level-2': '/audio/music-level-2.mp3',
    'music-level-3': '/audio/music-level-3.mp3',
    'music-level-4': '/audio/music-level-4.mp3', // O'Kenneth - YIMAYƐ
    
    // SFX
    'sfx-bomb-place': '/audio/sfx-bomb-place.mp3',
    'sfx-explosion': '/audio/sfx-explosion.mp3',
    'sfx-fuse': '/audio/sfx-bomb-place.mp3', // Reuse bomb place for fuse ticking
    'sfx-powerup': '/audio/sfx-powerup.mp3',
    'sfx-enemy-death': '/audio/sfx-enemy-death.mp3',
    'sfx-player-damage': '/audio/sfx-player-damage.mp3',
    'sfx-victory': '/audio/sfx-victory.mp3',
    'sfx-defeat': '/audio/sfx-defeat.mp3',
    
    // Voice Affirmations
    'voice-im-the-man': '/audio/voice-im-the-man.mp3',
    'voice-get-outta-here': '/audio/voice-get-outta-here.mp3',
    'voice-boom': '/audio/voice-boom.mp3',
    'voice-no-mercy': '/audio/voice-no-mercy.mp3',
    
    // Level transition sounds
    'sfx-level-complete': '/audio/sfx-victory.mp3', // Reuse victory for level complete
    'sfx-level-start': '/audio/sfx-powerup.mp3', // Reuse powerup for level start
  };

  constructor() {
    // Defer initialization until first user interaction
  }

  /**
   * Initialize the audio engine - call this after user gesture
   */
  initialize(): void {
    if (this.isInitialized) return;
    
    this.loadAllSounds();
    this.isInitialized = true;
    console.log('[AudioEngine] Initialized');
  }

  /**
   * Load all sound effects
   */
  private loadAllSounds(): void {
    Object.entries(this.soundPaths).forEach(([key, path]) => {
      if (key.startsWith('music-')) {
        // Music tracks are loaded on demand
        return;
      }
      
      this.sounds[key] = new Howl({
        src: [path],
        volume: this.sfxVolume * this.masterVolume,
        preload: true,
        html5: false,
        onloaderror: (_id, err) => {
          console.warn(`[AudioEngine] Failed to load sound: ${key}`, err);
        },
      });
    });
  }

  /**
   * Play a sound effect
   */
  private playSound(key: string): void {
    if (!this.isInitialized) {
      this.initialize();
    }
    
    if (this.muted) return;
    
    const sound = this.sounds[key];
    if (sound) {
      sound.volume(this.sfxVolume * this.masterVolume);
      sound.play();
    } else {
      console.warn(`[AudioEngine] Sound not found: ${key}`);
    }
  }

  /**
   * Play menu music
   */
  playMenuMusic(): void {
    this.playMusicTrack('music-menu');
  }

  /**
   * Play gameplay music
   */
  playGameplayMusic(): void {
    this.playMusicTrack('music-gameplay');
  }

  /**
   * Play level-specific music
   */
  playLevelMusic(levelId: number): void {
    // Cycle through all 4 tracks based on level
    const trackNum = ((levelId - 1) % 4) + 1;
    const trackKey = `music-level-${trackNum}` as const;
    this.playMusicTrack(trackKey);
  }

  /**
   * Play a music track
   */
  private playMusicTrack(trackKey: string): void {
    if (!this.isInitialized) {
      this.initialize();
    }
    
    // Don't restart if already playing
    if (this.currentMusicTrack === trackKey && this.music?.playing()) {
      return;
    }

    // Stop current music
    this.stopMusic();

    const path = this.soundPaths[trackKey as keyof typeof this.soundPaths];
    if (!path) {
      console.warn(`[AudioEngine] Music track not found: ${trackKey}`);
      return;
    }

    this.music = new Howl({
      src: [path],
      volume: this.musicVolume * this.masterVolume,
      loop: true,
      html5: true, // Use HTML5 Audio for music (better for larger files)
      onloaderror: (_id, err) => {
        console.warn(`[AudioEngine] Failed to load music: ${trackKey}`, err);
      },
    });

    if (!this.muted) {
      this.music.play();
    }
    
    this.currentMusicTrack = trackKey;
  }

  /**
   * Stop all music
   */
  stopMusic(): void {
    if (this.music) {
      this.music.stop();
      this.music.unload();
      this.music = null;
    }
    this.currentMusicTrack = null;
  }

  /**
   * Pause music
   */
  pauseMusic(): void {
    if (this.music) {
      this.music.pause();
    }
  }

  /**
   * Resume music
   */
  resumeMusic(): void {
    if (this.music && !this.muted) {
      this.music.play();
    }
  }

  // ── SFX Methods ──

  playBombPlace(): void {
    this.playSound('sfx-bomb-place');
  }

  playExplosion(): void {
    // Play explosion at higher volume
    if (!this.isInitialized) {
      this.initialize();
    }
    
    if (this.muted) return;
    
    const sound = this.sounds['sfx-explosion'];
    if (sound) {
      sound.volume(Math.min(1.0, this.sfxVolume * this.masterVolume * 1.5)); // 50% louder
      sound.play();
    }
  }

  /**
   * Play fuse ticking sound (louder) - starts continuous ticking
   * Returns a tick ID that can be used to stop the ticking
   */
  playFuseTick(): number {
    if (!this.isInitialized) {
      this.initialize();
    }
    
    if (this.muted) return -1;
    
    // Initialize audio context if needed
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const tickId = ++this.tickIdCounter;
    
    // Play immediate tick
    this.playProceduralTick(1.0);
    
    // Start continuous ticking that speeds up
    let tickSpeed = 300; // Start at 300ms between ticks
    let tickCount = 0;
    
    const doTick = () => {
      if (!this.activeTicks.has(tickId)) return;
      
      tickCount++;
      // Speed up ticking as bomb nears explosion
      const urgency = Math.min(tickCount / 10, 1.5);
      this.playProceduralTick(0.6 + urgency * 0.4);
      
      // Accelerate tick rate
      tickSpeed = Math.max(80, tickSpeed * 0.85);
      
      const nextTimeout = window.setTimeout(doTick, tickSpeed);
      this.activeTicks.set(tickId, { 
        interval: this.activeTicks.get(tickId)?.interval || 0, 
        timeout: nextTimeout 
      });
    };
    
    const timeout = window.setTimeout(doTick, tickSpeed);
    this.activeTicks.set(tickId, { interval: 0, timeout });
    
    // Auto-stop after 3 seconds (bomb explodes)
    window.setTimeout(() => this.stopFuseTick(tickId), 3000);
    
    return tickId;
  }
  
  /**
   * Stop a specific fuse tick
   */
  stopFuseTick(tickId: number): void {
    const tick = this.activeTicks.get(tickId);
    if (tick) {
      window.clearTimeout(tick.timeout);
      window.clearInterval(tick.interval);
      this.activeTicks.delete(tickId);
    }
  }
  
  /**
   * Stop all fuse ticks
   */
  stopAllFuseTicks(): void {
    this.activeTicks.forEach((tick, id) => {
      window.clearTimeout(tick.timeout);
      window.clearInterval(tick.interval);
    });
    this.activeTicks.clear();
  }
  
  /**
   * Play a single procedural tick sound using Web Audio API
   */
  private playProceduralTick(volume: number = 1.0): void {
    if (!this.audioContext || this.muted) return;
    
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    
    // Resume context if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    // Create oscillator for the tick click
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filterNode = ctx.createBiquadFilter();
    
    // Sharp click sound
    osc.type = 'square';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
    
    // Filter for metallic quality
    filterNode.type = 'bandpass';
    filterNode.frequency.setValueAtTime(2000, now);
    filterNode.Q.setValueAtTime(5, now);
    
    // Sharp attack, quick decay
    const actualVolume = volume * this.sfxVolume * this.masterVolume * 0.4;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(actualVolume, now + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    
    // Connect: osc -> filter -> gain -> output
    osc.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.1);
    
    // Add a lower "thud" for more presence
    const thudOsc = ctx.createOscillator();
    const thudGain = ctx.createGain();
    
    thudOsc.type = 'sine';
    thudOsc.frequency.setValueAtTime(80, now);
    thudOsc.frequency.exponentialRampToValueAtTime(40, now + 0.05);
    
    thudGain.gain.setValueAtTime(actualVolume * 0.8, now);
    thudGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    thudOsc.connect(thudGain);
    thudGain.connect(ctx.destination);
    
    thudOsc.start(now);
    thudOsc.stop(now + 0.15);
  }

  playPowerUp(): void {
    this.playSound('sfx-powerup');
  }

  playEnemyDeath(): void {
    this.playSound('sfx-enemy-death');
  }

  playPlayerDamage(): void {
    this.playSound('sfx-player-damage');
  }

  playVictory(): void {
    this.playSound('sfx-victory');
  }

  playDefeat(): void {
    this.playSound('sfx-defeat');
  }
  
  /**
   * Play level complete celebration sound (LOUD!)
   */
  playLevelComplete(): void {
    if (!this.isInitialized) {
      this.initialize();
    }
    
    if (this.muted) return;
    
    const sound = this.sounds['sfx-level-complete'];
    if (sound) {
      sound.volume(Math.min(1.0, this.sfxVolume * this.masterVolume * 1.8)); // Much louder!
      sound.play();
    }
  }
  
  /**
   * Play level start fanfare
   */
  playLevelStart(): void {
    if (!this.isInitialized) {
      this.initialize();
    }
    
    if (this.muted) return;
    
    const sound = this.sounds['sfx-level-start'];
    if (sound) {
      sound.volume(Math.min(1.0, this.sfxVolume * this.masterVolume * 1.3));
      sound.play();
    }
  }

  /**
   * Play UI sound effect
   */
  playSoundEffect(soundName: string): void {
    // For now, use a generic UI sound or bomb place as fallback
    if (soundName === 'ui-select') {
      this.playSound('sfx-bomb-place');
    } else {
      this.playSound(soundName);
    }
  }

  // ── Voice Affirmations ──

  private voiceAffirmations = [
    'voice-im-the-man',
    'voice-get-outta-here',
    'voice-boom',
    'voice-no-mercy',
  ];

  /**
   * Play a random voice affirmation
   * 30% chance to play when bricks are destroyed
   */
  playRandomAffirmation(): void {
    if (!this.isInitialized) {
      this.initialize();
    }

    if (this.muted) return;

    // 30% chance to play
    if (Math.random() > 0.3) return;

    const randomIndex = Math.floor(Math.random() * this.voiceAffirmations.length);
    const voiceKey = this.voiceAffirmations[randomIndex];

    const sound = this.sounds[voiceKey];
    if (sound) {
      sound.volume(Math.min(1.0, this.sfxVolume * this.masterVolume * 1.2)); // Slightly louder
      sound.play();
    }
  }

  // ── Volume Controls ──

  /**
   * Set master volume (0.0 - 1.0)
   */
  setMasterVolume(value: number): void {
    this.masterVolume = Math.max(0, Math.min(1, value));
    Howler.volume(this.masterVolume);
    this.updateAllVolumes();
  }

  /**
   * Set music volume (0.0 - 1.0)
   */
  setMusicVolume(value: number): void {
    this.musicVolume = Math.max(0, Math.min(1, value));
    if (this.music) {
      this.music.volume(this.musicVolume * this.masterVolume);
    }
  }

  /**
   * Set SFX volume (0.0 - 1.0)
   */
  setSfxVolume(value: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, value));
    Object.values(this.sounds).forEach(sound => {
      sound.volume(this.sfxVolume * this.masterVolume);
    });
  }

  /**
   * Set UI volume (0.0 - 1.0)
   */
  setUiVolume(value: number): void {
    this.uiVolume = Math.max(0, Math.min(1, value));
    // UI sounds use SFX volume for now
  }

  /**
   * Update all sound volumes
   */
  private updateAllVolumes(): void {
    this.setMusicVolume(this.musicVolume);
    this.setSfxVolume(this.sfxVolume);
  }

  /**
   * Get current volume settings
   */
  getVolumes(): { master: number; music: number; sfx: number; ui: number } {
    return {
      master: this.masterVolume,
      music: this.musicVolume,
      sfx: this.sfxVolume,
      ui: this.uiVolume,
    };
  }

  /**
   * Mute all audio
   */
  mute(): void {
    this.muted = true;
    Howler.mute(true);
  }

  /**
   * Unmute all audio
   */
  unmute(): void {
    this.muted = false;
    Howler.mute(false);
  }

  /**
   * Toggle mute state
   */
  toggleMute(): boolean {
    if (this.muted) {
      this.unmute();
    } else {
      this.mute();
    }
    return this.muted;
  }

  /**
   * Check if audio is muted
   */
  isMuted(): boolean {
    return this.muted;
  }

  /**
   * Legacy method for backward compatibility
   * @deprecated Use playSfx with specific sound methods instead
   */
  playSfx(frequency = 440, duration = 0.1): void {
    // Fallback to synthesized sound if no MP3 is available
    if (!this.isInitialized) {
      this.playTone(frequency, duration);
    }
  }

  /**
   * Play a synthesized tone (fallback)
   */
  private playTone(frequency: number, duration: number): void {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.frequency.value = frequency;
      osc.type = 'square';
      
      gain.gain.setValueAtTime(0.1 * this.sfxVolume * this.masterVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('[AudioEngine] Web Audio API not available');
    }
  }

  /**
   * Check if audio is supported
   */
  isSupported(): boolean {
    return Howler.codecs('mp3');
  }

  /**
   * Preload all sounds
   */
  preload(): void {
    if (!this.isInitialized) {
      this.initialize();
    }
  }
}

// Singleton instance
export const audioEngine = new AudioEngine();
