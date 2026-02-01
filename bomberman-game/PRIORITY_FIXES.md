# BLASTFORGE - Priority Bug Fixes

## 🚨 BLOCKING ISSUES (Fix Immediately)

### 1. WebGL Error Handling (BUG-001)
**Impact:** Game cannot be tested or played  
**Time:** 1-2 hours  
**Files:** `src/rendering/SceneManager.ts`

```typescript
// Add try-catch around WebGLRenderer creation
// Show user-friendly error message
// Consider 2D canvas fallback
```

**Test:** Load in headless browser, verify error message appears

---

### 2. Chain Reaction Stack Overflow (BUG-002)
**Impact:** Crash with many bombs  
**Time:** 2-3 hours  
**Files:** `src/systems/ExplosionSystem.ts`

```typescript
// Replace recursive spawnExplosion with iterative queue
// Test with 100+ bombs in chain reaction
```

**Test:** Place 50+ bombs, trigger chain reaction, verify no crash

---

## ⚠️ CRITICAL GAMEPLAY (Fix Next)

### 3. Game Over State (BUG-006)
**Impact:** Game has no ending  
**Time:** 3-4 hours  
**Files:** `src/main.ts`, `src/ui/GameOverScreen.ts` (new)

```typescript
// Detect player death in main loop
// Show game over screen
// Add restart button
```

**Test:** Die to bomb, verify game over screen appears

---

### 4. Negative Bomb Counter (BUG-005)
**Impact:** Unlimited bombs exploit  
**Time:** 30 minutes  
**Files:** `src/systems/ExplosionSystem.ts`, `src/systems/BombSystem.ts`

```typescript
// Add Math.max(0, ...) guards
// Add unit test
```

**Test:** Verify activeBombs never goes negative

---

### 5. Bomb Walking Exploit (BUG-004)
**Impact:** Breaks collision system  
**Time:** 2-3 hours  
**Files:** `src/systems/GridSystem.ts`, `src/systems/BombSystem.ts`

```typescript
// Add grace period for player on bomb tile
// OR push player off bomb after placement
```

**Test:** Place bomb, try to walk through it immediately

---

### 6. Player Collision Detection (BUG-003)
**Impact:** Players can overlap  
**Time:** 1 hour  
**Files:** `src/systems/BombSystem.ts`

```typescript
// Check state.players in placeBomb()
// Verify no other player on tile
```

**Test:** Two players try to occupy same tile

---

## 🎮 GAME LOOP ESSENTIALS (Core Features)

### 7. Start Menu (FEAT-001)
**Impact:** No game entry point  
**Time:** 4-6 hours  
**Files:** `src/ui/MainMenu.ts` (new), `src/main.ts`

```typescript
// Create menu screen with Play button
// Initialize game state on Play click
// Add Settings and Credits placeholders
```

---

### 8. Win Condition (BUG-007)
**Impact:** Game has no victory  
**Time:** 2-3 hours  
**Files:** `src/main.ts`, `src/ui/VictoryScreen.ts` (new)

```typescript
// Define win condition (all enemies dead? level clear?)
// Check in main loop
// Show victory screen
```

---

### 9. Pause/Resume (BUG-008)
**Impact:** Poor UX  
**Time:** 2-3 hours  
**Files:** `src/input/InputManager.ts`, `src/core/GameLoop.ts`

```typescript
// Add ESC/P key detection
// Add pause flag to GameLoop
// Show pause overlay
```

---

### 10. Restart Functionality (BUG-010)
**Impact:** Must refresh to restart  
**Time:** 1-2 hours  
**Files:** `src/main.ts`, `src/ui/GameOverScreen.ts`

```typescript
// Add restart button to game over screen
// Reset game state to initial
// Restart game loop
```

---

## 🤖 MISSING GAMEPLAY (If in Scope)

### 11. Enemy AI (BUG-011)
**Impact:** Core feature missing  
**Time:** 12-16 hours  
**Files:** `src/entities/Enemy.ts` (new), `src/systems/EnemySystem.ts` (new)

```typescript
// Create Enemy entity type
// Implement pathfinding AI
// Add spawn logic
// Add enemy-player collision
// Add enemy-explosion collision
```

**Questions:**
- How many enemy types?
- What AI behaviors?
- Spawn pattern?

---

### 12. Scoring System (BUG-012)
**Impact:** Core feature missing  
**Time:** 3-4 hours  
**Files:** `src/core/types.ts`, `src/systems/ScoringSystem.ts` (new)

```typescript
// Add score to GameState
// Award points for:
//   - Destroying soft blocks
//   - Killing enemies
//   - Collecting power-ups
//   - Time bonus
// Display score in HUD
```

---

## 🎨 POLISH (Quality of Life)

### 13. Settings Menu (BUG-009)
**Time:** 4-5 hours

```typescript
// Volume sliders (music, sfx, ui)
// Graphics quality options
// Control remapping
// LocalStorage persistence
```

---

### 14. HUD Display (BUG-022)
**Time:** 2-3 hours

```typescript
// Show player stats:
//   - Bomb count: X/Y
//   - Bomb range: N
//   - Speed indicator
//   - Fuse charges: N
// Show score (if implemented)
```

---

### 15. Audio Improvements (BUG-018, BUG-023)
**Time:** 2-3 hours

```typescript
// Call audio.playPowerUp() in PowerUpSystem
// Initialize AudioContext on first user interaction
// Add more sound effects
// Consider background music
```

---

### 16. Visual Bomb State (BUG-019)
**Time:** 1 hour

```typescript
// Update mesh material when bomb.primed changes
// Update mesh material when bomb.rushed changes
```

---

### 17. Diagonal Movement Fix (BUG-014)
**Time:** 1 hour

```typescript
// Option A: Normalize diagonal velocity
// Option B: Prioritize one direction
// Option C: Keep as-is (design decision)
```

---

## 📋 RECOMMENDED SPRINT PLAN

### Sprint 1: Make It Playable (8-12 hours)
- [ ] BUG-001: WebGL error handling
- [ ] BUG-002: Chain reaction fix
- [ ] BUG-005: Negative bomb counter
- [ ] BUG-006: Game over state
- [ ] FEAT-001: Start menu (basic)
- [ ] BUG-010: Restart button

**Goal:** Working game loop from start to game over

---

### Sprint 2: Core Gameplay (12-16 hours)
- [ ] BUG-003: Player collision
- [ ] BUG-004: Bomb walking fix
- [ ] BUG-008: Pause/resume
- [ ] BUG-012: Scoring system (basic)
- [ ] BUG-022: HUD display
- [ ] BUG-007: Win condition (if no enemies, consider time/score target)

**Goal:** Complete game experience without enemies

---

### Sprint 3: Enemies (12-16 hours) - OPTIONAL
- [ ] BUG-011: Enemy AI implementation
- [ ] Enemy spawn system
- [ ] Enemy types and behaviors
- [ ] Balance testing

**Goal:** Full Bomberman experience

---

### Sprint 4: Polish (8-12 hours)
- [ ] BUG-009: Settings menu
- [ ] Audio improvements
- [ ] Visual effects
- [ ] Tutorial/help screen
- [ ] Mobile controls (if needed)
- [ ] All minor bugs

**Goal:** Production-ready quality

---

## 🧪 TESTING CHECKLIST

After each sprint, verify:

### Functional Tests
- [ ] Game starts from menu
- [ ] Player movement in all directions
- [ ] Bomb placement works
- [ ] Bomb explosion destroys blocks
- [ ] Power-ups spawn and work
- [ ] Player death triggers game over
- [ ] Win condition triggers victory
- [ ] Restart returns to menu
- [ ] Pause works

### Edge Case Tests
- [ ] Rapid bomb placement (spam spacebar)
- [ ] Chain reaction with 50+ bombs
- [ ] All power-ups at max values
- [ ] Player dies while performing action
- [ ] Bomb explodes while player standing on it
- [ ] Multiple bombs on same tile (should fail)

### Performance Tests
- [ ] 60 FPS with 20+ bombs
- [ ] No lag during chain reactions
- [ ] No memory leaks over 10 minutes
- [ ] Works in Chrome, Firefox, Safari
- [ ] Works on mobile (if supported)

---

## 📊 EFFORT ESTIMATE

| Priority | Tasks | Time |
|----------|-------|------|
| Blocking | 2 bugs | 3-5 hours |
| Critical | 4 bugs | 7-11 hours |
| Game Loop | 4 features | 9-14 hours |
| Missing Gameplay | 2 features | 15-20 hours |
| Polish | 7 items | 12-15 hours |
| **TOTAL** | **19 items** | **46-65 hours** |

**Minimum Viable Product:** Sprint 1 + Sprint 2 = 20-28 hours  
**Full Featured:** All sprints = 46-65 hours

---

## 🎯 SUCCESS CRITERIA

### Minimum (MVP)
✅ Game loads without errors  
✅ Player can move and place bombs  
✅ Bombs explode and destroy blocks  
✅ Power-ups work  
✅ Game over when player dies  
✅ Can restart game  

### Ideal (Full Release)
✅ All MVP criteria  
✅ Enemies with AI  
✅ Scoring system  
✅ Multiple levels  
✅ Pause/settings menu  
✅ No known bugs  
✅ 60 FPS performance  

---

**Last Updated:** 2026-02-01  
**Next Action:** Fix BUG-001 (WebGL error handling)
