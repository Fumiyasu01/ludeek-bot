'use client'

import { useState } from 'react'
import ChatInterface from '@/app/components/ChatInterface'
import ManualEditor from '@/app/components/ManualEditor'
import ModeToggle from '@/app/components/ModeToggle'

export default function Home() {
  const [mode, setMode] = useState<'chat' | 'edit'>('chat')

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8">
        <header className="mb-6 sm:mb-12">
          <h1 className="text-center mb-4 sm:mb-8 text-xl sm:text-2xl tracking-wide">Ludeek bot</h1>
          <ModeToggle mode={mode} setMode={setMode} />
        </header>
        
        <main className="animate-in fade-in duration-300">
          {mode === 'chat' ? <ChatInterface /> : <ManualEditor />}
        </main>
        
        <footer className="mt-16 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Ludeek bot
        </footer>
      </div>
    </div>
  )
}