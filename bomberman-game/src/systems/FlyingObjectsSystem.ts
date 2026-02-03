import * as THREE from 'three';
import { LevelTheme } from '@core/ExtendedTypes';
import { GRID_SIZE } from '@core/types';

export interface FlyingObject {
  mesh: THREE.Group;
  velocity: THREE.Vector3;
  rotationSpeed: THREE.Vector3;
  type: string;
}

export interface SkyConfig {
  topColor: number;
  bottomColor: number;
  timeOfDay: 'dawn' | 'day' | 'dusk' | 'night';
  cloudDensity: number;
  starDensity: number;
}

export class FlyingObjectsSystem {
  private scene: THREE.Scene;
  private flyingObjects: FlyingObject[] = [];
  private skyMesh: THREE.Mesh | null = null;
  private cloudMeshes: THREE.Mesh[] = [];
  private starField: THREE.Points | null = null;
  
  private currentTheme: LevelTheme = LevelTheme.CLASSIC;
  private spawnTimer = 0;
  private spawnInterval = 1.5; // seconds between spawns
  
  private readonly MAX_OBJECTS = 25;
  private readonly SPAWN_DISTANCE = 50;
  private readonly DESPAWN_DISTANCE = -50;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.createSkyDome();
  }

  private createSkyDome(): void {
    // Create a large sky dome behind the game board
    const skyGeo = new THREE.SphereGeometry(100, 32, 32);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x0077ff) },
        bottomColor: { value: new THREE.Color(0xffffff) },
        offset: { value: 33 },
        exponent: { value: 0.6 }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false
    });
    
    this.skyMesh = new THREE.Mesh(skyGeo, skyMat);
    this.skyMesh.position.set(GRID_SIZE / 2, 0, GRID_SIZE / 2);
    this.skyMesh.renderOrder = -100;
    this.scene.add(this.skyMesh);
  }

  setTheme(theme: LevelTheme): void {
    this.currentTheme = theme;
    this.clearObjects();
    this.updateSky(theme);
    this.createClouds(theme);
    this.createStarField(theme);
    
    // Adjust spawn interval based on theme intensity
    this.spawnInterval = this.getSpawnIntervalForTheme(theme);
  }

  private getSpawnIntervalForTheme(theme: LevelTheme): number {
    switch (theme) {
      case LevelTheme.VOLCANO: return 0.8; // Lots of debris
      case LevelTheme.SPACE: return 0.5; // Lots of asteroids
      case LevelTheme.DESERT: return 2.0; // Less stuff
      default: return 1.2;
    }
  }

  private updateSky(theme: LevelTheme): void {
    if (!this.skyMesh) return;
    
    const config = this.getSkyConfigForTheme(theme);
    const mat = this.skyMesh.material as THREE.ShaderMaterial;
    
    mat.uniforms.topColor.value.setHex(config.topColor);
    mat.uniforms.bottomColor.value.setHex(config.bottomColor);
  }

  private getSkyConfigForTheme(theme: LevelTheme): SkyConfig {
    switch (theme) {
      case LevelTheme.CLASSIC:
        return { topColor: 0x1a1a2e, bottomColor: 0x16213e, timeOfDay: 'night', cloudDensity: 0.3, starDensity: 0.8 };
      case LevelTheme.ICE:
        return { topColor: 0x87ceeb, bottomColor: 0xe0f7ff, timeOfDay: 'day', cloudDensity: 0.7, starDensity: 0 };
      case LevelTheme.VOLCANO:
        return { topColor: 0x1a0a00, bottomColor: 0x4a1a00, timeOfDay: 'dusk', cloudDensity: 0.9, starDensity: 0 };
      case LevelTheme.FOREST:
        return { topColor: 0x228b22, bottomColor: 0x90ee90, timeOfDay: 'day', cloudDensity: 0.5, starDensity: 0 };
      case LevelTheme.DESERT:
        return { topColor: 0xff8c00, bottomColor: 0xffd700, timeOfDay: 'dusk', cloudDensity: 0.2, starDensity: 0 };
      case LevelTheme.SPACE:
        return { topColor: 0x000011, bottomColor: 0x000022, timeOfDay: 'night', cloudDensity: 0, starDensity: 1.0 };
      case LevelTheme.MIAMI_BEACH:
        return { topColor: 0xff6b9d, bottomColor: 0xffa07a, timeOfDay: 'dusk', cloudDensity: 0.4, starDensity: 0 };
      default:
        return { topColor: 0x0077ff, bottomColor: 0xaaddff, timeOfDay: 'day', cloudDensity: 0.5, starDensity: 0 };
    }
  }

  private createClouds(theme: LevelTheme): void {
    // Clear old clouds
    this.cloudMeshes.forEach(c => this.scene.remove(c));
    this.cloudMeshes = [];
    
    const config = this.getSkyConfigForTheme(theme);
    if (config.cloudDensity === 0) return;
    
    const cloudCount = Math.floor(15 * config.cloudDensity);
    const cloudGeo = new THREE.SphereGeometry(3, 8, 8);
    
    // Cloud colors based on theme
    let cloudColor = 0xffffff;
    if (theme === LevelTheme.VOLCANO) cloudColor = 0x333333; // Smoke
    if (theme === LevelTheme.SPACE) return; // No clouds in space
    
    const cloudMat = new THREE.MeshBasicMaterial({ 
      color: cloudColor, 
      transparent: true, 
      opacity: 0.6 
    });
    
    for (let i = 0; i < cloudCount; i++) {
      const cloud = new THREE.Group();
      
      // Create puffy cloud from multiple spheres
      for (let j = 0; j < 5; j++) {
        const puff = new THREE.Mesh(cloudGeo, cloudMat);
        puff.position.set(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 2
        );
        puff.scale.setScalar(0.5 + Math.random() * 0.5);
        cloud.add(puff);
      }
      
      cloud.position.set(
        Math.random() * 80 - 40,
        15 + Math.random() * 20,
        -20 - Math.random() * 30
      );
      
      this.scene.add(cloud);
      this.cloudMeshes.push(cloud as unknown as THREE.Mesh);
    }
  }

  private createStarField(theme: LevelTheme): void {
    if (this.starField) {
      this.scene.remove(this.starField);
      this.starField = null;
    }
    
    const config = this.getSkyConfigForTheme(theme);
    if (config.starDensity === 0) return;
    
    const starCount = Math.floor(500 * config.starDensity);
    const positions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.5; // Upper hemisphere only
      const r = 80;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) + GRID_SIZE / 2;
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) + GRID_SIZE / 2;
    }
    
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const starMat = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 0.3,
      transparent: true,
      opacity: 0.8
    });
    
    this.starField = new THREE.Points(starGeo, starMat);
    this.scene.add(this.starField);
  }

  update(deltaTime: number): void {
    // Spawn new objects
    this.spawnTimer += deltaTime;
    if (this.spawnTimer >= this.spawnInterval && this.flyingObjects.length < this.MAX_OBJECTS) {
      this.spawnTimer = 0;
      this.spawnObject();
    }
    
    // Update existing objects
    for (let i = this.flyingObjects.length - 1; i >= 0; i--) {
      const obj = this.flyingObjects[i];
      
      // Move object
      obj.mesh.position.add(obj.velocity.clone().multiplyScalar(deltaTime));
      
      // Rotate object
      obj.mesh.rotation.x += obj.rotationSpeed.x * deltaTime;
      obj.mesh.rotation.y += obj.rotationSpeed.y * deltaTime;
      obj.mesh.rotation.z += obj.rotationSpeed.z * deltaTime;
      
      // Remove if past despawn distance
      if (obj.mesh.position.z > GRID_SIZE + 30 || obj.mesh.position.z < -50) {
        this.scene.remove(obj.mesh);
        this.flyingObjects.splice(i, 1);
      }
    }
    
    // Slowly move clouds
    this.cloudMeshes.forEach((cloud, i) => {
      cloud.position.x += deltaTime * 2 * (0.5 + (i % 3) * 0.3);
      if (cloud.position.x > 60) cloud.position.x = -60;
    });
    
    // Twinkle stars
    if (this.starField) {
      const mat = this.starField.material as THREE.PointsMaterial;
      mat.opacity = 0.6 + Math.sin(Date.now() * 0.003) * 0.2;
    }
  }

  private spawnObject(): void {
    const objectConfig = this.getRandomObjectForTheme(this.currentTheme);
    if (!objectConfig) return;
    
    const group = this.createObjectMesh(objectConfig);
    
    // Spawn from far away, flying toward and past the board
    const side = Math.random() > 0.5 ? 1 : -1;
    const startX = GRID_SIZE / 2 + (Math.random() - 0.5) * 40;
    const startY = 5 + Math.random() * 15;
    const startZ = -this.SPAWN_DISTANCE;
    
    group.position.set(startX, startY, startZ);
    
    // Velocity toward the player (positive Z)
    const speed = 15 + Math.random() * 25;
    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 2,
      speed
    );
    
    const rotationSpeed = new THREE.Vector3(
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3
    );
    
    this.flyingObjects.push({
      mesh: group,
      velocity,
      rotationSpeed,
      type: objectConfig.type
    });
    
    this.scene.add(group);
  }

  private getRandomObjectForTheme(theme: LevelTheme): { type: string; color: number; geometry: 'box' | 'sphere' | 'cone' | 'torus' } | null {
    const objects: { type: string; color: number; geometry: 'box' | 'sphere' | 'cone' | 'torus' }[] = [];
    
    switch (theme) {
      case LevelTheme.CLASSIC:
        objects.push(
          { type: 'crate', color: 0x8b4513, geometry: 'box' },
          { type: 'barrel', color: 0x444444, geometry: 'sphere' },
          { type: 'debris', color: 0x666666, geometry: 'box' }
        );
        break;
      case LevelTheme.ICE:
        objects.push(
          { type: 'snowball', color: 0xffffff, geometry: 'sphere' },
          { type: 'iceberg', color: 0x88ccff, geometry: 'box' },
          { type: 'penguin', color: 0x111111, geometry: 'sphere' },
          { type: 'icicle', color: 0xaaddff, geometry: 'cone' }
        );
        break;
      case LevelTheme.VOLCANO:
        objects.push(
          { type: 'lavaRock', color: 0xff4400, geometry: 'sphere' },
          { type: 'ash', color: 0x333333, geometry: 'sphere' },
          { type: 'ember', color: 0xff6600, geometry: 'sphere' },
          { type: 'boulder', color: 0x4a3020, geometry: 'box' }
        );
        break;
      case LevelTheme.FOREST:
        objects.push(
          { type: 'leaf', color: 0x228b22, geometry: 'sphere' },
          { type: 'bird', color: 0xff6600, geometry: 'cone' },
          { type: 'acorn', color: 0x8b4513, geometry: 'sphere' },
          { type: 'butterfly', color: 0xff69b4, geometry: 'box' }
        );
        break;
      case LevelTheme.DESERT:
        objects.push(
          { type: 'tumbleweed', color: 0xc4a35a, geometry: 'sphere' },
          { type: 'sand', color: 0xffd700, geometry: 'sphere' },
          { type: 'cactus', color: 0x228b22, geometry: 'cone' },
          { type: 'vulture', color: 0x333333, geometry: 'cone' }
        );
        break;
      case LevelTheme.SPACE:
        objects.push(
          { type: 'asteroid', color: 0x666666, geometry: 'sphere' },
          { type: 'satellite', color: 0xcccccc, geometry: 'box' },
          { type: 'meteor', color: 0xff4400, geometry: 'sphere' },
          { type: 'alien', color: 0x00ff00, geometry: 'sphere' },
          { type: 'spacejunk', color: 0x888888, geometry: 'torus' }
        );
        break;
      case LevelTheme.MIAMI_BEACH:
        objects.push(
          { type: 'beachball', color: 0xff6b9d, geometry: 'sphere' },
          { type: 'seagull', color: 0xffffff, geometry: 'cone' },
          { type: 'coconut', color: 0x8b4513, geometry: 'sphere' },
          { type: 'surfboard', color: 0x00bfff, geometry: 'box' },
          { type: 'flamingo', color: 0xff69b4, geometry: 'cone' }
        );
        break;
      default:
        // Random objects for tornado effect - COWS FLYING!
        objects.push(
          { type: 'cow', color: 0xffffff, geometry: 'box' },
          { type: 'car', color: 0xff0000, geometry: 'box' },
          { type: 'house', color: 0x884422, geometry: 'box' },
          { type: 'tree', color: 0x228b22, geometry: 'cone' }
        );
    }
    
    if (objects.length === 0) return null;
    return objects[Math.floor(Math.random() * objects.length)];
  }

  private createObjectMesh(config: { type: string; color: number; geometry: 'box' | 'sphere' | 'cone' | 'torus' }): THREE.Group {
    const group = new THREE.Group();
    
    let geo: THREE.BufferGeometry;
    const size = 0.5 + Math.random() * 1.5;
    
    switch (config.geometry) {
      case 'sphere':
        geo = new THREE.SphereGeometry(size, 12, 12);
        break;
      case 'cone':
        geo = new THREE.ConeGeometry(size * 0.6, size * 1.5, 8);
        break;
      case 'torus':
        geo = new THREE.TorusGeometry(size, size * 0.3, 8, 16);
        break;
      case 'box':
      default:
        geo = new THREE.BoxGeometry(size, size, size);
    }
    
    const mat = new THREE.MeshStandardMaterial({ 
      color: config.color,
      emissive: config.color,
      emissiveIntensity: 0.1,
      roughness: 0.7
    });
    
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    group.add(mesh);
    
    // Add glow effect for certain types
    if (config.type === 'meteor' || config.type === 'ember' || config.type === 'lavaRock') {
      const glowMat = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.4
      });
      const glowMesh = new THREE.Mesh(geo.clone(), glowMat);
      glowMesh.scale.setScalar(1.3);
      group.add(glowMesh);
    }
    
    return group;
  }

  private clearObjects(): void {
    this.flyingObjects.forEach(obj => this.scene.remove(obj.mesh));
    this.flyingObjects = [];
  }

  dispose(): void {
    this.clearObjects();
    this.cloudMeshes.forEach(c => this.scene.remove(c));
    this.cloudMeshes = [];
    
    if (this.skyMesh) {
      this.scene.remove(this.skyMesh);
      this.skyMesh = null;
    }
    
    if (this.starField) {
      this.scene.remove(this.starField);
      this.starField = null;
    }
  }
}
