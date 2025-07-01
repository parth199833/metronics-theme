"use client"

import { useState, useEffect, useRef } from "react"
import { Bell, Grid3X3, Settings, Users, Zap, User } from "lucide-react"

const menuConfig = [
  {
    id: "dashboards",
    name: "Dashboards",
    icon: Grid3X3,
    type: "single",
  },
  {
    id: "public-profile",
    name: "Public Profile",
    icon: User,
    type: "single",
  },
  {
    id: "my-account",
    name: "My Account",
    icon: Settings,
    type: "single",
  },
  {
    id: "members-roles",
    name: "Members & Roles",
    icon: Users,
    type: "single",
  },
  {
    id: "integrations",
    name: "Integrations",
    icon: Zap,
    type: "single",
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: Bell,
    type: "single",
  },
]

interface SidebarProps {
  activePage: string
  setActivePage: (page: string) => void
}

// Helper function to determine if a color is light
const isLightColor = (color: string) => {
  if (color.startsWith("#")) {
    const hex = color.replace("#", "")
    const r = Number.parseInt(hex.substr(0, 2), 16)
    const g = Number.parseInt(hex.substr(2, 2), 16)
    const b = Number.parseInt(hex.substr(4, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 155
  } else if (color.startsWith("rgb")) {
    const parts = color.match(/\d+/g)
    if (parts && parts.length >= 3) {
      const r = Number.parseInt(parts[0])
      const g = Number.parseInt(parts[1])
      const b = Number.parseInt(parts[2])
      const brightness = (r * 299 + g * 587 + b * 114) / 1000
      return brightness > 155
    }
  }
  return true // Default to light if color format is unknown
}

export function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const sidebarRef = useRef<HTMLElement>(null)
  const [sidebarBgIsLight, setSidebarBgIsLight] = useState(true)

  useEffect(() => {
    const updateSidebarColor = () => {
      if (sidebarRef.current) {
        const inlineBgColor = sidebarRef.current.style.backgroundColor
        if (inlineBgColor) {
          setSidebarBgIsLight(isLightColor(inlineBgColor))
        } else {
          const computedStyle = getComputedStyle(sidebarRef.current)
          const bgColor = computedStyle.backgroundColor
          setSidebarBgIsLight(isLightColor(bgColor))
        }
      }
    }

    updateSidebarColor()

    const observer = new MutationObserver(updateSidebarColor)
    if (sidebarRef.current) {
      observer.observe(sidebarRef.current, { attributes: true, attributeFilter: ["style"] })
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleToggle = (event: CustomEvent) => {
      setIsCollapsed(event.detail.collapsed)
    }

    window.addEventListener("toggleSidebar", handleToggle as EventListener)
    return () => window.removeEventListener("toggleSidebar", handleToggle as EventListener)
  }, [])

  const renderMenuItem = (item: any) => {
    const IconComponent = item.icon
    const isActive = activePage === item.id

    return (
      <div key={item.id} className="mb-2 px-4 pt-3">
        <div
          className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-2"} cursor-pointer py-2 px-3 rounded-lg transition-colors ${
            isActive
              ? sidebarBgIsLight
                ? "bg-gray-200" // Light sidebar: darker background for active
                : "bg-gray-600" // Dark sidebar: lighter background for active
              : sidebarBgIsLight
                ? "hover:bg-gray-200" // Light sidebar: same hover as active
                : "hover:bg-gray-600" // Dark sidebar: same hover as active
          }`}
          onClick={() => setActivePage(item.id)}
        >
          <IconComponent
            className={`w-4 h-4 ${
              sidebarBgIsLight
                ? "text-black" // Always black on light sidebar
                : "text-white" // Always white on dark sidebar
            }`}
          />
          {!isCollapsed && (
            <span
              className={`text-sm ${
                isActive
                  ? "text-black font-medium" // Always black when active/selected
                  : sidebarBgIsLight
                    ? "text-black" // Black text on light sidebar (white background)
                    : "text-white" // White text on dark sidebar (non-white background)
              }`}
            >
              {item.name}
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <aside
      ref={sidebarRef}
      className={`fixed left-0 top-0 ${isCollapsed ? "w-16" : "w-64"} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen flex flex-col z-20 transition-all duration-300`}
    >
      {/* Logo - Fixed at top */}
      <div className="flex items-center space-x-2 p-4">
        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded transform rotate-45"></div>
        {!isCollapsed && (
          <span className={`text-base font-bold ${sidebarBgIsLight ? "text-black" : "text-white"}`}>Company</span>
        )}
      </div>

      {/* Scrollable menu content */}
      <div className="flex-1 overflow-y-auto border-0 mx-0 py-0 px-[5px]">
        {menuConfig.map((item) => renderMenuItem(item))}
      </div>
    </aside>
  )
}
