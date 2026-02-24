-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  points BIGINT DEFAULT 0,
  click_power INT DEFAULT 1,
  upgrades JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to handle updated_at
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();

-- Ensure columns exist if table was already created without them
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS rebirths INT DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS points BIGINT DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS click_power INT DEFAULT 1;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS upgrades JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS weapon_id TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS weapon_multi FLOAT DEFAULT 1.0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS unlocked_weapons JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS prestige INT DEFAULT 0;

-- Ensure username uniqueness (already set in table definition, but just in case)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_username_key') THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_username_key UNIQUE (username);
  END IF;
END $$;

-- Optional: Create a leaderboard view for convenience
CREATE OR REPLACE VIEW public.leaderboard AS
  SELECT username, points, rebirths, prestige, weapon_id
  FROM public.profiles
  ORDER BY prestige DESC, rebirths DESC, points DESC
  LIMIT 50;
