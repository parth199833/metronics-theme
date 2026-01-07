import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Integrations</h1>
          <p className="text-sm text-muted-foreground">Connect and manage third-party integrations</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {["Slack", "GitHub", "Google Drive", "Stripe", "Mailchimp", "Zapier"].map((service) => (
          <Card key={service} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">{service}</h3>
              <div className="w-10 h-10 bg-muted rounded-lg"></div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Connect your {service} account</p>
            <Button variant="outline" className="w-full bg-transparent">
              Connect
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
