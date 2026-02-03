import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/**
 * Animation states for the astronaut character
 */
export enum AstronautAnimationState {
  IDLE = 'idle',
  WALK = 'walk',
  DEATH = 'death',
  PLACE_BOMB = 'place_bomb',
  VICTORY = 'victory',
}

/**
 * Configuration options for the astronaut character
 */
export interface AstronautConfig {
  /** Primary suit color (default: white) */
  suitColor?: number;
  /** Secondary/accent color (default: orange) */
  accentColor?: number;
  /** Helmet glass tint color (default: slight gold reflection) */
  glassTint?: number;
  /** Character scale (default: 1) */
  scale?: number;
  /** Player ID for color variation */
  playerId?: number;
}

/**
 * Predefined color schemes for different players
 */
const PLAYER_COLOR_SCHEMES: { suit: number; accent: number; glass: number }[] = [
  { suit: 0xf5f5f5, accent: 0xff6b35, glass: 0xffd700 }, // White + Orange
  { suit: 0xe8e8e8, accent: 0x00d4ff, glass: 0x87ceeb }, // Light Gray + Cyan
  { suit: 0xffffff, accent: 0xff3366, glass: 0xff69b4 }, // White + Pink
  { suit: 0xf0f0f0, accent: 0x00ff88, glass: 0x98fb98 }, // Off-white + Green
  { suit: 0xe0e0e0, accent: 0xaa66ff, glass: 0xdda0dd }, // Gray + Purple
  { suit: 0xffffff, accent: 0xffaa00, glass: 0xffd700 }, // White + Gold
  { suit: 0xf5f5f5, accent: 0xff4444, glass: 0xff6b6b }, // White + Red
  { suit: 0xe8e8e8, accent: 0x4488ff, glass: 0x87cefa }, // Gray + Blue
];

/**
 * AstronautCharacter - Procedural 3D character for Bomberman game
 * 
 * Features:
 * - Oversized round helmet (60% body proportion) with chibi/cute style
 * - Modern 2026 AAA mobile game aesthetic
 * - Glossy reflective glass helmet with PBR materials
 * - Smooth rounded forms (no blocky cubes)
 * - Full animation system (idle, walk, death, place bomb, victory)
 * - Backpack/jetpack detail
 */
export class AstronautCharacter {
  // Scene graph root
  readonly root: THREE.Group;
  
  // Body parts for animation
  private helmet!: THREE.Mesh;
  private helmetRim!: THREE.Mesh;
  private body!: THREE.Mesh;
  private backpack!: THREE.Group;
  private leftArm!: THREE.Group;
  private rightArm!: THREE.Group;
  private leftLeg!: THREE.Group;
  private rightLeg!: THREE.Group;
  private jetpackFlame!: THREE.PointLight;
  private jetpackParticles!: THREE.Mesh[];
  
  // Materials
  private suitMaterial!: THREE.MeshStandardMaterial;
  private accentMaterial!: THREE.MeshStandardMaterial;
  private glassMaterial!: THREE.MeshPhysicalMaterial;
  private backpackMaterial!: THREE.MeshStandardMaterial;
  
  // Animation state
  private animationState: AstronautAnimationState = AstronautAnimationState.IDLE;
  private animationTime: number = 0;
  private deathProgress: number = 0;
  private isDead: boolean = false;
  
  // Configuration
  private readonly config: Required<AstronautConfig>;
  private readonly baseScale: number = 1.5; // Larger character for better visibility
  
  // Constants for proportions (chibi style - big head, small body)
  private readonly HELMET_RADIUS = 0.45; // 60% of visual height
  private readonly BODY_RADIUS = 0.22;
  private readonly BODY_HEIGHT = 0.35;
  private readonly LIMB_RADIUS = 0.08;
  private readonly LIMB_LENGTH = 0.28;
  
  constructor(config: AstronautConfig = {}) {
    // Apply defaults and player color scheme
    const colorScheme = PLAYER_COLOR_SCHEMES[config.playerId ?? 0 % PLAYER_COLOR_SCHEMES.length];
    
    this.config = {
      suitColor: config.suitColor ?? colorScheme.suit,
      accentColor: config.accentColor ?? colorScheme.accent,
      glassTint: config.glassTint ?? colorScheme.glass,
      scale: config.scale ?? 1,
      playerId: config.playerId ?? 0,
    };
    
    this.root = new THREE.Group();
    this.root.scale.setScalar(this.config.scale * this.baseScale);
    
    this.createMaterials();
    this.createGeometry();
    this.setupShadows();
  }
  
  /**
   * Create PBR materials for the character
   */
  private createMaterials(): void {
    // Main suit material - matte white fabric with slight roughness
    this.suitMaterial = new THREE.MeshStandardMaterial({
      color: this.config.suitColor,
      roughness: 0.6,
      metalness: 0.1,
      bumpScale: 0.02,
    });
    
    // Accent material - orange glossy sections
    this.accentMaterial = new THREE.MeshStandardMaterial({
      color: this.config.accentColor,
      roughness: 0.3,
      metalness: 0.4,
      emissive: this.config.accentColor,
      emissiveIntensity: 0.1,
    });
    
    // Glass helmet material - physically based glass
    this.glassMaterial = new THREE.MeshPhysicalMaterial({
      color: this.config.glassTint,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.95, // Glass-like transparency
      thickness: 0.5,
      ior: 1.5, // Index of refraction for glass
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.5,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    
    // Backpack material
    this.backpackMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.5,
      metalness: 0.6,
    });
  }
  
  /**
   * Create all geometry parts
   */
  private createGeometry(): void {
    // Create helmet (oversized for chibi look)
    this.createHelmet();
    
    // Create body
    this.createBody();
    
    // Create limbs
    this.createArms();
    this.createLegs();
    
    // Create backpack/jetpack
    this.createBackpack();
  }
  
  /**
   * Create the oversized reflective helmet
   */
  private createHelmet(): void {
    const helmetGroup = new THREE.Group();
    helmetGroup.position.y = this.BODY_HEIGHT * 0.5 + this.HELMET_RADIUS * 0.6;
    
    // Main glass sphere
    const helmetGeo = new THREE.SphereGeometry(this.HELMET_RADIUS, 32, 32);
    this.helmet = new THREE.Mesh(helmetGeo, this.glassMaterial);
    this.helmet.castShadow = true;
    this.helmet.receiveShadow = true;
    helmetGroup.add(this.helmet);
    
    // Helmet rim/neck seal (accent color)
    const rimGeo = new THREE.TorusGeometry(this.HELMET_RADIUS * 0.85, 0.04, 8, 32);
    this.helmetRim = new THREE.Mesh(rimGeo, this.accentMaterial);
    this.helmetRim.rotation.x = Math.PI / 2;
    this.helmetRim.position.y = -this.HELMET_RADIUS * 0.5;
    helmetGroup.add(this.helmetRim);
    
    // Reflection highlight (subtle inner glow)
    const highlightGeo = new THREE.SphereGeometry(this.HELMET_RADIUS * 0.7, 16, 16);
    const highlightMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    });
    const highlight = new THREE.Mesh(highlightGeo, highlightMat);
    helmetGroup.add(highlight);
    
    this.root.add(helmetGroup);
  }
  
  /**
   * Create the small rounded body
   */
  private createBody(): void {
    // Use capsule for rounded body shape
    const bodyGeo = new THREE.CapsuleGeometry(this.BODY_RADIUS, this.BODY_HEIGHT, 4, 16);
    this.body = new THREE.Mesh(bodyGeo, this.suitMaterial);
    this.body.position.y = this.BODY_HEIGHT * 0.4;
    this.body.castShadow = true;
    this.body.receiveShadow = true;
    
    // Chest accent (orange patch)
    const chestGeo = new THREE.CapsuleGeometry(this.BODY_RADIUS * 0.6, this.BODY_HEIGHT * 0.4, 4, 12);
    const chest = new THREE.Mesh(chestGeo, this.accentMaterial);
    chest.position.set(0, this.BODY_HEIGHT * 0.1, this.BODY_RADIUS * 0.5);
    chest.scale.z = 0.3;
    this.body.add(chest);
    
    // Suit details - collar ring
    const collarGeo = new THREE.TorusGeometry(this.BODY_RADIUS * 0.9, 0.03, 8, 24);
    const collar = new THREE.Mesh(collarGeo, this.accentMaterial);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = this.BODY_HEIGHT * 0.45;
    this.body.add(collar);
    
    this.root.add(this.body);
  }
  
  /**
   * Create arms with joints
   */
  private createArms(): void {
    // Left arm
    this.leftArm = this.createLimb(true);
    this.leftArm.position.set(this.BODY_RADIUS + this.LIMB_RADIUS, this.BODY_HEIGHT * 0.6, 0);
    this.root.add(this.leftArm);
    
    // Right arm
    this.rightArm = this.createLimb(false);
    this.rightArm.position.set(-(this.BODY_RADIUS + this.LIMB_RADIUS), this.BODY_HEIGHT * 0.6, 0);
    this.root.add(this.rightArm);
  }
  
  /**
   * Create legs with joints
   */
  private createLegs(): void {
    // Left leg
    this.leftLeg = this.createLimb(true, true);
    this.leftLeg.position.set(this.BODY_RADIUS * 0.4, 0.05, 0);
    this.root.add(this.leftLeg);
    
    // Right leg
    this.rightLeg = this.createLimb(false, true);
    this.rightLeg.position.set(-this.BODY_RADIUS * 0.4, 0.05, 0);
    this.root.add(this.rightLeg);
  }
  
  /**
   * Create a limb (arm or leg) with proper pivot
   */
  private createLimb(isLeft: boolean, isLeg: boolean = false): THREE.Group {
    const limbGroup = new THREE.Group();
    
    // Limb geometry
    const limbLength = isLeg ? this.LIMB_LENGTH * 0.9 : this.LIMB_LENGTH;
    const limbGeo = new THREE.CapsuleGeometry(this.LIMB_RADIUS, limbLength, 4, 12);
    const limb = new THREE.Mesh(limbGeo, this.suitMaterial);
    
    // Position mesh so pivot is at the top
    limb.position.y = -limbLength * 0.5;
    limb.castShadow = true;
    limb.receiveShadow = true;
    
    // Accent stripe for limbs
    const stripeGeo = new THREE.CapsuleGeometry(this.LIMB_RADIUS * 1.05, limbLength * 0.3, 4, 8);
    const stripe = new THREE.Mesh(stripeGeo, this.accentMaterial);
    stripe.position.y = -limbLength * 0.3;
    stripe.scale.set(1, 1, 0.5);
    limb.add(stripe);
    
    // Hand/foot
    const endGeo = new THREE.SphereGeometry(this.LIMB_RADIUS * 1.3, 12, 12);
    const endMesh = new THREE.Mesh(endGeo, isLeg ? this.accentMaterial : this.suitMaterial);
    endMesh.position.y = -limbLength * 0.5;
    if (isLeg) {
      endMesh.scale.y = 0.6; // Flatten for foot
      endMesh.position.y -= 0.05;
    }
    limb.add(endMesh);
    
    limbGroup.add(limb);
    return limbGroup;
  }
  
  /**
   * Create backpack/jetpack detail
   */
  private createBackpack(): void {
    this.backpack = new THREE.Group();
    this.backpack.position.set(0, this.BODY_HEIGHT * 0.5, -this.BODY_RADIUS * 0.8);
    
    // Main backpack body
    const packGeo = new RoundedBoxGeometry(0.35, 0.4, 0.2, 4, 0.05);
    const packMesh = new THREE.Mesh(packGeo, this.backpackMaterial);
    packMesh.castShadow = true;
    this.backpack.add(packMesh);
    
    // Jetpack nozzles
    const nozzleGeo = new THREE.CylinderGeometry(0.05, 0.04, 0.15, 8);
    const leftNozzle = new THREE.Mesh(nozzleGeo, this.accentMaterial);
    leftNozzle.position.set(-0.1, -0.25, -0.05);
    this.backpack.add(leftNozzle);
    
    const rightNozzle = new THREE.Mesh(nozzleGeo, this.accentMaterial);
    rightNozzle.position.set(0.1, -0.25, -0.05);
    this.backpack.add(rightNozzle);
    
    // Jetpack glow light
    this.jetpackFlame = new THREE.PointLight(this.config.accentColor, 0.5, 2);
    this.jetpackFlame.position.set(0, -0.35, -0.1);
    this.backpack.add(this.jetpackFlame);
    
    // Create particle system for jetpack flames
    this.jetpackParticles = [];
    for (let i = 0; i < 6; i++) {
      const particleGeo = new THREE.SphereGeometry(0.02 + Math.random() * 0.02, 6, 6);
      const particleMat = new THREE.MeshBasicMaterial({
        color: this.config.accentColor,
        transparent: true,
        opacity: 0.8,
      });
      const particle = new THREE.Mesh(particleGeo, particleMat);
      particle.userData = {
        offset: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5,
      };
      this.jetpackParticles.push(particle);
      this.backpack.add(particle);
    }
    
    this.root.add(this.backpack);
  }
  
  /**
   * Setup shadow casting for all meshes
   */
  private setupShadows(): void {
    this.root.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }
  
  // ==================== ANIMATION SYSTEM ====================
  
  /**
   * Update animation state
   * @param deltaTime Time since last frame in seconds
   */
  update(deltaTime: number): void {
    if (this.isDead) return;
    
    this.animationTime += deltaTime;
    
    switch (this.animationState) {
      case AstronautAnimationState.IDLE:
        this.animateIdle();
        break;
      case AstronautAnimationState.WALK:
        this.animateWalk();
        break;
      case AstronautAnimationState.DEATH:
        this.animateDeath(deltaTime);
        break;
      case AstronautAnimationState.PLACE_BOMB:
        this.animatePlaceBomb();
        break;
      case AstronautAnimationState.VICTORY:
        this.animateVictory();
        break;
    }
    
    // Always animate jetpack particles
    this.animateJetpackParticles(deltaTime);
  }
  
  /**
   * Set the current animation state
   */
  setAnimationState(state: AstronautAnimationState): void {
    if (this.animationState === state) return;
    this.animationState = state;
    this.animationTime = 0;
    
    // Reset pose when changing states (except death)
    if (state !== AstronautAnimationState.DEATH) {
      this.resetPose();
    }
  }
  
  /**
   * Reset character to default pose
   */
  private resetPose(): void {
    this.root.rotation.set(0, 0, 0);
    this.root.position.y = 0;
    this.root.scale.setScalar(this.config.scale * this.baseScale);
    
    this.leftArm.rotation.set(0, 0, 0);
    this.rightArm.rotation.set(0, 0, 0);
    this.leftLeg.rotation.set(0, 0, 0);
    this.rightLeg.rotation.set(0, 0, 0);
    
    this.body.rotation.set(0, 0, 0);
  }
  
  /**
   * Idle animation - gentle bobbing and breathing
   */
  private animateIdle(): void {
    const time = this.animationTime;
    
    // Gentle bobbing
    const bobHeight = 0.03;
    const bobSpeed = 2;
    this.root.position.y = Math.sin(time * bobSpeed) * bobHeight;
    
    // Subtle breathing - chest expansion
    const breathScale = 1 + Math.sin(time * 1.5) * 0.02;
    this.body.scale.set(breathScale, breathScale, breathScale);
    
    // Slight arm sway
    const armSway = Math.sin(time * 1.5) * 0.05;
    this.leftArm.rotation.z = armSway + 0.1;
    this.rightArm.rotation.z = -armSway - 0.1;
    
    // Subtle head/helmet tilt
    this.helmet.rotation.x = Math.sin(time * 0.7) * 0.02;
    this.helmet.rotation.y = Math.sin(time * 0.5) * 0.03;
  }
  
  /**
   * Walk animation - limb movement with bounce
   */
  private animateWalk(): void {
    const time = this.animationTime;
    const walkSpeed = 8;
    const limbSwing = 0.5;
    
    // Bounce with each step
    const bounceHeight = 0.08;
    this.root.position.y = Math.abs(Math.sin(time * walkSpeed)) * bounceHeight;
    
    // Arm swing (opposite to legs)
    this.leftArm.rotation.x = Math.sin(time * walkSpeed) * limbSwing;
    this.rightArm.rotation.x = Math.sin(time * walkSpeed + Math.PI) * limbSwing;
    
    // Leg swing
    this.leftLeg.rotation.x = Math.sin(time * walkSpeed + Math.PI) * limbSwing;
    this.rightLeg.rotation.x = Math.sin(time * walkSpeed) * limbSwing;
    
    // Slight body tilt in direction of movement
    this.body.rotation.z = Math.sin(time * walkSpeed) * 0.05;
    
    // Helmet counter-rotation for stability feel
    this.helmet.rotation.x = Math.sin(time * walkSpeed * 2) * 0.03;
  }
  
  /**
   * Death animation - spin and shrink
   */
  private animateDeath(deltaTime: number): void {
    this.deathProgress += deltaTime;
    const duration = 1.5; // Death animation duration
    const progress = Math.min(this.deathProgress / duration, 1);
    
    // Spin faster as death progresses
    const spinSpeed = 5 + progress * 10;
    this.root.rotation.y += spinSpeed * deltaTime;
    this.root.rotation.z = Math.sin(this.deathProgress * 3) * 0.3;
    
    // Shrink
    const shrinkScale = (1 - progress) * this.config.scale * this.baseScale;
    this.root.scale.setScalar(Math.max(shrinkScale, 0.01));
    
    // Rise up slightly then fall
    const riseHeight = 1.5;
    if (progress < 0.3) {
      // Rise phase
      const riseProgress = progress / 0.3;
      this.root.position.y = riseProgress * riseHeight;
    } else {
      // Fall phase
      const fallProgress = (progress - 0.3) / 0.7;
      this.root.position.y = riseHeight * (1 - fallProgress);
    }
    
    // Arms flail
    this.leftArm.rotation.z = Math.sin(this.deathProgress * 15) * 0.8;
    this.rightArm.rotation.z = Math.cos(this.deathProgress * 15) * 0.8;
    
    // Fade out glass
    this.glassMaterial.opacity = 0.3 * (1 - progress);
    
    // Intensify jetpack flames
    this.jetpackFlame.intensity = 0.5 + progress * 2;
    
    if (progress >= 1) {
      this.isDead = true;
      this.root.visible = false;
    }
  }
  
  /**
   * Place bomb animation - crouch and extend arms
   */
  private animatePlaceBomb(): void {
    const time = this.animationTime;
    const duration = 0.4;
    
    if (time > duration) {
      this.setAnimationState(AstronautAnimationState.IDLE);
      return;
    }
    
    const progress = time / duration;
    const phase = Math.sin(progress * Math.PI); // 0 -> 1 -> 0
    
    // Crouch down
    this.root.position.y = -phase * 0.15;
    
    // Arms extend forward
    this.leftArm.rotation.x = phase * 0.8;
    this.rightArm.rotation.x = phase * 0.8;
    this.leftArm.rotation.z = -phase * 0.3;
    this.rightArm.rotation.z = phase * 0.3;
    
    // Legs bend
    this.leftLeg.rotation.x = -phase * 0.3;
    this.rightLeg.rotation.x = -phase * 0.3;
  }
  
  /**
   * Victory animation - jump and celebrate
   */
  private animateVictory(): void {
    const time = this.animationTime;
    const jumpSpeed = 4;
    
    // Happy jump
    const jumpHeight = 0.3;
    this.root.position.y = Math.abs(Math.sin(time * jumpSpeed)) * jumpHeight;
    
    // Arms raised in victory
    const armRaise = 0.5 + Math.sin(time * jumpSpeed) * 0.2;
    this.leftArm.rotation.z = armRaise;
    this.rightArm.rotation.z = -armRaise;
    
    // Spin celebration
    this.root.rotation.y += 2 * 0.016; // Slow spin
    
    // Helmet bob
    this.helmet.rotation.x = Math.sin(time * jumpSpeed * 2) * 0.1;
  }
  
  /**
   * Animate jetpack particles
   */
  private animateJetpackParticles(deltaTime: number): void {
    const time = this.animationTime;
    
    this.jetpackParticles.forEach((particle, index) => {
      const data = particle.userData;
      const cycle = (time * data.speed + data.offset) % (Math.PI * 2);
      
      // Particles move downward and fade
      const yOffset = -Math.abs(Math.sin(cycle)) * 0.3;
      const xOffset = Math.cos(cycle * 2) * 0.05 * (index % 2 === 0 ? 1 : -1);
      
      particle.position.set(
        (index < 3 ? -0.1 : 0.1) + xOffset,
        -0.3 + yOffset,
        -0.1
      );
      
      // Fade based on distance
      const fade = 1 - Math.abs(Math.sin(cycle));
      (particle.material as THREE.MeshBasicMaterial).opacity = fade * 0.8;
      
      // Scale down as they fade
      const scale = 0.5 + fade * 0.5;
      particle.scale.setScalar(scale);
    });
    
    // Pulse the jetpack light
    this.jetpackFlame.intensity = 0.5 + Math.sin(time * 3) * 0.2;
  }
  
  // ==================== PUBLIC API ====================
  
  /**
   * Get the character's current position
   */
  getPosition(): THREE.Vector3 {
    return this.root.position.clone();
  }
  
  /**
   * Set the character's position
   */
  setPosition(x: number, y: number, z: number): void {
    this.root.position.set(x, y, z);
  }
  
  /**
   * Set the character's rotation (Y-axis)
   */
  setRotationY(angle: number): void {
    this.root.rotation.y = angle;
  }
  
  /**
   * Get the character's rotation
   */
  getRotationY(): number {
    return this.root.rotation.y;
  }
  
  /**
   * Trigger death animation
   */
  die(): void {
    if (this.isDead) return;
    this.setAnimationState(AstronautAnimationState.DEATH);
  }
  
  /**
   * Check if death animation is complete
   */
  isDeathComplete(): boolean {
    return this.isDead;
  }
  
  /**
   * Reset character to initial state
   */
  reset(): void {
    this.isDead = false;
    this.deathProgress = 0;
    this.animationTime = 0;
    this.root.visible = true;
    this.glassMaterial.opacity = 0.3;
    this.setAnimationState(AstronautAnimationState.IDLE);
  }
  
  /**
   * Get current animation state
   */
  getAnimationState(): AstronautAnimationState {
    return this.animationState;
  }
  
  /**
   * Dispose of all resources
   */
  dispose(): void {
    // Dispose geometries
    this.root.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
      }
    });
    
    // Dispose materials
    this.suitMaterial.dispose();
    this.accentMaterial.dispose();
    this.glassMaterial.dispose();
    this.backpackMaterial.dispose();
  }
  
  /**
   * Get the character's bounding radius for collision
   */
  getBoundingRadius(): number {
    return this.HELMET_RADIUS * this.config.scale * this.baseScale;
  }
  
  /**
   * Set visibility
   */
  setVisible(visible: boolean): void {
    this.root.visible = visible;
  }
  
  /**
   * Set emissive intensity for power-up effects
   */
  setEmissiveIntensity(intensity: number): void {
    this.accentMaterial.emissiveIntensity = 0.1 + intensity;
    this.jetpackFlame.intensity = 0.5 + intensity;
  }
  
  /**
   * Flash the character (for damage/hit feedback)
   */
  flash(duration: number = 0.2): void {
    const originalEmissive = this.suitMaterial.emissive.clone();
    this.suitMaterial.emissive.setHex(0xffffff);
    this.suitMaterial.emissiveIntensity = 0.5;
    
    setTimeout(() => {
      this.suitMaterial.emissive.copy(originalEmissive);
      this.suitMaterial.emissiveIntensity = 0;
    }, duration * 1000);
  }
}

export default AstronautCharacter;
