// Mock news data
export const mockNewsData = [
  {
    id: "news-1",
    title: "Fed Signals Potential Rate Cut as Inflation Cools",
    summary:
      "The Federal Reserve indicated it may consider rate cuts in the coming months as inflation shows signs of easing, boosting market sentiment.",
    content:
      "The Federal Reserve signaled on Wednesday that it could begin cutting interest rates in the coming months if inflation continues to cool, a shift in tone that sent stocks higher. Fed Chair Jerome Powell noted that while the labor market remains strong, recent data shows inflation moving closer to the central bank's 2% target. \"We're seeing progress, and if that progress continues, we could begin adjusting our policy stance as soon as the next few meetings,\" Powell said during a press conference. The S&P 500 rose 1.2% following the announcement, with rate-sensitive tech stocks leading the gains. Economists now predict the first rate cut could come as early as September, though Powell emphasized that decisions would remain data-dependent.",
    category: "Economy",
    source: "Financial Times",
    image: "/placeholder.svg?height=400&width=600&text=Fed+Meeting",
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    relatedStocks: ["SPY", "QQQ", "TLT"],
    trending: true,
    featured: true,
  },
  {
    id: "news-2",
    title: "Apple Unveils New AI Features for iPhone, Stock Surges",
    summary:
      "Apple announced a suite of AI-powered features coming to iPhones later this year, sending the company's stock to new all-time highs.",
    content:
      "Apple unveiled a comprehensive set of artificial intelligence features for its iPhone and other devices on Monday, marking the company's biggest push into AI to date. The new capabilities, collectively called Apple Intelligence, will allow users to generate images, summarize texts, and interact with a more advanced version of Siri. The announcement, made during Apple's annual Worldwide Developers Conference (WWDC), was well-received by investors, with the company's stock climbing 3.5% to reach a new all-time high. Analysts noted that the features put Apple in direct competition with other tech giants like Google and Microsoft in the race to integrate AI into consumer products. The new AI features will be available on iPhone 15 Pro models and newer devices when iOS 18 is released this fall.",
    category: "Technology",
    source: "Bloomberg",
    image: "/placeholder.svg?height=400&width=600&text=Apple+Event",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    relatedStocks: ["AAPL", "MSFT", "GOOGL"],
    trending: true,
  },
  {
    id: "news-3",
    title: "Tesla Deliveries Beat Expectations, Shares Rally",
    summary:
      "Tesla reported stronger-than-expected vehicle deliveries for the second quarter, easing concerns about demand and boosting the stock.",
    content:
      "Tesla delivered 466,000 vehicles in the second quarter, exceeding analyst expectations of 445,000, according to figures released by the electric vehicle maker on Sunday. The better-than-anticipated results helped alleviate concerns about softening demand for electric vehicles amid higher interest rates and increased competition. Tesla's shares jumped over 7% in early trading on Monday, recouping some of the losses from earlier in the year. The company attributed the strong performance to price adjustments and the popularity of its Model Y crossover. CEO Elon Musk stated on social media that he expects the second half of the year to show continued growth as production ramps up at factories in Texas and Berlin.",
    category: "Automotive",
    source: "Reuters",
    image: "/placeholder.svg?height=400&width=600&text=Tesla+Factory",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    relatedStocks: ["TSLA", "RIVN", "GM"],
    trending: true,
  },
  {
    id: "news-4",
    title: "NVIDIA Announces Next-Generation AI Chips, Expands Lead",
    summary:
      "NVIDIA unveiled its next-generation AI processors, further cementing its dominance in the booming artificial intelligence market.",
    content:
      "NVIDIA announced its next-generation AI chips on Tuesday, introducing the Blackwell architecture that the company claims delivers up to 4x the performance of its current Hopper chips. The announcement, made at NVIDIA's GTC conference, highlights the company's continued dominance in the AI chip market that has propelled its stock up more than 200% over the past year. CEO Jensen Huang emphasized that the new chips are designed to meet the growing demand for training and running large language models that power generative AI applications. Cloud providers including Amazon, Google, and Microsoft have already committed to deploying the new chips when they become available later this year. Analysts estimate that the new products could add billions to NVIDIA's already soaring revenue.",
    category: "Technology",
    source: "CNBC",
    image: "/placeholder.svg?height=400&width=600&text=NVIDIA+Chips",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    relatedStocks: ["NVDA", "AMD", "INTC"],
  },
  {
    id: "news-5",
    title: "Amazon Expands Healthcare Push with New Pharmacy Service",
    summary:
      "Amazon is expanding its healthcare offerings with a new prescription delivery service, intensifying competition in the pharmacy sector.",
    content:
      "Amazon announced on Thursday an expansion of its healthcare business with a new prescription delivery service that promises to deliver medications within hours in select cities. The move represents a significant escalation of Amazon's ambitions in the healthcare space and sent shares of traditional pharmacy chains like CVS and Walgreens down by 3-5%. The new service, called Amazon Pharmacy Plus, will initially be available in 10 major U.S. cities with plans to expand to 30 cities by the end of the year. Amazon Prime members will receive the service at no additional cost. \"We're applying Amazon's logistics expertise to healthcare to make getting prescriptions as easy as ordering anything else on Amazon,\" said Neil Lindsay, senior vice president of Amazon Health Services. The announcement comes as Amazon continues to look for growth opportunities beyond its core e-commerce business.",
    category: "Healthcare",
    source: "Wall Street Journal",
    image: "/placeholder.svg?height=400&width=600&text=Amazon+Pharmacy",
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    relatedStocks: ["AMZN", "CVS", "WBA"],
  },
  {
    id: "news-6",
    title: "Oil Prices Surge as Middle East Tensions Escalate",
    summary:
      "Crude oil prices jumped more than 3% as geopolitical tensions in the Middle East raised concerns about potential supply disruptions.",
    content:
      'Oil prices surged more than 3% on Friday as escalating tensions in the Middle East raised fears about potential disruptions to global crude supplies. Brent crude, the international benchmark, rose to $86 per barrel, while U.S. West Texas Intermediate crude climbed to $82 per barrel. The spike came after reports of increased military activity near major oil shipping routes in the region. Energy analysts warned that any conflict affecting the Strait of Hormuz, through which about 20% of the world\'s oil passes, could lead to significantly higher prices. "The geopolitical premium is back in oil prices," said John Smith, chief oil analyst at Energy Capital Research. "Markets are pricing in the risk of supply disruptions, even though actual production hasn\'t been affected yet." Energy stocks rallied on the news, with major oil companies like Exxon Mobil and Chevron seeing gains of 2-3%.',
    category: "Commodities",
    source: "Bloomberg",
    image: "/placeholder.svg?height=400&width=600&text=Oil+Rigs",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
    relatedStocks: ["XOM", "CVX", "USO"],
  },
  {
    id: "news-7",
    title: "JPMorgan Reports Record Quarterly Profit, Boosts Outlook",
    summary:
      "JPMorgan Chase reported its highest-ever quarterly profit and raised its full-year outlook, signaling strength in the banking sector.",
    content:
      "JPMorgan Chase reported a record quarterly profit on Friday, easily beating analyst expectations and raising its outlook for the full year. The largest U.S. bank by assets posted a profit of $13.4 billion for the second quarter, up 21% from a year earlier, driven by strong performance in its investment banking and trading divisions. CEO Jamie Dimon expressed cautious optimism about the U.S. economy, noting that consumer spending remains resilient despite higher interest rates. \"The U.S. economy continues to be resilient, with consumers still spending and businesses in good shape, though we remain alert to a number of significant geopolitical and economic risks,\" Dimon said in a statement. The bank raised its full-year net interest income guidance to $89 billion from $87 billion previously. JPMorgan's results often set the tone for the banking sector's earnings season, and other major banks are scheduled to report next week.",
    category: "Finance",
    source: "Financial Times",
    image: "/placeholder.svg?height=400&width=600&text=JPMorgan+HQ",
    publishedAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(), // 28 hours ago
    relatedStocks: ["JPM", "BAC", "GS"],
  },
  {
    id: "news-8",
    title: "Meta Platforms Announces New VR Headset, Expands Metaverse Push",
    summary:
      "Meta unveiled its next-generation virtual reality headset and announced new partnerships to expand its metaverse ecosystem.",
    content:
      "Meta Platforms announced its next-generation virtual reality headset on Wednesday, featuring improved resolution, a slimmer design, and a lower price point than its predecessor. The Meta Quest 3 Lite, priced at $299, represents the company's effort to make VR technology more accessible to mainstream consumers. During the announcement, CEO Mark Zuckerberg also revealed new partnerships with major entertainment and gaming companies to expand the content available in Meta's metaverse. \"We're making significant progress in building the metaverse and making it accessible to more people,\" Zuckerberg said during the company's Connect conference. Despite skepticism from some investors about the billions being spent on metaverse development, Meta's shares rose 2% following the announcement, with analysts noting that the lower-priced headset could accelerate adoption. The company also provided updates on its AI initiatives, including new AI features coming to Instagram and WhatsApp.",
    category: "Technology",
    source: "The Verge",
    image: "/placeholder.svg?height=400&width=600&text=Meta+VR+Headset",
    publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 36 hours ago
    relatedStocks: ["META", "RBLX", "U"],
  },
  {
    id: "news-9",
    title: "Retail Sales Decline Unexpectedly in June, Consumer Concerns Rise",
    summary:
      "U.S. retail sales fell unexpectedly in June, raising concerns about consumer spending and economic growth in the second half of the year.",
    content:
      'U.S. retail sales unexpectedly declined in June, falling 0.3% from the previous month, according to data released by the Commerce Department on Thursday. Economists had forecast a 0.2% increase. The drop in consumer spending, which accounts for more than two-thirds of U.S. economic activity, has raised concerns about the strength of the economy heading into the second half of the year. The decline was broad-based, with decreases in spending at auto dealerships, furniture stores, and online retailers. Only gasoline stations and restaurants saw modest increases. "This is a concerning sign that consumers are becoming more cautious with their spending," said Jane Smith, chief economist at Global Economics Research. "It suggests that higher interest rates and persistent inflation are starting to weigh more heavily on household budgets." The data prompted some economists to lower their GDP growth forecasts for the second quarter, with several major banks now expecting growth of around 2% annualized, down from previous estimates of 2.5-3%.',
    category: "Economy",
    source: "Reuters",
    image: "/placeholder.svg?height=400&width=600&text=Retail+Shopping",
    publishedAt: new Date(Date.now() - 42 * 60 * 60 * 1000).toISOString(), // 42 hours ago
    relatedStocks: ["WMT", "TGT", "AMZN"],
  },
  {
    id: "news-10",
    title: "Microsoft Acquires Cybersecurity Firm for $5 Billion",
    summary:
      "Microsoft announced the acquisition of a leading cybersecurity company in a $5 billion deal to enhance its security offerings.",
    content:
      "Microsoft announced on Monday that it has agreed to acquire cybersecurity firm CyberShield for $5 billion, in one of the largest security acquisitions of the year. The deal will allow Microsoft to integrate CyberShield's advanced threat detection and response capabilities into its cloud and enterprise security products. \"Security is a top priority for every organization today, and this acquisition significantly enhances our ability to protect customers in an increasingly complex threat landscape,\" said Microsoft CEO Satya Nadella in a statement. The acquisition comes amid rising concerns about cybersecurity following several high-profile attacks on major corporations and government agencies. CyberShield, founded in 2015, has developed AI-powered security tools that are used by many Fortune 500 companies. The deal is expected to close by the end of the year, subject to regulatory approval. Microsoft's shares rose 1.5% following the announcement, while other cybersecurity stocks saw mixed reactions as investors assessed the competitive implications.",
    category: "Technology",
    source: "CNBC",
    image: "/placeholder.svg?height=400&width=600&text=Cybersecurity",
    publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 48 hours ago
    relatedStocks: ["MSFT", "CRWD", "PANW"],
  },
]
