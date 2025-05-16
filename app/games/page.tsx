import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function GamesPage() {
  const games = [
    {
      title: "Stock Market Simulator",
      description: "Practice trading with virtual money in a realistic market environment",
      image: "/placeholder.svg?height=200&width=200&text=📈",
      level: "Beginner to Advanced",
    },
    {
      title: "Investment Quiz Challenge",
      description: "Test your knowledge about stocks, bonds, and investment strategies",
      image: "/placeholder.svg?height=200&width=200&text=❓",
      level: "All Levels",
    },
    {
      title: "Portfolio Builder",
      description: "Create and manage a virtual investment portfolio and track performance",
      image: "/placeholder.svg?height=200&width=200&text=💼",
      level: "Intermediate",
    },
    {
      title: "Market Prediction Game",
      description: "Predict market movements and compete with other players",
      image: "/placeholder.svg?height=200&width=200&text=🔮",
      level: "Advanced",
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Financial Games</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Learn about investing through fun, interactive games designed for all ages and experience levels.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {games.map((game, index) => (
          <Card key={index} className="bg-card overflow-hidden border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="bg-secondary/50 flex items-center justify-center p-6">
                <Image
                  src={game.image || "/placeholder.svg"}
                  alt={game.title}
                  width={120}
                  height={120}
                  className="rounded-lg"
                />
              </div>
              <CardContent className="p-6 md:col-span-2">
                <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">{game.level}</span>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Play Now
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
      <Card className="bg-card mb-12 border border-border chart-pattern">
        <CardContent className="p-6 relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4">Rank</th>
                  <th className="text-left py-3 px-4">Player</th>
                  <th className="text-left py-3 px-4">Game</th>
                  <th className="text-left py-3 px-4">Score</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((rank) => (
                  <tr key={rank} className="border-b border-border">
                    <td className="py-3 px-4">{rank}</td>
                    <td className="py-3 px-4">Player{rank}</td>
                    <td className="py-3 px-4">
                      {rank % 2 === 0 ? "Stock Market Simulator" : "Investment Quiz Challenge"}
                    </td>
                    <td className="py-3 px-4 positive">{10000 - rank * 500}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-6">Achievements</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["First Trade", "Portfolio Master", "Quiz Champion", "Market Guru"].map((achievement, index) => (
          <Card key={index} className="bg-card border border-border">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="mb-2 mt-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
              </div>
              <h3 className="text-sm font-bold mb-1">{achievement}</h3>
              <p className="text-xs text-muted-foreground">{index < 2 ? "Unlocked" : "Locked"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
