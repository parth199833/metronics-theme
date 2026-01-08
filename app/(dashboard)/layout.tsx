"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { ThemeCustomizer } from "@/components/theme-customizer"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarWidth, setSidebarWidth] = useState(256)

  useEffect(() => {
    const handleSidebarToggle = (e: CustomEvent) => {
      setSidebarWidth(e.detail.width ?? (e.detail.collapsed ? 0 : 256))
    }
    window.addEventListener("toggleSidebar", handleSidebarToggle as EventListener)
    return () => window.removeEventListener("toggleSidebar", handleSidebarToggle as EventListener)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main
        className="pt-14 transition-all duration-300 bg-background pl-[5px]"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        {children}
      </main>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="fixed top-1/2 right-0 -translate-y-1/2 z-50 rounded-l-lg rounded-r-none shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground w-10 h-10"
          >
            <Settings className="w-4 h-4 animate-spin [animation-duration:3s]" />
          </Button>
        </SheetTrigger>
        <ThemeCustomizer />
      </Sheet>
    </div>
  )
}
