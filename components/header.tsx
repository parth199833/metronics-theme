"use client"

import { useState, useEffect } from "react"
import { Search, Bell, HelpCircle, Settings, Sparkles, PanelLeft, PanelLeftClose, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const handleSidebarToggle = (e: CustomEvent) => {
      setIsCollapsed(e.detail.collapsed)
    }
    window.addEventListener("toggleSidebar", handleSidebarToggle as EventListener)
    return () => window.removeEventListener("toggleSidebar", handleSidebarToggle as EventListener)
  }, [])

  const toggleSidebar = () => {
    if (isCollapsed) {
      window.dispatchEvent(new CustomEvent("expandSidebar"))
    } else {
      window.dispatchEvent(new CustomEvent("collapseSidebar"))
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-card border-b border-border flex items-center px-3 h-[47px]">
      <div className="flex items-center justify-between w-full">
        {/* Left: Toggle button, Logo */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={toggleSidebar}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeft className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">J</span>
            </div>
            <span className="font-semibold text-foreground">Jira</span>
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 h-9 bg-muted/50 border-border focus:bg-background"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 px-3 text-sm font-medium">
            + Create
          </Button>

          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">Ask Rovo</span>
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4 text-muted-foreground" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </Button>

          <Avatar className="h-8 w-8 ml-2">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-purple-600 text-white text-xs">PP</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
