import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ludeek bot',
  description: '飲食店向けマニュアルチャットボット',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="font-sans">{children}</body>
    </html>
  )
}