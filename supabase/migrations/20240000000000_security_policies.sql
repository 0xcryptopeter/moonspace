-- Enable RLS
ALTER TABLE moonwalk_games ENABLE ROW LEVEL SECURITY;

-- Games policies
CREATE POLICY "Games are viewable by everyone"
ON moonwalk_games FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert games"
ON moonwalk_games FOR INSERT
WITH CHECK (true); 