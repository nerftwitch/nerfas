# Nerfas Admin App

React + TypeScript dashboard scaffold for role-based order, user, and company management. Stack includes Vite, Tailwind, shadcn-inspired UI primitives, React Router, React Query, React Hook Form/Zod, Framer Motion, Sonner toasts, and Firebase (Auth/Firestore).

## Project structure
- `src/routes` – router definitions with protected/role-gated hierarchy.
- `src/components` – layout shell, auth guards, and primitive UI elements.
- `src/context/auth-context.tsx` – auth provider with mock user session loading.
- `src/features/*` – feature pages for auth, orders, companies, and users.
- `src/config` – shared role and status constants.
- `src/lib` – Firebase client bootstrap, React Query client, and helpers.

## Firebase
The app is preconfigured for the `nerfas-teste` Firebase project using the keys from the project brief. Update `src/lib/firebase.ts` if you need different credentials.

## Getting started
1. Install dependencies (requires npm registry access):
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Lint the codebase:
   ```bash
   npm run lint
   ```

> If registry access is restricted, dependency installation may fail. In that case, mirror packages to an accessible registry or install offline caches before running the commands above.
