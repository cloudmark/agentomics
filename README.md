# Agentomics — Marketing Site

The public-facing website for [Agentomics](https://agentomics.com), built with Next.js 15, Tailwind CSS, and shadcn/ui. Deployed to Firebase Hosting.

## Local development

**Requirements:** Node.js 18+, npm

```bash
git clone https://github.com/cloudmark/agentomics.git
cd agentomics
npm install
npm run dev
```

Open [http://localhost:9002](http://localhost:9002).

## Reviewing a branch

```bash
git fetch origin
git checkout <branch-name>
npm install
npm run dev
```

Then open [http://localhost:9002](http://localhost:9002).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 9002 (Turbopack) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Deployment

Deployed to Firebase Hosting (project: `agentomicsml`) via GitHub Actions:

- **Merge to `master`** → deploys to production at [agentomics.com](https://agentomics.com)
- **Open a PR** → deploys a preview URL (posted automatically as a PR comment)
