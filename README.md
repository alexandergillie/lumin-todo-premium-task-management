# Lumin Todo

A modern, full-stack Todo application powered by Cloudflare Workers. This template provides a production-ready setup with a responsive React frontend, type-safe APIs using Hono, persistent storage via Durable Objects, and beautiful UI components from shadcn/ui.

[![[cloudflarebutton]]](https://deploy.workers.cloudflare.com/?url=${repositoryUrl})

## ✨ Features

- **Full-Stack Architecture**: React SPA frontend served via Cloudflare Workers with API routes.
- **Persistent State**: Cloudflare Durable Objects for global counter, todo CRUD operations.
- **Modern UI**: shadcn/ui components, Tailwind CSS with custom animations and themes.
- **State Management**: Tanstack Query for data fetching and caching.
- **Type-Safe**: Full TypeScript support across frontend, backend, and shared types.
- **Dark Mode**: Automatic theme detection with toggle.
- **Responsive Design**: Mobile-first layout with sidebar navigation.
- **Error Handling**: Global error boundaries and client error reporting.
- **Development Tools**: Vite for fast HMR, Bun for package management, Wrangler for deployment.
- **Production-Ready**: CORS, logging, health checks, and SPA routing.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide Icons, Framer Motion, React Router, Tanstack Query, Sonner (toasts)
- **Backend**: Cloudflare Workers, Hono, Durable Objects (SQLite storage)
- **Utilities**: Zod (validation), Zustand (if needed), Immer, UUID
- **Dev Tools**: Bun, ESLint, TypeScript ESLint, Wrangler
- **Deployment**: Cloudflare Workers/Pages

## 🚀 Quick Start

1. Fork or clone this repository.
2. Click the **[Deploy to Cloudflare]** button above to deploy instantly.
3. Or follow the manual setup below.

## 📦 Installation

This project uses **Bun** as the package manager for optimal performance.

```bash
# Clone the repository
git clone <your-repo-url>
cd lumin-todo-a0sypqy3swrcpunuaj40x

# Install dependencies
bun install

# Generate Worker types (Cloudflare account required)
bun run cf-typegen
```

**Note**: Ensure you have a Cloudflare account and Wrangler CLI installed (`npm i -g wrangler`).

## 🔄 Development

```bash
# Start development server (frontend + worker)
bun dev

# Open http://localhost:3000 (or your configured PORT)
```

- Frontend: Runs on Vite with hot module replacement.
- Backend: Worker routes available at `/api/*`.
- Test APIs: `curl http://localhost:3000/api/health`, `/api/counter`, `/api/demo`.

### Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start dev server (frontend + proxy to worker) |
| `bun build` | Build for production |
| `bun lint` | Run ESLint |
| `bun preview` | Preview production build |
| `bun deploy` | Build and deploy to Cloudflare |
| `bun cf-typegen` | Generate Worker type definitions |

## 📚 Usage

### Frontend Customization

- **Replace HomePage**: Edit `src/pages/HomePage.tsx` for your Todo UI.
- **API Integration**: Use shared types from `@shared/*` and Tanstack Query.
  ```tsx
  import { useQuery } from '@tanstack/react-query';
  import { useFetcher } from '@/hooks/useFetcher'; // Example

  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(res => res.json()),
  });
  ```
- **Add Routes**: Extend `src/main.tsx` router.
- **Components**: Use pre-installed shadcn/ui components (e.g., `Table`, `Dialog`, `Form`).

### Backend Customization

- **Add Routes**: Extend `worker/userRoutes.ts` (do **not** edit `worker/index.ts`).
  ```ts
  import { userRoutes } from './userRoutes';
  // Auto-loaded in production
  ```
- **Durable Objects**: Extend `worker/durableObject.ts` methods.
- **Storage**: Uses SQLite-backed Durable Objects for persistence.

### Example API Calls

```bash
# GET todos (demo items)
curl http://localhost:3000/api/demo

# POST new todo
curl -X POST http://localhost:3000/api/demo \
  -H "Content-Type: application/json" \
  -d '{"name": "Buy milk", "value": 1}'

# Counter
curl http://localhost:3000/api/counter
curl -X POST http://localhost:3000/api/counter/increment
```

## ☁️ Deployment

1. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```

2. **Configure** (optional):
   Edit `wrangler.jsonc` for custom bindings, env vars, or domains.

3. **Deploy**:
   ```bash
   bun deploy
   ```

4. **Instant Deploy**:
   [![[cloudflarebutton]]](https://deploy.workers.cloudflare.com/?url=${repositoryUrl})

Your app will be live at `https://your-project.pages.dev` (Pages) or `https://your-project.your-subdomain.workers.dev` (Workers).

### CI/CD

Add to GitHub Actions:
```yaml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run cf-typegen
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
      - run: bun deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## 🤝 Contributing

1. Fork the repo.
2. Create a feature branch (`bun dev`).
3. Commit changes (`bun lint`).
4. Open a Pull Request.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 🙌 Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

Built with ❤️ for the Cloudflare developer community.