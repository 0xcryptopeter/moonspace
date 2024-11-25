import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { GameCard } from '../components/games/GameCard'
import { GameFilters } from '../components/games/GameFilters'
import { gameService } from '../services/gameService'
import type { MoonwalkGame } from '../types/game.types'

export default function HomePage() {
  const [games, setGames] = useState<MoonwalkGame[]>([])
  const [filters, setFilters] = useState({
    status: '',
    stake_token: '',
    sort_by: 'created_at'
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadGames()
  }, [filters])

  async function loadGames() {
    try {
      setIsLoading(true)
      const data = await gameService.getGames(filters)
      setGames(data || [])
    } catch (error) {
      console.error('Failed to load games:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1122] via-[#132347] to-[#1D366B]">
      <div className="min-h-screen bg-opacity-95">
        <Navbar onGameAdded={loadGames} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Upcoming Public Games</h1>
            <GameFilters 
              filters={filters}
              onChange={setFilters}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <span className="text-gray-300">Loading games...</span>
            </div>
          ) : games.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No games found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map(game => (
                <GameCard 
                  key={game.id}
                  game={game}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
} 