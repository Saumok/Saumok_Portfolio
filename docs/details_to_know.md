# DETAILS TO KNOW
## Everything About Saumok Kundu & This Project
### Read This Before Working on Anything
**Version**: 1.0  
**Purpose**: This document is the single source of truth for all factual information about the client, his work, and the technical context of this project. Anyone working on this project — Fable animators, developers, content writers — must read this document first.

---

## PART 1: ABOUT THE CLIENT

### 1.1 Personal Details
| Field | Value |
|---|---|
| **Full Name** | Saumok Kundu |
| **Preferred Name** | Saumok |
| **Email** | saumokkundu14814@gmail.com |
| **Phone** | +91 6289191484 |
| **Location** | AA17/1 Deshbandhu Nagar, Baguiati, Kolkata, West Bengal, 700059, India |
| **Age** | ~21 (as of 2026) |
| **Social Handles** | LinkedIn: "Saumok" | GitHub: "saumok_k" |

### 1.2 Education
| Level | Institution | Score | Period |
|---|---|---|---|
| Higher Secondary (Class 12) | Pramila Memorial Institute | 82% | Completed |
| Undergraduate (B.Tech CSE — AI/ML) | Sister Nivedita University, Kolkata | CGPA: 7.86 | April 2022 – June 2026 |

**Degree Full Name**: Bachelor of Technology in Computer Science Engineering with specialization in Artificial Intelligence and Machine Learning

### 1.3 Personality & Interests
- **Outdoor pursuits**: Trekking, hiking, backpacking, camping, road trips
- **Professional interests**: Attending hackathons, learning new skills rapidly, mind mapping problems, brainstorming
- **Character traits**: Quick learner, communicative, team player, critical thinker, problem solver
- **Languages spoken**: English (Expert/Fluent), German (Beginner)

### 1.4 Career Goals
- Open to: Internships, full-time roles, freelance projects
- Target roles: AI/ML Engineer, Full-Stack Developer, IoT Developer, AI Systems Architect
- Geographic preference: Open (has done international remote work)

---

## PART 2: PROFESSIONAL EXPERIENCE

### 2.1 Experience 1 — IoT Developer
| Field | Value |
|---|---|
| **Company** | Sichuan Vocational College of Information Technologies |
| **Location** | Chengdu, Sichuan, China 🇨🇳 |
| **Role** | IoT Developer |
| **Type** | Internship / Remote Collaboration |
| **Duration** | April 2025 – June 2025 (3 months) |

**Key Achievements**:
- Engineered Python pipelines for real-time sensor data, achieving 100% consistency for automation workflows
- Optimized system reliability through automated data validation and API testing workflows
- Worked with sensor integration and IoT data collection/preprocessing

**Technologies Used**: Python, NumPy, sensor integration APIs, automated testing frameworks

**Why This is Significant**: International collaboration with a Chinese institution while in India — demonstrates remote work capability and cross-cultural professional experience at age 20.

---

### 2.2 Experience 2 — AI/RPA Developer
| Field | Value |
|---|---|
| **Company** | Employability.life (Federation University Australia) |
| **Location** | Australia 🇦🇺 (Remote) |
| **Role** | AI/RPA Developer |
| **Type** | Project-based collaboration / Internship |
| **Duration** | April 2025 – June 2025 (simultaneous with Experience 1) |
| **Performance Rating** | 3.2 / 4.0 (Professional rating) |

**Key Achievements**:
- Delivered **6 Agile-based RPA projects** — including Excel automation and Email automation pipelines
- Developed an AI-enabled intelligent RPA system for automated supplier invoice processing
- Operated within Agile sprint methodology

**Technologies Used**: RPA tools, Python, Excel automation, Email automation, AI integration for document processing

**Why This is Significant**: Two international experiences simultaneously at age 20. Rated 3.2/4 professionally at a university-affiliated program. Agile methodology experience with real deliverable count (6 projects).

---

## PART 3: ALL 7 PROJECTS (FULL DETAILS)

> [!IMPORTANT]
> These are the EXACT descriptions of every project. Do NOT paraphrase, invent features, or add details not present here. The Hacker OS for each project will display exactly these details.

---

### PROJECT 1: LeadsTiq (formerly Estatly)
**Category**: AI-Powered SaaS CRM  
**Status**: Live  
**Live URL**: https://leadstiq.vercel.app/  
**Project Color**: Red `#EF4444`  
**Hallway Door Position**: First door on the right  

**One-line description**: An AI-powered, omnichannel CRM designed specifically for real estate agents and brokerages — automating the most time-consuming parts of real estate sales.

**Tech Stack**: Next.js (frontend), Python/Flask (backend), Supabase (database + real-time), n8n (workflow automation), Razorpay (payments), ElevenLabs Scribe (AI transcription), Groq/Llama 3.3 (AI analysis), JWT (authentication), RBAC (authorization)

**5 Core Features** (each becomes an app icon in the Hacker OS):

**Feature 1 — AI Live Call Recording & Analysis** 🎙️
- Agents record live browser calls OR upload pre-recorded audio
- ElevenLabs Scribe generates word-level transcripts (Groq Whisper as fallback)
- Llama 3.3 (via Groq) analyzes transcripts for lead sentiment and intent
- Automatically updates Lead Score: 🔥 Hot / 🟡 Warm / ❄️ Cold — no manual data entry

**Feature 2 — Unified WhatsApp Inbox & AI Assistant** 💬
- Full-screen WhatsApp-style inbox inside the CRM
- AI reads messages in background and extracts real estate data: budget, locations, timeline
- Extracted data auto-saved to Lead Insights panel
- AI auto-generates Smart Reply Suggestions in 3 tones: Professional, Friendly, Brief

**Feature 3 — Automated Lead Pipeline & Kanban Board** 📊
- Drag-and-drop Kanban: New → Contacted → Visit Scheduled → Deal Closed
- Supabase WebSockets enable real-time sync: AI changes a lead's score → UI instantly updates everywhere
- n8n webhook endpoints for automated visit reminders and referral tracking

**Feature 4 — Agent Analytics & Field Tracking** 📈
- Performance dashboard: conversions, reply rates, average response times
- GPS field tracking via browser location APIs for on-site property visits

**Feature 5 — Subscription & Billing** 💳
- Razorpay integration with 3 tiers: Basic, Premium, Elite
- Full SaaS monetization built in — can be sold to real estate agencies

---

### PROJECT 2: KrishiVision
**Category**: AgriTech PWA  
**Status**: Live  
**Live URL**: https://krishivision.vercel.app/  
**Project Color**: Green `#10B981`  
**Hallway Door Position**: First door on the left  

**One-line description**: A bilingual, offline-first AI agronomist for farmers — uses hybrid edge + cloud AI to diagnose crop diseases instantly, even without internet.

**Tech Stack**: Next.js 14 (frontend + PWA), TensorFlow.js (offline AI model), Google Gemini 2.5 Flash (cloud AI fallback), Supabase (database + auth), Tailwind CSS, PWA service workers

**Core Architecture — Hybrid AI**:
- **Offline Edge AI**: TensorFlow.js model runs entirely in the browser — zero internet needed, instant results
- **Cloud AI Fallback**: For complex cases, non-leaf scans (fruits/stems), or low-confidence results → falls back to Google Gemini 2.5 Flash

**Key Features** (each becomes an app icon in the Hacker OS):

**Feature 1 — Crop Disease Detection**
- Point camera at a crop leaf
- TensorFlow.js model runs classification ENTIRELY offline
- Returns disease name, confidence score, severity

**Feature 2 — Expert-Verified Remedies**
- AI classification linked to Supabase database of expert-verified treatment plans
- Zero hallucination — remedies are database-backed, not AI-generated

**Feature 3 — Multi-Language Support**
- Supports 9 languages including English and Hindi (bilingual primary)
- Designed for low-bandwidth, rural access

**Feature 4 — Scan History Log**
- All scans stored privately in Supabase
- Farmer can track disease patterns over time on their land

**Feature 5 — P2P Marketplace**
- OTP-authenticated peer-to-peer marketplace
- Supabase Row Level Security (RLS) for data security
- Farmers can buy/sell products securely

---

### PROJECT 3: Cowrite
**Category**: Real-Time Collaborative Workspace  
**Status**: Live  
**Live URL**: https://cowrite-chi.vercel.app/  
**Project Color**: Purple `#8B5CF6`  
**Hallway Door Position**: Second door on the right  

**One-line description**: A real-time collaborative note-taking and document workspace where multiple users edit simultaneously — with a built-in doodle pad.

**Tech Stack**: Next.js (frontend), Express.js (backend), Socket.IO (real-time sync), Supabase (PostgreSQL database), glassmorphic UI

**Key Features** (each becomes an app icon in the Hacker OS):

**Feature 1 — Live Collaboration**
- Multiple users edit the same document simultaneously
- Text edits and cursor positions sync instantaneously without page refresh
- Cursor presence shows which user is where in the document

**Feature 2 — Role-Based Sharing**
- Invite collaborators via email
- Two permission levels: Editor (can edit), Viewer (read only)
- Secure invitation system

**Feature 3 — Integrated Doodle Pad**
- Built-in sketchbook inside the document workspace
- Draw freehand diagrams, sketches, annotations
- Pin doodles directly into the document as images

**Feature 4 — Auto-Save**
- Debounced auto-saving (saves after user stops typing for 500ms)
- No data loss — persistent storage in Supabase PostgreSQL
- No manual save button needed

**Feature 5 — Premium UI**
- Glassmorphic card design with warm tones
- Tilt-card animations on hover
- Dynamic visual feedback throughout

---

### PROJECT 4: Likhit Pens — Luxury E-Commerce Website
**Category**: Freelance Frontend Development  
**Status**: Freelance Project (delivered)  
**Live URL**: TBD — ask Saumok  
**Project Color**: Gold/Amber `#F59E0B`  
**Hallway Door Position**: Second door on the left  

**One-line description**: A cinematic, Awwwards-level luxury e-commerce website for a premium pen brand established in 1957 — built with pure HTML, CSS, and vanilla JavaScript.

**Client**: Likhit Pens — luxury writing instrument brand, Pune, India (est. 1957)

**Stack**: Pure HTML5, Vanilla CSS, Vanilla JavaScript (no frameworks — intentional for performance control)

**Key Features** (each becomes an app icon in the Hacker OS):

**Feature 1 — Cinematic 3D Product Cards**
- 3D tilt effects on product cards
- Magnifying image zoom on hover
- Staggered page reveal animations on scroll

**Feature 2 — Live Pen Engraving Preview**
- SVG-based pen customization tool
- Users type their engraving text and see it preview on the pen in real-time
- Live visual update without page refresh

**Feature 3 — Immersive Shopping Experience**
- Dynamic quantity odometer (number rolls up/down like a slot machine)
- Interactive shopping cart
- Smooth page transitions between product pages

**Feature 4 — Multi-Step Checkout**
- Multi-step checkout flow with simulated payment processing overlay
- Progress indicator through checkout stages

**Feature 5 — Brand Storytelling Pages**
- Parallax-driven 'About' page telling the brand's 1957 legacy
- Corporate page with parallax scroll animations
- Heritage color palette: ink black, parchment, gold

---

### PROJECT 5: The Agentic Bros — Automated Outbound Engine
**Category**: AI Lead Generation System  
**Status**: Operational (run locally + cloud)  
**Live URL**: N/A (script-based system, not a website)  
**Project Color**: Steel `#64748B`  
**Hallway Door Position**: Third door on the right  

**One-line description**: A zero-cost, autonomous B2B lead generation and cold outreach system — finds businesses, analyzes their weaknesses, writes personalized emails, and sends them automatically while you sleep.

**Tech Stack**: Python, Playwright (browser automation), Google Apps Script (cloud), Gemini 2.0 Flash, Groq Llama 3, Google Sheets (central database), Gmail API

**How It Works — Two Autonomous Halves**:

**Half 1 — The Local Discovery Engine** (Python + Playwright, runs on Saumok's machine):
- Hunts businesses on Google Maps by niche and city
- Visits their websites automatically
- Extracts: email addresses, screenshots, page text
- Dumps all collected data into a central Google Sheet

**Half 2 — The Cloud AI Engine** (Google Apps Script, runs 24/7 in cloud, costs $0):
- Reads new leads from the Google Sheet every 5 minutes
- Feeds each lead's website data to Gemini 2.0 Flash or Groq Llama 3
- AI analyzes the website for weaknesses: no online booking, broken mobile views, slow load times, missing trust signals
- AI assigns an "Urgency Score" (0–100) based on how badly the site needs work
- AI drafts a highly personalized cold email calling out their specific flaws
- Google Apps Script sends the email directly from Saumok's Gmail account — automatically

**Result**: A fully autonomous B2B sales machine that finds leads, qualifies them, crafts personalized pitches, and sends them — completely unattended.

---

### PROJECT 6: YaatraExpress — Premium Adventure Tourism Website
**Category**: Freelance Frontend Development  
**Status**: Freelance Project (delivered)  
**Live URL**: yaatraexpress.com (redesigned)  
**Project Color**: Ocean Blue `#0EA5E9`  
**Hallway Door Position**: Third door on the left  

**One-line description**: An Awwwards-level adventure tourism website redesign — Apple-style scroll-driven video scrubbing, cinematic trek showcases, GSAP animations, and premium glassmorphism.

**Client**: YaatraExpress — adventure tourism company

**Stack**: Vanilla HTML, CSS, JavaScript, GSAP 3, Lenis (smooth scroll), FFmpeg (video processing), Lucide Icons

**Key Features** (each becomes an app icon in the Hacker OS):

**Feature 1 — Apple-Style Scroll Video Scrubbing**
- A hero video was converted to 100 JPEG frames using FFmpeg
- Frames are pre-loaded into JavaScript arrays
- As user scrolls, the canvas draws the corresponding frame — creating video-from-scroll effect
- 3 phases of content animate in from different directions at different scroll depths

**Feature 2 — Horizontal Trek Showcase (GSAP Pinned)**
- A GSAP ScrollTrigger-pinned horizontal scroll section
- Showcases all 5 available trek packages with cinematic detail
- Each trek shows: full-width images, descriptions, 6 stat highlights, glass stat cards, pricing, WhatsApp booking CTA

**Feature 3 — Premium Animation System**
- GSAP ScrollTrigger + Lenis smooth scroll throughout
- Targeted animations at 25%, 50%, 75%, 100% scroll depth per section
- Fixed a Lenis double-tick bug and scroll-behavior conflict (performance engineering)

**Feature 4 — Gallery & Social Proof**
- Dual-row infinite marquee gallery of trek photos
- Glassmorphism stat cards (km trekked, travelers, years operating, etc.)
- Testimonials section with cinematic poster trek cards

**Feature 5 — Complete UI Overhaul**
- FAQ accordion with smooth animations
- Full footer redesign
- Mobile-responsive throughout

---

### PROJECT 7: SocialPilot — AI Social Media Manager
**Category**: AI Automation Platform  
**Status**: Deployed  
**Live URL**: TBD — ask Saumok  
**Project Color**: Orange `#F97316`  
**Hallway Door Position**: Fourth door on the right  

**One-line description**: An AI-driven social media automation platform that autonomously handles posting, analytics, and engagement across multiple platforms.

**Tech Stack**: FastAPI (Python backend), React (frontend), OpenAI API (AI content generation)

**Key Features** (each becomes an app icon in the Hacker OS):

**Feature 1 — Automated Cross-Platform Posting**
- Schedule and auto-post content across multiple social media platforms
- AI generates post content based on brief or topic input

**Feature 2 — AI Content Generation**
- OpenAI API generates platform-optimized captions, hashtags, content variations
- Adapts tone and length for each platform (Twitter/X, Instagram, LinkedIn)

**Feature 3 — Analytics Dashboard**
- Track engagement metrics across all connected platforms
- Unified analytics view without switching between platform apps

**Feature 4 — Engagement Automation**
- Automated response suggestions for comments and DMs
- AI prioritizes which interactions need human attention

---

## PART 4: SKILLS INVENTORY

### 4.1 Complete Skills List (For Constellation Map)
Use this exact list — do not add or remove skills.

**Cluster: Programming & Scripting** (Color: Purple `#8B5CF6`)
| Skill | Years | Proficiency |
|---|---|---|
| Python | 4 years | 90% |
| C | 3 years | 70% |
| C++ | 3 years | 65% |
| Java | 2 years | 60% |

**Cluster: AI/ML** (Color: Violet `#7C3AED`)
| Skill | Years | Proficiency |
|---|---|---|
| Machine Learning | 3 years | 85% |
| Large Language Models (LLMs) | 2 years | 88% |
| Fine-Tuning & Prompt Engineering | 2 years | 85% |
| Retrieval-Augmented Generation (RAG) | 1.5 years | 82% |
| LangChain | 1.5 years | 78% |
| AutoGPT / Agentic AI | 1 year | 75% |
| TensorFlow.js | 1 year | 70% |
| Scikit-learn | 3 years | 82% |
| NumPy | 3 years | 88% |
| pandas | 3 years | 85% |

**Cluster: Web / Full-Stack** (Color: Cyan `#06B6D4`)
| Skill | Years | Proficiency |
|---|---|---|
| Next.js | 2 years | 85% |
| React | 2.5 years | 83% |
| FastAPI | 2 years | 80% |
| Flask | 2 years | 80% |
| HTML/CSS/JS | 4 years | 92% |

**Cluster: Data Engineering** (Color: Green `#10B981`)
| Skill | Years | Proficiency |
|---|---|---|
| SQL | 3 years | 80% |
| Excel (Advanced) | 3 years | 75% |
| Data Cleaning | 3 years | 82% |
| Feature Engineering | 2.5 years | 78% |
| Outlier Detection | 2 years | 75% |

**Cluster: Automation & IoT** (Color: Amber `#F59E0B`)
| Skill | Years | Proficiency |
|---|---|---|
| RPA (Robotic Process Automation) | 1.5 years | 78% |
| API Testing | 2.5 years | 80% |
| Sensor Integration | 1 year | 72% |
| IoT Data Collection | 1 year | 70% |
| Playwright (Browser Automation) | 1 year | 75% |

**Cluster: Cloud & Tools** (Color: Steel `#64748B`)
| Skill | Years | Proficiency |
|---|---|---|
| Git / GitHub | 4 years | 88% |
| AWS | 1.5 years | 65% |
| Postman | 2.5 years | 82% |
| Supabase | 2 years | 85% |
| n8n (Workflow Automation) | 1 year | 72% |
| JWT / RBAC | 1.5 years | 75% |

### 4.2 Skill Connections (For Constellation Lines)
These skills are connected in the constellation (draw lines between them):
- Python ↔ NumPy ↔ pandas ↔ Scikit-learn ↔ Machine Learning
- LLMs ↔ LangChain ↔ RAG ↔ Fine-Tuning ↔ AutoGPT
- Python ↔ FastAPI ↔ Flask
- Next.js ↔ React
- Supabase ↔ SQL
- TensorFlow.js ↔ Machine Learning
- n8n ↔ RPA ↔ API Testing
- IoT Data Collection ↔ Sensor Integration ↔ Python
- AWS ↔ Supabase ↔ Git

---

## PART 5: CERTIFICATIONS

### 5.1 Certification 1 — IBM RAG and Agentic AI
| Field | Value |
|---|---|
| **Name** | IBM RAG and Agentic AI Professional Certificate |
| **Issuer** | IBM |
| **Date** | July 2025 |
| **Platform** | Coursera |
| **Rarity Tier** | LEGENDARY (top-tier industry certification) |
| **XP Value** | +6,000 XP |
| **Trophy Design** | CPU chip / processor aesthetics, IBM blue glow |

### 5.2 Certification 2 — Applied ML in Python
| Field | Value |
|---|---|
| **Name** | Applied Machine Learning in Python |
| **Issuer** | University of Michigan |
| **Date** | June 2025 |
| **Platform** | Coursera |
| **Rarity Tier** | EPIC |
| **XP Value** | +4,500 XP |
| **Trophy Design** | Circuit board mortar board / graduation cap |

---

## PART 6: GAMIFICATION CONTENT

### 6.1 Stage 1 — Trivia Questions & Answers
These are the EXACT questions and correct answers for the 3-stage challenge. Use these verbatim.

**Question 1**:
> "What AI model powers LeadsTiq's live call analysis to score leads as Hot, Warm, or Cold?"
- A) GPT-4o
- B) **Llama 3.3 via Groq** ✅ CORRECT
- C) Gemini 2.5 Flash
- D) Claude Sonnet

**Question 2**:
> "KrishiVision works 100% offline because it uses which technology to run AI in the browser?"
- A) PyTorch
- B) ONNX Runtime
- C) **TensorFlow.js** ✅ CORRECT
- D) WebAssembly ML

**Question 3**:
> "The Agentic Bros system uses Google Apps Script running in the cloud to do what — automatically?"
- A) Build websites for clients
- B) Train machine learning models
- C) **Find leads, analyze their websites, and send personalized cold emails** ✅ CORRECT
- D) Generate social media content

### 6.2 Stage 2 — Code Puzzle
Show this broken JavaScript in the code editor. The bug is subtle — the `return` is inside the wrong block.

```javascript
// BUG: Find the error in this async function
async function fetchLeadScore(leadId) {
  try {
    const response = await fetch(`/api/leads/${leadId}`);
    
    if (response.ok) {
      const data = await response.json();
      return data.score;  // ← This looks fine...
    }
      return null; // ← BUG: This should be inside the else block
                   //         but it's always reached regardless
  } catch (error) {
    console.error('Failed to fetch lead:', error);
    // ← BUG: Missing return statement here — returns undefined on error
  }
}
```

**What the user should do**: Identify that the `return null` and missing `return` in catch are the bugs.

**Correct version**:
```javascript
async function fetchLeadScore(leadId) {
  try {
    const response = await fetch(`/api/leads/${leadId}`);
    if (response.ok) {
      const data = await response.json();
      return data.score;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to fetch lead:', error);
    return null; // ← Fixed: always return a value
  }
}
```

### 6.3 Stage 3 — ARIA Chatbot Pre-Scripted Responses
ARIA is Saumok's AI assistant. These are the canned responses for common recruiter questions. The chatbot matches keywords in the user's message to trigger the right response.

| Trigger Keywords | ARIA Response |
|---|---|
| "skill", "best at", "strongest" | "Saumok's deepest skills are in Python, LLMs, and RAG pipelines. He's built production systems using Groq, LangChain, and TensorFlow.js. His IBM certification in Agentic AI reflects his specialization." |
| "experience", "work", "internship", "job" | "He's completed two simultaneous international internships — one as an IoT Developer for a Chinese university, and one as an AI/RPA Developer rated 3.2/4 for Federation University, Australia. Both were in early 2025." |
| "project", "built", "portfolio" | "Saumok has shipped 7 live projects: LeadsTiq (AI CRM), KrishiVision (AgriTech PWA), Cowrite (real-time collab), Likhit Pens (luxury e-comm), Agentic Bros (B2B outreach engine), YaatraExpress (tourism site), and SocialPilot (AI social media manager)." |
| "available", "hire", "join", "open" | "Yes! Saumok is actively open to full-time roles, internships, and freelance projects. He's based in Kolkata, India, and is open to remote or relocation opportunities." |
| "contact", "email", "reach" | "You can reach Saumok at saumokkundu14814@gmail.com or connect on LinkedIn. Alternatively, complete this challenge to unlock the direct contact form above — it's more fun." |
| "llm", "ai", "machine learning", "rag" | "LLMs and RAG systems are his specialty. He's built production RAG pipelines (LeadsTiq), used TensorFlow.js for edge AI (KrishiVision), and holds an IBM certification specifically in RAG and Agentic AI." |
| "hello", "hi", "hey" | "Hello, recruiter. I'm ARIA — Saumok's AI assistant. Ask me anything about his skills, projects, or availability." |
| default (no match) | "That's an interesting question. For detailed technical discussions, I'd recommend reaching out to Saumok directly. He loves talking about his work. Complete the challenge to unlock his contact info." |

---

## PART 7: TECHNICAL CONTEXT FOR NON-DEVELOPERS

> [!NOTE]
> This section explains the technical integration between Fable's 3D output and the website code. Fable animators should read this to understand how their work will be used.

### 7.1 What is Three.js?
Three.js is a JavaScript library that renders 3D graphics inside a web browser. It uses WebGL (the browser's built-in 3D graphics engine) to display 3D objects, animations, lighting, and effects.

**Analogy**: If the web page is a stage, Three.js is the theater director who controls lights, characters, cameras, and props. Fable provides the props (3D models), and Three.js runs the show.

### 7.2 What is a GLB file?
A GLB file (binary GLTF) is the standard format for 3D models on the web. It's like a ZIP file that contains:
- The 3D mesh (the shape of the object)
- Textures (the surface images)
- Materials (how the surface reacts to light)
- Animations (movement sequences)
- Hierarchy (how objects relate to each other)

**Analogy**: A GLB is like a complete action figure — it includes the figure, its paint job, and a set of motion cards describing how it moves.

### 7.3 How Three.js Uses Fable's GLB Files
```
Fable creates → character_saumok.glb

Three.js loads it:
  loader.load('character_saumok.glb', (gltf) => {
    scene.add(gltf.scene);  // Adds character to the 3D world
    
    // Access animations by their EXACT NAME from the GLB:
    const clip = AnimationClip.findByName(gltf.animations, 'idle_breathe');
    mixer.clipAction(clip).play();  // Plays the idle animation
  });
```

**Key implication for Fable**: The animation names inside the GLB file must EXACTLY match the names listed in the production brief. If Fable exports an animation as "Idle Breathing" instead of "idle_breathe", the code will not find it and the animation will not play. This is non-negotiable.

### 7.4 What is GSAP / ScrollTrigger?
GSAP (GreenSock Animation Platform) is a JavaScript animation library. ScrollTrigger is a plugin that triggers animations based on scroll position.

**How it affects Fable's work**: The camera movement through the hallway corridor is controlled by GSAP ScrollTrigger. Fable should NOT animate the camera — Fable only models the corridor environment. The developer defines the camera path in code.

### 7.5 What is Lenis?
Lenis is a smooth scrolling library. It makes scroll feel buttery and controlled (like Apple's websites).

**How it affects Fable's work**: Lenis doesn't affect 3D scenes directly. Fable doesn't need to worry about it.

### 7.6 What is EmailJS?
A third-party service that sends emails directly from JavaScript without needing a backend server. Used for the contact form. Fable doesn't need to worry about this.

---

## PART 8: GLOSSARY

| Term | Definition |
|---|---|
| **GLB** | Binary 3D model file format used on the web (includes mesh, textures, animations) |
| **GLTF** | Text-based version of GLB (usually used for debugging; we use GLB for production) |
| **Three.js** | JavaScript 3D rendering library used to display GLB files in the browser |
| **WebGL** | Browser's built-in 3D graphics engine that Three.js uses internally |
| **GSAP** | JavaScript animation library (GreenSock) |
| **ScrollTrigger** | GSAP plugin that links animations to scroll position |
| **Lenis** | Smooth scroll library |
| **PBR** | Physically Based Rendering — a material system where surfaces behave like real-world materials |
| **Rigging** | Adding a skeleton to a 3D character so it can be animated |
| **Mixer** | Three.js object that manages and plays multiple animations on a single model |
| **Raycasting** | Math technique Three.js uses to detect which 3D object the mouse is hovering over |
| **Bloom / UnrealBloomPass** | Post-processing effect that makes bright objects glow |
| **FPS (in 3D context)** | Frames Per Second — how many times per second the 3D scene redraws. Target: 60 FPS |
| **LOD** | Level of Detail — using simpler 3D models at distance for performance |
| **Emissive** | A material property that makes a surface appear to glow/emit its own light |
| **Normal Map** | A texture that fakes surface detail (bumps, grooves) without adding geometry |
| **Poly count** | Number of triangles in a 3D mesh — fewer = better performance |
| **Backdrop-filter blur** | CSS property that blurs what's behind a glass element (glassmorphism) |
| **SPA** | Single Page Application — the website doesn't reload the browser page between sections |
| **PWA** | Progressive Web App — a website that can be installed like a native app |
| **Supabase** | Open-source Firebase alternative — provides database, auth, and real-time features |
| **n8n** | Open-source workflow automation tool (like Zapier but self-hosted) |
| **RPA** | Robotic Process Automation — software that mimics human actions on computers/websites |
| **RAG** | Retrieval-Augmented Generation — AI technique that retrieves relevant documents before generating an answer |
| **LLM** | Large Language Model — AI models like GPT-4, Llama, Gemini that understand and generate text |
| **JWT** | JSON Web Token — a secure way to verify a user's identity |
| **RBAC** | Role-Based Access Control — users see/do different things based on their role |
| **Agile** | Software development methodology using short sprints and iterative delivery |
| **WebSocket** | Technology that keeps a persistent connection between browser and server for real-time updates |
