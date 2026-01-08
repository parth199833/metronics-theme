"use client"

import { useState, useEffect } from "react"
import { Home, ChevronRight, Plus, MoreHorizontal, ExternalLink, Settings, Users, Table2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Simplified menu configuration
const topMenuItems = [
  { id: "dashboard", name: "Dashboard", icon: Home, href: "/dashboard" },
  { id: "members", name: "Members", icon: Users, href: "/members" },
  { id: "datatable", name: "Data Table", icon: Table2, href: "/dt" },
  { id: "settings", name: "Settings", icon: Settings, href: "/ma" },
]

const projectsItems = [
  {
    id: "technology",
    name: "Technology",
    hasMore: true,
    children: [{ id: "intalk", name: "InTalk", icon: Table2, href: "/dt", active: true }],
  },
]

function isColorDark(hexColor: string): boolean {
  if (!hexColor || hexColor.length < 7) return false
  const hex = hexColor.replace("#", "")
  const r = Number.parseInt(hex.substring(0, 2), 16)
  const g = Number.parseInt(hex.substring(2, 4), 16)
  const b = Number.parseInt(hex.substring(4, 6), 16)
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.5
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

export function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["projects"])
  const [expandedProjects, setExpandedProjects] = useState<string[]>(["technology"])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isDarkSidebar, setIsDarkSidebar] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkSidebarColor = () => {
      const sidebarColor = getCookie("sidebarColor")
      if (sidebarColor) {
        setIsDarkSidebar(isColorDark(sidebarColor))
      }
    }

    checkSidebarColor()

    // Listen for sidebar color changes
    const handleSidebarColorChange = () => {
      checkSidebarColor()
    }

    window.addEventListener("sidebarColorChanged", handleSidebarColorChange)

    // Check periodically for cookie changes
    const interval = setInterval(checkSidebarColor, 500)

    return () => {
      window.removeEventListener("sidebarColorChanged", handleSidebarColorChange)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("toggleSidebar", { detail: { collapsed: isCollapsed, width: isCollapsed ? 0 : 256 } }),
    )
  }, [isCollapsed])

  useEffect(() => {
    const handleExpandSidebar = () => {
      setIsCollapsed(false)
    }
    const handleCollapseSidebar = () => {
      setIsCollapsed(true)
    }
    window.addEventListener("expandSidebar", handleExpandSidebar)
    window.addEventListener("collapseSidebar", handleCollapseSidebar)
    return () => {
      window.removeEventListener("expandSidebar", handleExpandSidebar)
      window.removeEventListener("collapseSidebar", handleCollapseSidebar)
    }
  }, [])

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const toggleProject = (id: string) => {
    setExpandedProjects((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const renderMenuItem = (item: any, isChild = false) => {
    const IconComponent = item.icon
    const isActive = pathname === item.href
    const isExpanded = expandedSections.includes(item.id)

    const textColorClass = isDarkSidebar ? "text-white/80 hover:text-white" : "text-foreground/80 hover:text-foreground"
    const activeTextClass = isDarkSidebar ? "text-white font-medium" : "text-primary font-medium"
    const iconColorClass = isDarkSidebar
      ? "text-white/60 group-hover:text-white"
      : "text-muted-foreground group-hover:text-foreground"
    const activeIconClass = isDarkSidebar ? "text-white" : "text-primary"
    const hoverBgClass = isDarkSidebar ? "hover:bg-white/10" : "hover:bg-foreground/5"
    const activeBgClass = isDarkSidebar ? "bg-white/20" : "bg-primary/10"

    return (
      <div key={item.id}>
        <Link
          href={item.href || "#"}
          onClick={(e) => {
            if (item.expandable) {
              e.preventDefault()
              toggleSection(item.id)
            }
          }}
          className={cn(
            "flex items-center gap-2 text-sm rounded-md transition-all duration-150 group",
            isCollapsed ? "px-2 py-2 justify-center" : "px-3 py-2",
            isChild && !isCollapsed ? "pl-8" : "",
            isActive ? cn(activeBgClass, activeTextClass) : cn(textColorClass, hoverBgClass),
          )}
          title={isCollapsed ? item.name : undefined}
        >
          {!isCollapsed && item.expandable && (
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "rotate-90",
                isActive ? activeIconClass : iconColorClass,
              )}
            />
          )}
          {typeof IconComponent === "string" ? (
            <span className="text-base">{IconComponent}</span>
          ) : IconComponent ? (
            <IconComponent
              className={cn("h-4 w-4 flex-shrink-0 transition-colors", isActive ? activeIconClass : iconColorClass)}
            />
          ) : null}
          {!isCollapsed && (
            <>
              <span className="flex-1 truncate">{item.name}</span>
              {item.tag && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded font-medium",
                    isDarkSidebar ? "bg-white/20 text-white" : "bg-primary text-primary-foreground",
                  )}
                >
                  {item.tag}
                </span>
              )}
              {item.external && <ExternalLink className={cn("h-3 w-3", iconColorClass)} />}
              {item.hasAdd && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-5 w-5 opacity-0 group-hover:opacity-100",
                    isDarkSidebar && "text-white hover:bg-white/10",
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              )}
              {item.hasMore && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-5 w-5 opacity-0 group-hover:opacity-100",
                    isDarkSidebar && "text-white hover:bg-white/10",
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              )}
            </>
          )}
        </Link>
      </div>
    )
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-12 h-[calc(100vh-56px)] flex flex-col z-20 border-r border-border transition-all duration-300",
        !isDarkSidebar && "bg-card text-foreground",
        isCollapsed ? "w-0 overflow-hidden opacity-0 pointer-events-none" : "w-64",
      )}
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-0 pb-2 font-sans">
        {/* Top Menu */}
        <div className="px-2 space-y-0.5">
          {topMenuItems.map((item) => (
            <div key={item.id}>
              {renderMenuItem(item)}
              {!isCollapsed && item.id === "projects" && expandedSections.includes("projects") && (
                <div className="mt-1 space-y-0.5">
                  {projectsItems.map((space) => {
                    const projectTextClass = isDarkSidebar
                      ? "text-white/80 hover:text-white"
                      : "text-foreground/80 hover:text-foreground"
                    const projectHoverBg = isDarkSidebar ? "hover:bg-white/10" : "hover:bg-foreground/5"
                    const projectIconClass = isDarkSidebar
                      ? "text-white/60 group-hover:text-white"
                      : "text-muted-foreground group-hover:text-foreground"

                    return (
                      <div key={space.id}>
                        <div
                          onClick={() => toggleProject(space.id)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer group transition-all duration-150",
                            projectTextClass,
                            projectHoverBg,
                          )}
                        >
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 transition-transform",
                              projectIconClass,
                              expandedProjects.includes(space.id) && "rotate-90",
                            )}
                          />
                          <span className="flex-1 truncate">{space.name}</span>
                          {space.hasMore && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "h-5 w-5 opacity-0 group-hover:opacity-100",
                                isDarkSidebar && "text-white hover:bg-white/10",
                              )}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        {expandedProjects.includes(space.id) && space.children && (
                          <div className="ml-4 space-y-0.5">
                            {space.children.map((child: any) => {
                              const ChildIcon = child.icon
                              const isChildActive = pathname === child.href || child.active

                              const childActiveText = isDarkSidebar
                                ? "text-white font-medium"
                                : "text-primary font-medium"
                              const childActiveBg = isDarkSidebar ? "bg-white/20" : "bg-primary/10"
                              const childActiveIcon = isDarkSidebar ? "text-white" : "text-primary"

                              return (
                                <Link
                                  key={child.id}
                                  href={child.href}
                                  className={cn(
                                    "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-all duration-150 group",
                                    isChildActive
                                      ? cn(childActiveBg, childActiveText)
                                      : cn(projectTextClass, projectHoverBg),
                                  )}
                                >
                                  <ChildIcon
                                    className={cn(
                                      "h-4 w-4 flex-shrink-0 transition-colors",
                                      isChildActive ? childActiveIcon : projectIconClass,
                                    )}
                                  />
                                  <span className="truncate">{child.name}</span>
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
