"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/stocks/${searchQuery.toUpperCase()}`)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold">StockToons</span>
        </Link>

        <div className="hidden md:flex md:w-1/3 lg:w-1/4">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks or topics"
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <div className="hidden md:flex md:items-center md:gap-4">
          <Link
            href="/"
            className={`text-sm font-medium ${
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            } transition-colors hover:text-primary`}
          >
            Home
          </Link>
          <Link
            href="/learn"
            className={`text-sm font-medium ${
              pathname === "/learn" ? "text-primary" : "text-muted-foreground"
            } transition-colors hover:text-primary`}
          >
            Learn
          </Link>
          <Link
            href="/games"
            className={`text-sm font-medium ${
              pathname === "/games" ? "text-primary" : "text-muted-foreground"
            } transition-colors hover:text-primary`}
          >
            Games
          </Link>
          <Link
            href="/videos"
            className={`text-sm font-medium ${
              pathname === "/videos" ? "text-primary" : "text-muted-foreground"
            } transition-colors hover:text-primary`}
          >
            Videos
          </Link>
          <Link
            href="/watchlist"
            className={`text-sm font-medium ${
              pathname === "/watchlist" ? "text-primary" : "text-muted-foreground"
            } transition-colors hover:text-primary`}
          >
            Watchlist
          </Link>
          <Button className="ml-4 bg-blue-600 hover:bg-blue-700">Log In</Button>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/search")}>
            <Search className="h-5 w-5" />
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Log In</Button>
        </div>
      </div>
    </nav>
  )
}
