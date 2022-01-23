<script lang="ts" setup>
import { inject } from 'vue'

interface AppOptionProps {
  value: string | number
  label?: string | number
}

interface SelectedOption {
  value: string | number
  label: string | number
}

const props = defineProps<AppOptionProps>()

const selectValue = inject<(val: SelectedOption) => void>('select-value')

const choose = () => {
  if (selectValue) {
    selectValue({
      value: props.value,
      label: props.label || props.value,
    })
  }
}
</script>

<template>
  <div class="app-option" @click="choose">
    <slot />
  </div>
</template>

<style>
.app-option {
  padding: 16px 24px;
  font-size: 14px;
  cursor: pointer;
}
.app-option:hover {
  background-color: rgb(150 189 233 / 15%);
}
</style>
