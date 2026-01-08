import { DataTable } from "@/components/data-table/data-table"
import { TabNavigation } from "@/components/tab-navigation"
import { Users, MoreHorizontal, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DataTablePage() {
  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* Breadcrumb & Project Header */}
      <div className="border-b border-border bg-card px-[15px] py-[5px]">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span className="hover:underline cursor-pointer">Spaces</span>
          <span>/</span>
          <span className="hover:underline cursor-pointer">Technology</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-foreground">InTalk</h1>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Users className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Maximize2 className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-card">
        <TabNavigation />
      </div>

      {/* Data Table Content */}
      <div className="flex-1 overflow-auto p-4 bg-card">
        <DataTable />
      </div>
    </div>
  )
}
