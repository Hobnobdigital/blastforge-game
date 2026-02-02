import * as THREE from 'three';
import { LevelTheme } from '@core/ExtendedTypes';

export enum WeatherType {
  NONE = 'none',
  RAIN = 'rain',
  SNOW = 'snow',
  ASH = 'ash',
  POLLEN = 'pollen',
  NEON = 'neon',
}

export interface WeatherConfig {
  type: WeatherType;
  intensity: number; // 0.0 - 1.0
  enabled: boolean;
}

interface ParticleData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

interface SplashData {
  position: THREE.Vector3;
  scale: number;
  life: number;
  maxLife: number;
}

export class WeatherSystem {
  private scene: THREE.Scene;
  private currentWeather: WeatherType = WeatherType.NONE;
  private intensity: number = 0.5;
  private enabled: boolean = true;

  // Particle systems
  private particleCount: number = 2000;
  private particles: ParticleData[] = [];
  private splashes: SplashData[] = [];

  // Instanced mesh for particles (performance optimized)
  private particleMesh!: THREE.InstancedMesh;
  private splashMesh!: THREE.InstancedMesh;
  private dummy = new THREE.Object3D();

  // Materials
  private rainMaterial!: THREE.MeshBasicMaterial;
  private snowMaterial!: THREE.MeshBasicMaterial;
  private ashMaterial!: THREE.MeshBasicMaterial;
  private pollenMaterial!: THREE.MeshBasicMaterial;
  private neonMaterial!: THREE.MeshBasicMaterial;

  // Geometries
  private rainGeo!: THREE.CylinderGeometry;
  private snowGeo!: THREE.OctahedronGeometry;
  private ashGeo!: THREE.PlaneGeometry;
  private pollenGeo!: THREE.SphereGeometry;
  private neonGeo!: THREE.OctahedronGeometry;
  private splashGeo!: THREE.RingGeometry;

  // Accumulation for snow
  private snowAccumulation: Map<string, number> = new Map();
  private accumulationMesh!: THREE.InstancedMesh;
  private accumulationDummy = new THREE.Object3D();

  // Bounds
  private bounds = { minX: -2, maxX: 18, minZ: -2, maxZ: 18, height: 20 };

  // Fire glow for ash/ember effect
  private fireLight!: THREE.PointLight;
  private fireGlowMesh!: THREE.Mesh;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.initializeMaterials();
    this.initializeGeometries();
    this.initializeParticleMesh();
    this.initializeSplashes();
    this.initializeAccumulation();
    this.initializeFireGlow();
    this.initializeParticles();
  }

  private initializeMaterials(): void {
    // Rain: Blue/cyan streaks
    this.rainMaterial = new THREE.MeshBasicMaterial({
      color: 0x44aaff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Snow: White flakes
    this.snowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Ash: Orange/red glowing particles
    this.ashMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4422,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Pollen: Soft yellow/white
    this.pollenMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffaa,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Neon: Cyan/pink digital sparkles
    this.neonMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }

  private initializeGeometries(): void {
    // Rain: Elongated cylinder for streak effect
    this.rainGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.8, 4);
    this.rainGeo.translate(0, 0.4, 0); // Pivot at top

    // Snow: Octahedron for crystalline look
    this.snowGeo = new THREE.OctahedronGeometry(0.08, 0);

    // Ash: Small plane for ember
    this.ashGeo = new THREE.PlaneGeometry(0.08, 0.08);

    // Pollen: Small sphere
    this.pollenGeo = new THREE.SphereGeometry(0.06, 6, 6);

    // Neon: Sharp octahedron for digital look
    this.neonGeo = new THREE.OctahedronGeometry(0.05, 0);

    // Splash: Ring for ground impact
    this.splashGeo = new THREE.RingGeometry(0.05, 0.15, 8);
    this.splashGeo.rotateX(-Math.PI / 2);
  }

  private initializeParticleMesh(): void {
    // Start with rain geometry as default
    this.particleMesh = new THREE.InstancedMesh(
      this.rainGeo,
      this.rainMaterial,
      this.particleCount
    );
    this.particleMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.particleMesh.count = 0; // Start hidden
    this.scene.add(this.particleMesh);
  }

  private initializeSplashes(): void {
    this.splashMesh = new THREE.InstancedMesh(
      this.splashGeo,
      new THREE.MeshBasicMaterial({
        color: 0x44aaff,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      100
    );
    this.splashMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.splashMesh.count = 0;
    this.scene.add(this.splashMesh);
  }

  private initializeAccumulation(): void {
    // For snow accumulation on ground
    this.accumulationMesh = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.4, 0.5, 0.1, 6),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.6,
        roughness: 0.8,
      }),
      256
    );
    this.accumulationMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.accumulationMesh.count = 0;
    this.accumulationMesh.visible = false;
    this.scene.add(this.accumulationMesh);
  }

  private initializeFireGlow(): void {
    // Fire glow light for ash/ember effect
    this.fireLight = new THREE.PointLight(0xff4422, 0, 30);
    this.fireLight.position.set(8, 5, 8);
    this.scene.add(this.fireLight);

    // Volumetric fire glow mesh
    const glowGeo = new THREE.SphereGeometry(8, 32, 32);
    this.fireGlowMesh = new THREE.Mesh(
      glowGeo,
      new THREE.MeshBasicMaterial({
        color: 0xff2200,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.BackSide,
      })
    );
    this.fireGlowMesh.position.set(8, 4, 8);
    this.scene.add(this.fireGlowMesh);
  }

  private initializeParticles(): void {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        position: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        life: 0,
        maxLife: 1,
        size: 1,
        rotation: 0,
        rotationSpeed: 0,
      });
    }

    for (let i = 0; i < 100; i++) {
      this.splashes.push({
        position: new THREE.Vector3(),
        scale: 0,
        life: 0,
        maxLife: 0.3,
      });
    }
  }

  setWeather(weather: WeatherType, intensity: number = 0.5): void {
    if (this.currentWeather === weather && this.intensity === intensity) return;

    this.currentWeather = weather;
    this.intensity = Math.max(0, Math.min(1, intensity));

    console.log(`🌦️ WeatherSystem.setWeather: ${weather}, intensity: ${this.intensity}`);

    this.updateWeatherGeometry();
    this.resetParticles();
    this.updateFireGlow();

    // Show/hide accumulation for snow
    this.accumulationMesh.visible = weather === WeatherType.SNOW;
    
    console.log(`🌦️ Particle mesh count: ${this.particleMesh.count}, enabled: ${this.enabled}`);
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) {
      this.particleMesh.count = 0;
      this.splashMesh.count = 0;
      this.accumulationMesh.visible = false;
      this.fireLight.intensity = 0;
      const glowMaterial = this.fireGlowMesh.material as THREE.MeshBasicMaterial;
      glowMaterial.opacity = 0;
    }
  }

  setIntensity(intensity: number): void {
    this.intensity = Math.max(0, Math.min(1, intensity));
  }

  private updateWeatherGeometry(): void {
    this.scene.remove(this.particleMesh);

    switch (this.currentWeather) {
      case WeatherType.RAIN:
        this.particleMesh = new THREE.InstancedMesh(
          this.rainGeo,
          this.rainMaterial,
          this.particleCount
        );
        break;
      case WeatherType.SNOW:
        this.particleMesh = new THREE.InstancedMesh(
          this.snowGeo,
          this.snowMaterial,
          this.particleCount
        );
        break;
      case WeatherType.ASH:
        this.particleMesh = new THREE.InstancedMesh(
          this.ashGeo,
          this.ashMaterial,
          this.particleCount
        );
        break;
      case WeatherType.POLLEN:
        this.particleMesh = new THREE.InstancedMesh(
          this.pollenGeo,
          this.pollenMaterial,
          this.particleCount
        );
        break;
      case WeatherType.NEON:
        this.particleMesh = new THREE.InstancedMesh(
          this.neonGeo,
          this.neonMaterial,
          this.particleCount
        );
        break;
      default:
        this.particleMesh = new THREE.InstancedMesh(
          this.rainGeo,
          this.rainMaterial,
          this.particleCount
        );
    }

    this.particleMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.particleMesh.count = this.enabled && this.currentWeather !== WeatherType.NONE
      ? Math.floor(this.particleCount * this.intensity)
      : 0;
    this.scene.add(this.particleMesh);
  }

  private updateFireGlow(): void {
    if (this.currentWeather === WeatherType.ASH) {
      this.fireLight.intensity = 2 * this.intensity;
      const material = this.fireGlowMesh.material as THREE.MeshBasicMaterial;
      material.opacity = 0.15 * this.intensity;
    } else {
      this.fireLight.intensity = 0;
      const material = this.fireGlowMesh.material as THREE.MeshBasicMaterial;
      material.opacity = 0;
    }
  }

  private resetParticles(): void {
    for (const particle of this.particles) {
      this.spawnParticle(particle);
    }
  }

  private spawnParticle(particle: ParticleData): void {
    const x = this.bounds.minX + Math.random() * (this.bounds.maxX - this.bounds.minX);
    const z = this.bounds.minZ + Math.random() * (this.bounds.maxZ - this.bounds.minZ);
    const y = Math.random() * this.bounds.height;

    particle.position.set(x, y, z);
    particle.life = Math.random();
    particle.maxLife = 1;
    particle.size = 0.5 + Math.random() * 0.5;
    particle.rotation = Math.random() * Math.PI * 2;
    particle.rotationSpeed = (Math.random() - 0.5) * 2;

    switch (this.currentWeather) {
      case WeatherType.RAIN:
        particle.velocity.set(
          (Math.random() - 0.5) * 2,
          -15 - Math.random() * 5,
          (Math.random() - 0.5) * 2
        );
        break;
      case WeatherType.SNOW:
        particle.velocity.set(
          (Math.random() - 0.5) * 1,
          -2 - Math.random() * 2,
          (Math.random() - 0.5) * 1
        );
        break;
      case WeatherType.ASH:
        particle.velocity.set(
          (Math.random() - 0.5) * 3,
          2 + Math.random() * 3,
          (Math.random() - 0.5) * 3
        );
        break;
      case WeatherType.POLLEN:
        particle.velocity.set(
          (Math.random() - 0.5) * 0.5,
          -0.5 - Math.random() * 0.5,
          (Math.random() - 0.5) * 0.5
        );
        break;
      case WeatherType.NEON:
        particle.velocity.set(
          (Math.random() - 0.5) * 1,
          3 + Math.random() * 4,
          (Math.random() - 0.5) * 1
        );
        break;
    }
  }

  private spawnSplash(x: number, z: number): void {
    // Find an inactive splash
    for (const splash of this.splashes) {
      if (splash.life <= 0) {
        splash.position.set(x, 0.05, z);
        splash.scale = 0.1;
        splash.life = splash.maxLife;
        return;
      }
    }
  }

  update(dt: number): void {
    if (!this.enabled || this.currentWeather === WeatherType.NONE) return;

    const deltaTime = Math.min(dt, 0.05); // Cap delta time for stability
    const activeCount = Math.floor(this.particleCount * this.intensity);
    
    // Debug: log first update call
    if (Math.random() < 0.01) {
      console.log(`🌦️ Weather update: ${this.currentWeather}, active particles: ${activeCount}, dt: ${dt.toFixed(4)}`);
    }

    // Update particles
    let splashCount = 0;
    for (let i = 0; i < activeCount; i++) {
      const particle = this.particles[i];

      // Update position
      particle.position.x += particle.velocity.x * deltaTime;
      particle.position.y += particle.velocity.y * deltaTime;
      particle.position.z += particle.velocity.z * deltaTime;

      // Add drift for some weather types
      if (this.currentWeather === WeatherType.SNOW) {
        particle.position.x += Math.sin(Date.now() * 0.001 + i) * 0.01;
        particle.position.z += Math.cos(Date.now() * 0.0013 + i) * 0.01;
      } else if (this.currentWeather === WeatherType.POLLEN) {
        particle.position.x += Math.sin(Date.now() * 0.002 + i * 0.1) * 0.02;
        particle.position.z += Math.cos(Date.now() * 0.0017 + i * 0.1) * 0.02;
      } else if (this.currentWeather === WeatherType.ASH) {
        // Ash turbulence
        particle.position.x += Math.sin(Date.now() * 0.003 + i * 0.05) * 0.03;
        particle.position.z += Math.cos(Date.now() * 0.0025 + i * 0.05) * 0.03;
      }

      // Update rotation
      particle.rotation += particle.rotationSpeed * deltaTime;

      // Update life
      particle.life -= deltaTime * 0.5;

      // Check bounds and respawn
      const outOfBounds =
        particle.position.x < this.bounds.minX ||
        particle.position.x > this.bounds.maxX ||
        particle.position.z < this.bounds.minZ ||
        particle.position.z > this.bounds.maxZ;

      const hitGround = particle.position.y <= 0;
      const hitCeiling = particle.position.y >= this.bounds.height;

      if (particle.life <= 0 || outOfBounds || hitGround || hitCeiling) {
        // Spawn splash for rain hitting ground
        if (this.currentWeather === WeatherType.RAIN && hitGround && particle.life > 0) {
          this.spawnSplash(particle.position.x, particle.position.z);
        }

        // Snow accumulation
        if (this.currentWeather === WeatherType.SNOW && hitGround) {
          this.addSnowAccumulation(particle.position.x, particle.position.z);
        }

        this.spawnParticle(particle);
      }

      // Update instance matrix
      this.dummy.position.copy(particle.position);
      this.dummy.scale.setScalar(particle.size);

      if (this.currentWeather === WeatherType.RAIN) {
        // Rain streaks point in velocity direction
        this.dummy.lookAt(
          particle.position.x + particle.velocity.x,
          particle.position.y + particle.velocity.y,
          particle.position.z + particle.velocity.z
        );
      } else if (this.currentWeather === WeatherType.ASH) {
        // Ash faces camera
        this.dummy.rotation.set(0, particle.rotation, 0);
      } else {
        // Others rotate freely
        this.dummy.rotation.set(particle.rotation, particle.rotation * 0.7, 0);
      }

      this.dummy.updateMatrix();
      this.particleMesh.setMatrixAt(i, this.dummy.matrix);
    }

    this.particleMesh.count = activeCount;
    this.particleMesh.instanceMatrix.needsUpdate = true;

    // Update splashes
    this.updateSplashes(deltaTime);

    // Update snow accumulation
    if (this.currentWeather === WeatherType.SNOW) {
      this.updateAccumulation();
    }

    // Update fire glow animation
    if (this.currentWeather === WeatherType.ASH) {
      const flicker = 0.9 + Math.random() * 0.2;
      this.fireLight.intensity = 2 * this.intensity * flicker;
      const material = this.fireGlowMesh.material as THREE.MeshBasicMaterial;
      material.opacity = 0.15 * this.intensity * flicker;
    }
  }

  private updateSplashes(deltaTime: number): void {
    let activeSplashes = 0;

    for (let i = 0; i < this.splashes.length; i++) {
      const splash = this.splashes[i];

      if (splash.life > 0) {
        splash.life -= deltaTime;
        const progress = 1 - (splash.life / splash.maxLife);
        splash.scale = 0.1 + progress * 0.5;

        this.dummy.position.copy(splash.position);
        this.dummy.scale.set(splash.scale, splash.scale, splash.scale);
        this.dummy.rotation.x = -Math.PI / 2;
        this.dummy.updateMatrix();
        this.splashMesh.setMatrixAt(activeSplashes++, this.dummy.matrix);
      }
    }

    this.splashMesh.count = activeSplashes;
    this.splashMesh.instanceMatrix.needsUpdate = true;
  }

  private addSnowAccumulation(x: number, z: number): void {
    const key = `${Math.floor(x)},${Math.floor(z)}`;
    const current = this.snowAccumulation.get(key) || 0;
    this.snowAccumulation.set(key, Math.min(current + 0.01, 0.3));
  }

  private updateAccumulation(): void {
    let index = 0;
    for (const [key, height] of this.snowAccumulation) {
      if (height > 0.01 && index < 256) {
        const [x, z] = key.split(',').map(Number);
        this.accumulationDummy.position.set(x + 0.5, height / 2, z + 0.5);
        this.accumulationDummy.scale.set(1, height * 3, 1);
        this.accumulationDummy.updateMatrix();
        this.accumulationMesh.setMatrixAt(index++, this.accumulationDummy.matrix);
      }
    }
    this.accumulationMesh.count = index;
    this.accumulationMesh.instanceMatrix.needsUpdate = true;
  }

  // Get default weather for theme
  static getWeatherForTheme(theme: LevelTheme): WeatherType {
    switch (theme) {
      case LevelTheme.ICE:
        return WeatherType.SNOW;
      case LevelTheme.VOLCANO:
        return WeatherType.ASH;
      case LevelTheme.FOREST:
        return WeatherType.POLLEN;
      case LevelTheme.SPACE:
        return WeatherType.NEON;
      case LevelTheme.MIAMI_BEACH:
        return WeatherType.NONE; // Sunny beach - no weather particles
      case LevelTheme.CLASSIC:
      case LevelTheme.DESERT:
      default:
        return WeatherType.NONE;
    }
  }

  dispose(): void {
    this.scene.remove(this.particleMesh);
    this.scene.remove(this.splashMesh);
    this.scene.remove(this.accumulationMesh);
    this.scene.remove(this.fireLight);
    this.scene.remove(this.fireGlowMesh);

    this.particleMesh.geometry.dispose();
    this.splashMesh.geometry.dispose();
    this.accumulationMesh.geometry.dispose();
    this.fireGlowMesh.geometry.dispose();

    this.rainMaterial.dispose();
    this.snowMaterial.dispose();
    this.ashMaterial.dispose();
    this.pollenMaterial.dispose();
    this.neonMaterial.dispose();
    const splashMaterial = this.splashMesh.material as THREE.Material;
    splashMaterial.dispose();
    const accumulationMaterial = this.accumulationMesh.material as THREE.Material;
    accumulationMaterial.dispose();
    const glowMaterial = this.fireGlowMesh.material as THREE.Material;
    glowMaterial.dispose();
  }
}
