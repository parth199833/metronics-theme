"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ChevronDown,
  ChevronRight,
  Search,
  Sparkles,
  Plus,
  LayoutGrid,
  List,
  MoreHorizontal,
  Equal,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Types
export type Issue = {
  id: string
  type: "bug" | "task" | "story" | "improvement"
  title: string
  status: "todo" | "new" | "in_progress" | "under_observation" | "released" | "dev_review_done" | "fix_at_customer"
  priority: "lowest" | "low" | "medium" | "high" | "highest"
  assignee: string | null
  dueDate: string | null
  component: string | null
  project: string
}

// Sample data
const sampleData: Issue[] = [
  {
    id: "IN-34108",
    type: "bug",
    title: "QAUI - CRM Data Misaligned in Exported CDR CSV",
    status: "todo",
    priority: "medium",
    assignee: null,
    dueDate: null,
    component: "CDR",
    project: "Technology",
  },
  {
    id: "IN-34107",
    type: "improvement",
    title: "Ethernet | Smartpingcc | Pass Dynamic ID in Webform URL Based on Customer Number During Call",
    status: "new",
    priority: "medium",
    assignee: null,
    dueDate: null,
    component: null,
    project: "Technology",
  },
  {
    id: "IN-34106",
    type: "bug",
    title: "QAUI - CRM Fields Inside Panel and Table Layouts Not Available for Mapping in Call List",
    status: "todo",
    priority: "medium",
    assignee: null,
    dueDate: null,
    component: "Call List",
    project: "Technology",
  },
  {
    id: "IN-34105",
    type: "bug",
    title: "QAUI - Mismatch Between CRM Report UI Data and Exported CSV",
    status: "todo",
    priority: "medium",
    assignee: null,
    dueDate: null,
    component: "Report",
    project: "Technology",
  },
  {
    id: "IN-34103",
    type: "bug",
    title: "QAUI - Missing and Incomplete CRM Field Columns in CRM Report",
    status: "todo",
    priority: "medium",
    assignee: null,
    dueDate: null,
    component: "Report",
    project: "Technology",
  },
  {
    id: "IN-34102",
    type: "task",
    title: "Discrepancy in CRM report | bbbnoida.smartpingcc.io",
    status: "under_observation",
    priority: "high",
    assignee: "Diya Soni",
    dueDate: null,
    component: null,
    project: "Technology",
  },
  {
    id: "IN-34101",
    type: "task",
    title: "CLONE - Quick Heal (GENERIC) : Add AWS Polly Support for TTS",
    status: "released",
    priority: "highest",
    assignee: "Kundan Prabhakar",
    dueDate: null,
    component: null,
    project: "Technology",
  },
  {
    id: "IN-34100",
    type: "bug",
    title: "QAUI - OnCallCRM Validation Message Shown Without Highlighting Mandatory Fields",
    status: "todo",
    priority: "medium",
    assignee: null,
    dueDate: null,
    component: "call",
    project: "Technology",
  },
  {
    id: "IN-34098",
    type: "bug",
    title: "QAUI - CRM Columns Not Properly Displayed in CDR When Include CRM Details Is Enabled",
    status: "todo",
    priority: "medium",
    assignee: null,
    dueDate: null,
    component: "CDR",
    project: "Technology",
  },
  {
    id: "IN-34096",
    type: "story",
    title: "Protium- New CDR, APR, Call History Report",
    status: "in_progress",
    priority: "medium",
    assignee: null,
    dueDate: null,
    component: null,
    project: "Technology",
  },
  {
    id: "IN-34094",
    type: "task",
    title: "MOSLDadsales – user_key value visible in the login page when we do view source code page",
    status: "fix_at_customer",
    priority: "medium",
    assignee: "Modh Pruthvi",
    dueDate: "06 Jan 2026",
    component: null,
    project: "Technology",
  },
  {
    id: "IN-34092",
    type: "improvement",
    title: "Jeenasikho | Syncing Abandoned call & Autoblast call data on SF",
    status: "in_progress",
    priority: "medium",
    assignee: null,
    dueDate: null,
    component: null,
    project: "Technology",
  },
  {
    id: "IN-34091",
    type: "bug",
    title: "QAPROD : Duplicate Package Names Allowed in AUTH Portal Package Module",
    status: "todo",
    priority: "medium",
    assignee: "Sanjay Choudhary",
    dueDate: null,
    component: "Others",
    project: "Technology",
  },
  {
    id: "IN-34089",
    type: "task",
    title: "CLONE - Invalid characters | smartping-AKA",
    status: "dev_review_done",
    priority: "highest",
    assignee: "Modh Pruthvi",
    dueDate: "07 Jan 2026",
    component: null,
    project: "Technology",
  },
  {
    id: "IN-34084",
    type: "task",
    title: "Invalid characters | smartping-AKA",
    status: "under_observation",
    priority: "highest",
    assignee: "Modh Pruthvi",
    dueDate: "07 Jan 2026",
    component: null,
    project: "Technology",
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: Issue["status"] }) => {
  const statusConfig = {
    todo: { label: "TO DO", className: "bg-gray-600 text-white" },
    new: { label: "NEW", className: "bg-blue-500 text-white" },
    in_progress: { label: "ANALYSIS IN PROGRESS", className: "bg-blue-600 text-white" },
    under_observation: { label: "UNDER OBSERVATION", className: "bg-yellow-500 text-black" },
    released: { label: "RELEASED TO QA", className: "bg-green-600 text-white" },
    dev_review_done: { label: "DEV REVIEW DONE", className: "bg-green-500 text-white" },
    fix_at_customer: { label: "FIX AT CUSTOMER ENV", className: "bg-cyan-500 text-white" },
  }

  const config = statusConfig[status]
  return (
    <Badge variant="secondary" className={cn("text-xs font-medium whitespace-nowrap", config.className)}>
      {config.label}
    </Badge>
  )
}

// Priority icon component
const PriorityIcon = ({ priority }: { priority: Issue["priority"] }) => {
  const priorityConfig = {
    lowest: { icon: ArrowDown, className: "text-blue-400", label: "Lowest" },
    low: { icon: ArrowDown, className: "text-green-400", label: "Low" },
    medium: { icon: Equal, className: "text-yellow-500", label: "Medium" },
    high: { icon: ArrowUp, className: "text-orange-500", label: "High" },
    highest: { icon: ArrowUp, className: "text-red-500", label: "Highest" },
  }

  const config = priorityConfig[priority]
  const Icon = config.icon
  return (
    <div className="flex items-center gap-2">
      <Icon className={cn("h-4 w-4", config.className)} />
      <span className="text-sm">{config.label}</span>
    </div>
  )
}

// Type icon component
const TypeIcon = ({ type }: { type: Issue["type"] }) => {
  const typeConfig = {
    bug: { color: "text-red-500", bgColor: "bg-red-500" },
    task: { color: "text-blue-500", bgColor: "bg-blue-500" },
    story: { color: "text-green-500", bgColor: "bg-green-500" },
    improvement: { color: "text-yellow-500", bgColor: "bg-yellow-500" },
  }

  const config = typeConfig[type]
  return (
    <div className={cn("w-4 h-4 rounded-sm flex items-center justify-center", config.bgColor)}>
      {type === "bug" && <span className="text-white text-xs">●</span>}
      {type === "task" && <Checkbox className="w-3 h-3 border-white" checked disabled />}
      {type === "story" && <span className="text-white text-xs">▲</span>}
      {type === "improvement" && <span className="text-white text-xs">↑</span>}
    </div>
  )
}

// Assignee component
const AssigneeCell = ({ assignee }: { assignee: string | null }) => {
  if (!assignee) {
    return (
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6 bg-gray-200">
          <AvatarFallback className="text-xs text-gray-500">?</AvatarFallback>
        </Avatar>
        <span className="text-sm text-muted-foreground">Unassigned</span>
      </div>
    )
  }

  const initials = assignee
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500", "bg-cyan-500"]
  const colorIndex = assignee.length % colors.length

  return (
    <div className="flex items-center gap-2">
      <Avatar className={cn("h-6 w-6", colors[colorIndex])}>
        <AvatarFallback className="text-xs text-white">{initials}</AvatarFallback>
      </Avatar>
      <span className="text-sm truncate max-w-[120px]">{assignee}</span>
    </div>
  )
}

// Column definitions
const columns: ColumnDef<Issue>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Work",
    cell: ({ row }) => {
      const issue = row.original
      return (
        <div className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
          <TypeIcon type={issue.type} />
          <span className="text-primary font-medium">{issue.id}</span>
          <span className="text-sm truncate max-w-[400px]">{issue.title}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => <PriorityIcon priority={row.getValue("priority")} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    cell: ({ row }) => <AssigneeCell assignee={row.getValue("assignee")} />,
    filterFn: (row, id, value) => {
      const assignee = row.getValue(id) as string | null
      if (value.includes("unassigned") && !assignee) return true
      if (assignee && value.includes(assignee)) return true
      return false
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due date",
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate") as string | null
      return <span className="text-sm">{dueDate || "None"}</span>
    },
  },
  {
    accessorKey: "component",
    header: "Comp",
    cell: ({ row }) => {
      const component = row.getValue("component") as string | null
      if (!component) return <span className="text-sm text-muted-foreground">None</span>
      return (
        <Badge variant="outline" className="text-xs">
          {component}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View details</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [activeTab, setActiveTab] = React.useState<"basic" | "jql">("basic")

  const table = useReactTable({
    data: sampleData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: (row, columnId, filterValue) => {
      const searchValue = filterValue.toLowerCase()
      const id = row.original.id.toLowerCase()
      const title = row.original.title.toLowerCase()
      return id.includes(searchValue) || title.includes(searchValue)
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
  })

  const uniqueStatuses = [...new Set(sampleData.map((d) => d.status))]
  const uniquePriorities = [...new Set(sampleData.map((d) => d.priority))]
  const uniqueAssignees = [
    "unassigned",
    ...new Set(sampleData.filter((d) => d.assignee).map((d) => d.assignee as string)),
  ]

  return (
    <div className="w-full space-y-4">
      {/* Filter Bar */}
      <div className="data-table-filters flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">


 

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search work"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-8 w-[200px] pl-8 rounded-none"
            />
          </div>

          {/* Project Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="sm" className="h-8 gap-1 rounded-none">
                Project
                <span className="text-xs">=</span>
                <ChevronDown className="h-3 w-3" />
                Technology
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-none">
              <DropdownMenuItem>Technology</DropdownMenuItem>
              <DropdownMenuItem>Marketing</DropdownMenuItem>
              <DropdownMenuItem>Sales</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Assignee Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 bg-transparent rounded-none">
                Assignee
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-none">
              {uniqueAssignees.map((assignee) => (
                <DropdownMenuCheckboxItem
                  key={assignee}
                  checked={
                    (table.getColumn("assignee")?.getFilterValue() as string[] | undefined)?.includes(assignee) ?? false
                  }
                  onCheckedChange={(checked) => {
                    const current = (table.getColumn("assignee")?.getFilterValue() as string[]) || []
                    if (checked) {
                      table.getColumn("assignee")?.setFilterValue([...current, assignee])
                    } else {
                      table.getColumn("assignee")?.setFilterValue(current.filter((v) => v !== assignee))
                    }
                  }}
                >
                  {assignee === "unassigned" ? "Unassigned" : assignee}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 bg-transparent rounded-none">
                Type
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-none">
              <DropdownMenuCheckboxItem>Bug</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Task</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Story</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Improvement</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 bg-transparent rounded-none">
                Status
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-none">
              {uniqueStatuses.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={
                    (table.getColumn("status")?.getFilterValue() as string[] | undefined)?.includes(status) ?? false
                  }
                  onCheckedChange={(checked) => {
                    const current = (table.getColumn("status")?.getFilterValue() as string[]) || []
                    if (checked) {
                      table.getColumn("status")?.setFilterValue([...current, status])
                    } else {
                      table.getColumn("status")?.setFilterValue(current.filter((v) => v !== status))
                    }
                  }}
                >
                  {status.replace(/_/g, " ").toUpperCase()}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* More Filters */}
          <Button variant="outline" size="sm" className="h-8 gap-1 bg-transparent rounded-none">
            More filters
            <ChevronDown className="h-4 w-4" />
          </Button>

          {/* Save Filter */}
          <Button variant="link" size="sm" className="h-8 text-primary">
            Save filter
          </Button>
        </div>

       
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground">
          <Plus className="h-4 w-4" />
          Create
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {table.getFilteredRowModel().rows.length} of {sampleData.length}+
          </span>
          <Button variant="ghost" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="ghost" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
