# AGENTS.md - Blue Horizon

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

- You are not allowed to open any browser to validate work.
- Do not ever commit to `main` unless explicitly instructed.
- You are not allowed to put emojis anywhere in your code, comments, documentation, or chat responses.

---

## 1. Project Architecture & Reference Directory Structure

All code contributions must strictly adhere to this folder structure to maintain clean separation of concerns and high scalability. Note that specific domain subfolders (e.g. `properties`, `projects`, `Home`, `About`, `Contact`, `Dashboard`) are reference examples of how features should be organized when created:

```text
blue-horizon/
├── app/                          # NEXT.JS ROUTING ONLY (Pages & Layouts, NO components)
│   ├── [locale]/                 # Public / Client routes with i18n support (reference)
│   │   ├── page.tsx              # Home page route
│   │   ├── properties/           # Property listings & details
│   │   ├── projects/             # Compounds & developments in Hurghada
│   │   ├── about/page.tsx        # About page route
│   │   ├── contact/page.tsx      # Contact & inquiry route
│   │   └── layout.tsx            # Client locale layout
│   ├── admin/                    # Admin area routes (reference)
│   │   ├── login/page.tsx        # Admin login route
│   │   ├── dashboard/page.tsx    # Admin dashboard route
│   │   ├── properties/page.tsx   # Property management (CRUD)
│   │   └── projects/page.tsx     # Compound/development management
│   ├── globals.css               # Global Tailwind CSS v4 styling
│   └── layout.tsx                # Root layout
│
├── components/                   # ALL UI COMPONENTS (Strict context separation)
│   ├── UserComp/                 # User / Client page components
│   │   ├── Common/               # Shared client components (Navbar, Footer, etc.)
│   │   ├── Home/                 # Components used on Home page
│   │   ├── Properties/           # Components used on Properties pages
│   │   ├── Projects/             # Components used on Projects pages
│   │   ├── About/                # Components used on About page
│   │   └── Contact/              # Components used on Contact page
│   └── adminComp/                # Admin page components
│       ├── Login/                # Components used on Admin Login
│       ├── Dashboard/            # Components used on Admin Dashboard
│       ├── Properties/           # Admin property management components
│       └── Projects/             # Admin project management components
│
├── clientApi/                    # BACKEND & HTTP CLIENT CONFIGURATION (Do NOT name api/)
│   ├── apiConfig.ts              # Central Axios configuration, interceptors, baseURL switcher
│   └── ...api modules            # Domain-specific endpoint calls (e.g., propertiesApi.ts, projectsApi.ts, leadsApi.ts, adminApi.ts)
│
├── models/                       # TYPESCRIPT TYPES & INTERFACES (Data contracts with backend)
│   └── ...domain models          # DTOs, entity interfaces, and API response types
│
├── features/                     # FEATURE-DRIVEN BUSINESS LOGIC
│   └── ...feature modules        # Custom hooks, TanStack Query hooks, Zustand state slices
│
└── shared/                       # REUSABLE ACROSS FEATURES & COMPONENTS
    ├── providers/                # React Query providers, Locale providers, Toast providers, etc.
    └── utils/                    # Utility helper functions (formatters, converters, validators)
```

---

## 2. Critical Placement & Behavioral Rules

1. **`app/` is strictly for Routing**:
   - Only `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` are allowed in `app/`.
   - Never define UI components directly inside `app/`. Every page must import and render components from `@/components/UserComp/...` or `@/components/adminComp/...`.
2. **Components Division**:
   - Client/public facing UI belongs in `components/UserComp/<FeatureName>/`.
   - Admin facing UI belongs in `components/adminComp/<FeatureName>/`.
3. **API & Config**:
   - All network requests must flow through `clientApi/` using the centralized configuration in `clientApi/apiConfig.ts`. Never hardcode raw endpoint URLs in components or hooks.
4. **Data Models**:
   - All backend data structures, DTOs, and schema interfaces belong in `models/`.
5. **Features & Shared**:
   - Encapsulate TanStack Query queries/mutations and Zustand stores inside `features/`.
   - Place cross-cutting providers (e.g. `QueryClientProvider`) and common utilities in `shared/`.
6. **Code Hygiene**:
   - Keep all code files under 300 lines. Split components into smaller focused sub-components when approaching this limit.
   - Run `node ./node_modules/typescript/bin/tsc --noEmit` to verify type safety after changes.
7. **Strict Constraints**:
   - Never use emojis anywhere in your code, comments, documentation, or chat responses.
   - Never open a browser to validate work.
   - Never commit to `main` unless explicitly instructed.

---

## 3. Tech Stack Reference

- **Framework**: Next.js 16 (App Router) + React 19
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`)
- **State & Server Cache**: TanStack Query v5 (`@tanstack/react-query`) + Zustand v5 (`zustand`)
- **Networking**: Axios v1 (`axios`) with centralized `baseURL` configuration and interceptors
- **Animation**: Framer Motion (`framer-motion`)
- **Icons**: React Icons (`react-icons`)
- **Notifications**: Sonner (`sonner`)
- **Type Checking**: TypeScript v5 (Strict mode)
- **Package Manager**: Bun (`bun.cmd`) or npm (`npm.cmd`)

