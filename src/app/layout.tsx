import Providers from '@/context/Providers'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Navbar from '../components/Navbar'
import './globals.css'
import { ReactQueryProvider } from './ReactQueryProvider'

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'eShop',
  description: 'eShop for find your lovely product',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryProvider>
      <Providers>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased px-3`}
          >
            <Navbar />
            {children}
          </body>
        </html>
      </Providers>
    </ReactQueryProvider>
  )
}
