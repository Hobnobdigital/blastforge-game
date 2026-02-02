/** Miami Beach Theme - AAA Mobile Game Quality
 * Features: Golden sand, turquoise water, palm trees, pastel sunset sky,
 * neon accents, beach decorations with PBR materials and volumetric lighting
 */

import * as THREE from 'three';

export interface ThemeAssets {
  floorMaterial: THREE.Material;
  hardBlockMaterial: THREE.Material;
  softBlockMaterial: THREE.Material;
  waterMaterial: THREE.Material;
  palmTrunkMaterial: THREE.Material;
  palmLeafMaterial: THREE.Material;
  umbrellaMaterial: THREE.Material;
  surfboardMaterial: THREE.Material;
  skyGradient: THREE.Texture;
}

export class MiamiBeachTheme {
  private scene: THREE.Scene;
  private assets: ThemeAssets;
  private animationMixers: THREE.AnimationMixer[] = [];
  private waterMesh?: THREE.Mesh;
  private palmTrees: THREE.Group[] = [];
  private breezeParticles?: THREE.Points;
  private time = 0;

  // Procedural texture caches
  private textureCache: Map<string, THREE.Texture> = new Map();

  constructor(scene: THREE.Scene) {
    console.log('[MiamiBeachTheme] 🏖️ Constructor called');
    this.scene = scene;
    this.assets = this.createAssets();
    console.log('[MiamiBeachTheme] ✅ Assets created:', Object.keys(this.assets));
    this.setupEnvironment();
    this.createDecorations();
    console.log('[MiamiBeachTheme] 🎉 Theme setup complete. Scene children count:', this.scene.children.length);
  }

  /** Generate procedural sand texture with wave patterns */
  private createSandTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Base golden sand color
    const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
    gradient.addColorStop(0, '#e8c98f');
    gradient.addColorStop(0.3, '#f5deb3');
    gradient.addColorStop(0.5, '#e8c98f');
    gradient.addColorStop(0.7, '#deb887');
    gradient.addColorStop(1, '#e8c98f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);

    // Add wave patterns in sand
    ctx.strokeStyle = '#d4a574';
    ctx.lineWidth = 2;
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      const y = Math.random() * 1024;
      ctx.moveTo(0, y);
      for (let x = 0; x <= 1024; x += 50) {
        ctx.lineTo(x, y + Math.sin(x * 0.02) * 20 + Math.random() * 10);
      }
      ctx.stroke();
    }

    // Add grain/noise
    const imageData = ctx.getImageData(0, 0, 1024, 1024);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 15;
      data[i] += noise;
      data[i + 1] += noise;
      data[i + 2] += noise;
    }
    ctx.putImageData(imageData, 0, 0);

    // Add subtle sparkles
    ctx.fillStyle = '#fff8dc';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const size = Math.random() * 2;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    texture.anisotropy = 16;
    return texture;
  }

  /** Generate water normal map for realistic waves */
  private createWaterNormalMap(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Create normal map-like pattern
    const imageData = ctx.createImageData(512, 512);
    const data = imageData.data;

    for (let y = 0; y < 512; y++) {
      for (let x = 0; x < 512; x++) {
        const i = (y * 512 + x) * 4;
        const wave1 = Math.sin(x * 0.05 + y * 0.03) * 127 + 128;
        const wave2 = Math.sin(x * 0.08 - y * 0.05) * 64;
        data[i] = wave1 + wave2;     // R (normal X)
        data[i + 1] = 200;           // G (normal Y - mostly up)
        data[i + 2] = 255;           // B (normal Z)
        data[i + 3] = 255;           // A
      }
    }
    ctx.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  /** Create pastel sunset sky gradient */
  private createSkyGradient(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Miami sunset: pink/orange/purple gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 1024);
    gradient.addColorStop(0, '#ff6b9d');    // Hot pink top
    gradient.addColorStop(0.2, '#ff8c69');  // Coral
    gradient.addColorStop(0.4, '#ffa500');  // Orange
    gradient.addColorStop(0.6, '#ff7f50');  // Coral pink
    gradient.addColorStop(0.8, '#9370db');  // Medium purple
    gradient.addColorStop(1, '#4b0082');    // Indigo bottom

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1, 1024);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  /** Generate weathered wood texture for crates */
  private createWoodTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Base wood color
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(0, 0, 512, 512);

    // Wood grain
    ctx.strokeStyle = '#6b5344';
    ctx.lineWidth = 3;
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      const x = Math.random() * 512;
      ctx.moveTo(x, 0);
      ctx.lineTo(x + (Math.random() - 0.5) * 50, 512);
      ctx.stroke();
    }

    // Weathering
    ctx.fillStyle = 'rgba(100, 90, 80, 0.3)';
    for (let i = 0; i < 100; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 512, Math.random() * 20, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  /** Generate coral stone texture for solid blocks */
  private createCoralTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Coral stone base
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 300);
    gradient.addColorStop(0, '#ff7f7f');
    gradient.addColorStop(0.5, '#ff6b6b');
    gradient.addColorStop(1, '#cd5c5c');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Coral texture
    ctx.fillStyle = 'rgba(255, 200, 200, 0.4)';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = Math.random() * 8 + 2;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Cracks
    ctx.strokeStyle = 'rgba(80, 40, 40, 0.6)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 15; i++) {
      ctx.beginPath();
      let x = Math.random() * 512;
      let y = Math.random() * 512;
      ctx.moveTo(x, y);
      for (let j = 0; j < 5; j++) {
        x += (Math.random() - 0.5) * 50;
        y += (Math.random() - 0.5) * 50;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  /** Create all PBR materials */
  private createAssets(): ThemeAssets {
    // Sand floor with PBR
    const sandTexture = this.createSandTexture();
    const sandMaterial = new THREE.MeshStandardMaterial({
      map: sandTexture,
      roughness: 0.9,
      metalness: 0.0,
      bumpMap: sandTexture,
      bumpScale: 0.02,
    });

    // Coral stone for hard blocks
    const coralTexture = this.createCoralTexture();
    const hardBlockMaterial = new THREE.MeshStandardMaterial({
      map: coralTexture,
      roughness: 0.8,
      metalness: 0.1,
      bumpMap: coralTexture,
      bumpScale: 0.05,
    });

    // Weathered wood for soft blocks (destroyable)
    const woodTexture = this.createWoodTexture();
    const softBlockMaterial = new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.7,
      metalness: 0.0,
      bumpMap: woodTexture,
      bumpScale: 0.03,
    });

    // Turquoise water with PBR
    const waterNormal = this.createWaterNormalMap();
    const waterMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x40e0d0,
      transparent: true,
      opacity: 0.8,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.3,
      thickness: 1.0,
      normalMap: waterNormal,
      normalScale: new THREE.Vector2(0.5, 0.5),
      envMapIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    // Palm tree materials
    const palmTrunkMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b4513,
      roughness: 0.9,
      metalness: 0.0,
    });

    const palmLeafMaterial = new THREE.MeshStandardMaterial({
      color: 0x228b22,
      roughness: 0.6,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });

    // Beach umbrella - neon Miami style
    const umbrellaMaterial = new THREE.MeshStandardMaterial({
      color: 0xff1493,
      emissive: 0xff0066,
      emissiveIntensity: 0.2,
      roughness: 0.4,
      metalness: 0.3,
    });

    // Surfboard material
    const surfboardMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x0088aa,
      emissiveIntensity: 0.1,
      roughness: 0.2,
      metalness: 0.4,
    });

    return {
      floorMaterial: sandMaterial,
      hardBlockMaterial,
      softBlockMaterial,
      waterMaterial,
      palmTrunkMaterial,
      palmLeafMaterial,
      umbrellaMaterial,
      surfboardMaterial,
      skyGradient: this.createSkyGradient(),
    };
  }

  /** Setup the environment - lighting, sky, water plane */
  private setupEnvironment(): void {
    console.log('[MiamiBeachTheme] 🌅 Setting up environment...');
    // Clear existing lights
    const lightsRemoved = this.scene.children.filter(c => c instanceof THREE.Light).length;
    this.scene.children.filter(c => c instanceof THREE.Light).forEach(l => this.scene.remove(l));
    console.log(`[MiamiBeachTheme] 💡 Removed ${lightsRemoved} existing lights`);

    // Warm sunset ambient light
    const ambientLight = new THREE.AmbientLight(0xffaa77, 0.4);
    this.scene.add(ambientLight);

    // Main sunset directional light (warm orange)
    const sunLight = new THREE.DirectionalLight(0xff8844, 1.2);
    sunLight.position.set(20, 15, -20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(2048, 2048);
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 100;
    sunLight.shadow.camera.left = -30;
    sunLight.shadow.camera.right = 30;
    sunLight.shadow.camera.top = 30;
    sunLight.shadow.camera.bottom = -30;
    sunLight.shadow.bias = -0.001;
    this.scene.add(sunLight);

    // Rim light for that Miami neon glow
    const rimLight = new THREE.DirectionalLight(0xff1493, 0.6);
    rimLight.position.set(-20, 10, 20);
    this.scene.add(rimLight);

    // Purple fill light
    const fillLight = new THREE.DirectionalLight(0x9370db, 0.3);
    fillLight.position.set(0, 5, 20);
    this.scene.add(fillLight);

    // Volumetric-style fog for sunset atmosphere
    this.scene.fog = new THREE.FogExp2(0xffaa88, 0.015);
    console.log('[MiamiBeachTheme] 🌫️ Fog added');

    // Sky background
    const skyGeo = new THREE.SphereGeometry(80, 32, 32);
    const skyMat = new THREE.MeshBasicMaterial({
      map: this.assets.skyGradient,
      side: THREE.BackSide,
    });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    skyMesh.name = 'miami_sky';
    skyMesh.userData.isThemeDecoration = true;
    this.scene.add(skyMesh);
    console.log('[MiamiBeachTheme] 🌌 Sky sphere added');

    // Water plane (surrounding the play area)
    const waterGeo = new THREE.PlaneGeometry(120, 120, 64, 64);
    this.waterMesh = new THREE.Mesh(waterGeo, this.assets.waterMaterial);
    this.waterMesh.rotation.x = -Math.PI / 2;
    this.waterMesh.position.y = -0.5;
    this.waterMesh.name = 'miami_water';
    this.waterMesh.userData.isThemeDecoration = true;
    this.scene.add(this.waterMesh);
    console.log('[MiamiBeachTheme] 🌊 Water plane added at y=-0.5');
  }

  /** Create palm trees and beach decorations */
  private createDecorations(): void {
    console.log('[MiamiBeachTheme] 🌴 Creating decorations...');
    this.createPalmTrees();
    this.createBreezeParticles();
    console.log(`[MiamiBeachTheme] 🎨 Decorations complete. Palm trees: ${this.palmTrees.length}`);
  }

  /** Create animated palm trees with swaying fronds */
  private createPalmTrees(): void {
    const positions = [
      { x: -5, z: -5, scale: 1.2, rotation: 0.3 },
      { x: 20, z: -3, scale: 1.0, rotation: -0.2 },
      { x: -3, z: 18, scale: 1.1, rotation: 0.1 },
      { x: 19, z: 19, scale: 0.9, rotation: -0.3 },
      { x: 8, z: -6, scale: 1.3, rotation: 0 },
      { x: -6, z: 8, scale: 1.0, rotation: 0.4 },
    ];

    positions.forEach((pos, index) => {
      const palmGroup = new THREE.Group();
      palmGroup.position.set(pos.x, 0, pos.z);
      palmGroup.rotation.y = pos.rotation;
      palmGroup.scale.setScalar(pos.scale);
      palmGroup.userData.isThemeDecoration = true;

      // Curved trunk
      const trunkCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.2, 1.5, 0),
        new THREE.Vector3(0.5, 3, 0.1),
        new THREE.Vector3(0.8, 4, 0.2),
      ]);
      const trunkGeo = new THREE.TubeGeometry(trunkCurve, 8, 0.15, 8, false);
      const trunk = new THREE.Mesh(trunkGeo, this.assets.palmTrunkMaterial);
      trunk.castShadow = true;
      palmGroup.add(trunk);

      // Fronds (leaves) - animated group
      const frondsGroup = new THREE.Group();
      frondsGroup.position.set(0.8, 4, 0.2);

      const frondCount = 7;
      for (let i = 0; i < frondCount; i++) {
        const frond = this.createPalmFrond(i / frondCount * Math.PI * 2);
        frond.rotation.y = (i / frondCount) * Math.PI * 2;
        frondsGroup.add(frond);
      }

      palmGroup.add(frondsGroup);
      this.palmTrees.push(frondsGroup);
      this.scene.add(palmGroup);
    });
  }

  /** Create a single palm frond */
  private createPalmFrond(angle: number): THREE.Mesh {
    // Create curved frond shape
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.3, 1, 0, 2);
    shape.quadraticCurveTo(-0.3, 1, 0, 0);

    const extrudeSettings = {
      depth: 0.02,
      bevelEnabled: false,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const frond = new THREE.Mesh(geometry, this.assets.palmLeafMaterial);

    // Position and curve the frond outward
    frond.position.set(0, 0, 0);
    frond.rotation.x = Math.PI / 4;
    frond.scale.set(0.8, 0.8, 0.8);
    frond.castShadow = true;

    return frond;
  }

  /** Create light breeze particles */
  private createBreezeParticles(): void {
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      velocities.push(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.02
      );
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffee,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    this.breezeParticles = new THREE.Points(geometry, material);
    this.breezeParticles.userData = { velocities, isThemeDecoration: true };
    this.scene.add(this.breezeParticles);
  }

  /** Add decorative beach elements around the grid */
  public addBeachDecorations(): void {
    // Add beach umbrellas
    this.addBeachUmbrellas();

    // Add surfboards
    this.addSurfboards();
  }

  private addBeachUmbrellas(): void {
    const positions = [
      { x: -3, z: 8 },
      { x: 20, z: 10 },
      { x: 10, z: -4 },
    ];

    positions.forEach(pos => {
      const group = new THREE.Group();
      group.position.set(pos.x, 0, pos.z);

      // Umbrella pole
      const poleGeo = new THREE.CylinderGeometry(0.03, 0.03, 2.5, 8);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.y = 1.25;
      pole.castShadow = true;
      group.add(pole);

      // Umbrella canopy
      const canopyGeo = new THREE.ConeGeometry(1.5, 0.8, 8);
      const canopy = new THREE.Mesh(canopyGeo, this.assets.umbrellaMaterial);
      canopy.position.y = 2.3;
      canopy.castShadow = true;
      group.add(canopy);

      // Neon glow ring
      const glowGeo = new THREE.RingGeometry(1.4, 1.5, 8);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0xff1493,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.rotation.x = -Math.PI / 2;
      glow.position.y = 2.3;
      group.add(glow);

      this.scene.add(group);
    });
  }

  private addSurfboards(): void {
    const surfboards = [
      { x: -4, z: 5, rot: 0.5, color: 0x00ffff },
      { x: 21, z: 15, rot: -0.3, color: 0xff00ff },
    ];

    surfboards.forEach(board => {
      const group = new THREE.Group();
      group.position.set(board.x, 0.4, board.z);
      group.rotation.y = board.rot;

      // Surfboard shape
      const shape = new THREE.Shape();
      shape.moveTo(0, -1.2);
      shape.bezierCurveTo(0.3, -1.2, 0.35, 0, 0.35, 0.8);
      shape.bezierCurveTo(0.35, 1.2, 0, 1.5, 0, 1.5);
      shape.bezierCurveTo(0, 1.5, -0.35, 1.2, -0.35, 0.8);
      shape.bezierCurveTo(-0.35, 0, -0.3, -1.2, 0, -1.2);

      const extrudeSettings = { depth: 0.08, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 };
      const boardGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const boardMesh = new THREE.Mesh(boardGeo, this.assets.surfboardMaterial);
      boardMesh.rotation.x = Math.PI / 2;
      boardMesh.position.y = 0;
      boardMesh.castShadow = true;
      group.add(boardMesh);

      this.scene.add(group);
    });
  }

  /** Update animations - call in render loop */
  public update(deltaTime: number): void {
    this.time += deltaTime;

    // Animate water waves
    if (this.waterMesh) {
      const positions = (this.waterMesh.geometry as THREE.PlaneGeometry).attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.3 + this.time) * 0.1 +
                           Math.cos(y * 0.2 + this.time * 0.8) * 0.1;
      }
      (this.waterMesh.geometry as THREE.PlaneGeometry).attributes.position.needsUpdate = true;
      (this.waterMesh.geometry as THREE.PlaneGeometry).computeVertexNormals();
    }

    // Animate palm fronds swaying
    this.palmTrees.forEach((fronds, index) => {
      const swayAmount = Math.sin(this.time * 0.5 + index) * 0.05;
      fronds.rotation.z = swayAmount;
      fronds.rotation.x = Math.cos(this.time * 0.3 + index) * 0.03;
    });

    // Animate breeze particles
    if (this.breezeParticles) {
      const positions = (this.breezeParticles.geometry as THREE.BufferGeometry).attributes.position.array as Float32Array;
      const velocities = this.breezeParticles.userData.velocities as number[];

      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3] += velocities[i * 3] + Math.sin(this.time + i) * 0.001;
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2] + Math.cos(this.time + i) * 0.001;

        // Wrap around
        if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = 0;
        if (positions[i * 3] > 15) positions[i * 3] = -15;
        if (positions[i * 3] < -15) positions[i * 3] = 15;
        if (positions[i * 3 + 2] > 15) positions[i * 3 + 2] = -15;
        if (positions[i * 3 + 2] < -15) positions[i * 3 + 2] = 15;
      }
      (this.breezeParticles.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;
    }
  }

  /** Get materials for the level */
  public getMaterials() {
    console.log('[MiamiBeachTheme] 📦 getMaterials() called');
    return {
      floor: this.assets.floorMaterial,
      hardBlock: this.assets.hardBlockMaterial,
      softBlock: this.assets.softBlockMaterial,
    };
  }

  /** Cleanup resources */
  public dispose(): void {
    this.textureCache.forEach(texture => texture.dispose());
    Object.values(this.assets).forEach(asset => {
      if (asset instanceof THREE.Material) {
        asset.dispose();
      } else if (asset instanceof THREE.Texture) {
        asset.dispose();
      }
    });
  }
}

export default MiamiBeachTheme;
