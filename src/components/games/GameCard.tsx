import React from 'react'
import Image from 'next/image'
import type { MoonwalkGame } from '../../types/game.types'
import { tokenService } from '../../services/tokenService'

interface GameCardProps {
  game: MoonwalkGame
}

export function GameCard({ game }: GameCardProps) {
  const tokenLogo = tokenService.getTokenLogo(game.stake_token)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric'
    }).replace('/', '/')
  }

  const calculateDays = () => {
    const start = new Date(game.start_date)
    const end = new Date(game.end_date)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return `${diffDays} DAYS`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  const handleJoinClick = () => {
    window.open(`https://app.moonwalk.fit/game/${game.game_code}`, '_blank')
  }

  return (
    <div className="bg-[#1E293B] rounded-xl overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            {game.logo_url ? (
              <Image
                src={game.logo_url}
                alt={game.name}
                width={44}
                height={44}
                className="rounded-full"
                unoptimized
              />
            ) : (
              <div className="w-11 h-11 bg-gray-600 rounded-full" />
            )}
            <span className="text-white text-lg">{game.name}</span>
          </div>
          <button 
            onClick={handleJoinClick}
            className="bg-[#00E5FF] hover:opacity-90 text-black px-6 py-1.5 rounded-full text-sm font-medium transition-opacity"
          >
            JOIN
          </button>
        </div>

        {/* Game Info Grid */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-gray-400 uppercase text-xs tracking-wider mb-2">ENTRY</div>
            <div className="text-white flex items-center space-x-2">
              {tokenLogo ? (
                <div className="relative w-5 h-5 flex-shrink-0">
                  <Image
                    src={tokenLogo}
                    alt={game.stake_token}
                    fill
                    className="rounded-full object-contain"
                    unoptimized
                  />
                </div>
              ) : null}
              <span className="text-lg font-medium">{formatNumber(game.stake_amount)}</span>
              {!tokenLogo && <span className="text-gray-400">{game.stake_token}</span>}
            </div>
          </div>

          <div className="min-w-[120px]">
            <div className="text-gray-400 uppercase text-xs tracking-wider mb-2">{calculateDays()}</div>
            <div className="text-white text-base whitespace-nowrap">
              11/25 - 11/29
            </div>
          </div>

          <div>
            <div className="text-gray-400 uppercase text-xs tracking-wider mb-2">STEPS</div>
            <div className="text-white text-lg">
              {(game.step_goal / 1000).toFixed(0)}k
            </div>
          </div>

          <div>
            <div className="text-gray-400 uppercase text-xs tracking-wider mb-2">PLAYERS</div>
            <div className="text-white text-lg">
              {formatNumber(game.current_players || 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 