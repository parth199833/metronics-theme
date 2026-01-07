import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown, Shield, Users, Apple, Smartphone, CheckCircle, ToggleLeft } from "lucide-react"

export default function MyAccountPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-8 mb-8 border-b border-border">
        <button className="pb-4 text-sm text-muted-foreground hover:text-foreground">Account</button>
        <button className="pb-4 text-sm text-muted-foreground hover:text-foreground">Billing</button>
        <button className="pb-4 text-sm text-primary font-medium border-b-2 border-primary">Security</button>
        <button className="pb-4 text-sm text-muted-foreground hover:text-foreground">Members & Roles</button>
        <button className="pb-4 text-sm text-muted-foreground hover:text-foreground">Integrations</button>
        <button className="pb-4 text-sm text-muted-foreground hover:text-foreground">Notifications</button>
        <button className="pb-4 text-sm text-muted-foreground hover:text-foreground">API Keys</button>
        <button className="pb-4 text-sm text-muted-foreground hover:text-foreground flex items-center space-x-1">
          <span>More</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-foreground mb-1">Security Overview</h1>
          <p className="text-sm text-muted-foreground">Central Hub for Personal Customization</p>
        </div>
        <Button variant="outline" className="text-sm text-primary border-primary hover:bg-primary/10 bg-transparent">
          Security History
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Tips Card */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-base font-bold text-foreground mb-3">
                  Essential Personal Security Tips for Enhanced Safety
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Transform your living space beautifully with our Restyle Your Space: Soft Goods Makeover Ideas
                  tutorial
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-foreground">Strong Passwords</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-foreground">Two-Factor Authentication</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-foreground">Budget-Friendly</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-foreground">Fresh Look</span>
                  </div>
                </div>

                <Button variant="link" className="text-primary p-0 h-auto font-normal">
                  Review Security Tips
                </Button>
              </div>

              <div className="ml-6">
                <div className="w-32 h-24 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Active Sessions */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Apple className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">iOS</div>
                  <div className="text-xs text-muted-foreground">Active Sessions</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">24</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Android</div>
                  <div className="text-xs text-muted-foreground">Active Sessions</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">35</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Security Knowledge Card */}
      <Card className="mt-6 p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <div className="w-6 h-6 bg-orange-500 rounded transform rotate-45"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-foreground mb-2">
              Enhancing Security Knowledge: Guides, Tips, and Documentation
            </h3>
            <p className="text-sm text-muted-foreground">
              Explore comprehensive resources to strengthen security understanding through detailed guides, expert tips,
              and documentation
            </p>
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="mt-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">Prevent members from inviting others</span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">Pro</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Restrict members from sending invites to new potential members.
              </p>
            </div>
          </div>
          <ToggleLeft className="w-8 h-8 text-muted-foreground" />
        </div>
      </Card>
    </div>
  )
}
