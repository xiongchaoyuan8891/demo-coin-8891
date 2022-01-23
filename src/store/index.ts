import _ from 'lodash'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

import { Currency, getRateList, Rate } from '@/service/rate'

export interface State {
  allRates: Rate
  lastUpdatedAt?: Date
  selectedCodes: string[]
  pinned: string
  error?: string
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state() {
    return {
      allRates: {},
      lastUpdatedAt: undefined,
      selectedCodes: [],
      pinned: '',
      error: undefined,
    }
  },
  getters: {
    allRateList(state): Currency[] {
      const results = _.map<string, Currency>(
        _.keys(state.allRates),
        (code: string) => {
          const item = state.allRates[code]

          return _.assign(item, { code })
        }
      )

      return results
    },
    selectedRateList(state): Currency[] {
      const results = _.map<string, Currency>(
        state.selectedCodes,
        (code: string) => {
          const item = state.allRates[code]

          return _.assign(item, { code })
        }
      )

      return results
    },
    unselectedRateList(state): Currency[] {
      const allCodes = _.keys(state.allRates)
      const unselected = _.difference(allCodes, state.selectedCodes)

      const results = _.map<string, Currency>(unselected, (code: string) => {
        const item = state.allRates[code]

        return _.assign(item, { code })
      })

      return results
    },
  },
  mutations: {
    setAllRateList(state, payload: Rate) {
      state.allRates = payload
      state.lastUpdatedAt = new Date()

      if (!state.selectedCodes.length) {
        const defaultSelected = _.slice(_.keys(payload), 0, 3)

        state.selectedCodes = defaultSelected
        state.pinned = defaultSelected[0]
      }
    },
    addSelectedCode(state, code: string) {
      const includes = state.selectedCodes.indexOf(code) !== -1

      if (includes) {
        return
      }

      state.selectedCodes.push(code)

      if (!state.pinned) {
        state.pinned = code
      }
    },
    removeSelectedCode(state, code: string) {
      const index = state.selectedCodes.indexOf(code)

      if (index === -1) {
        return
      }

      state.selectedCodes.splice(index, 1)
    },
    pin(state, code: string) {
      const original = state.pinned

      if (original === code) {
        return
      }

      state.pinned = code

      if (original) {
        const index = state.selectedCodes.indexOf(original)

        state.selectedCodes.splice(index, 1)
        state.selectedCodes.unshift(original)
      }
    },
    setError(state, error: string | undefined) {
      state.error = error
    },
  },
  actions: {
    refreshRateList({ commit }): Promise<Rate> {
      return getRateList().then((response) => {
        commit('setAllRateList', response)

        return response
      })
    },
  },
})

export function useStore() {
  return baseUseStore(key)
}
