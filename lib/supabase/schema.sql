-- ============================================================
-- Maahad-ul-Rashd website — database schema
-- Ye poora file Supabase ke SQL Editor mein paste karke RUN karein
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- SETTINGS (ek hi row, id=1) ----------
create table if not exists settings (
  id int primary key default 1,
  name text default 'معہد الرشد',
  subname text default 'مرکز تحفیظ القرآن و الدعوۃ و التعلیم',
  tagline text default 'قرآن و سنت کی روشنی میں علم، تربیت اور دعوت کا ایک معتبر مرکز',
  principal_name text default 'مولانا عبد الرشید صاحب',
  principal_msg text default '',
  address text default '',
  phone text default '',
  email text default '',
  students text default '',
  faculty_count text default '',
  courses_count text default '',
  years text default '',
  constraint single_row check (id = 1)
);
insert into settings (id) values (1) on conflict (id) do nothing;

-- ---------- COURSES ----------
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  duration text,
  eligibility text,
  fee text,
  description text,
  created_at timestamptz default now()
);

-- ---------- NOTICES ----------
create table if not exists notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  notice_date date default current_date,
  important boolean default false,
  description text,
  created_at timestamptz default now()
);

-- ---------- FACULTY ----------
create table if not exists faculty (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  designation text,
  qualification text,
  created_at timestamptz default now()
);

-- ---------- GALLERY ----------
create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  title text,
  created_at timestamptz default now()
);

-- ---------- CONTACT MESSAGES ----------
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  message text,
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY — yahi wo hissa hai jo tay karta hai
-- ke aam log sirf DEKH sakein, sirf logged-in ADMIN badal sake
-- ============================================================

alter table settings  enable row level security;
alter table courses   enable row level security;
alter table notices   enable row level security;
alter table faculty   enable row level security;
alter table gallery   enable row level security;
alter table messages  enable row level security;

-- Public (koi bhi visitor, bina login) sirf PADH sakta hai:
create policy "public_read_settings" on settings for select using (true);
create policy "public_read_courses"  on courses  for select using (true);
create policy "public_read_notices"  on notices  for select using (true);
create policy "public_read_faculty"  on faculty  for select using (true);
create policy "public_read_gallery"  on gallery  for select using (true);

-- Public sirf contact form ka message BHEJ (insert) sakta hai, PADH nahi sakta:
create policy "public_insert_messages" on messages for insert with check (true);

-- Sirf logged-in ADMIN (authenticated user) har cheez add/edit/delete kar sakta hai:
create policy "admin_all_settings" on settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_all_courses"  on courses  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_all_notices"  on notices  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_all_faculty"  on faculty  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_all_gallery"  on gallery  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_all_messages" on messages for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
