import { WeatherSystem, WeatherType } from '@systems/WeatherSystem';
import * as THREE from 'three';
import { LevelTheme } from '@core/ExtendedTypes';

/**
 * Weather System Demo
 * 
 * This file demonstrates all weather effects:
 * - RAIN (Cyberpunk City): Fast falling blue/cyan droplets with splash animations
 * - SNOW (Ice World): Slow falling white snowflakes with accumulation
 * - ASH (Volcano): Rising orange/red glowing particles with fire glow
 * - POLLEN (Grassy Fields): Soft yellow/white floating particles
 * - NEON (Cyberpunk): Rising cyan/pink digital sparkles
 */

export class WeatherDemo {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private weatherSystem: WeatherSystem;
  private currentWeatherIndex = 0;
  
  private weatherTypes: WeatherType[] = [
    WeatherType.NONE,
    WeatherType.RAIN,
    WeatherType.SNOW,
    WeatherType.ASH,
    WeatherType.POLLEN,
    WeatherType.NEON,
  ];

  private weatherNames: string[] = [
    'None',
    'Rain (Cyberpunk City)',
    'Snow (Ice World)',
    'Ash (Volcano)',
    'Pollen (Grassy Fields)',
    'Neon (Cyberpunk)',
  ];

  constructor() {
    // Setup basic scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a2e);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(8, 10, 12);
    this.camera.lookAt(8, 0, 8);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(this.renderer.domElement);

    // Add lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    this.scene.add(dirLight);

    // Add a ground plane
    const groundGeo = new THREE.PlaneGeometry(20, 20);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x333344 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(8, 0, 8);
    this.scene.add(ground);

    // Initialize weather system
    this.weatherSystem = new WeatherSystem(this.scene);

    // Setup UI
    this.setupUI();

    // Start with first weather
    this.setWeather(0);

    // Start loop
    this.animate();
  }

  private setupUI(): void {
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 20px;
      border-radius: 10px;
      font-family: system-ui, -apple-system, sans-serif;
      z-index: 1000;
      max-width: 300px;
    `;

    container.innerHTML = `
      <h2 style="margin: 0 0 15px 0; font-size: 18px;">🌦️ Weather System Demo</h2>
      <div id="weather-name" style="font-size: 24px; margin-bottom: 15px; color: #4dabf7;">None</div>
      <div style="margin-bottom: 10px;">
        <label style="display: block; margin-bottom: 5px;">Intensity</label>
        <input type="range" id="intensity" min="0" max="100" value="60" style="width: 100%;">
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button id="prev-btn" style="flex: 1; padding: 10px; cursor: pointer;">← Prev</button>
        <button id="next-btn" style="flex: 1; padding: 10px; cursor: pointer;">Next →</button>
      </div>
      <button id="toggle-btn" style="width: 100%; margin-top: 10px; padding: 10px; cursor: pointer;">Toggle Weather</button>
      <div style="margin-top: 15px; font-size: 12px; color: #aaa;">
        Press ← → arrow keys to switch weather<br>
        Press SPACE to toggle on/off
      </div>
    `;

    document.body.appendChild(container);

    // Event listeners
    document.getElementById('prev-btn')!.addEventListener('click', () => this.prevWeather());
    document.getElementById('next-btn')!.addEventListener('click', () => this.nextWeather());
    document.getElementById('toggle-btn')!.addEventListener('click', () => this.toggleWeather());
    
    const intensitySlider = document.getElementById('intensity') as HTMLInputElement;
    intensitySlider.addEventListener('input', (e) => {
      const value = parseInt((e.target as HTMLInputElement).value) / 100;
      this.weatherSystem.setIntensity(value);
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          this.prevWeather();
          break;
        case 'ArrowRight':
          this.nextWeather();
          break;
        case ' ':
          e.preventDefault();
          this.toggleWeather();
          break;
      }
    });
  }

  private setWeather(index: number): void {
    this.currentWeatherIndex = index;
    const weather = this.weatherTypes[index];
    const name = this.weatherNames[index];
    
    this.weatherSystem.setWeather(weather, 0.6);
    
    const nameEl = document.getElementById('weather-name');
    if (nameEl) {
      nameEl.textContent = name;
    }

    // Update background based on weather
    this.updateBackground(weather);
  }

  private updateBackground(weather: WeatherType): void {
    const colors: Record<WeatherType, number> = {
      [WeatherType.NONE]: 0x1a1a2e,
      [WeatherType.RAIN]: 0x1a2530,
      [WeatherType.SNOW]: 0x1a2535,
      [WeatherType.ASH]: 0x2a1a15,
      [WeatherType.POLLEN]: 0x253520,
      [WeatherType.NEON]: 0x1a1525,
    };
    this.scene.background = new THREE.Color(colors[weather]);
  }

  private nextWeather(): void {
    const next = (this.currentWeatherIndex + 1) % this.weatherTypes.length;
    this.setWeather(next);
  }

  private prevWeather(): void {
    const prev = (this.currentWeatherIndex - 1 + this.weatherTypes.length) % this.weatherTypes.length;
    this.setWeather(prev);
  }

  private toggleWeather(): void {
    const btn = document.getElementById('toggle-btn');
    if (this.weatherSystem['enabled']) {
      this.weatherSystem.setEnabled(false);
      if (btn) btn.textContent = 'Enable Weather';
    } else {
      this.weatherSystem.setEnabled(true);
      if (btn) btn.textContent = 'Disable Weather';
    }
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    
    const deltaTime = 0.016;
    this.weatherSystem.update(deltaTime);
    this.renderer.render(this.scene, this.camera);
  }
}

// Auto-start demo if this file is loaded directly
if (typeof window !== 'undefined') {
  (window as any).WeatherDemo = WeatherDemo;
}
