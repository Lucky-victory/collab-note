import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AblyProviderWrapper } from '@/providers/ably-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Collab-Note',
  description: 'Collaborate in notes, write notes together',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AblyProviderWrapper>

        {children}
        </AblyProviderWrapper>
      
      </body>
    </html>
  )
}
