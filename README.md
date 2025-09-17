# Reactive GitHub (2024 refresh)

Modernised GitHub profile explorer built with React 18, Vite, and TanStack Query. Search for any public username to see a profile overview, language breakdown, repository explorer, and quick highlights.

## ✨ Feature highlights
- Smart user search with quick suggestions
- Profile overview with followers, following, repo counts, total stars, and forks
- Repository explorer with sort (stars, updated, created) and language filters
- Language snapshot visualised with a responsive pie chart
- Quick facts for the most starred, oldest, and most recently active repositories

## 🧱 Tech stack
- React 18 + TypeScript powered by Vite
- React Router v6 for routing
- TanStack Query for data fetching and caching
- Recharts for language visualisation
- Date-fns for friendly date formatting

## 🚀 Getting started
1. Install dependencies
   ```bash
   npm install
   ```
2. Start the dev server
   ```bash
   npm run dev
   ```
3. Build for production
   ```bash
   npm run build
   ```
4. Preview the production build locally
   ```bash
   npm run preview
   ```

> **GitHub API limits**: Unauthenticated requests are limited to 60 per hour. Heavy usage or users with thousands of repositories may require providing a personal access token and extending the API layer.

## 🗂️ Project structure
```
src/
  api/             # GitHub REST helpers
  features/        # Feature-specific UI modules (search, profile, repos, etc.)
  hooks/           # Reusable hooks
  layout/          # Application shell / shared layout
  pages/           # Route-level screens
  styles/          # Global styles
  utils/           # Formatting and insight helpers
```

## 🔧 Configuration
- `vite.config.ts` hosts the Vite + React SWC setup.
- `tsconfig.json` is tuned for modern ESM and JSX runtime.

Feel free to extend the dashboard with authenticated requests, caching, or deploy it via your favourite static hosting service.
