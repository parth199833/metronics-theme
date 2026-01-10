"use client"

import { useState } from "react"
import { TabEditor } from "@/components/tab-editor"

export default function ViewAllDataPage() {
  const [tabs, setTabs] = useState([
    {
      id: "1",
      name: "Tab 1",
      modified: false,
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Tab 1 Content</h2>
          <p className="text-muted-foreground">This is sample content for Tab 1</p>
          <div className="bg-card p-4 rounded border border-border">
            <p>Sample data for Tab 1 goes here</p>
          </div>
        </div>
      ),
    },
    {
      id: "2",
      name: "Tab 2",
      modified: true,
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Tab 2 Content</h2>
          <p className="text-muted-foreground">This is sample content for Tab 2</p>
          <div className="bg-card p-4 rounded border border-border">
            <p>Sample data for Tab 2 goes here</p>
          </div>
        </div>
      ),
    },
    {
      id: "3",
      name: "Tab 3",
      modified: false,
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Tab 3 Content</h2>
          <p className="text-muted-foreground">This is sample content for Tab 3</p>
          <div className="bg-card p-4 rounded border border-border">
            <p>Sample data for Tab 3 goes here</p>
          </div>
        </div>
      ),
    },
    {
      id: "4",
      name: "Tab 4",
      modified: true,
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Tab 4 Content</h2>
          <p className="text-muted-foreground">This is sample content for Tab 4</p>
          <div className="bg-card p-4 rounded border border-border">
            <p>Sample data for Tab 4 goes here</p>
          </div>
        </div>
      ),
    },
    {
      id: "5",
      name: "Tab 5",
      modified: false,
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Tab 5 Content</h2>
          <p className="text-muted-foreground">This is sample content for Tab 5</p>
          <div className="bg-card p-4 rounded border border-border">
            <p>Sample data for Tab 5 goes here</p>
          </div>
        </div>
      ),
    },
  ])
  const [activeTabId, setActiveTabId] = useState("1")

  const handleTabClose = (tabId: string) => {
    setTabs(tabs.filter((tab) => tab.id !== tabId))
    if (activeTabId === tabId && tabs.length > 1) {
      setActiveTabId(tabs[0].id !== tabId ? tabs[0].id : tabs[1].id)
    }
  }

  const handleAddTab = () => {
    const newTab = {
      id: Date.now().toString(),
      name: `untitled-${tabs.length + 1}.tsx`,
      modified: true,
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">New Tab Content</h2>
          <p className="text-muted-foreground">This is sample content for the new tab</p>
          <div className="bg-card p-4 rounded border border-border">
            <p>Sample data for the new tab goes here</p>
          </div>
        </div>
      ),
    }
    setTabs([...tabs, newTab])
    setActiveTabId(newTab.id)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* Breadcrumb & Project Header */}

      <TabEditor
        tabs={tabs}
        activeTabId={activeTabId}
        onTabChange={setActiveTabId}
        onTabClose={handleTabClose}
        onAddTab={handleAddTab}
      />
    </div>
  )
}
