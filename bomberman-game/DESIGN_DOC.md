# BLASTFORGE: Product Definition Package
**Version:** 1.0  
**Date:** 2025-01-16  
**Status:** Foundation Document — All Development Waits for Approval

---

## Section 1: One-Page Concept Document

### Game Name
**BLASTFORGE**

*Tagline: "Master the Fuse. Control the Chaos."*

### Target Player Persona

**Primary: "The Competitive Tactician"**
- Age: 16-35
- Gaming background: Competitive multiplayer (fighting games, MOBAs, tactical shooters)
- Values: Skill expression, fair competition, mind-games, mastery curves
- Session preference: 15-45 minute bursts with high replayability
- Wants depth without randomness, clear feedback, "outplay" moments

**Secondary: "The Party Gamer"**
- Age: 18-40
- Social player who values accessibility but respects skill ceilings
- Wants couch multiplayer energy with online convenience
- Appreciates spectacle and "wow" moments

### Core Fantasy
**"I am a demolition maestro conducting explosive symphonies."**

Players don't just place bombs—they **orchestrate detonations**. You're a master strategist manipulating timing itself, setting up cascade traps, faking out opponents, and engineering perfect kill sequences. Every match is a high-stakes chess game played with explosives, where reading your opponent's fuse manipulation is as important as map control.

### Core Loop (30-Second Summary)
1. **Plant bombs** to destroy soft blocks and claim territory
2. **Manipulate fuses** (prime/shorten/detonate) to create timing mind-games
3. **Collect power-ups** from destroyed blocks (range, speed, bomb count, fuse abilities)
4. **Read opponent telegraphs** (visual/audio cues for fuse states)
5. **Execute traps** using layered bomb setups and timing prediction
6. **Survive/eliminate** via superior positioning, trap execution, and fuse mastery

### The Twist (One Sentence)
**Fuse Manipulation System:** Limited charges let players **Prime** (extend fuse), **Rush** (shorten fuse), or **Detonate** (instant remote trigger) their bombs, creating deterministic timing mind-games where every telegraph is readable and counterplay is always possible.

### Key Differentiator vs Bomberman Clones

**Why BLASTFORGE beats "another Bomberman clone":**

Most Bomberman clones are shallow reskins with identical gameplay. BLASTFORGE adds **mastery depth through deterministic timing manipulation** while keeping the core loop sacred:

1. **Timing becomes a weapon:** Not just placement—WHEN things explode is now strategic
2. **Counterplay is built-in:** All fuse states are telegraphed (visual + audio), so deaths feel "outplayed" not "cheap"
3. **Skill ceiling without randomness:** Fuse charges are limited resources requiring decision-making
4. **Spectator-friendly:** Watching pros manipulate cascades is visually exciting and comprehensible
5. **"Chess with explosives" positioning:** Adds bluffing, baiting, and timing prediction to spatial tactics

**Bottom line:** Classic Bomberman is about WHERE you place bombs. BLASTFORGE is about WHERE + WHEN, doubling the strategic depth without breaking the original magic.

---

## Section 2: Game Pillars (Core Design Principles)

### Pillar 1: **READABLE CHAOS**
*"Visual spectacle never obscures gameplay clarity."*

**Player Benefit:**  
Players always understand why they died and can predict danger states, eliminating frustration and enabling mastery.

**How It Shows Up in Gameplay:**
- Fuse states have distinct visual auras (Standard=Orange glow, Primed=Blue slow pulse, Rushed=Red rapid pulse)
- Audio telegraphs: tick rate changes with fuse state (slow tick = primed, rapid tick = rushed)
- Explosion VFX are gorgeous but auto-scale down in heavy scenes
- Camera angle ensures you see 90% of relevant arena at all times
- Colorblind modes + high-contrast outlines on danger tiles

**Success Metrics:**
- **"Fair Death" perception:** <10% of deaths blamed on "couldn't see" in surveys
- **Prediction accuracy:** Players correctly predict bomb timing 85%+ after tutorial
- **Rematch rate:** >60% after losses (indicator of "I can beat that" mentality)

---

### Pillar 2: **MASTERY THROUGH TIMING**
*"Depth comes from when, not just where."*

**Player Benefit:**  
Experienced players can express skill through fuse manipulation, creating pro plays that feel earned and look spectacular.

**How It Shows Up in Gameplay:**
- **Prime (extend fuse):** Set up delayed traps, fake out opponents, control cascade timing
- **Rush (shorten fuse):** Surprise enemies, punish predictable movement, deny escape routes
- **Detonate (remote trigger):** Execute perfect combos, respond to opponent movement
- Limited charges (3-5 per life) force meaningful decisions
- Power-ups can grant additional charges or cooldown reduction
- Tutorial teaches basic → intermediate → pro fuse plays

**Success Metrics:**
- **Skill differentiation:** Top 10% players win 65%+ vs random opponents (not 95%—we want accessibility)
- **Fuse ability usage:** Players use 80%+ of their fuse charges per match (not hoarding)
- **Session length:** Average 28+ minutes (multiple rematches indicate engaging mastery chase)

---

### Pillar 3: **DETERMINISTIC COMPETITION**
*"Same inputs = same outcomes. Always."*

**Player Benefit:**  
Zero randomness in outcomes builds trust; losses feel earned, victories feel skillful. Perfect for competitive integrity.

**How It Shows Up in Gameplay:**
- Fixed fuse timers (Standard=3.0s, Primed=4.5s, Rushed=1.5s, visual countdown)
- Deterministic explosion propagation (always orthogonal cross, predictable chain reactions)
- Seeded map generation (layout + power-up spawn locations reproducible)
- Movement is grid-snapped with consistent collision rules
- Replay system logs all inputs for bug reproduction
- Server-authoritative validation for online matches

**Success Metrics:**
- **Bug reproducibility:** 100% of reported bugs reproducible from replay logs
- **Network fairness:** <5% of losses blamed on "lag" in post-match surveys
- **Tournament readiness:** Zero contested outcomes in competitive play

---

### Pillar 4: **SPECTACLE WITH PURPOSE**
*"Every explosion looks amazing AND communicates information."*

**Player Benefit:**  
The game feels premium and exciting while maintaining pro-level readability.

**How It Shows Up in Gameplay:**
- Explosions have layered VFX: core blast (gameplay clarity) + particle effects (juice)
- Fuse states have distinct visual/audio signatures even in 8-player chaos
- Screen shake, camera punch, and slow-mo on clutch moments (optional, togglable)
- UI celebrates skill moments ("PERFECT CASCADE!", "OUTPLAYED!")
- Sound design makes threats audible even off-screen (directional audio cues)

**Success Metrics:**
- **Wow moments:** Players share clips/gifs 2+ times per 10-hour playtime
- **Audio readability:** Blindfolded players can identify bomb states by sound 80%+ accuracy
- **Performance under stress:** 60 FPS maintained with 20+ simultaneous explosions

---

### Pillar 5: **REWARDING PRACTICE**
*"Your 100th match should feel different from your 1st."*

**Player Benefit:**  
Players discover new tactics over time, with clear progression from novice → competent → master.

**How It Shows Up in Gameplay:**
- Tutorial teaches 3 tiers: Basic bombing → Chain reactions → Fuse mind-games
- Single-player challenge mode introduces one mechanic at a time (puzzle rooms)
- Mastery challenges teach specific pro plays ("Trap a moving opponent using Rush + Prime combo")
- Ranked mode with visible MMR brackets (Bronze → Silver → Gold → Platinum → Diamond)
- Cosmetic unlocks tied to skill milestones, not grind (e.g., "Win with <10% health 3 times")

**Success Metrics:**
- **Tutorial completion:** >85% of new players finish all 3 tiers
- **Skill retention:** Players who complete 10+ matches return within 7 days at 70%+ rate
- **Mastery curve visibility:** Win rate improvement over 1st → 10th → 50th match shows clear growth

---

## Section 3: MVP vs Delight Breakdown

### **MVP: Minimum Features for a Great Game**

**Core Gameplay (Must Ship):**
- ✅ Single arena (16x16 grid, 3 themed variations)
- ✅ 1-4 player local/online multiplayer
- ✅ Bot AI (3 difficulty levels: Passive, Aggressive, Tactical)
- ✅ Full fuse manipulation system (Prime, Rush, Detonate + 5 charges per life)
- ✅ 5 core power-ups: +Bomb, +Range, +Speed, +Fuse Charge, Blast Shield
- ✅ Deterministic explosion propagation with chain reactions
- ✅ Soft/hard blocks with standard destructibility
- ✅ 8 interactive tiles (see Twist Implementation section)

**Polish (Must Ship):**
- ✅ 3-minute tutorial (all tiers)
- ✅ Main menu + settings (audio sliders, key rebinding, graphics presets)
- ✅ Crisp movement + responsive input (grid-snap with 60+ FPS)
- ✅ Basic VFX for explosions (gameplay-readable)
- ✅ SFX for all actions (place, tick, detonate, pickup, hit, win/lose)
- ✅ Single music track (menu + gameplay variations)
- ✅ Win/loss screens with stats (kills, survival time, bombs placed)
- ✅ Replay log export for bug reports

**Technical (Must Ship):**
- ✅ WebGL rendering (Three.js or Babylon.js)
- ✅ Fixed timestep simulation (deterministic)
- ✅ Keyboard + gamepad support
- ✅ Colorblind mode + high-contrast option
- ✅ Performance: stable 60 FPS on mid-range hardware

**Acceptance Criteria for MVP:**
- A new player can learn, play 5 matches, and feel "I want another round" within 30 minutes
- Controls feel 9/10 responsive
- Deaths feel fair 90%+ of the time
- Fuse manipulation creates at least 3 distinct "pro play" moments per match

---

### **Delight: Upgrades for 10/10 Quality**

**Gameplay Depth:**
- 🌟 **5+ arenas** with unique layouts + themes (Foundry, Arctic Lab, Neon City, Overgrown Ruins, Skyship)
- 🌟 **10+ interactive tiles** (see Twist Implementation for full list)
- 🌟 **Party mode modifiers** (Sudden Death, Speed Bomb, Chain Reaction Only, Fuse Roulette)
- 🌟 **Ranked mode** with MMR, seasonal rewards (cosmetic-only)
- 🌟 **Challenge tower** (30 puzzle rooms, roguelite power-up draft)
- 🌟 **Spectator mode** for online matches with free camera

**Visual Polish:**
- 🌟 **Dynamic lighting** (explosions illuminate arena, fuse states cast colored light)
- 🌟 **Advanced VFX** (smoke trails, heat distortion, debris physics)
- 🌟 **Character customization** (8+ original avatars with 3 color palettes each)
- 🌟 **Emotes + taunts** (quick-access celebratory/sarcastic reactions)
- 🌟 **Animated intro/outro** for matches (player intros like fighting games)

**Audio Excellence:**
- 🌟 **Dynamic music system** (intensity layers increase with match escalation)
- 🌟 **Spatial audio** with HRTF (hear bomb ticking direction)
- 🌟 **Unique SFX per power-up** (distinct pickup sounds for each)
- 🌟 **Character voice lines** (optional, can be disabled)
- 🌟 **Victory/defeat stingers** (orchestral hits)

**Retention Systems:**
- 🌟 **Daily/weekly challenges** (e.g., "Win without using Detonate")
- 🌟 **Cosmetic unlocks** (bomb skins, explosion effects, player titles)
- 🌟 **Replay theater** (save + share clips with timestamp highlights)
- 🌟 **Leaderboards** (global + friends)
- 🌟 **Achievements** with Steam/Xbox/PlayStation-style progression tracking

**Technical Excellence:**
- 🌟 **Rollback netcode** (for <100ms latency online play)
- 🌟 **Match replays** with scrubbing + free camera
- 🌟 **Performance profiler** (in-game FPS/frame time overlay)
- 🌟 **Accessibility++ mode** (screen reader support, customizable UI scale, controller-only navigation)

**Acceptance Criteria for Delight:**
- Players describe it as "polished like a console game" in 70%+ of reviews
- Average session length: 35+ minutes
- Month-1 retention: 40%+ of players return
- Clip sharing: 5+ per 100 players

---

## Section 4: Twist Implementation Plan — **Fuse Manipulation System**

### **Core Mechanics Overview**

The Fuse Manipulation System gives players **limited control over bomb timing** through three deterministic abilities. All manipulations are **telegraphed visually and audibly**, ensuring counterplay and readability.

---

### **A) The Three Fuse Abilities**

#### **1. PRIME (Extend Fuse)**
- **Effect:** Increases fuse timer from 3.0s → 4.5s (+50% duration)
- **Cost:** 1 Fuse Charge
- **Use Case:** Set up delayed traps, control cascade timing, fake out opponents
- **Telegraph:**
  - **Visual:** Bomb pulses **BLUE** with slow, rhythmic breathing effect
  - **Audio:** Tick rate slows to 1.5-second intervals (deep, resonant tone)
  - **UI Indicator:** Small blue "↑" icon above bomb
- **Cooldown:** Can Prime any bomb you've placed (even after walking away)
- **Strategic Depth:** Allows players to place bombs early without committing to immediate detonation, opening mind-game opportunities

#### **2. RUSH (Shorten Fuse)**
- **Effect:** Decreases fuse timer from 3.0s → 1.5s (-50% duration)
- **Cost:** 1 Fuse Charge
- **Use Case:** Surprise enemies, punish predictable pathing, deny safe zones
- **Telegraph:**
  - **Visual:** Bomb pulses **RED** with rapid, aggressive flashing
  - **Audio:** Tick rate doubles to 0.75-second intervals (high-pitched, urgent)
  - **UI Indicator:** Small red "↓" icon above bomb
- **Cooldown:** Can Rush any bomb you've placed
- **Strategic Depth:** Converts defensive bombs into offensive threats, punishes players who assume "I have time to escape"

#### **3. DETONATE (Remote Trigger)**
- **Effect:** Instantly detonates bomb regardless of remaining fuse time
- **Cost:** 1 Fuse Charge
- **Use Case:** Perfect combo execution, react to opponent movement, trigger chains manually
- **Telegraph:**
  - **Visual:** Bomb emits **WHITE spark pulse** 0.3s before detonation (reaction window)
  - **Audio:** Distinct "charging hum" (0.3s telegraph)
  - **UI Indicator:** White "!" icon flashes above bomb
- **Cooldown:** None (instant)
- **Strategic Depth:** The telegraph window preserves fairness—skilled players can still dodge if they're watching closely

---

### **B) Fuse Charge Economy**

**Starting Charges:**  
- Each player spawns with **5 Fuse Charges** per life
- Power-up: **+Fuse Charge** adds +2 charges (drops from soft blocks)
- Power-up: **Fuse Refill** (rare drop) restores 3 charges

**Strategic Implications:**
- Charges are a **finite resource**—wasting them on ineffective plays is punishable
- Good players "bank" charges for critical moments (e.g., saving Detonate for a guaranteed kill)
- Encourages risk/reward decisions: "Do I Prime this trap now or save charges for later?"
- Power-up control becomes more valuable (controlling Fuse Charge drops is meta-game)

**UI Display:**
- HUD shows remaining charges as **5 glowing icons** (empty = used)
- Charges refill **visually** when power-up is collected (satisfying juice)

---

### **C) 10+ Interaction Tiles & Gadgets**

These tiles create emergent gameplay with the Fuse Manipulation system:

#### **1. Blast Vent (Floor Tile)**
- **Behavior:** Explosion passes through to adjacent tile (orthogonal only)
- **Visual:** Metal grate with orange emissive glow
- **Interaction with Fuse:** Primed bombs on Vents create delayed "pressure cooker" setups

#### **2. Fuse Extender Pad (Floor Tile)**
- **Behavior:** Bombs placed here automatically gain +1.0s fuse (stacks with Prime)
- **Visual:** Blue circuit tile with pulsing rings
- **Interaction with Fuse:** Primed + Extender = 5.5s timer (extreme delay traps)

#### **3. Quick-Fuse Tile (Floor Tile)**
- **Behavior:** Bombs placed here automatically lose -1.0s fuse (stacks with Rush)
- **Visual:** Red hazard stripe tile
- **Interaction with Fuse:** Rushed + Quick-Fuse = 0.5s timer (near-instant detonation)

#### **4. Fuse Jammer (Gadget, Destructible Prop)**
- **Behavior:** Blocks Fuse Manipulation within 2-tile radius (abilities fail, charge refunded)
- **Visual:** Tech pillar with spinning EMP coils
- **Interaction with Fuse:** Forces "vanilla" bombing in area—counterplay vs fuse-heavy players
- **Health:** 2 explosions to destroy

#### **5. Mirror Block (Destructible Block)**
- **Behavior:** Reflects explosion 90° (e.g., horizontal blast becomes vertical)
- **Visual:** Crystalline block with directional arrow
- **Interaction with Fuse:** Rush + Mirror = surprise angle attacks

#### **6. Delayed Blast Tile (Floor Tile)**
- **Behavior:** Explosion passes through but creates a 1.5s delayed secondary blast
- **Visual:** Orange tile with rotating hazard symbol
- **Interaction with Fuse:** Prime + Delayed = multi-stage trap sequences

#### **7. Fuse Converter (Gadget, Indestructible)**
- **Behavior:** When bomb detonates adjacent, converts to opposite fuse state (Prime↔Rush)
- **Visual:** Two-toned (blue/red) rotating crystal
- **Interaction with Fuse:** Mind-game tool—opponents must track conversions

#### **8. Blast Amplifier (Floor Tile, Rare)**
- **Behavior:** Bombs placed here gain +1 range (stacks with +Range power-up)
- **Visual:** Glowing yellow tile with expanding circles
- **Interaction with Fuse:** Detonate + Amplifier = instant long-range execution

#### **9. Chain Relay (Gadget, Destructible Prop)**
- **Behavior:** When hit by explosion, triggers all bombs within 3-tile radius (ignores fuse timers)
- **Visual:** Metallic obelisk with lightning arcs
- **Interaction with Fuse:** Primed bombs + Relay = forced cascade, can backfire
- **Health:** 1 explosion to trigger (then destroyed)

#### **10. Safe Tile (Floor Tile, Rare)**
- **Behavior:** Bombs placed here cannot be Rushed or Detonated (Prime still works)
- **Visual:** Green tile with shield icon
- **Interaction with Fuse:** Defensive positioning tool—guarantees escape window

#### **11. Fuse Display Panel (Indestructible Prop)**
- **Behavior:** Shows numerical countdown of ALL bombs on screen (HUD overlay)
- **Visual:** Digital scoreboard on wall
- **Interaction with Fuse:** Information tool for tracking opponent fuse states

#### **12. Volatile Crate (Destructible Prop)**
- **Behavior:** Explodes when hit, but copies fuse state of triggering bomb
- **Visual:** Red barrel with "DANGER" marking
- **Interaction with Fuse:** Rushed bomb → Rushed crate = instant chain reaction

---

### **D) 3 Example "Pro Plays"**

#### **Pro Play 1: The Double-Fake Trap**
**Setup:**
1. Player places bomb at chokepoint
2. **Primes** it (4.5s fuse, opponent sees blue telegraph)
3. Opponent assumes they have time, commits to path
4. Player **Detonates** mid-path (0.3s telegraph + instant explosion)

**Why It Works:**  
Exploits opponent's pattern recognition—they expect Primed bombs to take longer. The 0.3s Detonate telegraph is fair but requires reaction speed.

**Counterplay:**  
Opponent must **never commit to narrow paths** near Primed bombs, or bait the Detonate then retreat.

---

#### **Pro Play 2: The Cascade Conductor**
**Setup:**
1. Player places 3 bombs in L-shape
2. **Primes** bomb #1 (4.5s), leaves #2 standard (3.0s), **Rushes** bomb #3 (1.5s)
3. Result: Bomb #3 detonates → triggers #2 → triggers #1
4. Player manually **Detonates** #1 mid-cascade to change explosion angle

**Why It Works:**  
Creates a time-delayed cascade where the player retains control over final angle of attack. Opponent must track 3 different fuse states.

**Counterplay:**  
Opponent can destroy a bomb in the chain early (using their own explosion), breaking the sequence.

---

#### **Pro Play 3: The Bait-and-Punish**
**Setup:**
1. Player places bomb on **Quick-Fuse Tile** (auto -1.0s)
2. Opponent sees red tile, assumes 2.0s escape window
3. Player **Rushes** the bomb (now 0.5s total fuse)
4. Opponent caught in near-instant explosion

**Why It Works:**  
Stacks two fuse reductions (tile + Rush) for a surprise fast detonation. Quick-Fuse tiles are clearly marked, so opponent SHOULD adapt—but in high-pressure moments, mistakes happen.

**Counterplay:**  
Opponent must **never stand on Quick-Fuse tiles** longer than 1 second, regardless of telegraphs.

---

### **E) Counterplay & Telegraph Systems**

**Design Philosophy:**  
Every fuse manipulation must be **readable by skilled opponents**. No "gotcha" deaths—only "outplayed" deaths.

#### **Visual Telegraphs (100% of the time):**
- Primed bombs: **Blue aura** (soft, slow pulse)
- Rushed bombs: **Red aura** (aggressive, fast pulse)
- Detonating bombs: **White spark flash** (0.3s warning)
- Fuse Charges remaining: HUD indicator visible to ALL players (optional competitive mode hides this)

#### **Audio Telegraphs (Spatial, Directional):**
- Primed: Deep, slow ticking (1.5s intervals)
- Rushed: High-pitched, rapid ticking (0.75s intervals)
- Detonate: Distinct "charge hum" (0.3s before explosion)
- **Directional audio:** Players can locate bombs off-screen by sound direction

#### **Counterplay Tools:**
1. **Blast Shield power-up:** Survive one explosion (breaks shield, player invulnerable for 0.5s)
2. **Speed power-up:** Outrun Rushed bombs (+25% movement speed)
3. **Fuse Jammer gadget:** Block fuse manipulation in area (destructible)
4. **Safe Tiles:** Guarantee escape windows (bombs can't be Rushed/Detonated)

#### **Fairness Rules:**
- **No instant kills:** Detonate always has 0.3s telegraph window
- **No off-screen deaths:** Camera positioning + audio cues ensure awareness
- **No RNG:** Fuse timers are exact (not ranges)
- **Replay validation:** All fuse states logged for dispute resolution

---

## Section 5: Success Criteria for Twist Implementation

✅ **Preserves Classic Loop:**  
Players can ignore fuse manipulation entirely and still play effectively (default bombs work like classic Bomberman). Fuse abilities are **skill multipliers**, not requirements.

✅ **10+ Interaction Tiles:**  
12 tiles/gadgets defined above, each creating unique interactions with Fuse Manipulation.

✅ **3 Pro Plays:**  
Double-Fake Trap, Cascade Conductor, Bait-and-Punish documented with counterplay.

✅ **Deterministic & Readable:**  
All fuse states have visual + audio telegraphs. No hidden timers, no RNG.

✅ **Counterplay Always Exists:**  
Blast Shield, Speed boost, Fuse Jammers, Safe Tiles provide defensive options. Detonate has 0.3s reaction window.

✅ **Fair Deaths Only:**  
Target: <10% of post-match surveys report "unfair death." Every death should feel like "I misread the timing" or "They outplayed me," not "I couldn't see/hear that."

---

## Appendix: Design Justification — Why Fuse Manipulation?

**Why This Twist Over Alternatives:**

**Vertical Multi-Layer Arenas:**  
- **Pros:** Visually spectacular, adds 3D uniqueness
- **Cons:** Camera occlusion is HARD to solve; risk of "deaths I couldn't see"
- **Verdict:** Too risky for readability in web environment

**Material-Based Blast Behavior:**  
- **Pros:** Environmental storytelling, emergent combos
- **Cons:** Can feel chaotic/unpredictable if not perfectly balanced; harder to telegraph
- **Verdict:** Great for Delight phase, but not core twist

**Fuse Manipulation (CHOSEN):**  
- **Pros:** 
  - Adds strategic depth without changing spatial rules
  - 100% deterministic and telegraphed
  - Easy to learn (tutorial: "Press Q to Prime"), hard to master
  - Creates spectator-friendly "highlight reel" moments
  - Works in 2D or 3D camera views (readability-safe)
  - Enables mind-games (bluffing, baiting, prediction)
- **Cons:** 
  - Requires UI/UX polish to communicate fuse states clearly
  - Risk of "overwhelming" new players with options
- **Mitigation:** 
  - Tutorial teaches one ability at a time
  - Default controls are classic Bomberman (fuse abilities are opt-in)

**Bottom Line:**  
Fuse Manipulation offers the highest **skill ceiling** with the lowest **readability risk**, making it the safest bet for a competitive web game.

---

## Next Steps

**Once this document is approved:**

1. **Tech Lead** uses this to define architecture requirements (Section 5 of spec)
2. **Art Director** creates style bible based on "Blastforge" theme (foundry/industrial aesthetic)
3. **Audio Designer** designs SFX for fuse states (slow tick, fast tick, charge hum)
4. **Level Designer** creates 3 starter arenas with tile interaction placements
5. **Gameplay Programmer** prototypes fuse manipulation system (greybox)

**Approval Checklist:**
- [ ] Core loop preserves classic Bomberman feel
- [ ] Twist adds mastery without randomness
- [ ] All telegraphs are clear and deterministic
- [ ] Counterplay exists for every fuse ability
- [ ] MVP scope is achievable in target timeline
- [ ] Delight features are desirable but non-blocking

---

**End of Product Definition Package**  
**This document is the foundation. All teams wait for approval before development starts.**
