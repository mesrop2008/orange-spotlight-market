⁹# Orange Spotlight Market

A classifieds marketplace frontend in the style of OLX or Avito. Browse listings across eight
categories, filter and sort them, save favourites, message a seller about an item, and post an ad
of your own.

**Frontend only.** There is no backend and no database. Listings, users and conversations are
TypeScript files in `src/data`, loaded into React context at startup. Everything you do in the app
is real state — it just lives in memory, so a page refresh resets it. The project is a UI build:
layout, component structure, routing and interaction, not persistence.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | React 18 + TypeScript |
| Build | Vite 5 (SWC) |
| Styling | Tailwind CSS |
| Components | shadcn/ui (Radix primitives) |
| Icons | lucide-react |
| Routing | React Router 6 |
| Server state | TanStack Query |
| Forms | React Hook Form + Zod |
| Animation | Framer Motion |
| Unit tests | Vitest + Testing Library (jsdom) |

## Running it

Node 18+. Either package manager works — there is a `bun.lock` and a `package-lock.json`.

```
npm install
npm run dev
```

Open **http://localhost:8080** (Vite is configured for 8080, not the usual 5173).

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest, single run |
| `npm run test:watch` | Vitest in watch mode |

## Signing in

The app starts already signed in as the first seeded user, so you can reach every route without
touching the login page. To sign in as someone else, any seeded account works:

```
alex@example.com  / password123
maria@example.com / password123
```

Registering creates a user and signs you in, but the account only exists until reload.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — hero search, category grid, recent listings |
| `/search?q=` | Search results with the filter sidebar |
| `/category/:id` | One category, same filters |
| `/listing/:id` | Listing detail, seller card, contact button |
| `/post` | Post a new ad |
| `/favorites` | Saved listings |
| `/chat`, `/chat/:convId` | Conversation list and thread |
| `/profile` | Profile, own listings, avatar |
| `/login`, `/register` | Auth |

