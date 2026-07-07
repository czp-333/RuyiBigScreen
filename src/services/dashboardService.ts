import { logger } from '@/logs/logger'
import { DashboardData } from '@/types/dashboard'
import { dashboardMock } from '@/mocks/dashboardMock'

export type DataSourceMode = 'mock' | 'api'

export function getDataSourceMode(): DataSourceMode {
  const mode = (import.meta.env.VITE_DATA_SOURCE as DataSourceMode) || 'mock'
  return mode
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const mode = getDataSourceMode()
  logger.info(`Fetching dashboard data with mode: ${mode}`)

  if (mode === 'mock') {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return dashboardMock()
  }

  const { http } = await import('./http')
  const response = await http.get('/dashboard')
  return response as unknown as DashboardData
}
