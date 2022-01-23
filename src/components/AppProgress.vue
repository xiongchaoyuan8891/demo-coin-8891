<script lang="ts" setup>
import { computed } from 'vue'
interface AppProgressProps {
  value: number
  text: string
}

const props = defineProps<AppProgressProps>()

const offset = computed<number>(() => {
  return 300 * (1 - props.value / 100)
})
</script>

<template>
  <div class="progress">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      style="color: #0071eb"
      width="40px"
      height="40px"
    >
      <circle
        cx="50"
        cy="50"
        r="47"
        stroke-width="6"
        fill="none"
        stroke="#c8d2e6"
      ></circle>
      <circle
        cx="50"
        cy="50"
        r="47"
        stroke-width="6"
        fill="none"
        stroke="currentColor"
        stroke-dasharray="300"
        :stroke-dashoffset="offset"
        style="transform-origin: center; transform: rotate(-90deg)"
      ></circle>
      <!-- <polygon
        class="play"
        points="35,30 35,70, 75,50"
        fill="currentColor"
      ></polygon>
      <rect
        class="stop"
        width="40"
        height="40"
        x="30"
        y="30"
        fill="currentColor"
      ></rect> -->
      <text
        class="digits"
        font-size="40"
        fill="#141e37"
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="central"
      >
        {{ props.text }}
      </text>
    </svg>
  </div>
</template>

<style>
.progress {
  font-size: 0;
}
</style>
