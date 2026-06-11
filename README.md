# SAUMOK.OS — The Architect of Intelligence

Cinematic interactive portfolio for Saumok Kundu. Next.js 16 + Three.js + Lenis.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## The experience

| Chapter | What happens |
|---|---|
| Boot | Terminal boot sequence (once per session, any key skips) |
| Hero | Holographic character projection, orbit rings, 2000-particle field, bloom. Click the hologram. |
| About | Dossier with character reference render, expanding intel cards, animated stats, rotating data globe |
| Skills | Interactive constellation map — hover stars, click for dossiers, category filters, challenge terminal |
| Experience | Classified transmissions that decrypt on scroll + transmission arcs Kolkata⇄Chengdu/Melbourne |
| Projects | Scroll-driven first-person 3D corridor, 7 glowing doors → each opens a full **Hacker OS** (draggable windows, working terminal — type `./launch_demo`) |
| Certifications | Achievement-unlock toasts with XP ticker |
| Access Terminal | 3-stage gamified lock: trivia → debug puzzle → ARIA chatbot (skip link for recruiters) |
| Contact | Dead-drop terminal → EmailJS (mailto fallback until env vars set) |

Mobile (<768px/1024px) swaps WebGL scenes for CSS-animated equivalents and a swipeable project deck.

## Remaining content hookups

- [ ] `.env.local` from `.env.example` — EmailJS keys (form currently falls back to mailto)
- [ ] Real GitHub repo URLs per project — `src/lib/data.ts` (`github` fields)
- [ ] Real LinkedIn URL — `src/lib/data.ts` (`PERSONAL.linkedin`)
- [ ] CV PDF — drop in `public/cv.pdf` and point the Download CV buttons at it (currently mailto request)
- [ ] Credential verification URLs — `src/lib/data.ts` certifications
- [ ] Live URLs for Likhit Pens / SocialPilot when available

## Verification

```bash
node scripts/verify.mjs         # desktop walkthrough, screenshots → verify-shots/
node scripts/verify-mobile.mjs  # 375px pass
```

Requires the prod server on port 3100 (`npx next start -p 3100`) and Edge installed.
