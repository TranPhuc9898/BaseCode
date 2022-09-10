import { IButton, IItem, IResult, TCalculator } from '@/configs/custom-types'
import moment from 'moment'
import { Symbols } from '../utils/constants/index'

const commaNumber = require('comma-number')

import { floor, format, round } from 'mathjs'

export function currencyFormat(num: number) {
  if (num === undefined) {
    return null
  }

  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + 'VND'
}

// export function forrmatDay(data: Array<[]>) {
//   for (let i = 0; i <= 6; i++) {
//     let b = moment().add(i, 'days').toDate()
//   }
// }

export const getWeekDays = () => {
  const final = []
  for (let i = 0; i < 7; i++) {
    let b = moment().add(i, 'days').toDate()
    final.push(b)
  }
  return final
}

export const formatLetter = (data: string) => {
  if (data == null) return 'Nothing'
  const a: string = data.split('')
  console.log(a[1], 'a[1]')
  if (a[0] === 'T') {
    const b: string = a[0].replace('T', 'Thứ')
    return b + ' ' + a[1]
  }
  data === 'CN'
  const c: string = data.replace('CN', 'Chủ nhật')
  return c
}

export const getKeyboard = (type: TCalculator, styles: any): IButton[][] => {
  if (type === 'calculator') {
    return [
      [
        {
          symbol: 'AC',
          value: 'ac',
          type: 'ac',
          containerStyle: {},
          contentStyle: styles.buttonContentControl
        },
        {
          symbol: Symbols.leftArrow.symbol,
          value: Symbols.leftArrow.value,
          type: 'backspace',
          containerStyle: {},
          contentStyle: styles.buttonContentControl
        },
        {
          symbol: Symbols.percent.symbol,
          value: Symbols.percent.value,
          type: 'percent',
          containerStyle: styles.buttonContainerHalf,
          contentStyle: styles.buttonContentControl
        },
        {
          symbol: Symbols.plusMinus.symbol,
          value: Symbols.plusMinus.value,
          type: 'opposite',
          containerStyle: styles.buttonContainerHalf,
          contentStyle: styles.buttonContentControl
        },
        {
          symbol: Symbols.division.symbol,
          value: '/',
          type: 'operator',
          containerStyle: {},
          contentStyle: styles.buttonContentMain
        }
      ],
      [
        {
          symbol: '7',
          value: '7',
          type: 'number',
          containerStyle: {},
          contentStyle: {}
        },
        {
          symbol: '8',
          value: '8',
          type: 'number',
          containerStyle: {},
          contentStyle: {}
        },
        {
          symbol: '9',
          value: '9',
          type: 'number',
          containerStyle: {},
          contentStyle: {}
        },
        {
          symbol: Symbols.multiplication.symbol,
          value: Symbols.multiplication.value,
          type: 'operator',
          containerStyle: {},
          contentStyle: styles.buttonContentMain
        }
      ],
      [
        {
          symbol: '4',
          value: '4',
          type: 'number',
          containerStyle: {},
          contentStyle: {}
        },
        {
          symbol: '5',
          value: '5',
          type: 'number',
          containerStyle: {},
          contentStyle: {}
        },
        {
          symbol: '6',
          value: '6',
          type: 'number',
          containerStyle: {},
          contentStyle: {}
        },
        {
          symbol: Symbols.minus.symbol,
          value: Symbols.minus.value,
          type: 'operator',
          containerStyle: {},
          contentStyle: styles.buttonContentMain
        }
      ],
      [
        {
          symbol: '1',
          value: '1',
          type: 'number',
          containerStyle: {},
          contentStyle: {}
        },
        {
          symbol: '2',
          value: '2',
          type: 'number',
          containerStyle: {},
          contentStyle: {}
        },
        {
          symbol: '3',
          value: '3',
          type: 'number',
          containerStyle: {},
          contentStyle: {}
        },
        {
          symbol: Symbols.plus.symbol,
          value: '+',
          type: 'operator',
          containerStyle: {},
          contentStyle: styles.buttonContentMain
        }
      ],
      [
        {
          symbol: '0',
          value: '0',
          type: 'number',
          containerStyle: {},
          contentStyle: {}
        },
        {
          symbol: '.',
          value: '.',
          type: 'dot',
          containerStyle: {},
          contentStyle: {}
        },
        {
          symbol: '(',
          value: '(',
          type: 'bracket',
          containerStyle: styles.buttonContainerHalf,
          contentStyle: {}
        },
        {
          symbol: ')',
          value: ')',
          type: 'bracket',
          containerStyle: styles.buttonContainerHalf,
          contentStyle: {}
        },
        {
          symbol: Symbols.equal.symbol,
          value: '=',
          type: 'equal',
          containerStyle: {},
          contentStyle: styles.buttonContentEqual
        }
      ]
    ]
  } else if (type === 'currency') return [[]]
  else return []
}

export const initialFormula: IItem[] = [
  {
    symbol: '0',
    value: '0',
    type: 'number'
  }
]

export const initialResult: IResult = {
  value: 0,
  status: 'good'
}
export const commaNumberC = (value: number | string) => {
  const valueText = String(value)

  if (valueText.indexOf('e') > 0) return valueText

  try {
    return commaNumber(value, ',', '.')
  } catch (e) {
    return value
  }
}

export const getFormulaText = (items: IItem[]): string => {
  let formulaText = ''

  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i].type === 'number')
      formulaText = commaNumberC(items[i].value) + formulaText
    else formulaText = items[i].symbol + formulaText

    if (i > 0) {
      if (items[i].type === 'bracket' && items[i].value === ')') {
      } else if (
        items[i - 1].type === 'bracket' &&
        items[i - 1].value === '('
      ) {
      } else if (items[i].type !== 'percent') {
        formulaText = ' ' + formulaText
      }
    }
  }

  return formulaText
}

export const isNumericC = (text: any) => {
  return isNaN(Number(text)) === false
}
export const roundValueC = (value: any) => {
  try {
    const MAX_LENGTH = 14

    let newValue: any = Number(value)
    const leftValueLength = String(floor(newValue)).length
    const rightValueLength = Math.max(MAX_LENGTH - leftValueLength, 0)

    newValue = round(newValue, rightValueLength)
    if (leftValueLength > MAX_LENGTH) newValue = format(newValue, MAX_LENGTH)

    return commaNumberC(newValue)
  } catch (e) {
    return value
  }
}
export const getResultText = (result: IResult): string => {
  let resultText = ''

  if (result.status === 'infinity') resultText = Symbols.infinity.symbol
  else if (result.status === 'error') resultText = 'Error'
  else resultText = roundValueC(result.value)

  return resultText
}

export const getFormulaAndResultText = (items: IItem[], result: IResult) => {
  return getFormulaText(items) + ' = ' + getResultText(result)
}
