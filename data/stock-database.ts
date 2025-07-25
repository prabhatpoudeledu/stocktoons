export interface StockData {
  symbol: string
  name: string
  sector: string
  price: number
  change: number
  changePercent: number
}

export const stockDatabase: StockData[] = [
  // Technology
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology", price: 175.43, change: 2.15, changePercent: 1.24 },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    sector: "Technology",
    price: 378.85,
    change: -1.23,
    changePercent: -0.32,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc. Class A",
    sector: "Technology",
    price: 138.21,
    change: 0.87,
    changePercent: 0.63,
  },
  {
    symbol: "GOOG",
    name: "Alphabet Inc. Class C",
    sector: "Technology",
    price: 139.69,
    change: 0.91,
    changePercent: 0.66,
  },
  { symbol: "AMZN", name: "Amazon.com Inc.", sector: "Technology", price: 145.86, change: 3.21, changePercent: 2.25 },
  { symbol: "TSLA", name: "Tesla Inc.", sector: "Technology", price: 248.5, change: -5.67, changePercent: -2.23 },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    sector: "Technology",
    price: 484.2,
    change: 8.45,
    changePercent: 1.78,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    sector: "Technology",
    price: 875.28,
    change: 15.67,
    changePercent: 1.82,
  },
  { symbol: "NFLX", name: "Netflix Inc.", sector: "Technology", price: 487.83, change: -2.34, changePercent: -0.48 },
  { symbol: "ADBE", name: "Adobe Inc.", sector: "Technology", price: 567.89, change: 4.56, changePercent: 0.81 },
  { symbol: "CRM", name: "Salesforce Inc.", sector: "Technology", price: 267.45, change: 1.23, changePercent: 0.46 },
  {
    symbol: "ORCL",
    name: "Oracle Corporation",
    sector: "Technology",
    price: 118.76,
    change: -0.87,
    changePercent: -0.73,
  },
  { symbol: "INTC", name: "Intel Corporation", sector: "Technology", price: 43.21, change: 0.65, changePercent: 1.53 },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    sector: "Technology",
    price: 152.34,
    change: 2.87,
    changePercent: 1.92,
  },
  {
    symbol: "PYPL",
    name: "PayPal Holdings Inc.",
    sector: "Technology",
    price: 62.45,
    change: -1.23,
    changePercent: -1.93,
  },

  // Healthcare
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare", price: 162.34, change: 0.45, changePercent: 0.28 },
  { symbol: "PFE", name: "Pfizer Inc.", sector: "Healthcare", price: 28.67, change: -0.23, changePercent: -0.79 },
  { symbol: "UNH", name: "UnitedHealth Group", sector: "Healthcare", price: 524.78, change: 3.45, changePercent: 0.66 },
  { symbol: "ABBV", name: "AbbVie Inc.", sector: "Healthcare", price: 167.89, change: 1.23, changePercent: 0.74 },
  {
    symbol: "TMO",
    name: "Thermo Fisher Scientific",
    sector: "Healthcare",
    price: 543.21,
    change: -2.34,
    changePercent: -0.43,
  },
  { symbol: "ABT", name: "Abbott Laboratories", sector: "Healthcare", price: 109.45, change: 0.87, changePercent: 0.8 },
  {
    symbol: "LLY",
    name: "Eli Lilly and Company",
    sector: "Healthcare",
    price: 789.23,
    change: 12.45,
    changePercent: 1.6,
  },
  { symbol: "MRK", name: "Merck & Co. Inc.", sector: "Healthcare", price: 108.76, change: -0.45, changePercent: -0.41 },

  // Financial Services
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    sector: "Financial",
    price: 178.45,
    change: 2.34,
    changePercent: 1.33,
  },
  { symbol: "BAC", name: "Bank of America Corp", sector: "Financial", price: 34.56, change: 0.23, changePercent: 0.67 },
  {
    symbol: "WFC",
    name: "Wells Fargo & Company",
    sector: "Financial",
    price: 45.67,
    change: -0.34,
    changePercent: -0.74,
  },
  { symbol: "GS", name: "Goldman Sachs Group", sector: "Financial", price: 387.89, change: 4.56, changePercent: 1.19 },
  { symbol: "MS", name: "Morgan Stanley", sector: "Financial", price: 89.23, change: 1.45, changePercent: 1.65 },
  { symbol: "C", name: "Citigroup Inc.", sector: "Financial", price: 56.78, change: -0.67, changePercent: -1.17 },
  {
    symbol: "AXP",
    name: "American Express Company",
    sector: "Financial",
    price: 198.45,
    change: 2.87,
    changePercent: 1.47,
  },
  {
    symbol: "BRK.A",
    name: "Berkshire Hathaway Inc.",
    sector: "Financial",
    price: 544321.0,
    change: 1234.56,
    changePercent: 0.23,
  },
  {
    symbol: "BRK.B",
    name: "Berkshire Hathaway Inc. Class B",
    sector: "Financial",
    price: 362.45,
    change: 0.87,
    changePercent: 0.24,
  },

  // Consumer Discretionary
  {
    symbol: "HD",
    name: "Home Depot Inc.",
    sector: "Consumer Discretionary",
    price: 345.67,
    change: -1.23,
    changePercent: -0.35,
  },
  {
    symbol: "MCD",
    name: "McDonald's Corporation",
    sector: "Consumer Discretionary",
    price: 287.89,
    change: 1.45,
    changePercent: 0.51,
  },
  {
    symbol: "NKE",
    name: "Nike Inc.",
    sector: "Consumer Discretionary",
    price: 98.76,
    change: -2.34,
    changePercent: -2.32,
  },
  {
    symbol: "SBUX",
    name: "Starbucks Corporation",
    sector: "Consumer Discretionary",
    price: 94.32,
    change: 0.67,
    changePercent: 0.72,
  },
  {
    symbol: "TGT",
    name: "Target Corporation",
    sector: "Consumer Discretionary",
    price: 147.89,
    change: 2.45,
    changePercent: 1.68,
  },
  {
    symbol: "LOW",
    name: "Lowe's Companies Inc.",
    sector: "Consumer Discretionary",
    price: 234.56,
    change: -0.87,
    changePercent: -0.37,
  },

  // Consumer Staples
  { symbol: "WMT", name: "Walmart Inc.", sector: "Consumer Staples", price: 167.89, change: 0.45, changePercent: 0.27 },
  {
    symbol: "PG",
    name: "Procter & Gamble Company",
    sector: "Consumer Staples",
    price: 156.78,
    change: -0.23,
    changePercent: -0.15,
  },
  {
    symbol: "KO",
    name: "Coca-Cola Company",
    sector: "Consumer Staples",
    price: 59.87,
    change: 0.12,
    changePercent: 0.2,
  },
  { symbol: "PEP", name: "PepsiCo Inc.", sector: "Consumer Staples", price: 171.23, change: 0.87, changePercent: 0.51 },
  {
    symbol: "COST",
    name: "Costco Wholesale Corporation",
    sector: "Consumer Staples",
    price: 789.45,
    change: 3.21,
    changePercent: 0.41,
  },

  // Energy
  {
    symbol: "XOM",
    name: "Exxon Mobil Corporation",
    sector: "Energy",
    price: 112.34,
    change: 1.87,
    changePercent: 1.69,
  },
  { symbol: "CVX", name: "Chevron Corporation", sector: "Energy", price: 156.78, change: 2.45, changePercent: 1.59 },
  { symbol: "COP", name: "ConocoPhillips", sector: "Energy", price: 118.9, change: 1.23, changePercent: 1.05 },

  // Industrials
  { symbol: "BA", name: "Boeing Company", sector: "Industrials", price: 198.76, change: -3.45, changePercent: -1.71 },
  { symbol: "CAT", name: "Caterpillar Inc.", sector: "Industrials", price: 287.89, change: 2.34, changePercent: 0.82 },
  {
    symbol: "GE",
    name: "General Electric Company",
    sector: "Industrials",
    price: 123.45,
    change: 1.67,
    changePercent: 1.37,
  },
  { symbol: "MMM", name: "3M Company", sector: "Industrials", price: 98.76, change: -0.45, changePercent: -0.45 },

  // Utilities
  { symbol: "NEE", name: "NextEra Energy Inc.", sector: "Utilities", price: 67.89, change: 0.23, changePercent: 0.34 },
  {
    symbol: "DUK",
    name: "Duke Energy Corporation",
    sector: "Utilities",
    price: 98.45,
    change: -0.12,
    changePercent: -0.12,
  },

  // Real Estate
  {
    symbol: "AMT",
    name: "American Tower Corporation",
    sector: "Real Estate",
    price: 198.76,
    change: 1.23,
    changePercent: 0.62,
  },
  { symbol: "PLD", name: "Prologis Inc.", sector: "Real Estate", price: 134.56, change: 0.87, changePercent: 0.65 },

  // Materials
  { symbol: "LIN", name: "Linde plc", sector: "Materials", price: 423.45, change: 2.87, changePercent: 0.68 },
  {
    symbol: "APD",
    name: "Air Products and Chemicals",
    sector: "Materials",
    price: 287.9,
    change: -1.23,
    changePercent: -0.43,
  },

  // Communication Services
  {
    symbol: "VZ",
    name: "Verizon Communications Inc.",
    sector: "Communication",
    price: 38.76,
    change: -0.12,
    changePercent: -0.31,
  },
  { symbol: "T", name: "AT&T Inc.", sector: "Communication", price: 16.45, change: 0.05, changePercent: 0.3 },
  {
    symbol: "CMCSA",
    name: "Comcast Corporation",
    sector: "Communication",
    price: 42.34,
    change: 0.23,
    changePercent: 0.55,
  },
  {
    symbol: "DIS",
    name: "Walt Disney Company",
    sector: "Communication",
    price: 89.76,
    change: -1.45,
    changePercent: -1.59,
  },
]

export function searchStocks(query: string, limit = 10): StockData[] {
  if (!query.trim()) return []

  const searchTerm = query.toLowerCase()

  return stockDatabase
    .filter((stock) => stock.symbol.toLowerCase().includes(searchTerm) || stock.name.toLowerCase().includes(searchTerm))
    .sort((a, b) => {
      // Prioritize symbol matches over name matches
      const aSymbolMatch = a.symbol.toLowerCase().startsWith(searchTerm)
      const bSymbolMatch = b.symbol.toLowerCase().startsWith(searchTerm)

      if (aSymbolMatch && !bSymbolMatch) return -1
      if (!aSymbolMatch && bSymbolMatch) return 1

      // Then sort alphabetically
      return a.symbol.localeCompare(b.symbol)
    })
    .slice(0, limit)
}
