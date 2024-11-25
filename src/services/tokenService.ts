interface TokenInfo {
  id: string
  name: string
  symbol: string
  decimals: number
  logo: string
}

const TOKEN_LOGOS: Record<string, string> = {
  'BONK': 'https://s2.coinmarketcap.com/static/img/coins/64x64/23095.png',
  'USDC': 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
  'SOL': 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png'
}

const TOKENS: TokenInfo[] = [
  {
    id: 'bonk',
    name: 'Bonk',
    symbol: 'BONK',
    decimals: 5,
    logo: TOKEN_LOGOS['BONK']
  },
  {
    id: 'usdc',
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    logo: TOKEN_LOGOS['USDC']
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    decimals: 9,
    logo: TOKEN_LOGOS['SOL']
  }
]

export const tokenService = {
  async getTokens(): Promise<TokenInfo[]> {
    return TOKENS
  },

  getTokenLogo(symbol: string): string | undefined {
    return TOKEN_LOGOS[symbol.toUpperCase()]
  }
} 