import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchDashboardData, getDataSourceMode } from '@/services/dashboardService'

vi.mock('@/mocks/dashboardMock', () => ({
  dashboardMock: () => ({
    summary: { visits: 1000, orders: 200, activeUsers: 50, healthScore: 98 },
    trend: [],
    categories: [],
    ranking: [],
    radar: [],
    activities: []
  })
}))

describe('dashboardService', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_DATA_SOURCE', 'mock')
  })

  it('returns data in mock mode', async () => {
    const data = await fetchDashboardData()
    expect(data.summary.visits).toBe(1000)
    expect(data.summary.orders).toBe(200)
  })

  it('detects mock mode', () => {
    expect(getDataSourceMode()).toBe('mock')
  })
})
