import { GameController } from '@core/GameController';
import { AudioEngine } from '@audio/AudioEngine';

// Initialize the full game with all systems
console.log('🎮 BLASTFORGE Initializing...');
console.log('✅ GameController with menus, themes, audio');
console.log('✅ Miami Beach & Ice World themes');
console.log('✅ Weather system (rain, snow, ash)');
console.log('✅ ElevenLabs audio integration ready');
console.log('✅ Touch controls for mobile');

// Wait for DOM to be ready
function init() {
  console.log('🎮 init() called');
  try {
    const game = new GameController();
    console.log('🚀 Game initialized successfully!');
    
    // Start the game loop!
    game.start();
    console.log('▶️ Game loop started!');
    
    // Expose for debugging
    (window as any).game = game;
    (window as any).audio = (game as any).audio;
    
    // Debug: Check if menu exists
    setTimeout(() => {
      const menu = document.getElementById('game-menus');
      console.log('Menu element:', menu);
      if (menu) {
        console.log('Menu children:', menu.childNodes.length);
        console.log('Menu classes:', menu.className);
      }
    }, 1000);
  } catch (error) {
    console.error('❌ Failed to initialize game:', error);
    document.body.innerHTML = `
      <div style="color: white; padding: 20px; font-family: sans-serif; background: #0a0a1a; min-height: 100vh;">
        <h1>Error Loading Game</h1>
        <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
        <pre style="background: #1a1a2e; padding: 10px; overflow: auto;">${error instanceof Error ? error.stack : ''}</pre>
      </div>
    `;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
