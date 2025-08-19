import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Trophy, Users, Clock, Target, Award } from "lucide-react"

export default function GamesPage() {
  const games = [
    {
      title: "Stock Market Simulator",
      description: "Practice trading with virtual money in a realistic market environment",
      image: "/placeholder.svg?height=200&width=200&text=📈",
      level: "Beginner to Advanced",
      players: "2.5K+",
      duration: "30 min",
      difficulty: "Medium",
    },
    {
      title: "Investment Quiz Challenge",
      description: "Test your knowledge about stocks, bonds, and investment strategies",
      image: "/placeholder.svg?height=200&width=200&text=❓",
      level: "All Levels",
      players: "1.8K+",
      duration: "15 min",
      difficulty: "Easy",
    },
    {
      title: "Portfolio Builder",
      description: "Create and manage a virtual investment portfolio and track performance",
      image: "/placeholder.svg?height=200&width=200&text=💼",
      level: "Intermediate",
      players: "950+",
      duration: "45 min",
      difficulty: "Hard",
    },
    {
      title: "Market Prediction Game",
      description: "Predict market movements and compete with other players",
      image: "/placeholder.svg?height=200&width=200&text=🔮",
      level: "Advanced",
      players: "650+",
      duration: "20 min",
      difficulty: "Expert",
    },
  ]

  const achievements = [
    { name: "First Trade", icon: "🏆", unlocked: true, description: "Complete your first trade" },
    { name: "Portfolio Master", icon: "💼", unlocked: true, description: "Build a diversified portfolio" },
    { name: "Quiz Champion", icon: "🧠", unlocked: false, description: "Score 100% on investment quiz" },
    { name: "Market Guru", icon: "📊", unlocked: false, description: "Predict 10 market movements correctly" },
    { name: "Risk Manager", icon: "🛡️", unlocked: false, description: "Maintain portfolio for 30 days" },
    { name: "Top Trader", icon: "⭐", unlocked: false, description: "Reach top 10 on leaderboard" },
  ]

  const leaderboard = [
    { rank: 1, player: "InvestorPro", game: "Stock Market Simulator", score: 9850, change: "+5.2%" },
    { rank: 2, player: "MarketMaster", game: "Portfolio Builder", score: 9420, change: "+3.8%" },
    { rank: 3, player: "QuizKing", game: "Investment Quiz Challenge", score: 8950, change: "+2.1%" },
    { rank: 4, player: "TradingAce", game: "Market Prediction Game", score: 8750, change: "+1.9%" },
    { rank: 5, player: "StockStar", game: "Stock Market Simulator", score: 8500, change: "+1.5%" },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Hard":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Expert":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full mb-6">
            <Trophy className="h-6 w-6" />
            <span className="font-bold text-lg">Financial Games Hub</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Learn Through Play
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Master investing and financial concepts through engaging, interactive games designed for all skill levels.
          </p>
        </div>

        {/* Featured Games */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {games.map((game, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white border-2 border-purple-100"
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <Image
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getDifficultyColor(game.difficulty)} border`}>{game.difficulty}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{game.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span>{game.players}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>{game.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-green-500" />
                      <span>{game.level}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      {game.level}
                    </Badge>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold">
                      Play Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Global Leaderboard</h2>
          <Card className="bg-white border-2 border-purple-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                Top Performers This Week
              </h3>
            </div>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Rank</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Player</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Game</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Score</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry) => (
                      <tr key={entry.rank} className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            {entry.rank === 1 && <Trophy className="h-5 w-5 text-yellow-500" />}
                            {entry.rank === 2 && <Award className="h-5 w-5 text-gray-400" />}
                            {entry.rank === 3 && <Award className="h-5 w-5 text-orange-500" />}
                            <span className="font-bold text-gray-800">#{entry.rank}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-semibold text-gray-800">{entry.player}</td>
                        <td className="py-4 px-6 text-gray-600">{entry.game}</td>
                        <td className="py-4 px-6 font-bold text-purple-600">{entry.score.toLocaleString()}</td>
                        <td className="py-4 px-6">
                          <span className="text-green-600 font-semibold">{entry.change}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className={`text-center transition-all duration-300 transform hover:scale-105 ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-200"
                    : "bg-gray-50 border-2 border-gray-200 opacity-60"
                }`}
              >
                <CardContent className="p-4">
                  <div className="mb-3">
                    <div
                      className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl ${
                        achievement.unlocked
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                          : "bg-gray-300 text-gray-500"
                      }`}
                    >
                      {achievement.icon}
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">{achievement.name}</h3>
                  <p className="text-xs text-gray-600 leading-tight">{achievement.description}</p>
                  <div className="mt-2">
                    {achievement.unlocked ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">Unlocked</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-300">
                        Locked
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Game Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-700 mb-2">5,247</div>
              <div className="text-purple-600 font-semibold">Active Players</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-100 to-pink-200 border-2 border-pink-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-pink-700 mb-2">12,890</div>
              <div className="text-pink-600 font-semibold">Games Played</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-700 mb-2">847</div>
              <div className="text-blue-600 font-semibold">Achievements Earned</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">96%</div>
              <div className="text-green-600 font-semibold">Player Satisfaction</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
