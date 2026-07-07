<template>
  <BasePanel header="城市排名">
    <v-chart class="chart" :option="option" autoresize />
  </BasePanel>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import BasePanel from '@/components/BasePanel.vue'

use([BarChart, GridComponent, TooltipComponent])

const props = defineProps<{
  data: { city: string; value: number }[]
}>()

const option = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  grid: {
    top: 10,
    right: 20,
    bottom: 20,
    left: 50,
    containLabel: true
  },
  xAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(0,198,255,0.1)' } },
    axisLabel: { color: '#8aa8d8' }
  },
  yAxis: {
    type: 'category',
    data: props.data.map((item) => item.city).reverse(),
    axisLine: { lineStyle: { color: 'rgba(0,198,255,0.3)' } },
    axisLabel: { color: '#8aa8d8' }
  },
  series: [
    {
      data: props.data.map((item) => item.value).reverse(),
      type: 'bar',
      barWidth: 14,
      itemStyle: {
        borderRadius: [0, 4, 4, 0],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: '#00c6ff' },
            { offset: 1, color: 'rgba(0,198,255,0.2)' }
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
