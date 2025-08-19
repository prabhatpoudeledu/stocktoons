"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, TrendingUp, BarChart3, Newspaper, User, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserMenu } from "./user-menu"
import { DisplayModeToggle } from "./display-mode-toggle"
import { useDisplayMode } from "@/contexts/display-mode-context"
import { useAuth } from "@/contexts/auth-context"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Stocks", href: "/stocks/categories", icon: TrendingUp },
  { name: "Analysis", href: "/analysis", icon: BarChart3 },
  { name: "News", href: "/news", icon: Newspaper },
]

const kidsNavigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Stocks", href: "/kids/stocks/categories", icon: TrendingUp },
  { name: "Games", href: "/games", icon: BarChart3 },
  { name: "News", href: "/news", icon: Newspaper },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { displayMode } = useDisplayMode()
  const { user } = useAuth()
  const isKidsMode = displayMode === "kids"
  const navItems = isKidsMode ? kidsNavigation : navigation

  return (
    <nav className="sticky top-0 z-50 border-b bg-gradient-to-r from-purple-200 via-pink-200 via-blue-200 to-green-200 border-purple-200 backdrop-blur-md shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/30 text-purple-700">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
                  {isKidsMode ? "StockToons Kids" : "StockToons"}
                </span>
                {isKidsMode && <span className="text-xs text-purple-600 -mt-1">Learn about money in a fun way!</span>}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white/30 text-purple-800 shadow-lg"
                        : "text-purple-700 hover:bg-white/20 hover:text-purple-800"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-600" />
              <Input
                type="search"
                placeholder={isKidsMode ? "Search for stocks! 🔍" : "Search stocks, news..."}
                className="pl-10 bg-white/30 border-purple-300 text-purple-800 placeholder:text-purple-600 focus:bg-white/40 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <DisplayModeToggle />

            {user ? (
              <UserMenu />
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-purple-700 hover:bg-white/20 hover:text-purple-800">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-white/30 text-purple-700 hover:bg-white/40 border border-purple-300">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-purple-700 hover:bg-white/20">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-gradient-to-b from-purple-100 to-pink-100 border-purple-200"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-purple-200">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/30">
                        <TrendingUp className="h-5 w-5 text-purple-700" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-purple-800">
                          {isKidsMode ? "StockToons Kids" : "StockToons"}
                        </span>
                        {isKidsMode && <p className="text-xs text-purple-600">Learn about money in a fun way!</p>}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Search */}
                  <div className="py-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-600" />
                      <Input
                        type="search"
                        placeholder={isKidsMode ? "Search for stocks! 🔍" : "Search stocks, news..."}
                        className="pl-10 bg-white/30 border-purple-300 text-purple-800 placeholder:text-purple-600 focus:bg-white/40"
                      />
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 space-y-2">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                            isActive
                              ? "bg-white/30 text-purple-800 shadow-lg"
                              : "text-purple-700 hover:bg-white/20 hover:text-purple-800"
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      )
                    })}
                  </div>

                  {/* Mobile Auth */}
                  {!user && (
                    <div className="pt-6 border-t border-purple-200 space-y-3">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-purple-700 hover:bg-white/20">
                          <User className="h-4 w-4 mr-2" />
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-white/30 text-purple-700 hover:bg-white/40 border border-purple-300">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
