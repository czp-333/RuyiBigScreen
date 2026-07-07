import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { use } from 'echarts/core'
import { LineChart, BarChart, PieChart, RadarChart, GraphChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components'
import App from './App.vue'
import { initMock } from '@/mocks/browser'

use([
  LineChart, BarChart, PieChart, RadarChart, GraphChart,
  GridComponent, TooltipComponent, TitleComponent, LegendComponent,
])

initMock().then(() => {
  const app = createApp(App)
  app.use(createPinia())
  app.mount('#app')
}).catch((err) => {
  console.error('[Mock] Failed to initialize mock environment:', err)
  const app = createApp(App)
  app.use(createPinia())
  app.mount('#app')
})
