# 🎬 FABLE PRODUCTION BRIEF
## Saumok Kundu — "THE ARCHITECT OF INTELLIGENCE" Portfolio
### Version 1.0 | For Fable Animator / 3D Artist

---

## 📌 PROJECT OVERVIEW

**Client**: Saumok Kundu (saumokkundu14814@gmail.com)
**Project Type**: Personal Developer Portfolio Website
**Delivery Platform**: Web browser (Three.js / WebGL)
**Target Audience**: Tech recruiters, hiring managers, fellow developers
**Aesthetic**: Dark sci-fi, cyberpunk-meets-glassmorphism, cinematic, premium

**Core Concept**: The portfolio is a multi-chapter cinematic experience. The visitor is an "agent" exploring the digital universe of Saumok Kundu — an AI/ML architect who builds intelligent systems. Each section of the portfolio is a different "world" with its own visual language and atmosphere. All worlds share the same dark, neon-lit, futuristic art direction.

---

## 🎨 ART DIRECTION & STYLE GUIDE

### Color Palette
| Name | Hex | Usage |
|---|---|---|
| Deep Void | `#050510` | Primary background |
| Electric Violet | `#7C3AED` | Primary accent, character glow |
| Cyan Ice | `#06B6D4` | Secondary accent, terminal text |
| Neon Green | `#10B981` | Success states, skill unlocks |
| Amber Gold | `#F59E0B` | Certifications, achievement unlocks |
| Signal Red | `#EF4444` | Classified stamps, alerts |
| Glass White | `rgba(255,255,255,0.08)` | Glassmorphism card surfaces |

### Typography (Reference Only — for text elements in animations)
- **Display**: Orbitron (Google Fonts) — all caps, wide tracking
- **Body**: Inter — clean, readable
- **Terminal**: JetBrains Mono — monospaced, hacker aesthetic

### Lighting Style
- Primary: Rim lighting from below (cool cyan)
- Secondary: Top-down violet fill
- Ambient: Near-zero — dark environments only
- Emissive: Heavy use on glowing elements, neon signs, data streams

### Camera Style
- **Cinematic**: Shallow depth of field, slight lens distortion
- **Transitions**: Slow, deliberate push-ins and pull-outs — never jarring
- **Mood**: Every frame should look like a film still

---

## 👤 CHARACTER SPECIFICATIONS

### Character: Saumok Kundu (The Architect)

**Source**: Client will provide headshot photo.
**Style**: Semi-realistic, stylized — NOT cartoonish. Think ready player me quality but with more artistic flair. Dark outfit (black tech jacket, subtle glowing accents). Clean, confident, professional but edgy.

**Required Rigging**:
- Full body rig (humanoid standard, compatible with Mixamo if possible)
- Face rig with basic expressions: Neutral, Slight Smile, Thinking, Determined
- Eye tracking rig (eyes follow a target point — used for mouse tracking in web)
- Finger articulation (for typing animations)

**Required Animation Clips** (export each as separate GLTF animation or named animation in single GLB):

| Clip Name | Duration | Description |
|---|---|---|
| `idle_breathe` | 3s loop | Subtle chest rise/fall, slight weight shift |
| `idle_look_around` | 5s loop | Eyes scan left, right, subtle head tilt |
| `materialize` | 2.5s | Appears from particle disintegration — body solidifies from bottom to top |
| `dematerialize` | 2s | Reverse of above — dissolves into particles |
| `walk_forward` | 1s loop | Smooth forward walk cycle, confident stride |
| `type_keyboard` | 2s loop | Seated or standing, fingers typing on holographic keyboard |
| `point_left` | 1.5s | Reaches out and points left (for directing attention) |
| `point_right` | 1.5s | Same, right direction |
| `arms_cross` | 1s | Crosses arms — confident/thinking pose |
| `thumbs_up` | 1s | Quick thumbs up — reward animation |
| `nod` | 1s | Single slow nod |
| `boot_sequence_pose` | 3s | Opens from crouched/curled position — stands up slowly, eyes open, glowing |

**Character Glow Effect**:
- Subtle violet/cyan rim light that pulses gently in idle
- Data stream particles occasionally float off the body (very subtle — not overwhelming)
- Eye glow: Cyan iris in dark scenes

---

## 🌐 SCENE BREAKDOWN — CHAPTER BY CHAPTER

---

### SCENE 1: HERO / BOOT SEQUENCE

**File Name**: `scene_hero.blend` / exported as `scene_hero.glb`

**What happens**:
The visitor arrives. A terminal boot sequence plays (handled in HTML/CSS). When complete, the 3D scene transitions in — the character materializes from disintegrating text particles.

**3D Elements Required**:
1. **The Architect Character** — using `materialize` animation clip, then transitions to `idle_breathe`
2. **Floating Data Rings** — 3 concentric rings orbiting the character horizontally, slow rotation, glowing violet/cyan
3. **Background Particle Field** — a vast field of tiny glowing dots (like stars but denser, slower) — NOT a static skybox, these should be individual particles
4. **Ground Plane** — subtle reflective dark surface, mirror-like, reflects character glow only

**Camera**: Slightly below eye level, tilted up — heroic framing. Slowly drifts forward (zoom in) 0.5% per second in idle.

**Interactions (Handled by Three.js — document for reference)**:
- Mouse move → character's eyes track cursor
- Character mesh → Three.js raycasting detects hover → triggers `nod` clip

**Export Requirements**:
- Format: `.glb` (binary GLTF 2.0)
- All animations embedded in single GLB
- Textures: Baked where possible, PBR materials
- Poly count: Under 50,000 triangles total for scene (performance critical)
- Scale: Character should be 1.75 units tall (maps to ~1.75m in Three.js default scale)

---

### SCENE 2: ABOUT — "THE HOLOGRAPHIC BRIEFING TABLE"

**File Name**: `scene_about.glb`

**What happens**:
A circular futuristic briefing table viewed from a slight overhead angle. The character stands beside it or is projected as a small hologram on the table surface. Floating data cards surround the table.

**3D Elements Required**:
1. **Briefing Table** — circular, dark matte surface with glowing edge trim (cyan), embedded screen surface with subtle circuit pattern
2. **Holographic Character Projection** — a smaller (25% scale), translucent version of the character, slowly rotating on the table surface. Use a hologram shader: blue/cyan tint, scanlines, slight flicker
3. **Floating Info Cards** (4 cards, pre-modeled but blank — text added via HTML overlay):
   - Card 1: Location pin + map fragment (Kolkata)
   - Card 2: University crest / diploma icon
   - Card 3: Globe with two glowing pins (China, Australia)
   - Card 4: Counter display (7 projects)
4. **Mini Globe** — placed at center of table, slowly rotating, dark oceans, glowing borders at country outlines, pins light up on China and Melbourne
5. **Ambient Particles** — light motes floating upward around the table

**Camera**: 15–20 degree overhead angle, slowly orbiting the table (very slow — 360° in 60 seconds)

**Interaction**: Clicking a floating card → card flies toward camera, expands (card flip handled in CSS/JS)

**Export**: Single `.glb` — all elements as named mesh objects (Three.js will show/hide them)

---

### SCENE 3: SKILLS — "THE CONSTELLATION MAP"

**File Name**: `scene_skills.glb` — NOTE: This scene is HEAVILY JS-driven. Fable provides the environmental shell only.

**What happens**:
A vast dark void filled with a star constellation where each star is a skill. Lines connect related skills. The character is present but small — more of a guide figure.

**3D Elements Required from Fable**:
1. **The Observatory Environment** — a subtle circular platform the character stands on. Transparent dome overhead (dark glass). This is just the "room" — the actual constellation nodes are generated by Three.js.
2. **Pointing Character** — the character in `point_left` / `point_right` poses, used as a guide. Should also have `type_keyboard` clip available (used when a skill is "challenged")
3. **Holographic Keyboard** — a flat, transparent keyboard prop the character can type on. Modeled separately, parented to character's hand position.
4. **Challenge Terminal Screen** — a floating holographic screen near the character (blank/emissive material — JS will render text on it as an HTML overlay)

**What Three.js generates (NOT needed from Fable)**:
- Individual star nodes (sphere geometries)
- Connecting lines (LineSegments)
- Particle field (Points)
- Glow post-processing

**Export**: `.glb` with named meshes. Character animations: `idle_breathe`, `type_keyboard`, `point_left`, `point_right`

---

### SCENE 4: EXPERIENCE — "INTERCEPTED TRANSMISSIONS"

**File Name**: `scene_experience.glb`

**What happens**:
A spy/intelligence aesthetic. Two "mission files" decrypted as the user scrolls. The atmosphere is like a black ops briefing room. A globe shows transmission lines from Kolkata to the mission locations.

**3D Elements Required**:
1. **Command Room Environment**:
   - Dark room with a large curved display wall (blank — HTML overlay handles text)
   - A central illuminated table (different from About — rectangular, longer)
   - Subtle overhead light rigs (practical set dressing)
2. **Transmission Globe** — Earth globe (realistic texture: dark oceans, glowing landmasses). Animated transmission arcs (glowing curved lines) that shoot from Kolkata to Chengdu (China) and to Melbourne (Australia). The arcs animate like a signal traveling.
3. **Mission Dossier Props**:
   - Closed manila folder × 2 (with "CLASSIFIED" stamp visible)
   - Open folder (pages spread) × 1 — for the expanded state
   - These are props/set dressing, JS handles the open/close animation via CSS
4. **Character** — standing at the table, in `arms_cross` pose, transitions to `nod` when a mission card is revealed

**Transmission Arc Shader**:
- Moving gradient along the arc (signal pulse effect)
- Color: Cyan for China mission, Amber for Australia mission
- Arc appears and "charges" as user scrolls to that experience item

**Export**: `.glb` — globe mesh should be a single named object (`earth_globe`) so Three.js can apply texture + rotation independently

---

### SCENE 5: PROJECTS — "THE HALLWAY + HACKER OS"

**File Name**: `scene_hallway.glb` + `scene_hackeros.glb`

**This is two scenes used in sequence:**

#### 5A — The Hallway

**What happens**:
First-person camera slowly walks down a long dark corridor. On each side are illuminated doors — each door is a project. The walk is triggered by scroll and must be perfectly smooth (NO physics-based character walking — pure camera animation on a spline).

**3D Elements Required**:
1. **The Corridor Architecture**:
   - Long rectangular tunnel, ~80 units long
   - Walls: Dark brushed metal with faint circuit engravings
   - Floor: Reflective black, wet-look, reflects door glow
   - Ceiling: Exposed tech conduits, faint LED strips
   - Perspective: Slight exaggeration (wider near camera, tighter at far end) — use forced perspective modeling for cinematic depth
2. **Project Doors** (7 total — 4 on right, 3 on left, staggered):
   - Each door: Same base geometry (large sci-fi blast door / vault door style)
   - Each door has a **unique glow color** bleeding through the frame edges:
     - LeadsTiq: Red `#EF4444`
     - KrishiVision: Green `#10B981`
     - Cowrite: Purple `#8B5CF6`
     - Likhit Pens: Gold `#F59E0B`
     - Agentic Bros: Steel `#64748B`
     - YaatraExpress: Ocean Blue `#0EA5E9`
     - SocialPilot: Orange `#F97316`
   - Each door has a **nameplate** above it (blank mesh with emissive material — JS overlays project name text)
   - Doors have a subtle **heat shimmer / energy field** in front of them (particle effect)
3. **Ambient Effects**:
   - Floating code characters on the walls (very subtle, barely visible)
   - Steam/smoke vents from ceiling at intervals
   - Directional lights from doors casting colored pools on floor

**Camera Path**:
- Defined spline from start to end of corridor
- Camera height: ~1.6 units (eye level)
- Slight sway: Subtle Y-axis oscillation (0.02 units amplitude, 1Hz) — simulates walking
- Speed: Controlled by JS scroll position. User scrolls → camera advances. Stop scrolling → camera stops.

**Door Hover Interaction**:
- When camera is within 15 units of a door → door frame glow intensifies
- Clicking a glowing door → triggers `scene_hackeros` load + door "open" animation

**Door Open Animation**:
- Blast door splits in half (top half rises, bottom half drops)
- Bright light floods out
- Camera rushes forward into the light
- Fade to white → transition to Hacker OS scene

---

#### 5B — The Hacker OS Desktop

**File Name**: `scene_hackeros.glb` — NOTE: Minimal 3D, mostly 2D UI overlaid on 3D environment

**What happens**:
After entering a door, the "screen" becomes a futuristic operating system desktop. The character is visible in the background, sitting at a workstation.

**3D Elements Required**:
1. **Workstation Environment**:
   - Dark desk, multiple holographic monitors (emissive, blank — JS renders OS UI on HTML canvas overlay)
   - Character in background in `type_keyboard` loop animation
   - Ambient blue-purple light from monitors
   - This environment is a backdrop only — very low detail, silhouette-focused
2. **No interactive 3D elements needed here** — the OS UI (windows, icons, terminal) is all HTML/CSS/JS

**OS UI (JS/HTML — document for developer reference)**:
- Desktop with project-specific wallpaper
- 3–4 app icons (one per major feature of the project)
- Taskbar at bottom
- Double-click icon → window opens with project details
- Terminal window: type `./launch_demo` → opens live project URL
- `ALT+F4` or close button → smooth transition back to hallway

---

### SCENE 6: CERTIFICATIONS — "ACHIEVEMENT UNLOCKED"

**File Name**: No dedicated 3D scene needed — this is CSS/JS animation only.

**Fable deliverable for this section**: None. The "achievement unlocked" notification is a 2D CSS animation.

**If Fable wants to add value**: Design a **trophy 3D model** (`.glb`) for each certification:
- IBM cert → Stylized CPU/chip trophy with IBM blue glow
- Michigan cert → Circuit board mortar board trophy

These trophies spin in 3D on the achievement card. Low poly, under 2,000 triangles each.

---

### SCENE 7: CONTACT — "THE DEAD DROP TERMINAL"

**File Name**: No dedicated 3D scene — HTML/CSS terminal simulation only.

**Fable deliverable for this section**: 
- **Optional**: A briefcase `.glb` model — dark matte, metal clasps, subtle glow. Used as the "send" button visual. Snap-shut animation when message is sent.
- Under 1,000 triangles. Snap-shut animation: 0.5s, clasps lock, LED indicator turns green.

---

## 📦 COMPLETE ASSET DELIVERY CHECKLIST

### Required GLB Files
| File | Contents | Priority |
|---|---|---|
| `character_saumok.glb` | Full character with all 12 animation clips | 🔴 CRITICAL |
| `scene_hero.glb` | Data rings, particle field, ground plane | 🔴 CRITICAL |
| `scene_about.glb` | Briefing table, hologram projection, info cards, globe | 🔴 CRITICAL |
| `scene_skills.glb` | Observatory shell, holographic keyboard, terminal screen | 🟡 HIGH |
| `scene_experience.glb` | Command room, transmission globe, dossier props | 🟡 HIGH |
| `scene_hallway.glb` | Full corridor with 7 doors + all effects | 🔴 CRITICAL |
| `scene_hackeros.glb` | Workstation backdrop environment | 🟡 HIGH |
| `prop_trophy_ibm.glb` | IBM certification trophy (optional) | 🟢 NICE TO HAVE |
| `prop_trophy_michigan.glb` | Michigan certification trophy (optional) | 🟢 NICE TO HAVE |
| `prop_briefcase.glb` | Contact section send button (optional) | 🟢 NICE TO HAVE |

### Reference Images to Provide to Fable
| Reference | Purpose |
|---|---|
| Saumok's headshot photo | Character face/appearance reference |
| LeadsTiq screenshot | Corridor door atmosphere reference |
| KrishiVision screenshot | Corridor door atmosphere reference |
| All 7 project screenshots | Door design + Hacker OS wallpaper for each |

---

## ⚙️ TECHNICAL EXPORT SPECIFICATIONS

> [!IMPORTANT]
> Fable MUST follow these specs or the Three.js integration will break.

### GLB Export Settings
```
Format:           Binary GLTF 2.0 (.glb)
Coordinate System: Y-up (three.js default)
Scale:            Metric (1 unit = 1 meter)
Textures:         Embedded in GLB (NOT separate files)
Texture Format:   PNG or WebP (NOT BMP or TIFF)
Max Texture Size: 2048×2048 px (mobile performance)
Normal Maps:      Yes, baked
Emission Maps:    Yes, for all glowing elements
```

### Animation Export Settings
```
Format:           Embedded in same GLB as mesh
Naming:           Exact names from the animation clip table above
                  (e.g., "idle_breathe", "materialize" — NO spaces, use underscores)
FPS:              30fps
Loop Points:      Clearly marked in animation name (loop clips)
Root Motion:      DISABLED (Three.js handles character movement)
```

### Polygon Budget per Asset
```
character_saumok.glb:   ≤ 15,000 triangles
scene_hero.glb:          ≤ 5,000 triangles (excl. particles — JS handles)
scene_about.glb:         ≤ 8,000 triangles
scene_skills.glb:        ≤ 3,000 triangles
scene_experience.glb:    ≤ 8,000 triangles
scene_hallway.glb:       ≤ 20,000 triangles
scene_hackeros.glb:      ≤ 5,000 triangles
prop files:              ≤ 2,000 triangles each
```

### Material Requirements
```
All materials:   PBR (Physically Based Rendering)
Emissive maps:   Required for ALL glowing elements
Alpha blending:  Use for hologram character (scene_about), glass elements
Metallic:        High metallic for tech surfaces
Roughness:       Low roughness for reflective floors/metal
Backface culling: ON for all solid geometry
```

### Naming Conventions (Mesh Objects)
All mesh objects inside GLB files must follow this naming so Three.js can reference them:

```
Scenes:
  scene_[name]_environment     → background/room geometry
  scene_[name]_interactive     → clickable objects
  scene_[name]_fx              → particle emitters / effect meshes

Character:
  char_body                    → main body mesh
  char_head                    → head/face mesh
  char_eyes                    → eye meshes (for glow shader)
  char_hair                    → hair mesh

Props:
  prop_[name]                  → any standalone prop
  
Hallway Doors:
  door_leadstiq                → door mesh
  door_krishivision
  door_cowrite
  door_likhitpens
  door_agenticbros
  door_yaatraexpress
  door_socialpilot
```

---

## 🔗 HOW THREE.JS WILL USE THESE FILES

```javascript
// How the developer will load your GLB files:
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

// Load character
loader.load('character_saumok.glb', (gltf) => {
  const character = gltf.scene;
  const animations = gltf.animations; // Array of AnimationClips
  
  // Play animation by name:
  const mixer = new THREE.AnimationMixer(character);
  const clip = THREE.AnimationClip.findByName(animations, 'idle_breathe');
  mixer.clipAction(clip).play();
});

// Access named mesh:
const door = gltf.scene.getObjectByName('door_leadstiq');
door.addEventListener('click', openLeadstiqProject);
```

**This means**: Every named object in your GLB files is directly referenceable by name in JavaScript. The naming conventions above are NOT optional — they are the API contract between Fable and the developer.

---

## 📋 QUESTIONS FABLE SHOULD ANSWER BEFORE STARTING

1. Can you export rigged characters with multiple animation clips in a single `.glb`?
2. Can you apply custom GLSL shaders in your pipeline, or do we handle that in Three.js post-export?
3. For the hologram character in scene_about — can you provide a separate low-poly version of the character with a translucent/emissive material preset?
4. For the corridor camera path in scene_hallway — can you export the camera spline as a separate JSON/GLTF animation, or should the developer define the spline independently?
5. What is your standard turnaround per scene?
6. Can you deliver scenes in phases (character first, then scenes in priority order)?

---

## 📞 CONTACT

**Developer Contact**: Saumok Kundu
**Email**: saumokkundu14814@gmail.com

*This document should be shared with Fable along with the reference screenshots of all 7 projects and the client's headshot photo.*
