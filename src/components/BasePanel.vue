<template>
  <div class="base-panel">
    <div class="panel-header" v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="panel-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.base-panel {
  position: relative;
  background: linear-gradient(180deg, rgba(18, 42, 82, 0.6) 0%, rgba(12, 34, 70, 0.4) 100%);
  border: 1px solid rgba(0, 198, 255, 0.25);
  border-radius: 4px;
  padding: 16px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-top: 2px solid #00c6ff;
    border-left: 2px solid #00c6ff;
    border-radius: 2px 0 0 0;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #00c6ff;
    border-right: 2px solid #00c6ff;
    border-radius: 0 0 2px 0;
  }
}
.panel-header {
  margin-bottom: 12px;
  font-size: 16px;
  color: #00e5ff;
  text-shadow: 0 0 8px rgba(0, 229, 255, 0.5);
  letter-spacing: 2px;
}
.panel-body {
  position: relative;
  z-index: 1;
}
</style>
