-- Enable RLS (Row Level Security)
alter table if exists public.profiles enable row level security;

-- Create storage for public assets
insert into storage.buckets (id, name, public) values ('public', 'public', true);

-- Create programs table
create table if not exists public.programs (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  description text not null,
  theme text not null check (theme in ('red', 'blue')),
  hero_image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create program_content table for introduction and other text content
create table if not exists public.program_content (
  id uuid default gen_random_uuid() primary key,
  program_id uuid references public.programs(id) on delete cascade,
  section text not null,
  content jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(program_id, section)
);

-- Create program_levels table
create table if not exists public.program_levels (
  id uuid default gen_random_uuid() primary key,
  program_id uuid references public.programs(id) on delete cascade,
  title text not null,
  badge text not null,
  duration text not null,
  weekly_hours text not null,
  prerequisites text not null,
  description text not null,
  outcomes text[] not null,
  sort_order integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create program_features table
create table if not exists public.program_features (
  id uuid default gen_random_uuid() primary key,
  program_id uuid references public.programs(id) on delete cascade,
  title text not null,
  description text not null,
  icon text not null check (icon in ('academic', 'users', 'chat', 'puzzle', 'globe', 'clock', 'book', 'trophy')),
  sort_order integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create program_schedule table
create table if not exists public.program_schedule (
  id uuid default gen_random_uuid() primary key,
  program_id uuid references public.programs(id) on delete cascade,
  times jsonb not null,
  duration jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create program_tuition table
create table if not exists public.program_tuition (
  id uuid default gen_random_uuid() primary key,
  program_id uuid references public.programs(id) on delete cascade,
  price numeric not null,
  levels text[] not null,
  sort_order integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create course_materials table
create table if not exists public.course_materials (
  id uuid default gen_random_uuid() primary key,
  program_id uuid references public.programs(id) on delete cascade,
  title text not null,
  description text not null,
  image text not null,
  level text not null,
  sort_order integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies
alter table public.programs enable row level security;
alter table public.program_content enable row level security;
alter table public.program_levels enable row level security;
alter table public.program_features enable row level security;
alter table public.program_schedule enable row level security;
alter table public.program_tuition enable row level security;
alter table public.course_materials enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access" on public.programs
  for select using (true);

create policy "Allow public read access" on public.program_content
  for select using (true);

create policy "Allow public read access" on public.program_levels
  for select using (true);

create policy "Allow public read access" on public.program_features
  for select using (true);

create policy "Allow public read access" on public.program_schedule
  for select using (true);

create policy "Allow public read access" on public.program_tuition
  for select using (true);

create policy "Allow public read access" on public.course_materials
  for select using (true);

-- Create policy to allow authenticated users to modify data
create policy "Allow authenticated create" on public.programs
  for insert with check (auth.role() = 'authenticated');

create policy "Allow authenticated update" on public.programs
  for update using (auth.role() = 'authenticated');

create policy "Allow authenticated delete" on public.programs
  for delete using (auth.role() = 'authenticated');

-- Repeat for other tables
create policy "Allow authenticated create" on public.program_content
  for insert with check (auth.role() = 'authenticated');

create policy "Allow authenticated update" on public.program_content
  for update using (auth.role() = 'authenticated');

create policy "Allow authenticated delete" on public.program_content
  for delete using (auth.role() = 'authenticated');

-- Add updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add updated_at triggers to all tables
create trigger handle_updated_at
  before update on public.programs
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.program_content
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.program_levels
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.program_features
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.program_schedule
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.program_tuition
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.course_materials
  for each row
  execute function public.handle_updated_at(); 