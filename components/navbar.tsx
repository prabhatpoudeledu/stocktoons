"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Menu, User, LogOut, Settings, Star } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/stocks/${searchQuery.toUpperCase()}`)
    }
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Learn", path: "/learn" },
    { name: "Games", path: "/games" },
    { name: "Videos", path: "/videos" },
    { name: "News", path: "/news" },
    { name: "Watchlist", path: "/watchlist" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild className="md:hidden mr-2">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>StockToons</SheetTitle>
                <SheetDescription className="text-muted-foreground">Learn, Play, and Invest</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-base font-medium ${
                      pathname === link.path ? "text-primary" : "text-muted-foreground"
                    } transition-colors hover:text-primary`}
                    onClick={() => document.body.click()} // Close sheet on navigation
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">StockToons</span>
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:gap-6 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm font-medium ${
                pathname === link.path ? "text-primary" : "text-muted-foreground"
              } transition-colors hover:text-primary`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks"
              className="w-[180px] pl-9 rounded-full md:w-[200px] lg:w-[300px] bg-secondary/50 border-border focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => router.push("/search")}>
            <Search className="h-5 w-5" />
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full cursor-pointer focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background hover:ring-2 hover:ring-primary hover:ring-opacity-50"
                  aria-label="Open user menu"
                >
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={user.avatar || "/placeholder.svg?height=40&width=40&text=U"}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={user.avatar || "/placeholder.svg?height=48&width=48&text=U"}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    <div className="mt-1">
                      <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 text-xs">
                        {user.plan === "premium" ? "Premium" : "Free"} Plan
                      </Badge>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push("/profile")}
                  className="cursor-pointer hover:bg-secondary focus:bg-secondary"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/watchlist")}
                  className="cursor-pointer hover:bg-secondary focus:bg-secondary"
                >
                  <Star className="mr-2 h-4 w-4" />
                  <span>My Watchlist</span>
                  {user.watchlist.length > 0 && (
                    <Badge className="ml-auto bg-primary text-white text-xs">{user.watchlist.length}</Badge>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/profile?tab=preferences")}
                  className="cursor-pointer hover:bg-secondary focus:bg-secondary"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-500 hover:bg-secondary focus:bg-secondary"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => router.push("/login")}>
                Login
              </Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => router.push("/signup")}>
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
