# Bug Fix Checklist

Quick reference for developers. Check off as you fix.

## 🔴 CRITICAL (Must Fix First)

- [ ] **BUG-001:** WebGL Error Handling
  - [ ] Add try-catch around `new THREE.WebGLRenderer()`
  - [ ] Display error message to user
  - [ ] Test in headless browser
  - [ ] Document in README

- [ ] **BUG-002:** Chain Reaction Stack Overflow
  - [ ] Replace recursive `spawnExplosion` with queue
  - [ ] Test with 100+ bombs
  - [ ] Add stress test to test suite

---

## 🟠 MAJOR (Fix for MVP)

- [ ] **BUG-003:** Player Collision Detection
  - [ ] Check `state.players` in `placeBomb()`
  - [ ] Add test case
  - [ ] Verify multiplayer scenario

- [ ] **BUG-004:** Bomb Walking Exploit
  - [ ] Add grace period or pushback mechanic
  - [ ] Test player can't phase through bombs
  - [ ] Document behavior

- [ ] **BUG-005:** Negative Bomb Counter
  - [ ] Add `Math.max(0, ...)` guards
  - [ ] Check in `ExplosionSystem.ts` line 32
  - [ ] Check in `BombSystem.ts` detonation
  - [ ] Add unit test

- [ ] **BUG-006:** Game Over State
  - [ ] Detect player death in `main.ts`
  - [ ] Create `GameOverScreen.ts`
  - [ ] Show game over UI
  - [ ] Stop game loop
  - [ ] Add restart button

- [ ] **BUG-007:** Win Condition
  - [ ] Define win criteria (all enemies dead? time? score?)
  - [ ] Implement detection logic
  - [ ] Create `VictoryScreen.ts`
  - [ ] Show victory UI

- [ ] **BUG-008:** Pause/Resume
  - [ ] Add pause flag to `GameLoop`
  - [ ] Detect ESC/P key in `InputManager`
  - [ ] Create pause overlay
  - [ ] Test pause/resume flow

- [ ] **BUG-009:** Settings Persistence
  - [ ] Create settings menu UI
  - [ ] Add volume controls
  - [ ] Save to localStorage
  - [ ] Load on startup

- [ ] **BUG-010:** Restart Functionality
  - [ ] Add restart button to game over screen
  - [ ] Reset game state to initial
  - [ ] Restart game loop
  - [ ] Test multiple restarts

- [ ] **BUG-011:** Enemy AI (or remove from scope)
  - [ ] Decide: implement or defer?
  - [ ] If implementing:
    - [ ] Create Enemy entity type
    - [ ] Implement pathfinding
    - [ ] Add spawn system
    - [ ] Add collision detection
  - [ ] If deferring: update docs

- [ ] **BUG-012:** Scoring System
  - [ ] Add score to GameState
  - [ ] Award points for actions
  - [ ] Display in HUD
  - [ ] Save high score

---

## 🟡 MINOR (Polish)

- [ ] **BUG-013:** FPS Counter Initial Value
  - [ ] Initialize `fps` to 60 instead of 0

- [ ] **BUG-014:** Diagonal Movement
  - [ ] Decide: normalize or keep?
  - [ ] Implement chosen solution
  - [ ] Document behavior

- [ ] **BUG-015:** World Position Bounds
  - [ ] Clamp worldPos in `movePlayer()`
  - [ ] Add bounds check

- [ ] **BUG-016:** Input Buffering
  - [ ] Add input queue if needed
  - [ ] Test rapid key presses

- [ ] **BUG-017:** Power-Up Spawn Rate
  - [ ] Playtest current 30% rate
  - [ ] Adjust if needed
  - [ ] Document final value

- [ ] **BUG-018:** Audio Feedback Missing
  - [ ] Call `audio.playPowerUp()` in `PowerUpSystem`
  - [ ] Test sound plays

- [ ] **BUG-019:** Bomb Visual State
  - [ ] Update material when `primed` changes
  - [ ] Update material when `rushed` changes
  - [ ] Test visual feedback

- [ ] **BUG-020:** Mobile Controls
  - [ ] Add virtual joystick
  - [ ] Add touch bomb button
  - [ ] Test on mobile device

- [ ] **BUG-021:** Level Progression
  - [ ] Design level system
  - [ ] Implement level loading
  - [ ] Add difficulty scaling

- [ ] **BUG-022:** HUD Stats Display
  - [ ] Show bomb count
  - [ ] Show bomb range
  - [ ] Show speed
  - [ ] Show fuse charges
  - [ ] Show score (if implemented)

- [ ] **BUG-023:** Audio Context Start
  - [ ] Call `ensureContext()` on first interaction
  - [ ] Test sound delay eliminated

---

## ❌ MISSING FEATURES

- [ ] **FEAT-001:** Start Menu
  - [ ] Create menu UI
  - [ ] Add Play button
  - [ ] Add Settings button
  - [ ] Add Credits/Help
  - [ ] Wire up navigation

- [ ] **FEAT-002:** Game End Sequence
  - [ ] Game over screen (see BUG-006)
  - [ ] Victory screen (see BUG-007)
  - [ ] Show stats
  - [ ] Show score

- [ ] **FEAT-003:** Level Selection
  - [ ] Design level selection UI
  - [ ] Implement level loading
  - [ ] Add difficulty options

- [ ] **FEAT-004:** Multiplayer
  - [ ] Clarify requirements
  - [ ] Implement if in scope

- [ ] **FEAT-005:** Save/Load
  - [ ] Save progress to localStorage
  - [ ] Load on startup
  - [ ] Add save slots?

- [ ] **FEAT-006:** Leaderboard
  - [ ] Design leaderboard UI
  - [ ] Store high scores
  - [ ] Display rankings

- [ ] **FEAT-007:** Tutorial
  - [ ] Create help screen
  - [ ] Show controls
  - [ ] Explain mechanics

- [ ] **FEAT-008:** Visual Effects
  - [ ] Add particle effects
  - [ ] Add screen shake
  - [ ] Add camera effects
  - [ ] Polish animations

---

## ✅ TESTING TASKS

- [ ] Write `ExplosionSystem.test.ts`
- [ ] Write `PowerUpSystem.test.ts`
- [ ] Write `InputManager.test.ts`
- [ ] Write `GameLoop.test.ts`
- [ ] Add integration tests
- [ ] Expand `BombSystem.test.ts`
- [ ] Expand `GridSystem.test.ts`
- [ ] Run tests: `npm test`
- [ ] Check coverage: `npm test -- --coverage`
- [ ] Aim for 70%+ coverage

---

## 🧪 MANUAL TESTING

After fixes, manually verify:

### Basic Gameplay
- [ ] Game loads without errors
- [ ] Can move in all 4 directions
- [ ] Can place bombs
- [ ] Bombs explode after timer
- [ ] Explosions destroy soft blocks
- [ ] Power-ups spawn
- [ ] Can collect power-ups
- [ ] Power-ups increase stats

### Edge Cases
- [ ] Rapid bomb placement (spam spacebar)
- [ ] Chain reaction with 50+ bombs
- [ ] Player dies in explosion
- [ ] All power-ups at max
- [ ] Try to place bomb on occupied tile
- [ ] Try to walk through bomb
- [ ] Test diagonal movement

### Game Flow
- [ ] Start menu → game → game over → restart
- [ ] Pause → resume works
- [ ] Settings persist after refresh
- [ ] Score tracks correctly

### Performance
- [ ] Maintains 60 FPS
- [ ] No lag during chain reactions
- [ ] No memory leaks

### Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## 📝 DOCUMENTATION

- [ ] Update README with:
  - [ ] System requirements
  - [ ] Known issues
  - [ ] Build instructions
  - [ ] How to play
- [ ] Add inline code comments
- [ ] Document game design decisions
- [ ] Update DESIGN_DOC.md if needed

---

## 🚀 PRE-RELEASE

- [ ] All critical bugs fixed
- [ ] All major bugs fixed
- [ ] Test coverage > 70%
- [ ] Manual testing complete
- [ ] Performance verified
- [ ] Browser testing done
- [ ] Documentation updated
- [ ] No console errors
- [ ] Code reviewed
- [ ] Ready to ship!

---

## Quick Git Workflow

```bash
# For each bug fix:
git checkout -b fix/bug-001-webgl-error
# ... make changes ...
git add .
git commit -m "fix: add WebGL error handling (BUG-001)"
git push origin fix/bug-001-webgl-error
# Create PR, get review, merge

# After merging:
git checkout main
git pull
npm test  # Verify tests pass
npm run build  # Verify build works
```

---

## Priority Order

1. **Week 1:** BUG-001, BUG-002 (blockers)
2. **Week 2:** BUG-003 through BUG-010 (core gameplay)
3. **Week 3:** BUG-011, BUG-012, FEAT-001, FEAT-002 (features)
4. **Week 4:** Minor bugs + polish + testing
5. **Week 5+:** Additional features as needed

---

**Last Updated:** 2026-02-01  
**Total Items:** 47  
**Estimated Time:** 46-65 hours
