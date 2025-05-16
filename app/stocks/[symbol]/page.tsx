import StockDetailAdult from "@/components/stock-detail-adult"

export default function StockDetailPage({ params }: { params: { symbol: string } }) {
  return <StockDetailAdult symbol={params.symbol} />
}
