<script lang="ts" setup>
import { ref, onMounted, provide } from 'vue'
import useOutClick from '@/compositions/use-outclick'

interface AppSelectProps {
  placeholder?: string
  autoFocus?: boolean
}

const props = withDefaults(defineProps<AppSelectProps>(), {
  placeholder: '',
  autoFocus: false,
})

interface Emits {
  (e: 'change', value: string | number): void
  (e: 'search', value: string): void
}

const emit = defineEmits<Emits>()

// Handle auto focus
const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (props.autoFocus && inputRef.value) {
    inputRef.value.focus()
  }
})

// Control the visibility of the select body
const isFocused = ref<boolean>(false)

const setFocus = () => {
  isFocused.value = true
}

useOutClick(() => {
  isFocused.value = false
})

// Handle search with keyword
const search = (e: Event): void => {
  const { value } = e.target as HTMLInputElement

  emit('search', value)
}

// Clear the keyword
const clear = (): void => {
  emit('search', '')

  if (inputRef.value) {
    inputRef.value.value = ''
  }
}

interface SelectedOption {
  value: string | number
  label: string | number
}

const selectValue = (value: SelectedOption): void => {
  emit('change', value.value)

  if (inputRef.value) {
    inputRef.value.value = `${value.label}`
  }

  isFocused.value = false
}

provide<(val: SelectedOption) => void>('select-value', selectValue)
</script>

<template>
  <div
    class="app-select"
    :class="{
      'app-select--focus': isFocused,
    }"
    @click.stop
  >
    <div class="app-select__ipt">
      <input
        ref="inputRef"
        type="text"
        :placeholder="props.placeholder"
        @focus="setFocus"
        @input="search"
      />
      <div class="app-select__close" @click="clear">&times;</div>
    </div>
    <div class="app-select__body">
      <slot />
    </div>
  </div>
</template>

<style>
.app-select {
  position: relative;
}
.app-select__ipt {
  position: relative;
  z-index: 1;
}
.app-select__ipt input {
  padding: 12px 16px;
  padding-right: 38px;
  border: 2px solid rgb(221, 221, 221);
  border-radius: 6px;
  outline: none;
  font-size: 16px;
  font-weight: 500;
}
.app-select--focus .app-select__ipt input {
  border-color: rgb(0, 113, 235);
}
.app-select__close {
  position: absolute;
  top: 0;
  right: 6px;
  display: none;
  padding: 7px;
  font-size: 24px;
  cursor: pointer;
}
.app-select__body {
  position: absolute;
  top: 50px;
  left: 0;
  display: none;
  width: 100%;
  max-height: 200px;
  overflow: auto;
  border-radius: 6px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
}
.app-select--focus .app-select__close,
.app-select--focus .app-select__body {
  display: block;
}
</style>
