create extension if not exists "pgcrypto";

create table public.textbooks (
  id text primary key,
  title text not null,
  publisher text,
  edition text,
  is_published boolean not null default false,
  source_reference text,
  rights_status text not null default 'unverified'
    check (rights_status in ('unverified', 'reviewing', 'approved')),
  created_at timestamptz not null default now()
);

create table public.units (
  id text primary key,
  textbook_id text not null references public.textbooks (id) on delete cascade,
  title text not null,
  position integer not null check (position > 0)
);

create table public.lessons (
  id text primary key,
  unit_id text not null references public.units (id) on delete cascade,
  title text not null,
  is_published boolean not null default false,
  position integer not null check (position > 0),
  created_at timestamptz not null default now()
);

create table public.vocabulary_items (
  id text primary key,
  lesson_id text not null references public.lessons (id) on delete cascade,
  word text not null,
  meaning text not null,
  example text not null,
  image_url text,
  audio_url text,
  position integer not null check (position > 0)
);

create table public.sentence_patterns (
  id text primary key,
  lesson_id text not null references public.lessons (id) on delete cascade,
  pattern text not null,
  meaning text not null,
  example text,
  audio_url text,
  position integer not null check (position > 0)
);

create table public.student_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null references public.lessons (id) on delete cascade,
  completed boolean not null default false,
  mastery numeric not null default 0 check (mastery >= 0 and mastery <= 1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, lesson_id)
);

create table public.review_items (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users (id) on delete cascade,
  content_type text not null check (content_type in ('vocabulary', 'sentence_pattern')),
  content_id text not null,
  priority integer not null default 1 check (priority >= 1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, content_type, content_id)
);

create index units_textbook_id_idx on public.units (textbook_id);
create index lessons_unit_id_idx on public.lessons (unit_id);
create index vocabulary_items_lesson_id_idx on public.vocabulary_items (lesson_id);
create index sentence_patterns_lesson_id_idx on public.sentence_patterns (lesson_id);
create index student_progress_student_id_idx on public.student_progress (student_id);
create index review_items_student_id_priority_idx
  on public.review_items (student_id, priority desc, created_at asc);

alter table public.textbooks enable row level security;
alter table public.units enable row level security;
alter table public.lessons enable row level security;
alter table public.vocabulary_items enable row level security;
alter table public.sentence_patterns enable row level security;
alter table public.student_progress enable row level security;
alter table public.review_items enable row level security;

create policy "Published textbooks are readable"
  on public.textbooks for select to anon, authenticated
  using (is_published and rights_status = 'approved');

create policy "Units for published textbooks are readable"
  on public.units for select to anon, authenticated
  using (
    exists (
      select 1 from public.textbooks
      where textbooks.id = units.textbook_id
        and textbooks.is_published
        and textbooks.rights_status = 'approved'
    )
  );

create policy "Published lessons are readable"
  on public.lessons for select to anon, authenticated
  using (
    is_published and exists (
      select 1 from public.units
      join public.textbooks on textbooks.id = units.textbook_id
      where units.id = lessons.unit_id
        and textbooks.is_published
        and textbooks.rights_status = 'approved'
    )
  );

create policy "Vocabulary for published lessons is readable"
  on public.vocabulary_items for select to anon, authenticated
  using (
    exists (
      select 1 from public.lessons
      join public.units on units.id = lessons.unit_id
      join public.textbooks on textbooks.id = units.textbook_id
      where lessons.id = vocabulary_items.lesson_id
        and lessons.is_published
        and textbooks.is_published
        and textbooks.rights_status = 'approved'
    )
  );

create policy "Sentence patterns for published lessons are readable"
  on public.sentence_patterns for select to anon, authenticated
  using (
    exists (
      select 1 from public.lessons
      join public.units on units.id = lessons.unit_id
      join public.textbooks on textbooks.id = units.textbook_id
      where lessons.id = sentence_patterns.lesson_id
        and lessons.is_published
        and textbooks.is_published
        and textbooks.rights_status = 'approved'
    )
  );

create policy "Students select their own progress"
  on public.student_progress for select to authenticated
  using ((select auth.uid()) = student_id);

create policy "Students insert their own progress"
  on public.student_progress for insert to authenticated
  with check ((select auth.uid()) = student_id);

create policy "Students update their own progress"
  on public.student_progress for update to authenticated
  using ((select auth.uid()) = student_id)
  with check ((select auth.uid()) = student_id);

create policy "Students select their own review items"
  on public.review_items for select to authenticated
  using ((select auth.uid()) = student_id);

create policy "Students insert their own review items"
  on public.review_items for insert to authenticated
  with check ((select auth.uid()) = student_id);

create policy "Students update their own review items"
  on public.review_items for update to authenticated
  using ((select auth.uid()) = student_id)
  with check ((select auth.uid()) = student_id);
