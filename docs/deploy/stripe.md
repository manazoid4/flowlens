# Stripe setup

1. Create a Stripe account/product set matching `apps/web/src/lib/pricing.ts` tiers
   (Starter, Team, Business, Enterprise, Agency, Founder).
2. Add `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and
   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env.local` / Vercel environment variables.
3. Not yet implemented in this build: checkout session creation, webhook handler, and
   plan-to-workspace syncing. The `stripe` package is already installed in
   `apps/web/package.json` so a future session can add
   `apps/web/src/app/api/stripe/webhook/route.ts` and a checkout action without further
   dependency setup.
