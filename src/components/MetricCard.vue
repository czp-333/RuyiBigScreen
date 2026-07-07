<template>
  <div class="metric-card">
    <div class="metric-label">{{ label }}</div>
    <div class="metric-value">{{ displayValue }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatNumber } from '@/utils/format'

const props = defineProps<{
  label: string
  value: number
  suffix?: string
}>()

const displayValue = computed(() => {
  const formatted = formatNumber(props.value)
  return props.suffix ? `${formatted}${props.suffix}` : formatted
})
</script>

<style scoped lang="scss">
.metric-card {
  position: relative;
  background: linear-gradient(180deg, rgba(18, 42, 82, 0.6) 0%, rgba(12, 34, 70, 0.4) 100%);
  border: 1px solid rgba(0, 198, 255, 0.25);
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00c6ff, transparent);
  }
}
.metric-label {
  font-size: 14px;
  color: #8aa8d8;
  margin-bottom: 8px;
}
.metric-value {
  font-size: 28px;
  color: #00e5ff;
  font-weight: bold;
  text-shadow: 0 0 12px rgba(0, 229, 255, 0.6);
  font-family: 'D-DIN', 'Helvetica Neue', Arial, sans-serif;
}
</style>
