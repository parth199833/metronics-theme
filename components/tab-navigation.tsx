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
    null
  )
}
