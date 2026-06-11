/* Single source of truth — content sourced verbatim from details_to_know.md */

export const PERSONAL = {
  name: "SAUMOK KUNDU",
  firstName: "Saumok",
  email: "saumokkundu14814@gmail.com",
  phone: "+91 6289191484",
  location: "Kolkata, West Bengal, India",
  roles: [
    "IoT Developer",
    "AI/RPA Engineer",
    "Full-Stack Architect",
    "LLM Wrangler",
  ],
  tagline: "The Architect of Intelligence",
  education: {
    degree: "B.Tech CSE (AI-ML)",
    institution: "Sister Nivedita University, Kolkata",
    period: "2022 – 2026",
    cgpa: 7.86,
  },
  github: "https://github.com/Saumok",
  linkedin: "https://www.linkedin.com/in/saumok-kundu/",
  cv: "/Saumok_Kundu_Resume_Updated.pdf",
  bio: `I'm Saumok — an AI/ML architect from Kolkata who builds systems that think, automate, and ship. From offline crop-disease AI for farmers to autonomous B2B outreach engines that work while I sleep, I turn ambitious ideas into production software. Two simultaneous international internships at 20. Seven shipped projects. Always leveling up.`,
};

export interface Feature {
  icon: string; // lucide icon name key
  title: string;
  points: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  status: string;
  liveUrl: string | null;
  color: string;
  colorName: string;
  oneLiner: string;
  description: string;
  metrics: ProjectMetric[];
  techStack: string[];
  features: Feature[];
  doorSide: "left" | "right";
  doorZ: number;
  github: string;
}

export const PROJECTS: Project[] = [
  {
    id: "leadstiq",
    name: "LeadsTiq",
    category: "AI-Powered SaaS CRM",
    status: "LIVE",
    liveUrl: "https://leadstiq.vercel.app/",
    color: "#EF4444",
    colorName: "red",
    oneLiner:
      "An AI-powered, omnichannel CRM designed specifically for real estate agents and brokerages — automating the most time-consuming parts of real estate sales.",
    description:
      "LeadsTiq is a full SaaS product, not a demo. Agents record live calls in the browser; the platform transcribes them word-by-word, scores the lead's intent with Llama 3.3, and moves them through a real-time Kanban pipeline, while WhatsApp conversations are mined in the background for budgets, locations and timelines. Subscriptions, role-based access and GPS field tracking make it deployable to an agency on day one.",
    metrics: [
      { label: "AI PIPELINE", value: "Call → lead score, no manual entry" },
      { label: "LEAD SCORING", value: "Hot / Warm / Cold — automatic" },
      { label: "REALTIME SYNC", value: "Supabase WebSockets" },
      { label: "MONETIZATION", value: "3-tier Razorpay billing" },
    ],
    techStack: [
      "Next.js",
      "Python/Flask",
      "Supabase",
      "n8n",
      "Razorpay",
      "ElevenLabs Scribe",
      "Groq/Llama 3.3",
      "JWT",
      "RBAC",
    ],
    features: [
      {
        icon: "Mic",
        title: "AI Live Call Recording & Analysis",
        points: [
          "Agents record live browser calls OR upload pre-recorded audio",
          "ElevenLabs Scribe generates word-level transcripts (Groq Whisper as fallback)",
          "Llama 3.3 (via Groq) analyzes transcripts for lead sentiment and intent",
          "Automatically updates Lead Score: Hot / Warm / Cold — no manual data entry",
        ],
      },
      {
        icon: "MessageSquare",
        title: "Unified WhatsApp Inbox & AI Assistant",
        points: [
          "Full-screen WhatsApp-style inbox inside the CRM",
          "AI reads messages in background and extracts real estate data: budget, locations, timeline",
          "Extracted data auto-saved to Lead Insights panel",
          "AI auto-generates Smart Reply Suggestions in 3 tones: Professional, Friendly, Brief",
        ],
      },
      {
        icon: "Kanban",
        title: "Automated Lead Pipeline & Kanban Board",
        points: [
          "Drag-and-drop Kanban: New → Contacted → Visit Scheduled → Deal Closed",
          "Supabase WebSockets enable real-time sync: AI changes a lead's score → UI instantly updates everywhere",
          "n8n webhook endpoints for automated visit reminders and referral tracking",
        ],
      },
      {
        icon: "TrendingUp",
        title: "Agent Analytics & Field Tracking",
        points: [
          "Performance dashboard: conversions, reply rates, average response times",
          "GPS field tracking via browser location APIs for on-site property visits",
        ],
      },
      {
        icon: "CreditCard",
        title: "Subscription & Billing",
        points: [
          "Razorpay integration with 3 tiers: Basic, Premium, Elite",
          "Full SaaS monetization built in — can be sold to real estate agencies",
        ],
      },
    ],
    doorSide: "right",
    doorZ: 8,
    github: "https://github.com/Saumok",
  },
  {
    id: "krishivision",
    name: "KrishiVision",
    category: "AgriTech PWA",
    status: "LIVE",
    liveUrl: "https://krishivision.vercel.app/",
    color: "#10B981",
    colorName: "green",
    oneLiner:
      "A bilingual, offline-first AI agronomist for farmers — uses hybrid edge + cloud AI to diagnose crop diseases instantly, even without internet.",
    description:
      "An offline-first AI agronomist that fits in a farmer's pocket. A TensorFlow.js model diagnoses crop disease from a leaf photo entirely on-device — no signal required — then pairs the result with an expert-verified treatment plan from Supabase, so remedies are never hallucinated. Nine languages, a private scan history, and an OTP-secured P2P marketplace round out a genuinely deployable AgriTech product.",
    metrics: [
      { label: "ON-DEVICE AI", value: "100% offline inference" },
      { label: "LANGUAGES", value: "9, incl. Hindi & English" },
      { label: "REMEDIES", value: "Expert-verified, zero hallucination" },
      { label: "SECURITY", value: "Supabase RLS + OTP auth" },
    ],
    techStack: [
      "Next.js 14",
      "TensorFlow.js",
      "Gemini 2.5 Flash",
      "Supabase",
      "Tailwind CSS",
      "PWA Service Workers",
    ],
    features: [
      {
        icon: "Leaf",
        title: "Crop Disease Detection",
        points: [
          "Point camera at a crop leaf",
          "TensorFlow.js model runs classification ENTIRELY offline",
          "Returns disease name, confidence score, severity",
        ],
      },
      {
        icon: "ShieldCheck",
        title: "Expert-Verified Remedies",
        points: [
          "AI classification linked to Supabase database of expert-verified treatment plans",
          "Zero hallucination — remedies are database-backed, not AI-generated",
        ],
      },
      {
        icon: "Languages",
        title: "Multi-Language Support",
        points: [
          "Supports 9 languages including English and Hindi (bilingual primary)",
          "Designed for low-bandwidth, rural access",
        ],
      },
      {
        icon: "History",
        title: "Scan History Log",
        points: [
          "All scans stored privately in Supabase",
          "Farmer can track disease patterns over time on their land",
        ],
      },
      {
        icon: "Store",
        title: "P2P Marketplace",
        points: [
          "OTP-authenticated peer-to-peer marketplace",
          "Supabase Row Level Security (RLS) for data security",
          "Farmers can buy/sell products securely",
        ],
      },
    ],
    doorSide: "left",
    doorZ: 16,
    github: "https://github.com/Saumok",
  },
  {
    id: "cowrite",
    name: "Cowrite",
    category: "Real-Time Collaborative Workspace",
    status: "LIVE",
    liveUrl: "https://cowrite-chi.vercel.app/",
    color: "#8B5CF6",
    colorName: "purple",
    oneLiner:
      "A real-time collaborative note-taking and document workspace where multiple users edit simultaneously — with a built-in doodle pad.",
    description:
      "A real-time collaborative workspace where documents, cursors and doodles sync live across every connected editor. Socket.IO keeps text edits and cursor presence instantaneous, debounced auto-save makes data loss impossible, and an integrated doodle pad pins freehand sketches straight into the document. Role-based invitations separate editors from viewers.",
    metrics: [
      { label: "SYNC", value: "Instant via Socket.IO" },
      { label: "AUTOSAVE", value: "500ms debounce, zero loss" },
      { label: "ROLES", value: "Editor / Viewer invites" },
      { label: "CANVAS", value: "Doodle-to-document pinning" },
    ],
    techStack: [
      "Next.js",
      "Express.js",
      "Socket.IO",
      "Supabase (PostgreSQL)",
      "Glassmorphic UI",
    ],
    features: [
      {
        icon: "Users",
        title: "Live Collaboration",
        points: [
          "Multiple users edit the same document simultaneously",
          "Text edits and cursor positions sync instantaneously without page refresh",
          "Cursor presence shows which user is where in the document",
        ],
      },
      {
        icon: "UserCheck",
        title: "Role-Based Sharing",
        points: [
          "Invite collaborators via email",
          "Two permission levels: Editor (can edit), Viewer (read only)",
          "Secure invitation system",
        ],
      },
      {
        icon: "Pencil",
        title: "Integrated Doodle Pad",
        points: [
          "Built-in sketchbook inside the document workspace",
          "Draw freehand diagrams, sketches, annotations",
          "Pin doodles directly into the document as images",
        ],
      },
      {
        icon: "Save",
        title: "Auto-Save",
        points: [
          "Debounced auto-saving (saves after user stops typing for 500ms)",
          "No data loss — persistent storage in Supabase PostgreSQL",
          "No manual save button needed",
        ],
      },
      {
        icon: "Sparkles",
        title: "Premium UI",
        points: [
          "Glassmorphic card design with warm tones",
          "Tilt-card animations on hover",
          "Dynamic visual feedback throughout",
        ],
      },
    ],
    doorSide: "right",
    doorZ: 28,
    github: "https://github.com/Saumok",
  },
  {
    id: "likhitpens",
    name: "Likhit Pens",
    category: "Luxury E-Commerce — Freelance",
    status: "DELIVERED",
    liveUrl: null,
    color: "#F59E0B",
    colorName: "gold",
    oneLiner:
      "A cinematic, Awwwards-level luxury e-commerce website for a premium pen brand established in 1957 — built with pure HTML, CSS, and vanilla JavaScript.",
    description:
      "A cinematic e-commerce experience for a pen maker established in 1957 — built with zero frameworks. Pure HTML, CSS and vanilla JavaScript deliver 3D product cards, a live SVG engraving preview that renders your text on the pen as you type, an odometer-style cart, and a parallax heritage story. Proof that craft beats tooling.",
    metrics: [
      { label: "FRAMEWORKS", value: "0 — pure vanilla stack" },
      { label: "ENGRAVING", value: "Live SVG preview as you type" },
      { label: "HERITAGE", value: "Brand est. 1957" },
      { label: "CHECKOUT", value: "Multi-step with payment sim" },
    ],
    techStack: ["HTML5", "Vanilla CSS", "Vanilla JavaScript"],
    features: [
      {
        icon: "Box",
        title: "Cinematic 3D Product Cards",
        points: [
          "3D tilt effects on product cards",
          "Magnifying image zoom on hover",
          "Staggered page reveal animations on scroll",
        ],
      },
      {
        icon: "PenTool",
        title: "Live Pen Engraving Preview",
        points: [
          "SVG-based pen customization tool",
          "Users type their engraving text and see it preview on the pen in real-time",
          "Live visual update without page refresh",
        ],
      },
      {
        icon: "ShoppingCart",
        title: "Immersive Shopping Experience",
        points: [
          "Dynamic quantity odometer (number rolls up/down like a slot machine)",
          "Interactive shopping cart",
          "Smooth page transitions between product pages",
        ],
      },
      {
        icon: "CreditCard",
        title: "Multi-Step Checkout",
        points: [
          "Multi-step checkout flow with simulated payment processing overlay",
          "Progress indicator through checkout stages",
        ],
      },
      {
        icon: "BookOpen",
        title: "Brand Storytelling Pages",
        points: [
          "Parallax-driven 'About' page telling the brand's 1957 legacy",
          "Corporate page with parallax scroll animations",
          "Heritage color palette: ink black, parchment, gold",
        ],
      },
    ],
    doorSide: "left",
    doorZ: 36,
    github: "https://github.com/Saumok",
  },
  {
    id: "agenticbros",
    name: "The Agentic Bros",
    category: "AI Lead Generation System",
    status: "OPERATIONAL",
    liveUrl: null,
    color: "#64748B",
    colorName: "steel",
    oneLiner:
      "A zero-cost, autonomous B2B lead generation and cold outreach system — finds businesses, analyzes their weaknesses, writes personalized emails, and sends them automatically while you sleep.",
    description:
      "A fully autonomous B2B sales machine that costs nothing to run. Playwright hunts businesses on Google Maps, scrapes their sites, and files them into Google Sheets; Apps Script wakes every five minutes, has Gemini diagnose each website's weaknesses, scores the urgency, writes a personalized cold email and sends it from Gmail — with no human in the loop.",
    metrics: [
      { label: "RUNNING COST", value: "$0 / month" },
      { label: "CADENCE", value: "New leads every 5 min" },
      { label: "URGENCY SCORE", value: "0–100, AI-assigned" },
      { label: "HUMAN INPUT", value: "None — fully unattended" },
    ],
    techStack: [
      "Python",
      "Playwright",
      "Google Apps Script",
      "Gemini 2.0 Flash",
      "Groq Llama 3",
      "Google Sheets",
      "Gmail API",
    ],
    features: [
      {
        icon: "Radar",
        title: "The Local Discovery Engine",
        points: [
          "Hunts businesses on Google Maps by niche and city (Python + Playwright)",
          "Visits their websites automatically",
          "Extracts: email addresses, screenshots, page text",
          "Dumps all collected data into a central Google Sheet",
        ],
      },
      {
        icon: "Cloud",
        title: "The Cloud AI Engine",
        points: [
          "Google Apps Script runs 24/7 in cloud, costs $0",
          "Reads new leads from the Google Sheet every 5 minutes",
          "Feeds each lead's website data to Gemini 2.0 Flash or Groq Llama 3",
        ],
      },
      {
        icon: "Crosshair",
        title: "AI Weakness Analysis",
        points: [
          "AI analyzes the website for weaknesses: no online booking, broken mobile views, slow load times, missing trust signals",
          "AI assigns an Urgency Score (0–100) based on how badly the site needs work",
        ],
      },
      {
        icon: "Mail",
        title: "Autonomous Outreach",
        points: [
          "AI drafts a highly personalized cold email calling out their specific flaws",
          "Google Apps Script sends the email directly from Gmail — automatically",
          "A fully autonomous B2B sales machine — completely unattended",
        ],
      },
    ],
    doorSide: "right",
    doorZ: 48,
    github: "https://github.com/Saumok",
  },
  {
    id: "yaatraexpress",
    name: "YaatraExpress",
    category: "Adventure Tourism — Freelance",
    status: "DELIVERED",
    liveUrl: "https://yaatraexpress.com",
    color: "#0EA5E9",
    colorName: "ocean",
    oneLiner:
      "An Awwwards-level adventure tourism website redesign — Apple-style scroll-driven video scrubbing, cinematic trek showcases, GSAP animations, and premium glassmorphism.",
    description:
      "An Awwwards-grade redesign for an adventure tourism brand. The hero scrubs through 100 FFmpeg-extracted video frames as you scroll — the Apple technique — before a GSAP-pinned horizontal showcase walks you through five treks with glass stat cards and WhatsApp booking. Includes real performance engineering: a Lenis double-tick bug, found and fixed.",
    metrics: [
      { label: "SCROLL VIDEO", value: "100 frames, canvas-scrubbed" },
      { label: "TREKS", value: "5 cinematic showcases" },
      { label: "MOTION", value: "GSAP ScrollTrigger + Lenis" },
      { label: "STATUS", value: "Delivered to client" },
    ],
    techStack: ["HTML", "CSS", "JavaScript", "GSAP 3", "Lenis", "FFmpeg", "Lucide Icons"],
    features: [
      {
        icon: "Film",
        title: "Apple-Style Scroll Video Scrubbing",
        points: [
          "A hero video was converted to 100 JPEG frames using FFmpeg",
          "Frames are pre-loaded into JavaScript arrays",
          "As user scrolls, the canvas draws the corresponding frame — video-from-scroll effect",
          "3 phases of content animate in from different directions at different scroll depths",
        ],
      },
      {
        icon: "Mountain",
        title: "Horizontal Trek Showcase (GSAP Pinned)",
        points: [
          "A GSAP ScrollTrigger-pinned horizontal scroll section",
          "Showcases all 5 available trek packages with cinematic detail",
          "Each trek: full-width images, 6 stat highlights, glass stat cards, pricing, WhatsApp booking CTA",
        ],
      },
      {
        icon: "Zap",
        title: "Premium Animation System",
        points: [
          "GSAP ScrollTrigger + Lenis smooth scroll throughout",
          "Targeted animations at 25%, 50%, 75%, 100% scroll depth per section",
          "Fixed a Lenis double-tick bug and scroll-behavior conflict (performance engineering)",
        ],
      },
      {
        icon: "Images",
        title: "Gallery & Social Proof",
        points: [
          "Dual-row infinite marquee gallery of trek photos",
          "Glassmorphism stat cards (km trekked, travelers, years operating)",
          "Testimonials section with cinematic poster trek cards",
        ],
      },
      {
        icon: "LayoutGrid",
        title: "Complete UI Overhaul",
        points: [
          "FAQ accordion with smooth animations",
          "Full footer redesign",
          "Mobile-responsive throughout",
        ],
      },
    ],
    doorSide: "left",
    doorZ: 60,
    github: "https://github.com/Saumok",
  },
  {
    id: "socialpilot",
    name: "SocialPilot",
    category: "AI Automation Platform",
    status: "DEPLOYED",
    liveUrl: null,
    color: "#F97316",
    colorName: "orange",
    oneLiner:
      "An AI-driven social media automation platform that autonomously handles posting, analytics, and engagement across multiple platforms.",
    description:
      "An AI social-media operator that plans, writes and posts on its own. OpenAI generates platform-optimized captions and hashtags per network, a FastAPI backend schedules cross-platform publishing, and engagement automation triages comments and DMs so only the conversations that actually need a human reach one.",
    metrics: [
      { label: "PLATFORMS", value: "X · Instagram · LinkedIn" },
      { label: "CONTENT", value: "AI-tuned per platform" },
      { label: "ANALYTICS", value: "One unified dashboard" },
      { label: "TRIAGE", value: "AI-prioritized replies" },
    ],
    techStack: ["FastAPI", "React", "OpenAI API"],
    features: [
      {
        icon: "Send",
        title: "Automated Cross-Platform Posting",
        points: [
          "Schedule and auto-post content across multiple social media platforms",
          "AI generates post content based on brief or topic input",
        ],
      },
      {
        icon: "Wand2",
        title: "AI Content Generation",
        points: [
          "OpenAI API generates platform-optimized captions, hashtags, content variations",
          "Adapts tone and length for each platform (Twitter/X, Instagram, LinkedIn)",
        ],
      },
      {
        icon: "BarChart3",
        title: "Analytics Dashboard",
        points: [
          "Track engagement metrics across all connected platforms",
          "Unified analytics view without switching between platform apps",
        ],
      },
      {
        icon: "Bot",
        title: "Engagement Automation",
        points: [
          "Automated response suggestions for comments and DMs",
          "AI prioritizes which interactions need human attention",
        ],
      },
    ],
    doorSide: "right",
    doorZ: 72,
    github: "https://github.com/Saumok",
  },
];

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  flag: string;
  type: string;
  duration: string;
  rating?: string;
  achievements: string[];
  tech: string[];
  significance: string;
  arcColor: string;
}

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-china",
    role: "IoT Developer",
    company: "Sichuan Vocational College of Information Technologies",
    location: "Chengdu, Sichuan, China",
    flag: "CN",
    type: "Internship / Remote Collaboration",
    duration: "April 2025 – June 2025",
    achievements: [
      "Engineered Python pipelines for real-time sensor data, achieving 100% consistency for automation workflows",
      "Optimized system reliability through automated data validation and API testing workflows",
      "Worked with sensor integration and IoT data collection/preprocessing",
    ],
    tech: ["Python", "NumPy", "Sensor Integration APIs", "Automated Testing"],
    significance:
      "International collaboration with a Chinese institution while in India — remote work capability and cross-cultural professional experience at age 20.",
    arcColor: "#EF4444",
  },
  {
    id: "exp-australia",
    role: "AI/RPA Developer",
    company: "Employability.life (Federation University Australia)",
    location: "Australia (Remote)",
    flag: "AU",
    type: "Project-based collaboration / Internship",
    duration: "April 2025 – June 2025",
    rating: "3.2 / 4.0",
    achievements: [
      "Delivered 6 Agile-based RPA projects — including Excel automation and Email automation pipelines",
      "Developed an AI-enabled intelligent RPA system for automated supplier invoice processing",
      "Operated within Agile sprint methodology",
    ],
    tech: ["RPA Tools", "Python", "Excel Automation", "Email Automation", "AI Document Processing"],
    significance:
      "Two international experiences simultaneously at age 20. Rated 3.2/4 professionally at a university-affiliated program.",
    arcColor: "#F59E0B",
  },
];

export interface Skill {
  name: string;
  years: number;
  proficiency: number;
  cluster: SkillCluster;
}

export type SkillCluster =
  | "Programming"
  | "AI/ML"
  | "Web/Full-Stack"
  | "Data"
  | "Automation/IoT"
  | "Cloud/Tools";

export const CLUSTER_COLORS: Record<SkillCluster, string> = {
  Programming: "#8B5CF6",
  "AI/ML": "#7C3AED",
  "Web/Full-Stack": "#06B6D4",
  Data: "#10B981",
  "Automation/IoT": "#F59E0B",
  "Cloud/Tools": "#64748B",
};

export const SKILLS: Skill[] = [
  { name: "Python", years: 4, proficiency: 90, cluster: "Programming" },
  { name: "C", years: 3, proficiency: 70, cluster: "Programming" },
  { name: "C++", years: 3, proficiency: 65, cluster: "Programming" },
  { name: "Java", years: 2, proficiency: 60, cluster: "Programming" },
  { name: "Machine Learning", years: 3, proficiency: 85, cluster: "AI/ML" },
  { name: "LLMs", years: 2, proficiency: 88, cluster: "AI/ML" },
  { name: "Fine-Tuning & Prompt Engineering", years: 2, proficiency: 85, cluster: "AI/ML" },
  { name: "RAG", years: 1.5, proficiency: 82, cluster: "AI/ML" },
  { name: "LangChain", years: 1.5, proficiency: 78, cluster: "AI/ML" },
  { name: "AutoGPT / Agentic AI", years: 1, proficiency: 75, cluster: "AI/ML" },
  { name: "TensorFlow.js", years: 1, proficiency: 70, cluster: "AI/ML" },
  { name: "Scikit-learn", years: 3, proficiency: 82, cluster: "AI/ML" },
  { name: "NumPy", years: 3, proficiency: 88, cluster: "AI/ML" },
  { name: "pandas", years: 3, proficiency: 85, cluster: "AI/ML" },
  { name: "Gemini API", years: 1, proficiency: 80, cluster: "AI/ML" },
  { name: "Groq API", years: 1, proficiency: 78, cluster: "AI/ML" },
  { name: "OpenAI API", years: 1.5, proficiency: 78, cluster: "AI/ML" },
  { name: "Next.js", years: 2, proficiency: 85, cluster: "Web/Full-Stack" },
  { name: "React", years: 2.5, proficiency: 83, cluster: "Web/Full-Stack" },
  { name: "FastAPI", years: 2, proficiency: 80, cluster: "Web/Full-Stack" },
  { name: "Flask", years: 2, proficiency: 80, cluster: "Web/Full-Stack" },
  { name: "HTML/CSS/JS", years: 4, proficiency: 92, cluster: "Web/Full-Stack" },
  { name: "Tailwind CSS", years: 2, proficiency: 84, cluster: "Web/Full-Stack" },
  { name: "GSAP", years: 1.5, proficiency: 80, cluster: "Web/Full-Stack" },
  { name: "Three.js", years: 1, proficiency: 72, cluster: "Web/Full-Stack" },
  { name: "Socket.IO", years: 1, proficiency: 74, cluster: "Web/Full-Stack" },
  { name: "Express.js", years: 1.5, proficiency: 76, cluster: "Web/Full-Stack" },
  { name: "PWA / Service Workers", years: 1, proficiency: 70, cluster: "Web/Full-Stack" },
  { name: "SQL", years: 3, proficiency: 80, cluster: "Data" },
  { name: "Excel (Advanced)", years: 3, proficiency: 75, cluster: "Data" },
  { name: "Data Cleaning", years: 3, proficiency: 82, cluster: "Data" },
  { name: "Feature Engineering", years: 2.5, proficiency: 78, cluster: "Data" },
  { name: "Outlier Detection", years: 2, proficiency: 75, cluster: "Data" },
  { name: "RPA", years: 1.5, proficiency: 78, cluster: "Automation/IoT" },
  { name: "API Testing", years: 2.5, proficiency: 80, cluster: "Automation/IoT" },
  { name: "Sensor Integration", years: 1, proficiency: 72, cluster: "Automation/IoT" },
  { name: "IoT Data Collection", years: 1, proficiency: 70, cluster: "Automation/IoT" },
  { name: "Playwright", years: 1, proficiency: 75, cluster: "Automation/IoT" },
  { name: "Google Apps Script", years: 1, proficiency: 72, cluster: "Automation/IoT" },
  { name: "Git / GitHub", years: 4, proficiency: 88, cluster: "Cloud/Tools" },
  { name: "AWS", years: 1.5, proficiency: 65, cluster: "Cloud/Tools" },
  { name: "Postman", years: 2.5, proficiency: 82, cluster: "Cloud/Tools" },
  { name: "Supabase", years: 2, proficiency: 85, cluster: "Cloud/Tools" },
  { name: "n8n", years: 1, proficiency: 72, cluster: "Cloud/Tools" },
  { name: "JWT / RBAC", years: 1.5, proficiency: 75, cluster: "Cloud/Tools" },
];

/* Constellation connections — details_to_know.md §4.2 */
export const SKILL_CONNECTIONS: [string, string][] = [
  ["Python", "NumPy"],
  ["NumPy", "pandas"],
  ["pandas", "Scikit-learn"],
  ["Scikit-learn", "Machine Learning"],
  ["LLMs", "LangChain"],
  ["LangChain", "RAG"],
  ["RAG", "Fine-Tuning & Prompt Engineering"],
  ["Fine-Tuning & Prompt Engineering", "AutoGPT / Agentic AI"],
  ["Python", "FastAPI"],
  ["FastAPI", "Flask"],
  ["Next.js", "React"],
  ["Supabase", "SQL"],
  ["TensorFlow.js", "Machine Learning"],
  ["n8n", "RPA"],
  ["RPA", "API Testing"],
  ["IoT Data Collection", "Sensor Integration"],
  ["Sensor Integration", "Python"],
  ["AWS", "Supabase"],
  ["Supabase", "Git / GitHub"],
  ["LLMs", "Gemini API"],
  ["LLMs", "Groq API"],
  ["LLMs", "OpenAI API"],
  ["Next.js", "Tailwind CSS"],
  ["HTML/CSS/JS", "GSAP"],
  ["GSAP", "Three.js"],
  ["Socket.IO", "Express.js"],
  ["Express.js", "React"],
  ["Next.js", "PWA / Service Workers"],
  ["Google Apps Script", "RPA"],
  ["Playwright", "Google Apps Script"],
];

/* Which projects used which skills (derived from project tech stacks) */
export const SKILL_PROJECTS: Record<string, string[]> = {
  Python: ["LeadsTiq", "The Agentic Bros", "SocialPilot"],
  "Next.js": ["LeadsTiq", "KrishiVision", "Cowrite"],
  React: ["SocialPilot", "Cowrite"],
  Supabase: ["LeadsTiq", "KrishiVision", "Cowrite"],
  "TensorFlow.js": ["KrishiVision"],
  LLMs: ["LeadsTiq", "The Agentic Bros"],
  RAG: ["LeadsTiq"],
  FastAPI: ["SocialPilot"],
  Flask: ["LeadsTiq"],
  "HTML/CSS/JS": ["Likhit Pens", "YaatraExpress"],
  Playwright: ["The Agentic Bros"],
  n8n: ["LeadsTiq"],
  RPA: ["The Agentic Bros"],
  "JWT / RBAC": ["LeadsTiq"],
  "Gemini API": ["KrishiVision", "The Agentic Bros"],
  "Groq API": ["LeadsTiq", "The Agentic Bros"],
  "OpenAI API": ["SocialPilot"],
  "Tailwind CSS": ["KrishiVision", "This Portfolio"],
  GSAP: ["YaatraExpress", "This Portfolio"],
  "Three.js": ["This Portfolio"],
  "Socket.IO": ["Cowrite"],
  "Express.js": ["Cowrite"],
  "PWA / Service Workers": ["KrishiVision"],
  "Google Apps Script": ["The Agentic Bros"],
};

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  platform: string;
  rarity: "LEGENDARY" | "EPIC";
  xp: number;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "ibm-rag",
    name: "IBM RAG and Agentic AI Professional Certificate",
    issuer: "IBM",
    date: "July 2025",
    platform: "Coursera",
    rarity: "LEGENDARY",
    xp: 6000,
  },
  {
    id: "umich-ml",
    name: "Applied Machine Learning in Python",
    issuer: "University of Michigan",
    date: "June 2025",
    platform: "Coursera",
    rarity: "EPIC",
    xp: 4500,
  },
];

/* ── Gamification — details_to_know.md §6 (verbatim) ── */

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export const TRIVIA: TriviaQuestion[] = [
  {
    question:
      "What AI model powers LeadsTiq's live call analysis to score leads as Hot, Warm, or Cold?",
    options: ["GPT-4o", "Llama 3.3 via Groq", "Gemini 2.5 Flash", "Claude Sonnet"],
    correctIndex: 1,
  },
  {
    question:
      "KrishiVision works 100% offline because it uses which technology to run AI in the browser?",
    options: ["PyTorch", "ONNX Runtime", "TensorFlow.js", "WebAssembly ML"],
    correctIndex: 2,
  },
  {
    question:
      "The Agentic Bros system uses Google Apps Script running in the cloud to do what — automatically?",
    options: [
      "Build websites for clients",
      "Train machine learning models",
      "Find leads, analyze their websites, and send personalized cold emails",
      "Generate social media content",
    ],
    correctIndex: 2,
  },
];

export const CODE_PUZZLE = {
  broken: `// BUG: Find the error in this async function
async function fetchLeadScore(leadId) {
  try {
    const response = await fetch(\`/api/leads/\${leadId}\`);

    if (response.ok) {
      const data = await response.json();
      return data.score;
    }
      return null;
  } catch (error) {
    console.error('Failed to fetch lead:', error);

  }
}`,
  // The two bug lines (0-indexed within the snippet above)
  bugLines: [10, 13],
  explanation:
    "Bug 1: `return null` is reached on every non-ok path but sits floating outside an else block. Bug 2: the catch block is missing a return — the function silently returns undefined on error.",
};

export const ARIA_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ["skill", "best at", "strongest"],
    response:
      "Saumok's deepest skills are in Python, LLMs, and RAG pipelines. He's built production systems using Groq, LangChain, and TensorFlow.js. His IBM certification in Agentic AI reflects his specialization.",
  },
  {
    keywords: ["experience", "work", "internship", "job"],
    response:
      "He's completed two simultaneous international internships — one as an IoT Developer for a Chinese university, and one as an AI/RPA Developer rated 3.2/4 for Federation University, Australia. Both were in early 2025.",
  },
  {
    keywords: ["project", "built", "portfolio"],
    response:
      "Saumok has shipped 7 live projects: LeadsTiq (AI CRM), KrishiVision (AgriTech PWA), Cowrite (real-time collab), Likhit Pens (luxury e-comm), Agentic Bros (B2B outreach engine), YaatraExpress (tourism site), and SocialPilot (AI social media manager).",
  },
  {
    keywords: ["available", "hire", "join", "open"],
    response:
      "Yes! Saumok is actively open to full-time roles, internships, and freelance projects. He's based in Kolkata, India, and is open to remote or relocation opportunities.",
  },
  {
    keywords: ["contact", "email", "reach"],
    response:
      "You can reach Saumok at saumokkundu14814@gmail.com or connect on LinkedIn. Alternatively, complete this challenge to unlock the direct contact form — it's more fun.",
  },
  {
    keywords: ["llm", "ai", "machine learning", "rag"],
    response:
      "LLMs and RAG systems are his specialty. He's built production RAG pipelines (LeadsTiq), used TensorFlow.js for edge AI (KrishiVision), and holds an IBM certification specifically in RAG and Agentic AI.",
  },
  {
    keywords: ["hello", "hi", "hey"],
    response:
      "Hello, recruiter. I'm ARIA — Saumok's AI assistant. Ask me anything about his skills, projects, or availability.",
  },
];

export const ARIA_DEFAULT =
  "That's an interesting question. For detailed technical discussions, I'd recommend reaching out to Saumok directly. He loves talking about his work. Complete the challenge to unlock his contact info.";

export const BOOT_LINES = [
  "INITIALIZING SAUMOK.OS v2.6.1 ...",
  "MOUNTING /dev/intelligence ............ OK",
  "LOADING NEURAL MODULES ................ OK",
  "CALIBRATING CREATIVITY DRIVERS ........ OK",
  "IDENTITY KERNEL FOUND: SAUMOK KUNDU",
  "CLEARANCE LEVEL: ARCHITECT",
  "SYSTEM READY",
];

export const STATS = [
  { label: "CGPA", value: 7.86, decimals: 2 },
  { label: "Projects Shipped", value: 7, decimals: 0 },
  { label: "Certifications", value: 2, decimals: 0 },
  { label: "Countries Worked With", value: 3, decimals: 0 },
];

export const GLOBE_PINS = [
  { name: "Kolkata", lat: 22.5, lon: 88.4, color: "#7C3AED", label: "HOME BASE" },
  { name: "Chengdu", lat: 30.7, lon: 104.1, color: "#EF4444", label: "IoT MISSION" },
  { name: "Melbourne", lat: -37.8, lon: 145.0, color: "#F59E0B", label: "AI/RPA MISSION" },
];
