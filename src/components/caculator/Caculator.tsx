import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useLayoutEffect,
  useState
} from 'react'

import {
  IButton,
  IItem,
  IResult,
  TCalcStatus,
  TCalculator
} from '@/configs/custom-types'
import { filter, isEqual } from 'lodash'
import {
  getKeyboard,
  initialFormula,
  initialResult,
  getFormulaText,
  isNumericC
} from '@/helpers'

import { evaluate } from 'mathjs'
import { Symbols } from '@/utils/constants'

interface IProps {
  type: TCalculator
  onChangeFormula: (formula: IItem[]) => void
  onChangeResult: (result: IResult) => void
  onChangeStatus: (status: TCalcStatus) => void
  onRecord?: (formula: IItem[], result: IResult) => Promise<void>
}
const Calculator: ForwardRefRenderFunction<unknown, IProps> = (
  {
    type = 'calculator',
    onChangeFormula = () => {},
    onChangeResult = () => {},
    onChangeStatus = () => {}
    // onRecord = (formula, result) => {}
  },
  ref
) => {
  const keyboard = getKeyboard(type, styles)

  const [formula, setFormula] = useState(initialFormula)
  const [result, setResult] = useState(initialResult)
  const [status, setStatus] = useState<TCalcStatus>('start')

  useImperativeHandle(ref, () => ({
    initCalculator: (
      newFormula: IItem[],
      newResult: IResult,
      newStatus: TCalcStatus
    ) => {
      setFormula([...newFormula])
      setResult(newResult)
      setStatus(newStatus)
    }
  }))

  useLayoutEffect(() => {
    onChangeFormula(formula)
  }, [formula])

  useLayoutEffect(() => {
    onChangeResult(result)
  }, [result])

  useLayoutEffect(() => {
    onChangeStatus(status)
  }, [status])

  const performAllClear = () => {
    setFormula(initialFormula)
    setResult(initialResult)
    setStatus('start')
  }

  const performCalculate = () => {
    if (isEqual(status, 'inputing')) {
      let newFormula = [...formula]
      let newResult: IResult = initialResult

      const newItemValues = newFormula.map((item: IItem) => item.value)

      try {
        newResult = {
          value: evaluate(newItemValues.join('')),
          status: 'good'
        }

        if (newResult.value === Infinity || newResult.value === -Infinity) {
          newResult = {
            value: 0,
            status: 'infinity'
          }
        }
      } catch (e) {
        newResult = { value: 0, status: 'error' }
      } finally {
        setResult(newResult)
        setStatus('calculated')

        if (newResult.status === 'good') {
          // onRecord(newFormula, newResult)
        }
      }
      return
    }

    if (isEqual(status, 'calculated')) {
      if (result.status === 'good') {
        setFormula([
          {
            symbol: result.value,
            value: String(result.value),
            type: 'number'
          }
        ])

        setResult(initialResult)
        setStatus('inputing')
      }
    }
  }

  const performBackspace = () => {
    if (isEqual(status, 'inputing')) {
      let newFormula = [...formula]
      const latestItem = newFormula[newFormula.length - 1]

      if (
        ['minusSign', 'percent', 'operator', 'bracket'].includes(
          latestItem.type
        )
      ) {
        newFormula.pop()
      } else if (latestItem.type === 'number') {
        const newValue = latestItem.value.slice(0, -1)

        if (newValue === '') newFormula.pop()
        else if (newValue === '-') {
          newFormula[newFormula.length - 1] = {
            symbol: Symbols.minusSign.symbol,
            value: Symbols.minusSign.value,
            type: 'minusSign'
          }
        } else {
          newFormula[newFormula.length - 1] = {
            symbol: newValue,
            value: newValue,
            type: 'number'
          }
        }
      }

      if (newFormula.length === 0) {
        performAllClear()
      } else {
        setFormula(newFormula)
      }
    }

    if (isEqual(status, 'calculated')) {
      setStatus('inputing')
      return
    }
  }

  const performOpposite = () => {
    if (isEqual(status, 'inputing')) {
      let newFormula = [...formula]
      const latestItem = newFormula[newFormula.length - 1]

      if (latestItem.type === 'number') {
        const value = evaluate('-' + latestItem.value)
        newFormula[newFormula.length - 1] = {
          symbol: String(value),
          value: String(value),
          type: 'number'
        }
      } else if (latestItem.type === 'operator') {
        newFormula.push({
          symbol: Symbols.minusSign.symbol,
          value: Symbols.minusSign.value,
          type: 'minusSign'
        })
      } else if (latestItem.type === 'minusSign') {
        newFormula.pop()
      }

      setFormula(newFormula)
      return
    }

    if (isEqual(status, 'calculated')) {
      if (result.status === 'good') {
        const newValue = evaluate(`-${result.value}`)

        setFormula([
          {
            symbol: newValue,
            value: newValue,
            type: 'number'
          }
        ])
        setStatus('inputing')
      }
      return
    }
  }

  const pressNumber = (button: IButton) => {
    if (status === 'start') {
      if (button.value === '0') return

      setFormula([
        {
          symbol: button.symbol,
          value: button.value,
          type: 'number'
        }
      ])
      setResult(initialResult)
      setStatus('inputing')
      return
    }

    if (status === 'inputing') {
      let newFormula = [...formula]
      const latestItem = newFormula[newFormula.length - 1]

      if (latestItem.type === 'percent') {
      } else if (latestItem.type === 'bracket') {
        if (latestItem.value === '(')
          newFormula.push({
            symbol: button.symbol,
            value: button.value,
            type: 'number'
          })
      } else if (latestItem.type !== 'operator') {
        if (isNumericC(`${latestItem.value}${button.value}`)) {
          const newValue = `${latestItem.value}${button.value}`

          newFormula[newFormula.length - 1] = {
            symbol: newValue,
            value: newValue,
            type: 'number'
          }
        }
      } else {
        newFormula.push({
          symbol: button.symbol,
          value: button.value,
          type: 'number'
        })
      }

      setFormula(newFormula)
      return
    }

    if (status === 'calculated') {
      if (result.status === 'good') {
        setFormula([
          {
            symbol: button.symbol,
            value: button.value,
            type: 'number'
          }
        ])
      } else if (result.status === 'error' || result.status === 'infinity') {
        setFormula([
          {
            symbol: button.symbol,
            value: button.value,
            type: 'number'
          }
        ])
        setResult(initialResult)
      }
      setStatus('inputing')
      return
    }
  }

  const pressOperator = (button: IButton) => {
    if (isEqual(status, 'inputing')) {
      let newFormula = [...formula]
      const latestItem = newFormula[newFormula.length - 1]

      if (latestItem.type === 'operator') {
        newFormula[newFormula.length - 1] = {
          symbol: button.symbol,
          value: button.value,
          type: 'operator'
        }

        setFormula(newFormula)
        return
      }

      if (latestItem.type === 'bracket') {
        if (latestItem.value === '(') return
      }

      newFormula.push({
        symbol: button.symbol,
        value: button.value,
        type: 'operator'
      })

      setFormula(newFormula)
      return
    }

    if (isEqual(status, 'calculated')) {
      if (result.status === 'good') {
        setFormula([
          {
            symbol: result.value,
            value: String(result.value),
            type: 'number'
          },
          {
            symbol: button.symbol,
            value: button.value,
            type: 'operator'
          }
        ])
      } else if (result.status === 'error' || result.status === 'infinity') {
        setFormula([
          {
            symbol: '0',
            value: '0',
            type: 'number'
          },
          {
            symbol: button.symbol,
            value: button.value,
            type: 'operator'
          }
        ])
        setResult({ value: 0, status: 'good' })
      }
      setStatus('inputing')
      return
    }
  }

  const pressDot = (button: IButton) => {
    if (status === 'start') {
      setFormula([
        {
          symbol: '0.',
          value: '0.',
          type: 'number'
        }
      ])
      setStatus('inputing')
      return
    }

    if (status === 'inputing') {
      let newFormula = [...formula]
      const latestItem = newFormula[newFormula.length - 1]

      if (isNumericC(`${latestItem.value}${button.value}`)) {
        const updatedValue = `${latestItem.value}${button.value}`

        newFormula[newFormula.length - 1] = {
          symbol: updatedValue,
          value: updatedValue,
          type: 'number'
        }

        setFormula(newFormula)
      }
      return
    }
  }

  const pressPercent = (button: IButton) => {
    if (isEqual(status, 'inputing')) {
      let newFormula = [...formula]
      const latestItem = newFormula[newFormula.length - 1]

      if (
        latestItem.type === 'number' ||
        latestItem.type === 'percent' ||
        (latestItem.type === 'bracket' && latestItem.value === ')')
      ) {
        newFormula.push({
          symbol: Symbols.percent.symbol,
          value: Symbols.percent.value,
          type: 'percent'
        })

        setFormula(newFormula)
        return
      }
    }

    if (isEqual(status, 'calculated')) {
      if (result.status === 'good') {
        setFormula([
          {
            symbol: result.value,
            value: String(result.value),
            type: 'number'
          },
          {
            symbol: button.symbol,
            value: button.value,
            type: 'percent'
          }
        ])
      }
      setStatus('inputing')
      return
    }
  }

  const pressBracket = (button: IButton) => {
    if (status === 'start') {
      if (button.value === ')') return
      setFormula([
        {
          symbol: button.symbol,
          value: button.value,
          type: 'bracket'
        }
      ])
      setStatus('inputing')
      return
    }

    if (status === 'inputing') {
      let newFormula = [...formula]
      const latestItem = newFormula[newFormula.length - 1]

      if (button.value === '(') {
        if (latestItem.type === 'operator' || latestItem.type === 'bracket') {
          newFormula.push({
            symbol: button.symbol,
            value: button.value,
            type: 'bracket'
          })
        }
      } else {
        if (latestItem.type === 'number' || latestItem.type === 'percent') {
          const openBracketCount = filter(formula, item => {
            if (item.value === '(') return item
          }).length

          const closeBracketCount = filter(formula, item => {
            if (item.value === ')') return item
          }).length

          if (openBracketCount > closeBracketCount) {
            newFormula.push({
              symbol: button.symbol,
              value: button.value,
              type: 'bracket'
            })
          }
        }
      }

      setFormula(newFormula)
      return
    }
  }

  const onPress = (button: IButton) => {
    if (
      ['number', 'percent', 'dot', 'bracket', 'opposite', 'operator'].includes(
        String(button.type)
      )
    ) {
      const LIMIT = {
        calculator: 3 * 30,
        currency: 1 * 30
      }

      if (getFormulaText(formula).length > LIMIT[type]) return
    }

    if (button.type === 'number') pressNumber(button)
    else if (button.type === 'dot') pressDot(button)
    else if (button.type === 'bracket') pressBracket(button)
    else if (button.type === 'operator') pressOperator(button)
    else if (button.type === 'percent') pressPercent(button)
    else if (button.type === 'opposite') performOpposite()
    else if (button.type === 'ac') performAllClear()
    else if (button.type === 'backspace') performBackspace()
    else if (button.type === 'equal') performCalculate()
  }

  return (
    <View style={styles.controlContainer}>
      {keyboard.map((buttons, rI) => (
        <View style={styles.row} key={rI}>
          {buttons.map((button, cI) => {
            return (
              <View
                style={[styles.buttonContainer, button.containerStyle]}
                key={cI}
              >
                <TouchableHighlight
                  style={[styles.buttonContent, button.contentStyle]}
                  onPress={() => {
                    onPress(button)
                  }}
                  underlayColor="rgba(255, 255, 255, 0.4)"
                >
                  <Text style={styles.buttonText}>{button.symbol}</Text>
                </TouchableHighlight>
              </View>
            )
          })}
        </View>
      ))}
    </View>
  )
}

export default forwardRef(Calculator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#000'
  },
  controlContainer: {
    flex: 0,
    alignSelf: 'flex-end'
  },
  row: {
    width: '100%',
    flexDirection: 'row'
  },
  buttonContainer: {
    width: '25%',
    aspectRatio: 100 / 50,
    justifyContent: 'center',
    padding: 1
  },
  buttonContainerHalf: {
    width: '12.5%',
    aspectRatio: 100 / 100
  },
  buttonContent: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 30
  },
  buttonContentControl: { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
  buttonContentMain: { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
  buttonContentEqual: { backgroundColor: '#ff6600' }
})
