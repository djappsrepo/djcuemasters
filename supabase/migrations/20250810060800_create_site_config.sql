-- supabase/migrations/20250810060800_create_site_config.sql

-- 1. Create the site_config table
CREATE TABLE public.site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_modified_by UUID REFERENCES auth.users(id)
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies
-- Allow public read access
CREATE POLICY "Allow public read access" ON public.site_config
  FOR SELECT USING (TRUE);

-- Allow admin write access
CREATE POLICY "Allow admin write access" ON public.site_config
  FOR UPDATE USING (auth.uid() IN (SELECT user_id FROM profiles WHERE role = 'admin'));

-- 4. Insert the initial pricing visibility setting
INSERT INTO public.site_config (key, value)
VALUES ('pricing_visible', TRUE);
