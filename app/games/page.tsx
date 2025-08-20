import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Clock, Target, Gamepad2 } from "lucide-react"

export default function GamesPage() {
  const games = [
    {
      title: "Stock Market Adventure",
      description: "Embark on an exciting journey through the stock market with virtual money and fun challenges!",
      image: "/placeholder.svg?height=200&width=200&text=🚀",
      level: "Beginner to Advanced",
      players: "2.5K+",
      duration: "30 min",
      difficulty: "Medium",
      color: "from-emerald-400 to-teal-500",
      icon: "🚀",
    },
    {
      title: "Investment Quiz Quest",
      description: "Test your knowledge with fun quizzes about money, investing, and financial wisdom!",
      image: "/placeholder.svg?height=200&width=200&text=🧠",
      level: "All Levels",
      players: "1.8K+",
      duration: "15 min",
      difficulty: "Easy",
      color: "from-violet-400 to-purple-500",
      icon: "🧠",
    },
    {
      title: "Portfolio Builder Pro",
      description: "Create your dream investment portfolio and watch it grow with smart choices!",
      image: "/placeholder.svg?height=200&width=200&text=💎",
      level: "Intermediate",
      players: "950+",
      duration: "45 min",
      difficulty: "Hard",
      color: "from-rose-400 to-pink-500",
      icon: "💎",
    },
    {
      title: "Market Prediction Challenge",
      description: "Use your crystal ball powers to predict market movements and compete with friends!",
      image: "/placeholder.svg?height=200&width=200&text=🔮",
      level: "Advanced",
      players: "650+",
      duration: "20 min",
      difficulty: "Expert",
      color: "from-cyan-400 to-blue-500",
      icon: "🔮",
    },
  ]

  const achievements = [
    {
      name: "First Trade Hero",
      icon: "🏆",
      unlocked: true,
      description: "Complete your first amazing trade!",
      color: "from-emerald-400 to-green-500",
    },
    {
      name: "Portfolio Master",
      icon: "💼",
      unlocked: true,
      description: "Build an awesome diversified portfolio",
      color: "from-violet-400 to-purple-500",
    },
    {
      name: "Quiz Champion",
      icon: "🧠",
      unlocked: false,
      description: "Score perfect on investment quiz",
      color: "from-rose-400 to-pink-500",
    },
    {
      name: "Market Wizard",
      icon: "🔮",
      unlocked: false,
      description: "Predict 10 market movements correctly",
      color: "from-cyan-400 to-blue-500",
    },
    {
      name: "Risk Guardian",
      icon: "🛡️",
      unlocked: false,
      description: "Maintain portfolio for 30 days",
      color: "from-indigo-400 to-purple-500",
    },
    {
      name: "Trading Star",
      icon: "⭐",
      unlocked: false,
      description: "Reach top 10 on leaderboard",
      color: "from-orange-400 to-red-500",
    },
  ]

  const leaderboard = [
    { rank: 1, player: "SuperInvestor", game: "Stock Market Adventure", score: 9850, change: "+5.2%", avatar: "🦸" },
    { rank: 2, player: "MoneyMaster", game: "Portfolio Builder Pro", score: 9420, change: "+3.8%", avatar: "👑" },
    { rank: 3, player: "QuizKing", game: "Investment Quiz Quest", score: 8950, change: "+2.1%", avatar: "🤓" },
    {
      rank: 4,
      player: "TradingNinja",
      game: "Market Prediction Challenge",
      score: 8750,
      change: "+1.9%",
      avatar: "🥷",
    },
    { rank: 5, player: "StockStar", game: "Stock Market Adventure", score: 8500, change: "+1.5%", avatar: "🌟" },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-100 text-emerald-800 border-emerald-300"
      case "Medium":
        return "bg-violet-100 text-violet-800 border-violet-300"
      case "Hard":
        return "bg-rose-100 text-rose-800 border-rose-300"
      case "Expert":
        return "bg-cyan-100 text-cyan-800 border-cyan-300"
      default:
        return "bg-slate-100 text-slate-800 border-slate-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full mb-6 shadow-lg">
            <Gamepad2 className="h-7 w-7" />
            <span className="font-bold text-xl">Fun Learning Games! 🎮</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Play & Learn Money Magic! ✨
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Discover the exciting world of investing through super fun games designed just for you! 🌟
          </p>
        </div>

        {/* Featured Games */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              🎯 Amazing Games to Play!
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {games.map((game, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white border-4 border-transparent hover:border-indigo-200 rounded-3xl"
              >
                <div className="relative">
                  <div
                    className={`h-52 bg-gradient-to-br ${game.color} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <div className="relative z-10 text-6xl animate-bounce">{game.icon}</div>
                    <div className="absolute top-4 right-4">
                      <Badge className={`${getDifficultyColor(game.difficulty)} border-2 font-bold`}>
                        {game.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{game.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed text-lg">{game.description}</p>

                  <div className="flex items-center gap-6 mb-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2 bg-emerald-50 px-3 py-2 rounded-full">
                      <Users className="h-4 w-4 text-emerald-600" />
                      <span className="font-semibold">{game.players}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-violet-50 px-3 py-2 rounded-full">
                      <Clock className="h-4 w-4 text-violet-600" />
                      <span className="font-semibold">{game.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-rose-50 px-3 py-2 rounded-full">
                      <Target className="h-4 w-4 text-rose-600" />
                      <span className="font-semibold">{game.level}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-300 px-4 py-2">
                      {game.level}
                    </Badge>
                    <Button
                      className={`bg-gradient-to-r ${game.color} hover:shadow-lg text-white font-bold px-8 py-3 rounded-full text-lg transform hover:scale-105 transition-all duration-300`}
                    >
                      Play Now! 🚀
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              🏆 Hall of Fame Champions!
            </span>
          </h2>
          <Card className="bg-white border-4 border-indigo-100 overflow-hidden rounded-3xl shadow-2xl">
            <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 p-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Trophy className="h-8 w-8" />
                Top Players This Week! 🌟
              </h3>
            </div>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-50 to-indigo-50">
                    <tr>
                      <th className="text-left py-6 px-8 font-bold text-slate-700 text-lg">Rank</th>
                      <th className="text-left py-6 px-8 font-bold text-slate-700 text-lg">Player</th>
                      <th className="text-left py-6 px-8 font-bold text-slate-700 text-lg">Game</th>
                      <th className="text-left py-6 px-8 font-bold text-slate-700 text-lg">Score</th>
                      <th className="text-left py-6 px-8 font-bold text-slate-700 text-lg">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry) => (
                      <tr
                        key={entry.rank}
                        className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300"
                      >
                        <td className="py-6 px-8">
                          <div className="flex items-center gap-3">
                            {entry.rank === 1 && <div className="text-2xl">🥇</div>}
                            {entry.rank === 2 && <div className="text-2xl">🥈</div>}
                            {entry.rank === 3 && <div className="text-2xl">🥉</div>}
                            {entry.rank > 3 && <div className="text-xl">{entry.avatar}</div>}
                            <span className="font-bold text-slate-800 text-lg">#{entry.rank}</span>
                          </div>
                        </td>
                        <td className="py-6 px-8">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{entry.avatar}</div>
                            <span className="font-bold text-slate-800 text-lg">{entry.player}</span>
                          </div>
                        </td>
                        <td className="py-6 px-8 text-slate-600 font-medium">{entry.game}</td>
                        <td className="py-6 px-8 font-bold text-violet-600 text-lg">{entry.score.toLocaleString()}</td>
                        <td className="py-6 px-8">
                          <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">
                            {entry.change}
                          </span>
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
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              🎖️ Your Amazing Achievements!
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className={`text-center transition-all duration-500 transform hover:scale-110 rounded-3xl border-4 ${
                  achievement.unlocked
                    ? "bg-white border-indigo-200 shadow-xl"
                    : "bg-slate-50 border-slate-200 opacity-60"
                }`}
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div
                      className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl shadow-lg ${
                        achievement.unlocked
                          ? `bg-gradient-to-br ${achievement.color} text-white`
                          : "bg-slate-300 text-slate-500"
                      }`}
                    >
                      {achievement.icon}
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-2">{achievement.name}</h3>
                  <p className="text-xs text-slate-600 leading-tight mb-3">{achievement.description}</p>
                  <div className="mt-3">
                    {achievement.unlocked ? (
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 font-bold">
                        Unlocked! ✨
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-300">
                        Keep Going! 💪
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
          <Card className="bg-gradient-to-br from-emerald-400 to-teal-500 border-4 border-emerald-200 text-white rounded-3xl shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-3">👥</div>
              <div className="text-4xl font-bold mb-2">5,247</div>
              <div className="font-bold text-lg">Happy Players!</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-violet-400 to-purple-500 border-4 border-violet-200 text-white rounded-3xl shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-3">🎮</div>
              <div className="text-4xl font-bold mb-2">12,890</div>
              <div className="font-bold text-lg">Games Played!</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-rose-400 to-pink-500 border-4 border-rose-200 text-white rounded-3xl shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-3">🏆</div>
              <div className="text-4xl font-bold mb-2">847</div>
              <div className="font-bold text-lg">Achievements!</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-400 to-blue-500 border-4 border-cyan-200 text-white rounded-3xl shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-3">😊</div>
              <div className="text-4xl font-bold mb-2">96%</div>
              <div className="font-bold text-lg">Fun Rating!</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
