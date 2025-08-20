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
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Sparkles, Gift, Rocket, Star } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    agreedToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match! 🤔")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long! 🔐")
      return
    }

    if (!formData.agreedToTerms) {
      setError("Please agree to our terms to continue! 📋")
      return
    }

    setIsLoading(true)

    try {
      const result = await signup(formData.email, formData.password, formData.name, Number.parseInt(formData.age))
      if (result.success) {
        router.push("/")
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError("Something went wrong. Please try again! 😅")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full mb-6 shadow-lg">
            <Gift className="h-7 w-7" />
            <span className="font-bold text-xl">Join the Adventure! 🎊</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Create Your Account! 🌟
          </h1>
          <p className="text-slate-600 text-lg">Start your amazing stock learning journey today! 🚀</p>
        </div>

        {/* Signup Form */}
        <Card className="bg-white border-4 border-rose-100 shadow-2xl rounded-3xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-slate-800">Sign Up 📝</CardTitle>
            <CardDescription className="text-slate-600">
              Fill in your details to get started with the fun!
            </CardDescription>
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
                <Label htmlFor="name" className="text-slate-700 font-bold flex items-center gap-2">
                  <User className="h-4 w-4 text-rose-500" />
                  Your Awesome Name 👋
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="What should we call you? 😊"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="bg-rose-50 border-2 border-rose-200 focus:border-rose-400 focus:ring-rose-400 rounded-2xl py-3 text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-bold flex items-center gap-2">
                  <Mail className="h-4 w-4 text-rose-500" />
                  Email Address 📧
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your super cool email! ✉️"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="bg-rose-50 border-2 border-rose-200 focus:border-rose-400 focus:ring-rose-400 rounded-2xl py-3 text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-slate-700 font-bold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-rose-500" />
                  Your Age 🎂
                </Label>
                <Select value={formData.age} onValueChange={(value) => handleInputChange("age", value)}>
                  <SelectTrigger className="bg-rose-50 border-2 border-rose-200 focus:border-rose-400 rounded-2xl py-3 text-lg">
                    <SelectValue placeholder="How old are you? 🤔" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 83 }, (_, i) => i + 8).map((age) => (
                      <SelectItem key={age} value={age.toString()}>
                        {age} years old {age < 13 ? "🧒" : age < 18 ? "👦👧" : age < 65 ? "👨👩" : "👴👵"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-bold flex items-center gap-2">
                  <Lock className="h-4 w-4 text-rose-500" />
                  Create Password 🔑
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Make it super secure! 🛡️"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    className="bg-rose-50 border-2 border-rose-200 focus:border-rose-400 focus:ring-rose-400 rounded-2xl py-3 text-lg pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-rose-500 hover:bg-rose-100 rounded-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-700 font-bold flex items-center gap-2">
                  <Lock className="h-4 w-4 text-rose-500" />
                  Confirm Password 🔐
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Type it again to be sure! ✅"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                    className="bg-rose-50 border-2 border-rose-200 focus:border-rose-400 focus:ring-rose-400 rounded-2xl py-3 text-lg pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-rose-500 hover:bg-rose-100 rounded-full"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-violet-50 rounded-2xl border-2 border-violet-200">
                <Checkbox
                  id="terms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreedToTerms", checked as boolean)}
                  className="border-2 border-violet-300 data-[state=checked]:bg-violet-500"
                />
                <Label htmlFor="terms" className="text-sm text-violet-700 font-medium leading-relaxed">
                  I agree to the{" "}
                  <Link href="/terms" className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  📋✨
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-lg py-4 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Creating Account... 🔄
                  </div>
                ) : (
                  <>Create My Account! 🎉</>
                )}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <div className="text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline transition-colors"
                >
                  Sign in here! 🚪
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Welcome Benefits */}
        <Card className="bg-gradient-to-r from-emerald-100 to-teal-100 border-4 border-emerald-200 rounded-3xl">
          <CardContent className="p-6">
            <h3 className="text-center font-bold text-emerald-800 text-lg mb-4">🎁 Welcome Gifts Waiting for You!</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border-2 border-emerald-200">
                <Star className="h-5 w-5 text-emerald-600" />
                <span className="text-emerald-800 font-medium">Free virtual $10,000 to start investing! 💰</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border-2 border-emerald-200">
                <Rocket className="h-5 w-5 text-emerald-600" />
                <span className="text-emerald-800 font-medium">Access to all learning games and tools! 🎮</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border-2 border-emerald-200">
                <Gift className="h-5 w-5 text-emerald-600" />
                <span className="text-emerald-800 font-medium">Personalized stock recommendations! 🎯</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
