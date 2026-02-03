/**
 * VideoBackgroundSystem - Plays a music video behind the game board
 * The video serves as the animated background with its own audio
 */
export class VideoBackgroundSystem {
  private videoElement: HTMLVideoElement | null = null;
  private videoContainer: HTMLDivElement | null = null;
  private isPlaying = false;
  private currentVideoSrc: string | null = null;

  constructor() {
    this.createVideoElement();
  }

  private createVideoElement(): void {
    // Create container for video
    this.videoContainer = document.createElement('div');
    this.videoContainer.id = 'video-background-container';
    this.videoContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
      overflow: hidden;
      background: #000;
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
      transform: translate(-50%, -50%);
      object-fit: cover;
    `;
    this.videoElement.loop = true;
    this.videoElement.muted = false; // We want the audio!
    this.videoElement.playsInline = true;
    this.videoElement.preload = 'auto';

    this.videoContainer.appendChild(this.videoElement);
    document.body.insertBefore(this.videoContainer, document.body.firstChild);
  }

  /**
   * Load and play a video
   */
  async loadVideo(src: string): Promise<void> {
    if (!this.videoElement) return;

    this.currentVideoSrc = src;
    this.videoElement.src = src;

    return new Promise((resolve, reject) => {
      if (!this.videoElement) {
        reject(new Error('No video element'));
        return;
      }

      this.videoElement.onloadeddata = () => {
        console.log('[VideoBackgroundSystem] Video loaded:', src);
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
      await this.videoElement.play();
      this.isPlaying = true;
      console.log('[VideoBackgroundSystem] Video playing');
    } catch (e) {
      console.error('[VideoBackgroundSystem] Error playing video:', e);
      // Try muted autoplay as fallback
      this.videoElement.muted = true;
      await this.videoElement.play();
      this.isPlaying = true;
    }
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
    if (!this.videoContainer) return;
    this.videoContainer.style.display = visible ? 'block' : 'none';
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
    if (this.videoContainer && this.videoContainer.parentNode) {
      this.videoContainer.parentNode.removeChild(this.videoContainer);
    }
    this.videoElement = null;
    this.videoContainer = null;
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
