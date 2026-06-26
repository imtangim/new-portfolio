-- Run this in Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  author text not null check (char_length(author) between 1 and 50),
  text text not null check (char_length(text) between 1 and 3000),
  created_at timestamptz not null default now()
);

create index if not exists comments_post_slug_idx on public.comments (post_slug, created_at desc);

create table if not exists public.post_reactions (
  post_slug text primary key,
  likes integer not null default 0 check (likes >= 0),
  dislikes integer not null default 0 check (dislikes >= 0)
);

create table if not exists public.reaction_votes (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  voter_id text not null,
  vote text not null check (vote in ('like', 'dislike')),
  created_at timestamptz not null default now(),
  unique (post_slug, voter_id)
);

alter table public.comments enable row level security;
alter table public.post_reactions enable row level security;
alter table public.reaction_votes enable row level security;

-- API routes use service role; these policies allow read via anon if needed later
create policy "Public read comments"
  on public.comments for select
  using (true);

create policy "Public read reactions"
  on public.post_reactions for select
  using (true);
