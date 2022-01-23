<script lang="ts" setup>
interface AppButtonProps {
  type: 'default' | 'primary' | 'secondary'
  size?: 'normal' | 'large'
  disabled?: boolean
}

const props = withDefaults(defineProps<AppButtonProps>(), {
  type: 'default',
  size: 'normal',
})

interface Emits {
  (e: 'click', event: Event): void
}

const emit = defineEmits<Emits>()

const handleClick = (e: Event): void => {
  if (props.disabled) {
    return
  }

  emit('click', e)
}
</script>

<template>
  <button
    class="app-btn"
    :class="`app-btn--${props.type} app-btn--${props.size} ${
      props.disabled ? 'disabled' : ''
    }`"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style>
.app-btn {
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  border: none;
  cursor: pointer;
}
.app-btn--primary {
  color: #fff;
  background-color: rgb(0, 113, 235);
}
.app-btn--primary:hover {
  background-color: rgb(10, 90, 177);
}
.app-btn--normal {
  padding: 6px 12px;
}
.app-btn--primary {
  padding: 10px 18px;
}
</style>
