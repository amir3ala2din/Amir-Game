-- Amir Tutor: learning content (read-only for the app) + per-user progress.
-- Content shape mirrors types/content.types.ts; `get_content()` returns it as one jsonb document.

-- ============ CONTENT ============
create table public.grades (
  code text primary key,
  stage text not null check (stage in ('P', 'M', 'S')),
  sort int not null
);

create table public.levels (
  key text primary key,
  path text not null check (path in ('school', 'general')),
  label_en text not null,
  label_ar text not null,
  emoji text not null,
  sort int not null
);

-- CEFR level -> grades it spans (school levels are their own grade)
create table public.level_grades (
  level_key text not null references public.levels (key) on delete cascade,
  grade text not null references public.grades (code) on delete cascade,
  sort int not null,
  primary key (level_key, grade)
);

-- grade vocabulary (grade set) or stage-wide extra words (stage + pos set)
create table public.words (
  id bigint generated always as identity primary key,
  grade text references public.grades (code) on delete cascade,
  stage text check (stage in ('P', 'M', 'S')),
  pos text check (pos in ('n', 'v', 'a', 'x')),
  en text not null,
  ar text not null,
  emoji text,
  sort int not null,
  check (
    (grade is not null and stage is null and pos is null)
    or (grade is null and stage is not null and pos is not null)
  )
);
create index words_grade_sort_idx on public.words (grade, sort) where grade is not null;
create index words_stage_pos_sort_idx on public.words (stage, pos, sort) where stage is not null;

create table public.grade_opposites (
  id bigint generated always as identity primary key,
  grade text not null references public.grades (code) on delete cascade,
  en text not null,
  ar text not null,
  opp text not null,
  opp_ar text not null,
  sort int not null
);
create index grade_opposites_grade_idx on public.grade_opposites (grade, sort);

create table public.adjective_pairs (
  id bigint generated always as identity primary key,
  en text not null,
  ar text not null,
  opp text not null,
  opp_ar text not null,
  tag text,
  sort int not null
);

create table public.verbs (
  id bigint generated always as identity primary key,
  en text not null,
  past text not null,
  ar text not null,
  obj text not null,
  tag text,
  sort int not null
);

create table public.grade_verbs (
  grade text not null references public.grades (code) on delete cascade,
  verb text not null,
  sort int not null,
  primary key (grade, sort)
);

create table public.topic_groups (
  id bigint generated always as identity primary key,
  grade text not null references public.grades (code) on delete cascade,
  name_en text not null,
  name_ar text not null,
  emoji text not null,
  term int not null,
  words text[] not null,
  sort int not null
);
create index topic_groups_grade_idx on public.topic_groups (grade, sort);

create table public.grammar_topics (
  key text primary key,
  name_en text not null,
  name_ar text not null,
  emoji text not null
);

create table public.grammar_plan (
  grade text not null references public.grades (code) on delete cascade,
  topic_key text not null references public.grammar_topics (key),
  term int not null,
  sort int not null,
  primary key (grade, sort)
);

-- english words that are verbs / adjectives / other; everything else is a noun
create table public.pos_words (
  pos text not null check (pos in ('v', 'a', 'x')),
  word text not null,
  sort int not null,
  primary key (pos, word)
);

create table public.synonyms (
  en text primary key,
  syn text not null
);

create table public.adjective_docs (
  en text primary key,
  synonyms text[] not null,
  antonyms text[] not null,
  sort int not null
);

create table public.adjective_topics (
  id bigint generated always as identity primary key,
  name_en text not null,
  name_ar text not null,
  emoji text not null,
  term int not null,
  words text[] not null,
  sort int not null
);

create table public.job_words (
  id bigint generated always as identity primary key,
  set_key text not null check (set_key in ('family', 'jobs')),
  en text not null,
  ar text not null,
  emoji text,
  sort int not null
);

create table public.job_sentences (
  id bigint generated always as identity primary key,
  job text not null,
  place text not null,
  place_phrase text not null,
  tools text[] not null,
  action text not null,
  full_text text not null,
  blanked_text text not null,
  sort int not null
);

-- comparatives, plurals, time markers and -ed / -s sound examples: [a, b]
create table public.word_pairs (
  id bigint generated always as identity primary key,
  kind text not null check (kind in ('comparative', 'plural', 'time_marker', 'ed_sound', 's_sound')),
  a text not null,
  b text not null,
  sort int not null
);
create index word_pairs_kind_idx on public.word_pairs (kind, sort);

create table public.prepositions (
  id bigint generated always as identity primary key,
  sentence text not null,
  answer text not null,
  ar text not null,
  sort int not null
);

create table public.hints (
  kind text not null check (kind in ('modal', 'link', 'cause')),
  key text not null,
  en text not null,
  ar text not null,
  primary key (kind, key)
);

create table public.bad_verbs (
  tense text not null,
  verb text not null,
  sort int not null,
  primary key (tense, verb)
);

create table public.question_bank (
  id bigint generated always as identity primary key,
  bank text not null check (bank in (
    'modal', 'link', 'cond', 'passive', 'usedTo', 'equality', 'passivePast', 'whenWhile',
    'cause', 'presentPerfectAdv', 'prefix', 'imperative', 'cond1', 'obligation', 'punctuation', 'wordForm'
  )),
  question text not null,
  answer text not null,
  wrong text[] not null,
  hint_key text,
  sort int not null
);
create index question_bank_bank_idx on public.question_bank (bank, sort);

create table public.dialogues (
  id bigint generated always as identity primary key,
  question text not null,
  answer text not null,
  wrong text[] not null,
  sort int not null
);

create table public.reading_texts (
  id bigint generated always as identity primary key,
  kind text not null check (kind in ('reading', 'bem')),
  stage text check (stage in ('P', 'M', 'S')),
  body text not null,
  sort int not null
);

create table public.reading_questions (
  id bigint generated always as identity primary key,
  text_id bigint not null references public.reading_texts (id) on delete cascade,
  question text not null,
  answer text not null,
  wrong text[],
  evidence text,
  sort int not null
);
create index reading_questions_text_idx on public.reading_questions (text_id, sort);

create table public.example_sentences (
  id bigint generated always as identity primary key,
  kind text not null check (kind in ('prim', 'mid', 'sec', 'bem')),
  body text not null,
  sort int not null
);

create table public.sequences (
  grade text not null references public.grades (code) on delete cascade,
  term int not null check (term between 1 and 3),
  title_en text not null,
  title_ar text not null,
  primary key (grade, term)
);
