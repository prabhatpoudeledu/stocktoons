import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { DisplayModeProvider } from "@/contexts/display-mode-context"
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/footer"
import { KidsThemeWrapper } from "@/components/kids-theme-wrapper"

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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            <DisplayModeProvider>
              <KidsThemeWrapper>
                <Navbar />
                <main>{children}</main>
                <Toaster />
                <Footer />
              </KidsThemeWrapper>
            </DisplayModeProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
