import { supabase } from '../lib/supabase'
import { moonwalkApi } from './moonwalkApi'

export const gameService = {
  async importGameByCode(gameCode: string) {
    try {
      console.log('Importing game:', gameCode)
      
      // 先检查游戏是否已存在
      const { data: existingGame } = await supabase
        .from('moonwalk_games')
        .select('game_code')
        .eq('game_code', gameCode)
        .single()

      if (existingGame) {
        throw new Error('GAME_EXISTS')
      }

      // 获取游戏数据
      const moonwalkGame = await moonwalkApi.getGameByCode(gameCode)
      if (!moonwalkGame) {
        throw new Error('Game not found')
      }

      // 获取玩家数量
      const playerCount = await moonwalkApi.getGamePlayers(gameCode)
      
      const gameData = {
        game_code: moonwalkGame.code,
        public_key: moonwalkGame.publicKey,
        authority: moonwalkGame.authority,
        name: moonwalkGame.name,
        description: moonwalkGame.description || '',
        step_goal: moonwalkGame.quantityPerDay,
        duration_days: 1,
        stake_amount: moonwalkGame.playerDeposit,
        stake_token: moonwalkGame.currency,
        player_limit: moonwalkGame.playerLimit,
        start_date: new Date(moonwalkGame.blocktimeStart * 1000).toISOString(),
        end_date: new Date(moonwalkGame.blocktimeEnd * 1000).toISOString(),
        status: moonwalkGame.status,
        logo_url: moonwalkGame.logo || null,
        telegram_url: moonwalkGame.telegramUrl || null,
        current_players: playerCount
      }

      console.log('Saving game data:', gameData)

      const { data, error } = await supabase
        .from('moonwalk_games')
        .insert(gameData)
        .select()
        .single()
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error in importGameByCode:', error)
      throw error
    }
  },

  async getGames(filters: { 
    status?: string; 
    stake_token?: string;
    sort_by?: string;
  } = {}) {
    let query = supabase
      .from('moonwalk_games')
      .select('*')
    
    if (filters.status && filters.status !== '') {
      query = query.eq('status', filters.status)
    }
    
    if (filters.stake_token && filters.stake_token !== '') {
      query = query.ilike('stake_token', filters.stake_token)
    }
    
    // 根据选择的字段排序
    switch (filters.sort_by) {
      case 'start_date':
        query = query.order('start_date', { ascending: true })
        break
      case 'created_at':
      default:
        query = query.order('created_at', { ascending: false })
        break
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  }
} 