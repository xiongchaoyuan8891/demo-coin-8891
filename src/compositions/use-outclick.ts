import { onBeforeUnmount, onMounted } from 'vue'

type Listener = <K extends keyof HTMLElementEventMap>(
  this: HTMLElement,
  ev: HTMLElementEventMap[K]
) => any

export default function useOutClick(fn: Listener): void {
  onMounted(() => {
    document.body.addEventListener('click', fn)
  })

  onBeforeUnmount(() => {
    document.body.removeEventListener('click', fn)
  })
}
