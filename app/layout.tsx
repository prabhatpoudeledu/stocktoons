import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { DisplayModeProvider } from "@/contexts/display-mode-context"
import { KidsThemeWrapper } from "@/components/kids-theme-wrapper"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StockToons - Learn Investing the Fun Way",
  description:
    "A colorful and engaging platform to learn about stocks, investing, and financial literacy for all ages.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            <DisplayModeProvider>
              <KidsThemeWrapper>
                <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </KidsThemeWrapper>
            </DisplayModeProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
