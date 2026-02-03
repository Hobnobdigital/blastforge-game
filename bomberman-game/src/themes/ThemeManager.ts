/** ThemeManager - Central theme system for BlastForge
 * Handles theme loading, switching, and rendering integration
 */

import * as THREE from 'three';
import { LevelTheme } from '@core/ExtendedTypes';
import { MiamiBeachTheme } from './MiamiBeachTheme';

export interface ThemeMaterials {
  floor: THREE.Material;
  hardBlock: THREE.Material;
  softBlock: THREE.Material;
}

export interface ActiveTheme {
  name: LevelTheme;
  instance: MiamiBeachTheme | null;
  materials: ThemeMaterials;
}

export class ThemeManager {
  private scene: THREE.Scene;
  private currentTheme: ActiveTheme | null = null;

  // Default materials (fallback)
  private defaultMaterials: ThemeMaterials;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.defaultMaterials = this.createDefaultMaterials();
  }

  private createDefaultMaterials(): ThemeMaterials {
    return {
      floor: new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.8 }),
      hardBlock: new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.7 }),
      softBlock: new THREE.MeshStandardMaterial({ color: 0x8b6914, roughness: 0.6 }),
    };
  }

  /** Load and activate a theme */
  public loadTheme(theme: LevelTheme): void {
    console.log(`[ThemeManager] 🎨 loadTheme() called with theme: ${theme}`);
    // Cleanup existing theme
    this.cleanup();

    switch (theme) {
      case LevelTheme.MIAMI_BEACH:
        console.log('[ThemeManager] 🏖️ Creating Miami Beach theme...');
        this.currentTheme = this.createMiamiBeachTheme();
        break;
      case LevelTheme.LAHO_VIDEO:
        console.log('[ThemeManager] 🎬 Creating Laho Video theme (flying carpet)...');
        this.currentTheme = this.createVideoBackgroundTheme();
        break;
      case LevelTheme.CLASSIC:
      case LevelTheme.ICE:
      case LevelTheme.VOLCANO:
      case LevelTheme.FOREST:
      case LevelTheme.DESERT:
      case LevelTheme.SPACE:
      default:
        this.currentTheme = this.createDefaultTheme(theme);
        break;
    }

    // Note: Animation updates are driven by SceneManager's render loop
    // via the update() method, not a separate animation loop
  }

  private createMiamiBeachTheme(): ActiveTheme {
    console.log('[ThemeManager] 🏗️ createMiamiBeachTheme() called');
    const instance = new MiamiBeachTheme(this.scene);
    instance.addBeachDecorations();

    const materials = instance.getMaterials();
    console.log('[ThemeManager] ✅ Miami Beach theme created. Materials:', Object.keys(materials));

    return {
      name: LevelTheme.MIAMI_BEACH,
      instance,
      materials,
    };
  }

  private createDefaultTheme(theme: LevelTheme): ActiveTheme {
    // Apply theme-specific colors
    const colors = this.getThemeColors(theme);

    // Update scene background
    this.scene.background = new THREE.Color(colors.background);
    this.scene.fog = null;

    // Create materials for this theme
    const materials: ThemeMaterials = {
      floor: new THREE.MeshStandardMaterial({
        color: colors.floor,
        roughness: 0.8,
      }),
      hardBlock: new THREE.MeshStandardMaterial({
        color: 0x666666,
        roughness: 0.7,
      }),
      softBlock: new THREE.MeshStandardMaterial({
        color: colors.accent,
        roughness: 0.6,
      }),
    };

    // Setup basic lighting
    this.setupBasicLighting(colors);

    return {
      name: theme,
      instance: null,
      materials,
    };
  }

  private createVideoBackgroundTheme(): ActiveTheme {
    // For video background, we use transparent/semi-transparent materials
    // to let the video show through
    
    // Clear scene background (will show video behind)
    this.scene.background = null;
    this.scene.fog = null;

    // Create semi-transparent materials for flying carpet effect
    const materials: ThemeMaterials = {
      floor: new THREE.MeshStandardMaterial({
        color: 0x1a1a2a,
        roughness: 0.4,
        metalness: 0.2,
        transparent: true,
        opacity: 0.85,
      }),
      hardBlock: new THREE.MeshStandardMaterial({
        color: 0x333344,
        roughness: 0.5,
        metalness: 0.3,
      }),
      softBlock: new THREE.MeshStandardMaterial({
        color: 0x4444ff,
        roughness: 0.4,
        emissive: 0x111144,
        emissiveIntensity: 0.3,
      }),
    };

    // Setup dramatic lighting for flying carpet
    this.setupVideoLighting();

    return {
      name: LevelTheme.LAHO_VIDEO,
      instance: null,
      materials,
    };
  }

  private setupVideoLighting(): void {
    // Clear existing lights
    this.scene.children.filter(c => c instanceof THREE.Light).forEach(l => this.scene.remove(l));

    // Brighter ambient for video level
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambient);

    // Golden/warm directional light
    const dirLight = new THREE.DirectionalLight(0xffdd88, 0.8);
    dirLight.position.set(5, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(1024, 1024);
    this.scene.add(dirLight);

    // Blue rim light from below for magical effect
    const rimLight = new THREE.DirectionalLight(0x4488ff, 0.4);
    rimLight.position.set(-5, -5, 0);
    this.scene.add(rimLight);
  }

  private setupBasicLighting(colors: { background: number; accent: number }): void {
    // Clear existing lights
    this.scene.children.filter(c => c instanceof THREE.Light).forEach(l => this.scene.remove(l));

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(colors.accent, 0.8);
    dirLight.position.set(10, 15, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(1024, 1024);
    this.scene.add(dirLight);
  }

  private getThemeColors(theme: LevelTheme): { background: number; floor: number; accent: number } {
    switch (theme) {
      case LevelTheme.ICE:
        return { background: 0x0a1a2a, floor: 0x2a4a6a, accent: 0x88ccff };
      case LevelTheme.VOLCANO:
        return { background: 0x1a0a0a, floor: 0x4a2a2a, accent: 0xff6644 };
      case LevelTheme.FOREST:
        return { background: 0x0a1a0a, floor: 0x2a4a2a, accent: 0x66ff88 };
      case LevelTheme.DESERT:
        return { background: 0x1a1a0a, floor: 0x6a5a3a, accent: 0xffcc66 };
      case LevelTheme.SPACE:
        return { background: 0x050510, floor: 0x2a2a4a, accent: 0xaa88ff };
      case LevelTheme.CLASSIC:
      default:
        return { background: 0x0a0a0a, floor: 0x2a2a2a, accent: 0x00aaff };
    }
  }

  /** Update theme animations - called by SceneManager each frame */
  public update(deltaTime: number): void {
    if (this.currentTheme?.instance) {
      this.currentTheme.instance.update(deltaTime);
    }
  }

  /** Get materials for the current theme */
  public getMaterials(): ThemeMaterials {
    const materials = this.currentTheme?.materials ?? this.defaultMaterials;
    console.log(`[ThemeManager] 📦 getMaterials() returning materials for theme: ${this.currentTheme?.name ?? 'default'}`);
    return materials;
  }

  /** Get the current theme type */
  public getCurrentTheme(): LevelTheme | null {
    return this.currentTheme?.name ?? null;
  }

  /** Check if the current theme has special rendering */
  public hasActiveEffects(): boolean {
    return this.currentTheme?.instance !== null;
  }

  /** Cleanup theme resources */
  public cleanup(): void {
    if (this.currentTheme?.instance) {
      this.currentTheme.instance.dispose();
    }

    // Clear decorations from scene
    const toRemove: THREE.Object3D[] = [];
    this.scene.traverse((child) => {
      if (child.userData.isThemeDecoration) {
        toRemove.push(child);
      }
    });
    toRemove.forEach(obj => {
      if (obj.parent) obj.parent.remove(obj);
    });

    this.currentTheme = null;
  }

  /** Dispose all resources */
  public dispose(): void {
    this.cleanup();

    // Dispose default materials
    Object.values(this.defaultMaterials).forEach(mat => mat.dispose());
  }
}

export default ThemeManager;
