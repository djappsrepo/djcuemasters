-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'dj', 'cliente');

-- Create enum for request status
CREATE TYPE public.request_status AS ENUM ('pending', 'playing', 'played', 'rejected', 'archived');

-- Create enum for payment status
CREATE TYPE public.payment_status AS ENUM ('pending', 'awaiting_payment', 'completed', 'failed', 'refunded');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  role app_role NOT NULL DEFAULT 'cliente',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id),
  UNIQUE(email)
);

-- Create DJ profiles table
CREATE TABLE public.dj_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stage_name TEXT NOT NULL,
  bio TEXT,
  minimum_tip DECIMAL(10,2) NOT NULL DEFAULT 2.00,
  active BOOLEAN NOT NULL DEFAULT true,
  stripe_account_id TEXT,
  qr_code_url TEXT,
  total_earnings DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  total_requests INTEGER NOT NULL DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create DJ events table
CREATE TABLE public.dj_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dj_id UUID REFERENCES public.dj_profiles(user_id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  venue TEXT,
  event_date TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT false,
  total_earnings DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  total_requests INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create music requests table
CREATE TABLE public.music_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dj_id UUID REFERENCES public.dj_profiles(user_id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES public.dj_events(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  client_email TEXT,
  song_title TEXT NOT NULL,
  artist_name TEXT NOT NULL,
  tip_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  status request_status NOT NULL DEFAULT 'pending',
  payment_status payment_status NOT NULL DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  played_at TIMESTAMPTZ,
  message TEXT,
  priority_score INTEGER GENERATED ALWAYS AS (
    CASE 
      WHEN tip_amount > 0 THEN CAST(tip_amount * 100 AS INTEGER) + EXTRACT(EPOCH FROM (now() - created_at))::INTEGER / 60
      ELSE EXTRACT(EPOCH FROM (now() - created_at))::INTEGER / 60
    END
  ) STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES public.music_requests(id) ON DELETE CASCADE NOT NULL,
  dj_id UUID REFERENCES public.dj_profiles(user_id) ON DELETE CASCADE NOT NULL,
  stripe_payment_intent_id TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status payment_status NOT NULL DEFAULT 'pending',
  stripe_fee DECIMAL(10,2),
  net_amount DECIMAL(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(stripe_payment_intent_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dj_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dj_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.music_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role FROM public.profiles WHERE user_id = user_uuid;
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role = 'admin' FROM public.profiles WHERE user_id = user_uuid;
$$;

-- Create function to check if user is DJ
CREATE OR REPLACE FUNCTION public.is_dj(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role = 'dj' FROM public.profiles WHERE user_id = user_uuid;
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Allow profile creation" ON public.profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- RLS Policies for dj_profiles
CREATE POLICY "DJs can view own profile" ON public.dj_profiles
  FOR SELECT USING (user_id = auth.uid() OR public.is_admin(auth.uid()));

CREATE POLICY "DJs can update own profile" ON public.dj_profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Allow DJ profile creation" ON public.dj_profiles
  FOR INSERT WITH CHECK (user_id = auth.uid() AND public.is_dj(auth.uid()));

CREATE POLICY "Public can view active DJ profiles" ON public.dj_profiles
  FOR SELECT USING (active = true);

-- RLS Policies for dj_events
CREATE POLICY "DJs can manage own events" ON public.dj_events
  FOR ALL USING (dj_id = auth.uid() OR public.is_admin(auth.uid()));

CREATE POLICY "Public can view active events" ON public.dj_events
  FOR SELECT USING (is_active = true);

-- RLS Policies for music_requests
CREATE POLICY "DJs can view own requests" ON public.music_requests
  FOR SELECT USING (dj_id = auth.uid() OR public.is_admin(auth.uid()));

CREATE POLICY "DJs can update own requests" ON public.music_requests
  FOR UPDATE USING (dj_id = auth.uid());

CREATE POLICY "Anyone can create requests" ON public.music_requests
  FOR INSERT WITH CHECK (true);

-- RLS Policies for payments
CREATE POLICY "DJs can view own payments" ON public.payments
  FOR SELECT USING (dj_id = auth.uid() OR public.is_admin(auth.uid()));

CREATE POLICY "System can manage payments" ON public.payments
  FOR ALL USING (true);

-- Create trigger function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dj_profiles_updated_at
  BEFORE UPDATE ON public.dj_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dj_events_updated_at
  BEFORE UPDATE ON public.dj_events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_music_requests_updated_at
  BEFORE UPDATE ON public.music_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE((NEW.raw_user_meta_data ->> 'role')::app_role, 'cliente')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_dj_profiles_user_id ON public.dj_profiles(user_id);
CREATE INDEX idx_dj_profiles_active ON public.dj_profiles(active);
CREATE INDEX idx_dj_events_dj_id ON public.dj_events(dj_id);
CREATE INDEX idx_dj_events_active ON public.dj_events(is_active);
CREATE INDEX idx_music_requests_dj_id ON public.music_requests(dj_id);
CREATE INDEX idx_music_requests_status ON public.music_requests(status);
CREATE INDEX idx_music_requests_priority ON public.music_requests(priority_score DESC);
CREATE INDEX idx_payments_dj_id ON public.payments(dj_id);
CREATE INDEX idx_payments_request_id ON public.payments(request_id);