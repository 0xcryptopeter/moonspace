interface MoonwalkGamePlayer {
  userPb: string
  user: {
    imageUrl: string
    accountPublicKey: string
    name: string
    telegramUsername: string | null
  }
}

interface MoonwalkGame {
  id: string
  code: string
  publicKey: string
  authority: string
  name: string
  description: string
  quantityPerDay: number
  playerSize: number
  playerDeposit: number
  currency: string
  playerLimit: number
  blocktimeStart: number
  blocktimeEnd: number
  status: string
  logo: string
  telegramUrl: string
}

export const moonwalkApi = {
  async getGameByCode(gameCode: string): Promise<MoonwalkGame> {
    try {
      console.log('Fetching game:', gameCode)
      const response = await fetch(`https://api.moonwalk.fit/api/games/${gameCode}`)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error:', errorText)
        throw new Error(`Failed to fetch game data: ${response.status}`)
      }

      const data = await response.json()
      if (!data.val) {
        throw new Error('Invalid game data received')
      }

      console.log('Game data:', data.val)
      return data.val
    } catch (error) {
      console.error('Error in getGameByCode:', error)
      throw error
    }
  },

  async getGamePlayers(gameCode: string): Promise<number> {
    try {
      let totalPlayers = 0
      let hasMore = true
      let skip = 0
      const take = 20

      while (hasMore) {
        console.log(`Fetching players: skip=${skip}, take=${take}`)
        const response = await fetch(
          `https://api.moonwalk.fit/api/user-games/web/${gameCode}?skip=${skip}&take=${take}`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch game players')
        }

        const data = await response.json()
        const players = data.val || []
        
        if (players.length === 0) {
          hasMore = false
          break
        }

        totalPlayers += players.length
        skip += take
        hasMore = players.length === take
      }

      console.log(`Total players found: ${totalPlayers}`)
      return totalPlayers
    } catch (error) {
      console.error('Error in getGamePlayers:', error)
      return 0
    }
  }
} 