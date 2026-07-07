<template>
  <BasePanel header="态势总览">
    <div class="map-container">
      <v-chart class="chart" :option="option" autoresize />
    </div>
  </BasePanel>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { GraphChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import BasePanel from '@/components/BasePanel.vue'

use([GraphChart, TooltipComponent, LegendComponent])

const nodes = [
  { id: '0', name: '中心节点', symbolSize: 40, x: 300, y: 200, itemStyle: { color: '#00e5ff' } },
  { id: '1', name: '北京', symbolSize: 20, x: 500, y: 120, itemStyle: { color: '#00c6ff' } },
  { id: '2', name: '上海', symbolSize: 20, x: 520, y: 240, itemStyle: { color: '#00c6ff' } },
  { id: '3', name: '广州', symbolSize: 18, x: 420, y: 320, itemStyle: { color: '#00c6ff' } },
  { id: '4', name: '深圳', symbolSize: 18, x: 440, y: 340, itemStyle: { color: '#00c6ff' } },
  { id: '5', name: '成都', symbolSize: 16, x: 280, y: 260, itemStyle: { color: '#00c6ff' } },
  { id: '6', name: '武汉', symbolSize: 16, x: 380, y: 220, itemStyle: { color: '#00c6ff' } }
]

const links = [
  { source: '0', target: '1' },
  { source: '0', target: '2' },
  { source: '0', target: '3' },
  { source: '0', target: '5' },
  { source: '0', target: '6' },
  { source: '2', target: '4' }
]

const option = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: {},
  series: [
    {
      type: 'graph',
      layout: 'none',
      data: nodes,
      links,
      roam: true,
      label: {
        show: true,
        position: 'right',
        color: '#8aa8d8',
        fontSize: 12
      },
      lineStyle: {
        color: 'rgba(0,198,255,0.4)',
        width: 1,
        curveness: 0.1
      },
      emphasis: {
        focus: 'adjacency',
        lineStyle: { width: 2 }
      }
    }
  ]
}))
</script>

<style scoped lang="scss">
.map-container {
  position: relative;
  width: 100%;
  height: 340px;
}
.chart {
  width: 100%;
  height: 100%;
}
</style>
