"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  GanttChart,
  Layers,
  Zap,
  Calendar,
  BarChart3,
  List,
  FileText,
  Target,
  Grid3X3,
  Puzzle,
  Code,
  GitBranch,
  Tag,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface TabNavigationProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

const tabs = [
  { id: "summary", name: "Summary", icon: LayoutDashboard },
  { id: "timeline", name: "Timeline", icon: GanttChart },
  { id: "backlog", name: "Backlog", icon: Layers },
  { id: "sprints", name: "Active sprints", icon: Zap },
  { id: "calendar", name: "Calendar", icon: Calendar },
  { id: "reports", name: "Reports", icon: BarChart3 },
  { id: "list", name: "List", icon: List },
  { id: "forms", name: "Forms", icon: FileText },
  { id: "goals", name: "Goals", icon: Target },
  { id: "allwork", name: "All work", icon: Grid3X3, active: true },
  { id: "components", name: "Components", icon: Puzzle },
  { id: "development", name: "Development", icon: Code },
  { id: "code", name: "Code", icon: GitBranch },
  { id: "releases", name: "Releases", icon: Tag },
]

export function TabNavigation({ activeTab = "allwork", onTabChange }: TabNavigationProps) {
  return (
    <div className="flex items-center gap-1 border-b border-border px-2 overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id || tab.active
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-[1px]",
              isActive
                ? "text-primary border-primary"
                : "text-muted-foreground hover:text-foreground border-transparent hover:border-border",
            )}
          >
            <Icon className="h-4 w-4" />
            {tab.name}
          </button>
        )
      })}
      <Button variant="ghost" size="sm" className="text-muted-foreground gap-1">
        More <span className="text-xs bg-muted px-1.5 py-0.5 rounded">6</span>
        <ChevronDown className="h-3 w-3" />
      </Button>
    </div>
  )
}
