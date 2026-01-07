"use client"

import { ColorPicker as BaseColorPicker } from "@/components/ui/color-picker"

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  isSelected: boolean
}

export function ColorPicker({ value, onChange, isSelected }: ColorPickerProps) {
  return <BaseColorPicker value={value} onChange={onChange} />
}
