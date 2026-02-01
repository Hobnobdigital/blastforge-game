/**
 * AudioManager - Complete Audio System for BLASTFORGE
 *
 * Features:
 * - ElevenLabs-generated SFX integration
 * - Audio pooling for performance
 * - Spatial audio with distance/panning
 * - Volume control (Master/Music/SFX/UI)
 * - Fuse ticking with variable rates (Prime/Rush/Normal)
 * - Dynamic mixing and priority system
 */
import { Howl, Howler } from 'howler';
// Audio categories for volume control
export var AudioCategory;
(function (AudioCategory) {
    AudioCategory["MASTER"] = "master";
    AudioCategory["MUSIC"] = "music";
    AudioCategory["SFX"] = "sfx";
    AudioCategory["UI"] = "ui";
})(AudioCategory || (AudioCategory = {}));
// Sound effect names
export var SoundEffect;
(function (SoundEffect) {
    // Explosions
    SoundEffect["EXPLOSION_SMALL"] = "explosion_small";
    SoundEffect["EXPLOSION_MEDIUM"] = "explosion_medium";
    SoundEffect["EXPLOSION_LARGE"] = "explosion_large";
    SoundEffect["EXPLOSION_CHAIN"] = "explosion_chain";
    // Bombs
    SoundEffect["BOMB_PLACE"] = "bomb_place";
    SoundEffect["FUSE_TICK_NORMAL"] = "fuse_tick_normal";
    SoundEffect["FUSE_TICK_PRIMED"] = "fuse_tick_primed";
    SoundEffect["FUSE_TICK_RUSHED"] = "fuse_tick_rushed";
    SoundEffect["FUSE_PRIME"] = "fuse_prime";
    SoundEffect["FUSE_RUSH"] = "fuse_rush";
    SoundEffect["FUSE_DETONATE"] = "fuse_detonate";
    // Power-ups
    SoundEffect["POWERUP_COLLECT"] = "powerup_collect";
    SoundEffect["POWERUP_SPAWN"] = "powerup_spawn";
    SoundEffect["POWERUP_RARE"] = "powerup_rare";
    // Player
    SoundEffect["PLAYER_DEATH"] = "player_death";
    SoundEffect["PLAYER_RESPAWN"] = "player_respawn";
    SoundEffect["PLAYER_HIT"] = "player_hit";
    SoundEffect["FOOTSTEP"] = "footstep";
    // Environment
    SoundEffect["BLOCK_BREAK"] = "block_break";
    // UI
    SoundEffect["UI_CLICK"] = "ui_click";
    SoundEffect["UI_HOVER"] = "ui_hover";
    SoundEffect["UI_BACK"] = "ui_back";
    SoundEffect["UI_NOTIFICATION"] = "ui_notification";
    SoundEffect["COUNTDOWN"] = "countdown";
    SoundEffect["VICTORY"] = "victory";
    SoundEffect["DEFEAT"] = "defeat";
})(SoundEffect || (SoundEffect = {}));
// Music tracks
export var MusicTrack;
(function (MusicTrack) {
    MusicTrack["MENU"] = "menu_theme";
    MusicTrack["GAMEPLAY"] = "gameplay_main";
    MusicTrack["INTENSE"] = "gameplay_intense";
    MusicTrack["VICTORY"] = "victory_jingle";
    MusicTrack["DEFEAT"] = "defeat_sound";
})(MusicTrack || (MusicTrack = {}));
// Default spatial audio settings
const DEFAULT_SPATIAL = {
    maxDistance: 15,
    minDistance: 3,
    rollOff: 'exponential'
};
// Pool sizes for different sound types
const POOL_SIZES = {
    [SoundEffect.EXPLOSION_SMALL]: 4,
    [SoundEffect.EXPLOSION_MEDIUM]: 4,
    [SoundEffect.EXPLOSION_LARGE]: 3,
    [SoundEffect.BOMB_PLACE]: 4,
    [SoundEffect.FUSE_TICK_NORMAL]: 8,
    [SoundEffect.FUSE_TICK_PRIMED]: 4,
    [SoundEffect.FUSE_TICK_RUSHED]: 4,
    [SoundEffect.POWERUP_COLLECT]: 4,
    [SoundEffect.BLOCK_BREAK]: 4,
    [SoundEffect.FOOTSTEP]: 8
};
export class AudioManager {
    static instance;
    // Volume settings (0.0 - 1.0)
    volumes = {
        [AudioCategory.MASTER]: 1.0,
        [AudioCategory.MUSIC]: 0.7,
        [AudioCategory.SFX]: 0.8,
        [AudioCategory.UI]: 0.5
    };
    // Sound pools for performance
    soundPools = new Map();
    // Loaded sounds
    sounds = new Map();
    music = new Map();
    // Active fuses for tick sound management
    activeFuses = new Map();
    // Currently playing music
    currentMusic = null;
    currentMusicTrack = null;
    // Audio context state
    initialized = false;
    muted = false;
    // Base path for audio assets
    basePath;
    // Listener position for spatial audio
    listenerPos = { x: 0, y: 0, z: 0 };
    // Simultaneous sound limits
    activeSounds = new Map([
        [AudioCategory.SFX, 0],
        [AudioCategory.UI, 0]
    ]);
    maxSimultaneous = {
        [AudioCategory.MASTER]: Infinity,
        [AudioCategory.MUSIC]: 1,
        [AudioCategory.SFX]: 16,
        [AudioCategory.UI]: 4
    };
    constructor(basePath = '/assets/audio/') {
        this.basePath = basePath;
        this.initializePools();
    }
    static getInstance(basePath) {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager(basePath);
        }
        return AudioManager.instance;
    }
    /**
     * Initialize audio after user interaction (required for mobile)
     */
    async initialize() {
        if (this.initialized)
            return;
        // Resume audio context (needed for mobile)
        if (Howler.ctx && Howler.ctx.state === 'suspended') {
            await Howler.ctx.resume();
        }
        // Load all sounds
        await this.loadAllSounds();
        this.initialized = true;
        console.log('[AudioManager] Initialized successfully');
    }
    /**
     * Set up sound pools for frequently used sounds
     */
    initializePools() {
        for (const [effect, size] of Object.entries(POOL_SIZES)) {
            this.soundPools.set(effect, []);
        }
    }
    /**
     * Load all audio assets
     */
    async loadAllSounds() {
        const soundDefinitions = [
            // Explosions
            { effect: SoundEffect.EXPLOSION_SMALL, file: 'sfx/explosion_small.mp3', category: AudioCategory.SFX, poolSize: 4 },
            { effect: SoundEffect.EXPLOSION_MEDIUM, file: 'sfx/explosion_medium.mp3', category: AudioCategory.SFX, poolSize: 4 },
            { effect: SoundEffect.EXPLOSION_LARGE, file: 'sfx/explosion_large.mp3', category: AudioCategory.SFX, poolSize: 3 },
            // Bombs
            { effect: SoundEffect.BOMB_PLACE, file: 'sfx/bomb_place.mp3', category: AudioCategory.SFX, poolSize: 4 },
            { effect: SoundEffect.FUSE_TICK_NORMAL, file: 'sfx/fuse_tick_normal.mp3', category: AudioCategory.SFX, poolSize: 8 },
            { effect: SoundEffect.FUSE_TICK_PRIMED, file: 'sfx/fuse_tick_primed.mp3', category: AudioCategory.SFX, poolSize: 4 },
            { effect: SoundEffect.FUSE_TICK_RUSHED, file: 'sfx/fuse_tick_rushed.mp3', category: AudioCategory.SFX, poolSize: 4 },
            { effect: SoundEffect.FUSE_PRIME, file: 'sfx/fuse_prime.mp3', category: AudioCategory.SFX },
            { effect: SoundEffect.FUSE_RUSH, file: 'sfx/fuse_rush.mp3', category: AudioCategory.SFX },
            { effect: SoundEffect.FUSE_DETONATE, file: 'sfx/fuse_detonate.mp3', category: AudioCategory.SFX },
            // Power-ups
            { effect: SoundEffect.POWERUP_COLLECT, file: 'sfx/powerup_collect.mp3', category: AudioCategory.SFX },
            { effect: SoundEffect.POWERUP_SPAWN, file: 'sfx/powerup_spawn.mp3', category: AudioCategory.SFX },
            // Player
            { effect: SoundEffect.PLAYER_DEATH, file: 'sfx/death.mp3', category: AudioCategory.SFX },
            { effect: SoundEffect.PLAYER_RESPAWN, file: 'sfx/respawn.mp3', category: AudioCategory.SFX },
            { effect: SoundEffect.FOOTSTEP, file: 'sfx/footstep.mp3', category: AudioCategory.SFX, poolSize: 8 },
            // UI
            { effect: SoundEffect.UI_CLICK, file: 'ui/menu_click.mp3', category: AudioCategory.UI },
            { effect: SoundEffect.UI_HOVER, file: 'ui/menu_hover.mp3', category: AudioCategory.UI },
            { effect: SoundEffect.VICTORY, file: 'ui/victory.mp3', category: AudioCategory.MUSIC },
            { effect: SoundEffect.DEFEAT, file: 'ui/defeat.mp3', category: AudioCategory.MUSIC }
        ];
        const loadPromises = soundDefinitions.map(def => this.loadSound(def));
        await Promise.all(loadPromises);
        // Load music tracks
        await this.loadMusic();
    }
    /**
     * Load a single sound effect
     */
    loadSound(def) {
        return new Promise((resolve, reject) => {
            const howl = new Howl({
                src: [`${this.basePath}${def.file}`],
                volume: this.getFinalVolume(def.category),
                pool: def.poolSize || 1,
                onload: () => {
                    this.sounds.set(def.effect, howl);
                    resolve();
                },
                onloaderror: (_id, err) => {
                    console.warn(`[AudioManager] Failed to load ${def.file}:`, err);
                    resolve(); // Resolve anyway to not block other sounds
                }
            });
        });
    }
    /**
     * Load music tracks
     */
    async loadMusic() {
        const musicDefinitions = [
            { track: MusicTrack.MENU, file: 'music/menu_theme.mp3' },
            { track: MusicTrack.GAMEPLAY, file: 'music/gameplay_main.mp3' },
            { track: MusicTrack.INTENSE, file: 'music/gameplay_intense.mp3' },
            { track: MusicTrack.VICTORY, file: 'music/victory_jingle.mp3' },
            { track: MusicTrack.DEFEAT, file: 'music/defeat_sound.mp3' }
        ];
        const loadPromises = musicDefinitions.map(def => {
            return new Promise((resolve) => {
                const howl = new Howl({
                    src: [`${this.basePath}${def.file}`],
                    volume: this.getFinalVolume(AudioCategory.MUSIC),
                    loop: def.track !== MusicTrack.VICTORY && def.track !== MusicTrack.DEFEAT,
                    onload: () => {
                        this.music.set(def.track, howl);
                        resolve();
                    },
                    onloaderror: () => {
                        console.warn(`[AudioManager] Failed to load music: ${def.file}`);
                        resolve();
                    }
                });
            });
        });
        await Promise.all(loadPromises);
    }
    /**
     * Calculate final volume based on category and master
     */
    getFinalVolume(category) {
        if (category === AudioCategory.MASTER) {
            return this.muted ? 0 : this.volumes[AudioCategory.MASTER];
        }
        return this.muted ? 0 : this.volumes[AudioCategory.MASTER] * this.volumes[category];
    }
    /**
     * Set volume for a category
     */
    setVolume(category, volume) {
        this.volumes[category] = Math.max(0, Math.min(1, volume));
        // Update Howler global volume for master
        if (category === AudioCategory.MASTER) {
            Howler.volume(this.volumes[AudioCategory.MASTER]);
        }
        // Update all sounds in category
        this.updateCategoryVolumes();
    }
    /**
     * Update volumes for all loaded sounds
     */
    updateCategoryVolumes() {
        // Update music
        for (const [track, howl] of this.music) {
            howl.volume(this.getFinalVolume(AudioCategory.MUSIC));
        }
        // Update SFX (they use category volume at play time)
        for (const [effect, howl] of this.sounds) {
            const category = this.getCategoryForEffect(effect);
            howl.volume(this.getFinalVolume(category));
        }
    }
    /**
     * Get category for a sound effect
     */
    getCategoryForEffect(effect) {
        if (effect === SoundEffect.VICTORY || effect === SoundEffect.DEFEAT) {
            return AudioCategory.MUSIC;
        }
        if (effect.startsWith('ui_') || effect === 'countdown') {
            return AudioCategory.UI;
        }
        return AudioCategory.SFX;
    }
    /**
     * Play a sound effect with optional spatial positioning
     */
    play(effect, position, spatialConfig = {}) {
        if (!this.initialized) {
            console.warn('[AudioManager] Not initialized, call initialize() first');
            return null;
        }
        const howl = this.sounds.get(effect);
        if (!howl) {
            console.warn(`[AudioManager] Sound not loaded: ${effect}`);
            return null;
        }
        const category = this.getCategoryForEffect(effect);
        // Check simultaneous sound limits
        if (this.isAtLimit(category)) {
            return null;
        }
        // Calculate spatial audio parameters
        let volume = this.getFinalVolume(category);
        let pan = 0;
        if (position) {
            const spatial = { ...DEFAULT_SPATIAL, ...spatialConfig };
            const distance = this.calculateDistance(position);
            // Calculate volume based on distance
            if (distance > spatial.maxDistance) {
                return null; // Too far to hear
            }
            const distanceFactor = Math.max(0, 1 - (distance / spatial.maxDistance));
            volume *= distanceFactor;
            // Calculate stereo pan
            pan = this.calculatePan(position);
        }
        // Play the sound
        howl.volume(volume);
        howl.stereo(pan);
        const id = howl.play();
        // Track active sounds
        this.trackActiveSound(category, true);
        howl.once('end', () => {
            this.trackActiveSound(category, false);
        }, id);
        return id;
    }
    /**
     * Calculate distance from listener to sound source
     */
    calculateDistance(position) {
        const dx = position.x - this.listenerPos.x;
        const dy = position.y - this.listenerPos.y;
        const dz = (position.z || 0) - this.listenerPos.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    /**
     * Calculate stereo pan (-1 left to +1 right)
     */
    calculatePan(position) {
        const dx = position.x - this.listenerPos.x;
        const dy = position.y - this.listenerPos.y;
        const angle = Math.atan2(dy, dx);
        return Math.sin(angle);
    }
    /**
     * Check if we've hit the simultaneous sound limit
     */
    isAtLimit(category) {
        const current = this.activeSounds.get(category) || 0;
        return current >= this.maxSimultaneous[category];
    }
    /**
     * Track active sound count
     */
    trackActiveSound(category, increment) {
        const current = this.activeSounds.get(category) || 0;
        this.activeSounds.set(category, Math.max(0, current + (increment ? 1 : -1)));
    }
    /**
     * Set listener position for spatial audio
     */
    setListenerPosition(x, y, z = 0) {
        this.listenerPos = { x, y, z };
    }
    /**
     * Start playing a bomb's fuse ticking sound
     */
    startFuseTick(bombId, isPrimed = false, isRushed = false) {
        // Stop existing fuse sound for this bomb
        this.stopFuseTick(bombId);
        let effect;
        if (isPrimed) {
            effect = SoundEffect.FUSE_TICK_PRIMED;
        }
        else if (isRushed) {
            effect = SoundEffect.FUSE_TICK_RUSHED;
        }
        else {
            effect = SoundEffect.FUSE_TICK_NORMAL;
        }
        const howl = this.sounds.get(effect);
        if (!howl)
            return;
        // Play looping fuse sound
        const soundId = howl.play();
        howl.loop(true, soundId);
        const fuse = {
            bombId,
            soundId,
            isPrimed,
            isRushed,
            remainingTime: isPrimed ? 4.5 : isRushed ? 1.5 : 3.0,
            totalTime: isPrimed ? 4.5 : isRushed ? 1.5 : 3.0
        };
        this.activeFuses.set(bombId, fuse);
    }
    /**
     * Update fuse ticking (call in game loop)
     */
    updateFuseTick(bombId, remainingTime, isPrimed, isRushed) {
        const fuse = this.activeFuses.get(bombId);
        if (!fuse)
            return;
        // Check if fuse state changed
        if (fuse.isPrimed !== isPrimed || fuse.isRushed !== isRushed) {
            // State changed, restart with new sound
            this.stopFuseTick(bombId);
            this.startFuseTick(bombId, isPrimed, isRushed);
            return;
        }
        fuse.remainingTime = remainingTime;
    }
    /**
     * Stop a bomb's fuse ticking sound
     */
    stopFuseTick(bombId) {
        const fuse = this.activeFuses.get(bombId);
        if (!fuse)
            return;
        const effect = fuse.isPrimed
            ? SoundEffect.FUSE_TICK_PRIMED
            : fuse.isRushed
                ? SoundEffect.FUSE_TICK_RUSHED
                : SoundEffect.FUSE_TICK_NORMAL;
        const howl = this.sounds.get(effect);
        if (howl) {
            howl.stop(fuse.soundId);
        }
        this.activeFuses.delete(bombId);
    }
    /**
     * Stop all fuse ticking sounds
     */
    stopAllFuseTicks() {
        for (const bombId of this.activeFuses.keys()) {
            this.stopFuseTick(bombId);
        }
    }
    /**
     * Play fuse manipulation sounds
     */
    playFusePrime() {
        this.play(SoundEffect.FUSE_PRIME);
    }
    playFuseRush() {
        this.play(SoundEffect.FUSE_RUSH);
    }
    playFuseDetonate() {
        this.play(SoundEffect.FUSE_DETONATE);
    }
    /**
     * Play explosion with intensity based on range
     */
    playExplosion(range, position) {
        let effect;
        if (range <= 2) {
            effect = SoundEffect.EXPLOSION_SMALL;
        }
        else if (range <= 4) {
            effect = SoundEffect.EXPLOSION_MEDIUM;
        }
        else {
            effect = SoundEffect.EXPLOSION_LARGE;
        }
        this.play(effect, position);
    }
    /**
     * Play bomb placement sound
     */
    playBombPlace(position) {
        this.play(SoundEffect.BOMB_PLACE, position);
    }
    /**
     * Play power-up collection sound
     */
    playPowerUpCollect(isRare = false) {
        this.play(isRare ? SoundEffect.POWERUP_RARE : SoundEffect.POWERUP_COLLECT);
    }
    /**
     * Play power-up spawn sound
     */
    playPowerUpSpawn() {
        this.play(SoundEffect.POWERUP_SPAWN);
    }
    /**
     * Play player death sound
     */
    playPlayerDeath() {
        this.play(SoundEffect.PLAYER_DEATH);
    }
    /**
     * Play player respawn sound
     */
    playPlayerRespawn() {
        this.play(SoundEffect.PLAYER_RESPAWN);
    }
    /**
     * Play footstep sound
     */
    playFootstep(position) {
        this.play(SoundEffect.FOOTSTEP, position, { maxDistance: 8 });
    }
    /**
     * Play UI click sound
     */
    playUIClick() {
        this.play(SoundEffect.UI_CLICK);
    }
    /**
     * Play UI hover sound
     */
    playUIHover() {
        this.play(SoundEffect.UI_HOVER);
    }
    /**
     * Play victory jingle
     */
    playVictory() {
        this.stopMusic();
        this.play(SoundEffect.VICTORY);
    }
    /**
     * Play defeat sound
     */
    playDefeat() {
        this.stopMusic();
        this.play(SoundEffect.DEFEAT);
    }
    /**
     * Play music track
     */
    playMusic(track, fadeDuration = 2000) {
        const howl = this.music.get(track);
        if (!howl) {
            console.warn(`[AudioManager] Music track not loaded: ${track}`);
            return;
        }
        // Crossfade if music is already playing
        if (this.currentMusic && this.currentMusic.playing()) {
            this.crossfade(this.currentMusic, howl, fadeDuration);
        }
        else {
            howl.volume(this.getFinalVolume(AudioCategory.MUSIC));
            howl.play();
        }
        this.currentMusic = howl;
        this.currentMusicTrack = track;
    }
    /**
     * Stop current music
     */
    stopMusic(fadeDuration = 1000) {
        if (this.currentMusic) {
            this.currentMusic.fade(this.currentMusic.volume(), 0, fadeDuration);
            setTimeout(() => {
                this.currentMusic?.stop();
            }, fadeDuration);
            this.currentMusic = null;
            this.currentMusicTrack = null;
        }
    }
    /**
     * Crossfade between two music tracks
     */
    crossfade(from, to, duration) {
        const fromVolume = from.volume();
        const toVolume = this.getFinalVolume(AudioCategory.MUSIC);
        from.fade(fromVolume, 0, duration);
        to.volume(0);
        to.play();
        to.fade(0, toVolume, duration);
        setTimeout(() => {
            from.stop();
        }, duration);
    }
    /**
     * Pause all audio
     */
    pause() {
        Howler.pause();
    }
    /**
     * Resume all audio
     */
    resume() {
        Howler.resume();
    }
    /**
     * Mute/unmute all audio
     */
    setMute(muted) {
        this.muted = muted;
        Howler.mute(muted);
    }
    /**
     * Check if audio is muted
     */
    isMuted() {
        return this.muted;
    }
    /**
     * Stop all sounds
     */
    stopAll() {
        Howler.stop();
        this.activeFuses.clear();
        this.activeSounds.set(AudioCategory.SFX, 0);
        this.activeSounds.set(AudioCategory.UI, 0);
    }
    /**
     * Get current volume for a category
     */
    getVolume(category) {
        return this.volumes[category];
    }
    /**
     * Check if a sound is currently playing
     */
    isPlaying(effect) {
        const howl = this.sounds.get(effect);
        return howl ? howl.playing() : false;
    }
    /**
     * Check if music is currently playing
     */
    isMusicPlaying() {
        return this.currentMusic ? this.currentMusic.playing() : false;
    }
    /**
     * Get currently playing music track
     */
    getCurrentMusicTrack() {
        return this.currentMusicTrack;
    }
}
// Export singleton instance
export const audioManager = AudioManager.getInstance();
// Export for easy importing
export default AudioManager;
//# sourceMappingURL=AudioManager.js.map