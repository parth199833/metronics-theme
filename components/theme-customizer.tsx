"use client"

import { useState, useEffect } from "react"
import { SheetContent } from "@/components/ui/sheet"
import { ColorPicker } from "@/components/color-picker"

function setCookie(name: string, value: string, days = 365) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  console.log("[v0] Cookie set:", name, value)
}

function getCookie(name: string): string | null {
  const nameEQ = name + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) {
      const value = c.substring(nameEQ.length, c.length)
      console.log("[v0] Cookie retrieved:", name, value)
      return value
    }
  }
  console.log("[v0] Cookie not found:", name)
  return null
}

export function ThemeCustomizer() {
  const [selectedTheme, setSelectedTheme] = useState("light")
  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState("#E91E63")
  const [selectedSidebarColor, setSelectedSidebarColor] = useState("#FFFFFF")

  useEffect(() => {
    const savedTheme = getCookie("theme") || "light"
    const savedPrimaryColor = getCookie("primaryColor") || "#E91E63"
    const savedSidebarColor = getCookie("sidebarColor") || "#FFFFFF"

    console.log("[v0] Loading saved settings:", { savedTheme, savedPrimaryColor, savedSidebarColor })

    setSelectedTheme(savedTheme)
    setSelectedPrimaryColor(savedPrimaryColor)
    setSelectedSidebarColor(savedSidebarColor)

    // Apply saved primary color immediately
    applyPrimaryColor(savedPrimaryColor)

    // Apply saved sidebar color immediately
    applySidebarColor(savedSidebarColor)

    // Apply theme
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else if (savedTheme === "system") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (systemPrefersDark) {
        document.documentElement.classList.add("dark")
      }
    }
  }, [])

  const applyPrimaryColor = (color: string) => {
    console.log("[v0] Applying primary color:", color)
    document.documentElement.style.setProperty("--primary-color", color)

    const style = document.createElement("style")
    style.innerHTML = `
      .bg-primary { background-color: ${color} !important; }
      .text-primary { color: ${color} !important; }
      .border-primary { border-color: ${color} !important; }
      .hover\\:bg-primary:hover { background-color: ${color} !important; }
      .focus\\:ring-primary:focus { --tw-ring-color: ${color}; }
      .border-b-primary { border-bottom-color: ${color} !important; }
      .bg-primary\\/10 { background-color: ${color}1A !important; }
      .border-b-2.border-blue-600 { border-bottom-color: ${color} !important; }
      .text-blue-600 { color: ${color} !important; }
      .border-blue-600 { border-color: ${color} !important; }
      .hover\\:bg-blue-50:hover { background-color: ${color}0D !important; }
    `

    const existingStyle = document.getElementById("dynamic-primary-color")
    if (existingStyle) {
      existingStyle.remove()
    }

    style.id = "dynamic-primary-color"
    document.head.appendChild(style)

    setTimeout(() => {
      const primaryElements = document.querySelectorAll('[class*="primary"]')
      primaryElements.forEach((element) => {
        if (element.classList.contains("bg-primary")) {
          ;(element as HTMLElement).style.backgroundColor = color
        }
        if (element.classList.contains("text-primary")) {
          ;(element as HTMLElement).style.color = color
        }
        if (element.classList.contains("border-primary")) {
          ;(element as HTMLElement).style.borderColor = color
        }
      })
    }, 100)
  }

  const applySidebarColor = (color: string) => {
    console.log("[v0] Applying sidebar color:", color)
    const sidebar = document.querySelector("aside")
    if (sidebar) {
      ;(sidebar as HTMLElement).style.backgroundColor = color

      const isLight = isLightColor(color)
      const textColor = isLight ? "#374151" : "#FFFFFF"

      const allText = sidebar.querySelectorAll("span, div")
      const allIcons = sidebar.querySelectorAll("svg")
      allText.forEach((el) => ((el as HTMLElement).style.color = textColor))
      allIcons.forEach((el) => ((el as HTMLElement).style.color = textColor))
    }
  }

  const handlePrimaryColorChange = (color: string) => {
    console.log("[v0] Primary color changed to:", color)
    setSelectedPrimaryColor(color)
    setCookie("primaryColor", color)
    applyPrimaryColor(color)
  }

  const handleSidebarColorChange = (color: string) => {
    console.log("[v0] Sidebar color changed to:", color)
    setSelectedSidebarColor(color)
    setCookie("sidebarColor", color)
    applySidebarColor(color)
  }

  const isLightColor = (color: string) => {
    const hex = color.replace("#", "")
    const r = Number.parseInt(hex.substr(0, 2), 16)
    const g = Number.parseInt(hex.substr(2, 2), 16)
    const b = Number.parseInt(hex.substr(4, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 155
  }

  return (
    <SheetContent side="right" className="bg-white dark:bg-gray-800 w-[400px]">
      <div className="p-6 space-y-6 py-0 px-[5px] tracking-normal">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Template Customizer</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Customize and preview in real time</p>
        </div>

        {/* Theming Section */}
        <div>
          <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-medium mb-4">
            Theming
          </div>

          {/* Primary Color */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Primary Color</h3>
            <div className="grid grid-cols-6 gap-2">
              <div
                className={`w-12 h-12 bg-purple-500 rounded-lg border-2 ${selectedPrimaryColor === "#9C27B0" ? "border-blue-500" : "border-gray-200 hover:border-gray-300"} cursor-pointer`}
                onClick={() => handlePrimaryColorChange("#9C27B0")}
              ></div>
              <div
                className={`w-12 h-12 bg-teal-500 rounded-lg border-2 ${selectedPrimaryColor === "#009688" ? "border-blue-500" : "border-gray-200 hover:border-gray-300"} cursor-pointer`}
                onClick={() => handlePrimaryColorChange("#009688")}
              ></div>
              <div
                className={`w-12 h-12 bg-orange-400 rounded-lg border-2 ${selectedPrimaryColor === "#FF9800" ? "border-blue-500" : "border-gray-200 hover:border-gray-300"} cursor-pointer`}
                onClick={() => handlePrimaryColorChange("#FF9800")}
              ></div>
              <div
                className={`w-12 h-12 bg-red-500 rounded-lg border-2 ${selectedPrimaryColor === "#F44336" ? "border-blue-500" : "border-gray-200 hover:border-gray-300"} cursor-pointer`}
                onClick={() => handlePrimaryColorChange("#F44336")}
              ></div>
              <div
                className={`w-12 h-12 bg-blue-500 rounded-lg border-2 ${selectedPrimaryColor === "#2196F3" ? "border-blue-500" : "border-gray-200 hover:border-gray-300"} cursor-pointer`}
                onClick={() => handlePrimaryColorChange("#2196F3")}
              ></div>
              <ColorPicker
                value={selectedPrimaryColor}
                onChange={handlePrimaryColorChange}
                isSelected={!["#9C27B0", "#009688", "#FF9800", "#F44336", "#2196F3"].includes(selectedPrimaryColor)}
              />
            </div>
          </div>

          {/* Theme */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Theme</h3>
            <div className="grid grid-cols-3 gap-3">
              <div
                className={`border-2 ${selectedTheme === "light" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"} rounded-lg p-4 cursor-pointer`}
                onClick={() => {
                  setSelectedTheme("light")
                  document.documentElement.classList.remove("dark")
                  setCookie("theme", "light")
                }}
              >
                <div className="flex justify-center mb-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">Light</div>
              </div>
              <div
                className={`border-2 ${selectedTheme === "dark" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"} rounded-lg p-4 cursor-pointer`}
                onClick={() => {
                  setSelectedTheme("dark")
                  document.documentElement.classList.add("dark")
                  setCookie("theme", "dark")
                }}
              >
                <div className="flex justify-center mb-2">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </div>
                <div className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">Dark</div>
              </div>
              <div
                className={`border-2 ${selectedTheme === "system" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"} rounded-lg p-4 cursor-pointer`}
                onClick={() => {
                  setSelectedTheme("system")
                  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
                  if (systemPrefersDark) {
                    document.documentElement.classList.add("dark")
                  } else {
                    document.documentElement.classList.remove("dark")
                  }
                  setCookie("theme", "system")
                }}
              >
                <div className="flex justify-center mb-2">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">System</div>
              </div>
            </div>
          </div>

          {/* Sidebar Color */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Sidebar Color</h3>
            <div className="grid grid-cols-6 gap-2">
              <div
                className={`w-12 h-12 bg-white border-2 ${selectedSidebarColor === "#FFFFFF" ? "border-blue-500" : "border-gray-300 hover:border-gray-400"} cursor-pointer rounded-lg`}
                onClick={() => handleSidebarColorChange("#FFFFFF")}
              ></div>
              <div
                className={`w-12 h-12 bg-gray-800 rounded-lg border-2 ${selectedSidebarColor === "#1F2937" ? "border-blue-500" : "border-gray-200 hover:border-gray-300"} cursor-pointer`}
                onClick={() => handleSidebarColorChange("#1F2937")}
              ></div>
              <div
                className={`w-12 h-12 bg-purple-500 rounded-lg border-2 ${selectedSidebarColor === "#9C27B0" ? "border-blue-500" : "border-gray-200 hover:border-gray-300"} cursor-pointer`}
                onClick={() => handleSidebarColorChange("#9C27B0")}
              ></div>
              <div
                className={`w-12 h-12 bg-teal-500 rounded-lg border-2 ${selectedSidebarColor === "#009688" ? "border-blue-500" : "border-gray-200 hover:border-gray-300"} cursor-pointer`}
                onClick={() => handleSidebarColorChange("#009688")}
              ></div>
              <div
                className={`w-12 h-12 bg-orange-400 rounded-lg border-2 ${selectedSidebarColor === "#FF9800" ? "border-blue-500" : "border-gray-200 hover:border-gray-300"} cursor-pointer`}
                onClick={() => handleSidebarColorChange("#FF9800")}
              ></div>
              <ColorPicker
                value={selectedSidebarColor}
                onChange={handleSidebarColorChange}
                isSelected={!["#FFFFFF", "#1F2937", "#9C27B0", "#009688", "#FF9800"].includes(selectedSidebarColor)}
              />
            </div>
          </div>
        </div>

        {/* Layout Section */}
        <div className="border-t pt-6">
          <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-medium mb-4">
            Layout
          </div>

          {/* Menu Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Menu (Navigation)</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300">
                <div className="space-y-1 mb-2">
                  <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">Default</div>
              </div>
              <div className="border-2 border-blue-500 rounded-lg p-4 cursor-pointer bg-blue-50">
                <div className="space-y-1 mb-2">
                  <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">Sidebar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SheetContent>
  )
}
