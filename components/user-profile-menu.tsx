"use client"

import { useState } from "react"
import { ChevronRight, LogOut, Settings, User, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserProfileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-blue-600 text-white text-xs font-semibold">PP</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-0" align="end">
        {/* User Info Header */}
        <div className="px-4 py-3 border-b border-border bg-muted/50">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-blue-600 text-white text-sm font-semibold">PP</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-foreground">PATEL PARTH</span>
              <span className="text-xs text-muted-foreground">parth.patel@agami-tech.com</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-1">
          <DropdownMenuItem className="px-4 py-2 cursor-pointer flex items-center gap-3 text-sm">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="px-4 py-2 cursor-pointer flex items-center gap-3 text-sm">
            <Settings className="h-4 w-4" />
            <span>Account settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="px-4 py-2 cursor-pointer flex items-center justify-between text-sm group">
            <div className="flex items-center gap-3">
              <Settings className="h-4 w-4" />
              <span>Theme</span>
            </div>
            <ChevronRight className="h-4 w-4 opacity-60 group-hover:opacity-100" />
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="my-1" />

        {/* Quickstart Section */}
        <div className="px-4 py-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Open Quickstart</p>
        </div>

        <DropdownMenuSeparator className="my-1" />

        {/* Additional Items */}
        <div className="py-1">
          <DropdownMenuItem className="px-4 py-2 cursor-pointer flex items-center gap-3 text-sm">
            <Users className="h-4 w-4" />
            <span>Switch account</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="px-4 py-2 cursor-pointer flex items-center gap-3 text-sm text-red-600 hover:text-red-700">
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
