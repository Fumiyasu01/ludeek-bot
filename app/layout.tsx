import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ludeek bot',
  description: '飲食店向けマニュアルチャットボット',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  manifest: '/manifest.json',
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