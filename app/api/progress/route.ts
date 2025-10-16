import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for progress (in production, use a database like PostgreSQL, MongoDB, etc.)
const progressStorage: { [key: string]: any } = {}

interface UserProgress {
  currentLevel: number
  currentQuestion: number
  completedLevels: number[]
  totalScore: number
  lastPlayed: string
  userId: string
}

export async function GET(request: NextRequest) {
  try {
    // Get user ID from query params or use default
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "default_user"

    const progress = progressStorage[userId] || {
      currentLevel: 0,
      currentQuestion: 0,
      completedLevels: [],
      totalScore: 0,
      lastPlayed: new Date().toISOString(),
      userId: userId,
    }

    console.log(`Progress fetched for user ${userId}:`, progress)

    return NextResponse.json(progress, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("Error fetching progress:", error)
    return NextResponse.json(
      { error: "Failed to fetch progress", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const progress: UserProgress = await request.json()

    // Validate the progress data
    if (
      typeof progress.currentLevel !== "number" ||
      typeof progress.currentQuestion !== "number" ||
      !Array.isArray(progress.completedLevels) ||
      typeof progress.totalScore !== "number" ||
      typeof progress.userId !== "string"
    ) {
      return NextResponse.json({ error: "Invalid progress data format" }, { status: 400 })
    }

    // Additional validation
    if (progress.currentLevel < 0 || progress.currentLevel > 2) {
      return NextResponse.json({ error: "Invalid level number" }, { status: 400 })
    }

    if (progress.currentQuestion < 0 || progress.currentQuestion > 2) {
      return NextResponse.json({ error: "Invalid question number" }, { status: 400 })
    }

    if (progress.totalScore < 0) {
      return NextResponse.json({ error: "Invalid score" }, { status: 400 })
    }

    // Update the timestamp
    progress.lastPlayed = new Date().toISOString()

    // Save progress to in-memory storage
    progressStorage[progress.userId] = progress

    console.log(`Progress saved for user ${progress.userId}:`, progress)

    return NextResponse.json(
      {
        success: true,
        message: "Progress saved successfully",
        progress: progress,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  } catch (error) {
    console.error("Error saving progress:", error)
    return NextResponse.json(
      { error: "Failed to save progress", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

// DELETE endpoint to reset progress
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "default_user"

    if (progressStorage[userId]) {
      delete progressStorage[userId]
      console.log(`Progress reset for user ${userId}`)
    }

    return NextResponse.json({
      success: true,
      message: "Progress reset successfully",
      userId: userId,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error resetting progress:", error)
    return NextResponse.json(
      { error: "Failed to reset progress", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

// GET endpoint to view all stored progress (for debugging)
export async function PATCH(request: NextRequest) {
  try {
    return NextResponse.json({
      totalUsers: Object.keys(progressStorage).length,
      users: Object.keys(progressStorage),
      storage: progressStorage,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching all progress:", error)
    return NextResponse.json({ error: "Failed to fetch all progress" }, { status: 500 })
  }
}
