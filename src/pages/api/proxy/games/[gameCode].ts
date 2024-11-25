import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { gameCode } = req.query

  try {
    const response = await fetch(`https://api.moonwalk.fit/api/games/${gameCode}`, {
      headers: {
        'Accept': 'application/json',
      },
    })

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    res.status(500).json({ error: 'Failed to fetch game data' })
  }
} 