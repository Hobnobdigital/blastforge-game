import { MenuScreen, LEVELS, } from '@core/ExtendedTypes';
import { settingsManager } from '@core/SettingsManager';
export class MenuManager {
    container;
    _currentScreen = MenuScreen.MAIN;
    onStartGame;
    onResumeGame;
    onQuitGame;
    selectedLevel = 1;
    constructor(onStartGame, onResumeGame, onQuitGame) {
        this.onStartGame = onStartGame;
        this.onResumeGame = onResumeGame;
        this.onQuitGame = onQuitGame;
        this.container = document.createElement('div');
        this.container.id = 'game-menus';
        this.container.className = 'game-menus';
        document.body.appendChild(this.container);
        this.injectStyles();
        this.showScreen(MenuScreen.MAIN);
    }
    injectStyles() {
        if (document.getElementById('game-menu-styles'))
            return;
        const styles = document.createElement('style');
        styles.id = 'game-menu-styles';
        styles.textContent = `
      .game-menus {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        pointer-events: none;
      }
      
      .game-menus.active {
        pointer-events: auto;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(8px);
      }
      
      .menu-panel {
        background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
        border: 2px solid #0f3460;
        border-radius: 16px;
        padding: 40px;
        min-width: 320px;
        max-width: 90vw;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        animation: menuSlideIn 0.3s ease-out;
      }
      
      @keyframes menuSlideIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .menu-title {
        font-size: 2.5rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 8px;
        background: linear-gradient(90deg, #e94560, #ff6b6b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 2px 10px rgba(233, 69, 96, 0.3);
      }
      
      .menu-subtitle {
        text-align: center;
        color: #8892b0;
        margin-bottom: 30px;
        font-size: 0.9rem;
      }
      
      .menu-button {
        display: block;
        width: 100%;
        padding: 16px 24px;
        margin: 12px 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: #fff;
        background: linear-gradient(145deg, #0f3460 0%, #16213e 100%);
        border: 2px solid #1a4a7a;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: center;
      }
      
      .menu-button:hover {
        background: linear-gradient(145deg, #1a4a7a 0%, #0f3460 100%);
        border-color: #e94560;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(233, 69, 96, 0.3);
      }
      
      .menu-button:active {
        transform: translateY(0);
      }
      
      .menu-button.primary {
        background: linear-gradient(145deg, #e94560 0%, #c73e54 100%);
        border-color: #ff6b6b;
      }
      
      .menu-button.primary:hover {
        background: linear-gradient(145deg, #ff6b6b 0%, #e94560 100%);
        box-shadow: 0 8px 20px rgba(233, 69, 96, 0.5);
      }
      
      .menu-button.secondary {
        background: transparent;
        border-color: #4a5568;
      }
      
      .menu-button.secondary:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: #8892b0;
      }
      
      .menu-section {
        margin-bottom: 24px;
      }
      
      .menu-section-title {
        font-size: 1rem;
        color: #e94560;
        margin-bottom: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .setting-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .setting-label {
        color: #ccd6f6;
        font-size: 0.95rem;
      }
      
      .setting-control {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .slider {
        width: 120px;
        height: 6px;
        -webkit-appearance: none;
        appearance: none;
        background: #1a4a7a;
        border-radius: 3px;
        outline: none;
      }
      
      .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 18px;
        height: 18px;
        background: #e94560;
        border-radius: 50%;
        cursor: pointer;
      }
      
      .toggle {
        width: 50px;
        height: 26px;
        background: #1a4a7a;
        border-radius: 13px;
        position: relative;
        cursor: pointer;
        transition: background 0.3s;
      }
      
      .toggle.active {
        background: #e94560;
      }
      
      .toggle::after {
        content: '';
        position: absolute;
        width: 22px;
        height: 22px;
        background: #fff;
        border-radius: 50%;
        top: 2px;
        left: 2px;
        transition: transform 0.3s;
      }
      
      .toggle.active::after {
        transform: translateX(24px);
      }
      
      .back-button {
        margin-top: 20px;
        padding: 12px 24px;
        background: transparent;
        border: 2px solid #4a5568;
        color: #8892b0;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.95rem;
        transition: all 0.2s;
      }
      
      .back-button:hover {
        border-color: #e94560;
        color: #e94560;
      }
      
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin: 20px 0;
      }
      
      .stat-card {
        background: rgba(255, 255, 255, 0.05);
        padding: 16px;
        border-radius: 12px;
        text-align: center;
      }
      
      .stat-value {
        font-size: 2rem;
        font-weight: bold;
        color: #e94560;
      }
      
      .stat-label {
        font-size: 0.85rem;
        color: #8892b0;
        margin-top: 4px;
      }
      
      .level-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin: 20px 0;
      }
      
      .level-card {
        background: rgba(255, 255, 255, 0.05);
        padding: 16px;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;
        border: 2px solid transparent;
      }
      
      .level-card:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: #0f3460;
      }
      
      .level-card.selected {
        border-color: #e94560;
        background: rgba(233, 69, 96, 0.1);
      }
      
      .level-card.locked {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .level-number {
        font-size: 1.5rem;
        font-weight: bold;
        color: #ccd6f6;
      }
      
      .level-name {
        font-size: 0.85rem;
        color: #8892b0;
        margin-top: 4px;
      }
      
      .instructions-list {
        list-style: none;
        padding: 0;
        margin: 20px 0;
      }
      
      .instructions-list li {
        padding: 12px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        color: #ccd6f6;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .key {
        background: #0f3460;
        padding: 4px 10px;
        border-radius: 6px;
        font-family: monospace;
        font-size: 0.85rem;
        color: #e94560;
        min-width: 60px;
        text-align: center;
      }
      
      .game-over-title {
        font-size: 3rem;
        text-align: center;
        margin-bottom: 20px;
      }
      
      .game-over-title.victory {
        color: #4ade80;
        text-shadow: 0 2px 20px rgba(74, 222, 128, 0.5);
      }
      
      .game-over-title.defeat {
        color: #ef4444;
        text-shadow: 0 2px 20px rgba(239, 68, 68, 0.5);
      }
      
      .pause-overlay {
        text-align: center;
      }
      
      .pause-title {
        font-size: 3rem;
        color: #fff;
        margin-bottom: 30px;
        text-shadow: 0 2px 20px rgba(255, 255, 255, 0.3);
      }
      
      @media (max-width: 600px) {
        .menu-panel {
          padding: 24px;
          min-width: 280px;
        }
        
        .menu-title {
          font-size: 2rem;
        }
        
        .menu-button {
          padding: 14px 20px;
          font-size: 1rem;
        }
        
        .stats-grid, .level-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
        document.head.appendChild(styles);
    }
    showScreen(screen) {
        this._currentScreen = screen;
        this.container.innerHTML = '';
        this.container.className = 'game-menus active';
        switch (screen) {
            case MenuScreen.MAIN:
                this.renderMainMenu();
                break;
            case MenuScreen.SETTINGS:
                this.renderSettings();
                break;
            case MenuScreen.HOW_TO_PLAY:
                this.renderHowToPlay();
                break;
            case MenuScreen.STATS:
                this.renderStats();
                break;
            case MenuScreen.LEVEL_SELECT:
                this.renderLevelSelect();
                break;
        }
    }
    renderMainMenu() {
        const panel = document.createElement('div');
        panel.className = 'menu-panel';
        panel.innerHTML = `
      <h1 class="menu-title">BLASTFORGE</h1>
      <p class="menu-subtitle">Master the Fuse. Control the Chaos.</p>
      <button class="menu-button primary" data-action="play">▶ Play</button>
      <button class="menu-button" data-action="levels">🎮 Select Level</button>
      <button class="menu-button" data-action="stats">📊 Statistics</button>
      <button class="menu-button" data-action="settings">⚙ Settings</button>
      <button class="menu-button" data-action="help">❓ How to Play</button>
    `;
        this.bindButton(panel, '[data-action="play"]', () => this.onStartGame(this.selectedLevel));
        this.bindButton(panel, '[data-action="levels"]', () => this.showScreen(MenuScreen.LEVEL_SELECT));
        this.bindButton(panel, '[data-action="stats"]', () => this.showScreen(MenuScreen.STATS));
        this.bindButton(panel, '[data-action="settings"]', () => this.showScreen(MenuScreen.SETTINGS));
        this.bindButton(panel, '[data-action="help"]', () => this.showScreen(MenuScreen.HOW_TO_PLAY));
        this.container.appendChild(panel);
    }
    renderSettings() {
        const settings = settingsManager.getSettings();
        const panel = document.createElement('div');
        panel.className = 'menu-panel';
        panel.innerHTML = `
      <h2 class="menu-title" style="font-size: 1.8rem;">Settings</h2>
      
      <div class="menu-section">
        <div class="menu-section-title">Audio</div>
        <div class="setting-row">
          <span class="setting-label">Music Volume</span>
          <div class="setting-control">
            <input type="range" class="slider" id="music-volume" min="0" max="100" value="${Math.round(settings.musicVolume * 100)}">
            <span id="music-value">${Math.round(settings.musicVolume * 100)}%</span>
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-label">SFX Volume</span>
          <div class="setting-control">
            <input type="range" class="slider" id="sfx-volume" min="0" max="100" value="${Math.round(settings.sfxVolume * 100)}">
            <span id="sfx-value">${Math.round(settings.sfxVolume * 100)}%</span>
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-label">UI Volume</span>
          <div class="setting-control">
            <input type="range" class="slider" id="ui-volume" min="0" max="100" value="${Math.round(settings.uiVolume * 100)}">
            <span id="ui-value">${Math.round(settings.uiVolume * 100)}%</span>
          </div>
        </div>
      </div>
      
      <div class="menu-section">
        <div class="menu-section-title">Display</div>
        <div class="setting-row">
          <span class="setting-label">Fullscreen</span>
          <div class="setting-control">
            <div class="toggle ${settings.fullscreen ? 'active' : ''}" id="fullscreen-toggle"></div>
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-label">Show FPS</span>
          <div class="setting-control">
            <div class="toggle ${settings.showFPS ? 'active' : ''}" id="fps-toggle"></div>
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-label">Vibration</span>
          <div class="setting-control">
            <div class="toggle ${settings.vibration ? 'active' : ''}" id="vibration-toggle"></div>
          </div>
        </div>
      </div>
      
      <button class="back-button" data-action="back">← Back</button>
    `;
        // Bind sliders
        const musicSlider = panel.querySelector('#music-volume');
        const musicValue = panel.querySelector('#music-value');
        musicSlider?.addEventListener('input', () => {
            musicValue.textContent = `${musicSlider.value}%`;
            settingsManager.setMusicVolume(parseInt(musicSlider.value) / 100);
        });
        const sfxSlider = panel.querySelector('#sfx-volume');
        const sfxValue = panel.querySelector('#sfx-value');
        sfxSlider?.addEventListener('input', () => {
            sfxValue.textContent = `${sfxSlider.value}%`;
            settingsManager.setSfxVolume(parseInt(sfxSlider.value) / 100);
        });
        const uiSlider = panel.querySelector('#ui-volume');
        const uiValue = panel.querySelector('#ui-value');
        uiSlider?.addEventListener('input', () => {
            uiValue.textContent = `${uiSlider.value}%`;
            settingsManager.setUiVolume(parseInt(uiSlider.value) / 100);
        });
        // Bind toggles
        this.bindToggle(panel, '#fullscreen-toggle', () => {
            const s = settingsManager.getSettings();
            settingsManager.setFullscreen(!s.fullscreen);
        });
        this.bindToggle(panel, '#fps-toggle', () => {
            const s = settingsManager.getSettings();
            settingsManager.setShowFPS(!s.showFPS);
        });
        this.bindToggle(panel, '#vibration-toggle', () => {
            const s = settingsManager.getSettings();
            settingsManager.setVibration(!s.vibration);
        });
        this.bindButton(panel, '[data-action="back"]', () => this.showScreen(MenuScreen.MAIN));
        this.container.appendChild(panel);
    }
    renderHowToPlay() {
        const panel = document.createElement('div');
        panel.className = 'menu-panel';
        panel.innerHTML = `
      <h2 class="menu-title" style="font-size: 1.8rem;">How to Play</h2>
      
      <div class="menu-section">
        <div class="menu-section-title">Movement</div>
        <ul class="instructions-list">
          <li><span class="key">WASD</span> Move your character</li>
          <li><span class="key">Arrows</span> Alternative movement</li>
        </ul>
      </div>
      
      <div class="menu-section">
        <div class="menu-section-title">Actions</div>
        <ul class="instructions-list">
          <li><span class="key">SPACE</span> Place bomb</li>
          <li><span class="key">Q</span> Prime bomb (fuse)</li>
          <li><span class="key">E</span> Rush bomb (fast fuse)</li>
          <li><span class="key">R</span> Detonate (remote)</li>
          <li><span class="key">P</span> Pause game</li>
        </ul>
      </div>
      
      <div class="menu-section">
        <div class="menu-section-title">Objective</div>
        <p style="color: #ccd6f6; line-height: 1.6;">
          Destroy soft blocks to clear paths and find power-ups. 
          Eliminate all enemies or be the last one standing to win!
          Watch out for your own bombs - the explosion hurts you too.
        </p>
      </div>
      
      <button class="back-button" data-action="back">← Back</button>
    `;
        this.bindButton(panel, '[data-action="back"]', () => this.showScreen(MenuScreen.MAIN));
        this.container.appendChild(panel);
    }
    renderStats() {
        const stats = settingsManager.getStats();
        const panel = document.createElement('div');
        panel.className = 'menu-panel';
        panel.innerHTML = `
      <h2 class="menu-title" style="font-size: 1.8rem;">Statistics</h2>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${stats.totalWins}</div>
          <div class="stat-label">Wins</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${stats.totalLosses}</div>
          <div class="stat-label">Losses</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${this.formatTime(stats.totalPlayTime)}</div>
          <div class="stat-label">Play Time</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${stats.bombsPlaced}</div>
          <div class="stat-label">Bombs Placed</div>
        </div>
      </div>
      
      <div class="menu-section">
        <div class="menu-section-title">Level Progress</div>
        <p style="color: #ccd6f6;">
          Levels Completed: ${stats.levelsCompleted.length} / ${LEVELS.length}
        </p>
      </div>
      
      <button class="menu-button secondary" data-action="reset" style="margin-top: 10px;">
        Reset All Stats
      </button>
      <button class="back-button" data-action="back">← Back</button>
    `;
        this.bindButton(panel, '[data-action="reset"]', () => {
            if (confirm('Are you sure you want to reset all statistics?')) {
                settingsManager.resetStats();
                this.renderStats();
            }
        });
        this.bindButton(panel, '[data-action="back"]', () => this.showScreen(MenuScreen.MAIN));
        this.container.appendChild(panel);
    }
    renderLevelSelect() {
        const stats = settingsManager.getStats();
        const panel = document.createElement('div');
        panel.className = 'menu-panel';
        let levelsHtml = '<div class="level-grid">';
        LEVELS.forEach((level, index) => {
            const isUnlocked = index === 0 || stats.levelsCompleted.includes(level.id - 1);
            const isCompleted = stats.levelsCompleted.includes(level.id);
            const isSelected = level.id === this.selectedLevel;
            levelsHtml += `
        <div class="level-card ${isSelected ? 'selected' : ''} ${!isUnlocked ? 'locked' : ''}" 
             data-level="${level.id}">
          <div class="level-number">Level ${level.id}</div>
          <div class="level-name">${level.name}</div>
          ${isCompleted ? '✓ Completed' : ''}
          ${!isUnlocked ? '🔒 Locked' : ''}
        </div>
      `;
        });
        levelsHtml += '</div>';
        panel.innerHTML = `
      <h2 class="menu-title" style="font-size: 1.8rem;">Select Level</h2>
      <p class="menu-subtitle">Complete levels to unlock more</p>
      ${levelsHtml}
      <button class="menu-button primary" data-action="start">Start Level</button>
      <button class="back-button" data-action="back">← Back</button>
    `;
        // Bind level selection
        panel.querySelectorAll('.level-card').forEach(card => {
            card.addEventListener('click', () => {
                const levelId = parseInt(card.getAttribute('data-level') || '1');
                const levelIndex = levelId - 1;
                const isUnlocked = levelIndex === 0 || stats.levelsCompleted.includes(levelId - 1);
                if (isUnlocked) {
                    this.selectedLevel = levelId;
                    // Update visual selection
                    panel.querySelectorAll('.level-card').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                }
            });
        });
        this.bindButton(panel, '[data-action="start"]', () => this.onStartGame(this.selectedLevel));
        this.bindButton(panel, '[data-action="back"]', () => this.showScreen(MenuScreen.MAIN));
        this.container.appendChild(panel);
    }
    showPauseMenu() {
        this.container.innerHTML = '';
        this.container.className = 'game-menus active';
        const panel = document.createElement('div');
        panel.className = 'menu-panel pause-overlay';
        panel.innerHTML = `
      <h2 class="pause-title">PAUSED</h2>
      <button class="menu-button primary" data-action="resume">▶ Resume</button>
      <button class="menu-button" data-action="restart">↻ Restart Level</button>
      <button class="menu-button" data-action="quit">✕ Quit to Menu</button>
    `;
        this.bindButton(panel, '[data-action="resume"]', () => this.onResumeGame());
        this.bindButton(panel, '[data-action="restart"]', () => this.onStartGame(this.selectedLevel));
        this.bindButton(panel, '[data-action="quit"]', () => this.onQuitGame());
        this.container.appendChild(panel);
    }
    showGameOver(victory, stats) {
        this.container.innerHTML = '';
        this.container.className = 'game-menus active';
        const panel = document.createElement('div');
        panel.className = 'menu-panel';
        const title = victory ? 'VICTORY!' : 'GAME OVER';
        const titleClass = victory ? 'victory' : 'defeat';
        let statsHtml = '';
        if (stats) {
            statsHtml = `
        <div class="stats-grid" style="margin: 20px 0;">
          <div class="stat-card">
            <div class="stat-value">${this.formatTime(stats.time)}</div>
            <div class="stat-label">Time</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${stats.bombs}</div>
            <div class="stat-label">Bombs</div>
          </div>
        </div>
      `;
        }
        panel.innerHTML = `
      <h2 class="game-over-title ${titleClass}">${title}</h2>
      ${statsHtml}
      <button class="menu-button primary" data-action="next">
        ${victory ? 'Next Level →' : 'Try Again ↻'}
      </button>
      <button class="menu-button" data-action="menu">Main Menu</button>
    `;
        this.bindButton(panel, '[data-action="next"]', () => {
            if (victory) {
                // Progress to next level or stay on current if last
                const nextLevel = this.selectedLevel + 1;
                if (nextLevel <= LEVELS.length) {
                    this.selectedLevel = nextLevel;
                }
            }
            this.onStartGame(this.selectedLevel);
        });
        this.bindButton(panel, '[data-action="menu"]', () => this.showScreen(MenuScreen.MAIN));
        this.container.appendChild(panel);
    }
    hide() {
        this.container.innerHTML = '';
        this.container.className = 'game-menus';
    }
    bindButton(parent, selector, callback) {
        const btn = parent.querySelector(selector);
        if (btn) {
            btn.addEventListener('click', callback);
        }
    }
    bindToggle(parent, selector, callback) {
        const toggle = parent.querySelector(selector);
        if (toggle) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                callback();
            });
        }
    }
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    }
}
//# sourceMappingURL=MenuManager.js.map