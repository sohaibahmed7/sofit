import './globals.css'
// import { Inter } from 'next/font/google'
// import { Ubuntu } from 'next/font/google'
import { Rubik } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
// const inter = Ubuntu({ subsets: ['latin'], weight: '400' })
const inter = Rubik({ subsets: ['latin'], weight: '400' })


export const metadata = {
  title: 'Sofit',
  description: `Your workouts, that's all you need.`,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
