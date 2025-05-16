import { TestDropdown } from "@/components/test-dropdown"

export default function DebugPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Debug Page</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Dropdown Test</h2>
          <p className="mb-4 text-muted-foreground">
            Click the button below to test if dropdowns are working correctly:
          </p>
          <TestDropdown />
        </div>
      </div>
    </div>
  )
}
