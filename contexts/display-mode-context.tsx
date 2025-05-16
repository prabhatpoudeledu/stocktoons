"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

type DisplayMode = "adult" | "kids"

interface DisplayModeContextType {
  displayMode: DisplayMode
  setDisplayMode: (mode: DisplayMode) => void
  toggleDisplayMode: () => void
}

const DisplayModeContext = createContext<DisplayModeContextType | undefined>(undefined)

export function DisplayModeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [displayMode, setDisplayModeState] = useState<DisplayMode>("adult")

  // Initialize display mode based on user age or stored preference
  useEffect(() => {
    // Check if there's a stored preference
    const storedMode = localStorage.getItem("stocktoons_display_mode")

    if (storedMode && (storedMode === "adult" || storedMode === "kids")) {
      setDisplayModeState(storedMode as DisplayMode)
    } else if (user?.age !== undefined) {
      // If no stored preference but user has age, set based on age
      setDisplayModeState(user.age < 18 ? "kids" : "adult")
    }
  }, [user])

  // Function to set display mode and save to localStorage
  const setDisplayMode = (mode: DisplayMode) => {
    setDisplayModeState(mode)
    localStorage.setItem("stocktoons_display_mode", mode)
  }

  // Function to toggle between modes
  const toggleDisplayMode = () => {
    const newMode = displayMode === "adult" ? "kids" : "adult"
    setDisplayMode(newMode)
  }

  return (
    <DisplayModeContext.Provider value={{ displayMode, setDisplayMode, toggleDisplayMode }}>
      {children}
    </DisplayModeContext.Provider>
  )
}

export function useDisplayMode() {
  const context = useContext(DisplayModeContext)
  if (context === undefined) {
    throw new Error("useDisplayMode must be used within a DisplayModeProvider")
  }
  return context
}
