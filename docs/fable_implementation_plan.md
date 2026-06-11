# FABLE IMPLEMENTATION PLAN
## Step-by-Step Production Guide for "The Architect of Intelligence"
### Saumok Kundu Personal Portfolio Website
**Version**: 1.0 | **For**: Fable Animator / 3D Artist Team  
**Companion Documents**: Read prd.md, design.md, and details_to_know.md FIRST  
**Contact**: saumokkundu14814@gmail.com

---

## ⚠️ BEFORE YOU START — CRITICAL RULES

1. **Read ALL companion documents** (prd.md, design.md, details_to_know.md, fable_production_brief.md) before touching any software
2. **Do NOT invent features** — if something is not in these documents, it does not exist
3. **Do NOT change names** — all animation clip names, mesh names, and file names are specified exactly. Match them character-for-character
4. **Ask before assuming** — if anything is unclear, ask the client (saumokkundu14814@gmail.com) before proceeding. A wrong assumption wastes more time than a question
5. **Deliver in phases** — do not wait until everything is complete to share. Share after each phase so the developer can begin integration early
6. **Every GLB must open in three.js-editor.now.sh without errors** before delivering — this is the client's acceptance test

---

## PHASE 0: SETUP & REFERENCE (Day 1, Before Any Modeling)

### Step 0.1 — Read All Documents
Read in this order:
1. `details_to_know.md` — understand who Saumok is and every project detail
2. `prd.md` — understand what the product needs to do
3. `design.md` — understand the visual language, colors, and animation principles
4. `fable_production_brief.md` — understand the 3D technical specs
5. This document — understand the build sequence

**Checkpoint**: You should be able to answer these questions without looking:
- What are the 7 projects and their colors?
- What are the 12 animation clip names for the character?
- What is the poly budget for the character?
- What coordinate system does Three.js use (Y-up or Z-up)?

### Step 0.2 — Gather Reference Materials from Client
Request from Saumok (saumokkundu14814@gmail.com):
- [ ] Professional headshot photo (any angle, any resolution)
- [ ] Screenshots of all 7 projects (1280×800px minimum)
  - LeadsTiq: https://leadstiq.vercel.app/
  - KrishiVision: https://krishivision.vercel.app/
  - Cowrite: https://cowrite-chi.vercel.app/
  - Likhit Pens: URL from client
  - Agentic Bros: No website — request a concept screenshot
  - YaatraExpress: yaatraexpress.com
  - SocialPilot: URL from client

**Do not start Phase 1 until the headshot photo is received.**

### Step 0.3 — Set Up Project Folder Structure
Create this exact folder structure on your workstation:

```
saumok_portfolio_3d/
├── reference/
│   ├── headshot.jpg           ← Client photo
│   ├── project_screenshots/
│   │   ├── leadstiq.png
│   │   ├── krishivision.png
│   │   ├── cowrite.png
│   │   ├── likhit_pens.png
│   │   ├── agentic_bros.png
│   │   ├── yaatraexpress.png
│   │   └── socialpilot.png
│   └── color_palette.png      ← Create from design.md colors
├── source/                    ← Blender/Fable source files
│   ├── character_saumok.blend
│   ├── scene_hero.blend
│   ├── scene_about.blend
│   ├── scene_skills.blend
│   ├── scene_experience.blend
│   ├── scene_hallway.blend
│   └── scene_hackeros.blend
└── exports/                   ← Final GLB files for delivery
    ├── character_saumok.glb
    ├── scene_hero.glb
    ├── scene_about.glb
    ├── scene_skills.glb
    ├── scene_experience.glb
    ├── scene_hallway.glb
    └── scene_hackeros.glb
```

### Step 0.4 — Configure Export Settings (Set Once, Never Change)
In Blender GLTF Export settings, configure:
```
Format:                  GLTF Binary (.glb)
Include:                 Selected Objects → OFF (export all)
Transform → Y Up:        ON ✅ (critical)
Geometry → Apply Modifiers: ON ✅
Materials → Export:      Export
Images → Output Format:  WebP (fallback PNG)
Animation → Export:      ON ✅
Animation → NLA Tracks:  ON ✅
Animation → All Actions: ON ✅
Compression:             Draco (if available) — reduces file size
```

**SAVE THIS AS AN EXPORT PRESET** named "SaumokPortfolioExport" so you never misconfigure it.

---

## PHASE 1: CHARACTER (Priority 1 — Critical Path)
**Estimated time**: 3–5 days  
**Deliver by**: As soon as possible — developer needs this to begin hero section

### Step 1.1 — Character Concept & Approval
Before modeling, create a 2D character sheet in your preferred tool:

**The character sheet must show**:
- Front view
- Side view (left)
- Back view
- Close-up of face (use client's headshot as reference)
- The outfit: Dark tech jacket (matte black), subtle violet/cyan accent trim on collar and cuffs, dark pants, no logos
- The glow: Subtle violet rim light visible in the concept art

**Send the character sheet to Saumok for approval before modeling.**  
**Do not proceed to Step 1.2 until client says "APPROVED".**

### Step 1.2 — Base Mesh Modeling
Create the character base mesh:

```
Specifications:
  Total triangles: ≤ 15,000
  Height: 1.75 Blender units (where 1 unit = 1 meter in Three.js)
  Pose for modeling: T-pose or A-pose (standard for rigging)
  
Mesh objects (name these EXACTLY):
  char_body    — torso, arms, legs, hands
  char_head    — head and neck
  char_eyes    — both eye meshes (left and right) as ONE mesh object
  char_hair    — hair mesh
  
Face topology:
  Edge loops around eyes and mouth (required for face rig)
  Minimum 300 triangles for the face area
  Smooth normals on face and hands
  Hard normals on jacket edges and collar
```

**Do NOT texture yet — texture after rigging is approved.**

### Step 1.3 — Rigging
Create the armature (skeleton):

```
Required bones (standard humanoid):
  Root
    Hips
      Spine → Spine1 → Spine2 → Neck → Head
      LeftShoulder → LeftArm → LeftForeArm → LeftHand → LeftHandIndex1 → (3 segments)
      RightShoulder → RightArm → RightForeArm → RightHand → RightHandIndex1 → (3 segments)
      LeftUpLeg → LeftLeg → LeftFoot → LeftToe
      RightUpLeg → RightLeg → RightFoot → RightToe

Additional controllers:
  Eye_Target — a bone the eyes point toward (for Three.js eye tracking)
  
IK Setup:
  Leg IK: Yes (makes walking animation easier)
  Arm IK: Yes (for pointing/typing animations)
  
Weight painting:
  All vertices must have a bone assignment
  No vertices with zero weight
```

**Test**: Move each bone and verify the mesh deforms cleanly. The jacket should not clip through the body.

### Step 1.4 — Textures & Materials
Apply materials:

```
char_body material:
  Base color: #1A1A2E (very dark navy)
  Jacket accent (collar, cuffs): #7C3AED (violet emissive, intensity 0.3)
  Roughness: 0.8 (matte cloth)
  Metallic: 0.0
  
char_head material:
  Base color: Match client's skin tone from headshot photo
  Roughness: 0.6
  Metallic: 0.0
  Normal map: Add subtle skin pore normal map if available
  
char_eyes material:
  Base color: Client's eye color from photo
  Iris emissive: #06B6D4 (very subtle cyan, intensity 0.2 — the "eye glow" effect)
  
char_hair material:
  Match client's hair color from photo
  Roughness: 0.9 (matte hair)
```

**Texture map sizes**: 
- Body: 1024×1024px
- Head: 1024×1024px (spend budget here — face is most visible)
- Eyes: 512×512px
- Hair: 512×512px

### Step 1.5 — Animation Clips
Create each animation clip in this EXACT order. Name them EXACTLY as listed.

> [!IMPORTANT]
> These names are the API contract between Fable and the developer. One typo = broken animation. Copy-paste these names from this document.

---

**Clip 1: `idle_breathe`** (3 seconds, loops)
- Very subtle chest expansion on inhale (scale Y = 1.0 → 1.015)
- Slight shoulder rise on inhale
- Jaw stays closed, eyes open
- Arms hang naturally, slight sway
- Weight shifts very slightly between left/right foot (1.5-second cycle)
- **Feel**: Natural, calm, alive — not robotic

**Clip 2: `idle_look_around`** (5 seconds, loops)
- Eyes drift left slowly (1.5s)
- Slight head turn left to follow (0.5° rotation)
- Return to center (0.5s)
- Eyes drift right (1.5s)
- Slight head turn right
- Return to center
- Brief downward glance at 3.5s mark
- **Feel**: Natural curiosity, as if scanning the horizon

**Clip 3: `materialize`** (2.5 seconds, plays once)
- Keyframe 0: Character invisible (opacity 0 — handled by Three.js, but pose for this frame: crouched, eyes closed, chin down)
- Keyframe 0–0.5s: Particles converging (no character visible — Three.js handles particles)
- Keyframe 0.5s: Character begins appearing from feet upward
  - Apply a top-to-bottom dissolve using vertex group animation or shape key
  - Feet solidify first, then legs, then torso, then arms, then head
- Keyframe 1.5s: Full body visible, still eyes closed
- Keyframe 2.0s: Head rises, eyes open — with a very slight "awakening" expression
- Keyframe 2.5s: Stands in idle_breathe pose, ready to loop
- **Feel**: Dramatic, like a hero stepping into a new world

**Clip 4: `dematerialize`** (2 seconds, plays once)
- Exact reverse of materialize
- Head lowers, eyes close, body dissolves from feet upward to head
- **Use case**: Chapter transition exit

**Clip 5: `walk_forward`** (1 second, loops)
- Standard confident walk cycle
- Arms swing naturally opposite to legs
- Slight torso sway (very subtle — this is a premium portfolio, not a game)
- Stride length: 0.6 Blender units per step
- Head remains level (no vertical bobbing)
- **IMPORTANT**: Root bone does NOT move (developer moves character via Three.js). Only limbs animate.
- **Feel**: Confident, purposeful — like walking into a meeting room

**Clip 6: `type_keyboard`** (2 seconds, loops)
- Both arms extended forward as if typing on a flat surface
- Fingers move in alternating patterns (not all fingers at once — natural typing)
- Head tilts slightly forward looking at the keyboard
- Subtle eye movement left to right (reading)
- **Use case**: Hacker OS desktop backdrop, Skills section character

**Clip 7: `point_left`** (1.5 seconds, plays once)
- Start: Arms at sides (idle)
- Right arm raises and extends toward left side of screen
- Index finger extends, other fingers curl
- Slight lean of torso toward the point direction
- End: Hold point pose for 0.5s then freeze (Three.js handles hold duration)
- **Use case**: Skills section guiding attention

**Clip 8: `point_right`** (1.5 seconds, plays once)
- Mirror of point_left using left arm

**Clip 9: `arms_cross`** (1 second, plays once)
- Arms fold across chest — right over left
- Chin lifts slightly (confident)
- End: Hold crossed pose (Three.js holds the final frame)
- **Use case**: Experience section — character observing

**Clip 10: `thumbs_up`** (1 second, plays once)
- Right arm raises, thumb extends up, other fingers curl
- Slight smile if face rig allows (or just neutral expression)
- Wrist rotates outward slightly (thumbs up is slightly angled outward, not straight)
- **Use case**: Achievement unlock, easter egg

**Clip 11: `nod`** (1 second, plays once)
- Head tilts forward 15° then returns
- Once only — not a loop
- Eyes remain open
- **Use case**: User hovers on character in hero section

**Clip 12: `boot_sequence_pose`** (3 seconds, plays once)
- Keyframe 0: Crouched — knees bent, arms wrapped around torso, head down, chin tucked
  - This is the "before awakening" pose — fetal-ish but still vertical
  - Character looks dormant, not alive
- Keyframe 0–1.5s: Slowly begins to unfurl
  - Arms extend downward first
  - Spine straightens
  - Knees extend
- Keyframe 1.5–2.5s: Arms rise out to sides (like wings spreading slightly then dropping)
  - This is the dramatic "awakening" moment
  - Eyes open at 2.0s mark
- Keyframe 2.5–3.0s: Settle into idle_breathe start position
- **Feel**: A hero stepping out of stasis — awe-inspiring, not scary

---

### Step 1.6 — Character Export
Export `character_saumok.glb`:

```
Pre-export checklist:
  ✅ All 12 animation clips present and named correctly
  ✅ All 4 mesh objects named correctly (char_body, char_head, char_eyes, char_hair)
  ✅ All textures embedded (not linked to external files)
  ✅ Scale: character is 1.75 units tall
  ✅ Position: character centered at world origin (0, 0, 0)
  ✅ Rotation: character faces +Z direction (into the screen)
  ✅ All transforms applied (Apply → All Transforms before export)
  ✅ No loose geometry (Select All → Merge by Distance to clean)
  ✅ No n-gons (all faces are triangles or quads)
  
Post-export verification:
  1. Open three.js-editor.now.sh
  2. Drag and drop character_saumok.glb onto the editor
  3. Verify: Character appears, not black, not white, correct scale
  4. Click "Animations" tab — verify all 12 clips are listed
  5. Play each animation — verify it plays correctly
  6. Report file size to client — must be < 5MB
```

**Deliver**: `character_saumok.glb` to client for review before moving to scenes.

---

## PHASE 2: SCENE — HERO (Priority 1, alongside character)
**Estimated time**: 1 day  
**Depends on**: Nothing — can be done in parallel with character rigging

### Step 2.1 — Hero Scene Modeling
Create these objects in `scene_hero.blend`:

**Object 1: `scene_hero_ground`** — Ground plane
```
Shape:       Flat plane, 20×20 Blender units
Material:    PBR — Metallic: 0.95, Roughness: 0.08
             Color: #0A0A1A (very dark, nearly black)
             Creates a mirror-like reflective floor
UV mapping:  Not needed — procedural material
Position:    Y = 0 (floor level, character stands on this)
```

**Object 2: `prop_ring_01`** — Inner orbit ring
```
Shape:       Torus
Major radius: 1.2 Blender units (around the character)
Minor radius: 0.015 Blender units (thin)
Material:    Emissive — color #7C3AED (violet), intensity 2.0
Tilt:        15° from horizontal (tilted like Saturn's rings, slightly)
Rotation:    Animated — full 360° rotation in 8 seconds (Y-axis)
```

**Object 3: `prop_ring_02`** — Middle orbit ring
```
Shape:       Torus
Major radius: 1.8 Blender units
Minor radius: 0.012 Blender units
Material:    Emissive — color #06B6D4 (cyan), intensity 1.5
Tilt:        -25° from horizontal (opposite tilt to ring 01)
Rotation:    Animated — full 360° rotation in 13 seconds (opposite direction)
```

**Object 4: `prop_ring_03`** — Outer orbit ring
```
Shape:       Torus
Major radius: 2.4 Blender units
Minor radius: 0.008 Blender units (thinner)
Material:    Emissive — color #A78BFA (light violet), intensity 1.0
Tilt:        40° from horizontal
Rotation:    Animated — full 360° rotation in 20 seconds (Y-axis)
```

**IMPORTANT**: The Three.js developer will add the particle field in code — do NOT add particles to this scene.

### Step 2.2 — Hero Scene Export
```
Pre-export checklist:
  ✅ Object names: scene_hero_ground, prop_ring_01, prop_ring_02, prop_ring_03
  ✅ All ring rotation animations baked into the GLB
  ✅ No camera in the export (Three.js controls the camera)
  ✅ No lights in the export (Three.js adds lights via code)
  ✅ File size < 500KB
  
Post-export verification:
  1. Open three.js-editor.now.sh
  2. Drop in scene_hero.glb
  3. Rings should appear and their animations should play
  4. Ground plane should be visible (dark reflective)
```

---

## PHASE 3: SCENE — ABOUT (Priority 2)
**Estimated time**: 2 days  
**Depends on**: Character (for hologram reference) — can use placeholder if character not done

### Step 3.1 — Briefing Table

**Object: `scene_about_environment`** — The whole environment as one mesh group:
```
Table top:
  Shape: Cylinder, 3m diameter, 0.1m thick
  Material: PBR, Metallic 0.8, Roughness 0.3
             Color: #0D0D2B
             Emissive edge: A thin emissive ring around the table edge, color #06B6D4
             
Table base/pedestal:
  Simple cylindrical pedestal below the table top
  Same material as table top
  
Table surface screen:
  A separate plane embedded in the table top surface (slightly above it)
  Emissive material, color #06B6D4 at 5% opacity (very subtle glow)
  Hexagonal circuit pattern texture (if possible)

Environment room (optional background):
  If Fable wants to add a subtle dark room:
    Simple box geometry for floor and distant walls
    Material: Near-black (#050510), slight fog to fade edges
  If this is too complex — just table in void is fine
```

**Object: `prop_hologram_character`**:
```
Use a simplified (low poly) version of char_body + char_head only
Target poly count: ≤ 2,000 triangles
Scale: 0.4 relative to full character (appears small on table)
Position: Centered on table surface, Y slightly above surface
Material: Hologram shader (translucent cyan — see design.md section 7.3)
Animation: Very slow Y-axis rotation (360° in 15 seconds)
           Breathing animation if possible (or just rotation is fine)
```

**Objects: `prop_info_card_01` through `prop_info_card_04`**:
```
Shape: Flat plane, 0.6×0.8m, very thin (0.01m)
Material: 
  Surface: Glassmorphic — rgba(255,255,255,0.05) + Metallic 0.1, Roughness 0.9
  Edge trim: Thin emissive border, color #06B6D4
  
Positions (floating around the table, at 45° intervals):
  card_01: Position 1.8m from center, 45° angle, Y=1.2m above table
  card_02: Position 1.8m from center, 135° angle, Y=1.2m above table
  card_03: Position 1.8m from center, 225° angle, Y=1.2m above table
  card_04: Position 1.8m from center, 315° angle, Y=1.2m above table

Idle animation: Very gentle floating — Y oscillation ±0.05m, 3-second cycle, each card on a different phase

Note: Card surfaces are blank — Three.js will overlay HTML text on these
```

**Object: `prop_globe`**:
```
Shape: UV Sphere, 0.4m radius, 32×32 segments
Position: Center of table, Y=0.5m above table surface (floating)
Material:
  Base color: #0D1F3C (dark ocean blue)
  Emissive: Slight cyan (#06B6D4) at 10% — continents glow faintly
  If texture possible: Dark world map texture where land is #1A3A5C, ocean is #0D1F3C
Animation: Slow Y-axis rotation, 360° in 30 seconds

Country Pins (small emissive cones or spheres):
  prop_globe_pin_kolkata:   position on India (latitude 22.5°, longitude 88.4°)
  prop_globe_pin_chengdu:   position on China (latitude 30.7°, longitude 104.1°)
  prop_globe_pin_melbourne: position on Australia (latitude -37.8°, longitude 145.0°)
  
  Pin material: Emissive, color varies:
    Kolkata: #7C3AED (violet — home)
    Chengdu: #EF4444 (red — China mission)
    Melbourne: #F59E0B (amber — Australia mission)
  Pin size: Very small — visible but not dominant
```

---

## PHASE 4: SCENE — SKILLS (Priority 3)
**Estimated time**: 1 day (minimal 3D — mostly environment shell)

### Step 4.1 — Observatory Shell

**Object: `scene_skills_environment`**:
```
Platform:
  Shape: Cylinder, 4m diameter, 0.2m thick
  Material: Dark metal PBR, Metallic 0.9, Roughness 0.4
  
Dome (optional, can be very subtle):
  Half-sphere dome above the platform
  Material: Very transparent (alpha 0.05) dark glass
  If performance concern: Skip the dome — just platform in void
```

**Object: `prop_holographic_keyboard`**:
```
Shape: Flat thin rectangular plane, 0.6m × 0.25m, 0.01m thick
       Individual key indentations are fine to model OR just a flat plane is acceptable
Material: Emissive, color #06B6D4, opacity 0.3 — translucent cyan
Position: In front of where the character will stand (developer positions character)
          Should float at hand height (Y ≈ 0.9m from platform surface)
Animation: Subtle pulse — opacity oscillates 0.3 → 0.4 over 2 seconds
```

**Object: `prop_challenge_terminal_screen`**:
```
Shape: Flat plane, 0.8m × 0.5m, 0.01m thick
       Has a thin border frame modeled around it
Material: 
  Screen surface: Emissive, very dark (#050510) — Three.js renders HTML on top
  Frame: Emissive #06B6D4, thin
Position: To the left of where character stands, slightly elevated (Y ≈ 1.4m)
          Angled to face the camera (Y-rotation 15° toward viewer)
```

**Note to Fable**: The constellation (stars, connecting lines) is entirely generated by Three.js. Do not model any stars or constellation elements. Just deliver the environment shell.

---

## PHASE 5: SCENE — EXPERIENCE (Priority 2)
**Estimated time**: 2 days

### Step 5.1 — Command Room Environment

**Object: `scene_experience_environment`** (all room elements as one mesh group):
```
Floor: 10m × 6m rectangular plane, dark reflective (same as hero floor)
Long table: 6m × 1.2m, dark metal, runs across the center of the room
Table glow edge: Thin emissive strip along table edges, color #EF4444 (red — classified theme)
Background wall: Optional — very faint dark wall 6m behind table
Ceiling: Optional — with subtle LED strip lights

Overhead lamp rigs:
  2 practical lamp rig props hanging from ceiling
  Material: Dark metal, with small emissive bulb (#EF4444, dim)
  These add realism but keep it dark and moody
```

**Object: `prop_transmission_globe`**:
```
Shape: UV Sphere, 0.8m radius, 48×48 segments (more detail than About globe — this is featured)
Position: On the table, slightly right of center
Material:
  Base: #0A1628 (dark navy)
  Continents emissive: #1A3A6C at 30% (subtle continental glow)
  Country highlights when animation plays:
    India: Cyan highlight
    China: Red highlight
    Australia: Amber highlight
Animation: Slow rotation Y, 360° in 40 seconds

Transmission Arc Meshes (pre-modeled as tubes, animated):
  prop_arc_india_china: Curved tube mesh following great circle path Kolkata→Chengdu
    Material: Emissive #EF4444, intensity 2.0
    Animation: Visibility off by default, on by Three.js trigger
    The arc itself is a static mesh — Three.js animates a moving particle along it
    
  prop_arc_india_australia: Curved tube mesh Kolkata→Melbourne
    Material: Emissive #F59E0B, intensity 2.0
    Same rules as above
    
  Arc thickness: 0.008m radius (thin line)
  Arc segments: 32 (smooth curve)
```

**Objects: `prop_dossier_closed_01`, `prop_dossier_closed_02`**:
```
Shape: Rectangular folder — a slightly bent flat shape like a real folder
Size: 0.3m × 0.22m × 0.015m (closed)
Material: 
  Color: #8B7355 (manila folder tan)
  Slightly worn roughness texture
  Red "CLASSIFIED" stamp visible on cover — either modeled or as texture decal
Position: On the table, one per experience entry, left side of table
Idle state: Closed (static)
Note: Opening animation is handled by CSS/Three.js — just deliver the closed prop
```

---

## PHASE 6: SCENE — HALLWAY (Priority 1 — Critical)
**Estimated time**: 3–4 days  
**This is the most complex scene — take extra care**

### Step 6.1 — Corridor Modeling

**⚠️ CRITICAL**: The corridor must be modeled with PERFECTLY straight walls. Any deviation from geometric perfection will look wrong as the camera travels through it.

**Object: `scene_hallway_environment`**:
```
Overall corridor:
  Length: 80 Blender units (depth, Z-axis)
  Width:  8 Blender units (X-axis)
  Height: 5 Blender units (Y-axis)
  
  Model approach: 
    - Do NOT use a box — build with separate wall panels so joints look intentional
    - Create: Floor plane, Ceiling plane, Left wall, Right wall — as 4 separate objects
      then merge as one object named scene_hallway_environment
    
Floor:
  Material: PBR, Metallic 0.95, Roughness 0.05 — ultra-reflective (wet look)
  Color: #050510
  Subtle hexagonal tile pattern modeled or textured (optional, adds richness)
  
Walls:
  Material: PBR, Metallic 0.6, Roughness 0.7
  Color: #0A0A1A
  Normal map: Circuit board / tech panel pattern normal map — gives depth without polys
  Panels: Model subtle rectangular panel dividers along the walls every 4 units
  
Ceiling:
  Material: Same as walls but slightly darker
  LED strips: Model thin emissive strips (0.05m × 0.02m) along ceiling edges
    Color: #7C3AED (violet), intensity 0.5 — provides ambient corridor illumination
    These run the full 80-unit length
  Also: Tech conduits — cylindrical pipes along the ceiling, dark matte metal

Forced perspective:
  The corridor end (Z=80) should appear slightly narrower than the entrance (Z=0)
  Floor grid lines (if textured) should converge toward vanishing point
  This is optional — standard orthographic corridor is also acceptable
```

### Step 6.2 — Corridor Doors
Create 7 doors. Each door is an independent object named precisely.

**Door template** (create once, then duplicate and modify):
```
Base shape: Two door panels (bi-parting blast doors)
  Left panel: 1.8m wide × 3.5m tall × 0.2m thick
  Right panel: Same
  Combined, they cover a 3.6m × 3.5m opening in the wall

Door frame: Rectangular frame, 0.1m thick, surrounds the door opening
  Material: Dark metal, PBR Metallic 0.9 Roughness 0.3

Door panel material:
  Color: #0F0F28
  PBR Metallic 0.7, Roughness 0.5
  Horizontal groove lines for industrial aesthetic
  
Glow strip: Thin emissive strip along the frame edges and the door gap between panels
  Each door has its own color (see table below)
  Strip thickness: 0.03m
  Strip emissive intensity: 2.0 (bright, visible from distance)

Name plate holder: Small rectangular recess above door, 0.4m × 0.1m
  This is where the project name will display
  Material: Emissive at very low intensity (0.1) — barely glowing, text overlay by Three.js
```

**Door specifications and positions**:
| Object Name | Project | Glow Color | Hex | Wall Side | Z-Position (depth) |
|---|---|---|---|---|---|
| `door_leadstiq` | LeadsTiq | Red | `#EF4444` | Right wall | Z = 8 |
| `door_krishivision` | KrishiVision | Green | `#10B981` | Left wall | Z = 16 |
| `door_cowrite` | Cowrite | Purple | `#8B5CF6` | Right wall | Z = 28 |
| `door_likhitpens` | Likhit Pens | Gold | `#F59E0B` | Left wall | Z = 36 |
| `door_agenticbros` | Agentic Bros | Steel | `#64748B` | Right wall | Z = 48 |
| `door_yaatraexpress` | YaatraExpress | Ocean Blue | `#0EA5E9` | Left wall | Z = 60 |
| `door_socialpilot` | SocialPilot | Orange | `#F97316` | Right wall | Z = 72 |

**Door open animation** (for each door):
```
Animation name: door_[projectname]_open (e.g., door_leadstiq_open)
Duration: 1.2 seconds
Action:
  Keyframe 0: Both panels at center (door closed)
  Keyframe 1.2: Left panel slides to left wall X limit, right panel slides to right wall
  Movement style: Fast start, eases into open position (cubic ease-in-out)
  
Add emissive intensity keyframes:
  Keyframe 0: Glow strip intensity = 2.0
  Keyframe 0.3: Intensity spikes to 8.0 (flash as door starts opening)
  Keyframe 1.2: Intensity settles at 4.0 (door open, bright light behind)
  
IMPORTANT: Do NOT add any light source behind the door — Three.js handles the "bright light flooding in" effect with a white fade overlay
```

### Step 6.3 — Hallway Scene Export
```
Pre-export checklist:
  ✅ scene_hallway_environment: one merged mesh, named correctly
  ✅ 7 door objects, each named exactly as specified
  ✅ Door open animations present for all 7 doors, named correctly
  ✅ No camera
  ✅ No lights (Three.js adds RectAreaLights to each door in code)
  ✅ Total poly count ≤ 20,000 triangles
  ✅ File size < 3MB

Post-export verification:
  1. Open three.js-editor.now.sh
  2. Load scene_hallway.glb
  3. Navigate in editor to Z=40 (mid-corridor) — should see corridor perspective
  4. All 7 doors should be visible (4 on right, 3 on left)
  5. Door glow strips should be visible (emissive material)
  6. Play animations — all 7 door_open animations should play
```

---

## PHASE 7: SCENE — HACKER OS BACKDROP (Priority 3)
**Estimated time**: 1 day (minimal — background only)

### Step 7.1 — Workstation Environment

**Object: `scene_hackeros_environment`**:
```
Overall: This is a background scene — low detail, creates atmosphere behind the OS UI

Desk:
  Simple L-shaped or straight desk, 2m × 0.8m
  Material: Dark matte wood or dark metal (#1A1A2E)
  
Monitor stands:
  3 monitor stand props (empty stands — screens are HTML canvas overlays)
  Stand material: Dark metal

Under-desk LED:
  Thin emissive strip under desk edge, #7C3AED, intensity 0.5

Room:
  Very minimal — just back wall and floor visible
  Floor: Same reflective dark material
  Back wall: Dark with subtle tech panel texture
  
Chair:
  Simple office/gaming chair silhouette behind the desk
  Character will be seated here in walk_forward pose repurposed as seated
  
Lighting baked into scene:
  Blue/purple monitor glow on the character and desk area
  This is the ONLY scene where Fable should bake ambient lighting
  The monitor glow should create a cool blue light on everything in front of the desk

Poly count: ≤ 5,000 triangles (this is purely background)
```

---

## DELIVERY SCHEDULE

| Phase | Deliverable | File | Target |
|---|---|---|---|
| 1 | Character concept art | PDF/PNG | Day 2 (for approval) |
| 1 | Character GLB | `character_saumok.glb` | Day 7 |
| 2 | Hero scene GLB | `scene_hero.glb` | Day 5 |
| 3 | About scene GLB | `scene_about.glb` | Day 10 |
| 4 | Skills scene GLB | `scene_skills.glb` | Day 12 |
| 5 | Experience scene GLB | `scene_experience.glb` | Day 14 |
| 6 | Hallway scene GLB | `scene_hallway.glb` | Day 18 |
| 7 | Hacker OS backdrop GLB | `scene_hackeros.glb` | Day 20 |

---

## COMMON MISTAKES TO AVOID

| Mistake | Consequence | Prevention |
|---|---|---|
| Wrong animation clip name (e.g., "Idle Breathe" instead of "idle_breathe") | Animation silently fails to play | Copy-paste names from this document |
| Character facing wrong direction (should face +Z) | Character appears to face backward in the scene | Always orient character toward +Z before export |
| Transforms not applied before export | Character appears at wrong scale/position | Apply All Transforms (Ctrl+A in Blender) before every export |
| Textures not embedded | Black/white materials on delivery | Use "Embed Textures" option in GLTF export |
| Lights included in GLB | Double-lighting in Three.js — overly bright/washed out | Never export lights — Three.js provides all lighting |
| Camera included in GLB | Conflicts with Three.js camera | Never export cameras |
| Root motion enabled | Character "walks away" from origin when animation plays | Disable root motion — Three.js moves character |
| Poly count exceeded | 20–40% FPS drop on mid-range laptops | Count triangles before export, not faces |
| Wrong coordinate system (Z-up vs Y-up) | Scene appears 90° rotated | Confirm Y-up export setting every time |
| N-gons (faces with 5+ vertices) | Potential rendering artifacts | Run Triangulate modifier or check in Blender |

---

## QUALITY ACCEPTANCE CRITERIA

A deliverable is considered ACCEPTED only when ALL of the following are true:

**For Character GLB**:
- [ ] Opens in three.js-editor.now.sh without console errors
- [ ] Character is 1.75 units tall
- [ ] All 12 animation clips appear in the Animations panel by exact name
- [ ] Every animation plays correctly when triggered
- [ ] Materials display with correct colors (not black, not white)
- [ ] Eye glow (subtle cyan) visible
- [ ] Jacket violet accent trim visible
- [ ] File is < 5MB

**For Scene GLBs**:
- [ ] Opens in three.js-editor.now.sh without console errors
- [ ] All objects present and named exactly as specified
- [ ] Emissive materials glow (visible in editor)
- [ ] No missing textures
- [ ] File size within budget
- [ ] Animations play if scene has animations

**For Hallway specifically**:
- [ ] All 7 doors present with correct names
- [ ] All 7 door_open animations play correctly
- [ ] Glow strip colors match the specified project colors
- [ ] Walking the Z-axis in the editor feels like a real corridor
