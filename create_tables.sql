-- Create stats table
CREATE TABLE IF NOT EXISTS public.stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    stat TEXT NOT NULL,
    icon TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create why_choose_us table
CREATE TABLE IF NOT EXISTS public.why_choose_us (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    features JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create hero_content table
CREATE TABLE IF NOT EXISTS public.hero_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tag TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    primary_button_text TEXT NOT NULL,
    primary_button_link TEXT NOT NULL,
    secondary_button_text TEXT NOT NULL,
    secondary_button_link TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create term_banner table
CREATE TABLE IF NOT EXISTS public.term_banner (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create footer_content table
CREATE TABLE IF NOT EXISTS public.footer_content (
    id SERIAL PRIMARY KEY,
    about_text TEXT NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL, 
    copyright_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert default stats
INSERT INTO public.stats (id, name, stat, icon)
VALUES 
    (uuid_generate_v4(), 'Students Taught', '1000+', 'M12 14l9-5-9-5-9 5 9 5z'),
    (uuid_generate_v4(), 'Success Rate', '95%', 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'),
    (uuid_generate_v4(), 'Expert Teachers', '20+', 'M12 4.354a4 4 0 110 5.292V12H5.69a4 4 0 110-5.292V4.5a.5.5 0 01.5-.5h6.6a.5.5 0 01.5.5v2.146z'),
    (uuid_generate_v4(), 'Years Experience', '10', 'M13 10V3L4 14h7v7l9-11h-7z');

-- Insert default why_choose_us content
INSERT INTO public.why_choose_us (id, title, description, features)
VALUES (
    uuid_generate_v4(),
    'Why Choose Us',
    'Experience the difference with our proven teaching methods and dedicated instructors.',
    '[
        {
            "title": "Expert Teachers",
            "description": "Learn from qualified native speakers with years of teaching experience.",
            "icon": "M12 14l9-5-9-5-9 5 9 5z"
        },
        {
            "title": "Modern Facilities",
            "description": "State-of-the-art classrooms equipped with the latest learning technology.",
            "icon": "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        },
        {
            "title": "Proven Results",
            "description": "95% of our students achieve their language learning goals within their target timeframe.",
            "icon": "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        }
    ]'::jsonb
);

-- Insert default events
INSERT INTO public.events (title, description, date, image_url)
VALUES 
    ('Open House', 'Join us for a tour of our facilities and meet our teachers.', NOW() + INTERVAL '7 days', '/images/events/open-house.jpg'),
    ('Free Trial Class', 'Experience our teaching methods with a complimentary trial lesson.', NOW() + INTERVAL '14 days', '/images/events/trial-class.jpg');

-- Add RLS policies
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.why_choose_us ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous read access
CREATE POLICY "Allow anonymous read access" ON public.stats FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anonymous read access" ON public.why_choose_us FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anonymous read access" ON public.events FOR SELECT TO anon USING (true);

-- Create policies for authenticated users to manage content
CREATE POLICY "Allow authenticated full access" ON public.stats FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access" ON public.why_choose_us FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access" ON public.events FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Add RLS policies for new tables
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.term_banner ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous read access for new tables
CREATE POLICY "Allow anonymous read access" ON public.hero_content FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anonymous read access" ON public.term_banner FOR SELECT TO anon USING (true);

-- Create policies for authenticated users to manage content for new tables
CREATE POLICY "Allow authenticated full access" ON public.hero_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access" ON public.term_banner FOR ALL TO authenticated USING (true) WITH CHECK (true); 