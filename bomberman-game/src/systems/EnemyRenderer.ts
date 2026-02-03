import * as THREE from 'three';
import { TILE_WORLD_SIZE } from '@core/types';
import { EnemyState, EnemyType } from '@core/ExtendedTypes';

interface DyingEnemy {
  mesh: THREE.Group;
  particles: THREE.Points;
  timeLeft: number;
  position: THREE.Vector3;
}

export class EnemyRenderer {
  private scene: THREE.Scene;
  private enemyMeshes: Map<number, THREE.Group> = new Map();
  private dyingEnemies: DyingEnemy[] = [];
  
  // Enemy colors by type
  private readonly enemyColors = {
    [EnemyType.BASIC]: 0xff4444,
    [EnemyType.FAST]: 0xff8800,
    [EnemyType.SMART]: 0x8844ff,
    [EnemyType.TANK]: 0x444444,
  };

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  syncEnemies(enemies: EnemyState[], deltaTime: number): void {
    const activeIds = new Set(enemies.map(e => e.id));
    
    // Update dying enemies (disintegration effect)
    this.updateDyingEnemies(deltaTime);
    
    // Remove stale enemies - trigger disintegration!
    for (const [id, mesh] of this.enemyMeshes) {
      if (!activeIds.has(id)) {
        this.triggerDisintegration(mesh);
        this.enemyMeshes.delete(id);
      }
    }
    
    // Add/update enemies
    for (const enemy of enemies) {
      let mesh = this.enemyMeshes.get(enemy.id);
      
      if (!mesh) {
        mesh = this.createEnemyMesh(enemy.type);
        this.scene.add(mesh);
        this.enemyMeshes.set(enemy.id, mesh);
      }
      
      // Smooth position update
      mesh.position.x = enemy.worldPos.x;
      mesh.position.z = enemy.worldPos.y;
      
      // Bobbing animation
      mesh.position.y = 0.4 + Math.sin(Date.now() * 0.005 + enemy.id) * 0.1;
      
      // Face direction of movement
      if (enemy.moveDir !== 0) {
        let targetRotation = 0;
        switch (enemy.moveDir) {
          case 1: targetRotation = 0; break; // Up
          case 2: targetRotation = Math.PI; break; // Down
          case 3: targetRotation = -Math.PI / 2; break; // Left
          case 4: targetRotation = Math.PI / 2; break; // Right
        }
        mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, targetRotation, 0.1);
      }
      
      // Pulsing effect for "alive" feel
      const pulse = 1 + Math.sin(Date.now() * 0.008 + enemy.id * 0.5) * 0.05;
      mesh.scale.setScalar(pulse);
    }
  }

  private createEnemyMesh(type: EnemyType): THREE.Group {
    const group = new THREE.Group();
    const color = this.enemyColors[type] || 0xff4444;
    
    // Body - main sphere
    const bodyGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const bodyMat = new THREE.MeshStandardMaterial({ 
      color,
      emissive: color,
      emissiveIntensity: 0.3,
      roughness: 0.3,
      metalness: 0.5
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.castShadow = true;
    group.add(body);
    
    // Eyes - menacing!
    const eyeGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pupilGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    
    // Left eye
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.12, 0.1, 0.28);
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(0, 0, 0.05);
    leftEye.add(leftPupil);
    group.add(leftEye);
    
    // Right eye
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.12, 0.1, 0.28);
    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
    rightPupil.position.set(0, 0, 0.05);
    rightEye.add(rightPupil);
    group.add(rightEye);
    
    // Angry eyebrows
    const browGeo = new THREE.BoxGeometry(0.15, 0.03, 0.03);
    const browMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    
    const leftBrow = new THREE.Mesh(browGeo, browMat);
    leftBrow.position.set(-0.12, 0.2, 0.3);
    leftBrow.rotation.z = -0.3;
    group.add(leftBrow);
    
    const rightBrow = new THREE.Mesh(browGeo, browMat);
    rightBrow.position.set(0.12, 0.2, 0.3);
    rightBrow.rotation.z = 0.3;
    group.add(rightBrow);
    
    // Type-specific features
    switch (type) {
      case EnemyType.FAST:
        // Speed lines / spikes
        for (let i = 0; i < 3; i++) {
          const spike = new THREE.Mesh(
            new THREE.ConeGeometry(0.05, 0.2, 4),
            new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffff00, emissiveIntensity: 0.5 })
          );
          spike.position.set(-0.3 - i * 0.1, 0, 0);
          spike.rotation.z = Math.PI / 2;
          group.add(spike);
        }
        break;
        
      case EnemyType.SMART:
        // Brain/horn on top
        const brain = new THREE.Mesh(
          new THREE.SphereGeometry(0.15, 8, 8),
          new THREE.MeshStandardMaterial({ color: 0xff88ff, emissive: 0xff88ff, emissiveIntensity: 0.3 })
        );
        brain.position.y = 0.35;
        group.add(brain);
        break;
        
      case EnemyType.TANK:
        // Armor plates
        const armor = new THREE.Mesh(
          new THREE.BoxGeometry(0.6, 0.4, 0.6),
          new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.2, metalness: 0.8 })
        );
        armor.position.y = 0;
        group.add(armor);
        break;
    }
    
    // Glow effect underneath
    const glowGeo = new THREE.CircleGeometry(0.4, 16);
    const glowMat = new THREE.MeshBasicMaterial({ 
      color,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = -0.35;
    group.add(glow);
    
    return group;
  }

  /**
   * Trigger disintegration effect when enemy dies
   */
  private triggerDisintegration(mesh: THREE.Group): void {
    const position = mesh.position.clone();
    
    // Create particle explosion
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    const velocities: THREE.Vector3[] = [];
    const colors = new Float32Array(particleCount * 3);
    
    // Get color from mesh
    let color = new THREE.Color(0xff4444);
    mesh.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        color = new THREE.Color(child.material.color);
      }
    });
    
    for (let i = 0; i < particleCount; i++) {
      // Random position around the enemy
      positions[i * 3] = position.x + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = position.y + Math.random() * 0.5;
      positions[i * 3 + 2] = position.z + (Math.random() - 0.5) * 0.5;
      
      // Random velocity - explode outward
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        Math.random() * 5 + 2,
        (Math.random() - 0.5) * 4
      ));
      
      // Color with slight variation
      colors[i * 3] = color.r + (Math.random() - 0.5) * 0.2;
      colors[i * 3 + 1] = color.g + (Math.random() - 0.5) * 0.2;
      colors[i * 3 + 2] = color.b + (Math.random() - 0.5) * 0.2;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 1,
    });
    
    const particles = new THREE.Points(geometry, material);
    (particles as any).velocities = velocities;
    this.scene.add(particles);
    
    // Remove original mesh
    this.scene.remove(mesh);
    
    // Track dying enemy for animation
    this.dyingEnemies.push({
      mesh,
      particles,
      timeLeft: 1.0, // 1 second animation
      position
    });
  }
  
  /**
   * Update disintegration animations
   */
  private updateDyingEnemies(deltaTime: number): void {
    for (let i = this.dyingEnemies.length - 1; i >= 0; i--) {
      const dying = this.dyingEnemies[i];
      dying.timeLeft -= deltaTime;
      
      // Update particle positions
      const positions = dying.particles.geometry.getAttribute('position');
      const velocities = (dying.particles as any).velocities as THREE.Vector3[];
      
      for (let j = 0; j < positions.count; j++) {
        positions.setX(j, positions.getX(j) + velocities[j].x * deltaTime);
        positions.setY(j, positions.getY(j) + velocities[j].y * deltaTime);
        positions.setZ(j, positions.getZ(j) + velocities[j].z * deltaTime);
        
        // Apply gravity
        velocities[j].y -= 15 * deltaTime;
      }
      positions.needsUpdate = true;
      
      // Fade out
      const material = dying.particles.material as THREE.PointsMaterial;
      material.opacity = Math.max(0, dying.timeLeft);
      
      // Remove when done
      if (dying.timeLeft <= 0) {
        this.scene.remove(dying.particles);
        dying.particles.geometry.dispose();
        (dying.particles.material as THREE.Material).dispose();
        this.dyingEnemies.splice(i, 1);
      }
    }
  }

  removeEnemy(id: number): void {
    const mesh = this.enemyMeshes.get(id);
    if (mesh) {
      this.triggerDisintegration(mesh);
      this.enemyMeshes.delete(id);
    }
  }

  dispose(): void {
    for (const mesh of this.enemyMeshes.values()) {
      this.scene.remove(mesh);
    }
    this.enemyMeshes.clear();
    
    // Clean up dying enemies
    for (const dying of this.dyingEnemies) {
      this.scene.remove(dying.particles);
      dying.particles.geometry.dispose();
      (dying.particles.material as THREE.Material).dispose();
    }
    this.dyingEnemies = [];
  }
}
