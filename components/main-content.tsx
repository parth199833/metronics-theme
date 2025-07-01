"use client"

import { ChevronDown, Shield, Users, Apple, Smartphone, CheckCircle, ToggleLeft, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { ThemeCustomizer } from "@/components/theme-customizer"

interface MainContentProps {
  activePage: string
}

export function MainContent({ activePage }: MainContentProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const renderPageContent = () => {
    switch (activePage) {
      case "analytics":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Analytics Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">View your analytics and performance metrics</p>
              </div>
            </div>
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analytics Overview</h3>
              <p className="text-gray-600 dark:text-gray-400">Analytics content will be displayed here.</p>
            </Card>
          </div>
        )
      case "reports":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Reports</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Generate and view detailed reports</p>
              </div>
            </div>
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reports Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400">Reports content will be displayed here.</p>
            </Card>
          </div>
        )
      case "statistics":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Statistics</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">View statistical data and insights</p>
              </div>
            </div>
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Statistics Overview</h3>
              <p className="text-gray-600 dark:text-gray-400">Statistics content will be displayed here.</p>
            </Card>
          </div>
        )
      case "profile-settings":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Profile Settings</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage your profile settings and preferences</p>
              </div>
            </div>
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Configuration</h3>
              <p className="text-gray-600 dark:text-gray-400">Profile settings content will be displayed here.</p>
            </Card>
          </div>
        )
      case "personal-info":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Personal Information</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Update your personal information</p>
              </div>
            </div>
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Details</h3>
              <p className="text-gray-600 dark:text-gray-400">Personal information content will be displayed here.</p>
            </Card>
          </div>
        )
      case "privacy":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Privacy Settings</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage your privacy and security settings</p>
              </div>
            </div>
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Privacy Controls</h3>
              <p className="text-gray-600 dark:text-gray-400">Privacy settings content will be displayed here.</p>
            </Card>
          </div>
        )
      case "manage-members":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Manage Members</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add, remove, and manage team members</p>
              </div>
            </div>
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Members</h3>
              <p className="text-gray-600 dark:text-gray-400">Member management content will be displayed here.</p>
            </Card>
          </div>
        )
      case "role-permissions":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Role Permissions</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Configure roles and permissions</p>
              </div>
            </div>
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Permission Settings</h3>
              <p className="text-gray-600 dark:text-gray-400">Role permissions content will be displayed here.</p>
            </Card>
          </div>
        )
      case "invitations":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Invitations</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Send and manage invitations</p>
              </div>
            </div>
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Invitation Management</h3>
              <p className="text-gray-600 dark:text-gray-400">Invitations content will be displayed here.</p>
            </Card>
          </div>
        )
      default:
        // Return the original Security content
        return (
          <>
            {/* Top Navigation */}
            <div className="flex items-center space-x-8 mb-8 border-b border-gray-200">
              <button className="pb-4 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Account
              </button>
              <button className="pb-4 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Billing
              </button>
              <button className="pb-4 text-sm text-blue-600 font-medium border-b-2 border-blue-600">Security</button>
              <button className="pb-4 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Members & Roles
              </button>
              <button className="pb-4 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Integrations
              </button>
              <button className="pb-4 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Notifications
              </button>
              <button className="pb-4 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                API Keys
              </button>
              <button className="pb-4 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center space-x-1">
                <span>More</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Security Overview</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Central Hub for Personal Customization</p>
              </div>
              <Button
                variant="outline"
                className="text-sm text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
              >
                Security History
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Security Tips Card */}
              <div className="lg:col-span-2">
                <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
                        Essential Personal Security Tips for Enhanced Safety
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                        Transform your living space beautifully with our Restyle Your Space: Soft Goods Makeover Ideas
                        tutorial
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Strong Passwords</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Two-Factor Authentication</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Budget-Friendly</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Fresh Look</span>
                        </div>
                      </div>

                      <Button variant="link" className="text-blue-600 p-0 h-auto font-normal">
                        Review Security Tips
                      </Button>
                    </div>

                    <div className="ml-6">
                      <div className="w-32 h-24 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-12 h-12 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Active Sessions */}
              <div className="space-y-4">
                <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Apple className="w-6 h-6 text-gray-700" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">iOS</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Active Sessions</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
                  </div>
                </Card>

                <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Android</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Active Sessions</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">35</div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Security Knowledge Card */}
            <Card className="mt-6 p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-orange-500 rounded transform rotate-45"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                    Enhancing Security Knowledge: Guides, Tips, and Documentation
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Explore comprehensive resources to strengthen security understanding through detailed guides, expert
                    tips, and documentation
                  </p>
                </div>
              </div>
            </Card>

            {/* Security Settings */}
            <Card className="mt-6 p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Prevent members from inviting others
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Pro</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Restrict members from sending invites to new potential members.
                    </p>
                  </div>
                </div>
                <ToggleLeft className="w-8 h-8 text-gray-400" />
              </div>
            </Card>
          </>
        )
    }
  }

  return (
    <main className="pt-[50px] p-6 h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900">
      {/* Settings Button - Fixed in right corner */}
      <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="group bg-primary hover:bg-primary shadow-lg fixed top-1/2 -translate-y-1/2 right-0 z-50 border-primary rounded-l-lg rounded-r-none"
          >
            <Settings className="h-4 text-white group-hover:text-blue-100 transition-colors animate-spin w-4 w-4" />
          </Button>
        </SheetTrigger>
        <ThemeCustomizer />
      </Sheet>

      {renderPageContent()}
    </main>
  )
}
