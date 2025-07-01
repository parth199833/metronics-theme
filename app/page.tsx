"use client"

import { MenuHeader } from "@/components/menu-header"
import { Header } from "@/components/header"
import { MainContent } from "@/components/main-content"
import { useState, useEffect } from "react"

export default function MetronicDashboard() {
  const [sidebarWidth, setSidebarWidth] = useState(256) // 64 * 4 = 256px for w-64
  const [activePage, setActivePage] = useState("security")

  useEffect(() => {
    const handleToggle = (event: CustomEvent) => {
      setSidebarWidth(event.detail.collapsed ? 64 : 256) // w-16 = 64px, w-64 = 256px
    }

    window.addEventListener("toggleSidebar", handleToggle as EventListener)
    return () => window.removeEventListener("toggleSidebar", handleToggle as EventListener)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MenuHeader activePage={activePage} setActivePage={setActivePage} />
      <div style={{ marginLeft: `${sidebarWidth}px` }} className="transition-all duration-300">
        <Header />
        <MainContent activePage={activePage} />
      </div>
    </div>
  )
}
