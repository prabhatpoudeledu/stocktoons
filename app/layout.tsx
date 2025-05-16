import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StockToons - Make Finance Fun",
  description: "Learn, Play, and Invest with AI-powered tools for all ages",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          <main>{children}</main>
          <footer className="py-6 text-center text-sm text-muted-foreground bg-background">
            © 2025 StockToons. Made with curiosity & AI.
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
