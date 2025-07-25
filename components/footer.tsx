"use client"

import Link from "next/link"
import { useDisplayMode } from "@/contexts/display-mode-context"

export default function Footer() {
  const { displayMode } = useDisplayMode()

  const footerLinks =
    displayMode === "kids"
      ? [
          { name: "Home", path: "/" },
          { name: "Learn", path: "/learn" },
          { name: "Games", path: "/games" },
          { name: "Videos", path: "/videos" },
          { name: "Watchlist", path: "/watchlist" },
        ]
      : [
          { name: "Home", path: "/" },
          { name: "Learn", path: "/learn" },
          { name: "Analysis", path: "/analysis" },
          { name: "Videos", path: "/videos" },
          { name: "Watchlist", path: "/watchlist" },
        ]

  return (
    <footer className="py-6 text-center text-sm text-muted-foreground bg-secondary/50 border-t border-border">
      <div className="container mx-auto">
        <div className="hidden md:flex justify-center space-x-6 mb-4">
          {footerLinks.map((link) => (
            <Link key={link.path} href={link.path} className="hover:text-primary">
              {link.name}
            </Link>
          ))}
        </div>
        © 2025 StockToons. Made with curiosity & AI.
      </div>
    </footer>
  )
}
