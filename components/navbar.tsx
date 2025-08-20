"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, TrendingUp, BarChart3, Newspaper, User, Home, X, Gamepad2 } from "lucide-react"
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
  { name: "Games", href: "/games", icon: Gamepad2 },
  { name: "News", href: "/news", icon: Newspaper },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const { displayMode } = useDisplayMode()
  const { user } = useAuth()
  const isKidsMode = displayMode === "kids"
  const navItems = isKidsMode ? kidsNavigation : navigation

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-gradient-to-r from-emerald-100 via-blue-100 to-purple-100 border-emerald-200 backdrop-blur-md shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gradient-primary">
                  {isKidsMode ? "StockToons Kids" : "StockToons"}
                </span>
                {isKidsMode && (
                  <span className="text-xs text-emerald-600 -mt-1 font-medium">Learn money the fun way! 🌟</span>
                )}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? "bg-white/80 text-emerald-700 shadow-lg border-2 border-emerald-200"
                        : "text-slate-700 hover:bg-white/60 hover:text-emerald-700 hover:shadow-md"
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
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600" />
              <Input
                type="search"
                placeholder={isKidsMode ? "Search for cool stocks! 🔍" : "Search stocks, news..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/70 border-2 border-emerald-200 text-slate-800 placeholder:text-emerald-600 focus:bg-white focus:border-emerald-400 backdrop-blur-sm rounded-2xl font-medium"
              />
            </form>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <DisplayModeToggle />

            {user ? (
              <UserMenu />
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-700 hover:bg-white/60 hover:text-emerald-700 font-bold rounded-2xl"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="btn-primary px-6">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-slate-700 hover:bg-white/60 rounded-2xl">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-gradient-to-b from-emerald-50 to-blue-50 border-emerald-200"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-emerald-200">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-emerald-800">
                          {isKidsMode ? "StockToons Kids" : "StockToons"}
                        </span>
                        {isKidsMode && (
                          <p className="text-xs text-emerald-600 font-medium">Learn money the fun way! 🌟</p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-slate-600 hover:bg-emerald-100 rounded-xl"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Mobile Search */}
                  <div className="py-4">
                    <form onSubmit={handleSearch} className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600" />
                      <Input
                        type="search"
                        placeholder={isKidsMode ? "Search for cool stocks! 🔍" : "Search stocks, news..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 input-primary font-medium"
                      />
                    </form>
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
                          className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-base font-bold transition-all duration-300 ${
                            isActive
                              ? "bg-white text-emerald-800 shadow-lg border-2 border-emerald-200"
                              : "text-slate-700 hover:bg-white/60 hover:text-emerald-700"
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
                    <div className="pt-6 border-t border-emerald-200 space-y-3">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-slate-700 hover:bg-white/60 font-bold rounded-2xl"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        <Button className="w-full btn-primary">Sign Up</Button>
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
