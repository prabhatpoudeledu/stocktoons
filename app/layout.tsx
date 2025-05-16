import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import { AuthProvider } from "@/contexts/auth-context"
import { DisplayModeProvider } from "@/contexts/display-mode-context"
import { Toaster } from "@/components/ui/toaster"

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
          <AuthProvider>
            <DisplayModeProvider>
              <Navbar />
              <main>{children}</main>
              <Toaster />
              <footer className="py-6 text-center text-sm text-muted-foreground bg-secondary/50 border-t border-border">
                <div className="container mx-auto">
                  <div className="hidden md:flex justify-center space-x-6 mb-4">
                    <Link href="/" className="hover:text-primary">
                      Home
                    </Link>
                    <Link href="/learn" className="hover:text-primary">
                      Learn
                    </Link>
                    <Link href="/games" className="hover:text-primary">
                      Games
                    </Link>
                    <Link href="/videos" className="hover:text-primary">
                      Videos
                    </Link>
                    <Link href="/watchlist" className="hover:text-primary">
                      Watchlist
                    </Link>
                  </div>
                  © 2025 StockToons. Made with curiosity & AI.
                </div>
              </footer>
            </DisplayModeProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
