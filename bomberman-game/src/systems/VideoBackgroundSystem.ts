/**
 * VideoBackgroundSystem - Plays a music video behind the game board
 * Creates a cinematic flying carpet experience
 */
export class VideoBackgroundSystem {
  private videoElement: HTMLVideoElement | null = null;
  private videoContainer: HTMLDivElement | null = null;
  private overlayContainer: HTMLDivElement | null = null;
  private isPlaying = false;
  private currentVideoSrc: string | null = null;
  private userInteracted = false;

  constructor() {
    this.createVideoElement();
    this.setupUserInteractionListener();
  }

  private setupUserInteractionListener(): void {
    // Listen for any user interaction to enable autoplay
    const enableAutoplay = () => {
      this.userInteracted = true;
      if (this.videoElement && this.videoElement.paused && this.currentVideoSrc) {
        this.videoElement.play().catch(() => {});
      }
    };
    
    document.addEventListener('click', enableAutoplay, { once: false });
    document.addEventListener('keydown', enableAutoplay, { once: false });
    document.addEventListener('touchstart', enableAutoplay, { once: false });
  }

  private createVideoElement(): void {
    // Create container for video - sits behind everything
    this.videoContainer = document.createElement('div');
    this.videoContainer.id = 'video-background-container';
    this.videoContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 0;
      overflow: hidden;
      background: linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%);
    `;

    // Create video element
    this.videoElement = document.createElement('video');
    this.videoElement.id = 'video-background';
    this.videoElement.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      transform: translate(-50%, -50%) scale(1.1);
      object-fit: cover;
      opacity: 0.85;
    `;
    this.videoElement.loop = true;
    this.videoElement.muted = false;
    this.videoElement.playsInline = true;
    this.videoElement.preload = 'auto';
    this.videoElement.crossOrigin = 'anonymous';

    // Add gradient overlay for better contrast with game
    const gradientOverlay = document.createElement('div');
    gradientOverlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%);
      pointer-events: none;
    `;

    this.videoContainer.appendChild(this.videoElement);
    this.videoContainer.appendChild(gradientOverlay);
    
    // Create overlay for flying objects
    this.overlayContainer = document.createElement('div');
    this.overlayContainer.id = 'flying-objects-overlay';
    this.overlayContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1;
      pointer-events: none;
      overflow: hidden;
    `;

    // Insert containers
    document.body.insertBefore(this.videoContainer, document.body.firstChild);
    document.body.insertBefore(this.overlayContainer, this.videoContainer.nextSibling);
    
    // Make canvas sit on top
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.position = 'relative';
      canvas.style.zIndex = '2';
    }
  }

  /**
   * Add flying objects (clouds, birds, particles) for parallax effect
   */
  addFlyingObjects(): void {
    if (!this.overlayContainer) return;
    
    // Clear existing objects
    this.overlayContainer.innerHTML = '';
    
    // Add clouds at different speeds (parallax layers)
    for (let i = 0; i < 8; i++) {
      this.createCloud(i);
    }
    
    // Add sparkles/stars
    for (let i = 0; i < 20; i++) {
      this.createSparkle(i);
    }
    
    // Add birds
    for (let i = 0; i < 5; i++) {
      this.createBird(i);
    }
  }

  private createCloud(index: number): void {
    const cloud = document.createElement('div');
    const size = 80 + Math.random() * 120;
    const yPos = Math.random() * 100;
    const duration = 15 + Math.random() * 20;
    const delay = Math.random() * -20;
    const opacity = 0.3 + Math.random() * 0.4;
    
    cloud.style.cssText = `
      position: absolute;
      top: ${yPos}%;
      left: -200px;
      width: ${size}px;
      height: ${size * 0.6}px;
      background: radial-gradient(ellipse at center, rgba(255,255,255,${opacity}) 0%, transparent 70%);
      border-radius: 50%;
      animation: flyCloud ${duration}s linear ${delay}s infinite;
      filter: blur(${2 + Math.random() * 3}px);
    `;
    
    this.overlayContainer?.appendChild(cloud);
  }

  private createSparkle(index: number): void {
    const sparkle = document.createElement('div');
    const size = 2 + Math.random() * 4;
    const yPos = Math.random() * 100;
    const duration = 3 + Math.random() * 5;
    const delay = Math.random() * -5;
    
    sparkle.style.cssText = `
      position: absolute;
      top: ${yPos}%;
      left: -20px;
      width: ${size}px;
      height: ${size}px;
      background: white;
      border-radius: 50%;
      box-shadow: 0 0 ${size * 2}px ${size}px rgba(255,255,255,0.5);
      animation: flySparkle ${duration}s linear ${delay}s infinite;
    `;
    
    this.overlayContainer?.appendChild(sparkle);
  }

  private createBird(index: number): void {
    const bird = document.createElement('div');
    const yPos = 10 + Math.random() * 40;
    const duration = 8 + Math.random() * 6;
    const delay = Math.random() * -8;
    const scale = 0.5 + Math.random() * 0.5;
    
    bird.innerHTML = '🕊️';
    bird.style.cssText = `
      position: absolute;
      top: ${yPos}%;
      left: -50px;
      font-size: ${24 * scale}px;
      animation: flyBird ${duration}s linear ${delay}s infinite;
      filter: brightness(1.2);
    `;
    
    this.overlayContainer?.appendChild(bird);
  }

  /**
   * Add CSS animations for flying objects
   */
  private addAnimationStyles(): void {
    const existingStyle = document.getElementById('flying-objects-styles');
    if (existingStyle) return;
    
    const style = document.createElement('style');
    style.id = 'flying-objects-styles';
    style.textContent = `
      @keyframes flyCloud {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(100vw + 400px)); }
      }
      
      @keyframes flySparkle {
        0% { 
          transform: translateX(0) translateY(0);
          opacity: 0;
        }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { 
          transform: translateX(calc(100vw + 40px)) translateY(-50px);
          opacity: 0;
        }
      }
      
      @keyframes flyBird {
        0% { 
          transform: translateX(0) translateY(0) scaleX(-1);
        }
        25% { transform: translateX(25vw) translateY(-20px) scaleX(-1); }
        50% { transform: translateX(50vw) translateY(10px) scaleX(-1); }
        75% { transform: translateX(75vw) translateY(-15px) scaleX(-1); }
        100% { 
          transform: translateX(calc(100vw + 100px)) translateY(0) scaleX(-1);
        }
      }
      
      @keyframes floatCarpet {
        0%, 100% { transform: translateY(0) rotateX(0deg) rotateZ(0deg); }
        25% { transform: translateY(-8px) rotateX(2deg) rotateZ(1deg); }
        50% { transform: translateY(0) rotateX(0deg) rotateZ(-1deg); }
        75% { transform: translateY(8px) rotateX(-2deg) rotateZ(0.5deg); }
      }
      
      #video-background-container {
        transition: opacity 0.5s ease;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Load and play a video
   */
  async loadVideo(src: string): Promise<void> {
    if (!this.videoElement) return;

    this.currentVideoSrc = src;
    this.videoElement.src = src;
    this.addAnimationStyles();

    return new Promise((resolve, reject) => {
      if (!this.videoElement) {
        reject(new Error('No video element'));
        return;
      }

      this.videoElement.onloadeddata = () => {
        console.log('[VideoBackgroundSystem] Video loaded:', src);
        this.addFlyingObjects();
        resolve();
      };

      this.videoElement.onerror = (e) => {
        console.error('[VideoBackgroundSystem] Error loading video:', e);
        reject(e);
      };
    });
  }

  /**
   * Start playing the video
   */
  async play(): Promise<void> {
    if (!this.videoElement || this.isPlaying) return;

    try {
      // Try unmuted first
      await this.videoElement.play();
      this.isPlaying = true;
      console.log('[VideoBackgroundSystem] Video playing with audio');
    } catch (e) {
      console.warn('[VideoBackgroundSystem] Autoplay blocked, trying muted:', e);
      // Try muted autoplay as fallback
      this.videoElement.muted = true;
      try {
        await this.videoElement.play();
        this.isPlaying = true;
        console.log('[VideoBackgroundSystem] Video playing (muted - click to unmute)');
        
        // Show unmute hint
        this.showUnmuteHint();
      } catch (e2) {
        console.error('[VideoBackgroundSystem] Could not play video:', e2);
      }
    }
  }

  private showUnmuteHint(): void {
    const hint = document.createElement('div');
    hint.id = 'unmute-hint';
    hint.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 12px 24px;
      border-radius: 25px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      z-index: 9999;
      cursor: pointer;
      transition: opacity 0.3s;
    `;
    hint.innerHTML = '🔇 Click anywhere to enable audio';
    hint.onclick = () => {
      if (this.videoElement) {
        this.videoElement.muted = false;
      }
      hint.remove();
    };
    
    document.body.appendChild(hint);
    
    // Auto-remove after click anywhere
    const removeHint = () => {
      if (this.videoElement) {
        this.videoElement.muted = false;
      }
      hint.remove();
      document.removeEventListener('click', removeHint);
    };
    document.addEventListener('click', removeHint, { once: true });
  }

  /**
   * Pause the video
   */
  pause(): void {
    if (!this.videoElement || !this.isPlaying) return;
    this.videoElement.pause();
    this.isPlaying = false;
  }

  /**
   * Stop and reset the video
   */
  stop(): void {
    if (!this.videoElement) return;
    this.videoElement.pause();
    this.videoElement.currentTime = 0;
    this.isPlaying = false;
  }

  /**
   * Set video volume (0-1)
   */
  setVolume(volume: number): void {
    if (!this.videoElement) return;
    this.videoElement.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Mute/unmute the video
   */
  setMuted(muted: boolean): void {
    if (!this.videoElement) return;
    this.videoElement.muted = muted;
  }

  /**
   * Show/hide the video background
   */
  setVisible(visible: boolean): void {
    if (this.videoContainer) {
      this.videoContainer.style.display = visible ? 'block' : 'none';
    }
    if (this.overlayContainer) {
      this.overlayContainer.style.display = visible ? 'block' : 'none';
    }
  }

  /**
   * Check if video is currently playing
   */
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Get the current video source
   */
  getCurrentSrc(): string | null {
    return this.currentVideoSrc;
  }

  /**
   * Dispose of the video system
   */
  dispose(): void {
    this.stop();
    if (this.videoContainer?.parentNode) {
      this.videoContainer.parentNode.removeChild(this.videoContainer);
    }
    if (this.overlayContainer?.parentNode) {
      this.overlayContainer.parentNode.removeChild(this.overlayContainer);
    }
    this.videoElement = null;
    this.videoContainer = null;
    this.overlayContainer = null;
  }
}

// Singleton instance
let videoBackgroundInstance: VideoBackgroundSystem | null = null;

export function getVideoBackgroundSystem(): VideoBackgroundSystem {
  if (!videoBackgroundInstance) {
    videoBackgroundInstance = new VideoBackgroundSystem();
  }
  return videoBackgroundInstance;
}
