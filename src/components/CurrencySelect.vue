<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from '@/store'
import AppSelect from '@/components/AppSelect.vue'
import AppOption from '@/components/AppOption.vue'
import Flag from '@/components/Flag.vue'
import useOutClick from '@/compositions/use-outclick'
import { Currency } from '@/service/rate'

interface CurrencySelectProps {
  visible: boolean
}

const props = defineProps<CurrencySelectProps>()

interface Emits {
  (e: 'update:visible', value: boolean): void
}

const emit = defineEmits<Emits>()

const store = useStore()

useOutClick(() => {
  emit('update:visible', false)
})

const keyword = ref<string>('')

// Render options with all unselected currency list
const unselectedRateList = computed<Currency[]>(
  () => store.getters.unselectedRateList
)
const selectableRateList = computed<Currency[]>(() => {
  return unselectedRateList.value.filter((item): boolean => {
    return item.name.toLowerCase().indexOf(keyword.value.toLowerCase()) !== -1
  })
})

const search = (value: string): void => {
  keyword.value = value
}

const change = (value: string | number): void => {
  store.commit('addSelectedCode', value)
  emit('update:visible', false)
}
</script>

<template>
  <div class="select-currency" v-if="props.visible">
    <app-select
      placeholder="Type to search..."
      auto-focus
      @search="search"
      @change="change"
    >
      <app-option
        v-for="item in selectableRateList"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      >
        <div class="currency-option">
          <div class="currency-option__flag">
            <flag :type="item.code" />
          </div>
          <span class="currency-option__text">{{ item.name }}</span>
        </div>
      </app-option>
    </app-select>
  </div>
</template>

<style>
.select-currency {
  position: absolute;
  left: 0;
  top: 0;
}
.currency-option {
  display: flex;
  align-items: center;
}
.currency-option__flag {
  margin-right: 8px;
}
</style>
