"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, TrendingUp, TrendingDown, DollarSign, Building, Users } from "lucide-react"

interface StockResearchCardProps {
  stock: any
  onClose: () => void
}

export default function StockResearchCard({ stock, onClose }: StockResearchCardProps) {
  const [currentPage, setCurrentPage] = useState(0)

  // Pages of information about the stock
  const pages = [
    {
      title: "What They Do",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${stock.color}30` }}
            >
              {stock.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold">{stock.name}</h3>
              <p className="text-sm text-muted-foreground">Stock Symbol: {stock.symbol}</p>
            </div>
          </div>

          <div className="p-4 bg-secondary/20 rounded-lg">
            <h4 className="font-bold mb-2 flex items-center">
              <Building className="h-4 w-4 mr-2" />
              Company Info
            </h4>
            <p>{stock.description}</p>

            {stock.whatTheyDo && (
              <div className="mt-4">
                <p>{stock.whatTheyDo}</p>
              </div>
            )}

            {stock.funFacts && (
              <div className="mt-4 p-3 bg-blue-500/20 rounded-lg">
                <h5 className="font-bold mb-1">Fun Fact!</h5>
                <p className="text-sm">{stock.funFacts[0]}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-secondary/20 rounded-lg">
              <h4 className="font-bold mb-1 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Customers
              </h4>
              <p className="text-sm">{stock.customers || "People all around the world!"}</p>
            </div>
            <div className="p-3 bg-secondary/20 rounded-lg">
              <h4 className="font-bold mb-1 flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Current Price
              </h4>
              <p className="text-sm">${stock.price.toFixed(2)} per share</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Why People Buy This Stock",
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-secondary/20 rounded-lg">
            <h4 className="font-bold mb-2">Why might someone buy {stock.name} stock?</h4>
            <ul className="list-disc pl-5 space-y-2">
              {stock.whyBuy ? (
                stock.whyBuy.map((reason: string, index: number) => <li key={index}>{reason}</li>)
              ) : (
                <>
                  <li>They believe the company will grow and make more money in the future</li>
                  <li>They like the products or services the company makes</li>
                  <li>They think more people will buy from this company over time</li>
                </>
              )}
            </ul>
          </div>

          <div className="p-4 bg-green-500/20 rounded-lg">
            <h4 className="font-bold mb-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
              If Things Go Well
            </h4>
            <p>If {stock.name} does well as a company:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>The stock price might go up</li>
              <li>You could sell your shares for more than you paid</li>
              <li>You might make a profit!</li>
            </ul>
          </div>

          <div className="p-4 bg-red-500/20 rounded-lg">
            <h4 className="font-bold mb-2 flex items-center">
              <TrendingDown className="h-4 w-4 mr-2 text-red-500" />
              If Things Don't Go Well
            </h4>
            <p>If {stock.name} has problems:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>The stock price might go down</li>
              <li>Your shares might be worth less than you paid</li>
              <li>You might lose some money if you sell</li>
            </ul>
          </div>

          {stock.funFacts && stock.funFacts[1] && (
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <h5 className="font-bold mb-1">Fun Fact!</h5>
              <p className="text-sm">{stock.funFacts[1]}</p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "How to Research Stocks",
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-secondary/20 rounded-lg">
            <h4 className="font-bold mb-2">How to Learn About Stocks</h4>
            <p className="mb-2">
              Before buying any stock, it's good to learn about the company. Here are some things to look for:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>What products or services does the company make?</li>
              <li>Do you or people you know use these products?</li>
              <li>Is the company making money (profitable)?</li>
              <li>Is the company growing and selling more things each year?</li>
            </ul>
          </div>

          <div className="p-4 bg-purple-500/20 rounded-lg">
            <h4 className="font-bold mb-2">Important Words to Know</h4>
            <div className="space-y-2">
              <div>
                <p className="font-bold">Revenue</p>
                <p className="text-sm">The money a company makes from selling its products or services</p>
              </div>
              <div>
                <p className="font-bold">Profit</p>
                <p className="text-sm">Money left over after paying all expenses (also called "earnings")</p>
              </div>
              <div>
                <p className="font-bold">Growth</p>
                <p className="text-sm">When a company sells more and makes more money over time</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/20 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Remember!</h4>
            <p>
              Even grown-up investors can't always predict if a stock will go up or down. That's why it's smart to buy
              different types of stocks (diversify) and be patient!
            </p>
          </div>

          {stock.funFacts && stock.funFacts[2] && (
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <h5 className="font-bold mb-1">Fun Fact!</h5>
              <p className="text-sm">{stock.funFacts[2]}</p>
            </div>
          )}
        </div>
      ),
    },
  ]

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Research: {stock.name}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>

          <div className="mb-6">
            <div className="flex space-x-2 mb-4">
              {pages.map((page, index) => (
                <Badge
                  key={index}
                  variant={currentPage === index ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setCurrentPage(index)}
                >
                  {page.title}
                </Badge>
              ))}
            </div>

            <div className="min-h-[400px]">{pages[currentPage].content}</div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={prevPage} disabled={currentPage === 0}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button variant="outline" onClick={nextPage} disabled={currentPage === pages.length - 1}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
