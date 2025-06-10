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

-- Create user_roles table
create table if not exists public.user_roles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  role text not null check (role in ('admin', 'editor', 'viewer')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Enable RLS on user_roles
alter table public.user_roles enable row level security;

-- Allow users to read their own role
create policy "Users can read own role" on public.user_roles
  for select using (auth.uid() = user_id);

-- Allow admins to manage all roles
create policy "Admins can manage roles" on public.user_roles
  for all using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- Update existing policies to check for appropriate roles
create or replace policy "Allow editor and admin updates" on public.programs
  for update using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role in ('admin', 'editor')
    )
  );

create or replace policy "Allow admin deletes" on public.programs
  for delete using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );

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

-- Create program_pages table for academics section
create table if not exists public.program_pages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  type text not null check (type in ('english', 'chinese', 'ielts')),
  description text not null,
  theme text not null check (theme in ('red', 'blue')),
  hero_image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create program_pages_content table
create table if not exists public.program_pages_content (
  id uuid default gen_random_uuid() primary key,
  program_id uuid references public.program_pages(id) on delete cascade,
  section text not null,
  content jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(program_id, section)
);

-- Create program_pages_levels table
create table if not exists public.program_pages_levels (
  id uuid default gen_random_uuid() primary key,
  program_id uuid references public.program_pages(id) on delete cascade,
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

-- Create program_pages_features table
create table if not exists public.program_pages_features (
  id uuid default gen_random_uuid() primary key,
  program_id uuid references public.program_pages(id) on delete cascade,
  title text not null,
  description text not null,
  icon text not null check (icon in ('academic', 'users', 'chat', 'puzzle', 'globe', 'clock', 'book', 'trophy')),
  sort_order integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create program_pages_schedule table
create table if not exists public.program_pages_schedule (
  id uuid default gen_random_uuid() primary key,
  program_id uuid references public.program_pages(id) on delete cascade,
  times jsonb not null,
  duration jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create program_pages_tuition table
create table if not exists public.program_pages_tuition (
  id uuid default gen_random_uuid() primary key,
  program_id uuid references public.program_pages(id) on delete cascade,
  price numeric not null,
  levels text[] not null,
  sort_order integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create program_pages_materials table
create table if not exists public.program_pages_materials (
  id uuid default gen_random_uuid() primary key,
  program_id uuid references public.program_pages(id) on delete cascade,
  title text not null,
  description text not null,
  image text not null,
  level text not null,
  sort_order integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on new tables
alter table public.program_pages enable row level security;
alter table public.program_pages_content enable row level security;
alter table public.program_pages_levels enable row level security;
alter table public.program_pages_features enable row level security;
alter table public.program_pages_schedule enable row level security;
alter table public.program_pages_tuition enable row level security;
alter table public.program_pages_materials enable row level security;

-- Create policies for new tables
create policy "Allow public read access" on public.program_pages
  for select using (true);

create policy "Allow public read access" on public.program_pages_content
  for select using (true);

create policy "Allow public read access" on public.program_pages_levels
  for select using (true);

create policy "Allow public read access" on public.program_pages_features
  for select using (true);

create policy "Allow public read access" on public.program_pages_schedule
  for select using (true);

create policy "Allow public read access" on public.program_pages_tuition
  for select using (true);

create policy "Allow public read access" on public.program_pages_materials
  for select using (true);

-- Create authenticated policies for new tables
create policy "Allow authenticated create" on public.program_pages
  for insert with check (auth.role() = 'authenticated');

create policy "Allow authenticated update" on public.program_pages
  for update using (auth.role() = 'authenticated');

create policy "Allow authenticated delete" on public.program_pages
  for delete using (auth.role() = 'authenticated');

-- Add triggers for updated_at
create trigger handle_updated_at
  before update on public.program_pages
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.program_pages_content
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.program_pages_levels
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.program_pages_features
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.program_pages_schedule
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.program_pages_tuition
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.program_pages_materials
  for each row
  execute function public.handle_updated_at();