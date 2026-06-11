# 🎬 3D CHARACTER MOTION DESIGN DOCUMENT
## Every Movement of "The Architect" — Frame by Frame
### Saumok Kundu Portfolio

---

## HOW TO READ THIS DOCUMENT

Each motion is described as:
- **WHEN** — what triggers this animation (scroll position, click, hover, page load)
- **BODY** — what every body part does, in sequence
- **TIMING** — exact durations in seconds
- **FEEL** — the emotional intent (what the viewer should feel watching this)
- **CAMERA** — where the camera is relative to the character

Think of this as a **choreography script** — like directing a dancer or an actor on a film set.

---

## CHAPTER 1: THE AWAKENING (Hero Section)

---

### Motion 1.1 — "BOOT SEQUENCE POSE" (Page Load)

**WHEN**: The terminal boot text finishes typing. Screen goes dark for 0.3 seconds. Then 3D scene fades in.

**WHAT THE VIEWER SEES FIRST**: A dark void. A figure crouched in the center, dormant, like a machine that hasn't been powered on yet.

**BODY — Beat by Beat**:

```
[0.0s] THE DORMANT STATE
  Whole body:  Crouched low, knees bent at 90°, feet flat on ground
  Torso:       Hunched forward, spine curved, chin tucked to chest
  Arms:        Wrapped loosely around own torso — left hand gripping right elbow,
               right hand gripping left elbow — a self-contained, fetal-like cocoon
  Hands:       Fingers relaxed, slightly curled
  Head:        Tilted down, chin touching upper chest
  Eyes:        Closed
  Facial:      Neutral, peaceful — like deep sleep
  Hair:        Gravity-affected — falls forward slightly
  
  → Character looks like a powered-down android. No movement at all.
  → Only the faintest violet glow pulses on the jacket collar accents (0.5Hz)

[0.0s–0.5s] FIRST SIGN OF LIFE
  Fingers:     The right hand's fingers twitch once — a single involuntary flex
               Like a computer receiving its first electrical signal
  Everything else: Still frozen
  
  → This tiny motion is the "oh wait, something's happening" moment

[0.5s–1.2s] THE SPINE AWAKENS
  Spine:       Begins to uncurl — starting from the lower back upward
               Think of a fern unfurling in time-lapse
               Lower spine straightens first (0.5–0.8s)
               Mid spine follows (0.8–1.0s)
               Upper spine and shoulders last (1.0–1.2s)
  Arms:        Still holding self, but grip loosens as torso rises
  Knees:       Begin to extend slightly — shifting from 90° to 120°
  Head:        Still down, chin still tucked — the head is the LAST thing to rise
  Eyes:        Still closed
  
  → Easing: Very slow ease-in — starts almost imperceptibly, accelerates

[1.2s–1.8s] ARMS RELEASE
  Arms:        Hands release the opposite elbows
               Arms drop to sides in a smooth, gravity-assisted fall
               NOT a snap — a controlled descent like releasing a held breath
  Fingers:     Spread slightly as hands release, then relax into natural curl
  Shoulders:   Roll back once — a subtle shoulder-blade squeeze
               Like someone who's been sleeping in a chair and stretches
  Knees:       Extend to nearly straight (170°) — character is almost at full height
  
  → This should feel like a deep exhale after holding your breath

[1.8s–2.3s] THE HEAD RISES — THE HERO MOMENT
  Head:        Lifts slowly from chin-to-chest position
               Chin traces an arc upward
               At 2.0s: head reaches level/neutral position
               At 2.1s: head continues SLIGHTLY past neutral — chin tilts UP 5°
               This micro-overshoot is the confidence moment — "I'm here"
               At 2.3s: settles back to exactly neutral
  Eyes:        OPEN at exactly the 2.0s mark — synchronized with head reaching level
               The eye-open is NOT a blink — lids open smoothly over 0.15s
               Pupils are dilated (done via emissive shader — cyan iris glow activates)
  Mouth:       The subtlest hint of a smile — just 2mm of mouth corner lift
               NOT a grin — a knowing, confident, "I've arrived" micro-expression
  
  → THIS IS THE MONEY SHOT. The moment the character "looks at you" for the first
    time. It must give the viewer a small chill. Eye contact = connection.

[2.3s–3.0s] SETTLE INTO IDLE
  Whole body:  Makes final micro-adjustments:
               — Weight shifts to right foot (subtle hip tilt)
               — Left foot slides out 10cm to a wider, confident stance
               — Arms hang naturally, slight bend at elbows
               — Fingers curl into relaxed natural position
               — One final shoulder micro-roll
  Breathing:   First visible breath — chest expands on inhale at 2.5s
               This is the first breath of the idle_breathe loop
  
  → Seamlessly transitions into idle_breathe loop at 3.0s mark
```

**CAMERA DURING THIS**: Starts slightly below eye level (heroic angle), 3 meters away. Very slow push-in (2.8m → 2.5m) during the 3-second sequence.

**FEEL**: Like watching a superhero origin moment. Iron Man's first suit-up. The moment before a boxer enters the ring. Controlled power.

---

### Motion 1.2 — "IDLE BREATHE" (Continuous Loop)

**WHEN**: After boot sequence completes. Plays forever until user scrolls or interacts.

**BODY — The Cycle** (3 seconds, repeats):

```
[0.0s–1.5s] INHALE
  Chest:       Expands outward — ribcage rises 1.5cm
               NOT dramatic — this is natural resting breath, not gym breathing
  Shoulders:   Rise 3mm (barely perceptible — subliminal life signal)
  Abdomen:     Slight expansion
  Spine:       Extends 2mm (micro-straightening)
  Weight:      Shifts from right foot → center over 1.5s

[1.5s–3.0s] EXHALE
  Everything reverses:
  Chest:       Contracts back to resting
  Shoulders:   Drop 3mm
  Weight:      Shifts from center → slightly left
  
  PLUS at 2.0s mark:
  Head:        Micro-tilt — 1° to the right, then back
               This prevents the idle from looking robotic
               It's like a natural "settling" movement people do unconsciously

[SUBTLE CONTINUOUS LAYER]:
  Fingers:     Very slight curl/uncurl cycle — 8-second period
               Out of sync with breathing — adds organic complexity
  Jacket:      If cloth sim is available: micro-sway on the jacket bottom edge
               If not: skip
```

**FEEL**: The character is alive, present, waiting. Like a person standing in an elevator — they're not doing anything, but they're clearly alive. The viewer should subconsciously register "this is a living presence" without consciously analyzing the movement.

---

### Motion 1.3 — "EYE TRACKING" (Continuous, Interactive)

**WHEN**: Always active in hero section. Character's eyes follow the user's mouse cursor.

**BODY**:
```
Eyes:        Both eyeballs rotate to track a target point (set by Three.js raycasting)
             Maximum rotation: 25° horizontally, 15° vertically
             Beyond those limits: eyes stay at max, head begins to turn

Head:        If eyes are at their rotation limit for > 0.5 seconds:
             Head turns toward the target — max 15° horizontal rotation
             Head lags behind eyes by 0.3 seconds (natural — eyes lead, head follows)

Easing:      Eyes: smooth follow with 0.1s damping (springy but not jittery)
             Head: smooth follow with 0.4s damping (heavier, slower, more natural)

[SPECIAL CASE — Mouse leaves window]:
             Eyes drift back to center over 1 second
             Head returns to neutral over 1.5 seconds
             Then character plays idle_look_around once before returning to idle_breathe
```

**FEEL**: The character is watching you. It creates an uncanny, magnetic connection. Visitors will wave their mouse around just to test it. That's exactly what we want — engagement.

---

### Motion 1.4 — "NOD" (On Character Click/Hover)

**WHEN**: User clicks on the 3D character or hovers over it for > 2 seconds.

**BODY**:
```
[0.0s–0.1s] MICRO-SURPRISE
  Eyebrows:   Lift 2mm (if face rig allows) — brief "oh, you noticed me" beat
  Eyes:        Widen very slightly

[0.1s–0.5s] THE NOD
  Head:        Tilts forward 15° — a single, deliberate, respectful nod
               Like acknowledging a colleague across the room
               NOT a bobblehead — ONE controlled dip

[0.5s–0.8s] RETURN + SMILE
  Head:        Returns to neutral
  Mouth:       Slight smile — mouth corners lift 3mm
               Holds for 0.5 seconds then relaxes

[0.8s–1.0s] SETTLE
  Returns to idle_breathe seamlessly
```

**FEEL**: "He sees me. He acknowledged me." It's a moment of connection. Visitors will click again just to see it happen. Easter egg energy.

---

## CHAPTER 2: THE GUIDE (About Section)

---

### Motion 2.1 — "HOLOGRAM IDLE" (Continuous Loop on Briefing Table)

**WHEN**: About chapter is open. A smaller, translucent version of the character rotates on the briefing table.

**BODY**:
```
Scale:       40% of full size (sits on the table surface like a holographic projection)

[CONTINUOUS]:
  Whole body:  Slow Y-axis rotation — 360° every 15 seconds
               Character stands in a confident pose: weight on one leg, arms at sides
  Hologram FX: Scanline texture scrolls upward (this is shader, not body motion)
               Occasional 0.1-second "glitch" — character shifts 2cm left then snaps back
               Happens randomly every 5–10 seconds
               This sells the "hologram projection" illusion
               
  Right hand:  Periodically gestures outward (open palm) toward one of the info cards
               Gesture happens when user hovers near a card
               Duration: 0.8s gesture out, hold 1s, 0.8s return
```

**FEEL**: The character is your tour guide. He's showing you his world, gently directing your attention. A host at a museum. A narrator.

---

## CHAPTER 3: THE CONSTELLATION (Skills Section)

---

### Motion 3.1 — "OBSERVATORY GUIDE" (Idle)

**WHEN**: Skills chapter is open. Character stands on the observatory platform beside the constellation.

**BODY**:
```
Pose:        Standing, arms loosely at sides
             Weight on left foot, right foot slightly forward
             Head tilted up 10° — looking at the constellation above/around
             
[CONTINUOUS]:
  idle_breathe loop plays
  Head:        Slowly scans left to right across the constellation field
               Full scan: 8 seconds left-to-right, 8 seconds right-to-left
               This makes the character feel like they're surveying their domain
  Eyes:        Track the same direction as head but with slight lead (0.3s ahead)
```

---

### Motion 3.2 — "POINT TO SKILL" (On Skill Node Click)

**WHEN**: User clicks a skill node in the constellation.

**BODY**:
```
[0.0s–0.3s] NOTICE
  Head:        Snaps to look toward the clicked node
               Speed: fast but not instant — 0.3s rotation
  Eyes:        Already looking at the node (0.1s ahead of head)

[0.3s–0.8s] POINT
  Right arm:   Raises from side, extends toward the clicked node
               Elbow leads the motion (natural biomechanics)
               Index finger extends, other fingers curl loosely
               Arm reaches full extension at 0.8s
  Torso:       Slight lean (3°) toward the pointed direction
  
[0.8s–2.0s] HOLD
  Holds the point pose while the skill detail card is visible
  Breathing continues in the held position
  
[2.0s–2.5s] RETURN (when user closes the skill card)
  Arm lowers back to side — controlled descent, not a drop
  Head returns to constellation scan pattern
  Torso straightens
```

---

### Motion 3.3 — "CHALLENGE ACCEPTED" (When User Types in the Challenge Terminal)

**WHEN**: User starts typing a skill name in the challenge terminal.

**BODY**:
```
[0.0s–0.5s] TRANSITION TO TYPING
  Character:   Turns 45° to face the holographic terminal screen
  Arms:        Raise to keyboard height (0.9m from platform)
  Hands:       Position over the holographic keyboard prop
  Head:        Tilts down slightly to look at the keyboard/screen

[0.5s–ongoing] TYPING LOOP
  type_keyboard animation plays in loop
  Fingers:     Alternate tapping pattern on the holographic keyboard
               Left hand: index, middle, ring, pinky pattern
               Right hand: mirror pattern, offset by 0.15s
               Speed: matches the user's actual typing speed if possible
               (if not possible: steady 4 keypresses per second)
  Eyes:        Periodically glance between keyboard and terminal screen
               Keyboard (0.8s) → screen (0.4s) → keyboard → repeat
  Head:        Micro-movements tracking the eye glances

[On Submit / Enter]:
  Hands:       Both lift off keyboard simultaneously — "hands off" gesture
  Head:        Looks up at the constellation (where the matching node is glowing)
  Right arm:   Points toward the glowing node (reuses point_to_skill motion)
```

**FEEL**: You and the character are working together. He's your co-pilot in the interrogation. When you type, he types. When the result appears, he points to it like "there it is." Teamwork.

---

## CHAPTER 4: THE COMMAND ROOM (Experience Section)

---

### Motion 4.1 — "ARMS CROSSED OBSERVATION" (Default Pose)

**WHEN**: Experience chapter opens. Character stands at the briefing table.

**BODY**:
```
[ENTRY — 0.0s–1.0s]:
  Character walks into frame from the left (walk_forward for 3 steps)
  Arrives at position beside the table
  Stops, turns 90° to face the curved display wall
  
[1.0s–2.0s] CROSS ARMS:
  arms_cross animation plays:
  Right arm:   Crosses over chest first
  Left arm:    Tucks under right arm
  Hands:       Right hand grips left bicep lightly
               Left hand wraps around right elbow area
  Chin:        Lifts 5° — the "I know what I'm doing" tilt
  Weight:      Shifts to left foot — subtle hip cock
  
[2.0s–ongoing] HOLD + BREATHE:
  Arms remain crossed
  idle_breathe micro-movements continue (chest expansion/contraction)
  Head:        Occasionally glances toward the transmission globe
               When a mission card reveals: head turns to look at it
```

**FEEL**: Military commander reviewing an intelligence briefing. Composed, serious, experienced. The arms-crossed pose communicates confidence and authority — "I've been to these places, done these missions."

---

### Motion 4.2 — "MISSION ACKNOWLEDGED" (When Experience Card Fully Reveals)

**WHEN**: The decryption text animation finishes for an experience card.

**BODY**:
```
[0.0s–0.3s] ATTENTION
  Head:        Turns sharply to face the revealed card
  Arms:        Uncross partially — right hand drops to side

[0.3s–0.8s] NOD OF CONFIRMATION
  Head:        Single slow nod (deeper than the hero nod — 20° forward)
               This is a "mission complete" acknowledgment
  Eyes:        Fixed on the card text

[0.8s–1.2s] RETURN
  Head:        Returns to neutral, looks forward at the display wall
  Arms:        Re-cross
  
  → Subtle: one corner of mouth lifts in a micro-smirk
    "Yeah, I did that."
```

---

## CHAPTER 5: THE HALLWAY (Projects Section)

---

### Motion 5.1 — "THE CORRIDOR WALK" (Scroll-Driven)

> [!IMPORTANT]
> The character is NOT visible during the hallway walk. This is a **first-person camera POV**. The user IS the character walking. There is no third-person model in the hallway.

**CAMERA MOTION** (driven by scroll position):
```
[Scroll 0%]:   Camera at corridor entrance, Z = 0, Y = 1.6m (eye height)
[Scroll 100%]: Camera at corridor end, Z = 80m

Camera motion:
  Position:    Interpolates linearly along Z-axis based on scroll %
  Y-axis sway: Subtle sinusoidal oscillation to simulate walking
               Amplitude: 0.02m (barely noticeable — 2cm up and down)
               Frequency: Linked to scroll speed — faster scroll = faster "steps"
               When scroll stops: sway decelerates and stops over 0.3s
               
  X-axis sway: Even more subtle — 0.005m (5mm) side-to-side
               Phase-offset 90° from Y-sway (natural walking counter-rhythm)

  Head bob:    Camera rotation pitches down 0.3° then up 0.3° in sync with Y-sway
               Creates the natural head-bob of walking

[IMPORTANT]: When user STOPS scrolling:
  All oscillation eases to zero over 0.5 seconds (--ease-standard)
  Camera comes to a gentle, cinematic rest — no abrupt stop
  Like a person stopping mid-stride and settling their weight

[FOOTSTEP AUDIO] (if audio enabled):
  Play a soft, muted footstep sound effect every 0.5s of scroll movement
  Sound: concrete/metal floor tap — not loud, not echoey
  Stops when scroll stops
```

---

### Motion 5.2 — "DOOR PROXIMITY PULSE" (Scroll Near a Door)

**WHEN**: Camera is within 15 Z-units of a door.

```
[DOOR BEHAVIOR]:
  Glow strips:     Emissive intensity ramps from 2.0 → 5.0 over 1s
  Name plate:       Fades in (opacity 0 → 1) over 0.5s
  Floor light pool: Grows larger and brighter as camera approaches
  
  [If camera is within 5 Z-units]:
    Door panels:   Very subtle vibration — 0.5mm X-oscillation at 4Hz
                   Like the door is straining to contain the energy behind it
                   This is subliminal — viewer feels tension, not movement
    Light seeps:   Colored light begins bleeding through the door crack
                   (the 2mm gap between left and right door panels)
```

---

### Motion 5.3 — "DOOR BURST OPEN" (On Door Click)

**WHEN**: User clicks a door while within 8 Z-units.

```
[0.0s–0.1s] THE CLICK IMPACT
  Door panels:   Vibration intensifies (1mm, 8Hz) — anticipation
  All other doors: Their glow dims to 0 — focus narrows to this door
  Ambient corridor lighting: Dims 50% — darkness closes in

[0.1s–0.4s] THE SPLIT
  Left panel:    Shoots left — fast start, decelerating
                 Slides into the left wall (disappears into wall recess)
                 Motion blur effect if possible (shader)
  Right panel:   Mirror — shoots right into wall recess
  
  Speed curve:   Explosive start (0.1s covers 70% of distance)
                 Eases into final position (0.3s for remaining 30%)
                 cubic-bezier(0.2, 0.8, 0.2, 1) — "slam open" easing

[0.4s–0.8s] THE FLOOD
  Behind the door: Pure white/project-colored light floods outward
  Light intensity: 0 → maximum over 0.4s
  The light expands outward toward the camera like a shockwave
  Camera:        Involuntary push — camera moves 0.3m forward (like being pulled in)
  Screen:        Entire view washes out to white/project-color

[0.8s–1.2s] THE TRANSITION
  White screen:  Dissolves into the Hacker OS desktop
  Camera:        Resets to the Hacker OS viewing angle
  
  → Character appears at workstation desk (see Motion 5.4)
```

**FEEL**: Like a portal opening. The door has been holding back this project's universe. Now it explodes into existence. The viewer should feel the physical force of it.

---

### Motion 5.4 — "AT THE WORKSTATION" (Inside Hacker OS)

**WHEN**: After door opens and Hacker OS desktop loads. Character is visible in the background, sitting at the workstation.

**BODY**:
```
[ENTRY — 0.0s–1.0s]:
  Character:   Fades in (opacity 0 → 1) — materializes at the desk
               Already seated — no walking-to-desk animation needed
  Pose:        Seated in chair, facing the monitors
               Back slightly leaned back (comfortable, in-flow)
               Both hands on desk at keyboard height

[1.0s–ongoing] TYPING IN THE ZONE:
  type_keyboard loop plays:
  Fingers:     Rapid alternating taps (see Chapter 3 typing description)
  Head:        Fixed, looking at the (invisible) monitor
               Occasional micro-nod — like agreeing with code output
               Every 8 seconds: head tilts slightly, eyes narrow — "thinking" beat
               Then resumes typing
  
  Shoulders:   Relaxed but engaged — slight forward lean
  
  [SUBTLE DETAIL — "The Flow State"]:
  Every 12 seconds: 
    Right hand:  Lifts off keyboard, reaches for invisible mouse
                 Makes 2 small click motions, then returns to keyboard
                 Duration: 1.5 seconds total
                 This breaks the typing monotony and adds realism

[ON USER INTERACTION — When user opens a window in the OS]:
  Character:   Pauses typing for 0.5s
  Head:        Slight turn toward camera direction (10° rotation)
  Then:        Resumes typing — he's aware of you but stays focused
```

**FEEL**: You've entered his workspace. He's working — he's in the zone. You can explore the OS and his projects while he works alongside you. It's intimate. You're seeing behind the curtain.

---

### Motion 5.5 — "RETURN TO HALLWAY" (Exit Hacker OS)

**WHEN**: User closes the OS (ESC key or close button).

```
[0.0s–0.3s] CHARACTER FAREWELL
  Character:   Stops typing
  Head:        Turns toward camera (20° rotation)
  Single nod:  0.5s nod animation
  
[0.3s–1.0s] FADE OUT
  Character + entire OS: Fades to black
  Reverse of the door-open transition
  
[1.0s–1.5s] BACK IN THE HALLWAY
  Corridor reappears
  Camera is at the exact Z-position where the user clicked the door
  The clicked door is now closed again (instant reset, no closing animation)
  Corridor ambient lighting restores
```

---

## CHAPTER 6: ACHIEVEMENTS (Certifications)

---

### Motion 6.1 — "TROPHY PRESENT" (If 3D Trophy Models Are Available)

**WHEN**: Achievement notification appears for a certification.

```
Trophy object:
  [0.0s–0.5s] DESCEND
    Trophy:    Drops in from above (Y = +2m → Y = 0)
               With a slow-motion deceleration — not gravity, more like "beamed in"
               Easing: cubic-bezier(0.2, 0.8, 0.2, 1)
               
  [0.5s–ongoing] DISPLAY
    Trophy:    Slow continuous Y-rotation — 360° every 6 seconds
               Slight Y-axis float — bobs up/down 0.03m over 2 seconds
               Emissive material pulses gently (intensity 1.0 → 1.5 → 1.0, 3s cycle)
               
  [HOVER]:
    Trophy:    Rotation speed doubles
               Emissive intensity increases to 2.0
               Scale: 1.0 → 1.1 (spring easing)
```

---

## UNIVERSAL MOTION PRINCIPLES

These rules apply to ALL character animations:

### 1. The Breath Never Stops
```
Even during other animations (pointing, typing, nod), the breathing
micro-movement continues as an additive layer. The chest keeps moving.
If the character ever looks "frozen" — something is wrong.
```

### 2. Eyes Lead Everything
```
When the character turns to look at something:
  Eyes move FIRST       (0.0s)
  Head follows          (0.2s later)
  Torso follows         (0.4s later, if needed)
  
This is how real humans move. Eyes are scouts, head is the follower.
Reversing this order looks robotic.
```

### 3. Overshoot & Settle
```
Every movement that stops should slightly OVERSHOOT its target,
then settle back. Like a car braking — you lurch forward then settle.

Head turns 15° right → actually goes to 16° → settles back to 15°
Arm points → extends 2cm past target → pulls back 2cm

Overshoot amount: 5–10% of total motion
Settle time: 0.1–0.2 seconds
```

### 4. Asymmetry is Life
```
The character should NEVER be perfectly symmetrical in any pose.
- Weight on one foot, not centered
- One shoulder slightly higher
- One hand more relaxed than the other
- Head tilted 1–2° off center

Perfect symmetry = mannequin. Asymmetry = human.
```

### 5. The 12 Principles of Animation Apply
```
Specifically prioritize:
- Anticipation: Small wind-up before any major motion
- Follow-through: Loose parts (hair, jacket edge) continue after body stops
- Ease in/out: Nothing starts or stops at constant speed
- Secondary action: While arm points, fingers curl; while head nods, eyes blink
```

### 6. Transition Blending
```
When switching from one animation clip to another:
  Crossfade duration: 0.3 seconds
  Never "snap" from one pose to another
  Three.js handles this with AnimationMixer.crossFadeTo()
  
  But the animations must be DESIGNED so that their start/end poses
  are close enough to blend smoothly. That means:
  - All animations should start and end near the "idle_breathe" pose
  - Arms at sides, weight centered, head neutral
  - This makes every transition feel natural
```

---

## MOTION TIMELINE — FULL VISITOR JOURNEY

```
PAGE LOAD
  │ Boot terminal types... (no character visible)
  │
  ▼ [3.0s]
HERO SECTION
  │ boot_sequence_pose plays (3s) → character awakens
  │ idle_breathe loops
  │ Eye tracking follows mouse
  │ Click character → nod (1s)
  │
  │ User scrolls down...
  ▼
ABOUT CHAPTER (if entered)
  │ Small hologram version rotates on table
  │ Hologram gestures toward cards on hover
  │
  │ User returns to main page...
  ▼
SKILLS CHAPTER (if entered)
  │ Character on observatory platform
  │ idle_breathe + slow head scanning
  │ User clicks skill → point animation
  │ User types challenge → type_keyboard
  │ Result found → point to glowing node
  │
  │ User returns to main page...
  ▼
EXPERIENCE CHAPTER (if entered)
  │ Character walks in (3 steps) → stops at table
  │ arms_cross pose
  │ idle_breathe continues (arms stay crossed)
  │ Card reveals → head turn + nod of confirmation
  │
  │ User returns to main page...
  ▼
PROJECTS CHAPTER (if entered)
  │ HALLWAY — no character visible (first person POV)
  │ Camera walks through corridor (scroll-driven)
  │ Click door → door explodes open → white flash
  │ HACKER OS — character at desk, typing
  │ type_keyboard loop + periodic mouse-click break
  │ User opens window → character pauses, glances
  │ User exits → character nods farewell, fade out
  │
  │ User returns to main page...
  ▼
CERTIFICATIONS (main page)
  │ No character — trophy 3D objects only
  │
  ▼
GAMIFIED CHALLENGE
  │ No character — UI-only section
  │
  ▼
CONTACT (Dead Drop Terminal)
  │ No character — terminal UI only
  │
  ▼ [END OF JOURNEY]
```
