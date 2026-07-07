<template>
  <BasePanel header="分类占比">
    <v-chart class="chart" :option="option" autoresize />
  </BasePanel>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import BasePanel from '@/components/BasePanel.vue'

use([PieChart, TooltipComponent, LegendComponent])

const props = defineProps<{
  data: { name: string; value: number }[]
}>()

const option = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  },
  legend: {
    bottom: 0,
    textStyle: { color: '#8aa8d8' }
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 4,
        borderColor: '#0a1e3f',
        borderWidth: 2
      },
      label: {
        color: '#8aa8d8'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold',
          color: '#00e5ff'
        }
      },
      data: props.data
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
