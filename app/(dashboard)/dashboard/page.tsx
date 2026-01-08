"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Star, LinkIcon, RefreshCw, Edit2, MoreHorizontal, Maximize2, Copy, Plus } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { GadgetPanel } from "@/components/gadget-panel"

const statusData = [
  { name: "Done", value: 960 },
  { name: "Re Test", value: 29 },
  { name: "Released to QA", value: 22 },
  { name: "Limitation", value: 16 },
  { name: "Not an Issue", value: 16 },
  { name: "Duplicate", value: 15 },
  { name: "QA On Hold", value: 14 },
]

const priorityData = [
  { name: "Medium", value: 761 },
  { name: "High", value: 212 },
  { name: "Low", value: 87 },
  { name: "Highest", value: 32 },
  { name: "Lowest", value: 6 },
]

const statusColors = ["#3B82F6", "#EF4444", "#FBBF24", "#10B981", "#6366F1", "#A855F7", "#6B7280"]
const priorityColors = ["#3B82F6", "#EF4444", "#FBBF24", "#10B981", "#06B6D4"]

const availableGadgets = [
  {
    id: "activity-stream",
    name: "Activity Stream",
    description: "Lists recent activity in a single space, or in all spaces.",
    category: ["Jira", "Wallboard"],
    thumbnail: "/placeholder.svg?height=60&width=80",
  },
  {
    id: "assigned-to-me",
    name: "Assigned to Me",
    description: "Displays all unresolved issues assigned to me",
    category: ["Jira"],
    thumbnail: "/placeholder.svg?height=60&width=80",
  },
  {
    id: "average-age-chart",
    name: "Average Age Chart",
    description: "Displays the average number of days issues have been unresolved.",
    category: ["Jira", "Charts"],
    thumbnail: "/placeholder.svg?height=60&width=80",
  },
  {
    id: "average-times-in-status",
    name: "Average Number of Times in Status",
    description: "Displays the average number of times issues have been in a status.",
    category: ["Jira", "Charts"],
    thumbnail: "/placeholder.svg?height=60&width=80",
  },
  {
    id: "average-time-in-status",
    name: "Average Time in Status",
    description: "Displays the average number of days resolved issues have spent in a status.",
    category: ["Jira", "Charts"],
    thumbnail: "/placeholder.svg?height=60&width=80",
  },
]

export default function DashboardPage() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentLayout, setCurrentLayout] = useState<
    "one-column" | "two-column" | "three-column" | "left-sidebar" | "right-sidebar"
  >("two-column")
  const [layoutDropdownOpen, setLayoutDropdownOpen] = useState(false)
  const [isGadgetPanelOpen, setIsGadgetPanelOpen] = useState(false)
  const [gadgetSearchQuery, setGadgetSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const layoutOptions = [
    { id: "one-column", label: "One column", icon: "▭", gridClass: "grid-cols-1" },
    { id: "two-column", label: "Two column", icon: "▭▭", gridClass: "grid-cols-1 lg:grid-cols-2" },
    { id: "three-column", label: "Three column", icon: "▭▭▭", gridClass: "grid-cols-1 lg:grid-cols-3" },
    { id: "left-sidebar", label: "Left sidebar", icon: "▌▭", gridClass: "grid-cols-1 lg:grid-cols-[300px_1fr]" },
    { id: "right-sidebar", label: "Right sidebar", icon: "▭▐", gridClass: "grid-cols-1 lg:grid-cols-[1fr_300px]" },
  ] as const

  const currentLayoutClass =
    layoutOptions.find((opt) => opt.id === currentLayout)?.gridClass || "grid-cols-1 lg:grid-cols-2"

  const filteredGadgets = availableGadgets.filter((gadget) => {
    const matchesSearch =
      gadget.name.toLowerCase().includes(gadgetSearchQuery.toLowerCase()) ||
      gadget.description.toLowerCase().includes(gadgetSearchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || gadget.category.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  const categoryCounts = {
    All: availableGadgets.length,
    Jira: availableGadgets.filter((g) => g.category.includes("Jira")).length,
    Wallboard: availableGadgets.filter((g) => g.category.includes("Wallboard")).length,
    Charts: availableGadgets.filter((g) => g.category.includes("Charts")).length,
    "Jira Service Management": availableGadgets.filter((g) => g.category.includes("Jira Service Management")).length,
  }

  return (
    <div className="flex h-full">
      {/* Main Dashboard Content */}
      <div
        className={`flex-1 px-4 py-4 space-y-6 transition-all duration-300 ${isGadgetPanelOpen ? "mr-[400px]" : ""}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 leading-7">
          <div>
            <h1 className="font-bold text-foreground text-lg">Intalk New UI - Bug Status React Team</h1>
          </div>
          <div className="flex items-center gap-2">
            {isEditMode ? (
              <>
                <Button variant="ghost" size="icon" className="text-yellow-500 hover:text-yellow-600">
                  <Star className="h-5 w-5 fill-yellow-500" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                  onClick={() => setIsGadgetPanelOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add gadget
                </Button>
                <Popover open={layoutDropdownOpen} onOpenChange={setLayoutDropdownOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent border-primary text-primary">
                      Change layout
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3 bg-card" align="end">
                    <div className="flex gap-2">
                      {layoutOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setCurrentLayout(option.id)
                            setLayoutDropdownOpen(false)
                          }}
                          className={`group relative flex flex-col items-center justify-center rounded border-2 transition-colors w-12 h-12 ${
                            currentLayout === option.id
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50 hover:bg-accent"
                          }
                          `}
                          title={option.label}
                        >
                          <span className="text-lg font-bold text-foreground">{option.icon}</span>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <Button size="sm" className="gap-2" onClick={() => setIsEditMode(false)}>
                  Done
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Star className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <LinkIcon className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                  onClick={() => setIsEditMode(true)}
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Blue Accent Line */}
        <div className="h-px bg-primary/10"></div>

        {/* Charts Grid */}
        <div className={`grid ${currentLayoutClass} gap-6`}>
          {/* Status Chart */}
          <Card className="p-6 bg-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground text-base">Pie Chart: Intalk New UI Task Status</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={statusColors[index % statusColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-foreground">Status</p>
                <p className="text-sm text-muted-foreground">Total Issues: 1098</p>
              </div>
              <div className="space-y-2">
                {statusData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors[index] }}></div>
                      <span className="text-foreground">{item.name}</span>
                    </div>
                    <span className="text-muted-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Priority Chart */}
          <Card className="p-6 bg-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground text-base">Pie Chart: Intalk New UI Priority</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={priorityColors[index % priorityColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-foreground">Priority</p>
                <p className="text-sm text-muted-foreground">Total Issues: 1098</p>
              </div>
              <div className="space-y-2">
                {priorityData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: priorityColors[index] }}></div>
                      <span className="text-foreground">{item.name}</span>
                    </div>
                    <span className="text-muted-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
              {/* Moved footer inside card at bottom */}
              <div className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Last refreshed 30 seconds ago
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        {/* <div className="text-sm text-muted-foreground flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Last refreshed 30 seconds ago
        </div> */}
      </div>

      <GadgetPanel
        isOpen={isGadgetPanelOpen}
        onClose={() => setIsGadgetPanelOpen(false)}
        availableGadgets={availableGadgets}
      />
    </div>
  )
}
