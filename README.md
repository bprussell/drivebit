# DriveBit

A retro game-themed PWA for teen drivers to log supervised driving hours and track progress toward state permit requirements. Makes the boring part of learning to drive actually fun.

## What It Does

- **Onboarding** — Enter your name and set hour targets (overall + nighttime)
- **Dashboard** — Pixel art progress bars with car sprites that advance as you log drives
- **Drive Logging** — Log day and night minutes with a custom retro datepicker
- **History** — View, edit, and delete past drives
- **Achievements** — 16 unlockable achievements (4x4 grid) with animated popups
- **Report** — Aggregated driving hours by date, formatted for state form entry

## Setup

```bash
git clone https://github.com/bprussell/drivebit.git
cd drivebit
npm install
npm run dev
```

Requires **Node.js 18+**.

Open [http://localhost:3000](http://localhost:3000) in your browser. Works best at mobile width — try Chrome DevTools device toolbar at 375px.

## PWA

DriveBit is installable as a Progressive Web App. On Chrome, look for the install icon in the address bar. All data is stored in localStorage — no account or backend required.

## Built With

- [SolidJS](https://docs.solidjs.com/) — reactive UI framework
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [UnoCSS](https://unocss.dev/) — on-demand utility CSS
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) — progressive web app support
- [Vite](https://vitejs.dev/) — build tool
