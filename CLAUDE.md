# Otto's Personal Portfolio Website

## Overview
This is an ongoing personal website/portfolio project. There is no fixed scope — features and content will be added incrementally over time.

## Tech Stack
- **Framework:** React (JavaScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **Package Manager:** npm
- **Icons:** Inline SVGs from iconbuddy.com (streamline-ultimate set)

## Project Structure
```
ottomaportfolio/
├── index.html            # Entry HTML (loads Google Fonts, favicon, title "Otto's Home")
├── vite.config.js        # Vite config (React + Tailwind plugins)
├── package.json
├── .gitignore
├── src/
│   ├── main.jsx          # React entry point
│   ├── App.jsx           # Root component (nav bar, footer, all page content)
│   ├── App.css           # Component styles (currently empty)
│   ├── index.css          # Tailwind entry + global bg color (#0a0a0a)
│   └── assets/           # Static assets (images, SVGs, etc.)
└── public/               # Static files (favicon 小小猪.png, SVG icons)
```

## Current State
- **Nav bar (top, fixed):** Left: "OTTO'S" in Fredoka font with gold glow effect. Center: "Welcome." in Quicksand font. Right: "Navigation" dropdown with About/Projects/Contact placeholders. Gold glow shadow on bottom edge. Semi-transparent dark background with blur.
- **Footer (bottom, fixed):** Left: copyright "© 2026 Otto Ma". Right: 6 social icons (Instagram, GitHub, Bilibili, Email, WeChat, Phone) with hover scale+brighten effect.
- **Background:** Dark theme with linear gradient (#0a0a0a → #1a1508 → #0d0b04) + two ambient gold glow orbs (top-right, bottom-left). html/body bg set to #0a0a0a to prevent white flash on overscroll.
- **Placeholder content:** 6 lorem ipsum sections for scroll testing (to be replaced with real content).
- Dev server runs on `http://localhost:5173/`

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build

## Design / Style Guide
- **Fonts:** Fredoka (logo/brand), Quicksand (body/UI) — loaded via Google Fonts
- **Color scheme:** Dark background with gold/yellow accents
- **Text colors:** gray-300 for general text, hover to gray-200
- **Icon source:** iconbuddy.com streamline-ultimate (bold, filled style)
- **Favicon:** 小小猪.png

## Next Steps
- Replace placeholder sections with real page content
- Install react-router-dom for page navigation (About, Projects, Contact)
- Add actual links to social media icons
- Define and build out individual pages

## Deployment
_(to be configured)_