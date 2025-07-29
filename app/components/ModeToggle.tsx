type ModeToggleProps = {
  mode: 'chat' | 'edit'
  setMode: (mode: 'chat' | 'edit') => void
}

export default function ModeToggle({ mode, setMode }: ModeToggleProps) {
  return (
    <div className="flex justify-center gap-8 border-b">
      <button
        onClick={() => setMode('chat')}
        className={`pb-3 px-2 text-base transition-all ${
          mode === 'chat' 
            ? 'border-b-2 border-black -mb-[1px]' 
            : 'text-gray-600 hover:text-black'
        }`}
      >
        チャット
      </button>
      <button
        onClick={() => setMode('edit')}
        className={`pb-3 px-2 text-base transition-all ${
          mode === 'edit' 
            ? 'border-b-2 border-black -mb-[1px]' 
            : 'text-gray-600 hover:text-black'
        }`}
      >
        マニュアル編集
      </button>
    </div>
  )
}