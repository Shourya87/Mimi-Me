# Mini & Me — Premium E-commerce Storefront

Mini & Me is a premium, production-ready e-commerce storefront for baby and mother essentials. Built with React 19, TanStack Start (SSR), TanStack Router, Tailwind CSS, and Supabase.

## Features

- **Storefront & Product Catalog**: Beautiful, responsive collection layouts and detailed product pages with variants.
- **State Management**: Zustand-powered shopping cart and wishlist that persists across browser sessions.
- **Authentication**: Fully functional client-side user sessions, login, signup, password resets, and user profile management powered by Supabase Auth.
- **Database Persistence**: Secure Supabase PostgreSQL database schemas containing user profiles, newsletter subscribers, contact form queries, and order records.
- **Checkout & Order Processing**: Real-time order placement with support for guest checkouts, order snapshot history, and order tracking timelines.
- **Server Functions**: Secure, server-side data fetching and administration using TanStack Start's `createServerFn` and Supabase Admin API.
- **SEO Ready**: Page title tags, meta descriptions, OpenGraph headers, canonical URLs, and structured JSON-LD schemas automatically rendered for search engines.

---

## Technology Stack

- **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (SSR & Server Functions) + [TanStack Router](https://tanstack.com/router/v1/docs/guide/introduction) (Type-safe routing)
- **Library**: [React 19](https://react.dev)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) & [Shadcn UI](https://ui.shadcn.com)
- **Database & Auth**: [Supabase](https://supabase.com) (Auth, PostgreSQL, Row Level Security)
- **State**: [Zustand](https://github.com/pmndrs/zustand)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
- **Icons**: [Lucide React](https://lucide.dev)

---

## Getting Started

### 1. Prerequisites
You will need [Bun](https://bun.sh) (recommended) or Node.js installed on your machine.

### 2. Configure Environment Variables
Copy `.env.example` to a new file named `.env`:
```bash
cp .env.example .env
```
Fill in your Supabase Project ID, URL, and Public keys. For server functions to run successfully, populate `SUPABASE_SERVICE_ROLE_KEY` with the secret key found under `Supabase Dashboard -> Settings -> API -> service_role`.

### 3. Install Dependencies
Install all package dependencies:
```bash
bun install
# or
npm install
```

### 4. Apply Database Migrations
Run the SQL queries in `supabase/migrations/001_initial_schema.sql` in the **SQL Editor** of your Supabase project dashboard to set up tables, triggers, indexes, and Row Level Security (RLS) policies.

### 5. Run the Application locally
Start the local development server:
```bash
bun run dev
# or
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## Directory Structure

```text
├── src/
│   ├── components/      # UI components (Layout, Shop, Marketing, Shadcn UI)
│   ├── hooks/           # Custom React hooks (useAuth, etc.)
│   ├── integrations/    # Supabase Client and Database schemas & types
│   ├── lib/             # API handlers, server functions, stores, utilities
│   │   ├── api/         # Server functions (orders, profile, newsletter, contact)
│   │   ├── data/        # Seed data (products list)
│   │   ├── store/       # Zustand stores (cart, wishlist)
│   │   └── utils.ts     # Global utilities
│   ├── routes/          # File-system router pages (TanStack Router)
│   ├── router.tsx       # Router configuration
│   ├── server.ts        # Server wrapper
│   └── main.tsx        # Client entry point
├── supabase/
│   └── migrations/      # PostgreSQL migrations & DB initialization scripts
├── package.json         # Scripts and package configurations
└── vercel.json          # Deployment configurations
```

---

## Database Schema Overview

The database contains 4 main tables:
1. `profiles`: Extends Supabase auth.users to store user details (full name, phone, address). Synchronized via a PostgreSQL trigger.
2. `orders`: Store placed orders (items, billing subtotal, status: `'confirmed' | 'packed' | 'shipped' | 'delivered'`, shipping info, payment type).
3. `newsletter_subs`: Tracks emails registered via the home page/newsletter subscription components.
4. `contact_messages`: Captures visitor names, emails, subjects, and text messages sent via the contact page.
