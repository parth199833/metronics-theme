"use client"

import {Bell, Search, MessageSquare, Grid3X3, ChevronRight, SidebarIcon, User, LogOut} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

export function Header() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(256)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "b") {
        event.preventDefault()
        toggleSidebar()
      }
    }

    const handleToggle = (event: CustomEvent) => {
      setSidebarWidth(event.detail.collapsed ? 64 : 256)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("toggleSidebar", handleToggle as EventListener)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("toggleSidebar", handleToggle as EventListener)
    }
  }, [])

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
    // Dispatch custom event to communicate with MenuHeader
    window.dispatchEvent(
      new CustomEvent("toggleSidebar", {
        detail: { collapsed: !isSidebarCollapsed },
      }),
    )
  }

  return (
    <header
      className="fixed top-0 right-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-12.5 flex items-center shadow-sm px-0"
      style={{ left: sidebarWidth + "px", width: `calc(100% - ${sidebarWidth}px)` }}
    >
      <div className="flex items-center justify-between w-full px-[5px] py-0 h-[50px]">
        {/* Sidebar Toggle */}
        <div className="flex items-center space-x-[5px]">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="group shadow-none">
            <SidebarIcon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </Button>
        </div>

        {/* Header Actions */}
        <div className="flex items-center justify-start space-x-0 flex-row leading-[1.7rem]">
          <Button variant="ghost" size="icon" className="group">
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 transition-colors" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon">
            <Grid3X3 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="flex flex-col space-y-1">
                <Button variant="ghost" className="justify-start">
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </Button>
                <Button variant="ghost" className="justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
}
