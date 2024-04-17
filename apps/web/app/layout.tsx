import type { Metadata } from 'next'
import { Inter, Merriweather, Noto_Sans_Georgian } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { auth } from '../auth'
import './globals.css'
import { Toaster } from '../components/ui/sonner'
import { ThemeProvider } from '@/components/providers/theme-provider'

const inter = Merriweather({
  subsets: ['latin'],
  weight: '300'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="stream">


          <Toaster />
          {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  )
}