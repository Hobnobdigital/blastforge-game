# Visual Enhancement Implementation Examples
**Quick Start Guide for Top Priority Features**

This document provides copy-paste code examples for the highest-impact visual improvements.

---

## 1. Particle Manager System (🔥 Priority #1)

### File: `/src/rendering/ParticleManager.ts`

```typescript
import * as THREE from 'three';

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  lifetime: number;
  maxLifetime: number;
  size: number;
  colorStart: THREE.Color;
  colorEnd: THREE.Color;
  active: boolean;
}

export class ParticleManager {
  private scene: THREE.Scene;
  private particleSystems: Map<string, ParticleSystem> = new Map();
  
  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.initializeFireParticles();
    this.initializeSmokeParticles();
    this.initializeSparkleParticles();
  }
  
  private initializeFireParticles(): void {
    const system = new ParticleSystem(this.scene, {
      maxParticles: 500,
      texture: '/assets/particles/fire.png',
      blending: THREE.AdditiveBlending,
      size: 0.2,
      gravity: -2.0
    });
    this.particleSystems.set('fire', system);
  }
  
  private initializeSmokeParticles(): void {
    const system = new ParticleSystem(this.scene, {
      maxParticles: 200,
      texture: '/assets/particles/smoke.png',
      blending: THREE.NormalBlending,
      size: 0.3,
      gravity: 1.5
    });
    this.particleSystems.set('smoke', system);
  }
  
  private initializeSparkleParticles(): void {
    const system = new ParticleSystem(this.scene, {
      maxParticles: 100,
      texture: '/assets/particles/sparkle.png',
      blending: THREE.AdditiveBlending,
      size: 0.1,
      gravity: 0
    });
    this.particleSystems.set('sparkle', system);
  }
  
  spawnExplosion(position: THREE.Vector3, intensity: number): void {
    const fireSystem = this.particleSystems.get('fire')!;
    const smokeSystem = this.particleSystems.get('smoke')!;
    
    // Fire burst
    const fireCount = Math.floor(50 + intensity * 30);
    for (let i = 0; i < fireCount; i++) {
      const angle = (Math.PI * 2 * i) / fireCount + (Math.random() - 0.5) * 0.3;
      const speed = 3 + Math.random() * 2;
      const velocity = new THREE.Vector3(
        Math.cos(angle) * speed,
        0.5 + Math.random(),
        Math.sin(angle) * speed
      );
      
      fireSystem.emit({
        position: position.clone(),
        velocity: velocity,
        lifetime: 0.3 + Math.random() * 0.2,
        size: 0.15 + Math.random() * 0.1,
        colorStart: new THREE.Color(0xfff9e6),
        colorEnd: new THREE.Color(0x331100)
      });
    }
    
    // Smoke plume
    const smokeCount = Math.floor(20 + intensity * 10);
    for (let i = 0; i < smokeCount; i++) {
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        1 + Math.random(),
        (Math.random() - 0.5) * 0.5
      );
      
      smokeSystem.emit({
        position: position.clone().add(new THREE.Vector3(0, 0.2, 0)),
        velocity: velocity,
        lifetime: 0.5 + Math.random() * 0.3,
        size: 0.1,
        sizeEnd: 0.4,
        colorStart: new THREE.Color(0x222222),
        colorEnd: new THREE.Color(0x666666)
      });
    }
  }
  
  spawnPowerUpSparkle(position: THREE.Vector3, color: THREE.Color): void {
    const system = this.particleSystems.get('sparkle')!;
    
    for (let i = 0; i < 3; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.3;
      const velocity = new THREE.Vector3(
        Math.cos(angle) * 0.5,
        Math.random() * 0.5,
        Math.sin(angle) * 0.5
      );
      
      system.emit({
        position: position.clone().add(new THREE.Vector3(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        )),
        velocity: velocity,
        lifetime: 0.5,
        size: 0.08,
        colorStart: color,
        colorEnd: color.clone().multiplyScalar(0.5)
      });
    }
  }
  
  update(dt: number): void {
    for (const [, system] of this.particleSystems) {
      system.update(dt);
    }
  }
}

class ParticleSystem {
  private particles: Particle[] = [];
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;
  private points: THREE.Points;
  private maxParticles: number;
  private gravity: number;
  
  constructor(scene: THREE.Scene, config: any) {
    this.maxParticles = config.maxParticles;
    this.gravity = config.gravity;
    
    // Initialize geometry
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.maxParticles * 3);
    const colors = new Float32Array(this.maxParticles * 3);
    const sizes = new Float32Array(this.maxParticles);
    
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Initialize material
    const texture = new THREE.TextureLoader().load(config.texture);
    this.material = new THREE.PointsMaterial({
      size: config.size,
      map: texture,
      transparent: true,
      blending: config.blending,
      depthWrite: false,
      vertexColors: true,
      sizeAttenuation: true
    });
    
    this.points = new THREE.Points(this.geometry, this.material);
    scene.add(this.points);
    
    // Initialize particle pool
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        position: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        lifetime: 0,
        maxLifetime: 1,
        size: config.size,
        colorStart: new THREE.Color(0xffffff),
        colorEnd: new THREE.Color(0x000000),
        active: false
      });
    }
  }
  
  emit(config: any): void {
    const particle = this.particles.find(p => !p.active);
    if (!particle) return;
    
    particle.position.copy(config.position);
    particle.velocity.copy(config.velocity);
    particle.lifetime = config.lifetime;
    particle.maxLifetime = config.lifetime;
    particle.size = config.size;
    particle.colorStart.copy(config.colorStart);
    particle.colorEnd.copy(config.colorEnd);
    particle.active = true;
  }
  
  update(dt: number): void {
    const positions = this.geometry.attributes.position.array as Float32Array;
    const colors = this.geometry.attributes.color.array as Float32Array;
    const sizes = this.geometry.attributes.size.array as Float32Array;
    
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      if (!p.active) {
        positions[i * 3] = 0;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;
        sizes[i] = 0;
        continue;
      }
      
      // Update physics
      p.velocity.y += this.gravity * dt;
      p.position.add(p.velocity.clone().multiplyScalar(dt));
      p.lifetime -= dt;
      
      if (p.lifetime <= 0) {
        p.active = false;
        continue;
      }
      
      // Update attributes
      const alpha = 1 - (p.lifetime / p.maxLifetime);
      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;
      
      const color = p.colorStart.clone().lerp(p.colorEnd, alpha);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = p.size * (1 - alpha * 0.5);
    }
    
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
    this.geometry.attributes.size.needsUpdate = true;
  }
}
```

---

## 2. Enhanced Bomb Visuals

### Update in `/src/rendering/SceneManager.ts`

```typescript
// Add to SceneManager class
private bombEmissiveMaterials: Map<number, THREE.MeshStandardMaterial> = new Map();

private syncBombs(state: GameState): void {
  const activeIds = new Set(state.bombs.map(b => b.id));
  
  // Remove stale bombs
  for (const [id, mesh] of this.bombMeshes) {
    if (!activeIds.has(id)) {
      this.scene.remove(mesh);
      this.bombMeshes.delete(id);
      this.bombEmissiveMaterials.delete(id);
    }
  }
  
  // Add/update bombs
  for (const bomb of state.bombs) {
    let mesh = this.bombMeshes.get(bomb.id);
    
    if (!mesh) {
      const material = this.createBombMaterial(bomb);
      mesh = new THREE.Mesh(this.geoBomb, material);
      mesh.castShadow = true;
      this.scene.add(mesh);
      this.bombMeshes.set(bomb.id, mesh);
      this.bombEmissiveMaterials.set(bomb.id, material);
    }
    
    this.updateBombAnimation(mesh, bomb);
  }
}

private createBombMaterial(bomb: BombState): THREE.MeshStandardMaterial {
  if (bomb.rushed) {
    return new THREE.MeshStandardMaterial({
      color: 0xff3333,
      emissive: 0xff6666,
      emissiveIntensity: 0.8,
      roughness: 0.3,
      metalness: 0.7
    });
  } else if (bomb.primed) {
    return new THREE.MeshStandardMaterial({
      color: 0x0088ff,
      emissive: 0x00ccff,
      emissiveIntensity: 0.5,
      roughness: 0.4,
      metalness: 0.8
    });
  } else {
    return new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      emissive: 0xff6600,
      emissiveIntensity: 0.3,
      roughness: 0.6,
      metalness: 0.2
    });
  }
}

private updateBombAnimation(mesh: THREE.Mesh, bomb: BombState): void {
  const time = Date.now() * 0.001;
  
  // Determine pulse parameters based on state
  let pulseSpeed = 2;
  let pulseAmount = 0.08;
  let verticalBounce = 0.03;
  let emissiveVariation = 0.2;
  
  if (bomb.rushed) {
    pulseSpeed = 6;
    pulseAmount = 0.2;
    verticalBounce = 0.08;
    emissiveVariation = 0.5;
    
    // Add jitter for rushed bombs
    mesh.position.x = bomb.gridPos.col + (Math.random() - 0.5) * 0.02;
    mesh.position.z = bomb.gridPos.row + (Math.random() - 0.5) * 0.02;
  } else if (bomb.primed) {
    pulseSpeed = 1;
    pulseAmount = 0.04;
    verticalBounce = 0.02;
    emissiveVariation = 0.1;
    
    mesh.position.x = bomb.gridPos.col;
    mesh.position.z = bomb.gridPos.row;
  } else {
    mesh.position.x = bomb.gridPos.col;
    mesh.position.z = bomb.gridPos.row;
  }
  
  // Apply animations
  const pulse = 1 + pulseAmount * Math.sin(time * pulseSpeed * Math.PI);
  mesh.scale.setScalar(pulse);
  mesh.position.y = 0.35 + verticalBounce * Math.sin(time * pulseSpeed * Math.PI * 0.5);
  
  // Vary emissive intensity
  const material = mesh.material as THREE.MeshStandardMaterial;
  const baseIntensity = bomb.rushed ? 0.8 : bomb.primed ? 0.5 : 0.3;
  material.emissiveIntensity = baseIntensity + emissiveVariation * Math.sin(time * pulseSpeed * Math.PI);
  
  // Warning state (last second)
  if (bomb.fuseRemaining < 1.0 && !bomb.primed) {
    const warningPulse = Math.sin(time * 10 * Math.PI);
    mesh.scale.multiplyScalar(1 + 0.1 * Math.abs(warningPulse));
    material.emissiveIntensity = Math.max(material.emissiveIntensity, 0.9);
  }
}
```

---

## 3. Improved HUD Design

### Update `/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BLASTFORGE</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { 
      width: 100%; height: 100%; overflow: hidden; 
      background: #0a0a0a; 
      font-family: 'Inter', 'Segoe UI', sans-serif;
    }
    canvas { display: block; }
    
    /* HUD Container */
    #hud {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none; color: #fff;
    }
    
    /* Top Bar */
    .hud-top {
      position: absolute; top: 16px; left: 50%;
      transform: translateX(-50%);
      display: flex; gap: 32px;
    }
    
    .match-timer {
      font-size: 24px; font-weight: 700;
      background: rgba(0, 0, 0, 0.6);
      padding: 8px 16px; border-radius: 8px;
      border: 2px solid rgba(255, 255, 255, 0.2);
      font-variant-numeric: tabular-nums;
    }
    
    /* Player Stats (Bottom Left) */
    .hud-stats {
      position: absolute; bottom: 20px; left: 20px;
      display: flex; flex-direction: column; gap: 12px;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(10px);
      padding: 16px;
      border-radius: 12px;
      border: 2px solid rgba(255, 255, 255, 0.1);
    }
    
    .stat-group {
      display: flex; align-items: center; gap: 12px;
    }
    
    .stat-icon {
      display: flex; align-items: center; gap: 8px;
      font-size: 28px; font-weight: 900;
    }
    
    .stat-icon img {
      width: 32px; height: 32px;
      filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5));
    }
    
    .stat-value {
      color: #ffffff;
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
      font-variant-numeric: tabular-nums;
    }
    
    .stat-value.low {
      color: #ff3333;
      animation: pulse-warning 0.5s infinite;
    }
    
    @keyframes pulse-warning {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    .stat-max {
      font-size: 18px; color: #999;
    }
    
    .stat-bar {
      flex: 1;
      height: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;
    }
    
    .stat-fill {
      height: 100%;
      background: linear-gradient(90deg, #00d9ff, #00aaff);
      transition: width 0.3s ease;
      box-shadow: 0 0 8px rgba(0, 217, 255, 0.6);
    }
    
    .stat-row {
      display: flex; gap: 16px;
    }
    
    .stat-small {
      display: flex; align-items: center; gap: 6px;
      font-size: 16px; opacity: 0.9;
    }
    
    .stat-small img {
      width: 20px; height: 20px;
    }
    
    /* Active Bombs */
    .active-bombs {
      position: absolute; bottom: 20px; right: 20px;
      display: flex; flex-direction: column; gap: 8px;
    }
    
    .bomb-timer {
      font-size: 16px; font-weight: 700;
      padding: 6px 12px; border-radius: 6px;
      background: rgba(0, 0, 0, 0.7);
      border: 2px solid;
      font-variant-numeric: tabular-nums;
      text-align: center;
      min-width: 60px;
    }
    
    .bomb-timer[data-state="normal"] {
      border-color: #ff6600; color: #ff6600;
    }
    
    .bomb-timer[data-state="primed"] {
      border-color: #00d9ff; color: #00d9ff;
    }
    
    .bomb-timer[data-state="rushed"] {
      border-color: #ff3333; color: #ff3333;
      animation: shake 0.1s infinite;
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-3px); }
      75% { transform: translateX(3px); }
    }
    
    /* FPS Counter */
    #fps-counter {
      position: absolute; top: 12px; right: 12px;
      font-size: 12px; opacity: 0.4;
      font-variant-numeric: tabular-nums;
      display: none; /* Hidden by default */
    }
    
    /* Power-up Notification */
    .powerup-notification {
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%) scale(0);
      display: flex; align-items: center; gap: 12px;
      padding: 16px 24px;
      background: rgba(0, 255, 0, 0.15);
      backdrop-filter: blur(10px);
      border: 2px solid #00ff00;
      border-radius: 12px;
      font-size: 24px; font-weight: 700;
      color: #00ff00;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
      z-index: 9999;
      box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
    }
    
    .powerup-notification.show {
      transform: translate(-50%, -50%) scale(1);
    }
    
    .powerup-notification.fade {
      opacity: 0;
      transform: translate(-50%, -60%) scale(0.8);
    }
    
    .powerup-notification img {
      width: 32px; height: 32px;
    }
  </style>
</head>
<body>
  <div id="hud">
    <div class="hud-top">
      <div class="match-timer" id="match-timer">3:00</div>
    </div>
    
    <div class="hud-stats">
      <div class="stat-group">
        <div class="stat-icon">
          <span>💣</span>
          <span class="stat-value" id="bombs-available">3</span>
          <span class="stat-max" id="bombs-max">/5</span>
        </div>
        <div class="stat-bar">
          <div class="stat-fill" id="bombs-bar" style="width: 60%"></div>
        </div>
      </div>
      
      <div class="stat-group">
        <div class="stat-icon">
          <span>⚡</span>
          <span class="stat-value" id="fuse-charges">3</span>
          <span class="stat-max">/5</span>
        </div>
      </div>
      
      <div class="stat-row">
        <div class="stat-small">
          <span>🎯</span>
          <span id="bomb-range">+2</span>
        </div>
        <div class="stat-small">
          <span>⚡</span>
          <span id="player-speed">3.5</span>
        </div>
      </div>
    </div>
    
    <div class="active-bombs" id="active-bombs">
      <!-- Dynamically added bomb timers -->
    </div>
    
    <div id="fps-counter"></div>
  </div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

### Update `/src/ui/HUD.ts`

```typescript
import { GameState, BombState } from '@core/types';

export class HUD {
  constructor() {
    // No longer need validation
  }

  update(state: GameState): void {
    const player = state.players[0];
    if (!player) return;
    
    // Update bomb count
    const bombsAvailable = player.maxBombs - player.activeBombs;
    const bombsAvailableEl = document.getElementById('bombs-available');
    const bombsMaxEl = document.getElementById('bombs-max');
    const bombsBarEl = document.getElementById('bombs-bar');
    
    if (bombsAvailableEl) bombsAvailableEl.textContent = bombsAvailable.toString();
    if (bombsMaxEl) bombsMaxEl.textContent = `/${player.maxBombs}`;
    if (bombsBarEl) {
      const percentage = (bombsAvailable / player.maxBombs) * 100;
      bombsBarEl.style.width = `${percentage}%`;
    }
    
    // Highlight low bombs
    if (bombsAvailable === 0 && bombsAvailableEl) {
      bombsAvailableEl.classList.add('low');
    } else if (bombsAvailableEl) {
      bombsAvailableEl.classList.remove('low');
    }
    
    // Update fuse charges
    const fuseChargesEl = document.getElementById('fuse-charges');
    if (fuseChargesEl) {
      fuseChargesEl.textContent = player.fuseCharges.toString();
      if (player.fuseCharges <= 1) {
        fuseChargesEl.classList.add('low');
      } else {
        fuseChargesEl.classList.remove('low');
      }
    }
    
    // Update stats
    const rangeEl = document.getElementById('bomb-range');
    const speedEl = document.getElementById('player-speed');
    if (rangeEl) rangeEl.textContent = `+${player.bombRange}`;
    if (speedEl) speedEl.textContent = player.speed.toFixed(1);
    
    // Update active bomb timers
    this.updateActiveBombs(state.bombs.filter(b => b.ownerId === player.id));
  }
  
  private updateActiveBombs(bombs: BombState[]): void {
    const container = document.getElementById('active-bombs');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (const bomb of bombs) {
      const timer = document.createElement('div');
      timer.className = 'bomb-timer';
      
      let state = 'normal';
      if (bomb.primed) state = 'primed';
      if (bomb.rushed) state = 'rushed';
      
      timer.setAttribute('data-state', state);
      timer.textContent = `${bomb.fuseRemaining.toFixed(1)}s`;
      
      container.appendChild(timer);
    }
  }
  
  showPowerUpCollected(type: string): void {
    const notification = document.createElement('div');
    notification.className = 'powerup-notification';
    
    const icon = this.getPowerUpIcon(type);
    const name = this.getPowerUpName(type);
    
    notification.innerHTML = `<span style="font-size: 32px;">${icon}</span><span>+${name}</span>`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => notification.classList.add('fade'), 2000);
    setTimeout(() => notification.remove(), 2500);
  }
  
  private getPowerUpIcon(type: string): string {
    const icons: Record<string, string> = {
      'bomb_range': '🎯',
      'bomb_count': '💣',
      'speed': '⚡',
      'fuse_charge': '⏱️'
    };
    return icons[type] || '✨';
  }
  
  private getPowerUpName(type: string): string {
    const names: Record<string, string> = {
      'bomb_range': 'Range',
      'bomb_count': 'Bomb',
      'speed': 'Speed',
      'fuse_charge': 'Fuse'
    };
    return names[type] || 'Power-Up';
  }
}
```

---

## 4. Integration in Main Game Loop

### Update `/src/main.ts`

```typescript
import { GameLoop } from '@core/GameLoop';
import { createInitialState } from '@core/StateManager';
import { GameState } from '@core/types';
import { InputManager } from '@input/InputManager';
import { SceneManager } from '@rendering/SceneManager';
import { ParticleManager } from '@rendering/ParticleManager'; // NEW
import { AudioEngine } from '@audio/AudioEngine';
import { HUD } from '@ui/HUD';
import { movePlayer } from '@systems/GridSystem';
import { placeBomb, tickBombs, primeBomb, rushBomb, detonateBomb } from '@systems/BombSystem';
import { spawnExplosion, tickExplosions } from '@systems/ExplosionSystem';
import { collectPowerUps } from '@systems/PowerUpSystem';

// Bootstrap
const state: GameState = createInitialState();
const input = new InputManager();
const scene = new SceneManager();
const particles = new ParticleManager(scene.scene); // NEW
const audio = new AudioEngine();
const hud = new HUD(); // NEW

const fpsEl = document.getElementById('fps-counter')!;

function update(dt: number, tick: number): void {
  state.tick = tick;

  // Input
  const inp = input.poll();
  const player = state.players[0];
  if (player?.alive) {
    player.moveDir = inp.moveDir;
    movePlayer(state, 0, dt);

    if (inp.placeBomb) {
      if (placeBomb(state, 0)) {
        audio.playBombPlace();
      }
    }

    if (inp.fuseAction === 'prime') primeBomb(state, 0);
    else if (inp.fuseAction === 'rush') rushBomb(state, 0);
    else if (inp.fuseAction === 'detonate') {
      const pos = detonateBomb(state, 0);
      if (pos) {
        spawnExplosion(state, pos, player.bombRange);
        particles.spawnExplosion(
          new THREE.Vector3(pos.col, 0.2, pos.row),
          player.bombRange
        ); // NEW
        audio.playExplosion();
      }
    }
  }

  // Tick bombs
  const detonated = tickBombs(state, dt);
  for (const pos of detonated) {
    spawnExplosion(state, pos, state.players[0]?.bombRange ?? 2);
    particles.spawnExplosion(
      new THREE.Vector3(pos.col, 0.2, pos.row),
      state.players[0]?.bombRange ?? 2
    ); // NEW
    audio.playExplosion();
  }

  // Tick explosions
  tickExplosions(state, dt);

  // Collect power-ups
  const collectedPowerUps = collectPowerUps(state); // Modified to return collected types
  for (const type of collectedPowerUps) {
    hud.showPowerUpCollected(type); // NEW
  }
  
  // Update particles
  particles.update(dt); // NEW
}

function render(alpha: number): void {
  scene.syncState(state, alpha);
  scene.render();
  hud.update(state); // NEW
  fpsEl.textContent = `${gameLoop.fps} FPS`;
}

const gameLoop = new GameLoop(update, render);
gameLoop.start();
```

### Modify `/src/systems/PowerUpSystem.ts` to return collected types

```typescript
export function collectPowerUps(state: GameState): string[] {
  const collected: string[] = [];
  
  for (const player of state.players) {
    if (!player.alive) continue;

    for (let i = state.powerUps.length - 1; i >= 0; i--) {
      const pu = state.powerUps[i];
      if (pu.gridPos.col === player.gridPos.col && pu.gridPos.row === player.gridPos.row) {
        applyPowerUp(state, player.id, pu.type);
        collected.push(pu.type);
        state.powerUps.splice(i, 1);
      }
    }
  }
  
  return collected;
}
```

---

## 5. Placeholder Particle Textures (Generate with DALL-E)

### Fire Particle Prompt
```
Fire particle sprite for game VFX, radial burst shape, bright orange to yellow gradient,
transparent background, 512x512, high contrast, cartoon style, no smoke,
glowing center fading to edges

Negative: realistic, 3D, smoke, dark, low contrast
```

### Smoke Particle Prompt
```
Smoke particle sprite for game VFX, wispy cloud shape, dark gray to light gray,
transparent background, 512x512, soft edges, cartoon style

Negative: realistic, 3D, fire, text, sharp edges
```

### Sparkle Particle Prompt
```
Star sparkle particle sprite for game VFX, 4-pointed star shape, bright white
with cyan tint, transparent background, 256x256, glowing effect, sharp points

Negative: realistic, 3D, complex, smoke
```

---

## Quick Start Instructions

1. **Create particle textures:**
   - Use DALL-E to generate fire, smoke, sparkle sprites
   - Save to `/assets/particles/fire.png`, `/assets/particles/smoke.png`, `/assets/particles/sparkle.png`

2. **Add ParticleManager:**
   - Copy `ParticleManager.ts` to `/src/rendering/`
   - Import and instantiate in `main.ts`

3. **Update SceneManager:**
   - Add enhanced bomb animation code
   - Test bomb state visuals

4. **Replace HUD:**
   - Update `index.html` with new HUD markup and styles
   - Update `HUD.ts` with new methods
   - Test stat updates in-game

5. **Test:**
   - Run game and place bombs
   - Check explosion particles
   - Verify HUD updates
   - Collect power-ups and see notifications

**Estimated implementation time:** 4-6 hours for all features

---

**Next Steps:** After implementing these core improvements, move to Phase 2 (textures and materials) from the main audit document.
