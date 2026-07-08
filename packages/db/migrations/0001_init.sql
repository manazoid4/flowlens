-- FlowLens initial schema. Mirrors packages/capture-core/src/index.ts domain types.
-- Run via the Supabase CLI (`supabase db push`) or the SQL editor in the Supabase dashboard.

create extension if not exists "uuid-ossp";

create table if not exists workspaces (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  plan text not null default 'starter' check (plan in ('starter','team','business','enterprise','agency','founder')),
  created_at timestamptz not null default now()
);

create table if not exists workspace_members (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null,
  role text not null check (role in ('owner','admin','editor','reviewer','viewer')),
  name text not null,
  email text not null,
  created_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);

create table if not exists captures (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  title text not null,
  description text,
  mode text not null,
  status text not null default 'draft'
    check (status in ('draft','processing','ready','archived','needs-review')),
  environment jsonb,
  friction_score jsonb,
  estimated_time_saved_minutes integer,
  estimated_money_saved_gbp numeric,
  created_by uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists capture_steps (
  id uuid primary key default uuid_generate_v4(),
  capture_id uuid not null references captures(id) on delete cascade,
  index integer not null,
  title text not null,
  description text,
  screenshot_url text not null,
  thumbnail_url text,
  timestamp_ms bigint not null,
  duration_ms bigint,
  app_name text,
  action text,
  tags text[] not null default '{}',
  severity text,
  redacted boolean not null default false,
  change_detected boolean not null default false,
  ai_summary text,
  created_at timestamptz not null default now()
);

create table if not exists annotations (
  id uuid primary key default uuid_generate_v4(),
  step_id uuid not null references capture_steps(id) on delete cascade,
  kind text not null,
  x numeric not null,
  y numeric not null,
  width numeric,
  height numeric,
  rotation numeric,
  text text,
  color text,
  order_index integer,
  created_by uuid,
  created_at timestamptz not null default now()
);

create table if not exists ai_findings (
  id uuid primary key default uuid_generate_v4(),
  capture_id uuid not null references captures(id) on delete cascade,
  kind text not null,
  title text not null,
  description text not null,
  impact text not null check (impact in ('low','medium','high','critical')),
  related_step_ids uuid[] not null default '{}',
  suggested_action text,
  suggested_owner text,
  confidence numeric,
  created_at timestamptz not null default now()
);

create table if not exists capture_comments (
  id uuid primary key default uuid_generate_v4(),
  capture_id uuid not null references captures(id) on delete cascade,
  step_id uuid references capture_steps(id) on delete cascade,
  author text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists capture_exports (
  id uuid primary key default uuid_generate_v4(),
  capture_id uuid not null references captures(id) on delete cascade,
  format text not null,
  url text,
  content text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- Row Level Security: workspace-scoped access. Policies intentionally left permissive
-- for local/dev seeding; tighten before production launch (see docs/deploy/supabase.md).
alter table workspaces enable row level security;
alter table workspace_members enable row level security;
alter table captures enable row level security;
alter table capture_steps enable row level security;
alter table annotations enable row level security;
alter table ai_findings enable row level security;
alter table capture_comments enable row level security;
alter table capture_exports enable row level security;
