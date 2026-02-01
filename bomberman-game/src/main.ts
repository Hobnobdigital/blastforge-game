import { GameController } from '@core/GameController';

// ── Bootstrap ──
const game = new GameController();
game.start();

// Expose for debugging (optional)
(window as any).blastforge = game;
