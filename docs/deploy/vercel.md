# Deploying apps/web to Vercel

This is an npm-workspaces monorepo (`apps/*`, `packages/*`). apps/web depends on the
`@flowlens/*` packages via the `workspaces` field, so Vercel must build with access to the
whole repo, not just `apps/web`.

## One-time project setup
1. `vercel login` (if not already authenticated)
2. From the **repo root** (not `apps/web`): `vercel link`
3. In the Vercel dashboard, set Project Settings > General > Root Directory to `apps/web`
   and make sure "Include files outside of the Root Directory in the Build Step" is enabled.
   (This build already verified working with that setting.)
4. Vercel > Project Settings > Environment Variables: add `RESEND_API_KEY`,
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
   `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` as needed.

## Deploying
Always run `vercel` commands from the **repo root**, e.g.:

```
vercel --yes         # preview deploy
vercel --yes --prod  # production deploy
```

Running `vercel` from inside `apps/web` only uploads that directory and the build will fail
with `npm error 404 ... @flowlens/ai@*` because the workspace packages never get uploaded.

## Deployment protection
New Vercel team projects can have SSO/deployment protection enabled by default, which
returns a 302 redirect to `vercel.com/sso-api` for every route — this is not an app bug.
Check Project Settings > Deployment Protection if a deployed URL 302s instead of loading.

## Known-good deployment (this build)
Production URL verified returning HTTP 200 on `/`, `/dashboard`, `/pricing`,
`/captures/[id]`, `/captures/[id]/ai`, `/captures/[id]/export`, `/solutions/[slug]`,
`/compare/[slug]`, `/security`, `/enterprise`, `/integrations`, `/process-library`,
`/settings`.
