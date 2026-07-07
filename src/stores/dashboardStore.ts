import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { DashboardData, DashboardSummary } from '@/types/dashboard'
import { fetchDashboardData } from '@/services/dashboardService'
import { logger } from '@/logs/logger'

export const useDashboardStore = defineStore('dashboard', () => {
  const data = ref<DashboardData | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const summary = computed<DashboardSummary | null>(() => data.value?.summary ?? null)
  const trend = computed(() => data.value?.trend ?? [])
  const categories = computed(() => data.value?.categories ?? [])
  const ranking = computed(() => data.value?.ranking ?? [])
  const radar = computed(() => data.value?.radar ?? [])
  const activities = computed(() => data.value?.activities ?? [])

  async function load() {
    loading.value = true
    error.value = null
    try {
      const raw = await fetchDashboardData()
      console.log('[store] raw fetched:', raw)
      data.value = raw
      logger.info('Dashboard data loaded successfully')
    } catch (err) {
      data.value = null
      const message = err instanceof Error ? err.message : 'Unknown error'
      error.value = message
      logger.error('Failed to load dashboard data', err)
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    summary,
    trend,
    categories,
    ranking,
    radar,
    activities,
    load
  }
})
