<script lang="ts" setup>
import { computed } from 'vue'
import Flag from '@/components/Flag.vue'
import trashIcon from '@/assets/trash.svg?raw'
import { useStore } from '@/store'
import { Currency } from '@/service/rate'

import AppButton from './AppButton.vue'

interface RelativeCurrency extends Currency {
  relative: string
}

const store = useStore()

// Render selected currency list
const pinned = computed<string>(() => store.state.pinned)
const pinnedCurrency = computed<Currency | undefined>(() => {
  const { pinned } = store.state

  return store.state.allRates[pinned]
})
const baseRate = computed<number>(() =>
  pinnedCurrency.value ? pinnedCurrency.value.value : 0
)
const selectedRateList = computed<RelativeCurrency[]>(() => {
  const unPinnedCodeList: RelativeCurrency[] = store.getters.selectedRateList
    .filter((item: Currency): boolean => item.code !== pinned.value)
    .map((item: Currency): RelativeCurrency => {
      const relativeValue = baseRate.value
        ? item.value / baseRate.value
        : item.value
      let relative = relativeValue.toFixed(4)

      if (parseFloat(relative) <= 0) {
        relative = '0.0001'
      }

      return {
        ...item,
        relative,
      }
    })
  const result: RelativeCurrency[] = []

  if (pinnedCurrency.value) {
    result.push({
      ...pinnedCurrency.value,
      relative: '1',
    })
  }

  result.push(...unPinnedCodeList)

  return result
})

// Pin special currency
const pin = (code: string): void => {
  store.commit('pin', code)
}

const remove = (code: string): void => {
  store.commit('removeSelectedCode', code)
}
</script>

<template>
  <div class="rate-table">
    <div class="rate-table__heading">
      <div class="rate-table__label">{{ $t('coin') }}</div>
      <div class="rate-table__label">{{ $t('amount') }}</div>
      <div class="rate-table__label">{{ $t('change') }}</div>
      <div class="rate-table__label">{{ $t('action') }}</div>
    </div>
    <div class="rate-table__body">
      <img
        v-show="selectedRateList.length === 0"
        class="rate-table__empty"
        src="@/assets/empty-status.jpg"
        alt=""
      />
      <transition-group name="rate-table-list">
        <div
          class="rate-table__row"
          v-for="item in selectedRateList"
          :key="item.code"
          :class="{
            pinned: item.code === pinned,
          }"
        >
          <div
            class="rate-table__value"
            :class="{
              'rate-table__name': item.code !== pinned,
            }"
            @click="pin(item.code)"
          >
            <div class="rate-table__flag">
              <flag :type="item.code" />
            </div>
            <span class="rate-table__full-name">{{ item.name }}</span>
            <span class="rate-table__short-name">{{
              item.code.toUpperCase()
            }}</span>
          </div>
          <div class="rate-table__value rate-table__rate">
            {{ item.relative }}
          </div>
          <div
            :class="`rate-table__value ${
              item.trending > 0
                ? 'rate-table__value--up'
                : 'rate-table__value--down'
            }`"
          >
            {{ item.code === pinned ? '' : `${item.trending.toFixed(2)}%` }}
          </div>
          <div class="rate-table__value">
            <app-button
              type="primary"
              v-show="item.code !== pinned"
              @click="remove(item.code)"
              >{{ $t('remove') }}</app-button
            >
            <span
              class="rate-table__trash"
              v-show="item.code !== pinned"
              @click="remove(item.code)"
              v-html="trashIcon"
            ></span>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style>
.rate-table__heading {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  margin-bottom: 16px;
}
.rate-table__label {
  width: 25%;
  padding: 0 16px;
  font-size: 18px;
  font-weight: 600;
  text-align: right;
  color: rgb(20, 30, 55);
}
.rate-table__label:first-child {
  text-align: left;
}
.rate-table__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  border-bottom: 1px solid rgb(240, 245, 250);
  color: rgb(20, 30, 55);
  transition: transform 1s ease 0s;
}
.rate-table__row.pinned {
  position: relative;
  z-index: 2;
  color: #fff;
  border-radius: 8px;
  background-color: rgb(10, 20, 110);
}
.rate-table__empty {
  display: block;
  width: 500px;
  margin: 0 auto;
  border-radius: 8px;
}
.rate-table__value {
  width: 25%;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  text-align: right;
}
.rate-table__value:first-child {
  display: flex;
  align-items: center;
  text-align: left;
}
.rate-table__value--up {
  color: rgb(38, 171, 44);
}
.rate-table__value--down {
  color: rgb(179, 0, 33);
}
.rate-table__name {
  border-radius: 8px;
  cursor: pointer;
}
.rate-table__name:hover {
  background-color: rgba(0, 111, 232, 0.15);
}
.rate-table__flag {
  margin-right: 8px;
}
.rate-table__short-name {
  display: none;
}
@media (max-width: 640px) {
  .rate-table__full-name {
    display: none;
  }
  .rate-table__short-name {
    display: inline;
  }
}
.rate-table__row.pinned .rate-table__rate {
  position: relative;
}
.rate-table__row.pinned .rate-table__rate:after {
  position: absolute;
  right: 10px;
  bottom: -33px;
  display: block;
  width: 0;
  height: 0;
  content: '';
  border: 10px solid transparent;
  border-top-color: rgb(10, 20, 110);
}
.rate-table-list-enter-active,
.rate-table-list-leave-active {
  transition: opacity 0.6s ease, height 0.6s ease;
}
.rate-table-list-enter-from,
.rate-table-list-leave-to {
  opacity: 0;
  height: 0;
}
.rate-table-list-move {
  transition: transform 1s ease;
}
.rate-table__trash {
  display: none;
}

@media (max-width: 768px) {
  .rate-table__empty {
    width: 100%;
  }
  .rate-table__label:nth-child(3),
  .rate-table__value:nth-child(3) {
    display: none;
  }

  .rate-table__value .app-btn {
    display: none;
  }
  .rate-table__trash {
    display: inline-block;
  }
}
</style>
