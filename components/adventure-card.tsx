"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Lock, Play, Star, CheckCircle } from "lucide-react"

interface Level {
  id: number
  name: string
  title: string
  description: string
  questions: any[]
  color: string
  bgGradient: string
  icon: string
}

interface AdventureCardProps {
  level: Level
  isCompleted: boolean
  isCurrent: boolean
  isLocked: boolean
  score?: number
  onClick?: () => void
}

export default function AdventureCard({
  level,
  isCompleted,
  isCurrent,
  isLocked,
  score = 0,
  onClick,
}: AdventureCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg ${
        isCurrent
          ? "ring-4 ring-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl"
          : isCompleted
            ? "bg-gradient-to-br from-green-50 to-emerald-100 hover:from-green-100 hover:to-emerald-200 shadow-green-200"
            : isLocked
              ? "bg-gray-100 opacity-60 cursor-not-allowed"
              : "hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 hover:shadow-xl"
      }`}
      onClick={!isLocked ? onClick : undefined}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="text-4xl">{level.icon}</div>
          <div className="flex flex-col gap-1">
            {isCompleted && (
              <Badge className="bg-green-500 hover:bg-green-600 text-white">
                <Trophy className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
            {isCurrent && (
              <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                <Play className="w-3 h-3 mr-1" />
                Playing
              </Badge>
            )}
            {isLocked && (
              <Badge variant="secondary" className="bg-gray-400 text-white">
                <Lock className="w-3 h-3 mr-1" />
                Locked
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-xl mb-2 flex items-center gap-2">
          {level.name}
          {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
        </CardTitle>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{level.description}</p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{level.questions.length} questions</span>
          {isCompleted && score > 0 && (
            <div className="flex items-center gap-1 text-green-600 font-semibold">
              <Star className="w-3 h-3" />
              {score} pts
            </div>
          )}
        </div>

        {/* Progress indicator */}
        {isCurrent && (
          <div className="mt-3 bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: "33%" }} // This would be dynamic based on current question
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
