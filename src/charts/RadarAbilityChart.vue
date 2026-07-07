<template>
  <BasePanel header="能力雷达">
    <div ref="chartRef" class="chart"></div>
  </BasePanel>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import BasePanel from '@/components/BasePanel.vue'

const props = defineProps<{
  data: { ability: string; value: number }[]
}>()

const chartRef = ref<HTMLElement | undefined>()
let chart: echarts.ECharts | null = null

const option = computed(() => {
  if (!props.data || props.data.length === 0) {
    return { backgroundColor: 'transparent' }
  }

  return {
    backgroundColor: 'transparent',
    tooltip: {},
    radar: {
      indicator: props.data.map((item) => ({
        name: item.ability,
        max: 100
      })),
      shape: 'polygon',
      splitNumber: 4,
      axisName: { color: '#8aa8d8' },
      splitLine: { lineStyle: { color: 'rgba(0,198,255,0.15)' } },
      axisLine: { lineStyle: { color: 'rgba(0,198,255,0.3)' } }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: props.data.map((item) => item.value),
            name: '能力指标',
            areaStyle: { color: 'rgba(0,198,255,0.2)' },
            lineStyle: { color: '#00c6ff', width: 2 },
            itemStyle: { color: '#00e5ff' }
          }
        ]
      }
    ]
  }
})

function render() {
  if (!chart || !props.data || props.data.length === 0) {
    return
  }
  chart.setOption(option.value)
}

onMounted(() => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    render()
  }
})

watch(() => props.data, render)

onUnmounted(() => {
  chart?.dispose()
})
</script>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 260px;
}
</style>
