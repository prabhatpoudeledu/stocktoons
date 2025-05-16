import StockDetailKids from "@/components/stock-detail-kids"

export default function KidsStockDetailPage({ params }: { params: { symbol: string } }) {
  return <StockDetailKids symbol={params.symbol} />
}
