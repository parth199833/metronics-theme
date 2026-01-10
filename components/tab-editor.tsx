"use client"

import type React from "react"

import { useState } from "react"
import { X, Plus, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface EditorTab {
  id: string
  name: string
  icon?: React.ReactNode
  modified?: boolean
  content?: React.ReactNode
}

interface TabEditorProps {
  tabs?: EditorTab[]
  activeTabId?: string
  onTabChange?: (tabId: string) => void
  onTabClose?: (tabId: string) => void
  onAddTab?: () => void
}

export function TabEditor({
  tabs = [
    { id: "1", name: "layout.tsx", modified: false },
    { id: "2", name: "sidebar.tsx", modified: true },
    { id: "3", name: "tsconfig.json", modified: false },
    { id: "4", name: "header.tsx", modified: true },
    { id: "5", name: "page.tsx", modified: false },
  ],
  activeTabId = "1",
  onTabChange,
  onTabClose,
  onAddTab,
}: TabEditorProps) {
  const [localActiveTab, setLocalActiveTab] = useState(activeTabId)

  const handleTabClick = (tabId: string) => {
    setLocalActiveTab(tabId)
    onTabChange?.(tabId)
  }

  const handleTabClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation()
    onTabClose?.(tabId)
  }

  const activeTab = tabs.find((tab) => tab.id === localActiveTab)

  return (
    <div className="flex flex-col h-full">
      {/* Tab Bar */}
      <div className="bg-card border-b border-border flex items-center">
        {/* Tabs */}
        <div className="flex overflow-x-auto flex-1">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 cursor-pointer border-r border-border whitespace-nowrap transition-colors",
                localActiveTab === tab.id
                  ? "bg-background text-foreground border-b-2 border-b-primary"
                  : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <File className="h-4 w-4" />
              <span className="text-sm font-medium">{tab.name}</span>
              {tab.modified && <span className="h-2 w-2 rounded-full bg-primary" />}

              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-1 hover:bg-muted"
                  onClick={(e) => handleTabClose(e, tab.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              {index === tabs.length - 1 && (
                <div className="flex items-center gap-1 ml-2">
                  <div className="h-5 w-px bg-border" />
                  <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted" onClick={onAddTab}>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-background p-4">
        {activeTab?.content ? activeTab.content : <div className="text-muted-foreground">No content for this tab</div>}
      </div>
    </div>
  )
}
