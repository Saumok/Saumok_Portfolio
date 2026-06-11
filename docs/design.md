# DESIGN DOCUMENT
## Saumok Kundu — "The Architect of Intelligence" Portfolio
**Version**: 1.0  
**Status**: Final — Approved  
**Last Updated**: June 2026

---

## 1. DESIGN PHILOSOPHY

### 1.1 Core Principle
This portfolio is not a website. It is a **cinematic interactive experience**. Every design decision must serve one of two goals:
1. **Awe** — The visitor must feel something visually powerful within 3 seconds
2. **Clarity** — Despite the visual richness, information must be instantly scannable

When these two goals conflict, **Awe wins on entry, Clarity wins on content**.

### 1.2 Aesthetic DNA
The design language is built at the intersection of:
- **Cyberpunk sci-fi** (blade runner, tron legacy, deus ex) — dark environments, neon accents, data everywhere
- **Premium glassmorphism** (Apple Vision Pro, Linear.app) — depth, frosted surfaces, layered hierarchy
- **Cinematic storytelling** (A24, Nolan films) — dramatic reveals, breathing room, intentional pacing
- **Intelligence aesthetic** (Palantir, Notion, Arc Browser) — things that look smart because they ARE smart

### 1.3 Emotional Arc (What the visitor feels as they explore)
```
ARRIVAL      → Mystery, intrigue ("what IS this?")
HERO         → Awe, excitement ("this is insane")
ABOUT        → Warmth, human connection ("he's real and relatable")
SKILLS       → Respect, confidence ("this person knows their craft")
EXPERIENCE   → Trust, legitimacy ("he's done this for real")
PROJECTS     → Excitement, FOMO ("I want to work with someone who builds this")
CERTS        → Celebration, FOMO ("he keeps leveling up")
CHALLENGE    → Fun, playfulness ("this is unexpected and delightful")
CONTACT      → Urgency, desire to connect ("I need to reach out NOW")
```

---

## 2. COLOR SYSTEM

### 2.1 Color Tokens

```css
:root {
  /* ── FOUNDATIONS ── */
  --color-void:         #050510;   /* True background — deepest black-blue */
  --color-surface-1:    #0A0A1A;   /* Card backgrounds */
  --color-surface-2:    #0F0F28;   /* Elevated surfaces */
  --color-surface-3:    #14143A;   /* Highest surface layer */
  --color-border:       rgba(255, 255, 255, 0.06);  /* Subtle borders */
  --color-border-glow:  rgba(124, 58, 237, 0.3);    /* Glowing borders */

  /* ── ACCENT PALETTE ── */
  --color-violet:       #7C3AED;   /* Primary brand accent */
  --color-violet-light: #A78BFA;   /* Lighter violet for text */
  --color-violet-glow:  rgba(124, 58, 237, 0.4);    /* Glow effect */
  --color-cyan:         #06B6D4;   /* Secondary accent — terminal, data */
  --color-cyan-light:   #67E8F9;   /* Lighter cyan */
  --color-cyan-glow:    rgba(6, 182, 212, 0.4);
  --color-green:        #10B981;   /* Success, KrishiVision project */
  --color-green-glow:   rgba(16, 185, 129, 0.4);
  --color-amber:        #F59E0B;   /* Achievements, Likhit Pens project */
  --color-amber-glow:   rgba(245, 158, 11, 0.4);
  --color-red:          #EF4444;   /* Classified, alerts, LeadsTiq project */
  --color-red-glow:     rgba(239, 68, 68, 0.4);
  --color-orange:       #F97316;   /* SocialPilot project */
  --color-purple:       #8B5CF6;   /* Cowrite project */
  --color-steel:        #64748B;   /* Agentic Bros project */
  --color-ocean:        #0EA5E9;   /* YaatraExpress project */

  /* ── TEXT ── */
  --color-text-primary:   #F8FAFC;   /* Main body text */
  --color-text-secondary: #94A3B8;   /* Supporting text */
  --color-text-muted:     #475569;   /* Placeholder, disabled */
  --color-text-terminal:  #06B6D4;   /* Terminal/code text */
  --color-text-accent:    #A78BFA;   /* Highlighted text */

  /* ── GRADIENTS ── */
  --gradient-hero:    linear-gradient(135deg, #050510 0%, #0D0D2B 50%, #100820 100%);
  --gradient-violet:  linear-gradient(135deg, #7C3AED, #A78BFA);
  --gradient-cyan:    linear-gradient(135deg, #06B6D4, #67E8F9);
  --gradient-gold:    linear-gradient(135deg, #F59E0B, #FCD34D);
  --gradient-glass:   linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
}
```

### 2.2 Per-Section Color Temperature
Each section has a dominant accent that shifts the mood:

| Section | Dominant Color | Hex | Mood |
|---|---|---|---|
| Boot Sequence | Cyan | `#06B6D4` | Cold, technical |
| Hero | Violet | `#7C3AED` | Mysterious, grand |
| About | Violet + Cyan blend | Both | Warm, balanced |
| Skills | Cyan | `#06B6D4` | Intellectual, data-driven |
| Experience | Red (classified) | `#EF4444` | Urgent, intense |
| Projects | Per-project color | Various | Dynamic |
| Certifications | Amber/Gold | `#F59E0B` | Achievement, warmth |
| Contact | Cyan + Green | Both | Ready, open |

---

## 3. TYPOGRAPHY

### 3.1 Type Scale

```css
/* Google Fonts imports — MUST be loaded */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  /* Display — for hero titles, section names */
  --font-display: 'Orbitron', sans-serif;

  /* Body — for all readable text content */
  --font-body: 'Inter', sans-serif;

  /* Code / Terminal — for all monospace/hacker UI */
  --font-mono: 'JetBrains Mono', monospace;

  /* ── SIZE SCALE ── */
  --text-xs:    0.75rem;    /* 12px — labels, badges */
  --text-sm:    0.875rem;   /* 14px — secondary text */
  --text-base:  1rem;       /* 16px — body text */
  --text-lg:    1.125rem;   /* 18px — lead text */
  --text-xl:    1.25rem;    /* 20px — section subtitles */
  --text-2xl:   1.5rem;     /* 24px — card titles */
  --text-3xl:   1.875rem;   /* 30px — section titles */
  --text-4xl:   2.25rem;    /* 36px — chapter headings */
  --text-5xl:   3rem;       /* 48px — hero subtitle */
  --text-6xl:   3.75rem;    /* 60px — hero name */
  --text-hero:  clamp(3rem, 8vw, 5rem); /* Responsive hero size */

  /* ── TRACKING / SPACING ── */
  --tracking-display: 0.15em;  /* Orbitron — always wide tracking */
  --tracking-mono:    0.05em;
  --tracking-body:    0.01em;
}
```

### 3.2 Typography Rules
1. **Orbitron is ONLY for**: Section titles, hero name, chapter headings, achievement notifications, classified stamps
2. **Inter is for**: All body copy, card descriptions, bio text, navigation links, button labels
3. **JetBrains Mono is for**: Terminal UI, code snippets, boot sequence text, skill challenge terminal, contact terminal
4. **Orbitron must ALWAYS be uppercase** — it reads poorly in mixed case at large sizes
5. **Never use more than 3 font weights in a single view** — visual hierarchy becomes noisy

---

## 4. SPACING & LAYOUT

### 4.1 Spacing Scale
```css
:root {
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
}
```

### 4.2 Layout Grid
- **Desktop**: 12-column grid, 1280px max container width, 24px gutters
- **Tablet**: 8-column grid, 48px side padding
- **Mobile**: 4-column grid, 24px side padding
- **Full-bleed sections** (Hero, Experience, Projects): Ignore container, go edge-to-edge
- **Content sections** (About cards, Skills): Use container with generous padding

### 4.3 Section Heights
- **Hero**: 100vh (full screen, no scroll visible)
- **Chapter pages**: 100vh with internal scroll
- **Main page sections**: min-height 80vh, auto-expand for content

---

## 5. COMPONENT DESIGN LIBRARY

### 5.1 Glass Card
The fundamental card component. Used in About, Skills, Experience.

```
Visual Spec:
  Background:     rgba(255, 255, 255, 0.04)
  Border:         1px solid rgba(255, 255, 255, 0.08)
  Border-radius:  16px
  Backdrop-blur:  20px
  Box-shadow:     0 8px 32px rgba(0, 0, 0, 0.4),
                  inset 0 1px 0 rgba(255, 255, 255, 0.06)

Hover state:
  Border-color:   rgba(124, 58, 237, 0.4)  [violet glow]
  Box-shadow:     0 8px 32px rgba(124, 58, 237, 0.15),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
  Transform:      translateY(-4px)
  Transition:     all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)

Active/focus state:
  Border-color:   rgba(6, 182, 212, 0.6)  [cyan]
```

### 5.2 Neon Button (Primary)
```
Visual Spec:
  Background:     transparent
  Border:         1.5px solid #7C3AED
  Color:          #A78BFA
  Font:           Inter 500, uppercase, 0.08em tracking
  Padding:        14px 32px
  Border-radius:  8px
  Box-shadow:     0 0 20px rgba(124, 58, 237, 0.3)

Hover state:
  Background:     rgba(124, 58, 237, 0.15)
  Box-shadow:     0 0 40px rgba(124, 58, 237, 0.5)
  Transform:      translateY(-2px)

Before pseudo-element (scan line sweep):
  A light shimmer sweeps left-to-right on hover
  Duration: 0.6s, single pass
```

### 5.3 Terminal Input
```
Visual Spec:
  Background:     rgba(6, 182, 212, 0.05)
  Border:         1px solid rgba(6, 182, 212, 0.2)
  Border-radius:  4px  [intentionally less rounded — technical aesthetic]
  Color:          #67E8F9
  Font:           JetBrains Mono 400, 14px
  Padding:        12px 16px
  Cursor:         blinking block (|) using CSS animation

Prefix:
  Each input line starts with "> " in cyan
  This prefix is NOT editable — it's a ::before pseudo-element

Focus state:
  Border-color:   #06B6D4
  Box-shadow:     0 0 0 2px rgba(6, 182, 212, 0.2)
  Glow:           0 0 20px rgba(6, 182, 212, 0.15)
```

### 5.4 Achievement Notification Card
```
Visual Spec:
  Position:        Fixed, top: 24px, right: 24px
  Width:           360px
  Background:      rgba(245, 158, 11, 0.08)
  Border:          1px solid rgba(245, 158, 11, 0.3)
  Border-left:     4px solid #F59E0B  [thick gold left border]
  Border-radius:   12px
  Backdrop-blur:   20px
  Padding:         20px 24px

Entry animation:
  Slides in from right: translateX(120%) → translateX(0)
  With spring easing: cubic-bezier(0.34, 1.56, 0.64, 1)
  Duration: 0.5s

Contents (top to bottom):
  Row 1: 🏆 "ACHIEVEMENT UNLOCKED" — Orbitron, amber, 11px, uppercase
  Row 2: Certification name — Inter 600, white, 16px
  Row 3: Issuing body + date — Inter 400, --color-text-secondary, 13px
  Row 4: XP bar — fills from 0 to proficiency % over 1s
  Row 5: Rarity tag — "LEGENDARY" / "RARE" in colored pill
```

### 5.5 Tech Stack Badge
```
Visual Spec:
  Background:     rgba(255,255,255,0.06)
  Border:         1px solid rgba(255,255,255,0.1)
  Border-radius:  100px  [fully rounded pill]
  Color:          --color-text-secondary
  Font:           JetBrains Mono 400, 12px
  Padding:        4px 12px

Hover:
  Background:     rgba(124, 58, 237, 0.15)
  Color:          #A78BFA
  Border-color:   rgba(124, 58, 237, 0.3)
```

### 5.6 Constellation Node (Skills)
```
3D Sphere (Three.js geometry):
  Radius:         0.08 units (small)
  Segments:       16x16 (low poly OK — very small)
  Material:       MeshBasicMaterial, emissive

Default state:
  Emissive color: Varies by category (see below)
  Emissive intensity: 0.6
  Opacity:        0.7

Hover state:
  Emissive intensity: 2.0
  Scale:          1.8x (smooth spring animation)
  Cursor:         pointer

Category colors:
  AI/ML:          #7C3AED  violet
  Web Dev:        #06B6D4  cyan
  Data:           #10B981  green
  IoT/Automation: #F59E0B  amber
  Tools/Cloud:    #64748B  steel
  Languages:      #8B5CF6  purple

Connection Lines (LineSegments):
  Color:          rgba(255,255,255,0.08) default
  On hover:       rgba(accent-color, 0.6) — matching the hovered node
  Line width:     1px
```

---

## 6. ANIMATION SYSTEM

### 6.1 Animation Principles (The 5 Laws)
1. **Nothing pops in** — everything enters through motion (fade, slide, materialize, or grow)
2. **Nothing is instant** — minimum 200ms for any state change, 300ms is standard
3. **Easing is everything** — no linear transitions ever. Use spring curves for joy, ease-out for entries, ease-in for exits
4. **Motion has meaning** — animations must communicate direction and hierarchy, not just decorate
5. **Performance first** — use `transform` and `opacity` only. Never animate `width`, `height`, `top`, `left`

### 6.2 Standard Easing Tokens
```css
:root {
  --ease-standard:  cubic-bezier(0.4, 0, 0.2, 1);   /* Material standard */
  --ease-enter:     cubic-bezier(0, 0, 0.2, 1);      /* Decelerate — elements entering */
  --ease-exit:      cubic-bezier(0.4, 0, 1, 1);      /* Accelerate — elements leaving */
  --ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1); /* Spring — bouncy interactions */
  --ease-smooth:    cubic-bezier(0.25, 0.1, 0.25, 1); /* Smooth — camera, parallax */
}
```

### 6.3 Chapter Transition Animation
**The Terminal Command Transition** — used between ALL chapter navigations:

```
Phase 1 (0–0.3s):
  Current page content fades out (opacity: 1 → 0, ease-exit)
  A dark overlay covers the screen (opacity: 0 → 0.95)

Phase 2 (0.3–0.9s):
  Terminal prompt appears at center of screen
  Text types itself letter by letter at 80ms per character:
  "> cd /about" (or whichever chapter was selected)
  Cursor blinks after typing completes

Phase 3 (0.9–1.2s):
  A brief ">" prompt with "_" cursor, then:
  System response types: "Loading intelligence archive..."
  Progress bar fills in 200ms

Phase 4 (1.2–1.8s):
  Terminal dissolves (opacity fade, slight blur)
  New chapter content fades and slides in from slight depth
  (translateZ(-20px) → translateZ(0), opacity: 0 → 1)

Total duration: ~1.8 seconds
Easing: --ease-enter for everything entering, --ease-exit for everything leaving
```

### 6.4 Scroll-Driven Animations
Using GSAP ScrollTrigger. Standard reveal animations:

```javascript
// Standard element reveal (cards, text blocks)
gsap.fromTo(element, 
  { opacity: 0, y: 40 },
  { 
    opacity: 1, y: 0, 
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  }
);

// Staggered children reveal
gsap.fromTo(children,
  { opacity: 0, y: 30, scale: 0.95 },
  {
    opacity: 1, y: 0, scale: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: { trigger: parent, start: "top 80%" }
  }
);
```

### 6.5 Text Animation Patterns

**Glitch Text** (used on hero name entry):
```css
@keyframes glitch {
  0%, 100% { clip-path: inset(0 0 100% 0); transform: translateX(0); }
  20%       { clip-path: inset(10% 0 60% 0); transform: translateX(-4px); color: #06B6D4; }
  40%       { clip-path: inset(40% 0 30% 0); transform: translateX(4px);  color: #7C3AED; }
  60%       { clip-path: inset(70% 0 5% 0);  transform: translateX(-2px); }
  80%       { clip-path: inset(0 0 80% 0);   transform: translateX(0); }
}
```

**Decrypt/Scramble Text** (used in Experience classified reveals):
- Characters randomly cycle through ASCII characters
- Gradually lock into the correct character from left to right
- Duration: 1.5s per line, 50ms between each character lock
- Characters shown during scramble: `!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`

**Typewriter** (used in hero, boot sequence):
- Standard character-by-character addition
- Speed: 60ms per character (typing)
- Cursor: `|` blinking at 1Hz during and after typing
- Deletion: 30ms per character (faster backspace)

**Counter Animate** (used in About stats):
- Start: 0
- End: target value
- Duration: 2 seconds
- Easing: power2.out (starts fast, decelerates to final value)
- Format: Numbers only, no decimals unless value has them (CGPA: 7.86)

---

## 7. LIGHTING & SHADER DESIGN

### 7.1 Three.js Scene Lighting (All Scenes)
```javascript
// Standard lighting setup for all scenes:

// Ambient — very low, fills shadows minimally
const ambientLight = new THREE.AmbientLight(0x0A0A2E, 0.3);

// Rim Light 1 — primary hero light from below-left
const rimLight1 = new THREE.DirectionalLight(0x06B6D4, 1.5); // Cyan
rimLight1.position.set(-3, -2, 2);

// Rim Light 2 — fill from right
const rimLight2 = new THREE.DirectionalLight(0x7C3AED, 0.8); // Violet
rimLight2.position.set(3, 1, 1);

// Point Light — orbits character or key focal point, creates dynamic shadow
const pointLight = new THREE.PointLight(0x7C3AED, 2, 10);
pointLight.position.set(0, 2, 3);
```

### 7.2 Glow Effect (Post-Processing)
All scenes use UnrealBloomPass for glow:
```javascript
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.6,    // strength — how bright the glow is
  0.4,    // radius — how far glow spreads
  0.85    // threshold — what brightness level triggers glow
);
// Result: glowing elements glow, dark elements stay dark
```

### 7.3 Hologram Shader (scene_about — character projection)
The holographic character in the About scene needs a custom shader:
```glsl
// Fragment shader for hologram effect:
uniform float time;
uniform sampler2D map;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  // Scanline effect — horizontal bands moving upward
  float scanline = sin(vUv.y * 100.0 + time * 2.0) * 0.04;
  
  // Edge fresnel — brighter at edges, transparent at center
  float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
  
  // Base color — cyan tinted
  vec4 color = vec4(0.2, 0.9, 1.0, 0.6 + fresnel * 0.4 + scanline);
  
  // Flicker — random subtle opacity variation
  float flicker = sin(time * 13.0) * 0.03;
  color.a += flicker;
  
  gl_FragColor = color;
}
```

### 7.4 Particle System Specs

**Hero Particle Field**:
```
Count:      2000 particles
Geometry:   Points (Three.js PointsMaterial)
Size:       0.02 units
Color:      White to light violet gradient based on Y position
Opacity:    0.3–0.7 (random per particle)
Movement:   Very slow upward drift (Y += 0.0002 per frame)
            Slight X oscillation (sin wave, different phase per particle)
Reset:      When particle exceeds Y bound, reset to bottom
```

**Experience Transmission Arc Particles**:
```
Count:      50 particles per arc
Path:       Follows the curved arc spline between two globe coordinates
Movement:   Travel from start to end, then reset (like a signal pulse)
Speed:      Full arc traversal in 2 seconds
Color:      Cyan for China arc, Amber for Australia arc
Size:       0.015 units, fades at start and end
```

---

## 8. PER-SECTION DESIGN SPECS

### 8.1 Boot Sequence / Terminal Screen
```
Background:   Pure #050510
Font:         JetBrains Mono, 14px, #06B6D4
Line height:  1.8em
Prefix:       Each line preceded by "█ " that fills from left
Cursor:       Blinking block █ in cyan
Container:    Left-aligned, 80 character wide, vertically + horizontally centered
              (feels like a real terminal window)
Screen:       NO border, NO card — raw terminal on pure dark background
Skip hint:    "[ PRESS ANY KEY TO SKIP ]" — faint, bottom center, appears after 1s
```

### 8.2 Hero Section
```
Layout:       Three.js canvas covers full viewport (background layer)
              HTML content overlaid as absolute positioned elements

Left panel (text):
  Position:   Left 8–10% of viewport, vertically centered
  Name:       Orbitron 900, --text-hero, white, wide tracking
  Typewriter: Inter 400, --text-xl, --color-text-secondary
  CTAs:       Two buttons, stacked on mobile, row on desktop

Right panel (3D):
  Three.js canvas centered right half
  Character positioned slightly right of center
  Orbit rings visible fully

Navbar:
  Position:   Fixed top
  Background: rgba(5, 5, 16, 0.7)
  Blur:       20px backdrop-filter
  Border-b:   1px solid rgba(255,255,255,0.06)
  Padding:    0 40px, height 64px
```

### 8.3 Skills Chapter — Constellation Map Layout
```
Canvas:       Full viewport WebGL canvas (Three.js)
Overlay UI:   HTML elements positioned absolutely

Challenge Terminal (bottom-left):
  Width:      340px
  Style:      Glass card with cyan border
  Prompt:     "> CHALLENGE: _" blinking cursor
  Response:   Below the input, the AI response types itself out

Category Filters (top-right):
  Style:      Pill buttons, glassmorphic
  Active:     Glowing border matching category color

Skill Detail Card (center, appears on click):
  Style:      Large glass card, 400px wide
  Animation:  Scale from 0.8 + opacity 0 → 1 (spring easing)
  Contents:   Skill icon, name, proficiency ring, projects list, year learned
  Dismiss:    Click outside or X button
```

### 8.4 Projects Chapter — Hallway Design

**Corridor Atmosphere**:
```
Fog:              THREE.FogExp2 — very dense, visibility ~30 units
Fog color:        #050510
Floor material:   PBR, high metallic (0.9), low roughness (0.1) — wet look
Wall material:    PBR, dark metal, subtle circuit normal map, roughness 0.7
Lighting:         Only from door frames (colored point lights) and ceiling LED strips

Door Frame glow:
  Implementation: Each door has a THREE.RectAreaLight matching its project color
  Intensity:      2.0 default, 6.0 on hover
  Width/Height:   Matches door opening dimensions
  Visible light:  Project color pools on floor in front of each door

Name Plate:
  Position:       Above each door, angled slightly downward
  Material:       Emissive, project color at 20% opacity
  Text:           HTML Canvas texture baked to plane geometry
                  Font: Orbitron, project name, all caps
```

**Hacker OS Desktop** (2D HTML, rendered over a dark 3D workstation backdrop):
```
Taskbar:
  Position:       Fixed bottom, full width
  Height:         48px
  Background:     rgba(5, 5, 16, 0.95)
  Border-top:     1px solid rgba(255,255,255,0.08)
  Contents:       App icons + running app indicators + clock (top-right)

Desktop:
  Background:     Project screenshot, darkened (brightness 0.3), blurred (10px)
  Desktop icons:  64×64px, glassmorphic rounded squares
  Icon label:     Inter 500, 12px, white, centered below icon

Window (draggable):
  Width:          600px default, resizable
  Min-height:     400px
  Border:         1px solid rgba(255,255,255,0.1)
  Border-radius:  12px
  Backdrop-blur:  20px
  Header:         Dark bar with 3 circles (close/min/max), window title
  Drop shadow:    0 25px 80px rgba(0,0,0,0.6)

Terminal Window:
  Background:     rgba(0, 0, 0, 0.85)
  Font:           JetBrains Mono
  Prompt color:   Cyan
  Output color:   Light gray #D1D5DB
```

---

## 9. MOBILE DESIGN

### 9.1 Philosophy
Mobile is a **graceful fallback**, not a full feature port. The experience is still impressive, just different.

### 9.2 Mobile Substitutions
| Desktop Feature | Mobile Replacement |
|---|---|
| Three.js 3D character | High-quality AI-generated character illustration (static image with CSS animations) |
| Corridor Hallway | Horizontal swipeable project cards |
| 3D constellation skills | 2D grid with category tabs and animated XP bars |
| Holographic briefing table | Vertical scrolling cards with glassmorphic design |
| Boot sequence terminal | Same (works great on mobile) |
| Achievement notifications | Same (works great on mobile) |
| Gamified challenge | Same (fully functional on mobile) |
| Dead drop terminal | Simplified — standard form with terminal aesthetic |

### 9.3 Mobile-Specific Rules
- Touch targets: minimum 44×44px
- No hover states (use tap/focus instead)
- Bottom-anchored navigation (thumb-friendly)
- Reduce animation duration by 30% (devices have less GPU headroom)
- All text minimum 16px (prevents iOS auto-zoom on inputs)

---

## 10. ACCESSIBILITY

```css
/* Reduced motion — respect the user's OS setting */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  /* Three.js animations: stop all non-essential animations */
  /* Keep: static 3D scenes without any movement */
  /* Remove: orbiting rings, particle movement, floating cards */
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  --color-border: rgba(255, 255, 255, 0.3);
  --color-text-secondary: #CBD5E1;
}

/* Focus styles — always visible */
:focus-visible {
  outline: 2px solid #7C3AED;
  outline-offset: 4px;
  border-radius: 4px;
}
```

---

## 11. ASSET SPECIFICATIONS (FOR DESIGNERS)

### 11.1 Images
- Format: WebP with JPG fallback
- Hero illustrations: SVG where possible
- Project screenshots: 1280×800px minimum, 16:9 aspect ratio

### 11.2 Icons
- Library: Lucide Icons (MIT licensed, SVG)
- Size: 20×20px standard, 24×24px for prominent use
- Color: Always inherits from parent (uses `currentColor`)
- Stroke width: 1.5px

### 11.3 Logo / Avatar
- The character concept art (generated by AI from photo): Used as 2D fallback and social preview image
- Format: PNG with transparency
- Size: 512×512px minimum
- Must look good on dark backgrounds only (no white version needed)
