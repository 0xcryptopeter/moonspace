import React from 'react'

interface GameFiltersProps {
  filters: {
    status: string
    stake_token: string
    sort_by: string
  }
  onChange: (filters: any) => void
}

export function GameFilters({ filters, onChange }: GameFiltersProps) {
  return (
    <div className="flex gap-4">
      <select
        value={filters.status}
        onChange={e => onChange({ ...filters, status: e.target.value })}
        className="bg-[#1E293B] text-white border border-gray-600 rounded-md px-3 py-2"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="draft">Draft</option>
      </select>

      <select
        value={filters.stake_token}
        onChange={e => onChange({ ...filters, stake_token: e.target.value })}
        className="bg-[#1E293B] text-white border border-gray-600 rounded-md px-3 py-2"
      >
        <option value="">All Tokens</option>
        <option value="usdc">USDC</option>
        <option value="sol">SOL</option>
        <option value="bonk">BONK</option>
      </select>

      <select
        value={filters.sort_by}
        onChange={e => onChange({ ...filters, sort_by: e.target.value })}
        className="bg-[#1E293B] text-white border border-gray-600 rounded-md px-3 py-2"
      >
        <option value="created_at">Recently Added</option>
        <option value="start_date">Start Date</option>
      </select>
    </div>
  )
} 