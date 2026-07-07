import { useResizeObserver } from '@vueuse/core'

export function useScreenResize(callback: (width: number, height: number) => void) {
  if (typeof window === 'undefined') return

  const update = () => {
    callback(window.innerWidth, window.innerHeight)
  }

  update()

  useResizeObserver(document.body, update)

  return {
    update
  }
}

export function getScale() {
  const designWidth = 1920
  const designHeight = 1080
  const width = window.innerWidth
  const height = window.innerHeight
  const scaleX = width / designWidth
  const scaleY = height / designHeight
  return {
    scale: Math.min(scaleX, scaleY),
    designWidth,
    designHeight,
    width,
    height
  }
}
