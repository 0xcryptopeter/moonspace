-- Create moonwalk_games table
CREATE TABLE moonwalk_games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_code TEXT UNIQUE NOT NULL,
  public_key TEXT NOT NULL,
  authority TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  step_goal INTEGER NOT NULL,
  duration_days INTEGER NOT NULL,
  stake_amount DECIMAL NOT NULL,
  stake_token TEXT NOT NULL,
  player_limit INTEGER NOT NULL,
  current_players INTEGER NOT NULL DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL,
  logo_url TEXT,
  telegram_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index
CREATE INDEX idx_moonwalk_games_code ON moonwalk_games(game_code); 