"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, MessageSquare, ThumbsUp, Lightbulb } from "lucide-react"

interface VirtualAdvisorProps {
  portfolio: any[]
  virtualMoney: number
  currentDay: number
  onClose: () => void
}

export default function VirtualAdvisor({ portfolio, virtualMoney, currentDay, onClose }: VirtualAdvisorProps) {
  const [currentTip, setCurrentTip] = useState(0)
  const [advisorName] = useState("Penny")
  const [advisorAvatar] = useState("👩‍🏫")

  // Generate tips based on the user's portfolio and situation
  const generateTips = () => {
    const tips = [
      {
        title: "Welcome to Stock Adventure!",
        content:
          "Hi there! I'm Penny, your investing advisor. I'm here to help you learn about stocks and make smart choices with your money!",
        type: "welcome",
      },
    ]

    // Add tips based on portfolio
    if (portfolio.length === 0) {
      tips.push({
        title: "Start Investing",
        content:
          "You haven't bought any stocks yet! Try buying your first stock in the Stock Market tab. Look for companies you know and understand.",
        type: "suggestion",
      })
    } else if (portfolio.length === 1) {
      tips.push({
        title: "Diversify Your Portfolio",
        content:
          "Great job buying your first stock! Remember, it's smart to buy different types of stocks. This is called 'diversification' and helps reduce risk.",
        type: "suggestion",
      })
    }

    // Add tip based on cash
    if (virtualMoney > 800) {
      tips.push({
        title: "Put Your Money to Work",
        content:
          "You have a lot of cash not being invested! Remember, money that's invested has the chance to grow over time.",
        type: "suggestion",
      })
    } else if (virtualMoney < 100) {
      tips.push({
        title: "Keep Some Cash",
        content:
          "You've invested most of your money! That's great, but it's also good to keep some cash available for new opportunities.",
        type: "suggestion",
      })
    }

    // General educational tips
    tips.push({
      title: "What is a Stock?",
      content:
        "When you buy a stock, you own a small piece of that company! If the company does well and makes money, your stock might become more valuable.",
      type: "education",
    })

    tips.push({
      title: "Patience is Important",
      content:
        "Successful investors often hold their stocks for a long time. The stock market goes up and down every day, but over many years, it has generally gone up.",
      type: "education",
    })

    tips.push({
      title: "Research Before Buying",
      content:
        "Before buying a stock, learn about what the company does. Do they make products you use? Are they growing? Click 'Research' on any stock to learn more!",
      type: "education",
    })

    tips.push({
      title: "Understanding Risk",
      content:
        "All investments have some risk. Stock prices can go down, and you might lose money. That's why diversification (buying different stocks) is important!",
      type: "education",
    })

    return tips
  }

  const tips = generateTips()

  const nextTip = () => {
    setCurrentTip((currentTip + 1) % tips.length)
  }

  const prevTip = () => {
    setCurrentTip((currentTip - 1 + tips.length) % tips.length)
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm">
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none shadow-lg">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl mr-2">
                {advisorAvatar}
              </div>
              <div>
                <h3 className="font-bold">{advisorName}</h3>
                <p className="text-xs text-white/80">Your Stock Advisor</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="bg-white/10 p-3 rounded-lg mb-3 min-h-[100px]">
            <div className="flex items-start gap-2">
              <div className="mt-1">
                {tips[currentTip].type === "welcome" && <MessageSquare className="h-4 w-4" />}
                {tips[currentTip].type === "suggestion" && <ThumbsUp className="h-4 w-4" />}
                {tips[currentTip].type === "education" && <Lightbulb className="h-4 w-4" />}
              </div>
              <div>
                <h4 className="font-bold text-sm">{tips[currentTip].title}</h4>
                <p className="text-sm mt-1">{tips[currentTip].content}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-xs text-white/80">
              Tip {currentTip + 1} of {tips.length}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-white/80 hover:text-white hover:bg-white/10"
                onClick={prevTip}
              >
                Previous
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-white/80 hover:text-white hover:bg-white/10"
                onClick={nextTip}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
