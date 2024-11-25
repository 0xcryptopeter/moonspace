import React from 'react'
import { Dialog } from '@headlessui/react'
import { gameService } from '../../services/gameService'
import { PostgrestError } from '@supabase/supabase-js'

interface UploadGameModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function UploadGameModal({ isOpen, onClose, onSuccess }: UploadGameModalProps) {
  const [gameCode, setGameCode] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await gameService.importGameByCode(gameCode)
      setGameCode('')
      onClose()
      onSuccess?.()
    } catch (err) {
      console.error('Upload error:', err)
      
      if (err instanceof Error) {
        if (err.message === 'GAME_EXISTS') {
          setError('This game has already been added to Moonspace.')
        } else if (err.message.includes('404') || err.message.includes('Failed to fetch game data')) {
          setError('Game not found. Please check if the game code is correct.')
        } else {
          setError('An error occurred while importing the game. Please try again.')
        }
      } else {
        setError('An error occurred while importing the game. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Upload Moonwalk Game
          </Dialog.Title>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Game Code
              </label>
              <input
                type="text"
                value={gameCode}
                onChange={e => setGameCode(e.target.value)}
                placeholder="Enter game code (e.g., X8aRSe1d)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {isLoading ? 'Uploading...' : 'Upload Game'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  )
} 