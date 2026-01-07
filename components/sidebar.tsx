"use client"

import { useState, useEffect } from "react"
import {
  Home,
  Clock,
  Star,
  AppWindow,
  FolderKanban,
  ChevronRight,
  Plus,
  MoreHorizontal,
  ExternalLink,
  LayoutGrid,
  Filter,
  BarChart3,
  Settings,
  Users,
  Table2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Simplified menu configuration
const topMenuItems = [
  { id: "foryou", name: "For you", icon: Home, href: "/dashboard" },
  { id: "recent", name: "Recent", icon: Clock, expandable: true },
  { id: "starred", name: "Starred", icon: Star, expandable: true },
  { id: "apps", name: "Apps", icon: AppWindow, expandable: true },
  { id: "spaces", name: "Spaces", icon: FolderKanban, expandable: true, hasAdd: true },
]

const starredItems = [{ id: "helpinbox", name: "HelpInBox", icon: "📥", href: "/dashboard" }]

const recentItems = [
  { id: "authgateway", name: "Auth Gateway", href: "/dashboard" },
  { id: "chatinbox", name: "ChatInBox", href: "/dashboard" },
]

const spacesItems = [
  {
    id: "technology",
    name: "Technology",
    hasAdd: true,
    hasMore: true,
    children: [
      { id: "intalk", name: "InTalk", icon: Table2, href: "/dt", active: true },
      { id: "intalk_dev", name: "Intalk_Dev", icon: LayoutGrid, href: "/dashboard" },
      { id: "chatinbox_2", name: "Chatinbox_2_0", icon: LayoutGrid, href: "/dashboard" },
      { id: "intalk_dev_task", name: "Intalk_Dev_task", icon: LayoutGrid, href: "/dashboard" },
      { id: "intalk_helpinbox", name: "Intalk_HelpInBox_T...", icon: LayoutGrid, href: "/dashboard" },
    ],
  },
]

const bottomMenuItems = [
  { id: "viewboards", name: "View all boards", icon: LayoutGrid, href: "/dashboard" },
  { id: "intalknewui", name: "intalk New UI", icon: FolderKanban, href: "/dashboard" },
  { id: "viewspaces", name: "View all spaces", icon: FolderKanban, href: "/dashboard" },
]

const recommendedItems = [
  { id: "roadmap", name: "Create a roadmap", tag: "TRY", href: "/dashboard" },
  { id: "templates", name: "Browse templates", href: "/dashboard" },
]

const footerMenuItems = [
  { id: "filters", name: "Filters", icon: Filter, href: "/dashboard" },
  { id: "dashboards", name: "Dashboards", icon: BarChart3, href: "/dashboard" },
  { id: "operations", name: "Operations", icon: Settings, href: "/ma" },
  { id: "assets", name: "Assets", icon: ExternalLink, href: "/dashboard", external: true },
  { id: "teams", name: "Teams", icon: Users, href: "/members", external: true },
]

export function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["spaces", "starred", "recent"])
  const [expandedProjects, setExpandedProjects] = useState<string[]>(["technology"])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

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
            "flex items-center gap-2 text-sm rounded transition-colors group",
            isCollapsed ? "px-2 py-2 justify-center" : "px-3 py-1.5",
            isChild && !isCollapsed ? "pl-8" : "",
            isActive ? "bg-accent text-primary font-medium" : "text-foreground hover:bg-muted",
          )}
          title={isCollapsed ? item.name : undefined}
        >
          {!isCollapsed && item.expandable && (
            <ChevronRight
              className={cn("h-4 w-4 transition-transform text-muted-foreground", isExpanded && "rotate-90")}
            />
          )}
          {typeof IconComponent === "string" ? (
            <span className="text-base">{IconComponent}</span>
          ) : IconComponent ? (
            <IconComponent className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
          ) : null}
          {!isCollapsed && (
            <>
              <span className="flex-1 truncate">{item.name}</span>
              {item.tag && (
                <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-medium">
                  {item.tag}
                </span>
              )}
              {item.external && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
              {item.hasAdd && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 opacity-0 group-hover:opacity-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              )}
              {item.hasMore && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 opacity-0 group-hover:opacity-100"
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
        "fixed left-0 top-14 h-[calc(100vh-56px)] flex flex-col z-20 bg-card text-foreground border-r border-border transition-all duration-300",
        isCollapsed ? "w-0 overflow-hidden opacity-0 pointer-events-none" : "w-64",
      )}
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto py-2">
        {/* Top Menu */}
        <div className="px-2 space-y-0.5">
          {topMenuItems.map((item) => (
            <div key={item.id}>
              {renderMenuItem(item)}
              {!isCollapsed && item.id === "starred" && expandedSections.includes("starred") && (
                <div className="ml-2 mt-1 space-y-0.5">{starredItems.map((child) => renderMenuItem(child, true))}</div>
              )}
              {!isCollapsed && item.id === "recent" && expandedSections.includes("recent") && (
                <div className="ml-2 mt-1 space-y-0.5">
                  {recentItems.map((child) => (
                    <Link
                      key={child.id}
                      href={child.href}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm rounded text-foreground hover:bg-muted"
                    >
                      <span className="truncate">{child.name}</span>
                    </Link>
                  ))}
                </div>
              )}
              {!isCollapsed && item.id === "spaces" && expandedSections.includes("spaces") && (
                <div className="mt-1 space-y-0.5">
                  {spacesItems.map((space) => (
                    <div key={space.id}>
                      <div
                        onClick={() => toggleProject(space.id)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm rounded cursor-pointer group text-foreground hover:bg-muted"
                      >
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform text-muted-foreground",
                            expandedProjects.includes(space.id) && "rotate-90",
                          )}
                        />
                        <span className="flex-1 truncate">{space.name}</span>
                        {space.hasAdd && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 opacity-0 group-hover:opacity-100"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        )}
                        {space.hasMore && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 opacity-0 group-hover:opacity-100"
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
                            return (
                              <Link
                                key={child.id}
                                href={child.href}
                                className={cn(
                                  "flex items-center gap-2 px-3 py-1.5 text-sm rounded",
                                  isChildActive
                                    ? "bg-accent text-primary font-medium"
                                    : "text-foreground hover:bg-muted",
                                )}
                              >
                                <ChildIcon
                                  className={cn(
                                    "h-4 w-4 flex-shrink-0",
                                    isChildActive ? "text-primary" : "text-muted-foreground",
                                  )}
                                />
                                <span className="truncate">{child.name}</span>
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {!isCollapsed && (
          <div className="px-2 mt-2 space-y-0.5">{bottomMenuItems.map((item) => renderMenuItem(item))}</div>
        )}

        {!isCollapsed && (
          <div className="px-2 mt-4">
            <div className="text-xs font-medium text-muted-foreground px-3 py-1.5 uppercase">Recommended</div>
            <div className="space-y-0.5">{recommendedItems.map((item) => renderMenuItem(item))}</div>
          </div>
        )}

        <div className="px-2 mt-4 space-y-0.5">{footerMenuItems.map((item) => renderMenuItem(item))}</div>
      </div>
    </aside>
  )
}
