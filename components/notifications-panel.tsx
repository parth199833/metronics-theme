"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Bell, MoreVertical, Share2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const NOTIFICATIONS = [
  {
    id: 1,
    category: "Yesterday",
    items: [
      {
        id: "n1",
        icon: "📋",
        title: "You have 1 overdue item",
        subtitle: "2 days ago",
        description: "View work",
        source: "Work Navigator",
        unread: true,
      },
      {
        id: "n2",
        icon: "📋",
        title: "You have 1 item due today",
        subtitle: "3 days ago",
        description: "View work",
        source: "Work Navigator",
        unread: true,
      },
    ],
  },
  {
    id: 2,
    category: "Older",
    items: [
      {
        id: "n3",
        avatar: "HP",
        title: "Harikrushn Prajapati changed a work item from Access Required to Under Observation",
        subtitle: "1 week ago",
        description: "Duplicate Tickets created on Patanjali Setup | hdpatanjallindia.helpinbox.io",
        tags: ["IN-34118", "Under Observation"],
        unread: true,
      },
      {
        id: "n4",
        avatars: ["HP", "AS"],
        title: "+12 updates from Harikrushn Prajapati and others",
        unread: true,
      },
      {
        id: "n5",
        icon: "📋",
        title: "You have 1 overdue item",
        subtitle: "1 week ago",
        description: "View work",
        source: "Work Navigator",
        unread: true,
      },
      {
        id: "n6",
        avatar: "AY",
        title: "Ajay Yadav mentioned you in a comment",
        subtitle: "1 week ago",
        description: "Chatinbox:- Delete Button Issue In Login Agent",
        tags: ["CHTING-422", "Not an Issue"],
        unread: true,
      },
    ],
  },
]

export function NotificationsPanel() {
  const [activeTab, setActiveTab] = useState("direct")
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-accent cursor-pointer relative transition-all duration-200"
        >
          <Bell className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0 rounded-lg shadow-lg" align="end">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Only show unread</span>
              <button
                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${showUnreadOnly ? "bg-primary" : "bg-secondary"}`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${showUnreadOnly ? "translate-x-4" : ""}`}
                ></span>
              </button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 cursor-pointer hover:bg-accent transition-all duration-150"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 cursor-pointer hover:bg-accent transition-all duration-150"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-4">
          <button
            onClick={() => setActiveTab("direct")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === "direct"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            Direct
          </button>
          <button
            onClick={() => setActiveTab("watching")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === "watching"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            Watching
          </button>
        </div>

        {/* Notifications List */}
        <div className="max-h-[500px] overflow-y-auto">
          {NOTIFICATIONS.map((group) => (
            <div key={group.id}>
              <div className="px-4 py-2 bg-secondary/50 text-sm font-medium text-muted-foreground sticky top-0">
                {group.category}
              </div>
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-3 border-b border-border hover:bg-secondary/50 cursor-pointer transition-all duration-150 flex gap-3"
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {item.avatar ? (
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{item.avatar}</AvatarFallback>
                      </Avatar>
                    ) : item.avatars ? (
                      <div className="flex -space-x-2">
                        {item.avatars.map((av) => (
                          <Avatar key={av} className="h-8 w-8 border-2 border-card">
                            <AvatarFallback className="text-xs">{av}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    ) : (
                      <div className="h-10 w-10 bg-secondary rounded flex items-center justify-center text-lg">
                        {item.icon}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        {item.subtitle && <p className="text-xs text-muted-foreground">{item.subtitle}</p>}
                        {item.description && (
                          <p className="text-xs text-primary hover:underline mt-1">{item.description}</p>
                        )}
                        {item.source && <p className="text-xs text-muted-foreground mt-1">{item.source}</p>}
                        {item.tags && (
                          <div className="flex gap-2 mt-2">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs bg-secondary/50 text-muted-foreground px-2 py-0.5 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-2">
                        {item.unread && <span className="h-2 w-2 bg-primary rounded-full"></span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
