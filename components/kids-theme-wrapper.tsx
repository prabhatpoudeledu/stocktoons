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

    if (displayMode === "kids") {
      body.classList.add("kids-mode")
      body.classList.remove("dark")
    } else {
      body.classList.remove("kids-mode")
    }

    return () => {
      body.classList.remove("kids-mode")
    }
  }, [displayMode])

  return <>{children}</>
}
