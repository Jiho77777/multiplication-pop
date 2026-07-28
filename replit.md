# Multiplication Pop! (구구단 챌린지)

A Korean multiplication quiz app with a slot-machine-style roulette, points system, and unlockable skins.

## Stack

- **Framework**: React 19 + TanStack Start (SSR)
- **Routing**: TanStack Router (file-based)
- **Styling**: Tailwind CSS v4 + Radix UI
- **Build**: Vite 8 via `@lovable.dev/vite-tanstack-config`
- **Package manager**: Bun

## How to run

```sh
bun run dev
```

Runs on **port 5000**. The workflow `Start application` is configured to start this automatically.

## Project structure

- `src/routes/` — file-based routes (`index.tsx` = main quiz, `shop.tsx` = skin shop)
- `src/lib/` — shared utilities (skins, error handling)
- `src/components/` — UI components (shadcn/ui)
- `vite.config.ts` — Vite config (port 5000, host: true for Replit preview)

## User preferences

<!-- Add preferences here as needed -->
