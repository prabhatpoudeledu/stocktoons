"use client"

import { Button } from "@/components/ui/button"
import { useDisplayMode } from "@/contexts/display-mode-context"
import { School, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function DisplayModeToggle({ variant = "default" }: { variant?: "default" | "minimal" }) {
  const { displayMode, toggleDisplayMode } = useDisplayMode()

  if (variant === "minimal") {
    return (
      <Button variant="ghost" size="sm" onClick={toggleDisplayMode} className="flex items-center gap-1">
        {displayMode === "kids" ? (
          <>
            <School className="h-4 w-4" />
            <span className="sr-only">Switch to Adult Mode</span>
          </>
        ) : (
          <>
            <School className="h-4 w-4" />
            <span className="sr-only">Switch to Kids Mode</span>
          </>
        )}
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={toggleDisplayMode} className="flex items-center gap-2">
        {displayMode === "kids" ? (
          <>
            <Briefcase className="h-4 w-4" />
            <span>Switch to Adult Mode</span>
          </>
        ) : (
          <>
            <School className="h-4 w-4" />
            <span>Switch to Kids Mode</span>
          </>
        )}
      </Button>

      {displayMode === "kids" && (
        <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
          Kids Mode
        </Badge>
      )}
    </div>
  )
}
