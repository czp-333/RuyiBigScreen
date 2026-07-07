<template>
  <BasePanel header="访问趋势">
    <v-chart class="chart" :option="option" autoresize />
  </BasePanel>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components'
import BasePanel from '@/components/BasePanel.vue'

use([LineChart, GridComponent, TooltipComponent, TitleComponent])

const props = defineProps<{
  data: { time: string; value: number }[]
}>()

const option = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    top: 30,
    right: 20,
    bottom: 20,
    left: 40,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: props.data.map((item) => item.time),
    axisLine: { lineStyle: { color: 'rgba(0,198,255,0.3)' } },
    axisLabel: { color: '#8aa8d8' }
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(0,198,255,0.1)' } },
    axisLabel: { color: '#8aa8d8' }
  },
  series: [
    {
      data: props.data.map((item) => item.value),
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { color: '#00c6ff', width: 2 },
      itemStyle: { color: '#00e5ff' },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(0,198,255,0.4)' },
            { offset: 1, color: 'rgba(0,198,255,0.02)' }
          ]
        }
      }
    }
  ]
}))
</script>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 260px;
}
</style>
