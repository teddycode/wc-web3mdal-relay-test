import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/styles/globals.css'
import Web3ModalProvider from '@/context/Web3Modal'

const abcDiatype = localFont({
  src: [
    {
      path: '../public/fonts/ABCDiatype-Regular.woff2',
      weight: '400'
    },
    {
      path: '../public/fonts/ABCDiatype-Bold.woff2',
      weight: '700'
    }
  ],
  variable: '--font-abcDiatype'
})

export const metadata: Metadata = {
  title: 'Web3Modal | Demo',
  description:
    'Web3Modal is an elegantly simple yet powerful library that helps you manage your multi-chain wallet connection flows, all in one place.',
  openGraph: {
    description:
      'Your on-ramp to web3 multichain. Web3Modal is a versatile library that makes it super easy to connect users with your Dapp and start interacting with the blockchain.'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={abcDiatype.className}>
        <Web3ModalProvider>{children}</Web3ModalProvider>
      </body>
    </html>
  )
}
