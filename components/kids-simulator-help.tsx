"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, DollarSign, TrendingUp, Award, Briefcase } from "lucide-react"

interface KidsSimulatorHelpProps {
  onClose: () => void
}

export default function KidsSimulatorHelp({ onClose }: KidsSimulatorHelpProps) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card">
        <CardHeader className="sticky top-0 bg-card z-10 flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">How to Play Stock Adventure</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-500" />
              Welcome to Stock Adventure!
            </h3>
            <p className="mb-2">
              This is a fun game that teaches you about investing in stocks. You'll start with $1,000 of virtual money
              that you can use to buy shares of different companies.
            </p>
            <p>
              Don't worry - this is just for practice! You're not using real money, so you can experiment and learn
              without any risk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-500/20 rounded-lg">
              <h4 className="font-bold mb-2">What is a Stock?</h4>
              <p className="text-sm">
                A stock is a small piece of ownership in a company. When you buy a stock, you own a tiny part of that
                company! If the company does well, your stock might become more valuable.
              </p>
            </div>

            <div className="p-4 bg-green-500/20 rounded-lg">
              <h4 className="font-bold mb-2">Why Do People Buy Stocks?</h4>
              <p className="text-sm">
                People buy stocks hoping they will increase in value over time. This is called investing. If you buy a
                stock at $10 and later it's worth $15, you've made a $5 profit!
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
              How to Play
            </h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Buy Stocks:</strong> Go to the "Stock Market" tab and click "Buy" on any stock you want to
                purchase. Each stock costs different amounts of money.
              </li>
              <li>
                <strong>Watch Your Portfolio:</strong> The stocks you buy will appear in your "My Portfolio" tab. You
                can see how much they're worth and if you're making or losing money.
              </li>
              <li>
                <strong>Advance Time:</strong> Click the "Next Day" button to move to the next day. Stock prices will
                change each day - sometimes up, sometimes down!
              </li>
              <li>
                <strong>Sell Stocks:</strong> If you think a stock has gone up enough in value, or if you want to try
                something else, you can sell your stocks.
              </li>
              <li>
                <strong>Complete Missions:</strong> Check the "Missions" tab for special challenges that will earn you
                XP and help you level up!
              </li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-500" />
              Tips for Success
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Diversify:</strong> Don't put all your money in one stock. Try buying different types of stocks!
              </li>
              <li>
                <strong>Be Patient:</strong> Sometimes stocks go down before they go up. Don't panic and sell right
                away!
              </li>
              <li>
                <strong>Learn About Companies:</strong> In real investing, it helps to understand what a company does
                and how well they're doing.
              </li>
              <li>
                <strong>Complete Missions:</strong> Missions will help guide you and teach you important investing
                concepts.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-purple-500" />
              Important Terms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-secondary/20 rounded-lg">
                <p className="font-bold">Stock</p>
                <p className="text-sm">A small piece of ownership in a company</p>
              </div>
              <div className="p-3 bg-secondary/20 rounded-lg">
                <p className="font-bold">Share</p>
                <p className="text-sm">One unit of stock</p>
              </div>
              <div className="p-3 bg-secondary/20 rounded-lg">
                <p className="font-bold">Portfolio</p>
                <p className="text-sm">All the stocks you own</p>
              </div>
              <div className="p-3 bg-secondary/20 rounded-lg">
                <p className="font-bold">Profit</p>
                <p className="text-sm">Money you make when you sell a stock for more than you paid</p>
              </div>
              <div className="p-3 bg-secondary/20 rounded-lg">
                <p className="font-bold">Loss</p>
                <p className="text-sm">Money you lose when you sell a stock for less than you paid</p>
              </div>
              <div className="p-3 bg-secondary/20 rounded-lg">
                <p className="font-bold">Diversify</p>
                <p className="text-sm">Buying different types of stocks to reduce risk</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button size="lg" onClick={onClose}>
              I'm Ready to Invest!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
