import { onUnmounted } from 'vue'

export default function useInterval(
  fn: Function,
  duration: number,
  immediate = false
): void {
  if (duration <= 0) {
    throw new Error('Duration must be greater than 0')
  }

  const timer = setInterval(fn, duration)

  if (immediate) {
    fn()
  }

  onUnmounted(() => {
    clearInterval(timer)
  })
}
