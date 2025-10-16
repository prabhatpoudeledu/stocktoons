import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for game progress (in production, use a database like PostgreSQL, MongoDB, Supabase, etc.)
const gameProgressStorage: { [key: string]: any } = {}

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

    const userProgress = gameProgressStorage[userId] || {
      currentLevel: 0,
      currentQuestion: 0,
      completedLevels: [],
      totalScore: 0,
      lastPlayed: new Date().toISOString(),
      userId: userId,
    }

    console.log(`[Stock Adventure API] GET - Progress fetched for user ${userId}:`, userProgress)

    return NextResponse.json(userProgress, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("[Stock Adventure API] GET - Error fetching progress:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch game progress",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const progressData: UserProgress = await request.json()

    console.log(`[Stock Adventure API] POST - Received progress data for user ${progressData.userId}:`, progressData)

    // Validate the progress data
    if (
      typeof progressData.currentLevel !== "number" ||
      typeof progressData.currentQuestion !== "number" ||
      !Array.isArray(progressData.completedLevels) ||
      typeof progressData.totalScore !== "number" ||
      typeof progressData.userId !== "string"
    ) {
      console.error("[Stock Adventure API] POST - Invalid progress data format:", progressData)
      return NextResponse.json({ error: "Invalid progress data format" }, { status: 400 })
    }

    // Additional validation for level bounds
    if (progressData.currentLevel < 0 || progressData.currentLevel > 2) {
      console.error("[Stock Adventure API] POST - Invalid level number:", progressData.currentLevel)
      return NextResponse.json({ error: "Invalid level number (must be 0-2)" }, { status: 400 })
    }

    // Additional validation for question bounds
    if (progressData.currentQuestion < 0 || progressData.currentQuestion > 2) {
      console.error("[Stock Adventure API] POST - Invalid question number:", progressData.currentQuestion)
      return NextResponse.json({ error: "Invalid question number (must be 0-2)" }, { status: 400 })
    }

    // Additional validation for score
    if (progressData.totalScore < 0) {
      console.error("[Stock Adventure API] POST - Invalid score:", progressData.totalScore)
      return NextResponse.json({ error: "Invalid score (must be non-negative)" }, { status: 400 })
    }

    // Update the timestamp
    progressData.lastPlayed = new Date().toISOString()

    // Save progress to in-memory storage
    gameProgressStorage[progressData.userId] = progressData

    console.log(`[Stock Adventure API] POST - Progress saved successfully for user ${progressData.userId}`)

    return NextResponse.json(
      {
        success: true,
        message: "Game progress saved successfully",
        progress: progressData,
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
    console.error("[Stock Adventure API] POST - Error saving progress:", error)
    return NextResponse.json(
      {
        error: "Failed to save game progress",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// DELETE endpoint to reset progress for a specific user
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "default_user"

    if (gameProgressStorage[userId]) {
      delete gameProgressStorage[userId]
      console.log(`[Stock Adventure API] DELETE - Progress reset for user ${userId}`)
    } else {
      console.log(`[Stock Adventure API] DELETE - No progress found for user ${userId}`)
    }

    return NextResponse.json({
      success: true,
      message: "Game progress reset successfully",
      userId: userId,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[Stock Adventure API] DELETE - Error resetting progress:", error)
    return NextResponse.json(
      {
        error: "Failed to reset game progress",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// PATCH endpoint to view all stored progress (for debugging and admin purposes)
export async function PATCH(request: NextRequest) {
  try {
    console.log("[Stock Adventure API] PATCH - Fetching all game progress data")

    return NextResponse.json({
      totalUsers: Object.keys(gameProgressStorage).length,
      userIds: Object.keys(gameProgressStorage),
      allProgress: gameProgressStorage,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[Stock Adventure API] PATCH - Error fetching all progress:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch all game progress",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
