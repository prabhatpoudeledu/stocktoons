"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { User, LogOut, Settings, Star } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function UserMenu() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleMenuItemClick = (action: () => void) => {
    action()
    setIsOpen(false)
  }

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen])

  if (!user) return null

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="relative h-10 w-10 rounded-full cursor-pointer focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background hover:ring-2 hover:ring-primary hover:ring-opacity-50"
        aria-label="Open user menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative h-10 w-10 rounded-full overflow-hidden">
          <Image
            src={user.avatar || "/placeholder.svg?height=40&width=40&text=U"}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-card border border-border z-[100]"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <div className="p-2 flex items-center gap-2 border-b border-border">
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

          <div className="py-1">
            <button
              onClick={() => handleMenuItemClick(() => router.push("/profile"))}
              className="flex items-center w-full px-4 py-2 text-sm hover:bg-secondary"
              role="menuitem"
            >
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </button>

            <button
              onClick={() => handleMenuItemClick(() => router.push("/watchlist"))}
              className="flex items-center w-full px-4 py-2 text-sm hover:bg-secondary"
              role="menuitem"
            >
              <Star className="mr-2 h-4 w-4" />
              <span>My Watchlist</span>
              {user.watchlist.length > 0 && (
                <Badge className="ml-auto bg-primary text-white text-xs">{user.watchlist.length}</Badge>
              )}
            </button>

            <button
              onClick={() => handleMenuItemClick(() => router.push("/profile?tab=preferences"))}
              className="flex items-center w-full px-4 py-2 text-sm hover:bg-secondary"
              role="menuitem"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </button>

            <div className="border-t border-border my-1"></div>

            <button
              onClick={() => handleMenuItemClick(() => logout())}
              className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-secondary"
              role="menuitem"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
