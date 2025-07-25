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
        className={`flex items-center gap-2 ${
          displayMode === "kids"
            ? "text-green-700 hover:bg-green-100 hover:text-green-800"
            : "text-muted-foreground hover:text-foreground"
        }`}
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
      <span className={`text-sm font-medium ${displayMode === "kids" ? "text-green-700" : "text-muted-foreground"}`}>
        Mode:
      </span>
      <Button
        variant={displayMode === "kids" ? "default" : "outline"}
        size="sm"
        onClick={toggleDisplayMode}
        className={`flex items-center gap-2 transition-all duration-200 ${
          displayMode === "kids"
            ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold shadow-lg"
            : "hover:bg-primary hover:text-primary-foreground"
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
