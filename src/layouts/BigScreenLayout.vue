<template>
  <div class="big-screen-layout" :style="layoutStyle">
    <div class="screen-wrapper" :style="wrapperStyle">
      <ScreenHeader />
      <main class="screen-main">
        <section class="metrics-row">
          <MetricCard label="今日访问量" :value="store.summary?.visits ?? 0" />
          <MetricCard label="实时订单数" :value="store.summary?.orders ?? 0" />
          <MetricCard label="活跃用户数" :value="store.summary?.activeUsers ?? 0" />
          <MetricCard label="系统健康度" :value="store.summary?.healthScore ?? 0" suffix="%" />
        </section>

        <section class="content-row">
          <aside class="left-col">
            <LineTrendChart :data="store.trend" />
            <PieStatusChart :data="store.categories" />
          </aside>

          <div class="center-col">
            <MapOverviewChart />
          </div>

          <aside class="right-col">
            <BarRankingChart :data="store.ranking" />
            <RadarAbilityChart :data="store.radar" />
          </aside>
        </section>

        <section class="bottom-row">
          <BasePanel header="实时动态">
            <div class="activity-list">
              <div v-for="item in store.activities" :key="item.id" class="activity-item" :class="item.type">
                <span class="activity-time">{{ item.time }}</span>
                <span class="activity-content">{{ item.content }}</span>
              </div>
            </div>
          </BasePanel>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboardStore'
import { getScale } from '@/utils/resize'
import ScreenHeader from '@/components/ScreenHeader.vue'
import MetricCard from '@/components/MetricCard.vue'
import BasePanel from '@/components/BasePanel.vue'
import LineTrendChart from '@/charts/LineTrendChart.vue'
import BarRankingChart from '@/charts/BarRankingChart.vue'
import PieStatusChart from '@/charts/PieStatusChart.vue'
import RadarAbilityChart from '@/charts/RadarAbilityChart.vue'
import MapOverviewChart from '@/charts/MapOverviewChart.vue'

const store = useDashboardStore()

const layoutStyle = computed(() => ({
  width: '100vw',
  height: '100vh',
  background: '#050d1f url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'100%25\'%3E%3Cdefs%3E%3CradialGradient id=\'g\' cx=\'50%25\' cy=\'50%25\' r=\'70%25\'%3E%3Cstop offset=\'0%25\' stop-color=\'%230a1e3f\'/%3E%3Cstop offset=\'100%25\' stop-color=\'%23050d1f\'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23g)\'/%3E%3C/svg%3E") no-repeat center',
  overflow: 'hidden'
}))

const wrapperStyle = computed(() => {
  const { scale } = getScale()
  return {
    transform: `scale(${scale})`,
    transformOrigin: 'top center'
  }
})

onMounted(() => {
  store.load()
})
</script>

<style scoped lang="scss">
.screen-wrapper {
  width: 1920px;
  height: 1080px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  color: #e0f7ff;
}
.screen-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px 24px 24px;
  gap: 16px;
  background: transparent;
}
.metrics-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.content-row {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 16px;
  min-height: 0;
}
.left-col,
.right-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.center-col {
  display: flex;
  flex-direction: column;
}
.bottom-row {
  height: 180px;
}
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  overflow: hidden;
}
.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 4px;
  background: rgba(0, 198, 255, 0.06);
  border-left: 3px solid rgba(0, 198, 255, 0.5);
  font-size: 13px;
  &.info { border-left-color: #00c6ff; }
  &.warning { border-left-color: #ffaa00; }
  &.error { border-left-color: #ff4d4f; }
}
.activity-time {
  color: #8aa8d8;
  font-family: 'D-DIN', 'Helvetica Neue', Arial, sans-serif;
  white-space: nowrap;
}
.activity-content {
  color: #cce6ff;
  flex: 1;
}
</style>
