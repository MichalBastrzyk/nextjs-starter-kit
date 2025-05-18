export interface OrderSummary {
  subtotal: number
  shipping: number
  total: number
  currency: string
}

export interface OrderStatus {
  id: number
  title: string
  date: Date | null
}
