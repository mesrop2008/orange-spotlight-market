# Orange Spotlight Market

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

## Features

**Browsing.** Eight categories — electronics, cars, real estate, clothing, furniture, jobs,
services and animals — each with subcategories. 24 seeded listings. Skeleton cards cover the
simulated load delay on first paint.

**Filtering.** Price range, condition (new / used), city, and sorting by newest, price ascending,
price descending, or view count. Filters are shared between the search and category pages.

**Favourites.** Toggle from a listing card or its detail page; `/favorites` lists them.

**Messaging.** Contacting a seller opens or reuses a conversation tied to that listing, so a thread
always has an item attached to it. Unread counts are tracked per user.

**Posting.** The post-ad form prepends to the listing collection, so a new ad shows up on the home
page and in its category immediately.

## Layout

```
src/
  components/       CategoryBar, FiltersSidebar, ListingCard, Navbar
    ui/             shadcn/ui primitives
  contexts/
    AppContext      listings, favourites, conversations
    AuthContext     current user, login, register
  data/             seed data and the shared types
  hooks/
  pages/            one component per route
  lib/
```

`src/data/types.ts` is the contract the rest of the app is written against — `Listing`, `User`,
`Message`, `Conversation`, `Review`, `Category`. When a real API arrives, those interfaces are what
the responses have to satisfy, and the two contexts are the only places that would need to change.


