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
    <nav
      className={`sticky top-0 z-50 w-full border-b ${
        displayMode === "kids"
          ? "border-green-200 bg-gradient-to-r from-green-50 to-blue-50 shadow-sm"
          : "border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild className="md:hidden mr-2">
              <Button variant="ghost" size="icon" className={displayMode === "kids" ? "hover:bg-green-100" : ""}>
                <Menu className={`h-5 w-5 ${displayMode === "kids" ? "text-green-700" : ""}`} />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className={displayMode === "kids" ? "bg-gradient-to-b from-green-50 to-blue-50" : ""}
            >
              <SheetHeader>
                <SheetTitle className={displayMode === "kids" ? "text-green-700 text-xl font-bold" : ""}>
                  {displayMode === "kids" ? "StockToons Kids" : "StockToons"}
                </SheetTitle>
                <SheetDescription className={displayMode === "kids" ? "text-green-600" : "text-muted-foreground"}>
                  {displayMode === "kids" ? "Learn about money in a fun way!" : "Learn, Play, and Invest"}
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-base font-medium transition-colors ${
                      displayMode === "kids"
                        ? pathname === link.path
                          ? "text-green-700 font-bold"
                          : "text-green-600 hover:text-green-700"
                        : pathname === link.path
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={() => document.body.click()} // Close sheet on navigation
                  >
                    {link.name}
                  </Link>
                ))}
                <div className={`mt-4 pt-4 ${displayMode === "kids" ? "border-green-200" : "border-border"} border-t`}>
                  <DisplayModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center">
            <span
              className={`text-2xl font-bold ${
                displayMode === "kids"
                  ? "text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text"
                  : ""
              }`}
            >
              {displayMode === "kids" ? "StockToons Kids" : "StockToons"}
            </span>
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:gap-6 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm font-medium transition-colors ${
                displayMode === "kids"
                  ? pathname === link.path
                    ? "text-green-700 font-bold"
                    : "text-green-600 hover:text-green-700"
                  : pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
              }`}
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
              className={`w-[180px] pl-9 rounded-full md:w-[200px] lg:w-[300px] ${
                displayMode === "kids"
                  ? "bg-white/80 border-green-200 focus:border-green-400 placeholder:text-green-500"
                  : "bg-secondary/50 border-border focus:border-primary"
              }`}
              placeholder={displayMode === "kids" ? "Search for stocks!" : "Search stocks"}
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={`sm:hidden ${displayMode === "kids" ? "hover:bg-green-100" : ""}`}
            onClick={() => router.push("/search")}
          >
            <Search className={`h-5 w-5 ${displayMode === "kids" ? "text-green-700" : ""}`} />
          </Button>

          {user ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className={displayMode === "kids" ? "text-green-700 hover:bg-green-100" : ""}
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <Button
                className={
                  displayMode === "kids"
                    ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold"
                    : "bg-primary hover:bg-primary/90"
                }
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
