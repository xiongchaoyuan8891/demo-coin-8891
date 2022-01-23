import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from './AppButton.vue'

test('displays primary button', () => {
  const wrapper = mount(AppButton, {
    props: {
      type: 'primary',
    },
  })

  expect(wrapper.find('.app-btn--primary').exists()).toBe(true)
})

test('displays large button', () => {
  const wrapper = mount(AppButton, {
    props: {
      type: 'primary',
      size: 'large',
    },
  })

  expect(wrapper.find('.app-btn--large').exists()).toBe(true)
})

test('emits an event when clicked', async () => {
  const wrapper = mount({
    template: `<div><span>Times clicked: {{ count }}</span><app-button @click="handleClick" /></div>`,
    components: {
      AppButton,
    },
    data() {
      return {
        count: 0,
      }
    },
    methods: {
      handleClick() {
        this.count += 1
      },
    },
  })

  await wrapper.find('button').trigger('click')

  expect(wrapper.text()).toContain('Times clicked: 1')
})
