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
    // Cleanup existing theme
    this.cleanup();

    switch (theme) {
      case LevelTheme.MIAMI_BEACH:
        this.currentTheme = this.createMiamiBeachTheme();
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
    const instance = new MiamiBeachTheme(this.scene);
    instance.addBeachDecorations();

    return {
      name: LevelTheme.MIAMI_BEACH,
      instance,
      materials: instance.getMaterials(),
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
    return this.currentTheme?.materials ?? this.defaultMaterials;
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
