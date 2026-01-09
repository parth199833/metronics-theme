"use client"

import { useState, useEffect } from "react"
import { Home, ChevronRight, Plus, MoreHorizontal, ExternalLink, Settings, Users, Table2, BookOpen } from "lucide-react"
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

const dashboards = [
  { id: "intalk-bug", name: "Intalk New UI - Bug Status React Team" },
  { id: "daily-tasks", name: "Daily Tasks" },
  { id: "helpinbox", name: "HELPINBOX - Task Board" },
  { id: "viewalldasboard", name: "View All Dashboard" }
]

const filters = [{ id: "datatable", name: "DataTable", icon: Table2, href: "/dt" }]

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
  const [dashboardSections, setDashboardSections] = useState({
    dashboards: true,
    starred: true,
  })
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

  const toggleDashboardSection = (section: string) => {
    setDashboardSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const [filterSections, setFilterSections] = useState({
    filters: true,
  })

  const toggleFilterSection = (section: string) => {
    setFilterSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
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
        <div className="px-2 py-2 space-y-0.5">
          {topMenuItems.map((item) => (
            <div key={item.id}>
              {item.id === "dashboard" ? (
                <>
                  {/* Dashboards Section */}
                  <div className="space-y-1 group">
                    <div className="flex items-center justify-between px-2 py-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleDashboardSection("dashboards")}
                          className={cn(
                            "p-0 text-muted-foreground hover:text-foreground transition-colors",
                            isDarkSidebar && "text-white/60 hover:text-white",
                          )}
                        >
                          <ChevronRight
                            className={cn("h-4 w-4 transition-transform", dashboardSections.dashboards && "rotate-90")}
                          />
                        </button>
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Dashboards
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground",
                          isDarkSidebar && "text-white/60 hover:text-white",
                        )}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Dashboards List */}
                    {dashboardSections.dashboards && (
                      <div className="space-y-0.5">
                        {dashboards.map((dashboard) => (
                          <Link
                            key={dashboard.id}
                            href="/dashboard"
                            className={cn(
                              "flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-all duration-150 group ml-2",
                              isDarkSidebar
                                ? "text-white/70 hover:text-white hover:bg-white/10"
                                : "text-foreground/70 hover:text-foreground hover:bg-foreground/5",
                            )}
                          >
                            <BookOpen className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground group-hover:text-foreground" />
                            <span className="truncate text-xs">{dashboard.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Starred Section */}
                  <div className="space-y-1 mt-3">
                    {/* Starred Dashboards List */}
                    {dashboardSections.starred && (
                      <div className="space-y-0.5">{dashboards.slice(0, 2).map((dashboard) => null)}</div>
                    )}
                  </div>

                  {/* Filters Section */}
                  <div className="space-y-1 mt-4 group">
                    <div className="flex items-center justify-between px-2 py-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleFilterSection("filters")}
                          className={cn(
                            "p-0 text-muted-foreground hover:text-foreground transition-colors",
                            isDarkSidebar && "text-white/60 hover:text-white",
                          )}
                        >
                          <ChevronRight
                            className={cn("h-4 w-4 transition-transform", filterSections.filters && "rotate-90")}
                          />
                        </button>
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Filters
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground",
                          isDarkSidebar && "text-white/60 hover:text-white",
                        )}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Filters List */}
                    {filterSections.filters && (
                      <div className="space-y-0.5">
                        {filters.map((filter) => (
                          <Link
                            key={filter.id}
                            href={filter.href}
                            className={cn(
                              "flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-all duration-150 group ml-2",
                              isDarkSidebar
                                ? "text-white/70 hover:text-white hover:bg-white/10"
                                : "text-foreground/70 hover:text-foreground hover:bg-foreground/5",
                            )}
                          >
                            <filter.icon className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground group-hover:text-foreground" />
                            <span className="truncate text-xs">{filter.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                renderMenuItem(item)
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
