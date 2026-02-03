import * as THREE from 'three';
import { GameState, TileType, GRID_SIZE, TILE_WORLD_SIZE } from '@core/types';
import { AstronautCharacter, AstronautAnimationState } from '@entities/AstronautCharacter';
import { WeatherSystem, WeatherType } from '@systems/WeatherSystem';
import { FlyingObjectsSystem } from '@systems/FlyingObjectsSystem';
import { EnemyRenderer } from '@systems/EnemyRenderer';
import { LevelTheme, EnemyState } from '@core/ExtendedTypes';
import { ThemeManager, ThemeMaterials } from '@themes/ThemeManager';

export class SceneManager {
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly renderer: THREE.WebGLRenderer;

  // Mesh pools
  private floorMesh!: THREE.Mesh;
  private hardBlockPool: THREE.InstancedMesh;
  private softBlockPool: THREE.InstancedMesh;
  private astronautCharacters: AstronautCharacter[] = [];
  private bombMeshes: Map<number, THREE.Mesh> = new Map();
  private explosionMeshes: THREE.Mesh[] = [];
  private powerUpMeshes: THREE.Mesh[] = [];

  // Materials (now mutable for theme switching)
  private matFloor: THREE.Material;
  private matHard: THREE.Material;
  private matSoft: THREE.Material;
  private readonly matBomb = new THREE.MeshStandardMaterial({ color: 0x111111 });
  private readonly matBombPrimed = new THREE.MeshStandardMaterial({ color: 0x3344ff, emissive: 0x1122aa });
  private readonly matBombRushed = new THREE.MeshStandardMaterial({ color: 0xff2222, emissive: 0xaa1111 });
  private readonly matExplosion = new THREE.MeshStandardMaterial({ color: 0xff6600, emissive: 0xff4400, transparent: true, opacity: 0.85 });
  private readonly matPowerUp = new THREE.MeshStandardMaterial({ color: 0x44ff44, emissive: 0x22aa22 });

  // Theme manager
  private themeManager: ThemeManager;

  // Scrolling background system
  private scrollingBackgrounds: THREE.Mesh[] = [];
  private backgroundSpeed = 0.02;
  private backgroundOffset = 0;

  // Shared geometries - bombs scaled up 3x for visibility
  private geoBlock = new THREE.BoxGeometry(TILE_WORLD_SIZE * 0.95, TILE_WORLD_SIZE * 0.95, TILE_WORLD_SIZE * 0.95);
  private geoBomb = new THREE.SphereGeometry(0.7, 16, 16);
  private geoExplosion = new THREE.BoxGeometry(TILE_WORLD_SIZE * 0.9, 0.3, TILE_WORLD_SIZE * 0.9);
  private geoPowerUp = new THREE.BoxGeometry(0.4, 0.4, 0.4);

  private dummy = new THREE.Object3D();
  
  // Weather system
  private weatherSystem: WeatherSystem;
  private currentTheme: LevelTheme = LevelTheme.CLASSIC;
  
  // Flying objects system for dramatic effect
  private flyingObjectsSystem: FlyingObjectsSystem;
  
  // Enemy renderer
  private enemyRenderer: EnemyRenderer;

  // Frame timing for weather animation
  private lastFrameTime = 0;
  private frameDeltaTime = 0.016;
  
  // Video background mode
  private videoBackgroundMode = false;
  
  // Flying carpet effect
  private boardGroup: THREE.Group | null = null;
  private flyingCarpetEnabled = false;
  private carpetTime = 0;

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0a);

    // Initialize theme manager
    this.themeManager = new ThemeManager(this.scene);

    // Initialize default materials
    this.matFloor = new THREE.MeshStandardMaterial({ color: 0x2a2a2a });
    this.matHard = new THREE.MeshStandardMaterial({ color: 0x555555 });
    this.matSoft = new THREE.MeshStandardMaterial({ color: 0x8b6914 });

    // Camera — perspective camera positioned to see entire board
    const center = (GRID_SIZE - 1) / 2;
    this.camera = new THREE.PerspectiveCamera(
      60, // Wider FOV to see more
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    // Position camera higher and further back to see entire board
    this.camera.position.set(center, 22, center + 16);
    this.camera.lookAt(center, 0, center);

    // Renderer — graceful fallback when WebGL is unavailable
    try {
      this.renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,  // Enable transparency for video background
        premultipliedAlpha: false 
      });
    } catch (error) {
      SceneManager.showWebGLError();
      throw new Error('WebGL initialization failed: ' + (error instanceof Error ? error.message : String(error)));
    }
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Position canvas for z-index layering with video background
    this.renderer.domElement.style.position = 'relative';
    this.renderer.domElement.style.zIndex = '2';
    document.body.appendChild(this.renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(center + 5, 15, center - 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(1024, 1024);
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 40;
    const s = GRID_SIZE;
    dirLight.shadow.camera.left = -s;
    dirLight.shadow.camera.right = s;
    dirLight.shadow.camera.top = s;
    dirLight.shadow.camera.bottom = -s;
    this.scene.add(dirLight);

    // Floor plane
    const floorGeo = new THREE.PlaneGeometry(GRID_SIZE, GRID_SIZE);
    this.floorMesh = new THREE.Mesh(floorGeo, this.matFloor);
    this.floorMesh.rotation.x = -Math.PI / 2;
    this.floorMesh.position.set(center, -0.01, center);
    this.floorMesh.receiveShadow = true;
    this.scene.add(this.floorMesh);

    // Instanced meshes for blocks
    const maxBlocks = GRID_SIZE * GRID_SIZE;
    this.hardBlockPool = new THREE.InstancedMesh(this.geoBlock, this.matHard, maxBlocks);
    this.hardBlockPool.castShadow = true;
    this.hardBlockPool.receiveShadow = true;
    this.scene.add(this.hardBlockPool);

    this.softBlockPool = new THREE.InstancedMesh(this.geoBlock, this.matSoft, maxBlocks);
    this.softBlockPool.castShadow = true;
    this.softBlockPool.receiveShadow = true;
    this.scene.add(this.softBlockPool);

    // Handle resize
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Initialize weather system
    this.weatherSystem = new WeatherSystem(this.scene);
    
    // Initialize flying objects system
    this.flyingObjectsSystem = new FlyingObjectsSystem(this.scene);
    
    // Initialize enemy renderer
    this.enemyRenderer = new EnemyRenderer(this.scene);
  }

  syncState(state: GameState, _alpha: number, deltaTime: number = 0.016): void {
    // Update blocks
    let hardCount = 0;
    let softCount = 0;
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const tile = state.grid[row][col];
        if (tile === TileType.HardBlock) {
          this.dummy.position.set(col, 0.475, row);
          this.dummy.updateMatrix();
          this.hardBlockPool.setMatrixAt(hardCount++, this.dummy.matrix);
        } else if (tile === TileType.SoftBlock) {
          this.dummy.position.set(col, 0.475, row);
          this.dummy.updateMatrix();
          this.softBlockPool.setMatrixAt(softCount++, this.dummy.matrix);
        }
      }
    }
    this.hardBlockPool.count = hardCount;
    this.hardBlockPool.instanceMatrix.needsUpdate = true;
    this.softBlockPool.count = softCount;
    this.softBlockPool.instanceMatrix.needsUpdate = true;

    // Players
    this.syncPlayers(state, deltaTime);
    this.syncBombs(state);
    this.syncExplosions(state);
    this.syncPowerUps(state);

    // Animate background
    this.animateBackground(deltaTime);
  }

  private animateBackground(deltaTime: number): void {
    // Scroll backgrounds to create flying effect
    if (this.scrollingBackgrounds.length >= 2) {
      this.backgroundOffset += this.backgroundSpeed * deltaTime * 60;

      // Move backgrounds left to create "flying forward" illusion
      this.scrollingBackgrounds.forEach((bg, index) => {
        const xOffset = (this.backgroundOffset + index * 45) % 90 - 22.5;
        bg.position.x = ((GRID_SIZE - 1) / 2) + xOffset;

        // Add subtle vertical bobbing for "flying" feel
        const time = Date.now() * 0.001;
        bg.position.y = 8 + Math.sin(time + index) * 0.2;

        // Slight rotation for dynamic feel
        bg.rotation.z = Math.sin(time * 0.5 + index) * 0.02;
      });
    }
  }

  private syncPlayers(state: GameState, deltaTime: number): void {
    // Grow pool if needed - create astronaut characters
    while (this.astronautCharacters.length < state.players.length) {
      const playerId = this.astronautCharacters.length;
      const astronaut = new AstronautCharacter({
        playerId: playerId,
        scale: 1.3, // Larger character for better visibility
      });
      this.scene.add(astronaut.root);
      this.astronautCharacters.push(astronaut);
    }
    
    // Update each astronaut character
    for (let i = 0; i < this.astronautCharacters.length; i++) {
      const astronaut = this.astronautCharacters[i];
      
      if (i < state.players.length) {
        const player = state.players[i];
        
        if (player.alive) {
          astronaut.setVisible(true);
          
          // Update position
          astronaut.setPosition(player.worldPos.x, 0, player.worldPos.y);
          
          // Determine animation state based on movement
          if (player.moveDir !== 0) {
            astronaut.setAnimationState(AstronautAnimationState.WALK);
            
            // Face movement direction
            let rotation = 0;
            switch (player.moveDir) {
              case 1: rotation = 0; break; // Up/North
              case 2: rotation = Math.PI; break; // Down/South  
              case 3: rotation = -Math.PI / 2; break; // Left/West
              case 4: rotation = Math.PI / 2; break; // Right/East
            }
            astronaut.setRotationY(rotation);
          } else {
            astronaut.setAnimationState(AstronautAnimationState.IDLE);
          }
          
          // Update animation
          astronaut.update(deltaTime);
        } else {
          // Player died
          if (astronaut.getAnimationState() !== AstronautAnimationState.DEATH && 
              !astronaut.isDeathComplete()) {
            astronaut.die();
          }
          astronaut.update(deltaTime);
          
          // Hide completely after death animation
          if (astronaut.isDeathComplete()) {
            astronaut.setVisible(false);
          }
        }
      } else {
        // Extra astronauts beyond player count - hide them
        astronaut.setVisible(false);
      }
    }
  }

  private syncBombs(state: GameState): void {
    const activeIds = new Set(state.bombs.map(b => b.id));
    // Remove stale
    for (const [id, mesh] of this.bombMeshes) {
      if (!activeIds.has(id)) {
        this.scene.remove(mesh);
        this.bombMeshes.delete(id);
      }
    }
    // Add / update
    for (const bomb of state.bombs) {
      let mesh = this.bombMeshes.get(bomb.id);
      if (!mesh) {
        const mat = bomb.primed ? this.matBombPrimed : bomb.rushed ? this.matBombRushed : this.matBomb;
        mesh = new THREE.Mesh(this.geoBomb, mat);
        mesh.castShadow = true;
        this.scene.add(mesh);
        this.bombMeshes.set(bomb.id, mesh);
      }
      mesh.position.set(bomb.gridPos.col, 0.5, bomb.gridPos.row);
      // Pulse effect - more visible
      const pulse = 1 + 0.15 * Math.sin(Date.now() * 0.01 * (bomb.rushed ? 4 : bomb.primed ? 1 : 2));
      mesh.scale.setScalar(pulse);
    }
  }

  private syncExplosions(state: GameState): void {
    // Remove excess
    while (this.explosionMeshes.length > state.explosions.length) {
      const m = this.explosionMeshes.pop()!;
      this.scene.remove(m);
    }
    // Add/update
    for (let i = 0; i < state.explosions.length; i++) {
      let mesh = this.explosionMeshes[i];
      if (!mesh) {
        mesh = new THREE.Mesh(this.geoExplosion, this.matExplosion.clone());
        mesh.castShadow = false;
        this.scene.add(mesh);
        this.explosionMeshes.push(mesh);
      }
      const e = state.explosions[i];
      mesh.position.set(e.gridPos.col, 0.15, e.gridPos.row);
      (mesh.material as THREE.MeshStandardMaterial).opacity = Math.min(1, e.remaining * 2);
    }
  }

  private syncPowerUps(state: GameState): void {
    while (this.powerUpMeshes.length > state.powerUps.length) {
      const m = this.powerUpMeshes.pop()!;
      this.scene.remove(m);
    }
    for (let i = 0; i < state.powerUps.length; i++) {
      let mesh = this.powerUpMeshes[i];
      if (!mesh) {
        mesh = new THREE.Mesh(this.geoPowerUp, this.matPowerUp);
        this.scene.add(mesh);
        this.powerUpMeshes.push(mesh);
      }
      const pu = state.powerUps[i];
      mesh.position.set(pu.gridPos.col, 0.3 + 0.1 * Math.sin(Date.now() * 0.003), pu.gridPos.row);
      mesh.rotation.y += 0.02;
    }
  }

  private frameCount = 0;

  render(_deltaTime?: number): void {
    // Calculate frame delta time for smooth weather animation
    const now = performance.now();
    if (this.lastFrameTime > 0) {
      this.frameDeltaTime = Math.min((now - this.lastFrameTime) / 1000, 0.05);
    }
    this.lastFrameTime = now;

    // Update weather system
    this.weatherSystem.update(this.frameDeltaTime);

    // Update theme animations (water waves, palm trees, etc.)
    this.themeManager.update(this.frameDeltaTime);
    
    // Update flying objects for dramatic "flying through air" effect
    if (!this.videoBackgroundMode) {
      this.flyingObjectsSystem.update(this.frameDeltaTime);
    }
    
    // Update flying carpet effect
    this.updateFlyingCarpet(this.frameDeltaTime);

    // Log scene info every 60 frames (roughly once per second)
    this.frameCount++;
    if (this.frameCount % 60 === 0) {
      console.log(`[SceneManager] 📊 Frame ${this.frameCount}, Scene children: ${this.scene.children.length}, Current theme: ${this.currentTheme}`);
    }

    this.renderer.render(this.scene, this.camera);
  }
  
  syncEnemies(enemies: EnemyState[], deltaTime: number): void {
    this.enemyRenderer.syncEnemies(enemies, deltaTime);
  }

  // Weather control methods
  setWeather(weather: WeatherType, intensity: number = 0.5): void {
    this.weatherSystem.setWeather(weather, intensity);
  }

  setWeatherEnabled(enabled: boolean): void {
    this.weatherSystem.setEnabled(enabled);
  }

  setWeatherIntensity(intensity: number): void {
    this.weatherSystem.setIntensity(intensity);
  }

  setTheme(theme: LevelTheme): void {
    console.log(`[SceneManager] 🎨 setTheme() called: ${theme}`);
    this.currentTheme = theme;

    // Load theme through ThemeManager
    this.themeManager.loadTheme(theme);
    
    // Update flying objects for this theme (creates theme-appropriate sky and objects)
    this.flyingObjectsSystem.setTheme(theme);

    // Get theme materials
    const themeMaterials = this.themeManager.getMaterials();
    console.log('[SceneManager] 📦 Got theme materials:', themeMaterials);

    // Update floor material
    console.log('[SceneManager] 🔄 Updating floor material...');
    this.updateFloorMaterial(themeMaterials.floor);

    // Update block materials
    console.log('[SceneManager] 🔄 Updating block materials...');
    this.updateBlockMaterials(themeMaterials.hardBlock, themeMaterials.softBlock);

    // Set weather based on theme
    const weather = WeatherSystem.getWeatherForTheme(theme);
    console.log(`🌦️ Theme: ${theme} → Weather: ${weather}`);

    if (weather !== WeatherType.NONE) {
      this.weatherSystem.setWeather(weather, 0.6);
      console.log(`✅ Weather activated: ${weather}`);
    } else {
      this.weatherSystem.setWeather(WeatherType.NONE);
      console.log(`☀️ No weather (sunny/clear)`);
    }

    // Create scrolling background for theme
    this.createScrollingBackground(theme);
  }

  private createScrollingBackground(theme: LevelTheme): void {
    // Clear old scrolling backgrounds
    this.scrollingBackgrounds.forEach(bg => this.scene.remove(bg));
    this.scrollingBackgrounds = [];

    // Map themes to background images
    const themeToImage: Record<LevelTheme, string> = {
      [LevelTheme.CLASSIC]: '/images/backgrounds/bg-classic.png',
      [LevelTheme.ICE]: '/images/backgrounds/bg-ice.png',
      [LevelTheme.VOLCANO]: '/images/backgrounds/bg-volcano.png',
      [LevelTheme.FOREST]: '/images/backgrounds/bg-forest.png',
      [LevelTheme.DESERT]: '/images/backgrounds/bg-desert.png',
      [LevelTheme.SPACE]: '/images/backgrounds/bg-space.png',
      [LevelTheme.MIAMI_BEACH]: '/images/backgrounds/bg-miami.png',
      [LevelTheme.LAHO_VIDEO]: '', // Video background uses VideoBackgroundSystem
    };

    const imagePath = themeToImage[theme];
    if (!imagePath) return; // Skip for video themes

    const loader = new THREE.TextureLoader();
    loader.load(
      imagePath,
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.repeat.set(3, 1); // Repeat horizontally

        // Create two background planes for seamless looping
        const geometry = new THREE.PlaneGeometry(45, 20);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide,
        });

        const center = (GRID_SIZE - 1) / 2;

        // Create two background planes side by side for seamless scrolling
        for (let i = 0; i < 2; i++) {
          const bg = new THREE.Mesh(geometry, material);
          bg.position.set(center + (i * 45) - 22.5, 8, center - 12);
          bg.rotation.x = -0.1; // Slight tilt for depth
          bg.renderOrder = -10;
          this.scene.add(bg);
          this.scrollingBackgrounds.push(bg);
        }

        console.log(`[SceneManager] ✅ Scrolling background created: ${imagePath}`);
      },
      undefined,
      (error) => {
        console.warn(`[SceneManager] Failed to load background: ${imagePath}`, error);
      }
    );
  }

  private updateFloorMaterial(newMaterial: THREE.Material): void {
    console.log(`[SceneManager] 🔄 updateFloorMaterial() called. Current: ${this.matFloor.uuid}, New: ${newMaterial.uuid}`);
    // Dispose old material if it's not being used elsewhere
    if (this.matFloor !== newMaterial) {
      this.matFloor.dispose();
      this.matFloor = newMaterial;
      this.floorMesh.material = this.matFloor;
      console.log('[SceneManager] ✅ Floor material updated');
    } else {
      console.log('[SceneManager] ⚠️ Floor material is the same reference, skipping update');
    }
  }

  private updateBlockMaterials(hardMat: THREE.Material, softMat: THREE.Material): void {
    console.log('[SceneManager] 🔄 updateBlockMaterials() called');
    // Dispose old materials
    this.matHard.dispose();
    this.matSoft.dispose();

    // Update references
    this.matHard = hardMat;
    this.matSoft = softMat;

    // Update instanced mesh materials
    this.hardBlockPool.material = this.matHard;
    this.softBlockPool.material = this.matSoft;
    console.log('[SceneManager] ✅ Block materials updated on instanced meshes');
  }

  getCurrentTheme(): LevelTheme {
    return this.currentTheme;
  }

  /**
   * Enable video background mode - makes scene background transparent
   * so the HTML video element shows through
   */
  enableVideoBackgroundMode(enabled: boolean): void {
    this.videoBackgroundMode = enabled;
    
    if (enabled) {
      // Make scene background transparent
      this.scene.background = null;
      this.renderer.setClearColor(0x000000, 0);
      
      // Hide the flying objects system (video is the background)
      this.flyingObjectsSystem.dispose();
      
      // Hide scrolling backgrounds
      this.scrollingBackgrounds.forEach(bg => {
        bg.visible = false;
      });
      
      console.log('[SceneManager] 🎬 Video background mode ENABLED');
    } else {
      // Restore scene background
      this.scene.background = new THREE.Color(0x0a0a0a);
      this.renderer.setClearColor(0x0a0a0a, 1);
      
      // Restore scrolling backgrounds
      this.scrollingBackgrounds.forEach(bg => {
        bg.visible = true;
      });
      
      console.log('[SceneManager] 🎬 Video background mode DISABLED');
    }
  }

  /**
   * Enable flying carpet effect - makes the board float and bob
   */
  enableFlyingCarpetEffect(enabled: boolean): void {
    this.flyingCarpetEnabled = enabled;
    console.log(`[SceneManager] 🧞 Flying carpet effect: ${enabled ? 'ENABLED' : 'DISABLED'}`);
  }

  /**
   * Update flying carpet animation (call in render loop)
   */
  updateFlyingCarpet(deltaTime: number): void {
    if (!this.flyingCarpetEnabled) return;
    
    this.carpetTime += deltaTime;
    
    // More dramatic floating/bobbing motion for flying carpet feel
    const bobAmount = Math.sin(this.carpetTime * 1.2) * 0.25;
    const swayX = Math.sin(this.carpetTime * 0.7) * 0.03;
    const swayZ = Math.cos(this.carpetTime * 0.5) * 0.025;
    const wobble = Math.sin(this.carpetTime * 2.5) * 0.01;
    
    // Apply to floor - the "carpet"
    if (this.floorMesh) {
      this.floorMesh.position.y = -0.01 + bobAmount;
      this.floorMesh.rotation.x = -Math.PI / 2 + swayX;
      this.floorMesh.rotation.z = swayZ + wobble;
    }
    
    // Apply to blocks with slight delay for wave effect
    this.hardBlockPool.position.y = bobAmount * 0.9;
    this.softBlockPool.position.y = bobAmount * 0.95;
    
    // Subtle camera sway for immersion
    const camSway = Math.sin(this.carpetTime * 0.4) * 0.1;
    this.camera.position.x += (camSway - this.camera.position.x + (GRID_SIZE - 1) / 2) * 0.02;
  }

  dispose(): void {
    this.weatherSystem.dispose();
    this.themeManager.dispose();
    this.flyingObjectsSystem.dispose();
    this.enemyRenderer.dispose();

    // Dispose astronaut characters
    for (const astronaut of this.astronautCharacters) {
      astronaut.dispose();
      this.scene.remove(astronaut.root);
    }
    this.astronautCharacters = [];

    // Dispose scrolling backgrounds
    this.scrollingBackgrounds.forEach(bg => {
      this.scene.remove(bg);
      bg.geometry.dispose();
      if (bg.material instanceof THREE.Material) {
        bg.material.dispose();
      }
    });
    this.scrollingBackgrounds = [];

    this.renderer.dispose();

    // Clean up materials
    this.matFloor.dispose();
    this.matHard.dispose();
    this.matSoft.dispose();
    this.matBomb.dispose();
    this.matBombPrimed.dispose();
    this.matBombRushed.dispose();
    this.matExplosion.dispose();
    this.matPowerUp.dispose();

    // Clean up geometries
    this.geoBlock.dispose();
    this.geoBomb.dispose();
    this.geoExplosion.dispose();
    this.geoPowerUp.dispose();

    // Remove renderer from DOM
    this.renderer.domElement.remove();
  }

  private static showWebGLError(): void {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(20, 20, 20, 0.95);
      color: #ff4444;
      padding: 30px;
      border-radius: 12px;
      font-family: Arial, sans-serif;
      max-width: 500px;
      text-align: center;
      z-index: 10000;
      border: 2px solid #ff4444;
    `;
    errorDiv.innerHTML = `
      <h2 style="margin: 0 0 15px 0; color: #ff6666;">WebGL Not Supported</h2>
      <p style="margin: 0 0 15px 0; line-height: 1.6;">
        This game requires WebGL to run, but your browser or device doesn't support it.
      </p>
      <p style="margin: 0; font-size: 14px; color: #aaa;">
        Try updating your browser or enabling hardware acceleration in settings.
      </p>
    `;
    document.body.appendChild(errorDiv);
  }
}
