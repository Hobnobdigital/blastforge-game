import{B as O,V as I,G as R,M as x,a as me,D as oe,S as T,b as m,T as K,c as E,d as ne,C as z,e as W,P as re,O as Y,A as C,f as X,g as le,R as ue,I as k,h as N,i as pe,j as fe,k as ge,W as be,l as ye,m as we,n as ve}from"./three-Cb7PQvd6.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const c=16,D=1,ce=60,F=1/ce;var b=(a=>(a[a.Floor=0]="Floor",a[a.HardBlock=1]="HardBlock",a[a.SoftBlock=2]="SoftBlock",a))(b||{}),w=(a=>(a[a.None=0]="None",a[a.Up=1]="Up",a[a.Down=2]="Down",a[a.Left=3]="Left",a[a.Right=4]="Right",a))(w||{}),A=(a=>(a.BombRange="bomb_range",a.BombCount="bomb_count",a.Speed="speed",a.FuseCharge="fuse_charge",a))(A||{}),u=(a=>(a.MENU="menu",a.PLAYING="playing",a.PAUSED="paused",a.VICTORY="victory",a.DEFEAT="defeat",a.LEVEL_TRANSITION="level_transition",a))(u||{}),p=(a=>(a.MAIN="main",a.SETTINGS="settings",a.HOW_TO_PLAY="how_to_play",a.STATS="stats",a.LEVEL_SELECT="level_select",a))(p||{}),f=(a=>(a.CLASSIC="classic",a.ICE="ice",a.VOLCANO="volcano",a.FOREST="forest",a.DESERT="desert",a.SPACE="space",a.MIAMI_BEACH="miami_beach",a))(f||{});const L=[{id:1,name:"Training Grounds",theme:"classic",description:"Learn the basics",softBlockDensity:.4,enemyCount:0},{id:2,name:"Ice Caverns",theme:"ice",description:"Slippery surfaces",softBlockDensity:.45,enemyCount:2},{id:3,name:"Volcano Core",theme:"volcano",description:"Watch your step",softBlockDensity:.5,enemyCount:3},{id:4,name:"Enchanted Forest",theme:"forest",description:"Nature's maze",softBlockDensity:.55,enemyCount:4},{id:5,name:"Desert Ruins",theme:"desert",description:"Ancient dangers",softBlockDensity:.5,enemyCount:5},{id:6,name:"Space Station",theme:"space",description:"Zero gravity chaos",softBlockDensity:.6,enemyCount:6},{id:7,name:"Miami Beach",theme:"miami_beach",description:"Sunset vibes and neon lights",softBlockDensity:.5,enemyCount:5}],Z={musicVolume:.7,sfxVolume:1,uiVolume:.8,fullscreen:!1,showFPS:!0,vibration:!0},V={totalWins:0,totalLosses:0,totalPlayTime:0,levelsCompleted:[],bestTimes:{},bombsPlaced:0,powerUpsCollected:0,enemiesDefeated:0,gamesStarted:0};var B=(a=>(a.BASIC="basic",a.FAST="fast",a.SMART="smart",a.TANK="tank",a))(B||{});const J="blastforge_settings",Q="blastforge_stats";class Me{settings;stats;constructor(){this.settings=this.loadSettings(),this.stats=this.loadStats()}loadSettings(){try{const e=localStorage.getItem(J);if(e){const t=JSON.parse(e);return{...Z,...t}}}catch(e){console.warn("Failed to load settings:",e)}return{...Z}}saveSettings(){try{localStorage.setItem(J,JSON.stringify(this.settings))}catch(e){console.warn("Failed to save settings:",e)}}getSettings(){return{...this.settings}}updateSettings(e){this.settings={...this.settings,...e},this.saveSettings()}setMusicVolume(e){this.settings.musicVolume=Math.max(0,Math.min(1,e)),this.saveSettings()}setSfxVolume(e){this.settings.sfxVolume=Math.max(0,Math.min(1,e)),this.saveSettings()}setUiVolume(e){this.settings.uiVolume=Math.max(0,Math.min(1,e)),this.saveSettings()}setFullscreen(e){this.settings.fullscreen=e,this.saveSettings(),e?document.documentElement.requestFullscreen?.().catch(()=>{}):document.exitFullscreen?.().catch(()=>{})}setShowFPS(e){this.settings.showFPS=e,this.saveSettings()}setVibration(e){this.settings.vibration=e,this.saveSettings()}loadStats(){try{const e=localStorage.getItem(Q);if(e){const t=JSON.parse(e);return{...V,...t}}}catch(e){console.warn("Failed to load stats:",e)}return{...V}}saveStats(){try{localStorage.setItem(Q,JSON.stringify(this.stats))}catch(e){console.warn("Failed to save stats:",e)}}getStats(){return{...this.stats}}recordWin(e,t){this.stats.totalWins++,this.stats.levelsCompleted.includes(e)||this.stats.levelsCompleted.push(e);const s=this.stats.bestTimes[e];(!s||t<s)&&(this.stats.bestTimes[e]=t),this.saveStats()}recordLoss(){this.stats.totalLosses++,this.saveStats()}addPlayTime(e){this.stats.totalPlayTime+=e,this.saveStats()}incrementBombsPlaced(){this.stats.bombsPlaced++,this.saveStats()}incrementPowerUpsCollected(){this.stats.powerUpsCollected++,this.saveStats()}incrementEnemiesDefeated(){this.stats.enemiesDefeated++,this.saveStats()}incrementGamesStarted(){this.stats.gamesStarted++,this.saveStats()}resetStats(){this.stats={...V},this.saveStats()}vibrate(e){this.settings.vibration&&navigator.vibrate&&navigator.vibrate(e)}}const d=new Me;function he(){const a=Se(),e=[xe(0,{col:1,row:1})];return{tick:0,grid:a,players:e,bombs:[],explosions:[],powerUps:[]}}function Se(){const a=[];for(let t=0;t<c;t++){a[t]=[];for(let s=0;s<c;s++)t===0||t===c-1||s===0||s===c-1||t%2===0&&s%2===0?a[t][s]=b.HardBlock:a[t][s]=b.Floor}const e=new Set(["1,1","1,2","2,1",`${c-2},${c-2}`,`${c-2},${c-3}`,`${c-3},${c-2}`,`1,${c-2}`,`1,${c-3}`,`2,${c-2}`,`${c-2},1`,`${c-3},1`,`${c-2},2`]);for(let t=1;t<c-1;t++)for(let s=1;s<c-1;s++)a[t][s]===b.Floor&&!e.has(`${s},${t}`)&&Math.random()<.4&&(a[t][s]=b.SoftBlock);return a}function xe(a,e){return{id:a,gridPos:{...e},worldPos:{x:e.col,y:e.row},moveDir:w.None,speed:3.5,bombRange:2,maxBombs:1,activeBombs:0,fuseCharges:3,alive:!0}}class ke{currentLevelIndex=0;getCurrentLevel(){return L[this.currentLevelIndex]??L[0]}getAllLevels(){return[...L]}setLevel(e){this.currentLevelIndex=Math.max(0,Math.min(L.length-1,e))}canProgressToLevel(e,t){return e===1?!0:t.includes(e-1)}getNextLevel(){return L[this.currentLevelIndex+1]??null}progressToNext(){return this.currentLevelIndex<L.length-1?(this.currentLevelIndex++,!0):!1}createLevelState(e){const t=he();return this.applyLevelTheme(t,e),this.spawnEnemies(t,e),t}applyLevelTheme(e,t){const s=new Set(["1,1","1,2","2,1",`${c-2},${c-2}`,`${c-2},${c-3}`,`${c-3},${c-2}`,`1,${c-2}`,`1,${c-3}`,`2,${c-2}`,`${c-2},1`,`${c-3},1`,`${c-2},2`]);for(let i=1;i<c-1;i++)for(let o=1;o<c-1;o++)e.grid[i][o]===b.SoftBlock&&(e.grid[i][o]=b.Floor),e.grid[i][o]===b.Floor&&!s.has(`${o},${i}`)&&Math.random()<t.softBlockDensity&&(e.grid[i][o]=b.SoftBlock);switch(t.theme){case f.ICE:break;case f.VOLCANO:break;case f.FOREST:break;case f.MIAMI_BEACH:break}}spawnEnemies(e,t){const s=[{col:c-2,row:c-2},{col:1,row:c-2},{col:c-2,row:1},{col:7,row:7},{col:8,row:8},{col:7,row:8}];for(let i=0;i<t.enemyCount&&i<s.length;i++){const o=s[i];e.grid[o.row][o.col]=b.Floor;const n=Pe(i,o.col,o.row,this.getEnemyTypeForLevel(t.id));e.enemies=e.enemies||[],e.enemies.push(n)}}getEnemyTypeForLevel(e){return e>=5?B.SMART:e>=3?B.FAST:B.BASIC}getThemeColors(e){switch(e){case f.ICE:return{background:662058,floor:2771562,accent:8965375};case f.VOLCANO:return{background:1706506,floor:4860458,accent:16737860};case f.FOREST:return{background:662026,floor:2771498,accent:6750088};case f.DESERT:return{background:1710602,floor:6969914,accent:16764006};case f.SPACE:return{background:328976,floor:2763338,accent:11176191};case f.MIAMI_BEACH:return{background:16739229,floor:15255951,accent:4251856};case f.CLASSIC:default:return{background:657930,floor:2763306,accent:43775}}}}function Pe(a,e,t,s){const i={[B.BASIC]:2,[B.FAST]:3.5,[B.SMART]:2.5,[B.TANK]:1.5};return{id:a,gridPos:{col:e,row:t},worldPos:{x:e,y:t},moveDir:w.None,speed:i[s],alive:!0,type:s,aiState:"wander"}}const H=new ke;class Ee{container;_currentScreen=p.MAIN;onStartGame;onResumeGame;onQuitGame;selectedLevel=1;constructor(e,t,s){this.onStartGame=e,this.onResumeGame=t,this.onQuitGame=s,this.container=document.createElement("div"),this.container.id="game-menus",this.container.className="game-menus",document.body.appendChild(this.container),this.injectStyles(),this.showScreen(p.MAIN)}injectStyles(){if(document.getElementById("game-menu-styles"))return;const e=document.createElement("style");e.id="game-menu-styles",e.textContent=`
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
    `,document.head.appendChild(e)}showScreen(e){switch(this._currentScreen=e,this.container.innerHTML="",this.container.className="game-menus active",e){case p.MAIN:this.renderMainMenu();break;case p.SETTINGS:this.renderSettings();break;case p.HOW_TO_PLAY:this.renderHowToPlay();break;case p.STATS:this.renderStats();break;case p.LEVEL_SELECT:this.renderLevelSelect();break}}renderMainMenu(){const e=document.createElement("div");e.className="menu-panel",e.innerHTML=`
      <h1 class="menu-title">BLASTFORGE</h1>
      <p class="menu-subtitle">Master the Fuse. Control the Chaos.</p>
      <button class="menu-button primary" data-action="play">▶ Play</button>
      <button class="menu-button" data-action="levels">🎮 Select Level</button>
      <button class="menu-button" data-action="stats">📊 Statistics</button>
      <button class="menu-button" data-action="settings">⚙ Settings</button>
      <button class="menu-button" data-action="help">❓ How to Play</button>
    `,this.bindButton(e,'[data-action="play"]',()=>this.onStartGame(this.selectedLevel)),this.bindButton(e,'[data-action="levels"]',()=>this.showScreen(p.LEVEL_SELECT)),this.bindButton(e,'[data-action="stats"]',()=>this.showScreen(p.STATS)),this.bindButton(e,'[data-action="settings"]',()=>this.showScreen(p.SETTINGS)),this.bindButton(e,'[data-action="help"]',()=>this.showScreen(p.HOW_TO_PLAY)),this.container.appendChild(e)}renderSettings(){const e=d.getSettings(),t=document.createElement("div");t.className="menu-panel",t.innerHTML=`
      <h2 class="menu-title" style="font-size: 1.8rem;">Settings</h2>
      
      <div class="menu-section">
        <div class="menu-section-title">Audio</div>
        <div class="setting-row">
          <span class="setting-label">Music Volume</span>
          <div class="setting-control">
            <input type="range" class="slider" id="music-volume" min="0" max="100" value="${Math.round(e.musicVolume*100)}">
            <span id="music-value">${Math.round(e.musicVolume*100)}%</span>
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-label">SFX Volume</span>
          <div class="setting-control">
            <input type="range" class="slider" id="sfx-volume" min="0" max="100" value="${Math.round(e.sfxVolume*100)}">
            <span id="sfx-value">${Math.round(e.sfxVolume*100)}%</span>
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-label">UI Volume</span>
          <div class="setting-control">
            <input type="range" class="slider" id="ui-volume" min="0" max="100" value="${Math.round(e.uiVolume*100)}">
            <span id="ui-value">${Math.round(e.uiVolume*100)}%</span>
          </div>
        </div>
      </div>
      
      <div class="menu-section">
        <div class="menu-section-title">Display</div>
        <div class="setting-row">
          <span class="setting-label">Fullscreen</span>
          <div class="setting-control">
            <div class="toggle ${e.fullscreen?"active":""}" id="fullscreen-toggle"></div>
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-label">Show FPS</span>
          <div class="setting-control">
            <div class="toggle ${e.showFPS?"active":""}" id="fps-toggle"></div>
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-label">Vibration</span>
          <div class="setting-control">
            <div class="toggle ${e.vibration?"active":""}" id="vibration-toggle"></div>
          </div>
        </div>
      </div>
      
      <button class="back-button" data-action="back">← Back</button>
    `;const s=t.querySelector("#music-volume"),i=t.querySelector("#music-value");s?.addEventListener("input",()=>{i.textContent=`${s.value}%`,d.setMusicVolume(parseInt(s.value)/100)});const o=t.querySelector("#sfx-volume"),n=t.querySelector("#sfx-value");o?.addEventListener("input",()=>{n.textContent=`${o.value}%`,d.setSfxVolume(parseInt(o.value)/100)});const r=t.querySelector("#ui-volume"),l=t.querySelector("#ui-value");r?.addEventListener("input",()=>{l.textContent=`${r.value}%`,d.setUiVolume(parseInt(r.value)/100)}),this.bindToggle(t,"#fullscreen-toggle",()=>{const h=d.getSettings();d.setFullscreen(!h.fullscreen)}),this.bindToggle(t,"#fps-toggle",()=>{const h=d.getSettings();d.setShowFPS(!h.showFPS)}),this.bindToggle(t,"#vibration-toggle",()=>{const h=d.getSettings();d.setVibration(!h.vibration)}),this.bindButton(t,'[data-action="back"]',()=>this.showScreen(p.MAIN)),this.container.appendChild(t)}renderHowToPlay(){const e=document.createElement("div");e.className="menu-panel",e.innerHTML=`
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
    `,this.bindButton(e,'[data-action="back"]',()=>this.showScreen(p.MAIN)),this.container.appendChild(e)}renderStats(){const e=d.getStats(),t=document.createElement("div");t.className="menu-panel",t.innerHTML=`
      <h2 class="menu-title" style="font-size: 1.8rem;">Statistics</h2>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${e.totalWins}</div>
          <div class="stat-label">Wins</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${e.totalLosses}</div>
          <div class="stat-label">Losses</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${this.formatTime(e.totalPlayTime)}</div>
          <div class="stat-label">Play Time</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${e.bombsPlaced}</div>
          <div class="stat-label">Bombs Placed</div>
        </div>
      </div>
      
      <div class="menu-section">
        <div class="menu-section-title">Level Progress</div>
        <p style="color: #ccd6f6;">
          Levels Completed: ${e.levelsCompleted.length} / ${L.length}
        </p>
      </div>
      
      <button class="menu-button secondary" data-action="reset" style="margin-top: 10px;">
        Reset All Stats
      </button>
      <button class="back-button" data-action="back">← Back</button>
    `,this.bindButton(t,'[data-action="reset"]',()=>{confirm("Are you sure you want to reset all statistics?")&&(d.resetStats(),this.renderStats())}),this.bindButton(t,'[data-action="back"]',()=>this.showScreen(p.MAIN)),this.container.appendChild(t)}renderLevelSelect(){const e=d.getStats(),t=document.createElement("div");t.className="menu-panel";let s='<div class="level-grid">';L.forEach((i,o)=>{const n=o===0||e.levelsCompleted.includes(i.id-1),r=e.levelsCompleted.includes(i.id),l=i.id===this.selectedLevel;s+=`
        <div class="level-card ${l?"selected":""} ${n?"":"locked"}" 
             data-level="${i.id}">
          <div class="level-number">Level ${i.id}</div>
          <div class="level-name">${i.name}</div>
          ${r?"✓ Completed":""}
          ${n?"":"🔒 Locked"}
        </div>
      `}),s+="</div>",t.innerHTML=`
      <h2 class="menu-title" style="font-size: 1.8rem;">Select Level</h2>
      <p class="menu-subtitle">Complete levels to unlock more</p>
      ${s}
      <button class="menu-button primary" data-action="start">Start Level</button>
      <button class="back-button" data-action="back">← Back</button>
    `,t.querySelectorAll(".level-card").forEach(i=>{i.addEventListener("click",()=>{const o=parseInt(i.getAttribute("data-level")||"1");(o-1===0||e.levelsCompleted.includes(o-1))&&(this.selectedLevel=o,t.querySelectorAll(".level-card").forEach(l=>l.classList.remove("selected")),i.classList.add("selected"))})}),this.bindButton(t,'[data-action="start"]',()=>this.onStartGame(this.selectedLevel)),this.bindButton(t,'[data-action="back"]',()=>this.showScreen(p.MAIN)),this.container.appendChild(t)}showPauseMenu(){this.container.innerHTML="",this.container.className="game-menus active";const e=document.createElement("div");e.className="menu-panel pause-overlay",e.innerHTML=`
      <h2 class="pause-title">PAUSED</h2>
      <button class="menu-button primary" data-action="resume">▶ Resume</button>
      <button class="menu-button" data-action="restart">↻ Restart Level</button>
      <button class="menu-button" data-action="quit">✕ Quit to Menu</button>
    `,this.bindButton(e,'[data-action="resume"]',()=>this.onResumeGame()),this.bindButton(e,'[data-action="restart"]',()=>this.onStartGame(this.selectedLevel)),this.bindButton(e,'[data-action="quit"]',()=>this.onQuitGame()),this.container.appendChild(e)}showGameOver(e,t){this.container.innerHTML="",this.container.className="game-menus active";const s=document.createElement("div");s.className="menu-panel";const i=e?"VICTORY!":"GAME OVER",o=e?"victory":"defeat";let n="";t&&(n=`
        <div class="stats-grid" style="margin: 20px 0;">
          <div class="stat-card">
            <div class="stat-value">${this.formatTime(t.time)}</div>
            <div class="stat-label">Time</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${t.bombs}</div>
            <div class="stat-label">Bombs</div>
          </div>
        </div>
      `),s.innerHTML=`
      <h2 class="game-over-title ${o}">${i}</h2>
      ${n}
      <button class="menu-button primary" data-action="next">
        ${e?"Next Level →":"Try Again ↻"}
      </button>
      <button class="menu-button" data-action="menu">Main Menu</button>
    `,this.bindButton(s,'[data-action="next"]',()=>{if(e){const r=this.selectedLevel+1;r<=L.length&&(this.selectedLevel=r)}this.onStartGame(this.selectedLevel)}),this.bindButton(s,'[data-action="menu"]',()=>this.showScreen(p.MAIN)),this.container.appendChild(s)}hide(){this.container.innerHTML="",this.container.className="game-menus"}bindButton(e,t,s){const i=e.querySelector(t);i&&i.addEventListener("click",s)}bindToggle(e,t,s){const i=e.querySelector(t);i&&i.addEventListener("click",()=>{i.classList.toggle("active"),s()})}formatTime(e){const t=Math.floor(e/3600),s=Math.floor(e%3600/60);return t>0?`${t}h ${s}m`:`${s}m`}}class Le{keys=new Set;bombPressed=!1;pausePressed=!1;anyKeyPressed=!1;pauseCallback=null;constructor(){window.addEventListener("keydown",e=>{this.keys.add(e.code),e.code==="Space"&&(this.bombPressed=!0),(e.code==="Escape"||e.code==="KeyP")&&(this.pausePressed=!0,this.pauseCallback?.()),this.anyKeyPressed=!0,e.preventDefault()}),window.addEventListener("keyup",e=>{this.keys.delete(e.code)})}setPauseCallback(e){this.pauseCallback=e}poll(){const e=this.getDirection();let t=w.None;return e.x<0?t=w.Left:e.x>0?t=w.Right:e.y<0?t=w.Up:e.y>0&&(t=w.Down),{moveDir:t,placeBomb:this.consumeBomb(),fuseAction:null,pause:this.consumePause(),menuBack:this.keys.has("Escape"),menuSelect:this.keys.has("Enter")||this.keys.has("Space"),menuUp:this.keys.has("ArrowUp")||this.keys.has("KeyW"),menuDown:this.keys.has("ArrowDown")||this.keys.has("KeyS"),menuLeft:this.keys.has("ArrowLeft")||this.keys.has("KeyA"),menuRight:this.keys.has("ArrowRight")||this.keys.has("KeyD")}}getDirection(){let e=0,t=0;return(this.keys.has("ArrowLeft")||this.keys.has("KeyA"))&&(e-=1),(this.keys.has("ArrowRight")||this.keys.has("KeyD"))&&(e+=1),(this.keys.has("ArrowUp")||this.keys.has("KeyW"))&&(t-=1),(this.keys.has("ArrowDown")||this.keys.has("KeyS"))&&(t+=1),{x:e,y:t}}consumeBomb(){return this.bombPressed?(this.bombPressed=!1,!0):!1}consumePause(){return this.pausePressed?(this.pausePressed=!1,!0):!1}consumeAnyKey(){return this.anyKeyPressed?(this.anyKeyPressed=!1,!0):!1}}class Ae{ctx=null;masterGain;musicGain;sfxGain;uiGain;constructor(){}ensureContext(){return this.ctx||(this.ctx=new AudioContext,this.masterGain=this.ctx.createGain(),this.musicGain=this.ctx.createGain(),this.sfxGain=this.ctx.createGain(),this.uiGain=this.ctx.createGain(),this.musicGain.connect(this.masterGain),this.sfxGain.connect(this.masterGain),this.uiGain.connect(this.masterGain),this.masterGain.connect(this.ctx.destination)),this.ctx.state==="suspended"&&this.ctx.resume(),this.ctx}setMusicVolume(e){this.ensureContext(),this.musicGain.gain.value=e}setSfxVolume(e){this.ensureContext(),this.sfxGain.gain.value=e}setUiVolume(e){this.ensureContext(),this.uiGain.gain.value=e}playSfx(e=440,t=.1){const s=this.ensureContext(),i=s.createOscillator();i.frequency.value=e,i.type="square",i.connect(this.sfxGain),i.start(),i.stop(s.currentTime+t)}playExplosion(){this.playSfx(80,.3)}playBombPlace(){this.playSfx(200,.05)}playPowerUp(){this.playSfx(880,.15)}}const G=new I;function S(a,e,t,s,i,o){const n=2*Math.PI*i/4,r=Math.max(o-2*i,0),l=Math.PI/4;G.copy(e),G[s]=0,G.normalize();const h=.5*n/(n+r),y=1-G.angleTo(a)/l;return Math.sign(G[t])===1?y*h:r/(n+r)+h+h*(1-y)}class Ie extends O{constructor(e=1,t=1,s=1,i=2,o=.1){if(i=i*2+1,o=Math.min(e/2,t/2,s/2,o),super(1,1,1,i,i,i),i===1)return;const n=this.toNonIndexed();this.index=null,this.attributes.position=n.attributes.position,this.attributes.normal=n.attributes.normal,this.attributes.uv=n.attributes.uv;const r=new I,l=new I,h=new I(e,t,s).divideScalar(2).subScalar(o),y=this.attributes.position.array,U=this.attributes.normal.array,M=this.attributes.uv.array,de=y.length/6,g=new I,$=.5/i;for(let P=0,v=0;P<y.length;P+=3,v+=2)switch(r.fromArray(y,P),l.copy(r),l.x-=Math.sign(l.x)*$,l.y-=Math.sign(l.y)*$,l.z-=Math.sign(l.z)*$,l.normalize(),y[P+0]=h.x*Math.sign(r.x)+l.x*o,y[P+1]=h.y*Math.sign(r.y)+l.y*o,y[P+2]=h.z*Math.sign(r.z)+l.z*o,U[P+0]=l.x,U[P+1]=l.y,U[P+2]=l.z,Math.floor(P/de)){case 0:g.set(1,0,0),M[v+0]=S(g,l,"z","y",o,s),M[v+1]=1-S(g,l,"y","z",o,t);break;case 1:g.set(-1,0,0),M[v+0]=1-S(g,l,"z","y",o,s),M[v+1]=1-S(g,l,"y","z",o,t);break;case 2:g.set(0,1,0),M[v+0]=1-S(g,l,"x","z",o,e),M[v+1]=S(g,l,"z","x",o,s);break;case 3:g.set(0,-1,0),M[v+0]=1-S(g,l,"x","z",o,e),M[v+1]=1-S(g,l,"z","x",o,s);break;case 4:g.set(0,0,1),M[v+0]=1-S(g,l,"x","y",o,e),M[v+1]=1-S(g,l,"y","x",o,t);break;case 5:g.set(0,0,-1),M[v+0]=S(g,l,"x","y",o,e),M[v+1]=1-S(g,l,"y","x",o,t);break}}}var _=(a=>(a.IDLE="idle",a.WALK="walk",a.DEATH="death",a.PLACE_BOMB="place_bomb",a.VICTORY="victory",a))(_||{});const ee=[{suit:16119285,accent:16739125,glass:16766720},{suit:15263976,accent:54527,glass:8900331},{suit:16777215,accent:16724838,glass:16738740},{suit:15790320,accent:65416,glass:10025880},{suit:14737632,accent:11167487,glass:14524637},{suit:16777215,accent:16755200,glass:16766720},{suit:16119285,accent:16729156,glass:16739179},{suit:15263976,accent:4491519,glass:8900346}];class Be{root;helmet;helmetRim;body;backpack;leftArm;rightArm;leftLeg;rightLeg;jetpackFlame;jetpackParticles;suitMaterial;accentMaterial;glassMaterial;backpackMaterial;animationState="idle";animationTime=0;deathProgress=0;isDead=!1;config;baseScale=.6;HELMET_RADIUS=.45;BODY_RADIUS=.22;BODY_HEIGHT=.35;LIMB_RADIUS=.08;LIMB_LENGTH=.28;constructor(e={}){const t=ee[e.playerId??0%ee.length];this.config={suitColor:e.suitColor??t.suit,accentColor:e.accentColor??t.accent,glassTint:e.glassTint??t.glass,scale:e.scale??1,playerId:e.playerId??0},this.root=new R,this.root.scale.setScalar(this.config.scale*this.baseScale),this.createMaterials(),this.createGeometry(),this.setupShadows()}createMaterials(){this.suitMaterial=new x({color:this.config.suitColor,roughness:.6,metalness:.1,bumpScale:.02}),this.accentMaterial=new x({color:this.config.accentColor,roughness:.3,metalness:.4,emissive:this.config.accentColor,emissiveIntensity:.1}),this.glassMaterial=new me({color:this.config.glassTint,metalness:.1,roughness:.05,transmission:.95,thickness:.5,ior:1.5,clearcoat:1,clearcoatRoughness:.05,envMapIntensity:1.5,transparent:!0,opacity:.3,side:oe}),this.backpackMaterial=new x({color:3355443,roughness:.5,metalness:.6})}createGeometry(){this.createHelmet(),this.createBody(),this.createArms(),this.createLegs(),this.createBackpack()}createHelmet(){const e=new R;e.position.y=this.BODY_HEIGHT*.5+this.HELMET_RADIUS*.6;const t=new T(this.HELMET_RADIUS,32,32);this.helmet=new m(t,this.glassMaterial),this.helmet.castShadow=!0,this.helmet.receiveShadow=!0,e.add(this.helmet);const s=new K(this.HELMET_RADIUS*.85,.04,8,32);this.helmetRim=new m(s,this.accentMaterial),this.helmetRim.rotation.x=Math.PI/2,this.helmetRim.position.y=-this.HELMET_RADIUS*.5,e.add(this.helmetRim);const i=new T(this.HELMET_RADIUS*.7,16,16),o=new E({color:16777215,transparent:!0,opacity:.1,side:ne}),n=new m(i,o);e.add(n),this.root.add(e)}createBody(){const e=new z(this.BODY_RADIUS,this.BODY_HEIGHT,4,16);this.body=new m(e,this.suitMaterial),this.body.position.y=this.BODY_HEIGHT*.4,this.body.castShadow=!0,this.body.receiveShadow=!0;const t=new z(this.BODY_RADIUS*.6,this.BODY_HEIGHT*.4,4,12),s=new m(t,this.accentMaterial);s.position.set(0,this.BODY_HEIGHT*.1,this.BODY_RADIUS*.5),s.scale.z=.3,this.body.add(s);const i=new K(this.BODY_RADIUS*.9,.03,8,24),o=new m(i,this.accentMaterial);o.rotation.x=Math.PI/2,o.position.y=this.BODY_HEIGHT*.45,this.body.add(o),this.root.add(this.body)}createArms(){this.leftArm=this.createLimb(!0),this.leftArm.position.set(this.BODY_RADIUS+this.LIMB_RADIUS,this.BODY_HEIGHT*.6,0),this.root.add(this.leftArm),this.rightArm=this.createLimb(!1),this.rightArm.position.set(-(this.BODY_RADIUS+this.LIMB_RADIUS),this.BODY_HEIGHT*.6,0),this.root.add(this.rightArm)}createLegs(){this.leftLeg=this.createLimb(!0,!0),this.leftLeg.position.set(this.BODY_RADIUS*.4,.05,0),this.root.add(this.leftLeg),this.rightLeg=this.createLimb(!1,!0),this.rightLeg.position.set(-this.BODY_RADIUS*.4,.05,0),this.root.add(this.rightLeg)}createLimb(e,t=!1){const s=new R,i=t?this.LIMB_LENGTH*.9:this.LIMB_LENGTH,o=new z(this.LIMB_RADIUS,i,4,12),n=new m(o,this.suitMaterial);n.position.y=-i*.5,n.castShadow=!0,n.receiveShadow=!0;const r=new z(this.LIMB_RADIUS*1.05,i*.3,4,8),l=new m(r,this.accentMaterial);l.position.y=-i*.3,l.scale.set(1,1,.5),n.add(l);const h=new T(this.LIMB_RADIUS*1.3,12,12),y=new m(h,t?this.accentMaterial:this.suitMaterial);return y.position.y=-i*.5,t&&(y.scale.y=.6,y.position.y-=.05),n.add(y),s.add(n),s}createBackpack(){this.backpack=new R,this.backpack.position.set(0,this.BODY_HEIGHT*.5,-this.BODY_RADIUS*.8);const e=new Ie(.35,.4,.2,4,.05),t=new m(e,this.backpackMaterial);t.castShadow=!0,this.backpack.add(t);const s=new W(.05,.04,.15,8),i=new m(s,this.accentMaterial);i.position.set(-.1,-.25,-.05),this.backpack.add(i);const o=new m(s,this.accentMaterial);o.position.set(.1,-.25,-.05),this.backpack.add(o),this.jetpackFlame=new re(this.config.accentColor,.5,2),this.jetpackFlame.position.set(0,-.35,-.1),this.backpack.add(this.jetpackFlame),this.jetpackParticles=[];for(let n=0;n<6;n++){const r=new T(.02+Math.random()*.02,6,6),l=new E({color:this.config.accentColor,transparent:!0,opacity:.8}),h=new m(r,l);h.userData={offset:Math.random()*Math.PI*2,speed:.5+Math.random()*.5},this.jetpackParticles.push(h),this.backpack.add(h)}this.root.add(this.backpack)}setupShadows(){this.root.traverse(e=>{e instanceof m&&(e.castShadow=!0,e.receiveShadow=!0)})}update(e){if(!this.isDead){switch(this.animationTime+=e,this.animationState){case"idle":this.animateIdle();break;case"walk":this.animateWalk();break;case"death":this.animateDeath(e);break;case"place_bomb":this.animatePlaceBomb();break;case"victory":this.animateVictory();break}this.animateJetpackParticles(e)}}setAnimationState(e){this.animationState!==e&&(this.animationState=e,this.animationTime=0,e!=="death"&&this.resetPose())}resetPose(){this.root.rotation.set(0,0,0),this.root.position.y=0,this.root.scale.setScalar(this.config.scale*this.baseScale),this.leftArm.rotation.set(0,0,0),this.rightArm.rotation.set(0,0,0),this.leftLeg.rotation.set(0,0,0),this.rightLeg.rotation.set(0,0,0),this.body.rotation.set(0,0,0)}animateIdle(){const e=this.animationTime,t=.03,s=2;this.root.position.y=Math.sin(e*s)*t;const i=1+Math.sin(e*1.5)*.02;this.body.scale.set(i,i,i);const o=Math.sin(e*1.5)*.05;this.leftArm.rotation.z=o+.1,this.rightArm.rotation.z=-o-.1,this.helmet.rotation.x=Math.sin(e*.7)*.02,this.helmet.rotation.y=Math.sin(e*.5)*.03}animateWalk(){const e=this.animationTime,t=8,s=.5,i=.08;this.root.position.y=Math.abs(Math.sin(e*t))*i,this.leftArm.rotation.x=Math.sin(e*t)*s,this.rightArm.rotation.x=Math.sin(e*t+Math.PI)*s,this.leftLeg.rotation.x=Math.sin(e*t+Math.PI)*s,this.rightLeg.rotation.x=Math.sin(e*t)*s,this.body.rotation.z=Math.sin(e*t)*.05,this.helmet.rotation.x=Math.sin(e*t*2)*.03}animateDeath(e){this.deathProgress+=e;const s=Math.min(this.deathProgress/1.5,1),i=5+s*10;this.root.rotation.y+=i*e,this.root.rotation.z=Math.sin(this.deathProgress*3)*.3;const o=(1-s)*this.config.scale*this.baseScale;this.root.scale.setScalar(Math.max(o,.01));const n=1.5;if(s<.3){const r=s/.3;this.root.position.y=r*n}else{const r=(s-.3)/.7;this.root.position.y=n*(1-r)}this.leftArm.rotation.z=Math.sin(this.deathProgress*15)*.8,this.rightArm.rotation.z=Math.cos(this.deathProgress*15)*.8,this.glassMaterial.opacity=.3*(1-s),this.jetpackFlame.intensity=.5+s*2,s>=1&&(this.isDead=!0,this.root.visible=!1)}animatePlaceBomb(){const e=this.animationTime,t=.4;if(e>t){this.setAnimationState("idle");return}const s=e/t,i=Math.sin(s*Math.PI);this.root.position.y=-i*.15,this.leftArm.rotation.x=i*.8,this.rightArm.rotation.x=i*.8,this.leftArm.rotation.z=-i*.3,this.rightArm.rotation.z=i*.3,this.leftLeg.rotation.x=-i*.3,this.rightLeg.rotation.x=-i*.3}animateVictory(){const e=this.animationTime,t=4,s=.3;this.root.position.y=Math.abs(Math.sin(e*t))*s;const i=.5+Math.sin(e*t)*.2;this.leftArm.rotation.z=i,this.rightArm.rotation.z=-i,this.root.rotation.y+=2*.016,this.helmet.rotation.x=Math.sin(e*t*2)*.1}animateJetpackParticles(e){const t=this.animationTime;this.jetpackParticles.forEach((s,i)=>{const o=s.userData,n=(t*o.speed+o.offset)%(Math.PI*2),r=-Math.abs(Math.sin(n))*.3,l=Math.cos(n*2)*.05*(i%2===0?1:-1);s.position.set((i<3?-.1:.1)+l,-.3+r,-.1);const h=1-Math.abs(Math.sin(n));s.material.opacity=h*.8;const y=.5+h*.5;s.scale.setScalar(y)}),this.jetpackFlame.intensity=.5+Math.sin(t*3)*.2}getPosition(){return this.root.position.clone()}setPosition(e,t,s){this.root.position.set(e,t,s)}setRotationY(e){this.root.rotation.y=e}getRotationY(){return this.root.rotation.y}die(){this.isDead||this.setAnimationState("death")}isDeathComplete(){return this.isDead}reset(){this.isDead=!1,this.deathProgress=0,this.animationTime=0,this.root.visible=!0,this.glassMaterial.opacity=.3,this.setAnimationState("idle")}getAnimationState(){return this.animationState}dispose(){this.root.traverse(e=>{e instanceof m&&e.geometry.dispose()}),this.suitMaterial.dispose(),this.accentMaterial.dispose(),this.glassMaterial.dispose(),this.backpackMaterial.dispose()}getBoundingRadius(){return this.HELMET_RADIUS*this.config.scale*this.baseScale}setVisible(e){this.root.visible=e}setEmissiveIntensity(e){this.accentMaterial.emissiveIntensity=.1+e,this.jetpackFlame.intensity=.5+e}flash(e=.2){const t=this.suitMaterial.emissive.clone();this.suitMaterial.emissive.setHex(16777215),this.suitMaterial.emissiveIntensity=.5,setTimeout(()=>{this.suitMaterial.emissive.copy(t),this.suitMaterial.emissiveIntensity=0},e*1e3)}}var j=(a=>(a.NONE="none",a.RAIN="rain",a.SNOW="snow",a.ASH="ash",a.POLLEN="pollen",a.NEON="neon",a))(j||{});class te{scene;currentWeather="none";intensity=.5;enabled=!0;particleCount=2e3;particles=[];splashes=[];particleMesh;splashMesh;dummy=new Y;rainMaterial;snowMaterial;ashMaterial;pollenMaterial;neonMaterial;rainGeo;snowGeo;ashGeo;pollenGeo;neonGeo;splashGeo;snowAccumulation=new Map;accumulationMesh;accumulationDummy=new Y;bounds={minX:-2,maxX:18,minZ:-2,maxZ:18,height:20};fireLight;fireGlowMesh;constructor(e){this.scene=e,this.initializeMaterials(),this.initializeGeometries(),this.initializeParticleMesh(),this.initializeSplashes(),this.initializeAccumulation(),this.initializeFireGlow(),this.initializeParticles()}initializeMaterials(){this.rainMaterial=new E({color:4500223,transparent:!0,opacity:.6,blending:C,depthWrite:!1}),this.snowMaterial=new E({color:16777215,transparent:!0,opacity:.8,blending:C,depthWrite:!1}),this.ashMaterial=new E({color:16729122,transparent:!0,opacity:.9,blending:C,depthWrite:!1}),this.pollenMaterial=new E({color:16777130,transparent:!0,opacity:.7,blending:C,depthWrite:!1}),this.neonMaterial=new E({color:65535,transparent:!0,opacity:.9,blending:C,depthWrite:!1})}initializeGeometries(){this.rainGeo=new W(.01,.01,.8,4),this.rainGeo.translate(0,.4,0),this.snowGeo=new X(.08,0),this.ashGeo=new le(.08,.08),this.pollenGeo=new T(.06,6,6),this.neonGeo=new X(.05,0),this.splashGeo=new ue(.05,.15,8),this.splashGeo.rotateX(-Math.PI/2)}initializeParticleMesh(){this.particleMesh=new k(this.rainGeo,this.rainMaterial,this.particleCount),this.particleMesh.instanceMatrix.setUsage(N),this.particleMesh.count=0,this.scene.add(this.particleMesh)}initializeSplashes(){this.splashMesh=new k(this.splashGeo,new E({color:4500223,transparent:!0,opacity:.5,blending:C,depthWrite:!1,side:oe}),100),this.splashMesh.instanceMatrix.setUsage(N),this.splashMesh.count=0,this.scene.add(this.splashMesh)}initializeAccumulation(){this.accumulationMesh=new k(new W(.4,.5,.1,6),new x({color:16777215,transparent:!0,opacity:.6,roughness:.8}),256),this.accumulationMesh.instanceMatrix.setUsage(N),this.accumulationMesh.count=0,this.accumulationMesh.visible=!1,this.scene.add(this.accumulationMesh)}initializeFireGlow(){this.fireLight=new re(16729122,0,30),this.fireLight.position.set(8,5,8),this.scene.add(this.fireLight);const e=new T(8,32,32);this.fireGlowMesh=new m(e,new E({color:16720384,transparent:!0,opacity:0,blending:C,depthWrite:!1,side:ne})),this.fireGlowMesh.position.set(8,4,8),this.scene.add(this.fireGlowMesh)}initializeParticles(){for(let e=0;e<this.particleCount;e++)this.particles.push({position:new I,velocity:new I,life:0,maxLife:1,size:1,rotation:0,rotationSpeed:0});for(let e=0;e<100;e++)this.splashes.push({position:new I,scale:0,life:0,maxLife:.3})}setWeather(e,t=.5){this.currentWeather===e&&this.intensity===t||(this.currentWeather=e,this.intensity=Math.max(0,Math.min(1,t)),this.updateWeatherGeometry(),this.resetParticles(),this.updateFireGlow(),this.accumulationMesh.visible=e==="snow")}setEnabled(e){if(this.enabled=e,!e){this.particleMesh.count=0,this.splashMesh.count=0,this.accumulationMesh.visible=!1,this.fireLight.intensity=0;const t=this.fireGlowMesh.material;t.opacity=0}}setIntensity(e){this.intensity=Math.max(0,Math.min(1,e))}updateWeatherGeometry(){switch(this.scene.remove(this.particleMesh),this.currentWeather){case"rain":this.particleMesh=new k(this.rainGeo,this.rainMaterial,this.particleCount);break;case"snow":this.particleMesh=new k(this.snowGeo,this.snowMaterial,this.particleCount);break;case"ash":this.particleMesh=new k(this.ashGeo,this.ashMaterial,this.particleCount);break;case"pollen":this.particleMesh=new k(this.pollenGeo,this.pollenMaterial,this.particleCount);break;case"neon":this.particleMesh=new k(this.neonGeo,this.neonMaterial,this.particleCount);break;default:this.particleMesh=new k(this.rainGeo,this.rainMaterial,this.particleCount)}this.particleMesh.instanceMatrix.setUsage(N),this.particleMesh.count=this.enabled&&this.currentWeather!=="none"?Math.floor(this.particleCount*this.intensity):0,this.scene.add(this.particleMesh)}updateFireGlow(){if(this.currentWeather==="ash"){this.fireLight.intensity=2*this.intensity;const e=this.fireGlowMesh.material;e.opacity=.15*this.intensity}else{this.fireLight.intensity=0;const e=this.fireGlowMesh.material;e.opacity=0}}resetParticles(){for(const e of this.particles)this.spawnParticle(e)}spawnParticle(e){const t=this.bounds.minX+Math.random()*(this.bounds.maxX-this.bounds.minX),s=this.bounds.minZ+Math.random()*(this.bounds.maxZ-this.bounds.minZ),i=Math.random()*this.bounds.height;switch(e.position.set(t,i,s),e.life=Math.random(),e.maxLife=1,e.size=.5+Math.random()*.5,e.rotation=Math.random()*Math.PI*2,e.rotationSpeed=(Math.random()-.5)*2,this.currentWeather){case"rain":e.velocity.set((Math.random()-.5)*2,-15-Math.random()*5,(Math.random()-.5)*2);break;case"snow":e.velocity.set((Math.random()-.5)*1,-2-Math.random()*2,(Math.random()-.5)*1);break;case"ash":e.velocity.set((Math.random()-.5)*3,2+Math.random()*3,(Math.random()-.5)*3);break;case"pollen":e.velocity.set((Math.random()-.5)*.5,-.5-Math.random()*.5,(Math.random()-.5)*.5);break;case"neon":e.velocity.set((Math.random()-.5)*1,3+Math.random()*4,(Math.random()-.5)*1);break}}spawnSplash(e,t){for(const s of this.splashes)if(s.life<=0){s.position.set(e,.05,t),s.scale=.1,s.life=s.maxLife;return}}update(e){if(!this.enabled||this.currentWeather==="none")return;const t=Math.min(e,.05),s=Math.floor(this.particleCount*this.intensity);for(let i=0;i<s;i++){const o=this.particles[i];o.position.x+=o.velocity.x*t,o.position.y+=o.velocity.y*t,o.position.z+=o.velocity.z*t,this.currentWeather==="snow"?(o.position.x+=Math.sin(Date.now()*.001+i)*.01,o.position.z+=Math.cos(Date.now()*.0013+i)*.01):this.currentWeather==="pollen"?(o.position.x+=Math.sin(Date.now()*.002+i*.1)*.02,o.position.z+=Math.cos(Date.now()*.0017+i*.1)*.02):this.currentWeather==="ash"&&(o.position.x+=Math.sin(Date.now()*.003+i*.05)*.03,o.position.z+=Math.cos(Date.now()*.0025+i*.05)*.03),o.rotation+=o.rotationSpeed*t,o.life-=t*.5;const n=o.position.x<this.bounds.minX||o.position.x>this.bounds.maxX||o.position.z<this.bounds.minZ||o.position.z>this.bounds.maxZ,r=o.position.y<=0,l=o.position.y>=this.bounds.height;(o.life<=0||n||r||l)&&(this.currentWeather==="rain"&&r&&o.life>0&&this.spawnSplash(o.position.x,o.position.z),this.currentWeather==="snow"&&r&&this.addSnowAccumulation(o.position.x,o.position.z),this.spawnParticle(o)),this.dummy.position.copy(o.position),this.dummy.scale.setScalar(o.size),this.currentWeather==="rain"?this.dummy.lookAt(o.position.x+o.velocity.x,o.position.y+o.velocity.y,o.position.z+o.velocity.z):this.currentWeather==="ash"?this.dummy.rotation.set(0,o.rotation,0):this.dummy.rotation.set(o.rotation,o.rotation*.7,0),this.dummy.updateMatrix(),this.particleMesh.setMatrixAt(i,this.dummy.matrix)}if(this.particleMesh.count=s,this.particleMesh.instanceMatrix.needsUpdate=!0,this.updateSplashes(t),this.currentWeather==="snow"&&this.updateAccumulation(),this.currentWeather==="ash"){const i=.9+Math.random()*.2;this.fireLight.intensity=2*this.intensity*i;const o=this.fireGlowMesh.material;o.opacity=.15*this.intensity*i}}updateSplashes(e){let t=0;for(let s=0;s<this.splashes.length;s++){const i=this.splashes[s];if(i.life>0){i.life-=e;const o=1-i.life/i.maxLife;i.scale=.1+o*.5,this.dummy.position.copy(i.position),this.dummy.scale.set(i.scale,i.scale,i.scale),this.dummy.rotation.x=-Math.PI/2,this.dummy.updateMatrix(),this.splashMesh.setMatrixAt(t++,this.dummy.matrix)}}this.splashMesh.count=t,this.splashMesh.instanceMatrix.needsUpdate=!0}addSnowAccumulation(e,t){const s=`${Math.floor(e)},${Math.floor(t)}`,i=this.snowAccumulation.get(s)||0;this.snowAccumulation.set(s,Math.min(i+.01,.3))}updateAccumulation(){let e=0;for(const[t,s]of this.snowAccumulation)if(s>.01&&e<256){const[i,o]=t.split(",").map(Number);this.accumulationDummy.position.set(i+.5,s/2,o+.5),this.accumulationDummy.scale.set(1,s*3,1),this.accumulationDummy.updateMatrix(),this.accumulationMesh.setMatrixAt(e++,this.accumulationDummy.matrix)}this.accumulationMesh.count=e,this.accumulationMesh.instanceMatrix.needsUpdate=!0}static getWeatherForTheme(e){switch(e){case f.ICE:return"snow";case f.VOLCANO:return"ash";case f.FOREST:return"pollen";case f.SPACE:return"neon";case f.CLASSIC:case f.DESERT:default:return"none"}}dispose(){this.scene.remove(this.particleMesh),this.scene.remove(this.splashMesh),this.scene.remove(this.accumulationMesh),this.scene.remove(this.fireLight),this.scene.remove(this.fireGlowMesh),this.particleMesh.geometry.dispose(),this.splashMesh.geometry.dispose(),this.accumulationMesh.geometry.dispose(),this.fireGlowMesh.geometry.dispose(),this.rainMaterial.dispose(),this.snowMaterial.dispose(),this.ashMaterial.dispose(),this.pollenMaterial.dispose(),this.neonMaterial.dispose(),this.splashMesh.material.dispose(),this.accumulationMesh.material.dispose(),this.fireGlowMesh.material.dispose()}}class q{scene;camera;renderer;floorMesh;hardBlockPool;softBlockPool;astronautCharacters=[];bombMeshes=new Map;explosionMeshes=[];powerUpMeshes=[];matFloor=new x({color:2763306});matHard=new x({color:5592405});matSoft=new x({color:9136404});matBomb=new x({color:1118481});matBombPrimed=new x({color:3359999,emissive:1122986});matBombRushed=new x({color:16720418,emissive:11145489});matExplosion=new x({color:16737792,emissive:16729088,transparent:!0,opacity:.85});matPowerUp=new x({color:4521796,emissive:2271778});geoBlock=new O(D*.95,D*.95,D*.95);geoBomb=new T(.35,16,16);geoExplosion=new O(D*.9,.3,D*.9);geoPowerUp=new O(.4,.4,.4);dummy=new Y;weatherSystem;currentTheme=f.CLASSIC;lastFrameTime=0;frameDeltaTime=.016;constructor(){this.scene=new pe,this.scene.background=new fe(657930);const e=(c-1)/2;this.camera=new ge(50,window.innerWidth/window.innerHeight,.1,100),this.camera.position.set(e,18,e+12),this.camera.lookAt(e,0,e);try{this.renderer=new be({antialias:!0})}catch(r){throw q.showWebGLError(),new Error("WebGL initialization failed: "+(r instanceof Error?r.message:String(r)))}this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ye,document.body.appendChild(this.renderer.domElement);const t=new we(16777215,.4);this.scene.add(t);const s=new ve(16777215,.8);s.position.set(e+5,15,e-5),s.castShadow=!0,s.shadow.mapSize.set(1024,1024),s.shadow.camera.near=1,s.shadow.camera.far=40;const i=c;s.shadow.camera.left=-i,s.shadow.camera.right=i,s.shadow.camera.top=i,s.shadow.camera.bottom=-i,this.scene.add(s);const o=new le(c,c);this.floorMesh=new m(o,this.matFloor),this.floorMesh.rotation.x=-Math.PI/2,this.floorMesh.position.set(e,-.01,e),this.floorMesh.receiveShadow=!0,this.scene.add(this.floorMesh);const n=c*c;this.hardBlockPool=new k(this.geoBlock,this.matHard,n),this.hardBlockPool.castShadow=!0,this.hardBlockPool.receiveShadow=!0,this.scene.add(this.hardBlockPool),this.softBlockPool=new k(this.geoBlock,this.matSoft,n),this.softBlockPool.castShadow=!0,this.softBlockPool.receiveShadow=!0,this.scene.add(this.softBlockPool),window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}),this.weatherSystem=new te(this.scene)}syncState(e,t,s=.016){let i=0,o=0;for(let n=0;n<c;n++)for(let r=0;r<c;r++){const l=e.grid[n][r];l===b.HardBlock?(this.dummy.position.set(r,.475,n),this.dummy.updateMatrix(),this.hardBlockPool.setMatrixAt(i++,this.dummy.matrix)):l===b.SoftBlock&&(this.dummy.position.set(r,.475,n),this.dummy.updateMatrix(),this.softBlockPool.setMatrixAt(o++,this.dummy.matrix))}this.hardBlockPool.count=i,this.hardBlockPool.instanceMatrix.needsUpdate=!0,this.softBlockPool.count=o,this.softBlockPool.instanceMatrix.needsUpdate=!0,this.syncPlayers(e,s),this.syncBombs(e),this.syncExplosions(e),this.syncPowerUps(e)}syncPlayers(e,t){for(;this.astronautCharacters.length<e.players.length;){const s=this.astronautCharacters.length,i=new Be({playerId:s,scale:1});this.scene.add(i.root),this.astronautCharacters.push(i)}for(let s=0;s<this.astronautCharacters.length;s++){const i=this.astronautCharacters[s];if(s<e.players.length){const o=e.players[s];if(o.alive){if(i.setVisible(!0),i.setPosition(o.worldPos.x,0,o.worldPos.y),o.moveDir!==0){i.setAnimationState(_.WALK);let n=0;switch(o.moveDir){case 1:n=0;break;case 2:n=Math.PI;break;case 3:n=-Math.PI/2;break;case 4:n=Math.PI/2;break}i.setRotationY(n)}else i.setAnimationState(_.IDLE);i.update(t)}else i.getAnimationState()!==_.DEATH&&!i.isDeathComplete()&&i.die(),i.update(t),i.isDeathComplete()&&i.setVisible(!1)}else i.setVisible(!1)}}syncBombs(e){const t=new Set(e.bombs.map(s=>s.id));for(const[s,i]of this.bombMeshes)t.has(s)||(this.scene.remove(i),this.bombMeshes.delete(s));for(const s of e.bombs){let i=this.bombMeshes.get(s.id);if(!i){const n=s.primed?this.matBombPrimed:s.rushed?this.matBombRushed:this.matBomb;i=new m(this.geoBomb,n),i.castShadow=!0,this.scene.add(i),this.bombMeshes.set(s.id,i)}i.position.set(s.gridPos.col,.35,s.gridPos.row);const o=1+.05*Math.sin(Date.now()*.01*(s.rushed?4:s.primed?1:2));i.scale.setScalar(o)}}syncExplosions(e){for(;this.explosionMeshes.length>e.explosions.length;){const t=this.explosionMeshes.pop();this.scene.remove(t)}for(let t=0;t<e.explosions.length;t++){let s=this.explosionMeshes[t];s||(s=new m(this.geoExplosion,this.matExplosion.clone()),s.castShadow=!1,this.scene.add(s),this.explosionMeshes.push(s));const i=e.explosions[t];s.position.set(i.gridPos.col,.15,i.gridPos.row),s.material.opacity=Math.min(1,i.remaining*2)}}syncPowerUps(e){for(;this.powerUpMeshes.length>e.powerUps.length;){const t=this.powerUpMeshes.pop();this.scene.remove(t)}for(let t=0;t<e.powerUps.length;t++){let s=this.powerUpMeshes[t];s||(s=new m(this.geoPowerUp,this.matPowerUp),this.scene.add(s),this.powerUpMeshes.push(s));const i=e.powerUps[t];s.position.set(i.gridPos.col,.3+.1*Math.sin(Date.now()*.003),i.gridPos.row),s.rotation.y+=.02}}render(e){const t=performance.now();this.lastFrameTime>0&&(this.frameDeltaTime=Math.min((t-this.lastFrameTime)/1e3,.05)),this.lastFrameTime=t,this.weatherSystem.update(this.frameDeltaTime),this.renderer.render(this.scene,this.camera)}setWeather(e,t=.5){this.weatherSystem.setWeather(e,t)}setWeatherEnabled(e){this.weatherSystem.setEnabled(e)}setWeatherIntensity(e){this.weatherSystem.setIntensity(e)}setTheme(e){this.currentTheme=e;const t=te.getWeatherForTheme(e);t!==j.NONE?this.weatherSystem.setWeather(t,.6):this.weatherSystem.setWeather(j.NONE)}getCurrentTheme(){return this.currentTheme}dispose(){this.weatherSystem.dispose();for(const e of this.astronautCharacters)e.dispose(),this.scene.remove(e.root);this.astronautCharacters=[],this.renderer.dispose(),this.matFloor.dispose(),this.matHard.dispose(),this.matSoft.dispose(),this.matBomb.dispose(),this.matBombPrimed.dispose(),this.matBombRushed.dispose(),this.matExplosion.dispose(),this.matPowerUp.dispose(),this.geoBlock.dispose(),this.geoBomb.dispose(),this.geoExplosion.dispose(),this.geoPowerUp.dispose(),this.renderer.domElement.remove()}static showWebGLError(){const e=document.createElement("div");e.style.cssText=`
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
    `,e.innerHTML=`
      <h2 style="margin: 0 0 15px 0; color: #ff6666;">WebGL Not Supported</h2>
      <p style="margin: 0 0 15px 0; line-height: 1.6;">
        This game requires WebGL to run, but your browser or device doesn't support it.
      </p>
      <p style="margin: 0; font-size: 14px; color: #aaa;">
        Try updating your browser or enabling hardware acceleration in settings.
      </p>
    `,document.body.appendChild(e)}}class Ce{container;gameInfo;levelInfo=null;timerInfo=null;constructor(e="hud"){this.container=document.getElementById(e),this.gameInfo=document.getElementById("game-info"),this.createHUDElements()}createHUDElements(){this.levelInfo=document.createElement("div"),this.levelInfo.id="level-info",this.levelInfo.style.cssText=`
      position: absolute;
      top: 8px;
      left: 12px;
      font-size: 14px;
      opacity: 0.8;
      color: #e94560;
      font-weight: 600;
    `,this.container.appendChild(this.levelInfo),this.timerInfo=document.createElement("div"),this.timerInfo.id="timer-info",this.timerInfo.style.cssText=`
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 18px;
      font-weight: bold;
      opacity: 0.9;
      color: #fff;
      font-variant-numeric: tabular-nums;
    `,this.container.appendChild(this.timerInfo)}update(e,t){const s=e.players[0];if(s){if(this.gameInfo&&(s.alive?this.gameInfo.innerHTML=`
          <span style="color: #e94560;">BOMBS:</span> ${s.maxBombs-s.activeBombs}/${s.maxBombs} &nbsp;
          <span style="color: #e94560;">RANGE:</span> ${s.bombRange} &nbsp;
          <span style="color: #e94560;">FUSE:</span> ${s.fuseCharges} &nbsp;
          <span style="color: #e94560;">SPD:</span> ${s.speed.toFixed(1)}
        `:this.gameInfo.innerHTML='<span style="color: #ef4444; font-weight: bold;">☠ ELIMINATED</span>'),this.levelInfo&&t){const i=this.getLevelName(t.currentLevel);this.levelInfo.textContent=`LEVEL ${t.currentLevel}: ${i}`}if(this.timerInfo&&t){const i=this.getElapsedTime(t);this.timerInfo.textContent=this.formatTime(i),t.phase===u.PAUSED?this.timerInfo.style.color="#fbbf24":this.timerInfo.style.color="#fff"}if(t){const i=t.phase===u.PLAYING||t.phase===u.PAUSED;this.levelInfo.style.display=i?"block":"none",this.timerInfo.style.display=i?"block":"none",this.gameInfo.style.display=i?"block":"none"}}}getLevelName(e){return{1:"Training Grounds",2:"Ice Caverns",3:"Volcano Core",4:"Enchanted Forest",5:"Desert Ruins",6:"Space Station"}[e]||"Unknown"}getElapsedTime(e){return e.phase===u.PAUSED&&e.pausedAt?Math.floor((e.pausedAt-e.levelStartTime-e.totalPauseTime)/1e3):Math.floor((Date.now()-e.levelStartTime-e.totalPauseTime)/1e3)}formatTime(e){const t=Math.floor(e/60),s=e%60;return`${t.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`}showMessage(e,t=3e3){const s=document.createElement("div");s.textContent=e,s.style.cssText=`
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(233, 69, 96, 0.9);
      color: white;
      padding: 16px 32px;
      border-radius: 8px;
      font-size: 1.2rem;
      font-weight: bold;
      z-index: 100;
      animation: fadeInOut ${t}ms ease-in-out;
    `,this.container.appendChild(s),setTimeout(()=>s.remove(),t)}}class Te{constructor(e,t){this.onUpdate=e,this.onRender=t}accumulator=0;tick=0;lastTime=0;rafId=0;running=!1;frameCount=0;fpsAccum=0;fps=0;start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.rafId=requestAnimationFrame(e=>this.loop(e)))}stop(){this.running=!1,cancelAnimationFrame(this.rafId)}loop(e){if(!this.running)return;const t=Math.min((e-this.lastTime)/1e3,.25);for(this.lastTime=e,this.accumulator+=t,this.fpsAccum+=t,this.frameCount++,this.fpsAccum>=1&&(this.fps=this.frameCount,this.frameCount=0,this.fpsAccum-=1);this.accumulator>=F;)this.onUpdate(F,this.tick),this.tick++,this.accumulator-=F;const s=this.accumulator/F;this.onRender(s),this.rafId=requestAnimationFrame(i=>this.loop(i))}getTick(){return this.tick}getSimRate(){return ce}}function De(a,e){return e.col<0||e.col>=c||e.row<0||e.row>=c?!1:a[e.row][e.col]===b.Floor}function se(a){return{col:Math.round(a.x),row:Math.round(a.y)}}function Ge(a){switch(a){case w.Up:return{x:0,y:-1};case w.Down:return{x:0,y:1};case w.Left:return{x:-1,y:0};case w.Right:return{x:1,y:0};default:return{x:0,y:0}}}function Ue(a,e,t){const s=a.players[e];if(!s||!s.alive||s.moveDir===w.None)return;const i=Ge(s.moveDir),o=s.worldPos.x+i.x*s.speed*t,n=s.worldPos.y+i.y*s.speed*t,r=se({x:o,y:n});De(a.grid,r)&&!Re(a,r,s.id)&&(s.worldPos.x=o,s.worldPos.y=n,s.gridPos=se(s.worldPos))}function Re(a,e,t){return a.bombs.some(s=>s.gridPos.col===e.col&&s.gridPos.row===e.row)}let ze=1;const Ne=3,Fe=5,He=1.5;function Oe(a,e){const t=a.players[e];if(!t||!t.alive||t.activeBombs>=t.maxBombs||a.bombs.some(i=>i.gridPos.col===t.gridPos.col&&i.gridPos.row===t.gridPos.row))return!1;const s={id:ze++,gridPos:{...t.gridPos},ownerId:e,fuseRemaining:Ne,range:t.bombRange,primed:!1,rushed:!1};return a.bombs.push(s),t.activeBombs++,!0}function _e(a,e){const t=[];for(let s=a.bombs.length-1;s>=0;s--)if(a.bombs[s].fuseRemaining-=e,a.bombs[s].fuseRemaining<=0){t.push({...a.bombs[s].gridPos});const i=a.players[a.bombs[s].ownerId];i&&i.activeBombs--,a.bombs.splice(s,1)}return t}function $e(a,e){const t=a.players[e];if(!t||t.fuseCharges<=0)return!1;const s=a.bombs.find(i=>i.ownerId===e&&!i.primed);return s?(s.fuseRemaining=Fe,s.primed=!0,t.fuseCharges--,!0):!1}function Ve(a,e){const t=a.players[e];if(!t||t.fuseCharges<=0)return!1;const s=a.bombs.find(i=>i.ownerId===e&&!i.rushed);return s?(s.fuseRemaining=Math.min(s.fuseRemaining,He),s.rushed=!0,t.fuseCharges--,!0):!1}function We(a,e){const t=a.players[e];if(!t||t.fuseCharges<=0)return null;const s=a.bombs.findIndex(n=>n.ownerId===e);if(s===-1)return null;const o={...a.bombs[s].gridPos};return a.bombs.splice(s,1),t.activeBombs--,t.fuseCharges--,o}const Ye=.5;function ie(a,e,t){const s=[{pos:e,range:t}];for(;s.length>0;){const i=s.shift(),o=je(a,i.pos,i.range);for(const n of o){a.grid[n.row][n.col]===b.SoftBlock&&(a.grid[n.row][n.col]=b.Floor,Ke(a,n)),a.explosions.push({gridPos:n,remaining:Ye});for(const r of a.players)r.alive&&r.gridPos.col===n.col&&r.gridPos.row===n.row&&(r.alive=!1);for(let r=a.bombs.length-1;r>=0;r--){const l=a.bombs[r];if(l.gridPos.col===n.col&&l.gridPos.row===n.row){a.bombs.splice(r,1);const h=a.players[l.ownerId];h&&h.activeBombs>0&&h.activeBombs--,s.push({pos:l.gridPos,range:l.range})}}}}}function je(a,e,t){const s=[{...e}],i=[{dc:0,dr:-1},{dc:0,dr:1},{dc:-1,dr:0},{dc:1,dr:0}];for(const{dc:o,dr:n}of i)for(let r=1;r<=t;r++){const l=e.col+o*r,h=e.row+n*r;if(l<0||l>=c||h<0||h>=c||a.grid[h][l]===b.HardBlock||(s.push({col:l,row:h}),a.grid[h][l]===b.SoftBlock))break}return s}function qe(a,e){for(let t=a.explosions.length-1;t>=0;t--)a.explosions[t].remaining-=e,a.explosions[t].remaining<=0&&a.explosions.splice(t,1)}function Ke(a,e){if(Math.random()>.3)return;const t=[A.BombRange,A.BombCount,A.Speed,A.FuseCharge],s=t[Math.floor(Math.random()*t.length)];a.powerUps.push({gridPos:{...e},type:s})}function Xe(a){let e=!1;for(const t of a.players)if(t.alive)for(let s=a.powerUps.length-1;s>=0;s--){const i=a.powerUps[s];i.gridPos.col===t.gridPos.col&&i.gridPos.row===t.gridPos.row&&(Ze(a,t.id,i.type),a.powerUps.splice(s,1),e=!0)}return e}function Ze(a,e,t){const s=a.players[e];if(s)switch(t){case A.BombRange:s.bombRange=Math.min(s.bombRange+1,8);break;case A.BombCount:s.maxBombs=Math.min(s.maxBombs+1,8);break;case A.Speed:s.speed=Math.min(s.speed+.5,6);break;case A.FuseCharge:s.fuseCharges=Math.min(s.fuseCharges+1,5);break}}class Je{state;input;scene;audio;menuManager;hud;gameLoop;sessionBombsPlaced=0;sessionPowerUpsCollected=0;_sessionEnemiesDefeated=0;fpsEl;constructor(){this.input=new Le,this.scene=new q,this.audio=new Ae,this.hud=new Ce;const e=d.getSettings();this.audio.setMusicVolume(e.musicVolume),this.audio.setSfxVolume(e.sfxVolume),this.audio.setUiVolume(e.uiVolume),this.state=this.createInitialExtendedState(),this.menuManager=new Ee(t=>this.startGame(t),()=>this.resumeGame(),()=>this.quitToMenu()),this.fpsEl=document.getElementById("fps-counter"),this.fpsEl.style.display=e.showFPS?"block":"none",this.input.setPauseCallback(()=>this.togglePause()),this.gameLoop=new Te((t,s)=>this.update(t,s),t=>this.render(t)),this.menuManager.showScreen(p.MAIN)}createInitialExtendedState(){return{base:he(),phase:u.MENU,currentLevel:1,levelStartTime:0,totalPauseTime:0,pausedAt:null,session:{bombsPlaced:0,powerUpsCollected:0,enemiesDefeated:0,startTime:Date.now()},settings:d.getSettings(),stats:d.getStats()}}start(){this.gameLoop.start()}startGame(e){d.incrementGamesStarted(),H.setLevel(e-1),this.state.currentLevel=e;const t=H.getCurrentLevel();this.state.base=H.createLevelState(t),H.getThemeColors(t.theme),this.scene.setTheme(t.theme),this.scene.setWeatherEnabled(!0),this.sessionBombsPlaced=0,this.sessionPowerUpsCollected=0,this._sessionEnemiesDefeated=0,this.state.levelStartTime=Date.now(),this.state.totalPauseTime=0,this.state.pausedAt=null,this.applySettings(),this.state.phase=u.PLAYING,this.menuManager.hide(),console.log(`Starting Level ${e}: ${t.name}`)}resumeGame(){this.state.phase===u.PAUSED&&(this.state.pausedAt&&(this.state.totalPauseTime+=Date.now()-this.state.pausedAt),this.state.pausedAt=null,this.state.phase=u.PLAYING,this.menuManager.hide())}quitToMenu(){const e=Math.floor((Date.now()-this.state.session.startTime)/1e3);d.addPlayTime(e),this.state.phase=u.MENU,this.menuManager.showScreen(p.MAIN)}togglePause(){this.state.phase===u.PLAYING?(this.state.phase=u.PAUSED,this.state.pausedAt=Date.now(),this.menuManager.showPauseMenu()):this.state.phase===u.PAUSED&&this.resumeGame()}update(e,t){this.state.base.tick=t;const s=this.input.poll();switch(this.state.phase){case u.PLAYING:this.updatePlaying(e,s);break;case u.PAUSED:break;case u.VICTORY:case u.DEFEAT:break;case u.MENU:break}this.hud.update(this.state.base,this.state)}updatePlaying(e,t){const s=this.state.base.players[0];if(s?.alive){if(t.moveDir!==w.None&&(s.moveDir=t.moveDir,Ue(this.state.base,0,e)),t.placeBomb&&Oe(this.state.base,0)&&(this.audio.playBombPlace(),this.sessionBombsPlaced++,d.incrementBombsPlaced()),t.fuseAction==="prime")$e(this.state.base,0);else if(t.fuseAction==="rush")Ve(this.state.base,0);else if(t.fuseAction==="detonate"){const n=We(this.state.base,0);n&&(ie(this.state.base,n,s.bombRange),this.audio.playExplosion())}}const i=_e(this.state.base,e);for(const n of i)ie(this.state.base,n,this.state.base.players[0]?.bombRange??2),this.audio.playExplosion();qe(this.state.base,e),Xe(this.state.base)&&(this.audio.playPowerUp(),this.sessionPowerUpsCollected++,d.incrementPowerUpsCollected(),d.vibrate(50)),this.checkGameEndConditions()}checkGameEndConditions(){if(!this.state.base.players[0]?.alive){this.handleDefeat();return}const t=this.state.base.enemies||[];if(t.filter(i=>i.alive).length===0&&t.length>0){this.handleVictory();return}}handleVictory(){this.state.phase=u.VICTORY;const e=Math.floor((Date.now()-this.state.levelStartTime-this.state.totalPauseTime)/1e3);d.recordWin(this.state.currentLevel,e),d.vibrate([100,50,100]),this.menuManager.showGameOver(!0,{time:e,bombs:this.sessionBombsPlaced,powerUps:this.sessionPowerUpsCollected}),console.log(`Victory! Level ${this.state.currentLevel} completed in ${e}s`)}handleDefeat(){this.state.phase=u.DEFEAT,d.recordLoss(),d.vibrate([200,100,200]);const e=Math.floor((Date.now()-this.state.levelStartTime-this.state.totalPauseTime)/1e3);this.menuManager.showGameOver(!1,{time:e,bombs:this.sessionBombsPlaced,powerUps:this.sessionPowerUpsCollected}),console.log(`Defeat! Level ${this.state.currentLevel} failed after ${e}s`)}render(e){this.scene.syncState(this.state.base,e),this.scene.render(),this.state.settings.showFPS&&(this.fpsEl.textContent=`${this.gameLoop.fps} FPS`)}applySettings(){const e=d.getSettings();this.audio.setMusicVolume(e.musicVolume),this.audio.setSfxVolume(e.sfxVolume),this.audio.setUiVolume(e.uiVolume),this.fpsEl.style.display=e.showFPS?"block":"none",e.fullscreen&&!document.fullscreenElement?document.documentElement.requestFullscreen?.().catch(()=>{}):!e.fullscreen&&document.fullscreenElement&&document.exitFullscreen?.().catch(()=>{})}getState(){return this.state}getPhase(){return this.state.phase}}console.log("🎮 BLASTFORGE Initializing...");console.log("✅ GameController with menus, themes, audio");console.log("✅ Miami Beach & Ice World themes");console.log("✅ Weather system (rain, snow, ash)");console.log("✅ ElevenLabs audio integration ready");console.log("✅ Touch controls for mobile");function ae(){try{const a=new Je;console.log("🚀 Game initialized successfully!"),window.game=a,window.audio=a.audio}catch(a){console.error("❌ Failed to initialize game:",a),document.body.innerHTML=`
      <div style="color: white; padding: 20px; font-family: sans-serif;">
        <h1>Error Loading Game</h1>
        <p>${a instanceof Error?a.message:"Unknown error"}</p>
        <pre>${a instanceof Error?a.stack:""}</pre>
      </div>
    `}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ae):ae();
