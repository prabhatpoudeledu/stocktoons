"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, AlertCircle, Sparkles, Star } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await login(email, password)
      if (result.success) {
        router.push("/")
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setError("")
    setIsLoading(true)

    try {
      const result = await login("demo@stocktoons.com", "demo123")
      if (result.success) {
        router.push("/")
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError("Demo login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full mb-6 shadow-lg">
            <Sparkles className="h-7 w-7" />
            <span className="font-bold text-xl">Welcome Back! 🎉</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Sign In to StockToons! 🚀
          </h1>
          <p className="text-slate-600 text-lg">Ready for another amazing stock adventure? Let's go! ✨</p>
        </div>

        {/* Login Form */}
        <Card className="bg-white border-4 border-violet-100 shadow-2xl rounded-3xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-slate-800">Sign In 🔐</CardTitle>
            <CardDescription className="text-slate-600">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            {error && (
              <Alert variant="destructive" className="border-rose-200 bg-rose-50 rounded-2xl">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-medium">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-bold flex items-center gap-2">
                  <Mail className="h-4 w-4 text-violet-500" />
                  Email Address 📧
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your awesome email! ✉️"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-violet-50 border-2 border-violet-200 focus:border-violet-400 focus:ring-violet-400 rounded-2xl py-3 text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-bold flex items-center gap-2">
                  <Lock className="h-4 w-4 text-violet-500" />
                  Password 🔑
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your secret password! 🤫"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-violet-50 border-2 border-violet-200 focus:border-violet-400 focus:ring-violet-400 rounded-2xl py-3 text-lg pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-violet-500 hover:bg-violet-100 rounded-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg py-4 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Signing In... 🔄
                  </div>
                ) : (
                  <>Sign In! 🚀</>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full border-violet-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-slate-500 font-medium">or try our demo! 🎮</span>
              </div>
            </div>

            {/* Demo Account */}
            <Card className="bg-gradient-to-r from-violet-100 to-purple-100 border-2 border-violet-200 rounded-2xl">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="h-5 w-5 text-violet-600" />
                    <h3 className="font-bold text-violet-800 text-lg">Try Demo Account! 🎯</h3>
                    <Star className="h-5 w-5 text-violet-600" />
                  </div>
                  <p className="text-violet-700 text-sm">
                    Explore all features with our fun demo account - no signup needed! 🎪
                  </p>
                  <Button
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                    variant="outline"
                    className="w-full border-2 border-violet-300 text-violet-700 hover:bg-violet-50 font-bold rounded-2xl py-3 transform hover:scale-105 transition-all duration-300 bg-transparent"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-violet-600 border-t-transparent rounded-full"></div>
                        Loading Demo... 🎮
                      </div>
                    ) : (
                      <>Start Demo Adventure! 🎮</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-center space-y-4">
              <Link
                href="/forgot-password"
                className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors"
              >
                Forgot your password? 🤔
              </Link>

              <div className="text-slate-600">
                Don't have an account yet?{" "}
                <Link
                  href="/signup"
                  className="text-violet-600 hover:text-violet-700 font-bold hover:underline transition-colors"
                >
                  Join the fun! 🎉
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fun Features Preview */}
        <Card className="bg-gradient-to-r from-cyan-100 to-blue-100 border-4 border-cyan-200 rounded-3xl">
          <CardContent className="p-6">
            <h3 className="text-center font-bold text-cyan-800 text-lg mb-4">🌟 What's Waiting for You!</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white rounded-2xl border-2 border-cyan-200">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-bold text-cyan-800">Cool Charts</div>
              </div>
              <div className="text-center p-3 bg-white rounded-2xl border-2 border-cyan-200">
                <div className="text-2xl mb-2">🎮</div>
                <div className="text-sm font-bold text-cyan-800">Fun Games</div>
              </div>
              <div className="text-center p-3 bg-white rounded-2xl border-2 border-cyan-200">
                <div className="text-2xl mb-2">📰</div>
                <div className="text-sm font-bold text-cyan-800">Latest News</div>
              </div>
              <div className="text-center p-3 bg-white rounded-2xl border-2 border-cyan-200">
                <div className="text-2xl mb-2">⭐</div>
                <div className="text-sm font-bold text-cyan-800">Watchlists</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
