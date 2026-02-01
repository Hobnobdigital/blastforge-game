# Audio Implementation Guide for Developer
**3D Bomberman Game - Audio System**

---

## 🎯 Quick Start

### 1. Recommended Audio Library: Howler.js

```bash
npm install howler
```

**Why Howler.js:**
- Automatic fallback between OGG/MP3
- Built-in spatial audio (3D/stereo panning)
- Sound sprite support (multiple sounds in one file)
- Mobile audio handling built-in
- Volume control per sound
- Lightweight (~10KB gzipped)

### 2. Basic Setup

```javascript
import { Howl, Howler } from 'howler';

// Set master volume
Howler.volume(0.8);

// Create sound instance
const explosionSound = new Howl({
  src: ['assets/audio/sfx/explosion/explosion_01.ogg', 'assets/audio/sfx/explosion/explosion_01.mp3'],
  volume: 0.5,
  sprite: {
    explosion: [0, 2000] // start at 0ms, duration 2000ms
  }
});

// Play sound
explosionSound.play('explosion');
```

---

## 🔊 Complete Audio Manager Class

```javascript
class AudioManager {
  constructor() {
    this.sounds = {};
    this.music = {};
    this.volumes = {
      master: 1.0,
      music: 0.7,
      sfx: 0.8,
      ui: 0.5
    };
    
    this.currentMusic = null;
    this.initialized = false;
    
    // Bind user interaction to initialize audio on mobile
    this.bindInitialization();
  }
  
  bindInitialization() {
    const initAudio = () => {
      if (!this.initialized) {
        Howler.ctx?.resume();
        this.initialized = true;
        console.log('Audio system initialized');
      }
    };
    
    document.addEventListener('touchstart', initAudio, { once: true });
    document.addEventListener('click', initAudio, { once: true });
  }
  
  // Load all audio assets
  async loadAudio() {
    // Critical sounds - load first
    await this.loadSounds({
      // Bomb sounds
      bomb_place: ['assets/audio/sfx/bomb/bomb_place_01.ogg'],
      fuse_slow: ['assets/audio/sfx/bomb/fuse_burn_slow.ogg'],
      fuse_medium: ['assets/audio/sfx/bomb/fuse_burn_medium.ogg'],
      fuse_fast: ['assets/audio/sfx/bomb/fuse_burn_fast.ogg'],
      
      // Explosions
      explosion_1: ['assets/audio/sfx/explosion/explosion_01.ogg'],
      explosion_2: ['assets/audio/sfx/explosion/explosion_02.ogg'],
      explosion_3: ['assets/audio/sfx/explosion/explosion_03.ogg'],
      explosion_chain: ['assets/audio/sfx/explosion/explosion_chain_01.ogg'],
      
      // Environment
      block_break: ['assets/audio/sfx/environment/block_break_01.ogg'],
      
      // Power-ups
      powerup_collect: ['assets/audio/sfx/powerup/powerup_collect_01.ogg'],
      powerup_spawn: ['assets/audio/sfx/powerup/powerup_spawn.ogg'],
      
      // UI
      ui_click: ['assets/audio/ui/ui_click.ogg'],
      ui_hover: ['assets/audio/ui/ui_hover.ogg'],
    });
    
    // Music
    this.loadMusic({
      menu: ['assets/audio/music/menu_theme.ogg'],
      gameplay: ['assets/audio/music/gameplay_main.ogg'],
      gameplay_intense: ['assets/audio/music/gameplay_intense.ogg'],
      victory: ['assets/audio/music/victory_jingle.ogg'],
      defeat: ['assets/audio/music/defeat_sound.ogg'],
    });
    
    console.log('Audio loaded successfully');
  }
  
  loadSounds(soundList) {
    return Promise.all(
      Object.entries(soundList).map(([key, src]) => {
        return new Promise((resolve, reject) => {
          this.sounds[key] = new Howl({
            src: src,
            volume: this.volumes.sfx * this.volumes.master,
            onload: resolve,
            onloaderror: (id, error) => {
              console.error(`Failed to load sound: ${key}`, error);
              reject(error);
            }
          });
        });
      })
    );
  }
  
  loadMusic(musicList) {
    Object.entries(musicList).forEach(([key, src]) => {
      this.music[key] = new Howl({
        src: src,
        loop: key !== 'victory' && key !== 'defeat', // Don't loop stingers
        volume: this.volumes.music * this.volumes.master,
      });
    });
  }
  
  // Play sound effect with variations
  playSFX(soundName, options = {}) {
    const sound = this.sounds[soundName];
    if (!sound) {
      console.warn(`Sound not found: ${soundName}`);
      return;
    }
    
    const id = sound.play();
    
    // Apply spatial audio if position provided
    if (options.position && options.listenerPosition) {
      this.applySpatialAudio(sound, id, options.position, options.listenerPosition);
    }
    
    // Apply volume override if provided
    if (options.volume !== undefined) {
      sound.volume(options.volume * this.volumes.sfx * this.volumes.master, id);
    }
    
    return id;
  }
  
  // Spatial audio implementation
  applySpatialAudio(sound, id, soundPos, listenerPos) {
    const dx = soundPos.x - listenerPos.x;
    const dy = soundPos.y - listenerPos.y;
    const dz = soundPos.z || 0 - (listenerPos.z || 0);
    
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const maxDistance = 15; // tiles
    
    // Volume falloff based on distance
    const volumeFalloff = Math.max(0, 1 - (distance / maxDistance));
    
    // Stereo panning (-1 = left, 1 = right)
    const angle = Math.atan2(dy, dx);
    const pan = Math.sin(angle);
    
    // Apply to sound
    sound.volume(volumeFalloff * this.volumes.sfx * this.volumes.master, id);
    sound.stereo(pan, id);
    
    // Use muffled/distant version if far away
    if (distance > 8 && this.sounds[`${sound}_distant`]) {
      return this.sounds[`${sound}_distant`];
    }
  }
  
  // Play explosion with random variation
  playExplosion(position, listenerPosition) {
    const variation = Math.floor(Math.random() * 3) + 1;
    return this.playSFX(`explosion_${variation}`, {
      position,
      listenerPosition
    });
  }
  
  // Dynamic fuse sound based on timer
  updateFuseSound(bombId, timeRemaining, maxTime) {
    const urgency = 1 - (timeRemaining / maxTime);
    
    let fuseSound;
    if (urgency < 0.5) {
      fuseSound = 'fuse_slow';
    } else if (urgency < 0.8) {
      fuseSound = 'fuse_medium';
    } else {
      fuseSound = 'fuse_fast';
    }
    
    // Stop previous fuse sound for this bomb
    if (this.activeFuses && this.activeFuses[bombId]) {
      this.sounds[this.activeFuses[bombId].sound].stop(this.activeFuses[bombId].id);
    }
    
    // Play new fuse sound
    const id = this.sounds[fuseSound].play();
    this.sounds[fuseSound].loop(true, id);
    
    // Track active fuse
    if (!this.activeFuses) this.activeFuses = {};
    this.activeFuses[bombId] = { sound: fuseSound, id };
    
    return id;
  }
  
  stopFuseSound(bombId) {
    if (this.activeFuses && this.activeFuses[bombId]) {
      const fuse = this.activeFuses[bombId];
      this.sounds[fuse.sound].stop(fuse.id);
      delete this.activeFuses[bombId];
    }
  }
  
  // Music control with crossfade
  playMusic(trackName, fadeTime = 2000) {
    const newTrack = this.music[trackName];
    if (!newTrack) {
      console.warn(`Music track not found: ${trackName}`);
      return;
    }
    
    // If same track is playing, do nothing
    if (this.currentMusic === trackName) {
      return;
    }
    
    // Crossfade
    if (this.currentMusic) {
      this.music[this.currentMusic].fade(
        this.music[this.currentMusic].volume(),
        0,
        fadeTime
      );
      
      setTimeout(() => {
        this.music[this.currentMusic].stop();
      }, fadeTime);
    }
    
    // Start new track
    newTrack.play();
    newTrack.fade(0, this.volumes.music * this.volumes.master, fadeTime);
    this.currentMusic = trackName;
  }
  
  stopMusic(fadeTime = 1000) {
    if (this.currentMusic) {
      this.music[this.currentMusic].fade(
        this.music[this.currentMusic].volume(),
        0,
        fadeTime
      );
      
      setTimeout(() => {
        this.music[this.currentMusic].stop();
        this.currentMusic = null;
      }, fadeTime);
    }
  }
  
  // Volume control
  setVolume(category, value) {
    this.volumes[category] = Math.max(0, Math.min(1, value));
    
    // Update all sounds in that category
    if (category === 'master') {
      Howler.volume(this.volumes.master);
    } else if (category === 'sfx') {
      Object.values(this.sounds).forEach(sound => {
        sound.volume(this.volumes.sfx * this.volumes.master);
      });
    } else if (category === 'music') {
      Object.values(this.music).forEach(music => {
        music.volume(this.volumes.music * this.volumes.master);
      });
    } else if (category === 'ui') {
      // UI sounds are subset of SFX, handle separately if needed
      ['ui_click', 'ui_hover', 'ui_back'].forEach(key => {
        if (this.sounds[key]) {
          this.sounds[key].volume(this.volumes.ui * this.volumes.master);
        }
      });
    }
    
    // Save to localStorage
    this.saveSettings();
  }
  
  getVolume(category) {
    return this.volumes[category];
  }
  
  // Persistence
  saveSettings() {
    localStorage.setItem('audio_settings', JSON.stringify(this.volumes));
  }
  
  loadSettings() {
    const saved = localStorage.getItem('audio_settings');
    if (saved) {
      try {
        this.volumes = JSON.parse(saved);
        // Apply loaded volumes
        Howler.volume(this.volumes.master);
      } catch (e) {
        console.error('Failed to load audio settings', e);
      }
    }
  }
}

// Export singleton instance
export const audioManager = new AudioManager();
```

---

## 🎮 Integration Examples

### In Game Loop

```javascript
import { audioManager } from './AudioManager';

class Game {
  constructor() {
    this.audioManager = audioManager;
  }
  
  async init() {
    // Load audio
    await this.audioManager.loadAudio();
    this.audioManager.loadSettings();
    
    // Start menu music
    this.audioManager.playMusic('menu');
  }
  
  onGameStart() {
    // Transition to gameplay music
    this.audioManager.playMusic('gameplay');
  }
  
  onBombPlaced(position) {
    // Play bomb placement sound
    this.audioManager.playSFX('bomb_place', {
      position,
      listenerPosition: this.player.position
    });
    
    // Start fuse sound
    const bombId = this.bombs.length - 1;
    this.audioManager.updateFuseSound(bombId, this.bombTimer, this.maxBombTimer);
  }
  
  updateBomb(bomb, deltaTime) {
    bomb.timer -= deltaTime;
    
    // Update fuse sound based on remaining time
    this.audioManager.updateFuseSound(
      bomb.id,
      bomb.timer,
      this.maxBombTimer
    );
    
    if (bomb.timer <= 0) {
      this.explodeBomb(bomb);
    }
  }
  
  explodeBomb(bomb) {
    // Stop fuse sound
    this.audioManager.stopFuseSound(bomb.id);
    
    // Play explosion with spatial audio
    this.audioManager.playExplosion(
      bomb.position,
      this.player.position
    );
  }
  
  onBlockDestroyed(position) {
    this.audioManager.playSFX('block_break', {
      position,
      listenerPosition: this.player.position
    });
  }
  
  onPowerUpCollected() {
    // Play at full volume (player position)
    this.audioManager.playSFX('powerup_collect');
  }
  
  onMatchTimeRunningLow() {
    // Switch to intense music
    this.audioManager.playMusic('gameplay_intense');
  }
  
  onPlayerWins() {
    this.audioManager.stopMusic(500);
    this.audioManager.playSFX('victory');
  }
  
  onPlayerLoses() {
    this.audioManager.stopMusic(500);
    this.audioManager.playSFX('defeat');
  }
}
```

### Settings Menu

```javascript
class SettingsMenu {
  constructor(audioManager) {
    this.audioManager = audioManager;
    this.createVolumeSliders();
  }
  
  createVolumeSliders() {
    const categories = ['master', 'music', 'sfx', 'ui'];
    
    categories.forEach(category => {
      const slider = document.getElementById(`${category}-volume`);
      const valueDisplay = document.getElementById(`${category}-value`);
      
      // Set initial value
      slider.value = this.audioManager.getVolume(category) * 100;
      valueDisplay.textContent = `${Math.round(slider.value)}%`;
      
      // Update on change
      slider.addEventListener('input', (e) => {
        const value = e.target.value / 100;
        this.audioManager.setVolume(category, value);
        valueDisplay.textContent = `${Math.round(e.target.value)}%`;
        
        // Play test sound
        if (category === 'sfx') {
          this.audioManager.playSFX('explosion_1');
        } else if (category === 'ui') {
          this.audioManager.playSFX('ui_click');
        }
      });
    });
  }
}
```

### HTML Volume Sliders

```html
<div class="audio-settings">
  <div class="volume-control">
    <label>Master Volume: <span id="master-value">80%</span></label>
    <input type="range" id="master-volume" min="0" max="100" value="80">
  </div>
  
  <div class="volume-control">
    <label>Music: <span id="music-value">70%</span></label>
    <input type="range" id="music-volume" min="0" max="100" value="70">
  </div>
  
  <div class="volume-control">
    <label>Sound Effects: <span id="sfx-value">80%</span></label>
    <input type="range" id="sfx-volume" min="0" max="100" value="80">
  </div>
  
  <div class="volume-control">
    <label>UI Sounds: <span id="ui-value">50%</span></label>
    <input type="range" id="ui-volume" min="0" max="100" value="50">
  </div>
</div>
```

---

## 📱 Mobile Implementation

### Touch-to-Start Audio (Required)

```html
<!-- Show before game starts -->
<div id="audio-init-overlay">
  <button id="start-audio">🔊 Tap to Enable Audio</button>
</div>
```

```javascript
document.getElementById('start-audio').addEventListener('click', async () => {
  // Initialize audio context
  await Howler.ctx?.resume();
  
  // Load all audio
  await audioManager.loadAudio();
  
  // Hide overlay
  document.getElementById('audio-init-overlay').style.display = 'none';
  
  // Start menu music
  audioManager.playMusic('menu');
  
  // Start game
  startGame();
});
```

---

## ⚡ Performance Optimization

### 1. Sound Pooling

```javascript
class SoundPool {
  constructor(sound, maxInstances = 5) {
    this.sound = sound;
    this.maxInstances = maxInstances;
    this.activeInstances = [];
  }
  
  play(options = {}) {
    // Remove finished instances
    this.activeInstances = this.activeInstances.filter(id => this.sound.playing(id));
    
    // Limit simultaneous sounds
    if (this.activeInstances.length >= this.maxInstances) {
      // Stop oldest instance
      this.sound.stop(this.activeInstances.shift());
    }
    
    const id = this.sound.play();
    this.activeInstances.push(id);
    
    return id;
  }
}

// Usage
const explosionPool = new SoundPool(audioManager.sounds.explosion_1, 8);
```

### 2. Audio Sprites (Combine Multiple SFX)

```javascript
// Create sprite with multiple sounds in one file
const uiSprite = new Howl({
  src: ['assets/audio/ui/ui_sprite.ogg'],
  sprite: {
    click: [0, 150],       // 0ms - 150ms
    hover: [150, 100],     // 150ms - 250ms
    back: [250, 150],      // 250ms - 400ms
    select: [400, 200]     // 400ms - 600ms
  }
});

// Play specific sound from sprite
uiSprite.play('click');
```

### 3. Lazy Loading Non-Critical Sounds

```javascript
async loadAudio() {
  // Load critical sounds immediately
  await this.loadCriticalSounds();
  
  // Show "Ready to Play" button
  showPlayButton();
  
  // Load remaining sounds in background
  this.loadOptionalSounds();
}

async loadCriticalSounds() {
  // Only sounds needed for first 30 seconds
  return this.loadSounds({
    bomb_place: ['...'],
    explosion_1: ['...'],
    ui_click: ['...']
  });
}

async loadOptionalSounds() {
  // Everything else
  return this.loadSounds({
    footstep_grass: ['...'],
    block_break_ice: ['...'],
    // ...
  });
}
```

---

## 🧪 Testing Audio System

### Unit Tests

```javascript
describe('AudioManager', () => {
  let audioManager;
  
  beforeEach(() => {
    audioManager = new AudioManager();
  });
  
  test('should load all sounds', async () => {
    await audioManager.loadAudio();
    expect(audioManager.sounds.bomb_place).toBeDefined();
    expect(audioManager.sounds.explosion_1).toBeDefined();
  });
  
  test('should apply spatial audio correctly', () => {
    const soundPos = { x: 5, y: 5, z: 0 };
    const listenerPos = { x: 0, y: 0, z: 0 };
    
    const id = audioManager.playSFX('explosion_1', {
      position: soundPos,
      listenerPosition: listenerPos
    });
    
    expect(id).toBeDefined();
  });
  
  test('should update volume settings', () => {
    audioManager.setVolume('music', 0.5);
    expect(audioManager.getVolume('music')).toBe(0.5);
  });
});
```

### Manual Testing Checklist

- [ ] All sounds play correctly in Chrome/Firefox/Safari
- [ ] Mobile audio initializes after touch
- [ ] Volume sliders work for all categories
- [ ] Spatial audio provides directional cues
- [ ] Music loops seamlessly without gaps
- [ ] Explosions don't clip/distort when many play at once
- [ ] Fuse sound updates correctly as timer runs down
- [ ] Settings persist after page reload

---

## 🐛 Common Issues & Solutions

### Issue: Audio doesn't play on iOS
**Solution:** Ensure audio is initialized after user interaction
```javascript
// Must be in direct response to user gesture
button.addEventListener('touchstart', () => {
  Howler.ctx?.resume();
  audioManager.loadAudio();
});
```

### Issue: Music has gap when looping
**Solution:** Use Audacity to create seamless loop
1. Open audio in Audacity
2. Select end of track
3. Effects → Fade Out (last 0.1 seconds)
4. Select beginning
5. Effects → Fade In (first 0.1 seconds)
6. Export as OGG

### Issue: Too many sounds playing causes lag
**Solution:** Implement sound pooling and limits
```javascript
const MAX_EXPLOSIONS = 8;
let activeExplosions = [];

function playExplosion() {
  if (activeExplosions.length >= MAX_EXPLOSIONS) {
    // Stop oldest explosion
    audioManager.sounds.explosion_1.stop(activeExplosions.shift());
  }
  
  const id = audioManager.playExplosion(...);
  activeExplosions.push(id);
}
```

### Issue: Volume settings don't persist
**Solution:** Save to localStorage
```javascript
// Save
localStorage.setItem('audio_settings', JSON.stringify(volumes));

// Load on init
const saved = localStorage.getItem('audio_settings');
if (saved) {
  volumes = JSON.parse(saved);
}
```

---

## 📚 Additional Resources

- **Howler.js Documentation:** https://howlerjs.com/
- **Web Audio API:** https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- **Audio Format Guide:** https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs
- **Game Audio Best Practices:** https://www.html5rocks.com/en/tutorials/webaudio/games/

---

## ✅ Implementation Checklist

- [ ] Install Howler.js or alternative audio library
- [ ] Create AudioManager class
- [ ] Implement volume controls (Master/Music/SFX/UI)
- [ ] Set up spatial audio for explosions
- [ ] Implement fuse sound pitch shifting
- [ ] Add mobile touch-to-start audio
- [ ] Create settings menu with sliders
- [ ] Implement music crossfading
- [ ] Add sound pooling for performance
- [ ] Save/load audio settings
- [ ] Test on all target browsers
- [ ] Test on mobile devices
- [ ] Verify all sounds meet spec requirements

---

**Ready to implement? Start with the AudioManager class and test with placeholder sounds before sourcing/generating final audio assets!**
