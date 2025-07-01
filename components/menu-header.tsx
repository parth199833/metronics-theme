"use client"

import { Sidebar } from "@/components/sidebar"

interface MenuHeaderProps {
  activePage: string
  setActivePage: (page: string) => void
}

export function MenuHeader({ activePage, setActivePage }: MenuHeaderProps) {
  return <Sidebar activePage={activePage} setActivePage={setActivePage} />
}
