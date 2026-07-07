import type { DashboardData } from '@/types/dashboard'

const cities = [
  '北京', '上海', '广州', '深圳', '杭州',
  '成都', '武汉', '南京', '重庆', '西安'
]

const categories = [
  { name: '电商', value: 0 },
  { name: '金融', value: 0 },
  { name: '教育', value: 0 },
  { name: '医疗', value: 0 },
  { name: '制造', value: 0 }
]

const abilities = [
  '处理能力', '响应速度', '稳定性', '安全性', '扩展性', '可用性'
]

const activities = [
  { id: '1', time: '22:10:05', content: '系统自动巡检完成，未发现异常', type: 'info' as const },
  { id: '2', time: '22:08:32', content: '北京节点流量峰值告警', type: 'warning' as const },
  { id: '3', time: '22:05:17', content: '新批次数据同步任务已启动', type: 'info' as const },
  { id: '4', time: '22:01:44', content: '上海节点响应时间恢复正常', type: 'info' as const },
  { id: '5', time: '21:58:09', content: '检测到异常访问请求，已拦截', type: 'error' as const },
  { id: '6', time: '21:55:22', content: '数据缓存清理完成，释放 2.3GB', type: 'info' as const }
]

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateTrend(): { time: string; value: number }[] {
  const points: { time: string; value: number }[] = []
  const now = new Date()
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 3600 * 1000)
    const h = d.getHours().toString().padStart(2, '0')
    points.push({
      time: `${h}:00`,
      value: randomBetween(200, 1200)
    })
  }
  return points
}

function generateCategories(): { name: string; value: number }[] {
  return categories.map((c) => ({
    name: c.name,
    value: randomBetween(500, 3000)
  }))
}

function generateRanking(): { city: string; value: number }[] {
  return cities
    .map((city) => ({
      city,
      value: randomBetween(1000, 10000)
    }))
    .sort((a, b) => b.value - a.value)
}

function generateRadar(): { ability: string; value: number }[] {
  return abilities.map((ability) => ({
    ability,
    value: randomBetween(60, 98)
  }))
}

export function dashboardMock(): DashboardData {
  return {
    summary: {
      visits: randomBetween(50000, 200000),
      orders: randomBetween(10000, 50000),
      activeUsers: randomBetween(5000, 25000),
      healthScore: randomBetween(85, 99)
    },
    trend: generateTrend(),
    categories: generateCategories(),
    ranking: generateRanking(),
    radar: generateRadar(),
    activities
  }
}
