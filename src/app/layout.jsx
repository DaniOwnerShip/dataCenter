import { Inter } from 'next/font/google'
// import './globals.css'
import "./styles/main.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'data center',
  description: 'data center next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
