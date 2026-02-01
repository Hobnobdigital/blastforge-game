import * as THREE from 'three';
import { Grid } from './systems/Grid';
import { Player } from './entities/Player';
import { EnemySpawner, SpawnPoint } from './entities/EnemySpawner';
import { EnemyType } from './entities/Enemy';
import { InputManager } from './input/InputManager';
import { GRID_WIDTH, GRID_HEIGHT, BOMB_FUSE_TIME, DEFAULT_EXPLOSION_RANGE, LEVELS, PowerUpType, POWERUP_DROP_CHANCE } from './utils/Constants';

interface Bomb {
  x: number;
  y: number;
  placedAt: number;
  range: number;
  mesh: THREE.Mesh;
}

interface Explosion {
  x: number;
  y: number;
  timeLeft: number;
  mesh: THREE.Mesh;
}

class Game {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private animationId: number | null = null;
  
  // Game systems
  private grid: Grid;
  private player: Player;
  private input: InputManager;
  private enemySpawner: EnemySpawner;
  
  // Game state
  private bombs: Bomb[] = [];
  private explosions: Explosion[] = [];
  private activeBombPositions: Array<{x: number, y: number}> = [];
  private lastTime: number = 0;
  private levelComplete: boolean = false;
  private gameOver: boolean = false;
  
  // Visuals
  private bombGeo: THREE.SphereGeometry;
  private bombMat: THREE.MeshStandardMaterial;
  private explosionGeo: THREE.BoxGeometry;
  private explosionMat: THREE.MeshBasicMaterial;

  constructor() {
    // Initialize scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87CEEB);

    // Initialize camera (high-angle isometric view)
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 15, 15);
    this.camera.lookAt(0, 0, 0);

    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;

    // Replace loading screen with canvas
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = '';
      app.appendChild(this.renderer.domElement);
    }

    // Add lighting
    this.setupLighting();

    // Initialize geometries
    this.bombGeo = new THREE.SphereGeometry(0.3, 16, 16);
    this.bombMat = new THREE.MeshStandardMaterial({ color: 0x212121 });
    this.explosionGeo = new THREE.BoxGeometry(0.9, 0.1, 0.9);
    this.explosionMat = new THREE.MeshBasicMaterial({ color: 0xFF5722 });

    // Initialize game systems
    this.input = new InputManager();
    this.grid = new Grid();
    this.scene.add(this.grid.group);
    
    // Spawn player
    this.player = new Player(1, 1, this.grid);
    this.scene.add(this.player.mesh);
    
    // Initialize enemy spawner
    this.enemySpawner = new EnemySpawner(this.grid, this.scene);
    
    // Spawn initial enemies
    this.spawnLevelEnemies(1);

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));

    // Start game loop
    this.lastTime = performance.now();
    this.animate();

    console.log('🎮 BlastZone3D initialized');
    console.log('👾 Enemy AI System active');
    console.log('   - Balloon: Random movement');
    console.log('   - Onion: Pathfinding toward player');
    console.log('   - Tiger: Advanced AI with bomb avoidance');
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -15;
    directionalLight.shadow.camera.right = 15;
    directionalLight.shadow.camera.top = 15;
    directionalLight.shadow.camera.bottom = -15;
    this.scene.add(directionalLight);
  }

  private spawnLevelEnemies(levelNum: number): void {
    const levelConfig = LEVELS.find(l => l.number === levelNum) || LEVELS[0];
    
    // Create spawn points for different enemy types
    const spawnPoints: SpawnPoint[] = [];
    
    // Balloon enemies (easy) - corners
    const balloonCount = Math.ceil(levelConfig.enemyCount * 0.5);
    for (let i = 0; i < balloonCount; i++) {
      spawnPoints.push({
        x: GRID_WIDTH - 2 - (i % 2) * 2,
        y: GRID_HEIGHT - 2 - Math.floor(i / 2) * 2,
        type: 'balloon'
      });
    }
    
    // Onion enemies (medium) - mixed positions
    const onionCount = Math.ceil(levelConfig.enemyCount * 0.3);
    for (let i = 0; i < onionCount; i++) {
      spawnPoints.push({
        x: Math.floor(GRID_WIDTH / 2) + (i % 2) * 2,
        y: Math.floor(GRID_HEIGHT / 2) + Math.floor(i / 2) * 2,
        type: 'onion'
      });
    }
    
    // Tiger enemies (hard) - center area
    const tigerCount = levelConfig.enemyCount - balloonCount - onionCount;
    for (let i = 0; i < tigerCount; i++) {
      spawnPoints.push({
        x: Math.floor(GRID_WIDTH / 2),
        y: Math.floor(GRID_HEIGHT / 2) + i,
        type: 'tiger'
      });
    }
    
    this.enemySpawner.spawnEnemiesAtPositions(spawnPoints, levelConfig.enemySpeed);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(this.animate.bind(this));
    
    const currentTime = performance.now();
    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1); // Cap dt
    this.lastTime = currentTime;
    
    if (!this.gameOver && !this.levelComplete) {
      this.update(dt);
    }
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
  }

  private update(dt: number): void {
    // Update player
    this.player.update(dt, this.grid, this.input);
    
    // Handle bomb placement
    if (this.input.consumeBomb() && this.player.bombsAvailable > 0) {
      this.placeBomb();
    }
    
    // Update bombs
    this.updateBombs(dt);
    
    // Update explosions
    this.updateExplosions(dt);
    
    // Update active bomb positions for AI
    this.activeBombPositions = this.bombs.map(b => ({ x: b.x, y: b.y }));
    
    // Update enemies
    this.enemySpawner.update(dt, this.player.gridX, this.player.gridY, this.activeBombPositions);
    
    // Process enemy power-up drops
    this.processEnemyDrops();
    
    // Check win/lose conditions
    this.checkGameConditions();
    
    // Update camera to follow player
    this.updateCamera();
  }

  private placeBomb(): void {
    // Check if cell already has a bomb
    const cell = this.grid.getCell(this.player.gridX, this.player.gridY);
    if (!cell || cell.hasBomb) return;
    
    cell.hasBomb = true;
    this.player.bombsAvailable--;
    
    const pos = this.grid.gridToWorld(this.player.gridX, this.player.gridY);
    const bombMesh = new THREE.Mesh(this.bombGeo, this.bombMat);
    bombMesh.position.set(pos.x, 0.3, pos.z);
    bombMesh.castShadow = true;
    this.scene.add(bombMesh);
    
    this.bombs.push({
      x: this.player.gridX,
      y: this.player.gridY,
      placedAt: performance.now(),
      range: this.player.explosionRange,
      mesh: bombMesh
    });
    
    console.log(`💣 Bomb placed at (${this.player.gridX}, ${this.player.gridY})`);
  }

  private updateBombs(dt: number): void {
    const now = performance.now();
    
    for (let i = this.bombs.length - 1; i >= 0; i--) {
      const bomb = this.bombs[i];
      const age = (now - bomb.placedAt) / 1000;
      
      // Pulse animation
      const scale = 1 + Math.sin(age * 10) * 0.1;
      bomb.mesh.scale.set(scale, scale, scale);
      
      // Check if should explode
      if (age >= BOMB_FUSE_TIME) {
        this.explodeBomb(bomb);
        this.bombs.splice(i, 1);
      }
    }
  }

  private explodeBomb(bomb: Bomb): void {
    // Clear bomb from cell
    const cell = this.grid.getCell(bomb.x, bomb.y);
    if (cell) cell.hasBomb = false;
    
    // Return bomb to player
    this.player.returnBomb();
    
    // Remove bomb mesh
    this.scene.remove(bomb.mesh);
    
    // Create explosion
    this.createExplosion(bomb.x, bomb.y);
    
    // Propagate in 4 directions
    const directions = [{x: 0, y: -1}, {x: 0, y: 1}, {x: -1, y: 0}, {x: 1, y: 0}];
    
    for (const dir of directions) {
      for (let i = 1; i <= bomb.range; i++) {
        const ex = bomb.x + dir.x * i;
        const ey = bomb.y + dir.y * i;
        
        const hitCell = this.grid.getCell(ex, ey);
        if (!hitCell) break;
        
        // Create explosion
        this.createExplosion(ex, ey);
        
        // Check if hit wall
        if (hitCell.type === 'indestructible') {
          break;
        }
        
        // Check if hit destructible wall
        if (hitCell.hasDestructibleWall) {
          this.grid.destroyWall(ex, ey);
          break;
        }
        
        // Check if hit player
        if (this.player.gridX === ex && this.player.gridY === ey && this.player.alive) {
          this.player.takeDamage();
          if (!this.player.alive) {
            console.log('💀 Player died!');
          }
        }
        
        // Check if hit enemies
        this.enemySpawner.checkExplosionHit(ex, ey);
        
        // Chain reaction with other bombs
        const otherBomb = this.bombs.find(b => b.x === ex && b.y === ey);
        if (otherBomb) {
          otherBomb.placedAt = 0; // Explode immediately
          break;
        }
      }
    }
    
    console.log(`💥 Explosion at (${bomb.x}, ${bomb.y})`);
  }

  private createExplosion(x: number, y: number): void {
    const pos = this.grid.gridToWorld(x, y);
    const mesh = new THREE.Mesh(this.explosionGeo, this.explosionMat.clone());
    mesh.position.set(pos.x, 0.05, pos.z);
    this.scene.add(mesh);
    
    this.explosions.push({
      x, y,
      timeLeft: 0.5,
      mesh
    });
  }

  private updateExplosions(dt: number): void {
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      const exp = this.explosions[i];
      exp.timeLeft -= dt;
      
      // Fade out
      const alpha = exp.timeLeft / 0.5;
      (exp.mesh.material as THREE.MeshBasicMaterial).opacity = alpha;
      (exp.mesh.material as THREE.MeshBasicMaterial).transparent = true;
      
      if (exp.timeLeft <= 0) {
        this.scene.remove(exp.mesh);
        this.explosions.splice(i, 1);
      }
    }
  }

  private processEnemyDrops(): void {
    const drops = this.enemySpawner.consumePowerUpDrops();
    
    for (const drop of drops) {
      // Spawn power-up in the cell
      const cell = this.grid.getCell(drop.x, drop.y);
      if (cell && !cell.powerUp) {
        cell.powerUp = drop.type;
        
        // Create visual power-up in grid
        const powerUpColors: Record<PowerUpType, number> = {
          bomb: 0xFF4081,
          fire: 0xFF9800,
          speed: 0x00E676,
        };
        
        const pos = this.grid.gridToWorld(drop.x, drop.y);
        const geo = new THREE.SphereGeometry(0.25, 8, 8);
        const mat = new THREE.MeshStandardMaterial({ 
          color: powerUpColors[drop.type], 
          emissive: powerUpColors[drop.type], 
          emissiveIntensity: 0.5 
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(pos.x, 0.3, pos.z);
        this.grid.group.add(mesh);
        cell.powerUpMesh = mesh;
        
        console.log(`🎁 Enemy dropped ${drop.type} power-up at (${drop.x}, ${drop.y})`);
      }
    }
  }

  private checkGameConditions(): void {
    // Check if all enemies defeated
    if (this.enemySpawner.areAllDefeated()) {
      this.levelComplete = true;
      console.log('🎉 Level Complete!');
    }
    
    // Check if player died
    if (!this.player.alive) {
      this.gameOver = true;
      console.log('💀 Game Over!');
    }
  }

  private updateCamera(): void {
    // Smooth camera follow
    const targetX = this.player.worldX * 0.3;
    const targetZ = this.player.worldZ * 0.3 + 15;
    
    this.camera.position.x += (targetX - this.camera.position.x) * 0.1;
    this.camera.position.z += (targetZ - this.camera.position.z) * 0.1;
    this.camera.lookAt(this.player.worldX * 0.2, 0, this.player.worldZ * 0.2);
  }

  public dispose(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    this.enemySpawner.reset();
    this.renderer.dispose();
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  }
}

// Initialize game when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new Game());
} else {
  new Game();
}
