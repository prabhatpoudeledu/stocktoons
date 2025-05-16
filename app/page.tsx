"use client"

import { useDisplayMode } from "@/contexts/display-mode-context"
import AdultHomePage from "@/components/home-page-adult"
import KidsHomePage from "@/components/home-page-kids"
import { DisplayModeToggle } from "@/components/display-mode-toggle"

export default function Home() {
  const { displayMode } = useDisplayMode()

  return (
    <>
      <div className="container py-4">
        <div className="flex justify-end">
          <DisplayModeToggle />
        </div>
      </div>

      {displayMode === "kids" ? <KidsHomePage /> : <AdultHomePage />}
    </>
  )
}
