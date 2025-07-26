"use client"

import type React from "react"

import { useDisplayMode } from "@/contexts/display-mode-context"
import { useEffect } from "react"

interface KidsThemeWrapperProps {
  children: React.ReactNode
}

export function KidsThemeWrapper({ children }: KidsThemeWrapperProps) {
  const { displayMode } = useDisplayMode()

  useEffect(() => {
    const body = document.body

    // Always apply the colorful kids theme
    body.classList.add("kids-mode")
    body.classList.remove("dark")

    return () => {
      // Keep the kids theme even on cleanup
      body.classList.add("kids-mode")
    }
  }, [displayMode])

  return <>{children}</>
}
