import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { UploadGameModal } from '../games/UploadGameModal'

interface NavbarProps {
  onGameAdded?: () => void
}

export function Navbar({ onGameAdded }: NavbarProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <nav className="bg-[#0F172A] py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <Image
                src="/moonspace-logo.png"
                alt="Moonspace"
                width={40}
                height={40}
                className="rounded-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xl font-bold leading-none">Moonspace</span>
              <span className="text-gray-400 text-xs">Community Games</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#00E5FF] text-[#0F172A] px-4 py-2 rounded-md flex items-center space-x-2 hover:opacity-90 transition-opacity font-medium"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Upload Game</span>
          </button>
        </div>

        <UploadGameModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={onGameAdded}
        />
      </div>
    </nav>
  )
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
} 