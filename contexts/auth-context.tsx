"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Update the User interface to include age
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  watchlist: string[]
  joinDate: string
  plan: "free" | "premium"
  age?: number
}

// Update the AuthContextType interface to include watchlist management functions
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signup: (
    name: string,
    email: string,
    password: string,
    age?: number,
  ) => Promise<{ success: boolean; message: string }>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; message: string }>
  addToWatchlist: (symbol: string) => Promise<{ success: boolean; message: string }>
  removeFromWatchlist: (symbol: string) => Promise<{ success: boolean; message: string }>
  isInWatchlist: (symbol: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to validate the session
        const storedUser = localStorage.getItem("stocktoons_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication - in a real app, this would be an API call
      // Update the mock user data in the login function
      const mockUser: User = {
        id: "user_1",
        name: "Demo User",
        email: "demo@stocktoons.com",
        avatar: "/placeholder.svg?height=200&width=200&text=DU",
        watchlist: ["AAPL", "TSLA", "NVDA"],
        joinDate: "2023-01-15",
        plan: "free",
        age: 25, // Add default age for demo user
      }
      setUser(mockUser)
      localStorage.setItem("stocktoons_user", JSON.stringify(mockUser))
      return { success: true, message: "Login successful" }
      return { success: false, message: "Invalid email or password" }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An error occurred during login" }
    } finally {
      setIsLoading(false)
    }
  }

  // Update the signup function to include age
  const signup = async (name: string, email: string, password: string, age?: number) => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock signup - in a real app, this would be an API call
      const mockUser: User = {
        id: "user_" + Date.now(),
        name,
        email,
        watchlist: [],
        joinDate: new Date().toISOString().split("T")[0],
        plan: "free",
        age: age || null,
      }
      setUser(mockUser)
      localStorage.setItem("stocktoons_user", JSON.stringify(mockUser))
      return { success: true, message: "Account created successfully" }
    } catch (error) {
      console.error("Signup error:", error)
      return { success: false, message: "An error occurred during signup" }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("stocktoons_user")
    router.push("/")
  }

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (user) {
        const updatedUser = { ...user, ...data }
        setUser(updatedUser)
        localStorage.setItem("stocktoons_user", JSON.stringify(updatedUser))
        return { success: true, message: "Profile updated successfully" }
      }
      return { success: false, message: "No user logged in" }
    } catch (error) {
      console.error("Update profile error:", error)
      return { success: false, message: "An error occurred while updating profile" }
    } finally {
      setIsLoading(false)
    }
  }

  // Add these functions to the AuthProvider component
  const addToWatchlist = async (symbol: string) => {
    if (!user) {
      return { success: false, message: "You must be logged in to add to watchlist" }
    }

    try {
      // Check if already in watchlist
      if (user.watchlist.includes(symbol)) {
        return { success: false, message: "Stock already in watchlist" }
      }

      // Add to watchlist
      const updatedWatchlist = [...user.watchlist, symbol]
      const updatedUser = { ...user, watchlist: updatedWatchlist }
      setUser(updatedUser)
      localStorage.setItem("stocktoons_user", JSON.stringify(updatedUser))
      return { success: true, message: `${symbol} added to watchlist` }
    } catch (error) {
      console.error("Add to watchlist error:", error)
      return { success: false, message: "Failed to add to watchlist" }
    }
  }

  const removeFromWatchlist = async (symbol: string) => {
    if (!user) {
      return { success: false, message: "You must be logged in to remove from watchlist" }
    }

    try {
      // Check if in watchlist
      if (!user.watchlist.includes(symbol)) {
        return { success: false, message: "Stock not in watchlist" }
      }

      // Remove from watchlist
      const updatedWatchlist = user.watchlist.filter((item) => item !== symbol)
      const updatedUser = { ...user, watchlist: updatedWatchlist }
      setUser(updatedUser)
      localStorage.setItem("stocktoons_user", JSON.stringify(updatedUser))
      return { success: true, message: `${symbol} removed from watchlist` }
    } catch (error) {
      console.error("Remove from watchlist error:", error)
      return { success: false, message: "Failed to remove from watchlist" }
    }
  }

  const isInWatchlist = (symbol: string) => {
    return user ? user.watchlist.includes(symbol) : false
  }

  // Update the AuthContext.Provider value to include the new functions
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
