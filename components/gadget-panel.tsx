"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, Search } from "lucide-react"
import { useState } from "react"

interface GadgetPanelProps {
  isOpen: boolean
  onClose: () => void
  availableGadgets: Array<{
    id: string
    name: string
    description: string
    category: string[]
    thumbnail: string
  }>
}

export function GadgetPanel({ isOpen, onClose, availableGadgets }: GadgetPanelProps) {
  const [gadgetSearchQuery, setGadgetSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categoryCounts = {
    All: availableGadgets.length,
    Jira: availableGadgets.filter((g) => g.category.includes("Jira")).length,
    Wallboard: availableGadgets.filter((g) => g.category.includes("Wallboard")).length,
    Charts: availableGadgets.filter((g) => g.category.includes("Charts")).length,
    "Jira Service Management": availableGadgets.filter((g) => g.category.includes("Jira Service Management")).length,
  }

  const filteredGadgets = availableGadgets.filter((gadget) => {
    const matchesSearch =
      gadget.name.toLowerCase().includes(gadgetSearchQuery.toLowerCase()) ||
      gadget.description.toLowerCase().includes(gadgetSearchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || gadget.category.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  return (
    <div
      className={`fixed right-0 top-14 h-[calc(100vh-56px)] w-[400px] bg-card border-l border-border transition-transform duration-300 z-20 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-base">Add a Gadget</h2>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search gadgets"
              value={gadgetSearchQuery}
              onChange={(e) => setGadgetSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="px-6 py-4 border-b border-border flex flex-wrap gap-2">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category} {count}
            </Badge>
          ))}
        </div>

        {/* Gadget List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            {filteredGadgets.map((gadget) => (
              <div
                key={gadget.id}
                className="flex gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <img
                    src={gadget.thumbnail || "/placeholder.svg"}
                    alt={gadget.name}
                    className="w-16 h-16 rounded border border-border object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <h4 className="font-semibold text-sm text-foreground truncate" title={gadget.name}>
                    {gadget.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-1">By Atlassian</p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2" title={gadget.description}>
                    {gadget.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {gadget.category.map((cat) => (
                      <Badge key={cat} variant="secondary" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 self-start">
                  <Button size="sm" className="whitespace-nowrap">
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
