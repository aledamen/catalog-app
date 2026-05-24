# AGENTS.md

## Project
Next.js 15 product catalog with Tailwind CSS 3 and Zustand state management. Deployed to Vercel.

## Commands
- `npm run dev` — Start Next.js dev server
- `npm run build` — Production build (`next build`)
- `npm run lint` — Run Next.js lint (`next lint`)
- No test suite configured (no test scripts or dependencies)

## Configuration
### TypeScript
- `@/*` path alias maps to project root (`./*`)
- Strict mode enabled, `allowJs: false`, `noEmit`, `jsx: preserve`
- Target: ES2017, module: esnext, moduleResolution: bundler

### Tailwind CSS
- Custom colors: `ink` (#0A0A0A), `carbon` (#171717), `graphite` (#262626), `line` (#E5E5E5), `mist` (#F5F5F5), `accent` (#2CC8E0), `accent-deep` (#169FB6)
- Custom `panel` box shadow, `hero-grid` background image
- Content paths: `./app/**/*`, `./components/**/*`, `./lib/**/*`

### Next.js
- Enables AVIF and WebP image formats (`next.config.mjs`)
- App router (entrypoints in `app/`)

### Vercel
- No mandatory environment variables
- Framework auto-detected as Next.js (`vercel.json`)

## Structure
- `app/` — App router: layout, pages, global styles
- `components/` — Reusable React TSX components
- `lib/` — Utilities, Zustand cart store (`cart-store.ts`), product data (`products.ts`, `products.json`)
- `public/` — Static assets (product images, brand assets)
