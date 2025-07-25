"use client"

import { useDisplayMode } from "@/contexts/display-mode-context"
import { HomePageAdult } from "@/components/home-page-adult"
import { HomePageKids } from "@/components/home-page-kids"

export default function HomePage() {
  const { displayMode } = useDisplayMode()

  if (displayMode === "kids") {
    return <HomePageKids />
  }

  return <HomePageAdult />
}
