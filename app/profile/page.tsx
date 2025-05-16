"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, User, Settings, Bell, Shield, CreditCard, LogOut, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ProfilePage() {
  const { user, isLoading, updateProfile, logout } = useAuth()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("account")

  // Add this useEffect to handle URL parameters
  useEffect(() => {
    // Check if there's a tab parameter in the URL
    const searchParams = new URLSearchParams(window.location.search)
    const tabParam = searchParams.get("tab")

    // Set the active tab if a valid one is provided
    if (tabParam && ["account", "preferences", "notifications", "security", "billing"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [])

  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Redirect if not logged in
  if (!isLoading && !user) {
    router.push("/login")
    return null
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setUpdating(true)

    try {
      const result = await updateProfile({ name, email })
      if (result.success) {
        setSuccess("Profile updated successfully")
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("An error occurred while updating your profile")
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <Card className="bg-card border border-border">
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24 mb-4">
                  <Image
                    src={user?.avatar || "/placeholder.svg?height=200&width=200&text=User"}
                    alt={user?.name || "User"}
                    fill
                    className="rounded-full object-cover border-2 border-primary"
                  />
                </div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <div className="mt-2">
                  <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                    {user?.plan === "premium" ? "Premium" : "Free"} Plan
                  </Badge>
                </div>
              </div>

              <nav className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => document.getElementById("account-tab")?.click()}
                >
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => document.getElementById("preferences-tab")?.click()}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Preferences
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => document.getElementById("notifications-tab")?.click()}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => document.getElementById("security-tab")?.click()}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => document.getElementById("billing-tab")?.click()}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-500" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue={activeTab} className="w-full">
            <TabsList className="mb-6 bg-secondary/50">
              <TabsTrigger value="account" id="account-tab">
                Account
              </TabsTrigger>
              <TabsTrigger value="preferences" id="preferences-tab">
                Preferences
              </TabsTrigger>
              <TabsTrigger value="notifications" id="notifications-tab">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" id="security-tab">
                Security
              </TabsTrigger>
              <TabsTrigger value="billing" id="billing-tab">
                Billing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card className="bg-card border border-border">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {success && (
                    <Alert className="mb-4 bg-green-900/20 text-green-400 border-green-800">
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-secondary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-secondary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="joined">Member Since</Label>
                      <Input id="joined" value={user?.joinDate || ""} disabled className="bg-secondary/50 opacity-70" />
                    </div>
                    <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={updating}>
                      {updating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      {updating ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                  <div className="mt-8 pt-6 border-t border-border">
                    <h3 className="text-lg font-bold mb-4">Watchlist Summary</h3>
                    {user?.watchlist && user.watchlist.length > 0 ? (
                      <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {user.watchlist.map((symbol) => (
                            <Link key={symbol} href={`/stocks/${symbol}`}>
                              <Badge variant="outline" className="bg-secondary/50 hover:bg-secondary">
                                {symbol}
                              </Badge>
                            </Link>
                          ))}
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link href="/watchlist">
                            <Star className="mr-2 h-4 w-4 text-yellow-400" />
                            Manage Watchlist
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-muted-foreground mb-4">
                          You haven't added any stocks to your watchlist yet.
                        </p>
                        <Button asChild variant="outline" size="sm">
                          <Link href="/search">
                            <Star className="mr-2 h-4 w-4 text-yellow-400" />
                            Add Stocks to Watchlist
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card className="bg-card border border-border">
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Manage your app preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Preference settings coming soon.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="bg-card border border-border">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Notification settings coming soon.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="bg-card border border-border">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Security settings coming soon.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card className="bg-card border border-border">
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your subscription and payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 p-4 bg-secondary/50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Current Plan</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{user?.plan === "premium" ? "Premium" : "Free"} Plan</p>
                        <p className="text-sm text-muted-foreground">
                          {user?.plan === "premium"
                            ? "Full access to all features"
                            : "Limited access to basic features"}
                        </p>
                      </div>
                      {user?.plan === "free" && (
                        <Button className="bg-primary hover:bg-primary/90">Upgrade to Premium</Button>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground">Additional billing settings coming soon.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
