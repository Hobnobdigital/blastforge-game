import * as THREE from 'three';
import { GameState, TileType, GRID_SIZE, TILE_WORLD_SIZE } from '@core/types';

export class SceneManager {
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly renderer: THREE.WebGLRenderer;

  // Mesh pools
  private floorMesh!: THREE.Mesh;
  private hardBlockPool: THREE.InstancedMesh;
  private softBlockPool: THREE.InstancedMesh;
  private playerMeshes: THREE.Mesh[] = [];
  private bombMeshes: Map<number, THREE.Mesh> = new Map();
  private explosionMeshes: THREE.Mesh[] = [];
  private powerUpMeshes: THREE.Mesh[] = [];

  // Materials
  private readonly matFloor = new THREE.MeshStandardMaterial({ color: 0x2a2a2a });
  private readonly matHard = new THREE.MeshStandardMaterial({ color: 0x555555 });
  private readonly matSoft = new THREE.MeshStandardMaterial({ color: 0x8b6914 });
  private readonly matPlayer = new THREE.MeshStandardMaterial({ color: 0x00aaff });
  private readonly matBomb = new THREE.MeshStandardMaterial({ color: 0x111111 });
  private readonly matBombPrimed = new THREE.MeshStandardMaterial({ color: 0x3344ff, emissive: 0x1122aa });
  private readonly matBombRushed = new THREE.MeshStandardMaterial({ color: 0xff2222, emissive: 0xaa1111 });
  private readonly matExplosion = new THREE.MeshStandardMaterial({ color: 0xff6600, emissive: 0xff4400, transparent: true, opacity: 0.85 });
  private readonly matPowerUp = new THREE.MeshStandardMaterial({ color: 0x44ff44, emissive: 0x22aa22 });

  // Shared geometries
  private geoBlock = new THREE.BoxGeometry(TILE_WORLD_SIZE * 0.95, TILE_WORLD_SIZE * 0.95, TILE_WORLD_SIZE * 0.95);
  private geoPlayer = new THREE.BoxGeometry(0.7, 0.9, 0.7);
  private geoBomb = new THREE.SphereGeometry(0.35, 16, 16);
  private geoExplosion = new THREE.BoxGeometry(TILE_WORLD_SIZE * 0.9, 0.3, TILE_WORLD_SIZE * 0.9);
  private geoPowerUp = new THREE.BoxGeometry(0.4, 0.4, 0.4);

  private dummy = new THREE.Object3D();

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0a);

    // Camera — isometric-ish view looking down at the grid center
    const center = (GRID_SIZE - 1) / 2;
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(center, 18, center + 12);
    this.camera.lookAt(center, 0, center);

    // Renderer — graceful fallback when WebGL is unavailable
    try {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch (error) {
      SceneManager.showWebGLError();
      throw new Error('WebGL initialization failed: ' + (error instanceof Error ? error.message : String(error)));
    }
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
  }

  syncState(state: GameState, _alpha: number): void {
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
    this.syncPlayers(state);
    this.syncBombs(state);
    this.syncExplosions(state);
    this.syncPowerUps(state);
  }

  private syncPlayers(state: GameState): void {
    // Grow pool if needed
    while (this.playerMeshes.length < state.players.length) {
      const m = new THREE.Mesh(this.geoPlayer, this.matPlayer);
      m.castShadow = true;
      this.scene.add(m);
      this.playerMeshes.push(m);
    }
    for (let i = 0; i < this.playerMeshes.length; i++) {
      const mesh = this.playerMeshes[i];
      if (i < state.players.length && state.players[i].alive) {
        mesh.visible = true;
        mesh.position.set(state.players[i].worldPos.x, 0.45, state.players[i].worldPos.y);
      } else {
        mesh.visible = false;
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
      mesh.position.set(bomb.gridPos.col, 0.35, bomb.gridPos.row);
      // Pulse effect
      const pulse = 1 + 0.05 * Math.sin(Date.now() * 0.01 * (bomb.rushed ? 4 : bomb.primed ? 1 : 2));
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

  render(): void {
    this.renderer.render(this.scene, this.camera);
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
