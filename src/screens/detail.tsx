import * as React from 'react'
import { View, StyleSheet } from 'react-native'

//
import Header from '../components/header/header'
import { black, bTaskee } from '@/themes/color'

import Calculator from '@/components/caculator/Caculator'
import { useRef, useState } from 'react'
import { ICurrency, IRecordCurrency } from '@/configs/custom-types'
import { initialFormula, initialResult } from '@/helpers'
import { CurrencyAPI } from '@/utils/api/api'
import { CustomStorage } from '@/utils/api/customeStorage'

type TLoadStatus = 'loading' | 'fail' | 'success'

const initialCurrencies: ICurrency[] = [
  {
    code: 'USD',
    currency: '',
    rate: 1,
    icon: ''
  }
]

const CurrencyScreen = () => {
  const [latestRecord, setLatestRecord] = useState<IRecordCurrency | null>(null)

  const [loadStatus, setLoadStatus] = useState<TLoadStatus>('loading')

  const [formula, setFormula] = useState(initialFormula)
  const [result, setResult] = useState(initialResult)
  const [status, setStatus] = useState('start')

  const [srcResult, setSrcResult] = useState(initialResult)
  const [desResult, setDesResult] = useState(initialResult)

  const [currencies, setCurrencies] = useState<ICurrency[]>(initialCurrencies)
  const [srcCurrency, setSrcCurrency] = useState<ICurrency>(
    initialCurrencies[0]
  )
  const [desCurrency, setDesCurrency] = useState<ICurrency>(
    initialCurrencies[0]
  )

  const calculatorRef = useRef<any>(null)

  const getCurrencies = async () => {
    CurrencyAPI.getCurrencies()
      .then(async resp => {
        const newCurrencies = resp.data
        setCurrencies(newCurrencies)
        const srcCode = CustomStorage.CurrencyCode.get('srcCode')
        if (srcCode !== null)
          setSrcCurrency(getCurrencyByCode(newCurrencies, srcCode))
        else {
          setSrcCurrency(newCurrencies[0])
          await CustomStorage.CurrencyCode.set('srcCode', newCurrencies[0].code)
        }
        const desCode = CustomStorage.CurrencyCode.get('desCode')
        if (desCode !== null)
          setDesCurrency(getCurrencyByCode(newCurrencies, desCode))
        else {
          setDesCurrency(newCurrencies[0])
          await CustomStorage.CurrencyCode.set('desCode', newCurrencies[0].code)
        }
        setLoadStatus('success')
      })
      .catch(err => {
        setLoadStatus('fail')
      })
  }

  return (
    <View style={{ flex: 1 }}>
      <Header nameHeader="Chuyển đổi ngoại tệ" />
    </View>
  )
}
export default CurrencyScreen

const styles = StyleSheet.create({
  viewBox: {
    marginTop: 20,

    paddingVertical: 'auto',
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: bTaskee,
    shadowOpacity: 4,
    shadowRadius: 2,
    shadowOffset: {
      height: 0.5,
      width: 0.3
    },
    borderRightColor: bTaskee,
    borderEndColor: bTaskee,
    width: 'auto'
  },
  firstViewBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemFirstViewBox: {
    flexDirection: 'column'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: black
  },
  subText: {
    fontSize: 14,
    color: '#a19f9f'
  },
  body: {
    marginLeft: 15,
    marginRight: 15
  },
  button: {
    backgroundColor: '#faa364',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    paddingTop: 7,
    paddingLeft: 15,
    paddingRight: 15,
    height: 35
  },
  lineBox: {
    height: 1,
    backgroundColor: '#969696',
    alignSelf: 'stretch',
    marginTop: 10
  },
  contentText: {
    fontSize: 16,
    marginLeft: 10,
    textAlign: 'center',
    color: '#3b3b3b'
  },
  flexItem: {
    flexDirection: 'column',
    marginLeft: 15,
    marginTop: 15
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button1: {
    backgroundColor: '#f5c7ff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#787a79',
    paddingTop: 7,
    paddingLeft: 15,
    paddingRight: 15,
    height: 35
  },
  button2: {
    backgroundColor: '#98eba8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#787a79',
    paddingTop: 7,
    paddingLeft: 15,
    paddingRight: 15,
    height: 35
  }
})
