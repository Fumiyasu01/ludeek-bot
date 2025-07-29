'use client'

import { useState } from 'react'

type Message = {
  id: string
  question: string
  answer: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    setLoading(true)
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      })
      
      const data = await response.json()
      
      setMessages(prev => [...prev, {
        id: data.id,
        question: input,
        answer: data.answer,
      }])
      setInput('')
    } catch (error) {
      console.error('Chat error:', error)
      // トースト通知を実装予定
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="min-h-[400px] max-h-[600px] overflow-y-auto p-6 bg-white border rounded-none">
        {messages.length === 0 ? (
          <div className="text-gray-500 text-center py-20">
            質問を入力してください
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="font-medium shrink-0">Q:</span>
                  <div className="flex-1">{message.question}</div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-medium shrink-0">A:</span>
                  <div className="flex-1 whitespace-pre-wrap">{message.answer}</div>
                </div>
                <div className="border-b pt-3"></div>
              </div>
            ))}
          </div>
        )}
        {loading && (
          <div className="flex items-center gap-3 mt-6">
            <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="質問を入力してください"
          className="flex-1 px-4 py-3 border focus:outline-none focus:border-black"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-8 py-3 bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto w-full"
        >
          送信
        </button>
      </form>
    </div>
  )
}