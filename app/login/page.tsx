"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("admin@demo.com")
  const [password, setPassword] = useState("demo")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, accept any login
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">Sign In</h1>
            <p className="text-muted-foreground">Your Social Campaigns</p>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button variant="outline" type="button" className="w-full bg-transparent">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>
            <Button variant="outline" type="button" className="w-full bg-transparent">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Sign in with Apple
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-muted-foreground">Or with email</span>
            </div>
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-700">
              Use account <span className="font-semibold">admin@demo.com</span> and password{" "}
              <span className="font-semibold">demo</span> to continue.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-foreground mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-semibold text-foreground mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
                required
              />
              <div className="mt-2 text-right">
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot Password ?
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Continue"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Not a Member yet?{" "}
            <Link href="/signup" className="text-primary hover:underline font-semibold">
              Sign up
            </Link>
          </p>

          {/* Footer Links */}
          <div className="mt-12 flex justify-center gap-6 text-sm text-primary">
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/plans" className="hover:underline">
              Plans
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Brand Showcase */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-white">
          {/* Logo */}
          <div className="mb-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl mb-3 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">M</span>
              </div>
              <h2 className="text-2xl font-bold tracking-wider">METRONIC</h2>
            </div>
          </div>

          {/* Dashboard Preview Cards */}
          <div className="relative w-full max-w-2xl mb-12">
            {/* Card mockups with floating animation */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
              <div className="bg-white rounded-xl shadow-2xl p-6 transform rotate-1 hover:rotate-0 transition-transform">
                <div className="text-sm text-gray-500 mb-2">Sales by Department</div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">8,035</div>
                    <div className="text-xs text-gray-400">Total Sales</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">4,684</div>
                    <div className="text-xs text-green-500">+12%</div>
                  </div>
                </div>
                <div className="h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg"></div>
              </div>

              <div className="bg-white rounded-xl shadow-2xl p-6 transform -rotate-1 hover:rotate-0 transition-transform mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900">9 Degree</div>
                    <div className="text-xs text-green-500 flex items-center gap-1">
                      <span>Active</span>
                      <span className="text-gray-900">$13,840</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-4">
                  Low company Researches with users more engaging beautiful purple holi boy.
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Buy</span>
                  <span className="font-semibold text-gray-900">Feb 8, 2022</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform -mt-4">
                <div className="text-sm font-semibold text-gray-900 mb-3">570k</div>
                <div className="h-20 bg-gradient-to-br from-orange-200 to-yellow-100 rounded-lg mb-3"></div>
                <div className="text-xs text-gray-600">Conversion Rate</div>
              </div>

              <div className="bg-white rounded-xl shadow-2xl p-6 transform -rotate-2 hover:rotate-0 transition-transform">
                <div className="text-xs text-gray-500 mb-3">Bitcoin / BTC</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">$330.00</div>
                <div className="text-xs text-gray-400 mb-4">0.00000032</div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs h-8">Add Product</Button>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl font-semibold mb-4">Fast, Efficient and Productive</h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              In this kind of post, <span className="text-yellow-300 font-semibold">the blogger</span> introduces a
              person they've interviewed and provides some background information about{" "}
              <span className="text-yellow-300 font-semibold">the interviewee</span> and their work following this is a
              transcript of the interview.
            </p>
          </div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
      </div>
    </div>
  )
}
