# Supabase setup

1. Create a Supabase project.
2. Copy the project URL and anon key into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-side only, never exposed to the client)
3. Run the schema migration in `packages/db/migrations/0001_init.sql` via the Supabase SQL
   editor, or with the Supabase CLI:
   ```
   supabase db push
   ```
4. Row Level Security is enabled on every table in the initial migration but the policies
   are intentionally permissive placeholders for local development. Before any production
   launch, add workspace-scoped RLS policies (e.g. `workspace_id in (select workspace_id
   from workspace_members where user_id = auth.uid())`) to every table.
5. The current build (this session) reads exclusively from
   `apps/web/src/lib/demo-data.ts` in-memory seed data — no live Supabase queries are wired
   up yet. Swapping to real data means replacing the imports in the dashboard/capture pages
   with Supabase queries that return the same `@flowlens/capture-core` shapes.
