<template>
  <header class="screen-header">
    <div class="header-deco left" />
    <div class="header-content">
      <h1 class="header-title">如意数据大屏</h1>
      <p class="header-subtitle">RuyiBigScreen</p>
    </div>
    <div class="header-deco right" />
    <div class="header-time">{{ currentTime }}</div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { formatDateTime } from '@/utils/format'

const currentTime = ref('')

let timer: number | null = null

function updateTime() {
  currentTime.value = formatDateTime(new Date())
}

onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped lang="scss">
.screen-header {
  position: relative;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(0, 198, 255, 0.15) 0%, transparent 100%);
  border-bottom: 1px solid rgba(0, 198, 255, 0.3);
}
.header-deco {
  position: absolute;
  top: 0;
  width: 200px;
  height: 64px;
  background: linear-gradient(180deg, rgba(0, 198, 255, 0.2) 0%, transparent 100%);
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
}
.header-deco.left {
  left: 0;
}
.header-deco.right {
  right: 0;
  transform: scaleX(-1);
}
.header-content {
  text-align: center;
  z-index: 1;
}
.header-title {
  margin: 0;
  font-size: 32px;
  color: #00e5ff;
  text-shadow: 0 0 16px rgba(0, 229, 255, 0.7);
  letter-spacing: 8px;
  font-weight: bold;
}
.header-subtitle {
  margin: 2px 0 0;
  font-size: 12px;
  color: #8aa8d8;
  letter-spacing: 4px;
}
.header-time {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #00e5ff;
  font-family: 'D-DIN', 'Helvetica Neue', Arial, sans-serif;
  text-shadow: 0 0 6px rgba(0, 229, 255, 0.5);
}
</style>
