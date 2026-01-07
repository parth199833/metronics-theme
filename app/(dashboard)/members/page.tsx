import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function MembersRolesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Members & Roles</h1>
          <p className="text-sm text-muted-foreground">Manage team members and their permissions</p>
        </div>
        <Button className="bg-primary text-primary-foreground">Invite Member</Button>
      </div>
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Team Members</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-foreground">User {i}</div>
                  <div className="text-xs text-muted-foreground">user{i}@example.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Admin</span>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
