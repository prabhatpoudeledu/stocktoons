"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"
import { UserMenu } from "@/components/user-menu"
import { DisplayModeToggle } from "@/components/display-mode-toggle"
import { useDisplayMode } from "@/contexts/display-mode-context"
import NavbarSearch from "@/components/navbar-search"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()
  const { displayMode } = useDisplayMode()

  // Different nav links based on display mode
  const navLinks =
    displayMode === "kids"
      ? [
          { name: "Home", path: "/" },
          { name: "Learn", path: "/learn" },
          { name: "Games", path: "/games" },
          { name: "Videos", path: "/videos" },
          { name: "News", path: "/news" },
          { name: "Watchlist", path: "/watchlist" },
        ]
      : [
          { name: "Home", path: "/" },
          { name: "Learn", path: "/learn" },
          { name: "Analysis", path: "/analysis" },
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
                <div className="mt-4 pt-4 border-t border-border">
                  <DisplayModeToggle />
                </div>
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
          <div className="hidden md:block mr-2">
            <DisplayModeToggle variant="minimal" />
          </div>

          <div className="hidden sm:block">
            <NavbarSearch
              className="w-[180px] pl-9 rounded-full md:w-[200px] lg:w-[300px] bg-secondary/50 border-border focus:border-primary"
              placeholder="Search stocks"
            />
          </div>

          <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => router.push("/search")}>
            <Search className="h-5 w-5" />
          </Button>

          {user ? (
            <UserMenu />
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
