
-- Profiles table for hosts
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', 'Kullanıcı'));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Difficulty enum
CREATE TYPE public.kahoot_difficulty AS ENUM ('temel', 'orta');

-- Room status enum
CREATE TYPE public.kahoot_room_status AS ENUM ('waiting', 'playing', 'finished');

-- Kahoot rooms
CREATE TABLE public.kahoot_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  pin TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL DEFAULT 'Romence Quiz',
  difficulty kahoot_difficulty NOT NULL DEFAULT 'temel',
  status kahoot_room_status NOT NULL DEFAULT 'waiting',
  scheduled_at TIMESTAMPTZ,
  current_question_index INT NOT NULL DEFAULT -1,
  question_count INT NOT NULL DEFAULT 8,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.kahoot_rooms ENABLE ROW LEVEL SECURITY;

-- Anyone can read rooms (players need to see room state via PIN)
CREATE POLICY "Anyone can read rooms" ON public.kahoot_rooms FOR SELECT USING (true);
CREATE POLICY "Auth users can create rooms" ON public.kahoot_rooms FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "Host can update own room" ON public.kahoot_rooms FOR UPDATE USING (auth.uid() = host_id);
CREATE POLICY "Host can delete own room" ON public.kahoot_rooms FOR DELETE USING (auth.uid() = host_id);

-- Kahoot players (unauthenticated players join with nickname)
CREATE TABLE public.kahoot_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES public.kahoot_rooms(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  total_score INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(room_id, nickname)
);

ALTER TABLE public.kahoot_players ENABLE ROW LEVEL SECURITY;

-- Anyone can read/insert players (unauthenticated join)
CREATE POLICY "Anyone can read players" ON public.kahoot_players FOR SELECT USING (true);
CREATE POLICY "Anyone can join as player" ON public.kahoot_players FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update player scores" ON public.kahoot_players FOR UPDATE USING (true);

-- Player limit enforcement via trigger
CREATE OR REPLACE FUNCTION public.enforce_player_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  player_count INT;
BEGIN
  SELECT COUNT(*) INTO player_count FROM public.kahoot_players WHERE room_id = NEW.room_id;
  IF player_count >= 50 THEN
    RAISE EXCEPTION 'Room is full (max 50 players)';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER check_player_limit
  BEFORE INSERT ON public.kahoot_players
  FOR EACH ROW EXECUTE FUNCTION public.enforce_player_limit();

-- Kahoot answers (per question per player)
CREATE TABLE public.kahoot_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID NOT NULL REFERENCES public.kahoot_players(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES public.kahoot_rooms(id) ON DELETE CASCADE,
  question_index INT NOT NULL,
  selected_option INT,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  answer_time_ms INT NOT NULL DEFAULT 0,
  score INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(player_id, room_id, question_index)
);

ALTER TABLE public.kahoot_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read answers" ON public.kahoot_answers FOR SELECT USING (true);
CREATE POLICY "Anyone can insert answers" ON public.kahoot_answers FOR INSERT WITH CHECK (true);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON public.kahoot_rooms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for game state sync
ALTER PUBLICATION supabase_realtime ADD TABLE public.kahoot_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.kahoot_players;
ALTER PUBLICATION supabase_realtime ADD TABLE public.kahoot_answers;
