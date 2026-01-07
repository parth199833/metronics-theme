"use client"

import { useState, useEffect } from "react"
import {
  Home,
  FolderKanban,
  ChevronRight,
  Plus,
  MoreHorizontal,
  ExternalLink,
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

export function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["projects"])
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
            "flex items-center gap-2 text-sm rounded-md transition-all duration-150 group",
            isCollapsed ? "px-2 py-2 justify-center" : "px-3 py-2",
            isChild && !isCollapsed ? "pl-8" : "",
            isActive
              ? "bg-primary/10 text-primary font-medium"
              : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground",
          )}
          title={isCollapsed ? item.name : undefined}
        >
          {!isCollapsed && item.expandable && (
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "rotate-90",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
              )}
            />
          )}
          {typeof IconComponent === "string" ? (
            <span className="text-base">{IconComponent}</span>
          ) : IconComponent ? (
            <IconComponent
              className={cn(
                "h-4 w-4 flex-shrink-0 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
              )}
            />
          ) : null}
          {!isCollapsed && (
            <>
              <span className="flex-1 truncate">{item.name}</span>
              {item.tag && (
                <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-medium">
                  {item.tag}
                </span>
              )}
              {item.external && <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-foreground" />}
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
        "fixed left-0 top-[56px] h-[calc(100vh-45px)] flex flex-col z-20 bg-card text-foreground border-r border-border transition-all duration-300",
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
                  {projectsItems.map((space) => (
                    <div key={space.id}>
                      <div
                        onClick={() => toggleProject(space.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer group text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-all duration-150"
                      >
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform text-muted-foreground group-hover:text-foreground",
                            expandedProjects.includes(space.id) && "rotate-90",
                          )}
                        />
                        <span className="flex-1 truncate">{space.name}</span>
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
                                  "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-all duration-150 group",
                                  isChildActive
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground",
                                )}
                              >
                                <ChildIcon
                                  className={cn(
                                    "h-4 w-4 flex-shrink-0 transition-colors",
                                    isChildActive
                                      ? "text-primary"
                                      : "text-muted-foreground group-hover:text-foreground",
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
      </div>
    </aside>
  )
}
