import { IRecordCalculator, IRecordCurrency } from '@/configs/custom-types'
import { isEqual } from 'lodash'

import { Storage } from './storage'

const USE_COUNT = 'USE_COUNT'

const RECENTLY_CURRENCY_CODES = 'recentlyCurrencyCode'
type CURRENCY_CODE = 'srcCode' | 'desCode'

export type TRecord = 'calculator' | 'currency'

export const CustomStorage = {
  CurrencyCode: {
    get: (key: CURRENCY_CODE) => {
      try {
        return Storage.getItemSync<string>(key)
      } catch (e) {
        return null
      }
    },
    set: async (key: CURRENCY_CODE, code: string) => {
      try {
        await Storage.setItemAsync(key, code)
      } catch (e) {}
    }
  },
  RecentlyCurrencyCodes: {
    get: () => {
      let codes: any

      try {
        codes = Storage.getItemSync(RECENTLY_CURRENCY_CODES)
        codes = codes === null ? [] : JSON.parse(codes)
      } catch (e) {
        codes = []
      }

      return codes
    },
    update: async () => {
      try {
        let codes: any = Storage.getItemSync(RECENTLY_CURRENCY_CODES)
        codes = codes === null ? [] : JSON.parse(codes)

        const srcCode = CustomStorage.CurrencyCode.get('srcCode')
        const desCode = CustomStorage.CurrencyCode.get('desCode')

        let newCodes: any = codes.filter((c: string) => {
          return c !== srcCode && c !== desCode
        })

        if (newCodes.length >= 4) newCodes.pop()

        if (srcCode === desCode) {
          if (srcCode !== null) newCodes.unshift(srcCode)
        } else {
          if (srcCode !== null) newCodes.unshift(srcCode)
          if (desCode !== null) newCodes.unshift(desCode)
        }

        await Storage.setItemAsync(
          RECENTLY_CURRENCY_CODES,
          JSON.stringify(newCodes)
        )
      } catch (e) {}
    }
  },
  History: {
    get: (recordType: TRecord) => {
      let records: IRecordCalculator[] | IRecordCurrency[] | null

      try {
        records = Storage.getItemSync<IRecordCalculator[] | IRecordCurrency[]>(
          recordType
        )
        if (records === null) records = []
      } catch (e) {
        records = []
      }

      return records
    },
    getAt: (recordType: TRecord, index: number) => {
      const records = CustomStorage.History.get(recordType)

      if (index >= records.length) return null
      return records[index]
    },
    updateOrInsert: async (
      recordType: TRecord,
      record: IRecordCalculator | IRecordCurrency
    ) => {
      try {
        if (recordType === 'calculator') {
          let records = CustomStorage.History.get(
            recordType
          ) as IRecordCalculator[]

          let newRecords = records.filter(
            r => !isEqual(r.formula, record.formula)
          )
          newRecords.unshift(record as IRecordCalculator)

          await Storage.setItemAsync(recordType, newRecords)
        } else if (recordType === 'currency') {
          let records = CustomStorage.History.get(
            recordType
          ) as IRecordCurrency[]

          let newRecords = records.filter(
            r => !isEqual(r.formula, record.formula)
          )
          newRecords.unshift(record as IRecordCurrency)

          await Storage.setItemAsync(recordType, newRecords)
        }
      } catch (e) {}
    },
    remove: async (key: TRecord) => {
      try {
        await Storage.removeItemAsync(key)
      } catch (e) {}
    }
  },
  UseCount: {
    get: (): number => {
      let useCount: number | null = 0

      try {
        useCount = Storage.getItemSync<number | null>(USE_COUNT)
        if (useCount !== null) useCount
        return 0
      } catch (e) {
        return 0
      }
    },
    increase: async () => {
      let useCount = CustomStorage.UseCount.get()

      try {
        useCount++
        await Storage.setItemAsync<number>(USE_COUNT, useCount)
      } catch (e) {}
    }
  }
}
