"use client"

import * as React from "react"
import { ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const operatorOptions = [
  { value: "equals", label: "= (equals)" },
  { value: "not_equals", label: "!= (not equals)" },
  { value: "is_empty", label: "is empty" },
  { value: "is_not_empty", label: "is not empty" },
  { value: "in", label: "in" },
  { value: "not_in", label: "not in" },
]

export interface FilterOption {
  id: string
  name: string
  icon?: React.ReactNode
  color?: string
  initials?: string
}

export interface FilterGroup {
  label: string
  options: FilterOption[]
}

interface JiraFilterProps {
  label: string
  value: string[]
  onChange: (value: string[]) => void
  options?: FilterOption[]
  groups?: FilterGroup[]
  showSearch?: boolean
  searchPlaceholder?: string
  showAvatar?: boolean
  showOperator?: boolean
}

export function JiraFilter({
  label,
  value,
  onChange,
  options = [],
  groups = [],
  showSearch = true,
  searchPlaceholder = "Search",
  showAvatar = false,
  showOperator = true,
}: JiraFilterProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedOperator, setSelectedOperator] = React.useState("equals")
  const [operatorDropdownOpen, setOperatorDropdownOpen] = React.useState(false)

  // Filter options based on search query
  const filteredOptions = options.filter((option) => option.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredGroups = groups
    .map((group) => ({
      ...group,
      options: group.options.filter((option) => option.name.toLowerCase().includes(searchQuery.toLowerCase())),
    }))
    .filter((group) => group.options.length > 0)

  const toggleValue = (newValue: string) => {
    if (value.includes(newValue)) {
      onChange(value.filter((v) => v !== newValue))
    } else {
      onChange([...value, newValue])
    }
  }

  const isSelected = (val: string) => value.includes(val)

  const currentOperatorLabel = operatorOptions.find((op) => op.value === selectedOperator)?.label || "= (equals)"

  const renderOption = (option: FilterOption) => (
    <div
      key={option.id}
      className={cn(
        "flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-accent/50",
        isSelected(option.id) && "bg-accent",
      )}
      onClick={() => toggleValue(option.id)}
    >
      <Checkbox checked={isSelected(option.id)} className="h-4 w-4" />
      {showAvatar ? (
        <Avatar className={cn("h-6 w-6", option.color || "bg-gray-400")}>
          <AvatarFallback className="text-xs text-white">{option.initials || option.name.charAt(0)}</AvatarFallback>
        </Avatar>
      ) : option.icon ? (
        <div className="flex items-center justify-center w-5 h-5">{option.icon}</div>
      ) : null}
      <span className="text-sm text-foreground">{option.name}</span>
    </div>
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("h-8 gap-1 bg-transparent rounded-none", value.length > 0 && "border-primary text-primary")}
        >
          {label}
          {value.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded">
              {value.length}
            </span>
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0 rounded-none shadow-lg" align="start">
        {/* Header with Operator Dropdown */}
        {showOperator && (
          <div className="py-2 border-b border-border px-[9px]">
            <Popover open={operatorDropdownOpen} onOpenChange={setOperatorDropdownOpen}>
              <PopoverTrigger asChild>
                <button className="flex items-center justify-between w-full bg-muted/50 hover:bg-muted border border-border rounded px-2 py-1.5 transition-colors">
                  <span className="text-sm font-medium text-foreground">
                    {label} {currentOperatorLabel}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground ml-2" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0 rounded-none shadow-lg" align="start">
                <div className="py-1">
                  {operatorOptions.map((option) => (
                    <button
                      key={option.value}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm hover:bg-accent/50",
                        selectedOperator === option.value && "bg-accent",
                      )}
                      onClick={() => {
                        setSelectedOperator(option.value)
                        setOperatorDropdownOpen(false)
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* Search Input */}
        {showSearch && (
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-8 rounded-sm border-border"
              />
            </div>
          </div>
        )}

        {/* Options List */}
        <div className="max-h-[300px] overflow-y-auto">
          {/* Flat options */}
          {filteredOptions.length > 0 && filteredOptions.map(renderOption)}

          {/* Grouped options */}
          {filteredGroups.map((group) => (
            <React.Fragment key={group.label}>
              <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-muted/30 border-y border-border">
                {group.label}
              </div>
              {group.options.map(renderOption)}
            </React.Fragment>
          ))}

          {/* No results */}
          {filteredOptions.length === 0 && filteredGroups.length === 0 && (
            <div className="px-3 py-4 text-sm text-muted-foreground text-center">No results found</div>
          )}
        </div>

        {/* Footer */}
        <div className="px-3 py-2 border-t border-border flex items-center justify-between">
          <button className="text-sm text-muted-foreground hover:text-foreground">Show full list</button>
          {value.length > 0 && (
            <button className="text-sm text-primary hover:underline" onClick={() => onChange([])}>
              Clear
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
