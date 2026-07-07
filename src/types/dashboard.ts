export interface DashboardSummary {
  visits: number
  orders: number
  activeUsers: number
  healthScore: number
}

export interface TrendPoint {
  time: string
  value: number
}

export interface CategoryItem {
  name: string
  value: number
}

export interface RankingItem {
  city: string
  value: number
}

export interface RadarItem {
  ability: string
  value: number
}

export interface ActivityItem {
  id: string
  time: string
  content: string
  type: 'info' | 'warning' | 'error'
}

export interface DashboardData {
  summary: DashboardSummary
  trend: TrendPoint[]
  categories: CategoryItem[]
  ranking: RankingItem[]
  radar: RadarItem[]
  activities: ActivityItem[]
}
