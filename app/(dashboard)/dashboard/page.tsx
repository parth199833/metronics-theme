import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Dashboards</h1>
          <p className="text-sm text-muted-foreground">View and manage your dashboard overview</p>
        </div>
        <Button className="bg-primary text-primary-foreground">Create Dashboard</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Analytics</h3>
          <p className="text-muted-foreground mb-4">Track your key metrics</p>
          <div className="text-3xl font-bold text-primary">12.5K</div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Revenue</h3>
          <p className="text-muted-foreground mb-4">Monthly earnings</p>
          <div className="text-3xl font-bold text-primary">$45.2K</div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Users</h3>
          <p className="text-muted-foreground mb-4">Active users</p>
          <div className="text-3xl font-bold text-primary">8,462</div>
        </Card>
      </div>
    </div>
  )
}
