'use client'

import { useState, useEffect } from 'react'

type Category = '接客' | '調理' | '清掃' | 'その他'

export default function ManualEditor() {
  const [activeCategory, setActiveCategory] = useState<Category>('接客')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>(null)

  const categories: Category[] = ['接客', '調理', '清掃', 'その他']

  useEffect(() => {
    loadManual(activeCategory)
  }, [activeCategory])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (content) {
        saveManual()
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [content])

  const loadManual = async (category: Category) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/manual/${category}`)
      const data = await response.json()
      setContent(data.content || '')
    } catch (error) {
      console.error('Load error:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveManual = async () => {
    setSaveStatus('saving')
    try {
      await fetch(`/api/manual/${activeCategory}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus(null), 2000)
    } catch (error) {
      console.error('Save error:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4 sm:gap-6 border-b overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`pb-3 px-2 text-sm sm:text-base transition-all whitespace-nowrap ${
              activeCategory === category 
                ? 'border-b-2 border-black -mb-[1px]' 
                : 'text-gray-600 hover:text-black'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="relative">
        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[500px] p-6 border resize-none focus:outline-none focus:border-black font-mono text-sm leading-relaxed"
              placeholder="マニュアルを入力してください"
            />
            <div className="absolute top-4 right-4 text-xs text-gray-500">
              {content.length} 文字
            </div>
          </>
        )}
      </div>

      {saveStatus && (
        <div className="flex items-center gap-2 text-sm">
          {saveStatus === 'saving' ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>保存中...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>保存しました</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}