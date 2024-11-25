export interface MoonwalkGame {
  id: string
  game_code: string
  public_key: string
  authority: string
  name: string
  description: string | null
  step_goal: number
  duration_days: number
  stake_amount: number
  stake_token: string
  player_limit: number
  current_players: number
  start_date: string
  end_date: string
  status: string
  logo_url: string | null
  telegram_url: string | null
  created_at: string
  updated_at: string
  last_synced_at: string
} 