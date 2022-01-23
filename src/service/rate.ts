import _ from 'lodash'

import request from './request'

export interface Currency {
  code: string
  name: string
  type: string
  unit: string
  value: number
  trending: number
}

export interface Rate {
  [index: string]: Currency
}

interface GetRateListResponse {
  rates: Rate
}

const randomTrending = (): number => {
  return parseFloat((Math.random() * 10 - 5).toFixed(2))
}

export function getRateList(): Promise<Rate> {
  return request
    .get<GetRateListResponse>('/exchange_rates')
    .then((response) => {
      return _.mapValues(response.data.rates, (item: Currency) => {
        return {
          ...item,
          trending: randomTrending(),
        }
      })
    })
}
