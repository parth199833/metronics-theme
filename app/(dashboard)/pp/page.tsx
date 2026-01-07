import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PublicProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Public Profile</h1>
          <p className="text-sm text-muted-foreground">Manage your public profile information</p>
        </div>
        <Button className="bg-primary text-primary-foreground">Edit Profile</Button>
      </div>
      <Card className="p-6">
        <div className="flex items-start space-x-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2">John Doe</h3>
            <p className="text-muted-foreground mb-4">Senior Developer at Company Inc.</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <span className="font-medium text-foreground w-24">Email:</span>
                <span className="text-muted-foreground">john@example.com</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-medium text-foreground w-24">Location:</span>
                <span className="text-muted-foreground">San Francisco, CA</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-medium text-foreground w-24">Joined:</span>
                <span className="text-muted-foreground">January 2024</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
