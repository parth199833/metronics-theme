"use client"

import { useState, useEffect, useRef } from "react"
import type React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  disabled?: boolean
}

export function ColorPicker({ value, onChange, disabled }: ColorPickerProps) {
  const [open, setOpen] = useState(false)
  const [hexInput, setHexInput] = useState(value)
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(100)
  const [brightness, setBrightness] = useState(100)

  const saturationRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  // Convert hex to HSB on mount and value change
  useEffect(() => {
    const hsb = hexToHSB(value)
    setHue(hsb.h)
    setSaturation(hsb.s)
    setBrightness(hsb.b)
    setHexInput(value.toUpperCase())
  }, [value])

  // Convert HSB to hex and update
  const updateColorFromHSB = (h: number, s: number, b: number) => {
    const hex = hsbToHex(h, s, b)
    onChange(hex)
    setHexInput(hex)
  }

  const handleSaturationMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    handleSaturationMove(e)
  }

  const handleSaturationMove = (e: React.MouseEvent | MouseEvent) => {
    if (!saturationRef.current) return

    const rect = saturationRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height))

    const s = (x / rect.width) * 100
    const b = 100 - (y / rect.height) * 100

    setSaturation(s)
    setBrightness(b)
    updateColorFromHSB(hue, s, b)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        handleSaturationMove(e)
      }
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [hue])

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const h = Number.parseInt(e.target.value)
    setHue(h)
    updateColorFromHSB(h, saturation, brightness)
  }

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value.toUpperCase()
    setHexInput(hex)

    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      onChange(hex)
      const hsb = hexToHSB(hex)
      setHue(hsb.h)
      setSaturation(hsb.s)
      setBrightness(hsb.b)
    }
  }

  const hueColor = `hsl(${hue}, 100%, 50%)`
  const cursorX = (saturation / 100) * 100
  const cursorY = (1 - brightness / 100) * 100

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          disabled={disabled}
          className={cn(
            "relative w-12 h-12 rounded-lg border-2 border-border hover:border-muted-foreground transition-all duration-200",
            "flex items-center justify-center group",
            disabled && "cursor-not-allowed opacity-50",
          )}
          style={{ backgroundColor: value }}
          title={value}
          aria-label="Pick a color"
        >
          <svg
            className="w-5 h-5 text-white drop-shadow-md opacity-70 group-hover:opacity-100 transition-opacity"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-4" align="start">
        <div className="space-y-4">
          {/* Saturation/Brightness Area */}
          <div
            ref={saturationRef}
            className="relative w-full h-[180px] rounded-lg cursor-crosshair overflow-hidden border-2 border-border"
            style={{
              background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})`,
            }}
            onMouseDown={handleSaturationMouseDown}
          >
            {/* Cursor */}
            <div
              className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${cursorX}%`,
                top: `${cursorY}%`,
              }}
            />
          </div>

          {/* Hue Slider */}
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={handleHueChange}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer"
              style={{
                background:
                  "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
              }}
            />
          </div>

          {/* Hex Input and Preview */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-foreground" htmlFor="hex-input">
              Hex Value
            </Label>
            <div className="flex gap-2 items-center">
              <Input
                id="hex-input"
                type="text"
                value={hexInput}
                onChange={handleHexInputChange}
                placeholder="#000000"
                className="flex-1 font-mono text-sm uppercase"
                maxLength={7}
              />
              <div
                className="w-10 h-10 rounded-md border-2 border-border shrink-0"
                style={{ backgroundColor: value }}
                aria-label="Selected color preview"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Utility functions for color conversion
function hexToHSB(hex: string): { h: number; s: number; b: number } {
  const r = Number.parseInt(hex.slice(1, 3), 16) / 255
  const g = Number.parseInt(hex.slice(3, 5), 16) / 255
  const b = Number.parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta + (g < b ? 6 : 0)) / 6
    } else if (max === g) {
      h = ((b - r) / delta + 2) / 6
    } else {
      h = ((r - g) / delta + 4) / 6
    }
  }

  const s = max === 0 ? 0 : delta / max
  const brightness = max

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    b: Math.round(brightness * 100),
  }
}

function hsbToHex(h: number, s: number, b: number): string {
  const hNorm = h / 360
  const sNorm = s / 100
  const bNorm = b / 100

  const c = bNorm * sNorm
  const x = c * (1 - Math.abs(((hNorm * 6) % 2) - 1))
  const m = bNorm - c

  let r = 0
  let g = 0
  let blue = 0

  const hSector = hNorm * 6

  if (hSector < 1) {
    r = c
    g = x
    blue = 0
  } else if (hSector < 2) {
    r = x
    g = c
    blue = 0
  } else if (hSector < 3) {
    r = 0
    g = c
    blue = x
  } else if (hSector < 4) {
    r = 0
    g = x
    blue = c
  } else if (hSector < 5) {
    r = x
    g = 0
    blue = c
  } else {
    r = c
    g = 0
    blue = x
  }

  const rHex = Math.round((r + m) * 255)
    .toString(16)
    .padStart(2, "0")
  const gHex = Math.round((g + m) * 255)
    .toString(16)
    .padStart(2, "0")
  const bHex = Math.round((blue + m) * 255)
    .toString(16)
    .padStart(2, "0")

  return `#${rHex}${gHex}${bHex}`.toUpperCase()
}
