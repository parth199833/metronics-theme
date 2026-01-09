"use client"

import { useState } from "react"
import { SettingsIcon, User, Bell } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function SettingsMenu() {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent">
          <SettingsIcon className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-4" align="end">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground">Personal Jira settings</h3>
        </div>

        {/* General Settings */}
        <DropdownMenuItem className="px-3 py-3 cursor-pointer flex items-start gap-3 rounded-md hover:bg-accent/50 mb-2 focus:bg-accent/50">
          <User className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-foreground">General settings</span>
            <span className="text-xs text-muted-foreground">
              Manage language, time zone, and other personal preferences
            </span>
          </div>
        </DropdownMenuItem>

        {/* Notification Settings */}
        <DropdownMenuItem className="px-3 py-3 cursor-pointer flex items-start gap-3 rounded-md hover:bg-accent/50 focus:bg-accent/50">
          <Bell className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-foreground">Notification settings</span>
            <span className="text-xs text-muted-foreground">Manage email and in-app notifications from Jira</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
