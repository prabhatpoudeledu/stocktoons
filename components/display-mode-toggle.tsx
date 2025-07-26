"use client"

import { Button } from "@/components/ui/button"
import { useDisplayMode } from "@/contexts/display-mode-context"
import { Baby, User } from "lucide-react"

interface DisplayModeToggleProps {
  variant?: "default" | "minimal"
}

export function DisplayModeToggle({ variant = "default" }: DisplayModeToggleProps) {
  const { displayMode, toggleDisplayMode } = useDisplayMode()

  if (variant === "minimal") {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDisplayMode}
        className="flex items-center gap-2 text-white hover:bg-white/10 hover:text-white"
      >
        {displayMode === "kids" ? (
          <>
            <Baby className="h-4 w-4" />
            <span className="hidden sm:inline">Kids</span>
          </>
        ) : (
          <>
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Adult</span>
          </>
        )}
      </Button>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-white/90">Mode:</span>
      <Button
        variant={displayMode === "kids" ? "default" : "outline"}
        size="sm"
        onClick={toggleDisplayMode}
        className={`flex items-center gap-2 transition-all duration-200 ${
          displayMode === "kids"
            ? "bg-white/20 text-white hover:bg-white/30 border border-white/30 font-bold shadow-lg"
            : "bg-white/10 text-white hover:bg-white/20 border border-white/30"
        }`}
      >
        {displayMode === "kids" ? (
          <>
            <Baby className="h-4 w-4" />
            Kids Mode
          </>
        ) : (
          <>
            <User className="h-4 w-4" />
            Adult Mode
          </>
        )}
      </Button>
    </div>
  )
}
