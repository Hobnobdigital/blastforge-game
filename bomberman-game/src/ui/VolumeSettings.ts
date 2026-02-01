/**
 * VolumeSettings UI Component
 * 
 * Provides sliders for Master, Music, SFX, and UI volume control.
 * Integrates with AudioManager for real-time volume adjustment.
 */

import { AudioManager, AudioCategory } from '@audio/AudioManager';

interface VolumeSettingsConfig {
  containerId: string;
  audioManager: AudioManager;
}

export class VolumeSettings {
  private container: HTMLElement;
  private audio: AudioManager;
  private sliders: Map<AudioCategory, HTMLInputElement> = new Map();
  private valueLabels: Map<AudioCategory, HTMLElement> = new Map();

  constructor(config: VolumeSettingsConfig) {
    this.container = document.getElementById(config.containerId)!;
    this.audio = config.audioManager;
    
    if (!this.container) {
      throw new Error(`Container element not found: ${config.containerId}`);
    }
    
    this.render();
    this.attachEventListeners();
  }

  /**
   * Render the volume settings UI
   */
  private render(): void {
    this.container.innerHTML = `
      <div class="volume-settings">
        <h3>Audio Settings</h3>
        
        <div class="volume-control">
          <label for="volume-master">Master Volume</label>
          <div class="slider-container">
            <input 
              type="range" 
              id="volume-master" 
              class="volume-slider"
              min="0" 
              max="100" 
              value="100"
            >
            <span class="volume-value" id="value-master">100%</span>
          </div>
        </div>
        
        <div class="volume-control">
          <label for="volume-music">Music</label>
          <div class="slider-container">
            <input 
              type="range" 
              id="volume-music" 
              class="volume-slider"
              min="0" 
              max="100" 
              value="70"
            >
            <span class="volume-value" id="value-music">70%</span>
          </div>
        </div>
        
        <div class="volume-control">
          <label for="volume-sfx">Sound Effects</label>
          <div class="slider-container">
            <input 
              type="range" 
              id="volume-sfx" 
              class="volume-slider"
              min="0" 
              max="100" 
              value="80"
            >
            <span class="volume-value" id="value-sfx">80%</span>
          </div>
        </div>
        
        <div class="volume-control">
          <label for="volume-ui">UI Sounds</label>
          <div class="slider-container">
            <input 
              type="range" 
              id="volume-ui" 
              class="volume-slider"
              min="0" 
              max="100" 
              value="50"
            >
            <span class="volume-value" id="value-ui">50%</span>
          </div>
        </div>
        
        <div class="audio-actions">
          <button id="mute-toggle" class="btn-mute">Mute All</button>
          <button id="test-sounds" class="btn-test">Test Sounds</button>
        </div>
      </div>
    `;
    
    // Cache slider and label references
    const categories: AudioCategory[] = [
      AudioCategory.MASTER,
      AudioCategory.MUSIC,
      AudioCategory.SFX,
      AudioCategory.UI
    ];
    
    for (const category of categories) {
      const slider = this.container.querySelector(`#volume-${category}`) as HTMLInputElement;
      const label = this.container.querySelector(`#value-${category}`) as HTMLElement;
      
      if (slider && label) {
        this.sliders.set(category, slider);
        this.valueLabels.set(category, label);
        
        // Set initial value from AudioManager
        const currentVolume = Math.round(this.audio.getVolume(category) * 100);
        slider.value = String(currentVolume);
        label.textContent = `${currentVolume}%`;
      }
    }
  }

  /**
   * Attach event listeners to sliders and buttons
   */
  private attachEventListeners(): void {
    // Volume sliders
    for (const [category, slider] of this.sliders) {
      slider.addEventListener('input', () => {
        const volume = parseInt(slider.value) / 100;
        this.audio.setVolume(category, volume);
        
        // Update value label
        const label = this.valueLabels.get(category);
        if (label) {
          label.textContent = `${slider.value}%`;
        }
        
        // Play UI sound for feedback (except when adjusting UI volume)
        if (category !== AudioCategory.UI) {
          this.audio.playUIClick();
        }
      });
    }
    
    // Mute toggle button
    const muteBtn = this.container.querySelector('#mute-toggle');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = this.audio.isMuted();
        this.audio.setMute(!isMuted);
        muteBtn.textContent = !isMuted ? 'Unmute' : 'Mute All';
        muteBtn.classList.toggle('muted', !isMuted);
        this.audio.playUIClick();
      });
    }
    
    // Test sounds button
    const testBtn = this.container.querySelector('#test-sounds');
    if (testBtn) {
      testBtn.addEventListener('click', () => {
        this.playTestSounds();
      });
    }
  }

  /**
   * Play a sequence of test sounds
   */
  private playTestSounds(): void {
    const sounds = [
      () => this.audio.playUIClick(),
      () => this.audio.playBombPlace(),
      () => this.audio.playExplosion(2),
      () => this.audio.playPowerUpCollect(),
    ];
    
    let delay = 0;
    for (const sound of sounds) {
      setTimeout(() => sound(), delay);
      delay += 500;
    }
  }

  /**
   * Show the settings panel
   */
  show(): void {
    this.container.style.display = 'block';
    this.audio.playUIClick();
  }

  /**
   * Hide the settings panel
   */
  hide(): void {
    this.container.style.display = 'none';
  }

  /**
   * Toggle visibility
   */
  toggle(): void {
    if (this.container.style.display === 'none') {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Reset all volumes to defaults
   */
  resetToDefaults(): void {
    const defaults: Record<AudioCategory, number> = {
      [AudioCategory.MASTER]: 1.0,
      [AudioCategory.MUSIC]: 0.7,
      [AudioCategory.SFX]: 0.8,
      [AudioCategory.UI]: 0.5
    };
    
    for (const [category, volume] of Object.entries(defaults)) {
      this.audio.setVolume(category as AudioCategory, volume);
      
      const slider = this.sliders.get(category as AudioCategory);
      const label = this.valueLabels.get(category as AudioCategory);
      
      if (slider) slider.value = String(volume * 100);
      if (label) label.textContent = `${Math.round(volume * 100)}%`;
    }
    
    this.audio.playUIClick();
  }

  /**
   * Destroy the settings component
   */
  destroy(): void {
    this.container.innerHTML = '';
    this.sliders.clear();
    this.valueLabels.clear();
  }
}

export default VolumeSettings;
