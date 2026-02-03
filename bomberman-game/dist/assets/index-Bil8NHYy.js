import{B as Y,V as O,G as F,M as x,a as He,D as Q,S as D,b as w,T as ye,c as L,d as he,C as ie,e as le,P as Re,O as ve,A as $,f as Te,g as ce,R as Ne,I as z,h as ne,i as Qe,j as oe,k as $e,l as Ue,m as We,n as je,o as we,p as Je,q as et,r as J,s as se,t as tt,L as ue,u as de,v as X,F as st,w as ot,x as it,y as Ae,E as Ee,z as Ye,H as nt,J as at,K as rt,W as lt,N as ct,Q as ut,U as dt}from"./three-D5usQ-_h.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function e(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=e(i);fetch(i.href,a)}})();const _=13,I=1.5,Xe=60,ae=1/Xe;var E=(c=>(c[c.Floor=0]="Floor",c[c.HardBlock=1]="HardBlock",c[c.SoftBlock=2]="SoftBlock",c))(E||{}),M=(c=>(c[c.None=0]="None",c[c.Up=1]="Up",c[c.Down=2]="Down",c[c.Left=3]="Left",c[c.Right=4]="Right",c))(M||{}),N=(c=>(c.BombRange="bomb_range",c.BombCount="bomb_count",c.Speed="speed",c.FuseCharge="fuse_charge",c))(N||{}),B=(c=>(c.MENU="menu",c.PLAYING="playing",c.PAUSED="paused",c.VICTORY="victory",c.DEFEAT="defeat",c.LEVEL_TRANSITION="level_transition",c))(B||{}),P=(c=>(c.MAIN="main",c.SETTINGS="settings",c.HOW_TO_PLAY="how_to_play",c.STATS="stats",c.LEVEL_SELECT="level_select",c))(P||{}),y=(c=>(c.CLASSIC="classic",c.ICE="ice",c.VOLCANO="volcano",c.FOREST="forest",c.DESERT="desert",c.SPACE="space",c.MIAMI_BEACH="miami_beach",c.LAHO_VIDEO="laho_video",c))(y||{});const R=[{id:1,name:"Laho II",theme:"laho_video",description:"Flying carpet vibes",softBlockDensity:.4,enemyCount:2,videoBackground:"/video/laho-ii-music-video.mp4",useVideoAudio:!0},{id:2,name:"Training Grounds",theme:"classic",description:"Learn the basics",softBlockDensity:.4,enemyCount:1},{id:3,name:"Ice Caverns",theme:"ice",description:"Slippery surfaces",softBlockDensity:.45,enemyCount:3},{id:4,name:"Volcano Core",theme:"volcano",description:"Watch your step",softBlockDensity:.5,enemyCount:4},{id:5,name:"Enchanted Forest",theme:"forest",description:"Nature's maze",softBlockDensity:.55,enemyCount:5},{id:6,name:"Desert Ruins",theme:"desert",description:"Ancient dangers",softBlockDensity:.5,enemyCount:6},{id:7,name:"Space Station",theme:"space",description:"Zero gravity chaos",softBlockDensity:.6,enemyCount:7},{id:8,name:"Miami Beach",theme:"miami_beach",description:"Sunset vibes and neon lights",softBlockDensity:.5,enemyCount:6}],Ce={musicVolume:.7,sfxVolume:1,uiVolume:.8,fullscreen:!1,showFPS:!0,vibration:!0},me={totalWins:0,totalLosses:0,totalPlayTime:0,levelsCompleted:[],bestTimes:{},bombsPlaced:0,powerUpsCollected:0,enemiesDefeated:0,gamesStarted:0};var A=(c=>(c.BASIC="basic",c.FAST="fast",c.SMART="smart",c.TANK="tank",c))(A||{});const Be="blastforge_settings",Ie="blastforge_stats";class ht{settings;stats;constructor(){this.settings=this.loadSettings(),this.stats=this.loadStats()}loadSettings(){try{const t=localStorage.getItem(Be);if(t){const e=JSON.parse(t);return{...Ce,...e}}}catch(t){console.warn("Failed to load settings:",t)}return{...Ce}}saveSettings(){try{localStorage.setItem(Be,JSON.stringify(this.settings))}catch(t){console.warn("Failed to save settings:",t)}}getSettings(){return{...this.settings}}updateSettings(t){this.settings={...this.settings,...t},this.saveSettings()}setMusicVolume(t){this.settings.musicVolume=Math.max(0,Math.min(1,t)),this.saveSettings()}setSfxVolume(t){this.settings.sfxVolume=Math.max(0,Math.min(1,t)),this.saveSettings()}setUiVolume(t){this.settings.uiVolume=Math.max(0,Math.min(1,t)),this.saveSettings()}setFullscreen(t){this.settings.fullscreen=t,this.saveSettings(),t?document.documentElement.requestFullscreen?.().catch(()=>{}):document.exitFullscreen?.().catch(()=>{})}setShowFPS(t){this.settings.showFPS=t,this.saveSettings()}setVibration(t){this.settings.vibration=t,this.saveSettings()}loadStats(){try{const t=localStorage.getItem(Ie);if(t){const e=JSON.parse(t);return{...me,...e}}}catch(t){console.warn("Failed to load stats:",t)}return{...me}}saveStats(){try{localStorage.setItem(Ie,JSON.stringify(this.stats))}catch(t){console.warn("Failed to save stats:",t)}}getStats(){return{...this.stats}}recordWin(t,e){this.stats.totalWins++,this.stats.levelsCompleted.includes(t)||this.stats.levelsCompleted.push(t);const s=this.stats.bestTimes[t];(!s||e<s)&&(this.stats.bestTimes[t]=e),this.saveStats()}recordLoss(){this.stats.totalLosses++,this.saveStats()}addPlayTime(t){this.stats.totalPlayTime+=t,this.saveStats()}incrementBombsPlaced(){this.stats.bombsPlaced++,this.saveStats()}incrementPowerUpsCollected(){this.stats.powerUpsCollected++,this.saveStats()}incrementEnemiesDefeated(){this.stats.enemiesDefeated++,this.saveStats()}incrementGamesStarted(){this.stats.gamesStarted++,this.saveStats()}resetStats(){this.stats={...me},this.saveStats()}vibrate(t){this.settings.vibration&&navigator.vibrate&&navigator.vibrate(t)}}const T=new ht;function qe(){const c=mt(),t=[pt(0,{col:1,row:1})];return{tick:0,grid:c,players:t,bombs:[],explosions:[],powerUps:[]}}function mt(){const c=[];for(let e=0;e<_;e++){c[e]=[];for(let s=0;s<_;s++)e===0||e===_-1||s===0||s===_-1||e%2===0&&s%2===0?c[e][s]=E.HardBlock:c[e][s]=E.Floor}const t=new Set(["1,1","1,2","2,1",`${_-2},${_-2}`,`${_-2},${_-3}`,`${_-3},${_-2}`,`1,${_-2}`,`1,${_-3}`,`2,${_-2}`,`${_-2},1`,`${_-3},1`,`${_-2},2`]);for(let e=1;e<_-1;e++)for(let s=1;s<_-1;s++)c[e][s]===E.Floor&&!t.has(`${s},${e}`)&&Math.random()<.4&&(c[e][s]=E.SoftBlock);return c}function pt(c,t){return{id:c,gridPos:{...t},worldPos:{x:t.col,y:t.row},moveDir:M.None,speed:3.5,bombRange:2,maxBombs:1,activeBombs:0,fuseCharges:3,alive:!0}}class ft{currentLevelIndex=0;getCurrentLevel(){return R[this.currentLevelIndex]??R[0]}getAllLevels(){return[...R]}setLevel(t){this.currentLevelIndex=Math.max(0,Math.min(R.length-1,t))}canProgressToLevel(t,e){return!0}getNextLevel(){return R[this.currentLevelIndex+1]??null}progressToNext(){return this.currentLevelIndex<R.length-1?(this.currentLevelIndex++,!0):!1}createLevelState(t){const e=qe();return this.applyLevelTheme(e,t),this.spawnEnemies(e,t),e}applyLevelTheme(t,e){const s=new Set(["1,1","1,2","2,1",`${_-2},${_-2}`,`${_-2},${_-3}`,`${_-3},${_-2}`,`1,${_-2}`,`1,${_-3}`,`2,${_-2}`,`${_-2},1`,`${_-3},1`,`${_-2},2`]);for(let i=1;i<_-1;i++)for(let a=1;a<_-1;a++)t.grid[i][a]===E.SoftBlock&&(t.grid[i][a]=E.Floor),t.grid[i][a]===E.Floor&&!s.has(`${a},${i}`)&&Math.random()<e.softBlockDensity&&(t.grid[i][a]=E.SoftBlock);switch(e.theme){case y.ICE:break;case y.VOLCANO:break;case y.FOREST:break;case y.MIAMI_BEACH:break}}spawnEnemies(t,e){const s=[{col:_-2,row:_-2},{col:1,row:_-2},{col:_-2,row:1},{col:7,row:7},{col:8,row:8},{col:7,row:8}];for(let i=0;i<e.enemyCount&&i<s.length;i++){const a=s[i];t.grid[a.row][a.col]=E.Floor;const l=gt(i,a.col,a.row,this.getEnemyTypeForLevel(e.id));t.enemies=t.enemies||[],t.enemies.push(l)}}getEnemyTypeForLevel(t){return t>=5?A.SMART:t>=3?A.FAST:A.BASIC}getThemeColors(t){switch(t){case y.ICE:return{background:662058,floor:2771562,accent:8965375};case y.VOLCANO:return{background:1706506,floor:4860458,accent:16737860};case y.FOREST:return{background:662026,floor:2771498,accent:6750088};case y.DESERT:return{background:1710602,floor:6969914,accent:16764006};case y.SPACE:return{background:328976,floor:2763338,accent:11176191};case y.MIAMI_BEACH:return{background:16739229,floor:15255951,accent:4251856};case y.LAHO_VIDEO:return{background:0,floor:1710634,accent:16768256};case y.CLASSIC:default:return{background:657930,floor:2763306,accent:43775}}}}function gt(c,t,e,s){const i={[A.BASIC]:2,[A.FAST]:3.5,[A.SMART]:2.5,[A.TANK]:1.5};return{id:c,gridPos:{col:t,row:e},worldPos:{x:t,y:e},moveDir:M.None,speed:i[s],alive:!0,type:s,aiState:"wander"}}const K=new ft;var ee=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},pe={};/*!
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */var Pe;function bt(){return Pe||(Pe=1,(function(c){(function(){var t=function(){this.init()};t.prototype={init:function(){var o=this||e;return o._counter=1e3,o._html5AudioPool=[],o.html5PoolSize=10,o._codecs={},o._howls=[],o._muted=!1,o._volume=1,o._canPlayEvent="canplaythrough",o._navigator=typeof window<"u"&&window.navigator?window.navigator:null,o.masterGain=null,o.noAudio=!1,o.usingWebAudio=!0,o.autoSuspend=!0,o.ctx=null,o.autoUnlock=!0,o._setup(),o},volume:function(o){var n=this||e;if(o=parseFloat(o),n.ctx||b(),typeof o<"u"&&o>=0&&o<=1){if(n._volume=o,n._muted)return n;n.usingWebAudio&&n.masterGain.gain.setValueAtTime(o,e.ctx.currentTime);for(var r=0;r<n._howls.length;r++)if(!n._howls[r]._webAudio)for(var u=n._howls[r]._getSoundIds(),f=0;f<u.length;f++){var g=n._howls[r]._soundById(u[f]);g&&g._node&&(g._node.volume=g._volume*o)}return n}return n._volume},mute:function(o){var n=this||e;n.ctx||b(),n._muted=o,n.usingWebAudio&&n.masterGain.gain.setValueAtTime(o?0:n._volume,e.ctx.currentTime);for(var r=0;r<n._howls.length;r++)if(!n._howls[r]._webAudio)for(var u=n._howls[r]._getSoundIds(),f=0;f<u.length;f++){var g=n._howls[r]._soundById(u[f]);g&&g._node&&(g._node.muted=o?!0:g._muted)}return n},stop:function(){for(var o=this||e,n=0;n<o._howls.length;n++)o._howls[n].stop();return o},unload:function(){for(var o=this||e,n=o._howls.length-1;n>=0;n--)o._howls[n].unload();return o.usingWebAudio&&o.ctx&&typeof o.ctx.close<"u"&&(o.ctx.close(),o.ctx=null,b()),o},codecs:function(o){return(this||e)._codecs[o.replace(/^x-/,"")]},_setup:function(){var o=this||e;if(o.state=o.ctx&&o.ctx.state||"suspended",o._autoSuspend(),!o.usingWebAudio)if(typeof Audio<"u")try{var n=new Audio;typeof n.oncanplaythrough>"u"&&(o._canPlayEvent="canplay")}catch{o.noAudio=!0}else o.noAudio=!0;try{var n=new Audio;n.muted&&(o.noAudio=!0)}catch{}return o.noAudio||o._setupCodecs(),o},_setupCodecs:function(){var o=this||e,n=null;try{n=typeof Audio<"u"?new Audio:null}catch{return o}if(!n||typeof n.canPlayType!="function")return o;var r=n.canPlayType("audio/mpeg;").replace(/^no$/,""),u=o._navigator?o._navigator.userAgent:"",f=u.match(/OPR\/(\d+)/g),g=f&&parseInt(f[0].split("/")[1],10)<33,m=u.indexOf("Safari")!==-1&&u.indexOf("Chrome")===-1,v=u.match(/Version\/(.*?) /),k=m&&v&&parseInt(v[1],10)<15;return o._codecs={mp3:!!(!g&&(r||n.canPlayType("audio/mp3;").replace(/^no$/,""))),mpeg:!!r,opus:!!n.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(n.canPlayType('audio/wav; codecs="1"')||n.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!n.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!n.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(n.canPlayType("audio/x-m4a;")||n.canPlayType("audio/m4a;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(n.canPlayType("audio/x-m4b;")||n.canPlayType("audio/m4b;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(n.canPlayType("audio/x-mp4;")||n.canPlayType("audio/mp4;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!(!k&&n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!!(!k&&n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!n.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(n.canPlayType("audio/x-flac;")||n.canPlayType("audio/flac;")).replace(/^no$/,"")},o},_unlockAudio:function(){var o=this||e;if(!(o._audioUnlocked||!o.ctx)){o._audioUnlocked=!1,o.autoUnlock=!1,!o._mobileUnloaded&&o.ctx.sampleRate!==44100&&(o._mobileUnloaded=!0,o.unload()),o._scratchBuffer=o.ctx.createBuffer(1,1,22050);var n=function(r){for(;o._html5AudioPool.length<o.html5PoolSize;)try{var u=new Audio;u._unlocked=!0,o._releaseHtml5Audio(u)}catch{o.noAudio=!0;break}for(var f=0;f<o._howls.length;f++)if(!o._howls[f]._webAudio)for(var g=o._howls[f]._getSoundIds(),m=0;m<g.length;m++){var v=o._howls[f]._soundById(g[m]);v&&v._node&&!v._node._unlocked&&(v._node._unlocked=!0,v._node.load())}o._autoResume();var k=o.ctx.createBufferSource();k.buffer=o._scratchBuffer,k.connect(o.ctx.destination),typeof k.start>"u"?k.noteOn(0):k.start(0),typeof o.ctx.resume=="function"&&o.ctx.resume(),k.onended=function(){k.disconnect(0),o._audioUnlocked=!0,document.removeEventListener("touchstart",n,!0),document.removeEventListener("touchend",n,!0),document.removeEventListener("click",n,!0),document.removeEventListener("keydown",n,!0);for(var C=0;C<o._howls.length;C++)o._howls[C]._emit("unlock")}};return document.addEventListener("touchstart",n,!0),document.addEventListener("touchend",n,!0),document.addEventListener("click",n,!0),document.addEventListener("keydown",n,!0),o}},_obtainHtml5Audio:function(){var o=this||e;if(o._html5AudioPool.length)return o._html5AudioPool.pop();var n=new Audio().play();return n&&typeof Promise<"u"&&(n instanceof Promise||typeof n.then=="function")&&n.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(o){var n=this||e;return o._unlocked&&n._html5AudioPool.push(o),n},_autoSuspend:function(){var o=this;if(!(!o.autoSuspend||!o.ctx||typeof o.ctx.suspend>"u"||!e.usingWebAudio)){for(var n=0;n<o._howls.length;n++)if(o._howls[n]._webAudio){for(var r=0;r<o._howls[n]._sounds.length;r++)if(!o._howls[n]._sounds[r]._paused)return o}return o._suspendTimer&&clearTimeout(o._suspendTimer),o._suspendTimer=setTimeout(function(){if(o.autoSuspend){o._suspendTimer=null,o.state="suspending";var u=function(){o.state="suspended",o._resumeAfterSuspend&&(delete o._resumeAfterSuspend,o._autoResume())};o.ctx.suspend().then(u,u)}},3e4),o}},_autoResume:function(){var o=this;if(!(!o.ctx||typeof o.ctx.resume>"u"||!e.usingWebAudio))return o.state==="running"&&o.ctx.state!=="interrupted"&&o._suspendTimer?(clearTimeout(o._suspendTimer),o._suspendTimer=null):o.state==="suspended"||o.state==="running"&&o.ctx.state==="interrupted"?(o.ctx.resume().then(function(){o.state="running";for(var n=0;n<o._howls.length;n++)o._howls[n]._emit("resume")}),o._suspendTimer&&(clearTimeout(o._suspendTimer),o._suspendTimer=null)):o.state==="suspending"&&(o._resumeAfterSuspend=!0),o}};var e=new t,s=function(o){var n=this;if(!o.src||o.src.length===0){console.error("An array of source files must be passed with any new Howl.");return}n.init(o)};s.prototype={init:function(o){var n=this;return e.ctx||b(),n._autoplay=o.autoplay||!1,n._format=typeof o.format!="string"?o.format:[o.format],n._html5=o.html5||!1,n._muted=o.mute||!1,n._loop=o.loop||!1,n._pool=o.pool||5,n._preload=typeof o.preload=="boolean"||o.preload==="metadata"?o.preload:!0,n._rate=o.rate||1,n._sprite=o.sprite||{},n._src=typeof o.src!="string"?o.src:[o.src],n._volume=o.volume!==void 0?o.volume:1,n._xhr={method:o.xhr&&o.xhr.method?o.xhr.method:"GET",headers:o.xhr&&o.xhr.headers?o.xhr.headers:null,withCredentials:o.xhr&&o.xhr.withCredentials?o.xhr.withCredentials:!1},n._duration=0,n._state="unloaded",n._sounds=[],n._endTimers={},n._queue=[],n._playLock=!1,n._onend=o.onend?[{fn:o.onend}]:[],n._onfade=o.onfade?[{fn:o.onfade}]:[],n._onload=o.onload?[{fn:o.onload}]:[],n._onloaderror=o.onloaderror?[{fn:o.onloaderror}]:[],n._onplayerror=o.onplayerror?[{fn:o.onplayerror}]:[],n._onpause=o.onpause?[{fn:o.onpause}]:[],n._onplay=o.onplay?[{fn:o.onplay}]:[],n._onstop=o.onstop?[{fn:o.onstop}]:[],n._onmute=o.onmute?[{fn:o.onmute}]:[],n._onvolume=o.onvolume?[{fn:o.onvolume}]:[],n._onrate=o.onrate?[{fn:o.onrate}]:[],n._onseek=o.onseek?[{fn:o.onseek}]:[],n._onunlock=o.onunlock?[{fn:o.onunlock}]:[],n._onresume=[],n._webAudio=e.usingWebAudio&&!n._html5,typeof e.ctx<"u"&&e.ctx&&e.autoUnlock&&e._unlockAudio(),e._howls.push(n),n._autoplay&&n._queue.push({event:"play",action:function(){n.play()}}),n._preload&&n._preload!=="none"&&n.load(),n},load:function(){var o=this,n=null;if(e.noAudio){o._emit("loaderror",null,"No audio support.");return}typeof o._src=="string"&&(o._src=[o._src]);for(var r=0;r<o._src.length;r++){var u,f;if(o._format&&o._format[r])u=o._format[r];else{if(f=o._src[r],typeof f!="string"){o._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}u=/^data:audio\/([^;,]+);/i.exec(f),u||(u=/\.([^.]+)$/.exec(f.split("?",1)[0])),u&&(u=u[1].toLowerCase())}if(u||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),u&&e.codecs(u)){n=o._src[r];break}}if(!n){o._emit("loaderror",null,"No codec support for selected audio sources.");return}return o._src=n,o._state="loading",window.location.protocol==="https:"&&n.slice(0,5)==="http:"&&(o._html5=!0,o._webAudio=!1),new i(o),o._webAudio&&l(o),o},play:function(o,n){var r=this,u=null;if(typeof o=="number")u=o,o=null;else{if(typeof o=="string"&&r._state==="loaded"&&!r._sprite[o])return null;if(typeof o>"u"&&(o="__default",!r._playLock)){for(var f=0,g=0;g<r._sounds.length;g++)r._sounds[g]._paused&&!r._sounds[g]._ended&&(f++,u=r._sounds[g]._id);f===1?o=null:u=null}}var m=u?r._soundById(u):r._inactiveSound();if(!m)return null;if(u&&!o&&(o=m._sprite||"__default"),r._state!=="loaded"){m._sprite=o,m._ended=!1;var v=m._id;return r._queue.push({event:"play",action:function(){r.play(v)}}),v}if(u&&!m._paused)return n||r._loadQueue("play"),m._id;r._webAudio&&e._autoResume();var k=Math.max(0,m._seek>0?m._seek:r._sprite[o][0]/1e3),C=Math.max(0,(r._sprite[o][0]+r._sprite[o][1])/1e3-k),V=C*1e3/Math.abs(m._rate),H=r._sprite[o][0]/1e3,U=(r._sprite[o][0]+r._sprite[o][1])/1e3;m._sprite=o,m._ended=!1;var W=function(){m._paused=!1,m._seek=k,m._start=H,m._stop=U,m._loop=!!(m._loop||r._sprite[o][2])};if(k>=U){r._ended(m);return}var S=m._node;if(r._webAudio){var xe=function(){r._playLock=!1,W(),r._refreshBuffer(m);var q=m._muted||r._muted?0:m._volume;S.gain.setValueAtTime(q,e.ctx.currentTime),m._playStart=e.ctx.currentTime,typeof S.bufferSource.start>"u"?m._loop?S.bufferSource.noteGrainOn(0,k,86400):S.bufferSource.noteGrainOn(0,k,C):m._loop?S.bufferSource.start(0,k,86400):S.bufferSource.start(0,k,C),V!==1/0&&(r._endTimers[m._id]=setTimeout(r._ended.bind(r,m),V)),n||setTimeout(function(){r._emit("play",m._id),r._loadQueue()},0)};e.state==="running"&&e.ctx.state!=="interrupted"?xe():(r._playLock=!0,r.once("resume",xe),r._clearTimer(m._id))}else{var ke=function(){S.currentTime=k,S.muted=m._muted||r._muted||e._muted||S.muted,S.volume=m._volume*e.volume(),S.playbackRate=m._rate;try{var q=S.play();if(q&&typeof Promise<"u"&&(q instanceof Promise||typeof q.then=="function")?(r._playLock=!0,W(),q.then(function(){r._playLock=!1,S._unlocked=!0,n?r._loadQueue():r._emit("play",m._id)}).catch(function(){r._playLock=!1,r._emit("playerror",m._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),m._ended=!0,m._paused=!0})):n||(r._playLock=!1,W(),r._emit("play",m._id)),S.playbackRate=m._rate,S.paused){r._emit("playerror",m._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");return}o!=="__default"||m._loop?r._endTimers[m._id]=setTimeout(r._ended.bind(r,m),V):(r._endTimers[m._id]=function(){r._ended(m),S.removeEventListener("ended",r._endTimers[m._id],!1)},S.addEventListener("ended",r._endTimers[m._id],!1))}catch(Ze){r._emit("playerror",m._id,Ze)}};S.src==="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"&&(S.src=r._src,S.load());var Ke=window&&window.ejecta||!S.readyState&&e._navigator.isCocoonJS;if(S.readyState>=3||Ke)ke();else{r._playLock=!0,r._state="loading";var Se=function(){r._state="loaded",ke(),S.removeEventListener(e._canPlayEvent,Se,!1)};S.addEventListener(e._canPlayEvent,Se,!1),r._clearTimer(m._id)}}return m._id},pause:function(o){var n=this;if(n._state!=="loaded"||n._playLock)return n._queue.push({event:"pause",action:function(){n.pause(o)}}),n;for(var r=n._getSoundIds(o),u=0;u<r.length;u++){n._clearTimer(r[u]);var f=n._soundById(r[u]);if(f&&!f._paused&&(f._seek=n.seek(r[u]),f._rateSeek=0,f._paused=!0,n._stopFade(r[u]),f._node))if(n._webAudio){if(!f._node.bufferSource)continue;typeof f._node.bufferSource.stop>"u"?f._node.bufferSource.noteOff(0):f._node.bufferSource.stop(0),n._cleanBuffer(f._node)}else(!isNaN(f._node.duration)||f._node.duration===1/0)&&f._node.pause();arguments[1]||n._emit("pause",f?f._id:null)}return n},stop:function(o,n){var r=this;if(r._state!=="loaded"||r._playLock)return r._queue.push({event:"stop",action:function(){r.stop(o)}}),r;for(var u=r._getSoundIds(o),f=0;f<u.length;f++){r._clearTimer(u[f]);var g=r._soundById(u[f]);g&&(g._seek=g._start||0,g._rateSeek=0,g._paused=!0,g._ended=!0,r._stopFade(u[f]),g._node&&(r._webAudio?g._node.bufferSource&&(typeof g._node.bufferSource.stop>"u"?g._node.bufferSource.noteOff(0):g._node.bufferSource.stop(0),r._cleanBuffer(g._node)):(!isNaN(g._node.duration)||g._node.duration===1/0)&&(g._node.currentTime=g._start||0,g._node.pause(),g._node.duration===1/0&&r._clearSound(g._node))),n||r._emit("stop",g._id))}return r},mute:function(o,n){var r=this;if(r._state!=="loaded"||r._playLock)return r._queue.push({event:"mute",action:function(){r.mute(o,n)}}),r;if(typeof n>"u")if(typeof o=="boolean")r._muted=o;else return r._muted;for(var u=r._getSoundIds(n),f=0;f<u.length;f++){var g=r._soundById(u[f]);g&&(g._muted=o,g._interval&&r._stopFade(g._id),r._webAudio&&g._node?g._node.gain.setValueAtTime(o?0:g._volume,e.ctx.currentTime):g._node&&(g._node.muted=e._muted?!0:o),r._emit("mute",g._id))}return r},volume:function(){var o=this,n=arguments,r,u;if(n.length===0)return o._volume;if(n.length===1||n.length===2&&typeof n[1]>"u"){var f=o._getSoundIds(),g=f.indexOf(n[0]);g>=0?u=parseInt(n[0],10):r=parseFloat(n[0])}else n.length>=2&&(r=parseFloat(n[0]),u=parseInt(n[1],10));var m;if(typeof r<"u"&&r>=0&&r<=1){if(o._state!=="loaded"||o._playLock)return o._queue.push({event:"volume",action:function(){o.volume.apply(o,n)}}),o;typeof u>"u"&&(o._volume=r),u=o._getSoundIds(u);for(var v=0;v<u.length;v++)m=o._soundById(u[v]),m&&(m._volume=r,n[2]||o._stopFade(u[v]),o._webAudio&&m._node&&!m._muted?m._node.gain.setValueAtTime(r,e.ctx.currentTime):m._node&&!m._muted&&(m._node.volume=r*e.volume()),o._emit("volume",m._id))}else return m=u?o._soundById(u):o._sounds[0],m?m._volume:0;return o},fade:function(o,n,r,u){var f=this;if(f._state!=="loaded"||f._playLock)return f._queue.push({event:"fade",action:function(){f.fade(o,n,r,u)}}),f;o=Math.min(Math.max(0,parseFloat(o)),1),n=Math.min(Math.max(0,parseFloat(n)),1),r=parseFloat(r),f.volume(o,u);for(var g=f._getSoundIds(u),m=0;m<g.length;m++){var v=f._soundById(g[m]);if(v){if(u||f._stopFade(g[m]),f._webAudio&&!v._muted){var k=e.ctx.currentTime,C=k+r/1e3;v._volume=o,v._node.gain.setValueAtTime(o,k),v._node.gain.linearRampToValueAtTime(n,C)}f._startFadeInterval(v,o,n,r,g[m],typeof u>"u")}}return f},_startFadeInterval:function(o,n,r,u,f,g){var m=this,v=n,k=r-n,C=Math.abs(k/.01),V=Math.max(4,C>0?u/C:u),H=Date.now();o._fadeTo=r,o._interval=setInterval(function(){var U=(Date.now()-H)/u;H=Date.now(),v+=k*U,v=Math.round(v*100)/100,k<0?v=Math.max(r,v):v=Math.min(r,v),m._webAudio?o._volume=v:m.volume(v,o._id,!0),g&&(m._volume=v),(r<n&&v<=r||r>n&&v>=r)&&(clearInterval(o._interval),o._interval=null,o._fadeTo=null,m.volume(r,o._id),m._emit("fade",o._id))},V)},_stopFade:function(o){var n=this,r=n._soundById(o);return r&&r._interval&&(n._webAudio&&r._node.gain.cancelScheduledValues(e.ctx.currentTime),clearInterval(r._interval),r._interval=null,n.volume(r._fadeTo,o),r._fadeTo=null,n._emit("fade",o)),n},loop:function(){var o=this,n=arguments,r,u,f;if(n.length===0)return o._loop;if(n.length===1)if(typeof n[0]=="boolean")r=n[0],o._loop=r;else return f=o._soundById(parseInt(n[0],10)),f?f._loop:!1;else n.length===2&&(r=n[0],u=parseInt(n[1],10));for(var g=o._getSoundIds(u),m=0;m<g.length;m++)f=o._soundById(g[m]),f&&(f._loop=r,o._webAudio&&f._node&&f._node.bufferSource&&(f._node.bufferSource.loop=r,r&&(f._node.bufferSource.loopStart=f._start||0,f._node.bufferSource.loopEnd=f._stop,o.playing(g[m])&&(o.pause(g[m],!0),o.play(g[m],!0)))));return o},rate:function(){var o=this,n=arguments,r,u;if(n.length===0)u=o._sounds[0]._id;else if(n.length===1){var f=o._getSoundIds(),g=f.indexOf(n[0]);g>=0?u=parseInt(n[0],10):r=parseFloat(n[0])}else n.length===2&&(r=parseFloat(n[0]),u=parseInt(n[1],10));var m;if(typeof r=="number"){if(o._state!=="loaded"||o._playLock)return o._queue.push({event:"rate",action:function(){o.rate.apply(o,n)}}),o;typeof u>"u"&&(o._rate=r),u=o._getSoundIds(u);for(var v=0;v<u.length;v++)if(m=o._soundById(u[v]),m){o.playing(u[v])&&(m._rateSeek=o.seek(u[v]),m._playStart=o._webAudio?e.ctx.currentTime:m._playStart),m._rate=r,o._webAudio&&m._node&&m._node.bufferSource?m._node.bufferSource.playbackRate.setValueAtTime(r,e.ctx.currentTime):m._node&&(m._node.playbackRate=r);var k=o.seek(u[v]),C=(o._sprite[m._sprite][0]+o._sprite[m._sprite][1])/1e3-k,V=C*1e3/Math.abs(m._rate);(o._endTimers[u[v]]||!m._paused)&&(o._clearTimer(u[v]),o._endTimers[u[v]]=setTimeout(o._ended.bind(o,m),V)),o._emit("rate",m._id)}}else return m=o._soundById(u),m?m._rate:o._rate;return o},seek:function(){var o=this,n=arguments,r,u;if(n.length===0)o._sounds.length&&(u=o._sounds[0]._id);else if(n.length===1){var f=o._getSoundIds(),g=f.indexOf(n[0]);g>=0?u=parseInt(n[0],10):o._sounds.length&&(u=o._sounds[0]._id,r=parseFloat(n[0]))}else n.length===2&&(r=parseFloat(n[0]),u=parseInt(n[1],10));if(typeof u>"u")return 0;if(typeof r=="number"&&(o._state!=="loaded"||o._playLock))return o._queue.push({event:"seek",action:function(){o.seek.apply(o,n)}}),o;var m=o._soundById(u);if(m)if(typeof r=="number"&&r>=0){var v=o.playing(u);v&&o.pause(u,!0),m._seek=r,m._ended=!1,o._clearTimer(u),!o._webAudio&&m._node&&!isNaN(m._node.duration)&&(m._node.currentTime=r);var k=function(){v&&o.play(u,!0),o._emit("seek",u)};if(v&&!o._webAudio){var C=function(){o._playLock?setTimeout(C,0):k()};setTimeout(C,0)}else k()}else if(o._webAudio){var V=o.playing(u)?e.ctx.currentTime-m._playStart:0,H=m._rateSeek?m._rateSeek-m._seek:0;return m._seek+(H+V*Math.abs(m._rate))}else return m._node.currentTime;return o},playing:function(o){var n=this;if(typeof o=="number"){var r=n._soundById(o);return r?!r._paused:!1}for(var u=0;u<n._sounds.length;u++)if(!n._sounds[u]._paused)return!0;return!1},duration:function(o){var n=this,r=n._duration,u=n._soundById(o);return u&&(r=n._sprite[u._sprite][1]/1e3),r},state:function(){return this._state},unload:function(){for(var o=this,n=o._sounds,r=0;r<n.length;r++)n[r]._paused||o.stop(n[r]._id),o._webAudio||(o._clearSound(n[r]._node),n[r]._node.removeEventListener("error",n[r]._errorFn,!1),n[r]._node.removeEventListener(e._canPlayEvent,n[r]._loadFn,!1),n[r]._node.removeEventListener("ended",n[r]._endFn,!1),e._releaseHtml5Audio(n[r]._node)),delete n[r]._node,o._clearTimer(n[r]._id);var u=e._howls.indexOf(o);u>=0&&e._howls.splice(u,1);var f=!0;for(r=0;r<e._howls.length;r++)if(e._howls[r]._src===o._src||o._src.indexOf(e._howls[r]._src)>=0){f=!1;break}return a&&f&&delete a[o._src],e.noAudio=!1,o._state="unloaded",o._sounds=[],o=null,null},on:function(o,n,r,u){var f=this,g=f["_on"+o];return typeof n=="function"&&g.push(u?{id:r,fn:n,once:u}:{id:r,fn:n}),f},off:function(o,n,r){var u=this,f=u["_on"+o],g=0;if(typeof n=="number"&&(r=n,n=null),n||r)for(g=0;g<f.length;g++){var m=r===f[g].id;if(n===f[g].fn&&m||!n&&m){f.splice(g,1);break}}else if(o)u["_on"+o]=[];else{var v=Object.keys(u);for(g=0;g<v.length;g++)v[g].indexOf("_on")===0&&Array.isArray(u[v[g]])&&(u[v[g]]=[])}return u},once:function(o,n,r){var u=this;return u.on(o,n,r,1),u},_emit:function(o,n,r){for(var u=this,f=u["_on"+o],g=f.length-1;g>=0;g--)(!f[g].id||f[g].id===n||o==="load")&&(setTimeout(function(m){m.call(this,n,r)}.bind(u,f[g].fn),0),f[g].once&&u.off(o,f[g].fn,f[g].id));return u._loadQueue(o),u},_loadQueue:function(o){var n=this;if(n._queue.length>0){var r=n._queue[0];r.event===o&&(n._queue.shift(),n._loadQueue()),o||r.action()}return n},_ended:function(o){var n=this,r=o._sprite;if(!n._webAudio&&o._node&&!o._node.paused&&!o._node.ended&&o._node.currentTime<o._stop)return setTimeout(n._ended.bind(n,o),100),n;var u=!!(o._loop||n._sprite[r][2]);if(n._emit("end",o._id),!n._webAudio&&u&&n.stop(o._id,!0).play(o._id),n._webAudio&&u){n._emit("play",o._id),o._seek=o._start||0,o._rateSeek=0,o._playStart=e.ctx.currentTime;var f=(o._stop-o._start)*1e3/Math.abs(o._rate);n._endTimers[o._id]=setTimeout(n._ended.bind(n,o),f)}return n._webAudio&&!u&&(o._paused=!0,o._ended=!0,o._seek=o._start||0,o._rateSeek=0,n._clearTimer(o._id),n._cleanBuffer(o._node),e._autoSuspend()),!n._webAudio&&!u&&n.stop(o._id,!0),n},_clearTimer:function(o){var n=this;if(n._endTimers[o]){if(typeof n._endTimers[o]!="function")clearTimeout(n._endTimers[o]);else{var r=n._soundById(o);r&&r._node&&r._node.removeEventListener("ended",n._endTimers[o],!1)}delete n._endTimers[o]}return n},_soundById:function(o){for(var n=this,r=0;r<n._sounds.length;r++)if(o===n._sounds[r]._id)return n._sounds[r];return null},_inactiveSound:function(){var o=this;o._drain();for(var n=0;n<o._sounds.length;n++)if(o._sounds[n]._ended)return o._sounds[n].reset();return new i(o)},_drain:function(){var o=this,n=o._pool,r=0,u=0;if(!(o._sounds.length<n)){for(u=0;u<o._sounds.length;u++)o._sounds[u]._ended&&r++;for(u=o._sounds.length-1;u>=0;u--){if(r<=n)return;o._sounds[u]._ended&&(o._webAudio&&o._sounds[u]._node&&o._sounds[u]._node.disconnect(0),o._sounds.splice(u,1),r--)}}},_getSoundIds:function(o){var n=this;if(typeof o>"u"){for(var r=[],u=0;u<n._sounds.length;u++)r.push(n._sounds[u]._id);return r}else return[o]},_refreshBuffer:function(o){var n=this;return o._node.bufferSource=e.ctx.createBufferSource(),o._node.bufferSource.buffer=a[n._src],o._panner?o._node.bufferSource.connect(o._panner):o._node.bufferSource.connect(o._node),o._node.bufferSource.loop=o._loop,o._loop&&(o._node.bufferSource.loopStart=o._start||0,o._node.bufferSource.loopEnd=o._stop||0),o._node.bufferSource.playbackRate.setValueAtTime(o._rate,e.ctx.currentTime),n},_cleanBuffer:function(o){var n=this,r=e._navigator&&e._navigator.vendor.indexOf("Apple")>=0;if(!o.bufferSource)return n;if(e._scratchBuffer&&o.bufferSource&&(o.bufferSource.onended=null,o.bufferSource.disconnect(0),r))try{o.bufferSource.buffer=e._scratchBuffer}catch{}return o.bufferSource=null,n},_clearSound:function(o){var n=/MSIE |Trident\//.test(e._navigator&&e._navigator.userAgent);n||(o.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var i=function(o){this._parent=o,this.init()};i.prototype={init:function(){var o=this,n=o._parent;return o._muted=n._muted,o._loop=n._loop,o._volume=n._volume,o._rate=n._rate,o._seek=0,o._paused=!0,o._ended=!0,o._sprite="__default",o._id=++e._counter,n._sounds.push(o),o.create(),o},create:function(){var o=this,n=o._parent,r=e._muted||o._muted||o._parent._muted?0:o._volume;return n._webAudio?(o._node=typeof e.ctx.createGain>"u"?e.ctx.createGainNode():e.ctx.createGain(),o._node.gain.setValueAtTime(r,e.ctx.currentTime),o._node.paused=!0,o._node.connect(e.masterGain)):e.noAudio||(o._node=e._obtainHtml5Audio(),o._errorFn=o._errorListener.bind(o),o._node.addEventListener("error",o._errorFn,!1),o._loadFn=o._loadListener.bind(o),o._node.addEventListener(e._canPlayEvent,o._loadFn,!1),o._endFn=o._endListener.bind(o),o._node.addEventListener("ended",o._endFn,!1),o._node.src=n._src,o._node.preload=n._preload===!0?"auto":n._preload,o._node.volume=r*e.volume(),o._node.load()),o},reset:function(){var o=this,n=o._parent;return o._muted=n._muted,o._loop=n._loop,o._volume=n._volume,o._rate=n._rate,o._seek=0,o._rateSeek=0,o._paused=!0,o._ended=!0,o._sprite="__default",o._id=++e._counter,o},_errorListener:function(){var o=this;o._parent._emit("loaderror",o._id,o._node.error?o._node.error.code:0),o._node.removeEventListener("error",o._errorFn,!1)},_loadListener:function(){var o=this,n=o._parent;n._duration=Math.ceil(o._node.duration*10)/10,Object.keys(n._sprite).length===0&&(n._sprite={__default:[0,n._duration*1e3]}),n._state!=="loaded"&&(n._state="loaded",n._emit("load"),n._loadQueue()),o._node.removeEventListener(e._canPlayEvent,o._loadFn,!1)},_endListener:function(){var o=this,n=o._parent;n._duration===1/0&&(n._duration=Math.ceil(o._node.duration*10)/10,n._sprite.__default[1]===1/0&&(n._sprite.__default[1]=n._duration*1e3),n._ended(o)),o._node.removeEventListener("ended",o._endFn,!1)}};var a={},l=function(o){var n=o._src;if(a[n]){o._duration=a[n].duration,p(o);return}if(/^data:[^;]+;base64,/.test(n)){for(var r=atob(n.split(",")[1]),u=new Uint8Array(r.length),f=0;f<r.length;++f)u[f]=r.charCodeAt(f);d(u.buffer,o)}else{var g=new XMLHttpRequest;g.open(o._xhr.method,n,!0),g.withCredentials=o._xhr.withCredentials,g.responseType="arraybuffer",o._xhr.headers&&Object.keys(o._xhr.headers).forEach(function(m){g.setRequestHeader(m,o._xhr.headers[m])}),g.onload=function(){var m=(g.status+"")[0];if(m!=="0"&&m!=="2"&&m!=="3"){o._emit("loaderror",null,"Failed loading audio file with status: "+g.status+".");return}d(g.response,o)},g.onerror=function(){o._webAudio&&(o._html5=!0,o._webAudio=!1,o._sounds=[],delete a[n],o.load())},h(g)}},h=function(o){try{o.send()}catch{o.onerror()}},d=function(o,n){var r=function(){n._emit("loaderror",null,"Decoding audio data failed.")},u=function(f){f&&n._sounds.length>0?(a[n._src]=f,p(n,f)):r()};typeof Promise<"u"&&e.ctx.decodeAudioData.length===1?e.ctx.decodeAudioData(o).then(u).catch(r):e.ctx.decodeAudioData(o,u,r)},p=function(o,n){n&&!o._duration&&(o._duration=n.duration),Object.keys(o._sprite).length===0&&(o._sprite={__default:[0,o._duration*1e3]}),o._state!=="loaded"&&(o._state="loaded",o._emit("load"),o._loadQueue())},b=function(){if(e.usingWebAudio){try{typeof AudioContext<"u"?e.ctx=new AudioContext:typeof webkitAudioContext<"u"?e.ctx=new webkitAudioContext:e.usingWebAudio=!1}catch{e.usingWebAudio=!1}e.ctx||(e.usingWebAudio=!1);var o=/iP(hone|od|ad)/.test(e._navigator&&e._navigator.platform),n=e._navigator&&e._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),r=n?parseInt(n[1],10):null;if(o&&r&&r<9){var u=/safari/.test(e._navigator&&e._navigator.userAgent.toLowerCase());e._navigator&&!u&&(e.usingWebAudio=!1)}e.usingWebAudio&&(e.masterGain=typeof e.ctx.createGain>"u"?e.ctx.createGainNode():e.ctx.createGain(),e.masterGain.gain.setValueAtTime(e._muted?0:e._volume,e.ctx.currentTime),e.masterGain.connect(e.ctx.destination)),e._setup()}};c.Howler=e,c.Howl=s,typeof ee<"u"?(ee.HowlerGlobal=t,ee.Howler=e,ee.Howl=s,ee.Sound=i):typeof window<"u"&&(window.HowlerGlobal=t,window.Howler=e,window.Howl=s,window.Sound=i)})();/*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */(function(){HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(e){var s=this;if(!s.ctx||!s.ctx.listener)return s;for(var i=s._howls.length-1;i>=0;i--)s._howls[i].stereo(e);return s},HowlerGlobal.prototype.pos=function(e,s,i){var a=this;if(!a.ctx||!a.ctx.listener)return a;if(s=typeof s!="number"?a._pos[1]:s,i=typeof i!="number"?a._pos[2]:i,typeof e=="number")a._pos=[e,s,i],typeof a.ctx.listener.positionX<"u"?(a.ctx.listener.positionX.setTargetAtTime(a._pos[0],Howler.ctx.currentTime,.1),a.ctx.listener.positionY.setTargetAtTime(a._pos[1],Howler.ctx.currentTime,.1),a.ctx.listener.positionZ.setTargetAtTime(a._pos[2],Howler.ctx.currentTime,.1)):a.ctx.listener.setPosition(a._pos[0],a._pos[1],a._pos[2]);else return a._pos;return a},HowlerGlobal.prototype.orientation=function(e,s,i,a,l,h){var d=this;if(!d.ctx||!d.ctx.listener)return d;var p=d._orientation;if(s=typeof s!="number"?p[1]:s,i=typeof i!="number"?p[2]:i,a=typeof a!="number"?p[3]:a,l=typeof l!="number"?p[4]:l,h=typeof h!="number"?p[5]:h,typeof e=="number")d._orientation=[e,s,i,a,l,h],typeof d.ctx.listener.forwardX<"u"?(d.ctx.listener.forwardX.setTargetAtTime(e,Howler.ctx.currentTime,.1),d.ctx.listener.forwardY.setTargetAtTime(s,Howler.ctx.currentTime,.1),d.ctx.listener.forwardZ.setTargetAtTime(i,Howler.ctx.currentTime,.1),d.ctx.listener.upX.setTargetAtTime(a,Howler.ctx.currentTime,.1),d.ctx.listener.upY.setTargetAtTime(l,Howler.ctx.currentTime,.1),d.ctx.listener.upZ.setTargetAtTime(h,Howler.ctx.currentTime,.1)):d.ctx.listener.setOrientation(e,s,i,a,l,h);else return p;return d},Howl.prototype.init=(function(e){return function(s){var i=this;return i._orientation=s.orientation||[1,0,0],i._stereo=s.stereo||null,i._pos=s.pos||null,i._pannerAttr={coneInnerAngle:typeof s.coneInnerAngle<"u"?s.coneInnerAngle:360,coneOuterAngle:typeof s.coneOuterAngle<"u"?s.coneOuterAngle:360,coneOuterGain:typeof s.coneOuterGain<"u"?s.coneOuterGain:0,distanceModel:typeof s.distanceModel<"u"?s.distanceModel:"inverse",maxDistance:typeof s.maxDistance<"u"?s.maxDistance:1e4,panningModel:typeof s.panningModel<"u"?s.panningModel:"HRTF",refDistance:typeof s.refDistance<"u"?s.refDistance:1,rolloffFactor:typeof s.rolloffFactor<"u"?s.rolloffFactor:1},i._onstereo=s.onstereo?[{fn:s.onstereo}]:[],i._onpos=s.onpos?[{fn:s.onpos}]:[],i._onorientation=s.onorientation?[{fn:s.onorientation}]:[],e.call(this,s)}})(Howl.prototype.init),Howl.prototype.stereo=function(e,s){var i=this;if(!i._webAudio)return i;if(i._state!=="loaded")return i._queue.push({event:"stereo",action:function(){i.stereo(e,s)}}),i;var a=typeof Howler.ctx.createStereoPanner>"u"?"spatial":"stereo";if(typeof s>"u")if(typeof e=="number")i._stereo=e,i._pos=[e,0,0];else return i._stereo;for(var l=i._getSoundIds(s),h=0;h<l.length;h++){var d=i._soundById(l[h]);if(d)if(typeof e=="number")d._stereo=e,d._pos=[e,0,0],d._node&&(d._pannerAttr.panningModel="equalpower",(!d._panner||!d._panner.pan)&&t(d,a),a==="spatial"?typeof d._panner.positionX<"u"?(d._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),d._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),d._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):d._panner.setPosition(e,0,0):d._panner.pan.setValueAtTime(e,Howler.ctx.currentTime)),i._emit("stereo",d._id);else return d._stereo}return i},Howl.prototype.pos=function(e,s,i,a){var l=this;if(!l._webAudio)return l;if(l._state!=="loaded")return l._queue.push({event:"pos",action:function(){l.pos(e,s,i,a)}}),l;if(s=typeof s!="number"?0:s,i=typeof i!="number"?-.5:i,typeof a>"u")if(typeof e=="number")l._pos=[e,s,i];else return l._pos;for(var h=l._getSoundIds(a),d=0;d<h.length;d++){var p=l._soundById(h[d]);if(p)if(typeof e=="number")p._pos=[e,s,i],p._node&&((!p._panner||p._panner.pan)&&t(p,"spatial"),typeof p._panner.positionX<"u"?(p._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),p._panner.positionY.setValueAtTime(s,Howler.ctx.currentTime),p._panner.positionZ.setValueAtTime(i,Howler.ctx.currentTime)):p._panner.setPosition(e,s,i)),l._emit("pos",p._id);else return p._pos}return l},Howl.prototype.orientation=function(e,s,i,a){var l=this;if(!l._webAudio)return l;if(l._state!=="loaded")return l._queue.push({event:"orientation",action:function(){l.orientation(e,s,i,a)}}),l;if(s=typeof s!="number"?l._orientation[1]:s,i=typeof i!="number"?l._orientation[2]:i,typeof a>"u")if(typeof e=="number")l._orientation=[e,s,i];else return l._orientation;for(var h=l._getSoundIds(a),d=0;d<h.length;d++){var p=l._soundById(h[d]);if(p)if(typeof e=="number")p._orientation=[e,s,i],p._node&&(p._panner||(p._pos||(p._pos=l._pos||[0,0,-.5]),t(p,"spatial")),typeof p._panner.orientationX<"u"?(p._panner.orientationX.setValueAtTime(e,Howler.ctx.currentTime),p._panner.orientationY.setValueAtTime(s,Howler.ctx.currentTime),p._panner.orientationZ.setValueAtTime(i,Howler.ctx.currentTime)):p._panner.setOrientation(e,s,i)),l._emit("orientation",p._id);else return p._orientation}return l},Howl.prototype.pannerAttr=function(){var e=this,s=arguments,i,a,l;if(!e._webAudio)return e;if(s.length===0)return e._pannerAttr;if(s.length===1)if(typeof s[0]=="object")i=s[0],typeof a>"u"&&(i.pannerAttr||(i.pannerAttr={coneInnerAngle:i.coneInnerAngle,coneOuterAngle:i.coneOuterAngle,coneOuterGain:i.coneOuterGain,distanceModel:i.distanceModel,maxDistance:i.maxDistance,refDistance:i.refDistance,rolloffFactor:i.rolloffFactor,panningModel:i.panningModel}),e._pannerAttr={coneInnerAngle:typeof i.pannerAttr.coneInnerAngle<"u"?i.pannerAttr.coneInnerAngle:e._coneInnerAngle,coneOuterAngle:typeof i.pannerAttr.coneOuterAngle<"u"?i.pannerAttr.coneOuterAngle:e._coneOuterAngle,coneOuterGain:typeof i.pannerAttr.coneOuterGain<"u"?i.pannerAttr.coneOuterGain:e._coneOuterGain,distanceModel:typeof i.pannerAttr.distanceModel<"u"?i.pannerAttr.distanceModel:e._distanceModel,maxDistance:typeof i.pannerAttr.maxDistance<"u"?i.pannerAttr.maxDistance:e._maxDistance,refDistance:typeof i.pannerAttr.refDistance<"u"?i.pannerAttr.refDistance:e._refDistance,rolloffFactor:typeof i.pannerAttr.rolloffFactor<"u"?i.pannerAttr.rolloffFactor:e._rolloffFactor,panningModel:typeof i.pannerAttr.panningModel<"u"?i.pannerAttr.panningModel:e._panningModel});else return l=e._soundById(parseInt(s[0],10)),l?l._pannerAttr:e._pannerAttr;else s.length===2&&(i=s[0],a=parseInt(s[1],10));for(var h=e._getSoundIds(a),d=0;d<h.length;d++)if(l=e._soundById(h[d]),l){var p=l._pannerAttr;p={coneInnerAngle:typeof i.coneInnerAngle<"u"?i.coneInnerAngle:p.coneInnerAngle,coneOuterAngle:typeof i.coneOuterAngle<"u"?i.coneOuterAngle:p.coneOuterAngle,coneOuterGain:typeof i.coneOuterGain<"u"?i.coneOuterGain:p.coneOuterGain,distanceModel:typeof i.distanceModel<"u"?i.distanceModel:p.distanceModel,maxDistance:typeof i.maxDistance<"u"?i.maxDistance:p.maxDistance,refDistance:typeof i.refDistance<"u"?i.refDistance:p.refDistance,rolloffFactor:typeof i.rolloffFactor<"u"?i.rolloffFactor:p.rolloffFactor,panningModel:typeof i.panningModel<"u"?i.panningModel:p.panningModel};var b=l._panner;b||(l._pos||(l._pos=e._pos||[0,0,-.5]),t(l,"spatial"),b=l._panner),b.coneInnerAngle=p.coneInnerAngle,b.coneOuterAngle=p.coneOuterAngle,b.coneOuterGain=p.coneOuterGain,b.distanceModel=p.distanceModel,b.maxDistance=p.maxDistance,b.refDistance=p.refDistance,b.rolloffFactor=p.rolloffFactor,b.panningModel=p.panningModel}return e},Sound.prototype.init=(function(e){return function(){var s=this,i=s._parent;s._orientation=i._orientation,s._stereo=i._stereo,s._pos=i._pos,s._pannerAttr=i._pannerAttr,e.call(this),s._stereo?i.stereo(s._stereo):s._pos&&i.pos(s._pos[0],s._pos[1],s._pos[2],s._id)}})(Sound.prototype.init),Sound.prototype.reset=(function(e){return function(){var s=this,i=s._parent;return s._orientation=i._orientation,s._stereo=i._stereo,s._pos=i._pos,s._pannerAttr=i._pannerAttr,s._stereo?i.stereo(s._stereo):s._pos?i.pos(s._pos[0],s._pos[1],s._pos[2],s._id):s._panner&&(s._panner.disconnect(0),s._panner=void 0,i._refreshBuffer(s)),e.call(this)}})(Sound.prototype.reset);var t=function(e,s){s=s||"spatial",s==="spatial"?(e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.panningModel=e._pannerAttr.panningModel,typeof e._panner.positionX<"u"?(e._panner.positionX.setValueAtTime(e._pos[0],Howler.ctx.currentTime),e._panner.positionY.setValueAtTime(e._pos[1],Howler.ctx.currentTime),e._panner.positionZ.setValueAtTime(e._pos[2],Howler.ctx.currentTime)):e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),typeof e._panner.orientationX<"u"?(e._panner.orientationX.setValueAtTime(e._orientation[0],Howler.ctx.currentTime),e._panner.orientationY.setValueAtTime(e._orientation[1],Howler.ctx.currentTime),e._panner.orientationZ.setValueAtTime(e._orientation[2],Howler.ctx.currentTime)):e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2])):(e._panner=Howler.ctx.createStereoPanner(),e._panner.pan.setValueAtTime(e._stereo,Howler.ctx.currentTime)),e._panner.connect(e._node),e._paused||e._parent.pause(e._id,!0).play(e._id,!0)}})()})(pe)),pe}var Z=bt();class yt{sounds={};music=null;currentMusicTrack=null;masterVolume=1;musicVolume=.5;sfxVolume=.7;uiVolume=.8;isInitialized=!1;muted=!1;audioContext=null;activeTicks=new Map;tickIdCounter=0;soundPaths={"music-menu":"/audio/music-menu.mp3","music-gameplay":"/audio/music-gameplay.mp3","music-level-1":"/audio/music-level-1.mp3","music-level-2":"/audio/music-level-2.mp3","music-level-3":"/audio/music-level-3.mp3","music-level-4":"/audio/music-level-4.mp3","sfx-bomb-place":"/audio/sfx-bomb-place.mp3","sfx-explosion":"/audio/sfx-explosion.mp3","sfx-fuse":"/audio/sfx-bomb-place.mp3","sfx-powerup":"/audio/sfx-powerup.mp3","sfx-enemy-death":"/audio/sfx-enemy-death.mp3","sfx-player-damage":"/audio/sfx-player-damage.mp3","sfx-victory":"/audio/sfx-victory.mp3","sfx-defeat":"/audio/sfx-defeat.mp3","voice-im-the-man":"/audio/voice-im-the-man.mp3","voice-get-outta-here":"/audio/voice-get-outta-here.mp3","voice-boom":"/audio/voice-boom.mp3","voice-no-mercy":"/audio/voice-no-mercy.mp3","sfx-level-complete":"/audio/sfx-victory.mp3","sfx-level-start":"/audio/sfx-powerup.mp3"};constructor(){}initialize(){this.isInitialized||(this.loadAllSounds(),this.isInitialized=!0,console.log("[AudioEngine] Initialized"))}loadAllSounds(){Object.entries(this.soundPaths).forEach(([t,e])=>{t.startsWith("music-")||(this.sounds[t]=new Z.Howl({src:[e],volume:this.sfxVolume*this.masterVolume,preload:!0,html5:!1,onloaderror:(s,i)=>{console.warn(`[AudioEngine] Failed to load sound: ${t}`,i)}}))})}playSound(t){if(this.isInitialized||this.initialize(),this.muted)return;const e=this.sounds[t];e?(e.volume(this.sfxVolume*this.masterVolume),e.play()):console.warn(`[AudioEngine] Sound not found: ${t}`)}playMenuMusic(){this.playMusicTrack("music-menu")}playGameplayMusic(){this.playMusicTrack("music-gameplay")}playLevelMusic(t){const s=`music-level-${(t-1)%4+1}`;this.playMusicTrack(s)}playMusicTrack(t){if(this.isInitialized||this.initialize(),this.currentMusicTrack===t&&this.music?.playing())return;this.stopMusic();const e=this.soundPaths[t];if(!e){console.warn(`[AudioEngine] Music track not found: ${t}`);return}this.music=new Z.Howl({src:[e],volume:this.musicVolume*this.masterVolume,loop:!0,html5:!0,onloaderror:(s,i)=>{console.warn(`[AudioEngine] Failed to load music: ${t}`,i)}}),this.muted||this.music.play(),this.currentMusicTrack=t}stopMusic(){this.music&&(this.music.stop(),this.music.unload(),this.music=null),this.currentMusicTrack=null}pauseMusic(){this.music&&this.music.pause()}resumeMusic(){this.music&&!this.muted&&this.music.play()}playBombPlace(){this.playSound("sfx-bomb-place")}playExplosion(){if(this.isInitialized||this.initialize(),this.muted)return;const t=this.sounds["sfx-explosion"];t&&(t.volume(Math.min(1,this.sfxVolume*this.masterVolume*1.5)),t.play())}playFuseTick(){if(this.isInitialized||this.initialize(),this.muted)return-1;this.audioContext||(this.audioContext=new(window.AudioContext||window.webkitAudioContext));const t=++this.tickIdCounter;this.playProceduralTick(1);let e=300,s=0;const i=()=>{if(!this.activeTicks.has(t))return;s++;const l=Math.min(s/10,1.5);this.playProceduralTick(.6+l*.4),e=Math.max(80,e*.85);const h=window.setTimeout(i,e);this.activeTicks.set(t,{interval:this.activeTicks.get(t)?.interval||0,timeout:h})},a=window.setTimeout(i,e);return this.activeTicks.set(t,{interval:0,timeout:a}),window.setTimeout(()=>this.stopFuseTick(t),3e3),t}stopFuseTick(t){const e=this.activeTicks.get(t);e&&(window.clearTimeout(e.timeout),window.clearInterval(e.interval),this.activeTicks.delete(t))}stopAllFuseTicks(){this.activeTicks.forEach((t,e)=>{window.clearTimeout(t.timeout),window.clearInterval(t.interval)}),this.activeTicks.clear()}playProceduralTick(t=1){if(!this.audioContext||this.muted)return;const e=this.audioContext,s=e.currentTime;e.state==="suspended"&&e.resume();const i=e.createOscillator(),a=e.createGain(),l=e.createBiquadFilter();i.type="square",i.frequency.setValueAtTime(1200,s),i.frequency.exponentialRampToValueAtTime(400,s+.05),l.type="bandpass",l.frequency.setValueAtTime(2e3,s),l.Q.setValueAtTime(5,s);const h=t*this.sfxVolume*this.masterVolume*.4;a.gain.setValueAtTime(0,s),a.gain.linearRampToValueAtTime(h,s+.005),a.gain.exponentialRampToValueAtTime(.01,s+.08),i.connect(l),l.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.1);const d=e.createOscillator(),p=e.createGain();d.type="sine",d.frequency.setValueAtTime(80,s),d.frequency.exponentialRampToValueAtTime(40,s+.05),p.gain.setValueAtTime(h*.8,s),p.gain.exponentialRampToValueAtTime(.01,s+.1),d.connect(p),p.connect(e.destination),d.start(s),d.stop(s+.15)}playPowerUp(){this.playSound("sfx-powerup")}playEnemyDeath(){this.playSound("sfx-enemy-death")}playPlayerDamage(){this.playSound("sfx-player-damage")}playVictory(){this.playSound("sfx-victory")}playDefeat(){this.playSound("sfx-defeat")}playLevelComplete(){if(this.isInitialized||this.initialize(),this.muted)return;const t=this.sounds["sfx-level-complete"];t&&(t.volume(Math.min(1,this.sfxVolume*this.masterVolume*1.8)),t.play())}playLevelStart(){if(this.isInitialized||this.initialize(),this.muted)return;const t=this.sounds["sfx-level-start"];t&&(t.volume(Math.min(1,this.sfxVolume*this.masterVolume*1.3)),t.play())}playSoundEffect(t){t==="ui-select"?this.playSound("sfx-bomb-place"):this.playSound(t)}voiceAffirmations=["voice-im-the-man","voice-get-outta-here","voice-boom","voice-no-mercy"];playRandomAffirmation(){if(this.isInitialized||this.initialize(),this.muted||Math.random()>.3)return;const t=Math.floor(Math.random()*this.voiceAffirmations.length),e=this.voiceAffirmations[t],s=this.sounds[e];s&&(s.volume(Math.min(1,this.sfxVolume*this.masterVolume*1.2)),s.play())}setMasterVolume(t){this.masterVolume=Math.max(0,Math.min(1,t)),Z.Howler.volume(this.masterVolume),this.updateAllVolumes()}setMusicVolume(t){this.musicVolume=Math.max(0,Math.min(1,t)),this.music&&this.music.volume(this.musicVolume*this.masterVolume)}setSfxVolume(t){this.sfxVolume=Math.max(0,Math.min(1,t)),Object.values(this.sounds).forEach(e=>{e.volume(this.sfxVolume*this.masterVolume)})}setUiVolume(t){this.uiVolume=Math.max(0,Math.min(1,t))}updateAllVolumes(){this.setMusicVolume(this.musicVolume),this.setSfxVolume(this.sfxVolume)}getVolumes(){return{master:this.masterVolume,music:this.musicVolume,sfx:this.sfxVolume,ui:this.uiVolume}}mute(){this.muted=!0,Z.Howler.mute(!0)}unmute(){this.muted=!1,Z.Howler.mute(!1)}toggleMute(){return this.muted?this.unmute():this.mute(),this.muted}isMuted(){return this.muted}playSfx(t=440,e=.1){this.isInitialized||this.playTone(t,e)}playTone(t,e){try{const s=new(window.AudioContext||window.webkitAudioContext),i=s.createOscillator(),a=s.createGain();i.frequency.value=t,i.type="square",a.gain.setValueAtTime(.1*this.sfxVolume*this.masterVolume,s.currentTime),a.gain.exponentialRampToValueAtTime(.01,s.currentTime+e),i.connect(a),a.connect(s.destination),i.start(),i.stop(s.currentTime+e)}catch{console.warn("[AudioEngine] Web Audio API not available")}}isSupported(){return Z.Howler.codecs("mp3")}preload(){this.isInitialized||this.initialize()}}const j=new yt;class vt{container;_currentScreen=P.MAIN;onStartGame;onResumeGame;onQuitGame;selectedLevel=1;constructor(t,e,s){this.onStartGame=t,this.onResumeGame=e,this.onQuitGame=s,this.container=document.createElement("div"),this.container.id="game-menus",this.container.className="game-menus",document.body.appendChild(this.container),this.injectStyles(),this.showScreen(P.MAIN)}injectStyles(){if(document.getElementById("game-menu-styles"))return;const t=document.createElement("style");t.id="game-menu-styles",t.textContent=`
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
    `,document.head.appendChild(t)}showScreen(t){switch(this._currentScreen=t,this.container.innerHTML="",this.container.className="game-menus active",t){case P.MAIN:this.renderMainMenu();break;case P.SETTINGS:this.renderSettings();break;case P.HOW_TO_PLAY:this.renderHowToPlay();break;case P.STATS:this.renderStats();break;case P.LEVEL_SELECT:this.renderLevelSelect();break}}renderMainMenu(){const t=document.createElement("div");t.className="menu-panel",t.innerHTML=`
      <h1 class="menu-title">BLASTFORGE</h1>
      <p class="menu-subtitle">Master the Fuse. Control the Chaos.</p>
      <button class="menu-button primary" data-action="play">▶ Play</button>
      <button class="menu-button" data-action="levels">🎮 Select Level</button>
      <button class="menu-button" data-action="stats">📊 Statistics</button>
      <button class="menu-button" data-action="settings">⚙ Settings</button>
      <button class="menu-button" data-action="help">❓ How to Play</button>
    `,this.bindButton(t,'[data-action="play"]',()=>this.onStartGame(this.selectedLevel)),this.bindButton(t,'[data-action="levels"]',()=>this.showScreen(P.LEVEL_SELECT)),this.bindButton(t,'[data-action="stats"]',()=>this.showScreen(P.STATS)),this.bindButton(t,'[data-action="settings"]',()=>this.showScreen(P.SETTINGS)),this.bindButton(t,'[data-action="help"]',()=>this.showScreen(P.HOW_TO_PLAY)),this.container.appendChild(t)}renderSettings(){const t=T.getSettings(),e=document.createElement("div");e.className="menu-panel",e.innerHTML=`
      <h2 class="menu-title" style="font-size: 1.8rem;">Settings</h2>
      
      <div class="menu-section">
        <div class="menu-section-title">Audio</div>
        <div class="setting-row">
          <span class="setting-label">🔇 Mute All</span>
          <div class="setting-control">
            <div class="toggle ${j.isMuted()?"active":""}" id="mute-toggle"></div>
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-label">🎵 Music Volume</span>
          <div class="setting-control">
            <input type="range" class="slider" id="music-volume" min="0" max="100" value="${Math.round(t.musicVolume*100)}">
            <span id="music-value">${Math.round(t.musicVolume*100)}%</span>
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-label">🔊 SFX Volume</span>
          <div class="setting-control">
            <input type="range" class="slider" id="sfx-volume" min="0" max="100" value="${Math.round(t.sfxVolume*100)}">
            <span id="sfx-value">${Math.round(t.sfxVolume*100)}%</span>
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-label">🔔 UI Volume</span>
          <div class="setting-control">
            <input type="range" class="slider" id="ui-volume" min="0" max="100" value="${Math.round(t.uiVolume*100)}">
            <span id="ui-value">${Math.round(t.uiVolume*100)}%</span>
          </div>
        </div>
      </div>
      
      <div class="menu-section">
        <div class="menu-section-title">Display</div>
        <div class="setting-row">
          <span class="setting-label">Fullscreen</span>
          <div class="setting-control">
            <div class="toggle ${t.fullscreen?"active":""}" id="fullscreen-toggle"></div>
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-label">Show FPS</span>
          <div class="setting-control">
            <div class="toggle ${t.showFPS?"active":""}" id="fps-toggle"></div>
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-label">Vibration</span>
          <div class="setting-control">
            <div class="toggle ${t.vibration?"active":""}" id="vibration-toggle"></div>
          </div>
        </div>
      </div>
      
      <button class="back-button" data-action="back">← Back</button>
    `;const s=e.querySelector("#music-volume"),i=e.querySelector("#music-value");s?.addEventListener("input",()=>{const p=parseInt(s.value)/100;i.textContent=`${s.value}%`,T.setMusicVolume(p),j.setMusicVolume(p)});const a=e.querySelector("#sfx-volume"),l=e.querySelector("#sfx-value");a?.addEventListener("input",()=>{const p=parseInt(a.value)/100;l.textContent=`${a.value}%`,T.setSfxVolume(p),j.setSfxVolume(p)});const h=e.querySelector("#ui-volume"),d=e.querySelector("#ui-value");h?.addEventListener("input",()=>{const p=parseInt(h.value)/100;d.textContent=`${h.value}%`,T.setUiVolume(p),j.setUiVolume(p)}),this.bindToggle(e,"#mute-toggle",()=>{const p=j.toggleMute(),b=e.querySelector("#mute-toggle");b&&b.classList.toggle("active",p)}),this.bindToggle(e,"#fullscreen-toggle",()=>{const p=T.getSettings();T.setFullscreen(!p.fullscreen)}),this.bindToggle(e,"#fps-toggle",()=>{const p=T.getSettings();T.setShowFPS(!p.showFPS)}),this.bindToggle(e,"#vibration-toggle",()=>{const p=T.getSettings();T.setVibration(!p.vibration)}),this.bindButton(e,'[data-action="back"]',()=>this.showScreen(P.MAIN)),this.container.appendChild(e)}renderHowToPlay(){const t=document.createElement("div");t.className="menu-panel",t.innerHTML=`
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
    `,this.bindButton(t,'[data-action="back"]',()=>this.showScreen(P.MAIN)),this.container.appendChild(t)}renderStats(){const t=T.getStats(),e=document.createElement("div");e.className="menu-panel",e.innerHTML=`
      <h2 class="menu-title" style="font-size: 1.8rem;">Statistics</h2>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${t.totalWins}</div>
          <div class="stat-label">Wins</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${t.totalLosses}</div>
          <div class="stat-label">Losses</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${this.formatTime(t.totalPlayTime)}</div>
          <div class="stat-label">Play Time</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${t.bombsPlaced}</div>
          <div class="stat-label">Bombs Placed</div>
        </div>
      </div>
      
      <div class="menu-section">
        <div class="menu-section-title">Level Progress</div>
        <p style="color: #ccd6f6;">
          Levels Completed: ${t.levelsCompleted.length} / ${R.length}
        </p>
      </div>
      
      <button class="menu-button secondary" data-action="reset" style="margin-top: 10px;">
        Reset All Stats
      </button>
      <button class="back-button" data-action="back">← Back</button>
    `,this.bindButton(e,'[data-action="reset"]',()=>{confirm("Are you sure you want to reset all statistics?")&&(T.resetStats(),this.renderStats())}),this.bindButton(e,'[data-action="back"]',()=>this.showScreen(P.MAIN)),this.container.appendChild(e)}renderLevelSelect(){const t=T.getStats(),e=document.createElement("div");e.className="menu-panel";let s='<div class="level-grid">';R.forEach((i,a)=>{const l=t.levelsCompleted.includes(i.id),h=i.id===this.selectedLevel;s+=`
        <div class="level-card ${h?"selected":""} " 
             data-level="${i.id}">
          <div class="level-number">Level ${i.id}</div>
          <div class="level-name">${i.name}</div>
          ${l?"✓ Completed":""}
          
        </div>
      `}),s+="</div>",e.innerHTML=`
      <h2 class="menu-title" style="font-size: 1.8rem;">Select Level</h2>
      <p class="menu-subtitle">Complete levels to unlock more</p>
      ${s}
      <button class="menu-button primary" data-action="start">Start Level</button>
      <button class="back-button" data-action="back">← Back</button>
    `,e.querySelectorAll(".level-card").forEach(i=>{i.addEventListener("click",()=>{const a=parseInt(i.getAttribute("data-level")||"1");this.selectedLevel=a,console.log(`[MenuManager] Selected level: ${this.selectedLevel}`),e.querySelectorAll(".level-card").forEach(l=>l.classList.remove("selected")),i.classList.add("selected"),j.playSoundEffect("ui-select")})}),this.bindButton(e,'[data-action="start"]',()=>this.onStartGame(this.selectedLevel)),this.bindButton(e,'[data-action="back"]',()=>this.showScreen(P.MAIN)),this.container.appendChild(e)}showPauseMenu(){this.container.innerHTML="",this.container.className="game-menus active";const t=document.createElement("div");t.className="menu-panel pause-overlay",t.innerHTML=`
      <h2 class="pause-title">PAUSED</h2>
      <button class="menu-button primary" data-action="resume">▶ Resume</button>
      <button class="menu-button" data-action="restart">↻ Restart Level</button>
      <button class="menu-button" data-action="quit">✕ Quit to Menu</button>
    `,this.bindButton(t,'[data-action="resume"]',()=>this.onResumeGame()),this.bindButton(t,'[data-action="restart"]',()=>this.onStartGame(this.selectedLevel)),this.bindButton(t,'[data-action="quit"]',()=>this.onQuitGame()),this.container.appendChild(t)}showGameOver(t,e){this.container.innerHTML="",this.container.className="game-menus active";const s=document.createElement("div");s.className="menu-panel";const i=t?"VICTORY!":"GAME OVER",a=t?"victory":"defeat";let l="";e&&(l=`
        <div class="stats-grid" style="margin: 20px 0;">
          <div class="stat-card">
            <div class="stat-value">${this.formatTime(e.time)}</div>
            <div class="stat-label">Time</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${e.bombs}</div>
            <div class="stat-label">Bombs</div>
          </div>
        </div>
      `),s.innerHTML=`
      <h2 class="game-over-title ${a}">${i}</h2>
      ${l}
      <button class="menu-button primary" data-action="next">
        ${t?"Next Level →":"Try Again ↻"}
      </button>
      <button class="menu-button" data-action="menu">Main Menu</button>
    `,this.bindButton(s,'[data-action="next"]',()=>{if(t){const h=this.selectedLevel+1;h<=R.length&&(this.selectedLevel=h)}this.onStartGame(this.selectedLevel)}),this.bindButton(s,'[data-action="menu"]',()=>this.showScreen(P.MAIN)),this.container.appendChild(s)}hide(){this.container.innerHTML="",this.container.className="game-menus"}bindButton(t,e,s){const i=t.querySelector(e);i&&i.addEventListener("click",s)}bindToggle(t,e,s){const i=t.querySelector(e);i&&i.addEventListener("click",()=>{i.classList.toggle("active"),s()})}formatTime(t){const e=Math.floor(t/3600),s=Math.floor(t%3600/60);return e>0?`${e}h ${s}m`:`${s}m`}}class _t{joystickCenter=null;joystickId=null;state={joystick:{x:0,y:0,active:!1},bombButton:!1,fuseButtons:{prime:!1,rush:!1,detonate:!1}};buttons=new Map;activeButtonTouches=new Map;overlay=null;isTouchDevice;resizeHandler;constructor(){this.isTouchDevice="ontouchstart"in window||navigator.maxTouchPoints>0,this.resizeHandler=this.updateButtonPositions.bind(this),this.createTouchUI(),this.initTouchHandlers(),window.addEventListener("resize",this.resizeHandler),window.addEventListener("orientationchange",()=>{setTimeout(()=>this.updateButtonPositions(),100)})}createTouchUI(){this.overlay=document.createElement("div"),this.overlay.id="touch-controls",this.overlay.className="touch-controls-overlay",this.overlay.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1000;
      display: ${this.isTouchDevice?"block":"none"};
    `,this.addTouchStyles(),this.createJoystick(),this.createActionButtons(),document.body.appendChild(this.overlay),this.updateButtonPositions()}addTouchStyles(){const t="touch-controls-styles";if(document.getElementById(t))return;const e=document.createElement("style");e.id=t,e.textContent=`
      :root {
        --joystick-size: clamp(120px, 25vw, 160px);
        --joystick-stick-size: clamp(40px, 8vw, 60px);
        --bomb-btn-size: clamp(70px, 15vw, 90px);
        --fuse-btn-size: clamp(50px, 11vw, 70px);
        --touch-btn-gap: clamp(10px, 2vw, 16px);
        --touch-color-primary: rgba(0, 170, 255, 0.6);
        --touch-color-primary-active: rgba(0, 200, 255, 0.9);
        --touch-color-bomb: rgba(255, 80, 80, 0.7);
        --touch-color-bomb-active: rgba(255, 100, 100, 1);
        --touch-color-prime: rgba(80, 150, 255, 0.7);
        --touch-color-rush: rgba(255, 150, 50, 0.7);
        --touch-color-detonate: rgba(255, 220, 50, 0.8);
      }

      .touch-controls-overlay {
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      }

      #joystick-area {
        position: absolute;
        left: 5%;
        bottom: max(5%, env(safe-area-inset-bottom, 5%));
        width: var(--joystick-size);
        height: var(--joystick-size);
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        pointer-events: all;
        background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
        backdrop-filter: blur(2px);
        transition: border-color 0.2s, background 0.2s;
      }

      #joystick-area.active {
        border-color: rgba(0, 170, 255, 0.5);
        background: radial-gradient(circle, rgba(0,170,255,0.1) 0%, transparent 70%);
      }

      #joystick-stick {
        position: absolute;
        top: 50%;
        left: 50%;
        width: var(--joystick-stick-size);
        height: var(--joystick-stick-size);
        background: var(--touch-color-primary);
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: background 0.15s, transform 0.05s;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      }

      #joystick-area.active #joystick-stick {
        background: var(--touch-color-primary-active);
        box-shadow: 0 4px 20px rgba(0, 170, 255, 0.4);
      }

      .touch-button {
        position: absolute;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: clamp(12px, 2.5vw, 16px);
        color: white;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        pointer-events: all;
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        cursor: pointer;
        transition: transform 0.1s, opacity 0.15s, box-shadow 0.15s;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(2px);
      }

      .touch-button:active, .touch-button.pressed {
        transform: scale(0.92);
        opacity: 1 !important;
      }

      .touch-button-bomb {
        right: max(5%, env(safe-area-inset-right, 5%));
        bottom: max(5%, env(safe-area-inset-bottom, 5%));
        width: var(--bomb-btn-size);
        height: var(--bomb-btn-size);
        background: var(--touch-color-bomb);
        border: 2px solid rgba(255, 120, 120, 0.8);
        font-size: clamp(14px, 3vw, 18px);
      }

      .touch-button-bomb.pressed {
        background: var(--touch-color-bomb-active);
        box-shadow: 0 4px 25px rgba(255, 80, 80, 0.5);
      }

      .touch-button-fuse {
        width: var(--fuse-btn-size);
        height: var(--fuse-btn-size);
        font-size: clamp(14px, 3vw, 18px);
      }

      .touch-button-prime {
        right: max(5%, env(safe-area-inset-right, 5%));
        bottom: calc(max(5%, env(safe-area-inset-bottom, 5%)) + var(--bomb-btn-size) + var(--touch-btn-gap));
        background: var(--touch-color-prime);
        border: 2px solid rgba(100, 170, 255, 0.8);
      }

      .touch-button-rush {
        right: calc(max(5%, env(safe-area-inset-right, 5%)) + var(--fuse-btn-size) + var(--touch-btn-gap));
        bottom: calc(max(5%, env(safe-area-inset-bottom, 5%)) + var(--bomb-btn-size) + var(--touch-btn-gap));
        background: var(--touch-color-rush);
        border: 2px solid rgba(255, 180, 80, 0.8);
      }

      .touch-button-detonate {
        right: max(5%, env(safe-area-inset-right, 5%));
        bottom: calc(max(5%, env(safe-area-inset-bottom, 5%)) + var(--bomb-btn-size) + var(--fuse-btn-size) + var(--touch-btn-gap) * 2);
        background: var(--touch-color-detonate);
        border: 2px solid rgba(255, 240, 100, 0.9);
      }

      /* Portrait mode adjustments */
      @media (max-width: 480px) and (orientation: portrait) {
        :root {
          --joystick-size: 140px;
          --joystick-stick-size: 50px;
          --bomb-btn-size: 75px;
          --fuse-btn-size: 55px;
        }

        .touch-button-prime,
        .touch-button-rush,
        .touch-button-detonate {
          bottom: calc(max(5%, env(safe-area-inset-bottom, 5%)) + var(--bomb-btn-size) + var(--fuse-btn-size) * 0.5);
        }

        .touch-button-rush {
          right: calc(max(5%, env(safe-area-inset-right, 5%)) + var(--fuse-btn-size) + var(--touch-btn-gap));
        }

        .touch-button-detonate {
          right: max(5%, env(safe-area-inset-right, 5%));
          bottom: calc(max(5%, env(safe-area-inset-bottom, 5%)) + var(--bomb-btn-size) + var(--fuse-btn-size) + var(--touch-btn-gap) * 2);
        }
      }

      /* Landscape mode for small screens */
      @media (max-height: 500px) and (orientation: landscape) {
        :root {
          --joystick-size: 100px;
          --joystick-stick-size: 35px;
          --bomb-btn-size: 55px;
          --fuse-btn-size: 40px;
          --touch-btn-gap: 8px;
        }

        .touch-button-prime,
        .touch-button-rush,
        .touch-button-detonate {
          bottom: max(5%, env(safe-area-inset-bottom, 5%));
        }

        .touch-button-prime {
          right: calc(max(5%, env(safe-area-inset-right, 5%)) + var(--bomb-btn-size) + var(--touch-btn-gap));
        }

        .touch-button-rush {
          right: calc(max(5%, env(safe-area-inset-right, 5%)) + var(--bomb-btn-size) + var(--fuse-btn-size) + var(--touch-btn-gap) * 2);
        }

        .touch-button-detonate {
          right: calc(max(5%, env(safe-area-inset-right, 5%)) + var(--bomb-btn-size) + var(--fuse-btn-size) * 2 + var(--touch-btn-gap) * 3);
        }
      }

      /* Tablet optimizations */
      @media (min-width: 768px) {
        :root {
          --joystick-size: 180px;
          --joystick-stick-size: 70px;
          --bomb-btn-size: 100px;
          --fuse-btn-size: 80px;
        }
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        .touch-button {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
      }

      /* Reduce motion preference */
      @media (prefers-reduced-motion: reduce) {
        .touch-button,
        #joystick-stick {
          transition: none;
        }
      }
    `,document.head.appendChild(e)}createJoystick(){const t=document.createElement("div");t.id="joystick-area",t.setAttribute("role","button"),t.setAttribute("aria-label","Movement joystick");const e=document.createElement("div");e.id="joystick-stick",t.appendChild(e),this.overlay.appendChild(t)}createActionButtons(){const t=this.createButton("bomb","BOMB","touch-button-bomb"),e=this.createButton("prime","Q","touch-button-fuse touch-button-prime"),s=this.createButton("rush","E","touch-button-fuse touch-button-rush"),i=this.createButton("detonate","R","touch-button-fuse touch-button-detonate");t.setAttribute("aria-label","Place bomb"),e.setAttribute("aria-label","Prime bomb"),s.setAttribute("aria-label","Rush bomb"),i.setAttribute("aria-label","Detonate bomb"),this.overlay.appendChild(t),this.overlay.appendChild(e),this.overlay.appendChild(s),this.overlay.appendChild(i)}createButton(t,e,s){const i=document.createElement("div");return i.id=`touch-btn-${t}`,i.className=`touch-button ${s}`,i.textContent=e,i.setAttribute("role","button"),i}updateButtonPositions(){const t=l=>{const h=document.getElementById(`touch-btn-${l}`);if(!h)return null;const d=h.getBoundingClientRect();return{id:l,x:d.left+d.width/2,y:d.top+d.height/2,radius:d.width/2,element:h}};this.buttons.clear();const e=t("bomb"),s=t("prime"),i=t("rush"),a=t("detonate");e&&this.buttons.set("bomb",e),s&&this.buttons.set("prime",s),i&&this.buttons.set("rush",i),a&&this.buttons.set("detonate",a)}initTouchHandlers(){const t=document.body;t.addEventListener("touchstart",s=>this.handleTouchStart(s),{passive:!1}),t.addEventListener("touchmove",s=>this.handleTouchMove(s),{passive:!1}),t.addEventListener("touchend",s=>this.handleTouchEnd(s),{passive:!1}),t.addEventListener("touchcancel",s=>this.handleTouchEnd(s),{passive:!1}),document.addEventListener("touchmove",s=>{s.target instanceof Element&&s.target.closest("#touch-controls")&&s.preventDefault()},{passive:!1});let e=0;document.addEventListener("touchend",s=>{const i=Date.now();i-e<=300&&s.preventDefault(),e=i},{passive:!1})}handleTouchStart(t){for(let e=0;e<t.changedTouches.length;e++){const s=t.changedTouches[e],i=s.clientX,a=s.clientY,l=this.checkButtonHit(i,a);if(l){t.preventDefault(),this.activeButtonTouches.set(s.identifier,l),this.setButtonState(l,!0),this.updateButtonVisual(l,!0),this.triggerHaptic("light");continue}i<window.innerWidth*.4&&this.joystickId===null&&(t.preventDefault(),this.joystickId=s.identifier,this.joystickCenter={x:i,y:a},this.state.joystick.active=!0,this.updateJoystickVisual(!0),this.triggerHaptic("light"))}}handleTouchMove(t){for(let e=0;e<t.changedTouches.length;e++){const s=t.changedTouches[e];if(s.identifier===this.joystickId&&this.joystickCenter){t.preventDefault();const i=s.clientX-this.joystickCenter.x,a=s.clientY-this.joystickCenter.y,l=Math.sqrt(i*i+a*a),h=45;if(l>0){const d=Math.min(l,h);this.state.joystick.x=i/l*(d/h),this.state.joystick.y=a/l*(d/h)}this.updateJoystickVisual(!0)}}}handleTouchEnd(t){for(let e=0;e<t.changedTouches.length;e++){const s=t.changedTouches[e];s.identifier===this.joystickId&&(this.joystickId=null,this.joystickCenter=null,this.state.joystick={x:0,y:0,active:!1},this.updateJoystickVisual(!1));const i=this.activeButtonTouches.get(s.identifier);i&&(this.setButtonState(i,!1),this.updateButtonVisual(i,!1),this.activeButtonTouches.delete(s.identifier))}}checkButtonHit(t,e){for(const[s,i]of this.buttons){const a=t-i.x,l=e-i.y;if(Math.sqrt(a*a+l*l)<=i.radius*1.2)return s}return null}setButtonState(t,e){switch(t){case"bomb":this.state.bombButton=e;break;case"prime":this.state.fuseButtons.prime=e;break;case"rush":this.state.fuseButtons.rush=e;break;case"detonate":this.state.fuseButtons.detonate=e;break}}updateButtonVisual(t,e){const s=this.buttons.get(t);s?.element&&(e?s.element.classList.add("pressed"):s.element.classList.remove("pressed"))}updateJoystickVisual(t){const e=document.getElementById("joystick-stick"),s=document.getElementById("joystick-area");if(!(!e||!s))if(t){s.classList.add("active");const i=this.state.joystick.x*45,a=this.state.joystick.y*45;e.style.transform=`translate(calc(-50% + ${i}px), calc(-50% + ${a}px))`}else s.classList.remove("active"),e.style.transform="translate(-50%, -50%)"}triggerHaptic(t){if(navigator.vibrate)try{switch(t){case"light":navigator.vibrate(10);break;case"medium":navigator.vibrate(20);break;case"heavy":navigator.vibrate([30,10,30]);break}}catch{}}getState(){return{...this.state}}convertJoystickToDirection(){const{x:t,y:e,active:s}=this.state.joystick;if(!s)return M.None;const i=.25;return Math.abs(t)<i&&Math.abs(e)<i?M.None:Math.abs(e)>Math.abs(t)?e<0?M.Up:M.Down:t<0?M.Left:M.Right}isTouchEnabled(){return this.isTouchDevice}setVisible(t){this.overlay&&(this.overlay.style.display=t?"block":"none")}destroy(){window.removeEventListener("resize",this.resizeHandler),this.overlay&&this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay);const t=document.getElementById("touch-controls-styles");t&&t.parentNode&&t.parentNode.removeChild(t)}}class wt{keys=new Set;bombPressed=!1;pausePressed=!1;anyKeyPressed=!1;pauseCallback=null;touchController;lastTouchBombState=!1;touchBombPressed=!1;constructor(){this.touchController=new _t,window.addEventListener("keydown",t=>{this.keys.add(t.code),t.code==="Space"&&(this.bombPressed=!0),(t.code==="Escape"||t.code==="KeyP")&&(this.pausePressed=!0,this.pauseCallback?.()),this.anyKeyPressed=!0,t.preventDefault()}),window.addEventListener("keyup",t=>{this.keys.delete(t.code)})}setPauseCallback(t){this.pauseCallback=t}poll(){const t=this.getDirection(),e=this.touchController.getState(),s=this.touchController.convertJoystickToDirection();e.bombButton&&!this.lastTouchBombState&&(this.touchBombPressed=!0),this.lastTouchBombState=e.bombButton;let i=M.None;e.joystick.active?i=s:t.x<0?i=M.Left:t.x>0?i=M.Right:t.y<0?i=M.Up:t.y>0&&(i=M.Down);let a=null;return e.fuseButtons.prime||this.keys.has("KeyQ")?a="prime":e.fuseButtons.rush||this.keys.has("KeyE")?a="rush":(e.fuseButtons.detonate||this.keys.has("KeyR"))&&(a="detonate"),{moveDir:i,placeBomb:this.consumeBomb(),fuseAction:a,pause:this.consumePause(),menuBack:this.keys.has("Escape"),menuSelect:this.keys.has("Enter")||this.keys.has("Space"),menuUp:this.keys.has("ArrowUp")||this.keys.has("KeyW"),menuDown:this.keys.has("ArrowDown")||this.keys.has("KeyS"),menuLeft:this.keys.has("ArrowLeft")||this.keys.has("KeyA"),menuRight:this.keys.has("ArrowRight")||this.keys.has("KeyD")}}getDirection(){let t=0,e=0;return(this.keys.has("ArrowLeft")||this.keys.has("KeyA"))&&(t-=1),(this.keys.has("ArrowRight")||this.keys.has("KeyD"))&&(t+=1),(this.keys.has("ArrowUp")||this.keys.has("KeyW"))&&(e-=1),(this.keys.has("ArrowDown")||this.keys.has("KeyS"))&&(e+=1),{x:t,y:e}}consumeBomb(){return this.bombPressed?(this.bombPressed=!1,!0):this.touchBombPressed?(this.touchBombPressed=!1,!0):!1}consumePause(){return this.pausePressed?(this.pausePressed=!1,!0):!1}consumeAnyKey(){return this.anyKeyPressed?(this.anyKeyPressed=!1,!0):!1}getTouchController(){return this.touchController}isTouchEnabled(){return this.touchController.isTouchEnabled()}}const te=new O;function G(c,t,e,s,i,a){const l=2*Math.PI*i/4,h=Math.max(a-2*i,0),d=Math.PI/4;te.copy(t),te[s]=0,te.normalize();const p=.5*l/(l+h),b=1-te.angleTo(c)/d;return Math.sign(te[e])===1?b*p:h/(l+h)+p+p*(1-b)}class Mt extends Y{constructor(t=1,e=1,s=1,i=2,a=.1){if(i=i*2+1,a=Math.min(t/2,e/2,s/2,a),super(1,1,1,i,i,i),i===1)return;const l=this.toNonIndexed();this.index=null,this.attributes.position=l.attributes.position,this.attributes.normal=l.attributes.normal,this.attributes.uv=l.attributes.uv;const h=new O,d=new O,p=new O(t,e,s).divideScalar(2).subScalar(a),b=this.attributes.position.array,o=this.attributes.normal.array,n=this.attributes.uv.array,r=b.length/6,u=new O,f=.5/i;for(let g=0,m=0;g<b.length;g+=3,m+=2)switch(h.fromArray(b,g),d.copy(h),d.x-=Math.sign(d.x)*f,d.y-=Math.sign(d.y)*f,d.z-=Math.sign(d.z)*f,d.normalize(),b[g+0]=p.x*Math.sign(h.x)+d.x*a,b[g+1]=p.y*Math.sign(h.y)+d.y*a,b[g+2]=p.z*Math.sign(h.z)+d.z*a,o[g+0]=d.x,o[g+1]=d.y,o[g+2]=d.z,Math.floor(g/r)){case 0:u.set(1,0,0),n[m+0]=G(u,d,"z","y",a,s),n[m+1]=1-G(u,d,"y","z",a,e);break;case 1:u.set(-1,0,0),n[m+0]=1-G(u,d,"z","y",a,s),n[m+1]=1-G(u,d,"y","z",a,e);break;case 2:u.set(0,1,0),n[m+0]=1-G(u,d,"x","z",a,t),n[m+1]=G(u,d,"z","x",a,s);break;case 3:u.set(0,-1,0),n[m+0]=1-G(u,d,"x","z",a,t),n[m+1]=1-G(u,d,"z","x",a,s);break;case 4:u.set(0,0,1),n[m+0]=1-G(u,d,"x","y",a,t),n[m+1]=1-G(u,d,"y","x",a,e);break;case 5:u.set(0,0,-1),n[m+0]=G(u,d,"x","y",a,t),n[m+1]=1-G(u,d,"y","x",a,e);break}}}var re=(c=>(c.IDLE="idle",c.WALK="walk",c.DEATH="death",c.PLACE_BOMB="place_bomb",c.VICTORY="victory",c))(re||{});const Le=[{suit:16119285,accent:16739125,glass:16766720},{suit:15263976,accent:54527,glass:8900331},{suit:16777215,accent:16724838,glass:16738740},{suit:15790320,accent:65416,glass:10025880},{suit:14737632,accent:11167487,glass:14524637},{suit:16777215,accent:16755200,glass:16766720},{suit:16119285,accent:16729156,glass:16739179},{suit:15263976,accent:4491519,glass:8900346}];class xt{root;helmet;helmetRim;body;backpack;leftArm;rightArm;leftLeg;rightLeg;jetpackFlame;jetpackParticles;suitMaterial;accentMaterial;glassMaterial;backpackMaterial;animationState="idle";animationTime=0;deathProgress=0;isDead=!1;config;baseScale=1.5;HELMET_RADIUS=.45;BODY_RADIUS=.22;BODY_HEIGHT=.35;LIMB_RADIUS=.08;LIMB_LENGTH=.28;constructor(t={}){const e=Le[t.playerId??0%Le.length];this.config={suitColor:t.suitColor??e.suit,accentColor:t.accentColor??e.accent,glassTint:t.glassTint??e.glass,scale:t.scale??1,playerId:t.playerId??0},this.root=new F,this.root.scale.setScalar(this.config.scale*this.baseScale),this.createMaterials(),this.createGeometry(),this.setupShadows()}createMaterials(){this.suitMaterial=new x({color:this.config.suitColor,roughness:.6,metalness:.1,bumpScale:.02}),this.accentMaterial=new x({color:this.config.accentColor,roughness:.3,metalness:.4,emissive:this.config.accentColor,emissiveIntensity:.1}),this.glassMaterial=new He({color:this.config.glassTint,metalness:.1,roughness:.05,transmission:.95,thickness:.5,ior:1.5,clearcoat:1,clearcoatRoughness:.05,envMapIntensity:1.5,transparent:!0,opacity:.3,side:Q}),this.backpackMaterial=new x({color:3355443,roughness:.5,metalness:.6})}createGeometry(){this.createHelmet(),this.createBody(),this.createArms(),this.createLegs(),this.createBackpack()}createHelmet(){const t=new F;t.position.y=this.BODY_HEIGHT*.5+this.HELMET_RADIUS*.6;const e=new D(this.HELMET_RADIUS,32,32);this.helmet=new w(e,this.glassMaterial),this.helmet.castShadow=!0,this.helmet.receiveShadow=!0,t.add(this.helmet);const s=new ye(this.HELMET_RADIUS*.85,.04,8,32);this.helmetRim=new w(s,this.accentMaterial),this.helmetRim.rotation.x=Math.PI/2,this.helmetRim.position.y=-this.HELMET_RADIUS*.5,t.add(this.helmetRim);const i=new D(this.HELMET_RADIUS*.7,16,16),a=new L({color:16777215,transparent:!0,opacity:.1,side:he}),l=new w(i,a);t.add(l),this.root.add(t)}createBody(){const t=new ie(this.BODY_RADIUS,this.BODY_HEIGHT,4,16);this.body=new w(t,this.suitMaterial),this.body.position.y=this.BODY_HEIGHT*.4,this.body.castShadow=!0,this.body.receiveShadow=!0;const e=new ie(this.BODY_RADIUS*.6,this.BODY_HEIGHT*.4,4,12),s=new w(e,this.accentMaterial);s.position.set(0,this.BODY_HEIGHT*.1,this.BODY_RADIUS*.5),s.scale.z=.3,this.body.add(s);const i=new ye(this.BODY_RADIUS*.9,.03,8,24),a=new w(i,this.accentMaterial);a.rotation.x=Math.PI/2,a.position.y=this.BODY_HEIGHT*.45,this.body.add(a),this.root.add(this.body)}createArms(){this.leftArm=this.createLimb(!0),this.leftArm.position.set(this.BODY_RADIUS+this.LIMB_RADIUS,this.BODY_HEIGHT*.6,0),this.root.add(this.leftArm),this.rightArm=this.createLimb(!1),this.rightArm.position.set(-(this.BODY_RADIUS+this.LIMB_RADIUS),this.BODY_HEIGHT*.6,0),this.root.add(this.rightArm)}createLegs(){this.leftLeg=this.createLimb(!0,!0),this.leftLeg.position.set(this.BODY_RADIUS*.4,.05,0),this.root.add(this.leftLeg),this.rightLeg=this.createLimb(!1,!0),this.rightLeg.position.set(-this.BODY_RADIUS*.4,.05,0),this.root.add(this.rightLeg)}createLimb(t,e=!1){const s=new F,i=e?this.LIMB_LENGTH*.9:this.LIMB_LENGTH,a=new ie(this.LIMB_RADIUS,i,4,12),l=new w(a,this.suitMaterial);l.position.y=-i*.5,l.castShadow=!0,l.receiveShadow=!0;const h=new ie(this.LIMB_RADIUS*1.05,i*.3,4,8),d=new w(h,this.accentMaterial);d.position.y=-i*.3,d.scale.set(1,1,.5),l.add(d);const p=new D(this.LIMB_RADIUS*1.3,12,12),b=new w(p,e?this.accentMaterial:this.suitMaterial);return b.position.y=-i*.5,e&&(b.scale.y=.6,b.position.y-=.05),l.add(b),s.add(l),s}createBackpack(){this.backpack=new F,this.backpack.position.set(0,this.BODY_HEIGHT*.5,-this.BODY_RADIUS*.8);const t=new Mt(.35,.4,.2,4,.05),e=new w(t,this.backpackMaterial);e.castShadow=!0,this.backpack.add(e);const s=new le(.05,.04,.15,8),i=new w(s,this.accentMaterial);i.position.set(-.1,-.25,-.05),this.backpack.add(i);const a=new w(s,this.accentMaterial);a.position.set(.1,-.25,-.05),this.backpack.add(a),this.jetpackFlame=new Re(this.config.accentColor,.5,2),this.jetpackFlame.position.set(0,-.35,-.1),this.backpack.add(this.jetpackFlame),this.jetpackParticles=[];for(let l=0;l<6;l++){const h=new D(.02+Math.random()*.02,6,6),d=new L({color:this.config.accentColor,transparent:!0,opacity:.8}),p=new w(h,d);p.userData={offset:Math.random()*Math.PI*2,speed:.5+Math.random()*.5},this.jetpackParticles.push(p),this.backpack.add(p)}this.root.add(this.backpack)}setupShadows(){this.root.traverse(t=>{t instanceof w&&(t.castShadow=!0,t.receiveShadow=!0)})}update(t){if(!this.isDead){switch(this.animationTime+=t,this.animationState){case"idle":this.animateIdle();break;case"walk":this.animateWalk();break;case"death":this.animateDeath(t);break;case"place_bomb":this.animatePlaceBomb();break;case"victory":this.animateVictory();break}this.animateJetpackParticles(t)}}setAnimationState(t){this.animationState!==t&&(this.animationState=t,this.animationTime=0,t!=="death"&&this.resetPose())}resetPose(){this.root.rotation.set(0,0,0),this.root.position.y=0,this.root.scale.setScalar(this.config.scale*this.baseScale),this.leftArm.rotation.set(0,0,0),this.rightArm.rotation.set(0,0,0),this.leftLeg.rotation.set(0,0,0),this.rightLeg.rotation.set(0,0,0),this.body.rotation.set(0,0,0)}animateIdle(){const t=this.animationTime,e=.03,s=2;this.root.position.y=Math.sin(t*s)*e;const i=1+Math.sin(t*1.5)*.02;this.body.scale.set(i,i,i);const a=Math.sin(t*1.5)*.05;this.leftArm.rotation.z=a+.1,this.rightArm.rotation.z=-a-.1,this.helmet.rotation.x=Math.sin(t*.7)*.02,this.helmet.rotation.y=Math.sin(t*.5)*.03}animateWalk(){const t=this.animationTime,e=8,s=.5,i=.08;this.root.position.y=Math.abs(Math.sin(t*e))*i,this.leftArm.rotation.x=Math.sin(t*e)*s,this.rightArm.rotation.x=Math.sin(t*e+Math.PI)*s,this.leftLeg.rotation.x=Math.sin(t*e+Math.PI)*s,this.rightLeg.rotation.x=Math.sin(t*e)*s,this.body.rotation.z=Math.sin(t*e)*.05,this.helmet.rotation.x=Math.sin(t*e*2)*.03}animateDeath(t){this.deathProgress+=t;const s=Math.min(this.deathProgress/1.5,1),i=5+s*10;this.root.rotation.y+=i*t,this.root.rotation.z=Math.sin(this.deathProgress*3)*.3;const a=(1-s)*this.config.scale*this.baseScale;this.root.scale.setScalar(Math.max(a,.01));const l=1.5;if(s<.3){const h=s/.3;this.root.position.y=h*l}else{const h=(s-.3)/.7;this.root.position.y=l*(1-h)}this.leftArm.rotation.z=Math.sin(this.deathProgress*15)*.8,this.rightArm.rotation.z=Math.cos(this.deathProgress*15)*.8,this.glassMaterial.opacity=.3*(1-s),this.jetpackFlame.intensity=.5+s*2,s>=1&&(this.isDead=!0,this.root.visible=!1)}animatePlaceBomb(){const t=this.animationTime,e=.4;if(t>e){this.setAnimationState("idle");return}const s=t/e,i=Math.sin(s*Math.PI);this.root.position.y=-i*.15,this.leftArm.rotation.x=i*.8,this.rightArm.rotation.x=i*.8,this.leftArm.rotation.z=-i*.3,this.rightArm.rotation.z=i*.3,this.leftLeg.rotation.x=-i*.3,this.rightLeg.rotation.x=-i*.3}animateVictory(){const t=this.animationTime,e=4,s=.3;this.root.position.y=Math.abs(Math.sin(t*e))*s;const i=.5+Math.sin(t*e)*.2;this.leftArm.rotation.z=i,this.rightArm.rotation.z=-i,this.root.rotation.y+=2*.016,this.helmet.rotation.x=Math.sin(t*e*2)*.1}animateJetpackParticles(t){const e=this.animationTime;this.jetpackParticles.forEach((s,i)=>{const a=s.userData,l=(e*a.speed+a.offset)%(Math.PI*2),h=-Math.abs(Math.sin(l))*.3,d=Math.cos(l*2)*.05*(i%2===0?1:-1);s.position.set((i<3?-.1:.1)+d,-.3+h,-.1);const p=1-Math.abs(Math.sin(l));s.material.opacity=p*.8;const b=.5+p*.5;s.scale.setScalar(b)}),this.jetpackFlame.intensity=.5+Math.sin(e*3)*.2}getPosition(){return this.root.position.clone()}setPosition(t,e,s){this.root.position.set(t,e,s)}setRotationY(t){this.root.rotation.y=t}getRotationY(){return this.root.rotation.y}die(){this.isDead||this.setAnimationState("death")}isDeathComplete(){return this.isDead}reset(){this.isDead=!1,this.deathProgress=0,this.animationTime=0,this.root.visible=!0,this.glassMaterial.opacity=.3,this.setAnimationState("idle")}getAnimationState(){return this.animationState}dispose(){this.root.traverse(t=>{t instanceof w&&t.geometry.dispose()}),this.suitMaterial.dispose(),this.accentMaterial.dispose(),this.glassMaterial.dispose(),this.backpackMaterial.dispose()}getBoundingRadius(){return this.HELMET_RADIUS*this.config.scale*this.baseScale}setVisible(t){this.root.visible=t}setEmissiveIntensity(t){this.accentMaterial.emissiveIntensity=.1+t,this.jetpackFlame.intensity=.5+t}flash(t=.2){const e=this.suitMaterial.emissive.clone();this.suitMaterial.emissive.setHex(16777215),this.suitMaterial.emissiveIntensity=.5,setTimeout(()=>{this.suitMaterial.emissive.copy(e),this.suitMaterial.emissiveIntensity=0},t*1e3)}}var _e=(c=>(c.NONE="none",c.RAIN="rain",c.SNOW="snow",c.ASH="ash",c.POLLEN="pollen",c.NEON="neon",c))(_e||{});class De{scene;currentWeather="none";intensity=.5;enabled=!0;particleCount=2e3;particles=[];splashes=[];particleMesh;splashMesh;dummy=new ve;rainMaterial;snowMaterial;ashMaterial;pollenMaterial;neonMaterial;rainGeo;snowGeo;ashGeo;pollenGeo;neonGeo;splashGeo;snowAccumulation=new Map;accumulationMesh;accumulationDummy=new ve;bounds={minX:-2,maxX:18,minZ:-2,maxZ:18,height:20};fireLight;fireGlowMesh;constructor(t){this.scene=t,this.initializeMaterials(),this.initializeGeometries(),this.initializeParticleMesh(),this.initializeSplashes(),this.initializeAccumulation(),this.initializeFireGlow(),this.initializeParticles()}initializeMaterials(){this.rainMaterial=new L({color:4500223,transparent:!0,opacity:.6,blending:$,depthWrite:!1}),this.snowMaterial=new L({color:16777215,transparent:!0,opacity:.8,blending:$,depthWrite:!1}),this.ashMaterial=new L({color:16729122,transparent:!0,opacity:.9,blending:$,depthWrite:!1}),this.pollenMaterial=new L({color:16777130,transparent:!0,opacity:.7,blending:$,depthWrite:!1}),this.neonMaterial=new L({color:65535,transparent:!0,opacity:.9,blending:$,depthWrite:!1})}initializeGeometries(){this.rainGeo=new le(.01,.01,.8,4),this.rainGeo.translate(0,.4,0),this.snowGeo=new Te(.08,0),this.ashGeo=new ce(.08,.08),this.pollenGeo=new D(.06,6,6),this.neonGeo=new Te(.05,0),this.splashGeo=new Ne(.05,.15,8),this.splashGeo.rotateX(-Math.PI/2)}initializeParticleMesh(){this.particleMesh=new z(this.rainGeo,this.rainMaterial,this.particleCount),this.particleMesh.instanceMatrix.setUsage(ne),this.particleMesh.count=0,this.scene.add(this.particleMesh)}initializeSplashes(){this.splashMesh=new z(this.splashGeo,new L({color:4500223,transparent:!0,opacity:.5,blending:$,depthWrite:!1,side:Q}),100),this.splashMesh.instanceMatrix.setUsage(ne),this.splashMesh.count=0,this.scene.add(this.splashMesh)}initializeAccumulation(){this.accumulationMesh=new z(new le(.4,.5,.1,6),new x({color:16777215,transparent:!0,opacity:.6,roughness:.8}),256),this.accumulationMesh.instanceMatrix.setUsage(ne),this.accumulationMesh.count=0,this.accumulationMesh.visible=!1,this.scene.add(this.accumulationMesh)}initializeFireGlow(){this.fireLight=new Re(16729122,0,30),this.fireLight.position.set(8,5,8),this.scene.add(this.fireLight);const t=new D(8,32,32);this.fireGlowMesh=new w(t,new L({color:16720384,transparent:!0,opacity:0,blending:$,depthWrite:!1,side:he})),this.fireGlowMesh.position.set(8,4,8),this.scene.add(this.fireGlowMesh)}initializeParticles(){for(let t=0;t<this.particleCount;t++)this.particles.push({position:new O,velocity:new O,life:0,maxLife:1,size:1,rotation:0,rotationSpeed:0});for(let t=0;t<100;t++)this.splashes.push({position:new O,scale:0,life:0,maxLife:.3})}setWeather(t,e=.5){this.currentWeather===t&&this.intensity===e||(this.currentWeather=t,this.intensity=Math.max(0,Math.min(1,e)),console.log(`🌦️ WeatherSystem.setWeather: ${t}, intensity: ${this.intensity}`),this.updateWeatherGeometry(),this.resetParticles(),this.updateFireGlow(),this.accumulationMesh.visible=t==="snow",console.log(`🌦️ Particle mesh count: ${this.particleMesh.count}, enabled: ${this.enabled}`))}setEnabled(t){if(this.enabled=t,!t){this.particleMesh.count=0,this.splashMesh.count=0,this.accumulationMesh.visible=!1,this.fireLight.intensity=0;const e=this.fireGlowMesh.material;e.opacity=0}}setIntensity(t){this.intensity=Math.max(0,Math.min(1,t))}updateWeatherGeometry(){switch(this.scene.remove(this.particleMesh),this.currentWeather){case"rain":this.particleMesh=new z(this.rainGeo,this.rainMaterial,this.particleCount);break;case"snow":this.particleMesh=new z(this.snowGeo,this.snowMaterial,this.particleCount);break;case"ash":this.particleMesh=new z(this.ashGeo,this.ashMaterial,this.particleCount);break;case"pollen":this.particleMesh=new z(this.pollenGeo,this.pollenMaterial,this.particleCount);break;case"neon":this.particleMesh=new z(this.neonGeo,this.neonMaterial,this.particleCount);break;default:this.particleMesh=new z(this.rainGeo,this.rainMaterial,this.particleCount)}this.particleMesh.instanceMatrix.setUsage(ne),this.particleMesh.count=this.enabled&&this.currentWeather!=="none"?Math.floor(this.particleCount*this.intensity):0,this.scene.add(this.particleMesh)}updateFireGlow(){if(this.currentWeather==="ash"){this.fireLight.intensity=2*this.intensity;const t=this.fireGlowMesh.material;t.opacity=.15*this.intensity}else{this.fireLight.intensity=0;const t=this.fireGlowMesh.material;t.opacity=0}}resetParticles(){for(const t of this.particles)this.spawnParticle(t)}spawnParticle(t){const e=this.bounds.minX+Math.random()*(this.bounds.maxX-this.bounds.minX),s=this.bounds.minZ+Math.random()*(this.bounds.maxZ-this.bounds.minZ);let i;switch(this.currentWeather){case"rain":case"snow":case"pollen":i=this.bounds.height;break;case"ash":case"neon":i=Math.random()*5;break;default:i=Math.random()*this.bounds.height}switch(t.position.set(e,i,s),t.life=Math.random(),t.maxLife=1,t.size=.5+Math.random()*.5,t.rotation=Math.random()*Math.PI*2,t.rotationSpeed=(Math.random()-.5)*2,this.currentWeather){case"rain":t.velocity.set((Math.random()-.5)*2,-15-Math.random()*5,(Math.random()-.5)*2);break;case"snow":t.velocity.set((Math.random()-.5)*1,-2-Math.random()*2,(Math.random()-.5)*1);break;case"ash":t.velocity.set((Math.random()-.5)*3,2+Math.random()*3,(Math.random()-.5)*3);break;case"pollen":t.velocity.set((Math.random()-.5)*.5,-.5-Math.random()*.5,(Math.random()-.5)*.5);break;case"neon":t.velocity.set((Math.random()-.5)*1,3+Math.random()*4,(Math.random()-.5)*1);break}}spawnSplash(t,e){for(const s of this.splashes)if(s.life<=0){s.position.set(t,.05,e),s.scale=.1,s.life=s.maxLife;return}}update(t){if(!this.enabled||this.currentWeather==="none")return;const e=Math.min(t,.05),s=Math.floor(this.particleCount*this.intensity);Math.random()<.01&&console.log(`🌦️ Weather update: ${this.currentWeather}, active particles: ${s}, dt: ${t.toFixed(4)}`);for(let i=0;i<s;i++){const a=this.particles[i];a.position.x+=a.velocity.x*e,a.position.y+=a.velocity.y*e,a.position.z+=a.velocity.z*e,this.currentWeather==="snow"?(a.position.x+=Math.sin(Date.now()*.001+i)*.01,a.position.z+=Math.cos(Date.now()*.0013+i)*.01):this.currentWeather==="pollen"?(a.position.x+=Math.sin(Date.now()*.002+i*.1)*.02,a.position.z+=Math.cos(Date.now()*.0017+i*.1)*.02):this.currentWeather==="ash"&&(a.position.x+=Math.sin(Date.now()*.003+i*.05)*.03,a.position.z+=Math.cos(Date.now()*.0025+i*.05)*.03),a.rotation+=a.rotationSpeed*e,a.life-=e*.5;const l=a.position.x<this.bounds.minX||a.position.x>this.bounds.maxX||a.position.z<this.bounds.minZ||a.position.z>this.bounds.maxZ,h=a.position.y<=0,d=a.position.y>=this.bounds.height;(a.life<=0||l||h||d)&&(this.currentWeather==="rain"&&h&&a.life>0&&this.spawnSplash(a.position.x,a.position.z),this.currentWeather==="snow"&&h&&this.addSnowAccumulation(a.position.x,a.position.z),this.spawnParticle(a)),this.dummy.position.copy(a.position),this.dummy.scale.setScalar(a.size),this.currentWeather==="rain"?this.dummy.lookAt(a.position.x+a.velocity.x,a.position.y+a.velocity.y,a.position.z+a.velocity.z):this.currentWeather==="ash"?this.dummy.rotation.set(0,a.rotation,0):this.dummy.rotation.set(a.rotation,a.rotation*.7,0),this.dummy.updateMatrix(),this.particleMesh.setMatrixAt(i,this.dummy.matrix)}if(this.particleMesh.count=s,this.particleMesh.instanceMatrix.needsUpdate=!0,this.updateSplashes(e),this.currentWeather==="snow"&&this.updateAccumulation(),this.currentWeather==="ash"){const i=.9+Math.random()*.2;this.fireLight.intensity=2*this.intensity*i;const a=this.fireGlowMesh.material;a.opacity=.15*this.intensity*i}}updateSplashes(t){let e=0;for(let s=0;s<this.splashes.length;s++){const i=this.splashes[s];if(i.life>0){i.life-=t;const a=1-i.life/i.maxLife;i.scale=.1+a*.5,this.dummy.position.copy(i.position),this.dummy.scale.set(i.scale,i.scale,i.scale),this.dummy.rotation.x=-Math.PI/2,this.dummy.updateMatrix(),this.splashMesh.setMatrixAt(e++,this.dummy.matrix)}}this.splashMesh.count=e,this.splashMesh.instanceMatrix.needsUpdate=!0}addSnowAccumulation(t,e){const s=`${Math.floor(t)},${Math.floor(e)}`,i=this.snowAccumulation.get(s)||0;this.snowAccumulation.set(s,Math.min(i+.01,.3))}updateAccumulation(){let t=0;for(const[e,s]of this.snowAccumulation)if(s>.01&&t<256){const[i,a]=e.split(",").map(Number);this.accumulationDummy.position.set(i+.5,s/2,a+.5),this.accumulationDummy.scale.set(1,s*3,1),this.accumulationDummy.updateMatrix(),this.accumulationMesh.setMatrixAt(t++,this.accumulationDummy.matrix)}this.accumulationMesh.count=t,this.accumulationMesh.instanceMatrix.needsUpdate=!0}static getWeatherForTheme(t){switch(t){case y.ICE:return"snow";case y.VOLCANO:return"ash";case y.FOREST:return"pollen";case y.SPACE:return"neon";case y.MIAMI_BEACH:return"none";case y.CLASSIC:case y.DESERT:default:return"none"}}dispose(){this.scene.remove(this.particleMesh),this.scene.remove(this.splashMesh),this.scene.remove(this.accumulationMesh),this.scene.remove(this.fireLight),this.scene.remove(this.fireGlowMesh),this.particleMesh.geometry.dispose(),this.splashMesh.geometry.dispose(),this.accumulationMesh.geometry.dispose(),this.fireGlowMesh.geometry.dispose(),this.rainMaterial.dispose(),this.snowMaterial.dispose(),this.ashMaterial.dispose(),this.pollenMaterial.dispose(),this.neonMaterial.dispose(),this.splashMesh.material.dispose(),this.accumulationMesh.material.dispose(),this.fireGlowMesh.material.dispose()}}class kt{scene;flyingObjects=[];skyMesh=null;cloudMeshes=[];starField=null;currentTheme=y.CLASSIC;spawnTimer=0;spawnInterval=1.5;MAX_OBJECTS=25;SPAWN_DISTANCE=50;DESPAWN_DISTANCE=-50;constructor(t){this.scene=t,this.createSkyDome()}createSkyDome(){const t=new D(100,32,32),e=new Qe({uniforms:{topColor:{value:new oe(30719)},bottomColor:{value:new oe(16777215)},offset:{value:33},exponent:{value:.6}},vertexShader:`
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,side:he,depthWrite:!1});this.skyMesh=new w(t,e),this.skyMesh.position.set(_/2,0,_/2),this.skyMesh.renderOrder=-100,this.scene.add(this.skyMesh)}setTheme(t){this.currentTheme=t,this.clearObjects(),this.updateSky(t),this.createClouds(t),this.createStarField(t),this.spawnInterval=this.getSpawnIntervalForTheme(t)}getSpawnIntervalForTheme(t){switch(t){case y.VOLCANO:return .8;case y.SPACE:return .5;case y.DESERT:return 2;default:return 1.2}}updateSky(t){if(!this.skyMesh)return;const e=this.getSkyConfigForTheme(t),s=this.skyMesh.material;s.uniforms.topColor.value.setHex(e.topColor),s.uniforms.bottomColor.value.setHex(e.bottomColor)}getSkyConfigForTheme(t){switch(t){case y.CLASSIC:return{topColor:1710638,bottomColor:1450302,timeOfDay:"night",cloudDensity:.3,starDensity:.8};case y.ICE:return{topColor:8900331,bottomColor:14743551,timeOfDay:"day",cloudDensity:.7,starDensity:0};case y.VOLCANO:return{topColor:1706496,bottomColor:4856320,timeOfDay:"dusk",cloudDensity:.9,starDensity:0};case y.FOREST:return{topColor:2263842,bottomColor:9498256,timeOfDay:"day",cloudDensity:.5,starDensity:0};case y.DESERT:return{topColor:16747520,bottomColor:16766720,timeOfDay:"dusk",cloudDensity:.2,starDensity:0};case y.SPACE:return{topColor:17,bottomColor:34,timeOfDay:"night",cloudDensity:0,starDensity:1};case y.MIAMI_BEACH:return{topColor:16739229,bottomColor:16752762,timeOfDay:"dusk",cloudDensity:.4,starDensity:0};default:return{topColor:30719,bottomColor:11197951,timeOfDay:"day",cloudDensity:.5,starDensity:0}}}createClouds(t){this.cloudMeshes.forEach(h=>this.scene.remove(h)),this.cloudMeshes=[];const e=this.getSkyConfigForTheme(t);if(e.cloudDensity===0)return;const s=Math.floor(15*e.cloudDensity),i=new D(3,8,8);let a=16777215;if(t===y.VOLCANO&&(a=3355443),t===y.SPACE)return;const l=new L({color:a,transparent:!0,opacity:.6});for(let h=0;h<s;h++){const d=new F;for(let p=0;p<5;p++){const b=new w(i,l);b.position.set((Math.random()-.5)*4,(Math.random()-.5)*1.5,(Math.random()-.5)*2),b.scale.setScalar(.5+Math.random()*.5),d.add(b)}d.position.set(Math.random()*80-40,15+Math.random()*20,-20-Math.random()*30),this.scene.add(d),this.cloudMeshes.push(d)}}createStarField(t){this.starField&&(this.scene.remove(this.starField),this.starField=null);const e=this.getSkyConfigForTheme(t);if(e.starDensity===0)return;const s=Math.floor(500*e.starDensity),i=new Float32Array(s*3);for(let h=0;h<s;h++){const d=Math.random()*Math.PI*2,p=Math.random()*Math.PI*.5,b=80;i[h*3]=b*Math.sin(p)*Math.cos(d)+_/2,i[h*3+1]=b*Math.cos(p),i[h*3+2]=b*Math.sin(p)*Math.sin(d)+_/2}const a=new $e;a.setAttribute("position",new Ue(i,3));const l=new We({color:16777215,size:.3,transparent:!0,opacity:.8});this.starField=new je(a,l),this.scene.add(this.starField)}update(t){this.spawnTimer+=t,this.spawnTimer>=this.spawnInterval&&this.flyingObjects.length<this.MAX_OBJECTS&&(this.spawnTimer=0,this.spawnObject());for(let e=this.flyingObjects.length-1;e>=0;e--){const s=this.flyingObjects[e];s.mesh.position.add(s.velocity.clone().multiplyScalar(t)),s.mesh.rotation.x+=s.rotationSpeed.x*t,s.mesh.rotation.y+=s.rotationSpeed.y*t,s.mesh.rotation.z+=s.rotationSpeed.z*t,(s.mesh.position.z>_+30||s.mesh.position.z<-50)&&(this.scene.remove(s.mesh),this.flyingObjects.splice(e,1))}if(this.cloudMeshes.forEach((e,s)=>{e.position.x+=t*2*(.5+s%3*.3),e.position.x>60&&(e.position.x=-60)}),this.starField){const e=this.starField.material;e.opacity=.6+Math.sin(Date.now()*.003)*.2}}spawnObject(){const t=this.getRandomObjectForTheme(this.currentTheme);if(!t)return;const e=this.createObjectMesh(t),s=_/2+(Math.random()-.5)*40,i=5+Math.random()*15,a=-this.SPAWN_DISTANCE;e.position.set(s,i,a);const l=15+Math.random()*25,h=new O((Math.random()-.5)*5,(Math.random()-.5)*2,l),d=new O((Math.random()-.5)*3,(Math.random()-.5)*3,(Math.random()-.5)*3);this.flyingObjects.push({mesh:e,velocity:h,rotationSpeed:d,type:t.type}),this.scene.add(e)}getRandomObjectForTheme(t){const e=[];switch(t){case y.CLASSIC:e.push({type:"crate",color:9127187,geometry:"box"},{type:"barrel",color:4473924,geometry:"sphere"},{type:"debris",color:6710886,geometry:"box"});break;case y.ICE:e.push({type:"snowball",color:16777215,geometry:"sphere"},{type:"iceberg",color:8965375,geometry:"box"},{type:"penguin",color:1118481,geometry:"sphere"},{type:"icicle",color:11197951,geometry:"cone"});break;case y.VOLCANO:e.push({type:"lavaRock",color:16729088,geometry:"sphere"},{type:"ash",color:3355443,geometry:"sphere"},{type:"ember",color:16737792,geometry:"sphere"},{type:"boulder",color:4861984,geometry:"box"});break;case y.FOREST:e.push({type:"leaf",color:2263842,geometry:"sphere"},{type:"bird",color:16737792,geometry:"cone"},{type:"acorn",color:9127187,geometry:"sphere"},{type:"butterfly",color:16738740,geometry:"box"});break;case y.DESERT:e.push({type:"tumbleweed",color:12886874,geometry:"sphere"},{type:"sand",color:16766720,geometry:"sphere"},{type:"cactus",color:2263842,geometry:"cone"},{type:"vulture",color:3355443,geometry:"cone"});break;case y.SPACE:e.push({type:"asteroid",color:6710886,geometry:"sphere"},{type:"satellite",color:13421772,geometry:"box"},{type:"meteor",color:16729088,geometry:"sphere"},{type:"alien",color:65280,geometry:"sphere"},{type:"spacejunk",color:8947848,geometry:"torus"});break;case y.MIAMI_BEACH:e.push({type:"beachball",color:16739229,geometry:"sphere"},{type:"seagull",color:16777215,geometry:"cone"},{type:"coconut",color:9127187,geometry:"sphere"},{type:"surfboard",color:49151,geometry:"box"},{type:"flamingo",color:16738740,geometry:"cone"});break;default:e.push({type:"cow",color:16777215,geometry:"box"},{type:"car",color:16711680,geometry:"box"},{type:"house",color:8930338,geometry:"box"},{type:"tree",color:2263842,geometry:"cone"})}return e.length===0?null:e[Math.floor(Math.random()*e.length)]}createObjectMesh(t){const e=new F;let s;const i=.5+Math.random()*1.5;switch(t.geometry){case"sphere":s=new D(i,12,12);break;case"cone":s=new we(i*.6,i*1.5,8);break;case"torus":s=new ye(i,i*.3,8,16);break;case"box":default:s=new Y(i,i,i)}const a=new x({color:t.color,emissive:t.color,emissiveIntensity:.1,roughness:.7}),l=new w(s,a);if(l.castShadow=!0,e.add(l),t.type==="meteor"||t.type==="ember"||t.type==="lavaRock"){const h=new L({color:t.color,transparent:!0,opacity:.4}),d=new w(s.clone(),h);d.scale.setScalar(1.3),e.add(d)}return e}clearObjects(){this.flyingObjects.forEach(t=>this.scene.remove(t.mesh)),this.flyingObjects=[]}dispose(){this.clearObjects(),this.cloudMeshes.forEach(t=>this.scene.remove(t)),this.cloudMeshes=[],this.skyMesh&&(this.scene.remove(this.skyMesh),this.skyMesh=null),this.starField&&(this.scene.remove(this.starField),this.starField=null)}}class St{scene;enemyMeshes=new Map;enemyColors={[A.BASIC]:16729156,[A.FAST]:16746496,[A.SMART]:8930559,[A.TANK]:4473924};constructor(t){this.scene=t}syncEnemies(t,e){const s=new Set(t.map(i=>i.id));for(const[i,a]of this.enemyMeshes)s.has(i)||(this.scene.remove(a),this.enemyMeshes.delete(i));for(const i of t){let a=this.enemyMeshes.get(i.id);if(a||(a=this.createEnemyMesh(i.type),this.scene.add(a),this.enemyMeshes.set(i.id,a)),a.position.x=i.worldPos.x,a.position.z=i.worldPos.y,a.position.y=.4+Math.sin(Date.now()*.005+i.id)*.1,i.moveDir!==0){let h=0;switch(i.moveDir){case 1:h=0;break;case 2:h=Math.PI;break;case 3:h=-Math.PI/2;break;case 4:h=Math.PI/2;break}a.rotation.y=Je.lerp(a.rotation.y,h,.1)}const l=1+Math.sin(Date.now()*.008+i.id*.5)*.05;a.scale.setScalar(l)}}createEnemyMesh(t){const e=new F,s=this.enemyColors[t]||16729156,i=new D(.35,16,16),a=new x({color:s,emissive:s,emissiveIntensity:.3,roughness:.3,metalness:.5}),l=new w(i,a);l.castShadow=!0,e.add(l);const h=new D(.08,8,8),d=new L({color:16777215}),p=new D(.04,8,8),b=new L({color:0}),o=new w(h,d);o.position.set(-.12,.1,.28);const n=new w(p,b);n.position.set(0,0,.05),o.add(n),e.add(o);const r=new w(h,d);r.position.set(.12,.1,.28);const u=new w(p,b);u.position.set(0,0,.05),r.add(u),e.add(r);const f=new Y(.15,.03,.03),g=new L({color:0}),m=new w(f,g);m.position.set(-.12,.2,.3),m.rotation.z=-.3,e.add(m);const v=new w(f,g);switch(v.position.set(.12,.2,.3),v.rotation.z=.3,e.add(v),t){case A.FAST:for(let W=0;W<3;W++){const S=new w(new we(.05,.2,4),new x({color:16776960,emissive:16776960,emissiveIntensity:.5}));S.position.set(-.3-W*.1,0,0),S.rotation.z=Math.PI/2,e.add(S)}break;case A.SMART:const H=new w(new D(.15,8,8),new x({color:16746751,emissive:16746751,emissiveIntensity:.3}));H.position.y=.35,e.add(H);break;case A.TANK:const U=new w(new Y(.6,.4,.6),new x({color:6710886,roughness:.2,metalness:.8}));U.position.y=0,e.add(U);break}const k=new et(.4,16),C=new L({color:s,transparent:!0,opacity:.3,side:Q}),V=new w(k,C);return V.rotation.x=-Math.PI/2,V.position.y=-.35,e.add(V),e}removeEnemy(t){const e=this.enemyMeshes.get(t);e&&(this.scene.remove(e),this.enemyMeshes.delete(t))}dispose(){for(const t of this.enemyMeshes.values())this.scene.remove(t);this.enemyMeshes.clear()}}class Tt{scene;assets;animationMixers=[];waterMesh;palmTrees=[];breezeParticles;time=0;textureCache=new Map;constructor(t){console.log("[MiamiBeachTheme] 🏖️ Constructor called"),this.scene=t,this.assets=this.createAssets(),console.log("[MiamiBeachTheme] ✅ Assets created:",Object.keys(this.assets)),this.setupEnvironment(),this.createDecorations(),console.log("[MiamiBeachTheme] 🎉 Theme setup complete. Scene children count:",this.scene.children.length)}createSandTexture(){const t=document.createElement("canvas");t.width=1024,t.height=1024;const e=t.getContext("2d"),s=e.createLinearGradient(0,0,1024,1024);s.addColorStop(0,"#e8c98f"),s.addColorStop(.3,"#f5deb3"),s.addColorStop(.5,"#e8c98f"),s.addColorStop(.7,"#deb887"),s.addColorStop(1,"#e8c98f"),e.fillStyle=s,e.fillRect(0,0,1024,1024),e.strokeStyle="#d4a574",e.lineWidth=2;for(let h=0;h<40;h++){e.beginPath();const d=Math.random()*1024;e.moveTo(0,d);for(let p=0;p<=1024;p+=50)e.lineTo(p,d+Math.sin(p*.02)*20+Math.random()*10);e.stroke()}const i=e.getImageData(0,0,1024,1024),a=i.data;for(let h=0;h<a.length;h+=4){const d=(Math.random()-.5)*15;a[h]+=d,a[h+1]+=d,a[h+2]+=d}e.putImageData(i,0,0),e.fillStyle="#fff8dc";for(let h=0;h<200;h++){const d=Math.random()*1024,p=Math.random()*1024,b=Math.random()*2;e.beginPath(),e.arc(d,p,b,0,Math.PI*2),e.fill()}const l=new J(t);return l.wrapS=se,l.wrapT=se,l.repeat.set(4,4),l.anisotropy=16,l}createWaterNormalMap(){const t=document.createElement("canvas");t.width=512,t.height=512;const e=t.getContext("2d"),s=e.createImageData(512,512),i=s.data;for(let l=0;l<512;l++)for(let h=0;h<512;h++){const d=(l*512+h)*4,p=Math.sin(h*.05+l*.03)*127+128,b=Math.sin(h*.08-l*.05)*64;i[d]=p+b,i[d+1]=200,i[d+2]=255,i[d+3]=255}e.putImageData(s,0,0);const a=new J(t);return a.wrapS=se,a.wrapT=se,a}createSkyGradient(){const t=document.createElement("canvas");t.width=1,t.height=1024;const e=t.getContext("2d"),s=e.createLinearGradient(0,0,0,1024);return s.addColorStop(0,"#ff6b9d"),s.addColorStop(.2,"#ff8c69"),s.addColorStop(.4,"#ffa500"),s.addColorStop(.6,"#ff7f50"),s.addColorStop(.8,"#9370db"),s.addColorStop(1,"#4b0082"),e.fillStyle=s,e.fillRect(0,0,1,1024),new J(t)}createWoodTexture(){const t=document.createElement("canvas");t.width=512,t.height=512;const e=t.getContext("2d");e.fillStyle="#8b7355",e.fillRect(0,0,512,512),e.strokeStyle="#6b5344",e.lineWidth=3;for(let i=0;i<50;i++){e.beginPath();const a=Math.random()*512;e.moveTo(a,0),e.lineTo(a+(Math.random()-.5)*50,512),e.stroke()}e.fillStyle="rgba(100, 90, 80, 0.3)";for(let i=0;i<100;i++)e.beginPath(),e.arc(Math.random()*512,Math.random()*512,Math.random()*20,0,Math.PI*2),e.fill();return new J(t)}createCoralTexture(){const t=document.createElement("canvas");t.width=512,t.height=512;const e=t.getContext("2d"),s=e.createRadialGradient(256,256,0,256,256,300);s.addColorStop(0,"#ff7f7f"),s.addColorStop(.5,"#ff6b6b"),s.addColorStop(1,"#cd5c5c"),e.fillStyle=s,e.fillRect(0,0,512,512),e.fillStyle="rgba(255, 200, 200, 0.4)";for(let a=0;a<200;a++){const l=Math.random()*512,h=Math.random()*512,d=Math.random()*8+2;e.beginPath(),e.arc(l,h,d,0,Math.PI*2),e.fill()}e.strokeStyle="rgba(80, 40, 40, 0.6)",e.lineWidth=2;for(let a=0;a<15;a++){e.beginPath();let l=Math.random()*512,h=Math.random()*512;e.moveTo(l,h);for(let d=0;d<5;d++)l+=(Math.random()-.5)*50,h+=(Math.random()-.5)*50,e.lineTo(l,h);e.stroke()}return new J(t)}createAssets(){const t=this.createSandTexture(),e=new x({map:t,roughness:.9,metalness:0,bumpMap:t,bumpScale:.02}),s=this.createCoralTexture(),i=new x({map:s,roughness:.8,metalness:.1,bumpMap:s,bumpScale:.05}),a=this.createWoodTexture(),l=new x({map:a,roughness:.7,metalness:0,bumpMap:a,bumpScale:.03}),h=this.createWaterNormalMap(),d=new He({color:4251856,transparent:!0,opacity:.8,roughness:.05,metalness:.1,transmission:.3,thickness:1,normalMap:h,normalScale:new tt(.5,.5),envMapIntensity:1,clearcoat:1,clearcoatRoughness:.1}),p=new x({color:9127187,roughness:.9,metalness:0}),b=new x({color:2263842,roughness:.6,metalness:0,side:Q}),o=new x({color:16716947,emissive:16711782,emissiveIntensity:.2,roughness:.4,metalness:.3}),n=new x({color:65535,emissive:34986,emissiveIntensity:.1,roughness:.2,metalness:.4});return{floorMaterial:e,hardBlockMaterial:i,softBlockMaterial:l,waterMaterial:d,palmTrunkMaterial:p,palmLeafMaterial:b,umbrellaMaterial:o,surfboardMaterial:n,skyGradient:this.createSkyGradient()}}setupEnvironment(){console.log("[MiamiBeachTheme] 🌅 Setting up environment...");const t=this.scene.children.filter(b=>b instanceof ue).length;this.scene.children.filter(b=>b instanceof ue).forEach(b=>this.scene.remove(b)),console.log(`[MiamiBeachTheme] 💡 Removed ${t} existing lights`);const e=new de(16755319,.4);this.scene.add(e);const s=new X(16746564,1.2);s.position.set(20,15,-20),s.castShadow=!0,s.shadow.mapSize.set(2048,2048),s.shadow.camera.near=.5,s.shadow.camera.far=100,s.shadow.camera.left=-30,s.shadow.camera.right=30,s.shadow.camera.top=30,s.shadow.camera.bottom=-30,s.shadow.bias=-.001,this.scene.add(s);const i=new X(16716947,.6);i.position.set(-20,10,20),this.scene.add(i);const a=new X(9662683,.3);a.position.set(0,5,20),this.scene.add(a),this.scene.fog=new st(16755336,.015),console.log("[MiamiBeachTheme] 🌫️ Fog added");const l=new D(80,32,32),h=new L({map:this.assets.skyGradient,side:he}),d=new w(l,h);d.name="miami_sky",d.userData.isThemeDecoration=!0,this.scene.add(d),console.log("[MiamiBeachTheme] 🌌 Sky sphere added");const p=new ce(120,120,64,64);this.waterMesh=new w(p,this.assets.waterMaterial),this.waterMesh.rotation.x=-Math.PI/2,this.waterMesh.position.y=-.5,this.waterMesh.name="miami_water",this.waterMesh.userData.isThemeDecoration=!0,this.scene.add(this.waterMesh),console.log("[MiamiBeachTheme] 🌊 Water plane added at y=-0.5")}createDecorations(){console.log("[MiamiBeachTheme] 🌴 Creating decorations..."),this.createPalmTrees(),this.createBreezeParticles(),console.log(`[MiamiBeachTheme] 🎨 Decorations complete. Palm trees: ${this.palmTrees.length}`)}createPalmTrees(){[{x:-5,z:-5,scale:1.2,rotation:.3},{x:20,z:-3,scale:1,rotation:-.2},{x:-3,z:18,scale:1.1,rotation:.1},{x:19,z:19,scale:.9,rotation:-.3},{x:8,z:-6,scale:1.3,rotation:0},{x:-6,z:8,scale:1,rotation:.4}].forEach((e,s)=>{const i=new F;i.position.set(e.x,0,e.z),i.rotation.y=e.rotation,i.scale.setScalar(e.scale),i.userData.isThemeDecoration=!0;const a=new ot([new O(0,0,0),new O(.2,1.5,0),new O(.5,3,.1),new O(.8,4,.2)]),l=new it(a,8,.15,8,!1),h=new w(l,this.assets.palmTrunkMaterial);h.castShadow=!0,i.add(h);const d=new F;d.position.set(.8,4,.2);const p=7;for(let b=0;b<p;b++){const o=this.createPalmFrond(b/p*Math.PI*2);o.rotation.y=b/p*Math.PI*2,d.add(o)}i.add(d),this.palmTrees.push(d),this.scene.add(i)})}createPalmFrond(t){const e=new Ae;e.moveTo(0,0),e.quadraticCurveTo(.3,1,0,2),e.quadraticCurveTo(-.3,1,0,0);const s={depth:.02,bevelEnabled:!1},i=new Ee(e,s),a=new w(i,this.assets.palmLeafMaterial);return a.position.set(0,0,0),a.rotation.x=Math.PI/4,a.scale.set(.8,.8,.8),a.castShadow=!0,a}createBreezeParticles(){const e=new $e,s=new Float32Array(300),i=[];for(let l=0;l<100;l++)s[l*3]=(Math.random()-.5)*30,s[l*3+1]=Math.random()*10,s[l*3+2]=(Math.random()-.5)*30,i.push((Math.random()-.5)*.02,(Math.random()-.5)*.01,(Math.random()-.5)*.02);e.setAttribute("position",new Ue(s,3));const a=new We({color:16777198,size:.05,transparent:!0,opacity:.4,blending:$});this.breezeParticles=new je(e,a),this.breezeParticles.userData={velocities:i,isThemeDecoration:!0},this.scene.add(this.breezeParticles)}addBeachDecorations(){this.addBeachUmbrellas(),this.addSurfboards()}addBeachUmbrellas(){[{x:-3,z:8},{x:20,z:10},{x:10,z:-4}].forEach(e=>{const s=new F;s.position.set(e.x,0,e.z),s.userData.isThemeDecoration=!0;const i=new le(.03,.03,2.5,8),a=new x({color:16777215}),l=new w(i,a);l.position.y=1.25,l.castShadow=!0,s.add(l);const h=new we(1.5,.8,8),d=new w(h,this.assets.umbrellaMaterial);d.position.y=2.3,d.castShadow=!0,s.add(d);const p=new Ne(1.4,1.5,8),b=new L({color:16716947,transparent:!0,opacity:.3,side:Q}),o=new w(p,b);o.rotation.x=-Math.PI/2,o.position.y=2.3,s.add(o),this.scene.add(s)})}addSurfboards(){[{x:-4,z:5,rot:.5,color:65535},{x:21,z:15,rot:-.3,color:16711935}].forEach(e=>{const s=new F;s.position.set(e.x,.4,e.z),s.rotation.y=e.rot,s.userData.isThemeDecoration=!0;const i=new Ae;i.moveTo(0,-1.2),i.bezierCurveTo(.3,-1.2,.35,0,.35,.8),i.bezierCurveTo(.35,1.2,0,1.5,0,1.5),i.bezierCurveTo(0,1.5,-.35,1.2,-.35,.8),i.bezierCurveTo(-.35,0,-.3,-1.2,0,-1.2);const a={depth:.08,bevelEnabled:!0,bevelThickness:.02,bevelSize:.02,bevelSegments:2},l=new Ee(i,a),h=new w(l,this.assets.surfboardMaterial);h.rotation.x=Math.PI/2,h.position.y=0,h.castShadow=!0,s.add(h),this.scene.add(s)})}update(t){if(this.time+=t,this.waterMesh){const e=this.waterMesh.geometry.attributes.position.array;for(let s=0;s<e.length;s+=3){const i=e[s],a=e[s+1];e[s+2]=Math.sin(i*.3+this.time)*.1+Math.cos(a*.2+this.time*.8)*.1}this.waterMesh.geometry.attributes.position.needsUpdate=!0,this.waterMesh.geometry.computeVertexNormals()}if(this.palmTrees.forEach((e,s)=>{const i=Math.sin(this.time*.5+s)*.05;e.rotation.z=i,e.rotation.x=Math.cos(this.time*.3+s)*.03}),this.breezeParticles){const e=this.breezeParticles.geometry.attributes.position.array,s=this.breezeParticles.userData.velocities;for(let i=0;i<e.length/3;i++)e[i*3]+=s[i*3]+Math.sin(this.time+i)*.001,e[i*3+1]+=s[i*3+1],e[i*3+2]+=s[i*3+2]+Math.cos(this.time+i)*.001,e[i*3+1]>10&&(e[i*3+1]=0),e[i*3]>15&&(e[i*3]=-15),e[i*3]<-15&&(e[i*3]=15),e[i*3+2]>15&&(e[i*3+2]=-15),e[i*3+2]<-15&&(e[i*3+2]=15);this.breezeParticles.geometry.attributes.position.needsUpdate=!0}}getMaterials(){return console.log("[MiamiBeachTheme] 📦 getMaterials() called"),{floor:this.assets.floorMaterial,hardBlock:this.assets.hardBlockMaterial,softBlock:this.assets.softBlockMaterial}}dispose(){this.textureCache.forEach(t=>t.dispose()),Object.values(this.assets).forEach(t=>{(t instanceof Ye||t instanceof nt)&&t.dispose()})}}class At{scene;currentTheme=null;defaultMaterials;constructor(t){this.scene=t,this.defaultMaterials=this.createDefaultMaterials()}createDefaultMaterials(){return{floor:new x({color:2763306,roughness:.8}),hardBlock:new x({color:5592405,roughness:.7}),softBlock:new x({color:9136404,roughness:.6})}}loadTheme(t){switch(console.log(`[ThemeManager] 🎨 loadTheme() called with theme: ${t}`),this.cleanup(),t){case y.MIAMI_BEACH:console.log("[ThemeManager] 🏖️ Creating Miami Beach theme..."),this.currentTheme=this.createMiamiBeachTheme();break;case y.LAHO_VIDEO:console.log("[ThemeManager] 🎬 Creating Laho Video theme (flying carpet)..."),this.currentTheme=this.createVideoBackgroundTheme();break;case y.CLASSIC:case y.ICE:case y.VOLCANO:case y.FOREST:case y.DESERT:case y.SPACE:default:this.currentTheme=this.createDefaultTheme(t);break}}createMiamiBeachTheme(){console.log("[ThemeManager] 🏗️ createMiamiBeachTheme() called");const t=new Tt(this.scene);t.addBeachDecorations();const e=t.getMaterials();return console.log("[ThemeManager] ✅ Miami Beach theme created. Materials:",Object.keys(e)),{name:y.MIAMI_BEACH,instance:t,materials:e}}createDefaultTheme(t){const e=this.getThemeColors(t);this.scene.background=new oe(e.background),this.scene.fog=null;const s={floor:new x({color:e.floor,roughness:.8}),hardBlock:new x({color:6710886,roughness:.7}),softBlock:new x({color:e.accent,roughness:.6})};return this.setupBasicLighting(e),{name:t,instance:null,materials:s}}createVideoBackgroundTheme(){this.scene.background=null,this.scene.fog=null;const t={floor:new x({color:1710634,roughness:.4,metalness:.2,transparent:!0,opacity:.85}),hardBlock:new x({color:3355460,roughness:.5,metalness:.3}),softBlock:new x({color:4474111,roughness:.4,emissive:1118532,emissiveIntensity:.3})};return this.setupVideoLighting(),{name:y.LAHO_VIDEO,instance:null,materials:t}}setupVideoLighting(){this.scene.children.filter(i=>i instanceof ue).forEach(i=>this.scene.remove(i));const t=new de(16777215,.6);this.scene.add(t);const e=new X(16768392,.8);e.position.set(5,20,10),e.castShadow=!0,e.shadow.mapSize.set(1024,1024),this.scene.add(e);const s=new X(4491519,.4);s.position.set(-5,-5,0),this.scene.add(s)}setupBasicLighting(t){this.scene.children.filter(i=>i instanceof ue).forEach(i=>this.scene.remove(i));const e=new de(16777215,.4);this.scene.add(e);const s=new X(t.accent,.8);s.position.set(10,15,10),s.castShadow=!0,s.shadow.mapSize.set(1024,1024),this.scene.add(s)}getThemeColors(t){switch(t){case y.ICE:return{background:662058,floor:2771562,accent:8965375};case y.VOLCANO:return{background:1706506,floor:4860458,accent:16737860};case y.FOREST:return{background:662026,floor:2771498,accent:6750088};case y.DESERT:return{background:1710602,floor:6969914,accent:16764006};case y.SPACE:return{background:328976,floor:2763338,accent:11176191};case y.CLASSIC:default:return{background:657930,floor:2763306,accent:43775}}}update(t){this.currentTheme?.instance&&this.currentTheme.instance.update(t)}getMaterials(){const t=this.currentTheme?.materials??this.defaultMaterials;return console.log(`[ThemeManager] 📦 getMaterials() returning materials for theme: ${this.currentTheme?.name??"default"}`),t}getCurrentTheme(){return this.currentTheme?.name??null}hasActiveEffects(){return this.currentTheme?.instance!==null}cleanup(){this.currentTheme?.instance&&this.currentTheme.instance.dispose();const t=[];this.scene.traverse(e=>{e.userData.isThemeDecoration&&t.push(e)}),t.forEach(e=>{e.parent&&e.parent.remove(e)}),this.currentTheme=null}dispose(){this.cleanup(),Object.values(this.defaultMaterials).forEach(t=>t.dispose())}}class Me{scene;camera;renderer;floorMesh;hardBlockPool;softBlockPool;astronautCharacters=[];bombMeshes=new Map;explosionMeshes=[];powerUpMeshes=[];matFloor;matHard;matSoft;matBomb=new x({color:1118481});matBombPrimed=new x({color:3359999,emissive:1122986});matBombRushed=new x({color:16720418,emissive:11145489});matExplosion=new x({color:16737792,emissive:16729088,transparent:!0,opacity:.85});matPowerUp=new x({color:4521796,emissive:2271778});themeManager;scrollingBackgrounds=[];backgroundSpeed=.02;backgroundOffset=0;geoBlock=new Y(I*.95,I*.95,I*.95);geoBomb=new D(I*.45,16,16);geoExplosion=new Y(I*.9,I*.25,I*.9);geoPowerUp=new Y(I*.35,I*.35,I*.35);dummy=new ve;weatherSystem;currentTheme=y.CLASSIC;flyingObjectsSystem;enemyRenderer;lastFrameTime=0;frameDeltaTime=.016;videoBackgroundMode=!1;boardGroup=null;flyingCarpetEnabled=!1;carpetTime=0;constructor(){this.scene=new at,this.scene.background=new oe(657930),this.themeManager=new At(this.scene),this.matFloor=new x({color:2763306}),this.matHard=new x({color:5592405}),this.matSoft=new x({color:9136404});const t=(_-1)/2*I;this.camera=new rt(55,window.innerWidth/window.innerHeight,.1,300),this.camera.position.set(t,28*I,t+20*I),this.camera.lookAt(t,0,t);try{this.renderer=new lt({antialias:!0,alpha:!0,premultipliedAlpha:!1})}catch(d){throw Me.showWebGLError(),new Error("WebGL initialization failed: "+(d instanceof Error?d.message:String(d)))}this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ct,this.renderer.domElement.style.position="relative",this.renderer.domElement.style.zIndex="2",document.body.appendChild(this.renderer.domElement);const e=new de(16777215,.4);this.scene.add(e);const s=new X(16777215,.8);s.position.set(t+5*I,20*I,t-5*I),s.castShadow=!0,s.shadow.mapSize.set(2048,2048),s.shadow.camera.near=1,s.shadow.camera.far=60*I;const i=_*I;s.shadow.camera.left=-i,s.shadow.camera.right=i,s.shadow.camera.top=i,s.shadow.camera.bottom=-i,this.scene.add(s);const a=_*I,l=new ce(a,a);this.floorMesh=new w(l,this.matFloor),this.floorMesh.rotation.x=-Math.PI/2,this.floorMesh.position.set(t,-.01,t),this.floorMesh.receiveShadow=!0,this.scene.add(this.floorMesh);const h=_*_;this.hardBlockPool=new z(this.geoBlock,this.matHard,h),this.hardBlockPool.castShadow=!0,this.hardBlockPool.receiveShadow=!0,this.scene.add(this.hardBlockPool),this.softBlockPool=new z(this.geoBlock,this.matSoft,h),this.softBlockPool.castShadow=!0,this.softBlockPool.receiveShadow=!0,this.scene.add(this.softBlockPool),window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}),this.weatherSystem=new De(this.scene),this.flyingObjectsSystem=new kt(this.scene),this.enemyRenderer=new St(this.scene)}syncState(t,e,s=.016){let i=0,a=0;for(let l=0;l<_;l++)for(let h=0;h<_;h++){const d=t.grid[l][h];d===E.HardBlock?(this.dummy.position.set(h,.475,l),this.dummy.updateMatrix(),this.hardBlockPool.setMatrixAt(i++,this.dummy.matrix)):d===E.SoftBlock&&(this.dummy.position.set(h,.475,l),this.dummy.updateMatrix(),this.softBlockPool.setMatrixAt(a++,this.dummy.matrix))}this.hardBlockPool.count=i,this.hardBlockPool.instanceMatrix.needsUpdate=!0,this.softBlockPool.count=a,this.softBlockPool.instanceMatrix.needsUpdate=!0,this.syncPlayers(t,s),this.syncBombs(t),this.syncExplosions(t),this.syncPowerUps(t),this.animateBackground(s)}animateBackground(t){this.scrollingBackgrounds.length>=2&&(this.backgroundOffset+=this.backgroundSpeed*t*60,this.scrollingBackgrounds.forEach((e,s)=>{const i=(this.backgroundOffset+s*45)%90-22.5;e.position.x=(_-1)/2+i;const a=Date.now()*.001;e.position.y=8+Math.sin(a+s)*.2,e.rotation.z=Math.sin(a*.5+s)*.02}))}syncPlayers(t,e){for(;this.astronautCharacters.length<t.players.length;){const s=this.astronautCharacters.length,i=new xt({playerId:s,scale:1.3});this.scene.add(i.root),this.astronautCharacters.push(i)}for(let s=0;s<this.astronautCharacters.length;s++){const i=this.astronautCharacters[s];if(s<t.players.length){const a=t.players[s];if(a.alive){if(i.setVisible(!0),i.setPosition(a.worldPos.x,0,a.worldPos.y),a.moveDir!==0){i.setAnimationState(re.WALK);let l=0;switch(a.moveDir){case 1:l=0;break;case 2:l=Math.PI;break;case 3:l=-Math.PI/2;break;case 4:l=Math.PI/2;break}i.setRotationY(l)}else i.setAnimationState(re.IDLE);i.update(e)}else i.getAnimationState()!==re.DEATH&&!i.isDeathComplete()&&i.die(),i.update(e),i.isDeathComplete()&&i.setVisible(!1)}else i.setVisible(!1)}}syncBombs(t){const e=new Set(t.bombs.map(s=>s.id));for(const[s,i]of this.bombMeshes)e.has(s)||(this.scene.remove(i),this.bombMeshes.delete(s));for(const s of t.bombs){let i=this.bombMeshes.get(s.id);if(!i){const l=s.primed?this.matBombPrimed:s.rushed?this.matBombRushed:this.matBomb;i=new w(this.geoBomb,l),i.castShadow=!0,this.scene.add(i),this.bombMeshes.set(s.id,i)}i.position.set(s.gridPos.col,.5,s.gridPos.row);const a=1+.15*Math.sin(Date.now()*.01*(s.rushed?4:s.primed?1:2));i.scale.setScalar(a)}}syncExplosions(t){for(;this.explosionMeshes.length>t.explosions.length;){const e=this.explosionMeshes.pop();this.scene.remove(e)}for(let e=0;e<t.explosions.length;e++){let s=this.explosionMeshes[e];s||(s=new w(this.geoExplosion,this.matExplosion.clone()),s.castShadow=!1,this.scene.add(s),this.explosionMeshes.push(s));const i=t.explosions[e];s.position.set(i.gridPos.col,.15,i.gridPos.row),s.material.opacity=Math.min(1,i.remaining*2)}}syncPowerUps(t){for(;this.powerUpMeshes.length>t.powerUps.length;){const e=this.powerUpMeshes.pop();this.scene.remove(e)}for(let e=0;e<t.powerUps.length;e++){let s=this.powerUpMeshes[e];s||(s=new w(this.geoPowerUp,this.matPowerUp),this.scene.add(s),this.powerUpMeshes.push(s));const i=t.powerUps[e];s.position.set(i.gridPos.col,.3+.1*Math.sin(Date.now()*.003),i.gridPos.row),s.rotation.y+=.02}}frameCount=0;render(t){const e=performance.now();this.lastFrameTime>0&&(this.frameDeltaTime=Math.min((e-this.lastFrameTime)/1e3,.05)),this.lastFrameTime=e,this.weatherSystem.update(this.frameDeltaTime),this.themeManager.update(this.frameDeltaTime),this.videoBackgroundMode||this.flyingObjectsSystem.update(this.frameDeltaTime),this.updateFlyingCarpet(this.frameDeltaTime),this.frameCount++,this.frameCount%60===0&&console.log(`[SceneManager] 📊 Frame ${this.frameCount}, Scene children: ${this.scene.children.length}, Current theme: ${this.currentTheme}`),this.renderer.render(this.scene,this.camera)}syncEnemies(t,e){this.enemyRenderer.syncEnemies(t,e)}setWeather(t,e=.5){this.weatherSystem.setWeather(t,e)}setWeatherEnabled(t){this.weatherSystem.setEnabled(t)}setWeatherIntensity(t){this.weatherSystem.setIntensity(t)}setTheme(t){console.log(`[SceneManager] 🎨 setTheme() called: ${t}`),this.currentTheme=t,this.themeManager.loadTheme(t),this.flyingObjectsSystem.setTheme(t);const e=this.themeManager.getMaterials();console.log("[SceneManager] 📦 Got theme materials:",e),console.log("[SceneManager] 🔄 Updating floor material..."),this.updateFloorMaterial(e.floor),console.log("[SceneManager] 🔄 Updating block materials..."),this.updateBlockMaterials(e.hardBlock,e.softBlock);const s=De.getWeatherForTheme(t);console.log(`🌦️ Theme: ${t} → Weather: ${s}`),s!==_e.NONE?(this.weatherSystem.setWeather(s,.6),console.log(`✅ Weather activated: ${s}`)):(this.weatherSystem.setWeather(_e.NONE),console.log("☀️ No weather (sunny/clear)")),this.createScrollingBackground(t)}createScrollingBackground(t){this.scrollingBackgrounds.forEach(a=>this.scene.remove(a)),this.scrollingBackgrounds=[];const s={[y.CLASSIC]:"/images/backgrounds/bg-classic.png",[y.ICE]:"/images/backgrounds/bg-ice.png",[y.VOLCANO]:"/images/backgrounds/bg-volcano.png",[y.FOREST]:"/images/backgrounds/bg-forest.png",[y.DESERT]:"/images/backgrounds/bg-desert.png",[y.SPACE]:"/images/backgrounds/bg-space.png",[y.MIAMI_BEACH]:"/images/backgrounds/bg-miami.png",[y.LAHO_VIDEO]:""}[t];if(!s)return;new ut().load(s,a=>{a.wrapS=se,a.wrapT=dt,a.repeat.set(3,1);const l=new ce(45,20),h=new L({map:a,transparent:!0,opacity:.6,side:Q}),d=(_-1)/2;for(let p=0;p<2;p++){const b=new w(l,h);b.position.set(d+p*45-22.5,8,d-12),b.rotation.x=-.1,b.renderOrder=-10,this.scene.add(b),this.scrollingBackgrounds.push(b)}console.log(`[SceneManager] ✅ Scrolling background created: ${s}`)},void 0,a=>{console.warn(`[SceneManager] Failed to load background: ${s}`,a)})}updateFloorMaterial(t){console.log(`[SceneManager] 🔄 updateFloorMaterial() called. Current: ${this.matFloor.uuid}, New: ${t.uuid}`),this.matFloor!==t?(this.matFloor.dispose(),this.matFloor=t,this.floorMesh.material=this.matFloor,console.log("[SceneManager] ✅ Floor material updated")):console.log("[SceneManager] ⚠️ Floor material is the same reference, skipping update")}updateBlockMaterials(t,e){console.log("[SceneManager] 🔄 updateBlockMaterials() called"),this.matHard.dispose(),this.matSoft.dispose(),this.matHard=t,this.matSoft=e,this.hardBlockPool.material=this.matHard,this.softBlockPool.material=this.matSoft,console.log("[SceneManager] ✅ Block materials updated on instanced meshes")}getCurrentTheme(){return this.currentTheme}enableVideoBackgroundMode(t){this.videoBackgroundMode=t,t?(this.scene.background=null,this.renderer.setClearColor(0,0),this.flyingObjectsSystem.dispose(),this.scrollingBackgrounds.forEach(e=>{e.visible=!1}),console.log("[SceneManager] 🎬 Video background mode ENABLED")):(this.scene.background=new oe(657930),this.renderer.setClearColor(657930,1),this.scrollingBackgrounds.forEach(e=>{e.visible=!0}),console.log("[SceneManager] 🎬 Video background mode DISABLED"))}enableFlyingCarpetEffect(t){this.flyingCarpetEnabled=t,console.log(`[SceneManager] 🧞 Flying carpet effect: ${t?"ENABLED":"DISABLED"}`)}updateFlyingCarpet(t){if(!this.flyingCarpetEnabled)return;this.carpetTime+=t;const e=Math.sin(this.carpetTime*1.2)*.25,s=Math.sin(this.carpetTime*.7)*.03,i=Math.cos(this.carpetTime*.5)*.025,a=Math.sin(this.carpetTime*2.5)*.01;this.floorMesh&&(this.floorMesh.position.y=-.01+e,this.floorMesh.rotation.x=-Math.PI/2+s,this.floorMesh.rotation.z=i+a),this.hardBlockPool.position.y=e*.9,this.softBlockPool.position.y=e*.95;const l=Math.sin(this.carpetTime*.4)*.1;this.camera.position.x+=(l-this.camera.position.x+(_-1)/2)*.02}dispose(){this.weatherSystem.dispose(),this.themeManager.dispose(),this.flyingObjectsSystem.dispose(),this.enemyRenderer.dispose();for(const t of this.astronautCharacters)t.dispose(),this.scene.remove(t.root);this.astronautCharacters=[],this.scrollingBackgrounds.forEach(t=>{this.scene.remove(t),t.geometry.dispose(),t.material instanceof Ye&&t.material.dispose()}),this.scrollingBackgrounds=[],this.renderer.dispose(),this.matFloor.dispose(),this.matHard.dispose(),this.matSoft.dispose(),this.matBomb.dispose(),this.matBombPrimed.dispose(),this.matBombRushed.dispose(),this.matExplosion.dispose(),this.matPowerUp.dispose(),this.geoBlock.dispose(),this.geoBomb.dispose(),this.geoExplosion.dispose(),this.geoPowerUp.dispose(),this.renderer.domElement.remove()}static showWebGLError(){const t=document.createElement("div");t.style.cssText=`
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
    `,t.innerHTML=`
      <h2 style="margin: 0 0 15px 0; color: #ff6666;">WebGL Not Supported</h2>
      <p style="margin: 0 0 15px 0; line-height: 1.6;">
        This game requires WebGL to run, but your browser or device doesn't support it.
      </p>
      <p style="margin: 0; font-size: 14px; color: #aaa;">
        Try updating your browser or enabling hardware acceleration in settings.
      </p>
    `,document.body.appendChild(t)}}class Et{container;gameInfo;levelInfo=null;timerInfo=null;constructor(t="hud"){this.container=document.getElementById(t),this.gameInfo=document.getElementById("game-info"),this.createHUDElements()}createHUDElements(){this.levelInfo=document.createElement("div"),this.levelInfo.id="level-info",this.levelInfo.style.cssText=`
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
    `,this.container.appendChild(this.timerInfo)}update(t,e){const s=t.players[0];if(s){if(this.gameInfo&&(s.alive?this.gameInfo.innerHTML=`
          <span style="color: #e94560;">BOMBS:</span> ${s.maxBombs-s.activeBombs}/${s.maxBombs} &nbsp;
          <span style="color: #e94560;">RANGE:</span> ${s.bombRange} &nbsp;
          <span style="color: #e94560;">FUSE:</span> ${s.fuseCharges} &nbsp;
          <span style="color: #e94560;">SPD:</span> ${s.speed.toFixed(1)}
        `:this.gameInfo.innerHTML='<span style="color: #ef4444; font-weight: bold;">☠ ELIMINATED</span>'),this.levelInfo&&e){const i=this.getLevelName(e.currentLevel);this.levelInfo.textContent=`LEVEL ${e.currentLevel}: ${i}`}if(this.timerInfo&&e){const i=this.getElapsedTime(e);this.timerInfo.textContent=this.formatTime(i),e.phase===B.PAUSED?this.timerInfo.style.color="#fbbf24":this.timerInfo.style.color="#fff"}if(e){const i=e.phase===B.PLAYING||e.phase===B.PAUSED;this.levelInfo.style.display=i?"block":"none",this.timerInfo.style.display=i?"block":"none",this.gameInfo.style.display=i?"block":"none"}}}getLevelName(t){return{1:"Training Grounds",2:"Ice Caverns",3:"Volcano Core",4:"Enchanted Forest",5:"Desert Ruins",6:"Space Station"}[t]||"Unknown"}getElapsedTime(t){return t.phase===B.PAUSED&&t.pausedAt?Math.floor((t.pausedAt-t.levelStartTime-t.totalPauseTime)/1e3):Math.floor((Date.now()-t.levelStartTime-t.totalPauseTime)/1e3)}formatTime(t){const e=Math.floor(t/60),s=t%60;return`${e.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`}showMessage(t,e=3e3){const s=document.createElement("div");s.textContent=t,s.style.cssText=`
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
      animation: fadeInOut ${e}ms ease-in-out;
    `,this.container.appendChild(s),setTimeout(()=>s.remove(),e)}}class Ct{constructor(t,e){this.onUpdate=t,this.onRender=e}accumulator=0;tick=0;lastTime=0;rafId=0;running=!1;frameCount=0;fpsAccum=0;fps=0;start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.rafId=requestAnimationFrame(t=>this.loop(t)))}stop(){this.running=!1,cancelAnimationFrame(this.rafId)}loop(t){if(!this.running)return;const e=Math.min((t-this.lastTime)/1e3,.25);for(this.lastTime=t,this.accumulator+=e,this.fpsAccum+=e,this.frameCount++,this.fpsAccum>=1&&(this.fps=this.frameCount,this.frameCount=0,this.fpsAccum-=1);this.accumulator>=ae;)this.onUpdate(ae,this.tick),this.tick++,this.accumulator-=ae;const s=this.accumulator/ae;this.onRender(s),this.rafId=requestAnimationFrame(i=>this.loop(i))}getTick(){return this.tick}getSimRate(){return Xe}}function Bt(c,t){return t.col<0||t.col>=_||t.row<0||t.row>=_?!1:c[t.row][t.col]===E.Floor}function Oe(c){return{col:Math.round(c.x),row:Math.round(c.y)}}function It(c){switch(c){case M.Up:return{x:0,y:-1};case M.Down:return{x:0,y:1};case M.Left:return{x:-1,y:0};case M.Right:return{x:1,y:0};default:return{x:0,y:0}}}function Pt(c,t,e){const s=c.players[t];if(!s||!s.alive||s.moveDir===M.None)return;const i=It(s.moveDir),a=s.worldPos.x+i.x*s.speed*e,l=s.worldPos.y+i.y*s.speed*e,h=Oe({x:a,y:l}),d=s.gridPos;h.col!==d.col||(h.row,d.row),Bt(c.grid,h)&&(Lt(c,h,t)||(s.worldPos.x=a,s.worldPos.y=l,s.gridPos=Oe(s.worldPos)))}function Lt(c,t,e){return c.bombs.some(s=>s.gridPos.col===t.col&&s.gridPos.row===t.row&&s.ownerId!==e)}let Dt=1;const Ot=3,Vt=5,Gt=1.5;function zt(c,t){const e=c.players[t];if(!e||!e.alive||e.activeBombs>=e.maxBombs||c.bombs.some(i=>i.gridPos.col===e.gridPos.col&&i.gridPos.row===e.gridPos.row))return!1;const s={id:Dt++,gridPos:{...e.gridPos},ownerId:t,fuseRemaining:Ot,range:e.bombRange,primed:!1,rushed:!1};return c.bombs.push(s),e.activeBombs++,!0}function Ft(c,t){const e=[];for(let s=c.bombs.length-1;s>=0;s--)if(c.bombs[s].fuseRemaining-=t,c.bombs[s].fuseRemaining<=0){e.push({...c.bombs[s].gridPos});const i=c.players[c.bombs[s].ownerId];i&&i.activeBombs--,c.bombs.splice(s,1)}return e}function Ht(c,t){const e=c.players[t];if(!e||e.fuseCharges<=0)return!1;const s=c.bombs.find(i=>i.ownerId===t&&!i.primed);return s?(s.fuseRemaining=Vt,s.primed=!0,e.fuseCharges--,!0):!1}function Rt(c,t){const e=c.players[t];if(!e||e.fuseCharges<=0)return!1;const s=c.bombs.find(i=>i.ownerId===t&&!i.rushed);return s?(s.fuseRemaining=Math.min(s.fuseRemaining,Gt),s.rushed=!0,e.fuseCharges--,!0):!1}function Nt(c,t){const e=c.players[t];if(!e||e.fuseCharges<=0)return null;const s=c.bombs.findIndex(l=>l.ownerId===t);if(s===-1)return null;const a={...c.bombs[s].gridPos};return c.bombs.splice(s,1),e.activeBombs--,e.fuseCharges--,a}const $t=.5;function Ve(c,t,e){const s=[{pos:t,range:e}];for(;s.length>0;){const i=s.shift(),a=Ut(c,i.pos,i.range);for(const l of a){c.grid[l.row][l.col]===E.SoftBlock&&(c.grid[l.row][l.col]=E.Floor,jt(c,l)),c.explosions.push({gridPos:l,remaining:$t});for(const h of c.players)h.alive&&h.gridPos.col===l.col&&h.gridPos.row===l.row&&(h.alive=!1);for(let h=c.bombs.length-1;h>=0;h--){const d=c.bombs[h];if(d.gridPos.col===l.col&&d.gridPos.row===l.row){c.bombs.splice(h,1);const p=c.players[d.ownerId];p&&p.activeBombs>0&&p.activeBombs--,s.push({pos:d.gridPos,range:d.range})}}}}}function Ut(c,t,e){const s=[{...t}],i=[{dc:0,dr:-1},{dc:0,dr:1},{dc:-1,dr:0},{dc:1,dr:0}];for(const{dc:a,dr:l}of i)for(let h=1;h<=e;h++){const d=t.col+a*h,p=t.row+l*h;if(d<0||d>=_||p<0||p>=_||c.grid[p][d]===E.HardBlock||(s.push({col:d,row:p}),c.grid[p][d]===E.SoftBlock))break}return s}function Wt(c,t){for(let e=c.explosions.length-1;e>=0;e--)c.explosions[e].remaining-=t,c.explosions[e].remaining<=0&&c.explosions.splice(e,1)}function jt(c,t){if(Math.random()>.3)return;const e=[N.BombRange,N.BombCount,N.Speed,N.FuseCharge],s=e[Math.floor(Math.random()*e.length)];c.powerUps.push({gridPos:{...t},type:s})}function Yt(c){let t=!1;for(const e of c.players)if(e.alive)for(let s=c.powerUps.length-1;s>=0;s--){const i=c.powerUps[s];i.gridPos.col===e.gridPos.col&&i.gridPos.row===e.gridPos.row&&(Xt(c,e.id,i.type),c.powerUps.splice(s,1),t=!0)}return t}function Xt(c,t,e){const s=c.players[t];if(s)switch(e){case N.BombRange:s.bombRange=Math.min(s.bombRange+1,8);break;case N.BombCount:s.maxBombs=Math.min(s.maxBombs+1,8);break;case N.Speed:s.speed=Math.min(s.speed+.5,6);break;case N.FuseCharge:s.fuseCharges=Math.min(s.fuseCharges+1,5);break}}class qt{videoElement=null;videoContainer=null;overlayContainer=null;isPlaying=!1;currentVideoSrc=null;userInteracted=!1;constructor(){this.createVideoElement(),this.setupUserInteractionListener()}setupUserInteractionListener(){const t=()=>{this.userInteracted=!0,this.videoElement&&this.videoElement.paused&&this.currentVideoSrc&&this.videoElement.play().catch(()=>{})};document.addEventListener("click",t,{once:!1}),document.addEventListener("keydown",t,{once:!1}),document.addEventListener("touchstart",t,{once:!1})}createVideoElement(){this.videoContainer=document.createElement("div"),this.videoContainer.id="video-background-container",this.videoContainer.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 0;
      overflow: hidden;
      background: linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%);
    `,this.videoElement=document.createElement("video"),this.videoElement.id="video-background",this.videoElement.style.cssText=`
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
    `,this.videoElement.loop=!0,this.videoElement.muted=!1,this.videoElement.playsInline=!0,this.videoElement.preload="auto",this.videoElement.crossOrigin="anonymous";const t=document.createElement("div");t.style.cssText=`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%);
      pointer-events: none;
    `,this.videoContainer.appendChild(this.videoElement),this.videoContainer.appendChild(t),this.overlayContainer=document.createElement("div"),this.overlayContainer.id="flying-objects-overlay",this.overlayContainer.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1;
      pointer-events: none;
      overflow: hidden;
    `,document.body.insertBefore(this.videoContainer,document.body.firstChild),document.body.insertBefore(this.overlayContainer,this.videoContainer.nextSibling);const e=document.querySelector("canvas");e&&(e.style.position="relative",e.style.zIndex="2")}addFlyingObjects(){if(this.overlayContainer){this.overlayContainer.innerHTML="";for(let t=0;t<8;t++)this.createCloud(t);for(let t=0;t<20;t++)this.createSparkle(t);for(let t=0;t<5;t++)this.createBird(t)}}createCloud(t){const e=document.createElement("div"),s=80+Math.random()*120,i=Math.random()*100,a=15+Math.random()*20,l=Math.random()*-20,h=.3+Math.random()*.4;e.style.cssText=`
      position: absolute;
      top: ${i}%;
      left: -200px;
      width: ${s}px;
      height: ${s*.6}px;
      background: radial-gradient(ellipse at center, rgba(255,255,255,${h}) 0%, transparent 70%);
      border-radius: 50%;
      animation: flyCloud ${a}s linear ${l}s infinite;
      filter: blur(${2+Math.random()*3}px);
    `,this.overlayContainer?.appendChild(e)}createSparkle(t){const e=document.createElement("div"),s=2+Math.random()*4,i=Math.random()*100,a=3+Math.random()*5,l=Math.random()*-5;e.style.cssText=`
      position: absolute;
      top: ${i}%;
      left: -20px;
      width: ${s}px;
      height: ${s}px;
      background: white;
      border-radius: 50%;
      box-shadow: 0 0 ${s*2}px ${s}px rgba(255,255,255,0.5);
      animation: flySparkle ${a}s linear ${l}s infinite;
    `,this.overlayContainer?.appendChild(e)}createBird(t){const e=document.createElement("div"),s=10+Math.random()*40,i=8+Math.random()*6,a=Math.random()*-8,l=.5+Math.random()*.5;e.innerHTML="🕊️",e.style.cssText=`
      position: absolute;
      top: ${s}%;
      left: -50px;
      font-size: ${24*l}px;
      animation: flyBird ${i}s linear ${a}s infinite;
      filter: brightness(1.2);
    `,this.overlayContainer?.appendChild(e)}addAnimationStyles(){if(document.getElementById("flying-objects-styles"))return;const e=document.createElement("style");e.id="flying-objects-styles",e.textContent=`
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
    `,document.head.appendChild(e)}async loadVideo(t){if(this.videoElement)return this.currentVideoSrc=t,this.videoElement.src=t,this.addAnimationStyles(),new Promise((e,s)=>{if(!this.videoElement){s(new Error("No video element"));return}this.videoElement.onloadeddata=()=>{console.log("[VideoBackgroundSystem] Video loaded:",t),this.addFlyingObjects(),e()},this.videoElement.onerror=i=>{console.error("[VideoBackgroundSystem] Error loading video:",i),s(i)}})}async play(){if(!(!this.videoElement||this.isPlaying))try{await this.videoElement.play(),this.isPlaying=!0,console.log("[VideoBackgroundSystem] Video playing with audio")}catch(t){console.warn("[VideoBackgroundSystem] Autoplay blocked, trying muted:",t),this.videoElement.muted=!0;try{await this.videoElement.play(),this.isPlaying=!0,console.log("[VideoBackgroundSystem] Video playing (muted - click to unmute)"),this.showUnmuteHint()}catch(e){console.error("[VideoBackgroundSystem] Could not play video:",e)}}}showUnmuteHint(){const t=document.createElement("div");t.id="unmute-hint",t.style.cssText=`
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
    `,t.innerHTML="🔇 Click anywhere to enable audio",t.onclick=()=>{this.videoElement&&(this.videoElement.muted=!1),t.remove()},document.body.appendChild(t);const e=()=>{this.videoElement&&(this.videoElement.muted=!1),t.remove(),document.removeEventListener("click",e)};document.addEventListener("click",e,{once:!0})}pause(){!this.videoElement||!this.isPlaying||(this.videoElement.pause(),this.isPlaying=!1)}stop(){this.videoElement&&(this.videoElement.pause(),this.videoElement.currentTime=0,this.isPlaying=!1)}setVolume(t){this.videoElement&&(this.videoElement.volume=Math.max(0,Math.min(1,t)))}setMuted(t){this.videoElement&&(this.videoElement.muted=t)}setVisible(t){this.videoContainer&&(this.videoContainer.style.display=t?"block":"none"),this.overlayContainer&&(this.overlayContainer.style.display=t?"block":"none")}getIsPlaying(){return this.isPlaying}getCurrentSrc(){return this.currentVideoSrc}dispose(){this.stop(),this.videoContainer?.parentNode&&this.videoContainer.parentNode.removeChild(this.videoContainer),this.overlayContainer?.parentNode&&this.overlayContainer.parentNode.removeChild(this.overlayContainer),this.videoElement=null,this.videoContainer=null,this.overlayContainer=null}}let fe=null;function Kt(){return fe||(fe=new qt),fe}const Zt={[A.BASIC]:1,[A.FAST]:2.5,[A.SMART]:1.5,[A.TANK]:.7},Ge=1.5;function Qt(c,t,e){const s=c.enemies;if(s)for(const i of s){if(!i.alive)continue;i.dirChangeTimer=(i.dirChangeTimer||0)+e;const a=Zt[i.type]||1;if(i.dirChangeTimer>=Ge||i.moveDir===M.None)switch(i.dirChangeTimer=0,i.type){case A.SMART:i.moveDir=ge(i.gridPos,t);break;case A.BASIC:case A.FAST:default:Math.random()<.3?i.moveDir=ge(i.gridPos,t):i.moveDir=be();break;case A.TANK:Math.random()<.5?i.moveDir=ge(i.gridPos,t):i.moveDir=be();break}if(i.moveDir!==M.None){const l=a*e,{dx:h,dy:d}=es(i.moveDir),p=i.worldPos.x+h*l,b=i.worldPos.y+d*l,o=Math.round(p),n=Math.round(b);ts(c,o,n)?(i.worldPos.x=p,i.worldPos.y=b,i.gridPos.col=Math.round(i.worldPos.x),i.gridPos.row=Math.round(i.worldPos.y)):(i.moveDir=be(),i.dirChangeTimer=Ge)}}}function Jt(c,t){const e=c.enemies;if(!e)return!1;const s=.6;for(const i of e){if(!i.alive)continue;const a=i.worldPos.x-t.x,l=i.worldPos.y-t.y;if(Math.sqrt(a*a+l*l)<s)return!0}return!1}function ze(c,t){const e=c.enemies;if(!e)return!1;for(const s of e)if(s.alive&&s.gridPos.col===t.col&&s.gridPos.row===t.row)return s.alive=!1,!0;return!1}function ge(c,t){const e=t.col-c.col,s=t.row-c.row;return Math.abs(e)>Math.abs(s)?e>0?M.Right:M.Left:s!==0?s>0?M.Down:M.Up:M.None}function be(){const c=[M.Up,M.Down,M.Left,M.Right];return c[Math.floor(Math.random()*c.length)]}function es(c){switch(c){case M.Up:return{dx:0,dy:-1};case M.Down:return{dx:0,dy:1};case M.Left:return{dx:-1,dy:0};case M.Right:return{dx:1,dy:0};default:return{dx:0,dy:0}}}function ts(c,t,e){if(t<0||t>=_||e<0||e>=_)return!1;const s=c.grid[e]?.[t];if(s===E.HardBlock||s===E.SoftBlock)return!1;for(const i of c.bombs)if(i.gridPos.col===t&&i.gridPos.row===e)return!1;return!0}class ss{state;input;scene;audio;menuManager;hud;gameLoop;sessionBombsPlaced=0;sessionPowerUpsCollected=0;_sessionEnemiesDefeated=0;fpsEl;previousEnemyCount=0;playerWasAlive=!0;previousSoftBlockCount=0;audioInitialized=!1;videoBackground;constructor(){this.input=new wt,this.scene=new Me,this.audio=j,this.hud=new Et,this.videoBackground=Kt();const t=T.getSettings();this.audio.setMusicVolume(t.musicVolume),this.audio.setSfxVolume(t.sfxVolume),this.audio.setUiVolume(t.uiVolume),this.state=this.createInitialExtendedState(),this.menuManager=new vt(e=>this.startGame(e),()=>this.resumeGame(),()=>this.quitToMenu()),this.fpsEl=document.getElementById("fps-counter"),this.fpsEl.style.display=t.showFPS?"block":"none",this.input.setPauseCallback(()=>this.togglePause()),this.gameLoop=new Ct((e,s)=>this.update(e,s),e=>this.render(e)),this.setupAudioInitialization(),this.menuManager.showScreen(P.MAIN)}setupAudioInitialization(){const t=()=>{this.audioInitialized||(this.audio.initialize(),this.audioInitialized=!0,this.audio.playMenuMusic(),console.log("[GameController] Audio initialized"))};["click","touchstart","keydown"].forEach(s=>{document.addEventListener(s,t,{once:!0})})}createInitialExtendedState(){return{base:qe(),phase:B.MENU,currentLevel:1,levelStartTime:0,totalPauseTime:0,pausedAt:null,session:{bombsPlaced:0,powerUpsCollected:0,enemiesDefeated:0,startTime:Date.now()},settings:T.getSettings(),stats:T.getStats()}}start(){this.gameLoop.start()}startGame(t){console.log(`[GameController] Starting game with levelId: ${t}`),T.incrementGamesStarted(),this.audioInitialized||(this.audio.initialize(),this.audioInitialized=!0,console.log("[GameController] Audio initialized")),K.setLevel(t-1),this.state.currentLevel=t,console.log(`[GameController] Current level set to: ${this.state.currentLevel}`);const e=K.getCurrentLevel();this.state.base=K.createLevelState(e);const s=this.state.base.enemies||[];this.previousEnemyCount=s.filter(i=>i.alive).length,this.previousSoftBlockCount=0;for(let i=0;i<this.state.base.grid.length;i++)for(let a=0;a<this.state.base.grid[i].length;a++)this.state.base.grid[i][a]===E.SoftBlock&&this.previousSoftBlockCount++;K.getThemeColors(e.theme),this.scene.setTheme(e.theme),this.scene.setWeatherEnabled(!0),e.videoBackground?(console.log(`[GameController] 🎬 Loading video background: ${e.videoBackground}`),this.videoBackground.loadVideo(e.videoBackground).then(()=>{this.videoBackground.play(),this.videoBackground.setVolume(this.state.settings.musicVolume)}).catch(i=>{console.error("[GameController] Failed to load video:",i)}),this.scene.enableVideoBackgroundMode(!0),this.scene.enableFlyingCarpetEffect(!0),this.videoBackground.setVisible(!0),e.useVideoAudio&&this.audio.stopMusic()):(this.videoBackground.stop(),this.videoBackground.setVisible(!1),this.scene.enableVideoBackgroundMode(!1),this.scene.enableFlyingCarpetEffect(!1)),this.sessionBombsPlaced=0,this.sessionPowerUpsCollected=0,this._sessionEnemiesDefeated=0,this.previousEnemyCount=0,this.playerWasAlive=!0,this.state.levelStartTime=Date.now(),this.state.totalPauseTime=0,this.state.pausedAt=null,this.applySettings(),e.useVideoAudio||this.audio.playLevelMusic(t),this.state.phase=B.PLAYING,this.menuManager.hide(),console.log(`Starting Level ${t}: ${e.name}`)}resumeGame(){this.state.phase===B.PAUSED&&(this.state.pausedAt&&(this.state.totalPauseTime+=Date.now()-this.state.pausedAt),this.state.pausedAt=null,this.state.phase=B.PLAYING,this.menuManager.hide())}quitToMenu(){const t=Math.floor((Date.now()-this.state.session.startTime)/1e3);T.addPlayTime(t),this.audio.stopMusic(),this.audio.playMenuMusic(),this.videoBackground.stop(),this.videoBackground.setVisible(!1),this.scene.enableVideoBackgroundMode(!1),this.scene.enableFlyingCarpetEffect(!1),this.state.phase=B.MENU,this.menuManager.showScreen(P.MAIN)}togglePause(){this.state.phase===B.PLAYING?(this.state.phase=B.PAUSED,this.state.pausedAt=Date.now(),this.menuManager.showPauseMenu()):this.state.phase===B.PAUSED&&this.resumeGame()}update(t,e){this.state.base.tick=e;const s=this.input.poll();switch(this.state.phase){case B.PLAYING:this.updatePlaying(t,s);break;case B.PAUSED:break;case B.VICTORY:case B.DEFEAT:break;case B.MENU:break}this.hud.update(this.state.base,this.state)}updatePlaying(t,e){const s=this.state.base.players[0];if(this.playerWasAlive&&s&&!s.alive&&this.audio.playPlayerDamage(),this.playerWasAlive=s?.alive??!1,s?.alive){if(e.moveDir!==M.None&&(s.moveDir=e.moveDir,Pt(this.state.base,0,t)),e.placeBomb&&zt(this.state.base,0)&&(this.audio.playBombPlace(),this.audio.playFuseTick(),this.sessionBombsPlaced++,T.incrementBombsPlaced()),e.fuseAction==="prime")Ht(this.state.base,0);else if(e.fuseAction==="rush")Rt(this.state.base,0);else if(e.fuseAction==="detonate"){const h=Nt(this.state.base,0);h&&(Ve(this.state.base,h,s.bombRange),this.audio.playExplosion())}}const i=Ft(this.state.base,t);for(const h of i){Ve(this.state.base,h,this.state.base.players[0]?.bombRange??2),console.log("[GameController] Bomb exploded, playing sound"),this.audio.playExplosion();const d=this.state.base.enemies||[];for(const p of d)p.alive&&p.gridPos.col===h.col&&p.gridPos.row===h.row&&ze(this.state.base,h)}for(const h of this.state.base.explosions)ze(this.state.base,h.gridPos);Wt(this.state.base,t),Yt(this.state.base)&&(this.audio.playPowerUp(),this.sessionPowerUpsCollected++,T.incrementPowerUpsCollected(),T.vibrate(50)),s?.alive&&(Qt(this.state.base,s.gridPos,t),Jt(this.state.base,s.worldPos)&&(s.alive=!1,console.log("[GameController] Player hit by enemy!")));const l=this.state.base.enemies||[];this.scene.syncEnemies(l,t),this.trackEnemyDeaths(),this.trackBricksDestroyed(),this.checkGameEndConditions()}trackEnemyDeaths(){const e=(this.state.base.enemies||[]).filter(s=>s.alive);if(e.length<this.previousEnemyCount){const s=this.previousEnemyCount-e.length;for(let i=0;i<s;i++)this.audio.playEnemyDeath(),this._sessionEnemiesDefeated++,T.incrementEnemiesDefeated()}this.previousEnemyCount=e.length}trackBricksDestroyed(){let t=0;for(let e=0;e<this.state.base.grid.length;e++)for(let s=0;s<this.state.base.grid[e].length;s++)this.state.base.grid[e][s]===E.SoftBlock&&t++;t<this.previousSoftBlockCount&&this.previousSoftBlockCount-t>0&&this.audio.playRandomAffirmation(),this.previousSoftBlockCount=t}checkGameEndConditions(){if(!this.state.base.players[0]?.alive){this.handleDefeat();return}let e=0;for(let s=0;s<this.state.base.grid.length;s++)for(let i=0;i<this.state.base.grid[s].length;i++)this.state.base.grid[s][i]===E.SoftBlock&&e++;if(e===0){this.handleVictory();return}}handleVictory(){this.state.phase=B.VICTORY;const t=Math.floor((Date.now()-this.state.levelStartTime-this.state.totalPauseTime)/1e3);T.recordWin(this.state.currentLevel,t),T.vibrate([100,50,100,50,200]),this.audio.stopMusic(),this.audio.playLevelComplete(),this.audio.playVictory();const e=K.getNextLevel();e?(console.log(`🎉 LEVEL ${this.state.currentLevel} COMPLETE! Advancing to Level ${e.id}...`),this.menuManager.showGameOver(!0,{time:t,bombs:this.sessionBombsPlaced,powerUps:this.sessionPowerUpsCollected}),setTimeout(()=>{this.state.phase===B.VICTORY&&(K.progressToNext(),this.startGame(e.id))},3e3)):(console.log(`🏆 GAME COMPLETE! All levels finished in ${t}s total`),this.menuManager.showGameOver(!0,{time:t,bombs:this.sessionBombsPlaced,powerUps:this.sessionPowerUpsCollected}))}handleDefeat(){this.state.phase=B.DEFEAT,T.recordLoss(),T.vibrate([200,100,200]),this.audio.stopMusic(),this.audio.playDefeat();const t=Math.floor((Date.now()-this.state.levelStartTime-this.state.totalPauseTime)/1e3);this.menuManager.showGameOver(!1,{time:t,bombs:this.sessionBombsPlaced,powerUps:this.sessionPowerUpsCollected}),console.log(`Defeat! Level ${this.state.currentLevel} failed after ${t}s`)}render(t){this.scene.syncState(this.state.base,t),this.scene.render(),this.state.settings.showFPS&&(this.fpsEl.textContent=`${this.gameLoop.fps} FPS`)}applySettings(){const t=T.getSettings();this.audio.setMusicVolume(t.musicVolume),this.audio.setSfxVolume(t.sfxVolume),this.audio.setUiVolume(t.uiVolume),this.fpsEl.style.display=t.showFPS?"block":"none",t.fullscreen&&!document.fullscreenElement?document.documentElement.requestFullscreen?.().catch(()=>{}):!t.fullscreen&&document.fullscreenElement&&document.exitFullscreen?.().catch(()=>{})}getState(){return this.state}getPhase(){return this.state.phase}}console.log("🎮 BLASTFORGE Initializing...");console.log("✅ GameController with menus, themes, audio");console.log("✅ Miami Beach & Ice World themes");console.log("✅ Weather system (rain, snow, ash)");console.log("✅ ElevenLabs audio integration ready");console.log("✅ Touch controls for mobile");function Fe(){console.log("🎮 init() called");try{const c=new ss;console.log("🚀 Game initialized successfully!"),c.start(),console.log("▶️ Game loop started!"),window.game=c,window.audio=c.audio,setTimeout(()=>{const t=document.getElementById("game-menus");console.log("Menu element:",t),t&&(console.log("Menu children:",t.childNodes.length),console.log("Menu classes:",t.className))},1e3)}catch(c){console.error("❌ Failed to initialize game:",c),document.body.innerHTML=`
      <div style="color: white; padding: 20px; font-family: sans-serif; background: #0a0a1a; min-height: 100vh;">
        <h1>Error Loading Game</h1>
        <p>${c instanceof Error?c.message:"Unknown error"}</p>
        <pre style="background: #1a1a2e; padding: 10px; overflow: auto;">${c instanceof Error?c.stack:""}</pre>
      </div>
    `}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Fe):Fe();
