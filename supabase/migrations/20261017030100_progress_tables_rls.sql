-- ============ PROGRESS (per user; anonymous sign-in works) ============
create table public.game_best (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  game_id text not null,
  pct smallint not null check (pct between 0 and 100),
  updated_at timestamptz not null default now(),
  primary key (user_id, game_id)
);

create table public.missed_words (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  grade text not null references public.grades (code) on delete cascade,
  en text not null,
  ar text not null,
  emoji text,
  created_at timestamptz not null default now(),
  primary key (user_id, grade, en)
);

create table public.user_prefs (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  muted boolean not null default false
);

-- ============ RLS + GRANTS ============
do $$
declare t text;
begin
  foreach t in array array[
    'grades', 'levels', 'level_grades', 'words', 'grade_opposites', 'adjective_pairs', 'verbs', 'grade_verbs',
    'topic_groups', 'grammar_topics', 'grammar_plan', 'pos_words', 'synonyms', 'adjective_docs', 'adjective_topics',
    'job_words', 'job_sentences', 'word_pairs', 'prepositions', 'hints', 'bad_verbs', 'question_bank', 'dialogues',
    'reading_texts', 'reading_questions', 'example_sentences', 'sequences'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "content is public" on public.%I for select to anon, authenticated using (true)', t);
    execute format('grant select on public.%I to anon, authenticated', t);
  end loop;
end $$;

alter table public.game_best enable row level security;
alter table public.missed_words enable row level security;
alter table public.user_prefs enable row level security;

create policy "own best" on public.game_best for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "own misses" on public.missed_words for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "own prefs" on public.user_prefs for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.game_best, public.missed_words, public.user_prefs to authenticated;
