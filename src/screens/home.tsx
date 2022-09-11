import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import {
  Dimensions,
  StyleSheet,
  View,
  LogBox,
  TouchableOpacity
} from 'react-native'

import Header from '../components/header/header'

import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { IItem, IResult, TCalcStatus } from '@/configs/custom-types'
import {
  getFormulaAndResultText,
  getFormulaText,
  getResultText,
  initialFormula,
  initialResult
} from '@/helpers'
import Calculator from '@/components/caculator/Caculator'

import FormText from '@/components/fromText/FormText'

const HomeScreen: React.FC<DrawerContentComponentProps> = ({}) => {
  const [formula, setFormula] = useState(initialFormula)
  const [result, setResult] = useState(initialResult)
  const [status, setStatus] = useState('start')

  const calculatorRef = useRef<any>(null)
  useLayoutEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    console.log(formula, 'formula')
    console.log(getFormulaText(formula), 'getFormulaText(formula)')
  }, [formula])

  return (
    <View style={{ flex: 1 }}>
      <Header nameHeader="STDIO" />
      <View style={styles.container}>
        <View style={styles.containerBox}>
          <View style={styles.screenContainer}>
            <View style={styles.formulaContainer}>
              <View style={styles.formulaContainerBaseLine}>
                <TouchableOpacity onPress={() => {}}>
                  <FormText style={styles.formulaText}>
                    {status === 'calculated'
                      ? getFormulaAndResultText(formula, result)
                      : getFormulaText(formula)}
                  </FormText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.resultContainer}>
              <TouchableOpacity onPress={() => {}}>
                <FormText style={styles.resultText}>
                  {getResultText(result)}
                </FormText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.controlContainer}>
            <Calculator
              type="calculator"
              ref={calculatorRef}
              onChangeFormula={(newFormula: IItem[]) => {
                setFormula([...newFormula])
              }}
              onChangeResult={(newResult: IResult) => {
                setResult(newResult)
              }}
              onChangeStatus={(newStatus: TCalcStatus) => {
                setStatus(newStatus)
              }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
export default HomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#000'
  },
  containerBox: {
    flex: 1,
    height: '100%',
    backgroundColor: '#000'
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10
  },
  latestFormula: {
    width: '100%',
    textAlign: 'right',
    fontSize: 14,
    color: '#fff'
  },
  latestResult: {
    width: '100%',
    textAlign: 'right',
    fontSize: 16,
    color: '#fff'
  },
  screenContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  formulaContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
    alignItems: 'baseline'
  },
  formulaContainerBaseLine: {
    backgroundColor: '#000',
    padding: 10,
    alignSelf: 'flex-end'
  },
  formulaText: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'right'
  },
  resultContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 10
  },
  resultText: {
    color: '#fff',
    fontSize: 36
  },
  controlContainer: {
    flex: 0,
    alignSelf: 'flex-end'
  }
})
