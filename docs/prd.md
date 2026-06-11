# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Saumok Kundu — Personal Developer Portfolio
### "The Architect of Intelligence"
**Version**: 1.0  
**Author**: Saumok Kundu  
**Status**: Approved for Production  
**Last Updated**: June 2026

---

## 1. EXECUTIVE SUMMARY

### 1.1 Product Vision
A cinematic, multi-chapter personal portfolio website that functions as an interactive experience rather than a static page. The visitor — typically a recruiter, hiring manager, or fellow developer — is taken on a guided journey through Saumok Kundu's story as an AI/ML architect. Each "chapter" (section) is a self-contained world with unique visuals, animations, and interactions.

### 1.2 Problem Statement
Standard developer portfolio websites are forgettable. They follow identical patterns: hero, about, skills, projects, contact. A hiring manager reviewing 50 portfolios in a day will not remember any of them. This portfolio must be the one they remember and tell their colleagues about.

### 1.3 Goals
- **Primary Goal**: Make any hiring manager stop, engage for 5+ minutes, and remember the portfolio
- **Secondary Goal**: Accurately communicate Saumok's technical depth, project diversity, and creative thinking
- **Tertiary Goal**: Demonstrate by example that Saumok builds things that are both functional AND beautiful

### 1.4 Non-Goals (Out of Scope)
- This is NOT a blog platform — no CMS, no dynamic content creation by the owner
- This is NOT a freelance marketplace — no client intake forms or service pricing
- This is NOT a social network — no comments, likes, or user accounts
- This is NOT a mobile-first experience — desktop is primary, mobile is graceful fallback

---

## 2. USER PERSONAS

### Persona 1: The Hiring Manager (Primary)
- **Who**: Tech recruiter or engineering manager at a startup or mid-size tech company
- **Context**: Has reviewed 20–50 portfolios this week
- **Time**: Will give 30 seconds before deciding to go deeper or bounce
- **Behavior**: Looks for: strong projects, clear skills, signs of personality/culture fit
- **Technical level**: Non-technical to lightly technical
- **What they need**: 
  - Fast first impression of identity and capability
  - Easy navigation to specific sections (projects, experience)
  - Clear contact method
  - Downloadable resume

### Persona 2: The Senior Developer / Tech Lead (Secondary)
- **Who**: Developer who will interview Saumok or work alongside him
- **Context**: Wants to assess code quality thinking, project complexity, and depth
- **Time**: Will spend 5–10 minutes if impressed in the first 30 seconds
- **Behavior**: Clicks into project details, looks for GitHub links, tries to "break" the UI
- **Technical level**: High
- **What they need**:
  - Actual technical depth in project descriptions
  - Links to GitHub repositories
  - Demonstrated understanding of architecture, not just feature lists
  - The interactive/gamified elements (they will play with everything)

### Persona 3: The Curious Peer (Tertiary)
- **Who**: Another developer who found the portfolio shared on LinkedIn/Twitter
- **Context**: Curious about the design and technology choices
- **Time**: Will spend 10+ minutes exploring everything
- **Behavior**: Tries every interaction, hunts for easter eggs, inspects DevTools
- **What they need**: 
  - Rewarding exploration — nothing hidden should be boring
  - Credits/tech stack information
  - Clear social links to follow

---

## 3. PRODUCT ARCHITECTURE

### 3.1 Page Structure
The portfolio is a Single Page Application (SPA) with multiple "chapter" views. Navigation between chapters uses smooth, cinematic transitions rather than page reloads.

```
URL Structure:
  / (root)          → Main Overview Page (all sections in brief)
  /#about           → About Chapter (full experience)
  /#skills          → Skills Chapter (full experience)
  /#experience      → Experience Chapter (full experience)
  /#projects        → Projects Chapter (full experience)
  /#contact         → Contact Section (inline, no separate chapter)
```

### 3.2 Navigation Model
- **Top Navigation Bar**: Persistent glassmorphic navbar visible on all pages
  - Logo/name on left
  - Chapter links: About | Skills | Experience | Projects | Contact
  - "Download CV" button on right
  - Active chapter highlighted
- **Chapter Entry Buttons**: At the end of each brief section on the main page, a CTA button ("Enter →") transitions to the full chapter
- **Chapter Exit**: Each full chapter page has a "← Back" navigation to return to the main page

### 3.3 Loading Strategy
- **Critical Path**: Boot sequence animation (HTML/CSS only) plays while Three.js scenes load in background
- **Progressive Loading**: Hero scene loads first, other scenes load on demand when user navigates to that chapter
- **Loading Indicators**: Per-chapter loading is masked by the terminal transition animation
- **Fallback**: If WebGL is not supported, a static high-quality 2D version renders instead

---

## 4. FUNCTIONAL REQUIREMENTS

### 4.1 FR-001: Boot Sequence (Hero Entry)
| ID | Requirement | Priority |
|---|---|---|
| FR-001.1 | On first load, display a full-screen terminal animation that simulates a system boot | MUST |
| FR-001.2 | Terminal text must include: INITIALIZING SAUMOK.OS, loading progress bar, IDENTITY KERNEL FOUND: SAUMOK KUNDU, CLEARANCE LEVEL: ARCHITECT, SYSTEM READY | MUST |
| FR-001.3 | Boot sequence must be skippable by clicking anywhere or pressing any key | MUST |
| FR-001.4 | Boot sequence total duration: 4 seconds (non-skipped) | MUST |
| FR-001.5 | After boot, the 3D hero scene fades/materializes in smoothly | MUST |
| FR-001.6 | Boot sequence plays only on first visit per session (sessionStorage flag) | SHOULD |

### 4.2 FR-002: Hero Section (Main Page)
| ID | Requirement | Priority |
|---|---|---|
| FR-002.1 | Display 3D character model that renders in browser using Three.js | MUST |
| FR-002.2 | Character plays idle breathing animation in a loop | MUST |
| FR-002.3 | Character's eyes track the mouse cursor position in real-time | MUST |
| FR-002.4 | Display name "SAUMOK KUNDU" in Orbitron font, large, with a subtle glitch/reveal animation | MUST |
| FR-002.5 | Display a typewriter effect cycling through roles: "IoT Developer" → "AI/RPA Engineer" → "Full-Stack Architect" → "LLM Wrangler" → repeat | MUST |
| FR-002.6 | Display two CTA buttons: "EXPLORE MY WORK" and "DOWNLOAD CV" | MUST |
| FR-002.7 | Floating data rings orbit the character (3 concentric rings, slow rotation) | MUST |
| FR-002.8 | Ambient particle field fills the background (not overwhelming, like a star field) | MUST |
| FR-002.9 | Custom glowing cursor that leaves a short color trail | SHOULD |
| FR-002.10 | Clicking the 3D character triggers a special animation (nod or thumbs up) | SHOULD |

### 4.3 FR-003: About Chapter (Full Page)
| ID | Requirement | Priority |
|---|---|---|
| FR-003.1 | Display a 3D holographic briefing table as the central 3D element | MUST |
| FR-003.2 | A holographic projection of the character slowly rotates on the table surface (translucent, scanline effect) | MUST |
| FR-003.3 | Four floating info cards surround the table, each clickable | MUST |
| FR-003.4 | Clicking a card causes it to fly toward the camera and expand with full detail | MUST |
| FR-003.5 | A small interactive globe on the table shows Kolkata, Chengdu, and Melbourne as glowing pins | MUST |
| FR-003.6 | Stat counters animate up when in view (CGPA, projects count, certifications count) | MUST |
| FR-003.7 | Personal bio text (written by Saumok — to be provided) displayed in readable typography | MUST |
| FR-003.8 | "Download CV" button available in this section | MUST |

### 4.4 FR-004: Skills Chapter (Full Page)
| ID | Requirement | Priority |
|---|---|---|
| FR-004.1 | Display skills as an interactive constellation map (stars = skills, lines = relationships) | MUST |
| FR-004.2 | Stars must be grouped into visible clusters by category (AI/ML, Web Dev, Data, IoT/Automation, Tools) | MUST |
| FR-004.3 | Hovering a star node: node glows brighter, connected lines light up, tooltip shows skill name | MUST |
| FR-004.4 | Clicking a star: a detailed card flies in showing skill name, proficiency %, years of experience, and which projects used this skill | MUST |
| FR-004.5 | A "CHALLENGE TERMINAL" panel allows users to type any skill name and the constellation responds (highlighting that skill and its connections) | MUST |
| FR-004.6 | Category filter buttons allow viewing only one cluster at a time | SHOULD |
| FR-004.7 | A character model is present as a guide figure, pointing toward active elements | SHOULD |
| FR-004.8 | An XP/level counter in the corner shows cumulative "developer level" | COULD |

### 4.5 FR-005: Experience Chapter (Full Page)
| ID | Requirement | Priority |
|---|---|---|
| FR-005.1 | Display two experience cards with a "classified transmission" reveal animation (text decrypts character by character as user scrolls) | MUST |
| FR-005.2 | A 3D globe shows transmission arcs from Kolkata → Chengdu and Kolkata → Melbourne | MUST |
| FR-005.3 | Transmission arcs animate like a signal traveling (moving pulse along the arc) | MUST |
| FR-005.4 | Each experience card displays: Role, Company, Duration, 3 key bullet points, tech stack badges | MUST |
| FR-005.5 | Each experience card has a "CLASSIFIED" stamp that fades out as the card reveals | MUST |
| FR-005.6 | Tech stack badges for each role displayed as glowing pill tags | MUST |

### 4.6 FR-006: Projects Chapter (Full Page) — THE HALLWAY + HACKER OS
| ID | Requirement | Priority |
|---|---|---|
| FR-006.1 | Display a 3D first-person corridor (the Hallway) as the entry experience | MUST |
| FR-006.2 | Scrolling moves the camera forward along the corridor — camera movement is scroll-driven (not physics-based) | MUST |
| FR-006.3 | 7 doors visible in the corridor, each with a unique glow color matching its project | MUST |
| FR-006.4 | Hovering a door within range: door glow intensifies, project name appears above door | MUST |
| FR-006.5 | Clicking a door: blast door split-open animation, bright light, transition to that project's Hacker OS | MUST |
| FR-006.6 | The Hacker OS shows: desktop wallpaper (project screenshot), app icons for key features, a taskbar | MUST |
| FR-006.7 | Double-clicking an app icon opens a window with feature details (draggable window) | MUST |
| FR-006.8 | A terminal window in the OS: typing `./launch_demo` opens the live project URL in a new tab | MUST |
| FR-006.9 | A GitHub icon/button links to the project's GitHub repository | MUST |
| FR-006.10 | Exiting the OS (close button or ESC) returns user to the hallway at their last position | MUST |
| FR-006.11 | The corridor walk animation must be perfectly smooth — no stuttering, no physics glitches | MUST (CRITICAL) |

### 4.7 FR-007: Certifications Section (Main Page — inline)
| ID | Requirement | Priority |
|---|---|---|
| FR-007.1 | Each certification triggers an "Achievement Unlocked" notification animation | MUST |
| FR-007.2 | Notification includes: certification name, issuing body, date, a rarity tier (e.g., LEGENDARY) | MUST |
| FR-007.3 | A 3D trophy model spins on the certification card (if Fable delivers trophy GLBs) | SHOULD |
| FR-007.4 | Clicking a certification reveals full details and a link to verify the credential | MUST |
| FR-007.5 | XP counter ticks up with each certification reveal | SHOULD |

### 4.8 FR-008: Gamified Lock — 3-Stage Challenge (Before Contact)
| ID | Requirement | Priority |
|---|---|---|
| FR-008.1 | Contact section is behind a 3-stage lock sequence called "ACCESS TERMINAL" | MUST |
| FR-008.2 | Stage 1 — Trivia: 3 questions about Saumok's projects/skills with multiple choice answers | MUST |
| FR-008.3 | Stage 2 — Code Puzzle: A broken JavaScript snippet displayed in a code editor UI; user must identify and fix the bug | MUST |
| FR-008.4 | Stage 3 — ARIA Chatbot: An AI assistant (pre-scripted responses + optional API) answers questions about Saumok | MUST |
| FR-008.5 | Completing all 3 stages: screen celebrates with confetti, "ACCESS GRANTED" glitch animation, contact section unlocks | MUST |
| FR-008.6 | Each stage has visual progress indicator (Stage 1/3, Stage 2/3, Stage 3/3) | MUST |
| FR-008.7 | A "skip challenge" small link exists for time-pressed recruiters (no penalty) | SHOULD |
| FR-008.8 | Stage screens must not have broken UI elements — they must be pixel-perfect | MUST (CRITICAL) |

### 4.9 FR-009: Contact Section
| ID | Requirement | Priority |
|---|---|---|
| FR-009.1 | Contact section styled as a "dead drop" spy terminal — dark, minimal, typewriter aesthetic | MUST |
| FR-009.2 | Contact is done via a terminal-style interface: user types TO, SUBJECT, MESSAGE as command inputs | MUST |
| FR-009.3 | Submitting sends an actual email via EmailJS (no backend server required) | MUST |
| FR-009.4 | Send button styled as "TRANSMIT" or a briefcase snap-shut animation | MUST |
| FR-009.5 | Success: a ticker-tape style success message "MESSAGE ENCRYPTED. TRANSMISSION QUEUED." | MUST |
| FR-009.6 | Social links: GitHub, LinkedIn displayed as "channels" (CHANNEL 01, CHANNEL 02, etc.) | MUST |
| FR-009.7 | Availability badge visible: pulsing green dot + "OPEN TO OPPORTUNITIES" | MUST |

### 4.10 FR-010: Global / Navigation
| ID | Requirement | Priority |
|---|---|---|
| FR-010.1 | Persistent glassmorphic navbar visible on all pages (not on boot sequence) | MUST |
| FR-010.2 | Chapter transitions use a terminal command animation: `> cd /about` types itself then world loads | MUST |
| FR-010.3 | A scroll progress indicator visible on main page (orbital ring that fills) | SHOULD |
| FR-010.4 | "Back to top" button visible after scrolling past hero | SHOULD |
| FR-010.5 | Keyboard navigation works (Tab through interactive elements, Enter to activate) | SHOULD |

---

## 5. NON-FUNCTIONAL REQUIREMENTS

### 5.1 Performance
| Metric | Target |
|---|---|
| First Contentful Paint (FCP) | < 1.5 seconds |
| Time to Interactive (TTI) | < 3 seconds |
| Three.js scene frame rate | ≥ 60 FPS on a mid-range laptop GPU |
| Total page size (all assets) | < 15 MB (lazy-loaded — < 3 MB initial) |
| GLB files combined | < 8 MB total (compressed) |
| Textures per scene | Max 2048×2048 px |

### 5.2 Browser Compatibility
| Browser | Support Level |
|---|---|
| Chrome 100+ | FULL (primary target) |
| Firefox 100+ | FULL |
| Edge 100+ | FULL |
| Safari 15+ | FULL |
| Mobile Chrome | GRACEFUL (simplified 3D or 2D fallback) |
| Mobile Safari | GRACEFUL |

### 5.3 Responsiveness
| Breakpoint | Behavior |
|---|---|
| Desktop (> 1280px) | Full experience with all 3D, animations, and gamification |
| Tablet (768–1280px) | Full experience, slightly simplified 3D |
| Mobile (< 768px) | 3D scenes replaced with high-quality illustrations/CSS animations |

### 5.4 Accessibility
- All interactive elements must have ARIA labels
- Color contrast ratio ≥ 4.5:1 for all text
- Animations must respect `prefers-reduced-motion` media query
- All images have descriptive alt text
- Focus indicators visible on keyboard navigation

---

## 6. CONTENT REQUIREMENTS

### 6.1 Content Saumok Must Provide (PENDING)
- [ ] Personal bio (3–5 sentences, first person)
- [ ] Professional headshot photo (for character reference)
- [ ] GitHub profile URL
- [ ] LinkedIn profile URL
- [ ] Skill proficiency percentages for all skills
- [ ] GitHub repository links for all 7 projects
- [ ] Tagline (1 punchy sentence)
- [ ] Credential verification URLs for certifications

### 6.2 Content Pre-Filled from Resume/Provided Data
- ✅ Name: Saumok Kundu
- ✅ Email: saumokkundu14814@gmail.com
- ✅ Phone: +91 6289191484
- ✅ Location: Kolkata, West Bengal, India
- ✅ Education: B.Tech CSE (AI-ML), Sister Nivedita University, 2022–2026, CGPA 7.86
- ✅ All 7 project descriptions (see details_to_know.md)
- ✅ All experience entries (see details_to_know.md)
- ✅ All certifications (see details_to_know.md)

---

## 7. SUCCESS METRICS

| Metric | Target |
|---|---|
| Average session duration | > 3 minutes |
| Bounce rate | < 40% |
| Projects section engagement | > 60% of visitors open at least one project OS |
| Gamification completion | > 25% of visitors complete at least Stage 1 |
| Contact form submission | Functional 100% of the time |
| Recruiter callback conversion | (Qualitative — cannot measure automatically) |

---

## 8. CONSTRAINTS & ASSUMPTIONS

### 8.1 Constraints
- No backend server — all dynamic functionality (contact form, chatbot) must use client-side APIs or free third-party services
- Hosting on Vercel (free tier) — no server-side rendering required
- Budget for third-party services: $0 (EmailJS free tier, Vercel free tier)
- 3D character and scenes are delivered by Fable as GLB files — this PRD assumes those files will be available

### 8.2 Assumptions
- Saumok will provide a headshot photo before character production begins
- Saumok will provide remaining content items (bio, links, proficiency ratings) before development begins
- Fable will deliver assets in the exact export specifications documented in fable_production_brief.md
- The portfolio primarily targets the Indian and international tech job market

---

## 9. DEPENDENCIES

| Dependency | Type | Owner | Status |
|---|---|---|---|
| 3D Character GLB | External | Fable | Pending |
| Scene GLB files (6 scenes) | External | Fable | Pending |
| Personal bio text | Content | Saumok | Pending |
| Headshot photo | Content | Saumok | Pending |
| GitHub/LinkedIn URLs | Content | Saumok | Pending |
| EmailJS account setup | Technical | Saumok | Pending |
| Vercel deployment config | Technical | Developer | Pending |
