import {
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import Header from '../components/header/header'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import moment from 'moment'
import PickerTime from '@/components/pickerTime/pickerTime'
import { addMoment } from '@/redux/moment'

const SupportScreen = () => {
  const openUrl = () => {
    Linking.openURL('https://wwww.btaskee.com/')
  }
  const momentSlice = useSelector((state: RootState) => state.momentSlice)
  const current = moment.unix(momentSlice.timeData ?? 0)
  const [date, setDate] = useState(moment())
  const [hour, setHour] = useState(0)
  const [min, setMin] = useState(0)
  const dispatch = useDispatch()
  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = moment(selectedDate) || date
    setDate(currentDate)
    dispatch(addMoment(currentDate.unix()))
  }

  return (
    <View style={styles.container}>
      <Header nameHeader="Hỗ trợ" />
      <View style={styles.body}>
        <PickerTime date={date} onChange={onChange} />
        {/* <Text>{current.hour?.() + 2}</Text>
        <Text>{current.minutes?.()}</Text> */}
        <Text style={styles.text}>Bạn cần hỗ trợ? Hãy liên hệ</Text>
        <View style={styles.item}>
          <View style={styles.item1}>
            <Image
              style={styles.stretch}
              source={require('../assets/icon/images.jpeg')}
            />
            <View style={{ paddingRight: 10 }}></View>
            <Text
              style={[
                styles.text,
                {
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 15
                }
              ]}
            >
              Hotline: 1900.636.736
            </Text>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: 'grey'
            }}
          ></View>
          {/* //Item2\\ */}
          <View style={styles.item1}>
            <Image
              style={styles.stretch}
              source={require('../assets/icon/images.jpeg')}
            />
            <View style={{ paddingRight: 10 }}></View>
            <Text
              style={[
                styles.text,
                {
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 15
                }
              ]}
            >
              Email: support@btaskee.com
            </Text>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: 'grey',
              marginRight: 20
            }}
          ></View>
          {/* //item3 */}
          <View style={styles.item1}>
            <Image
              style={styles.stretch}
              source={require('../assets/icon/images.jpeg')}
            />
            <View style={{ paddingRight: 10 }}></View>
            <TouchableOpacity onPress={openUrl}>
              <Text
                style={[
                  styles.text,
                  {
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 15
                  }
                ]}
              >
                Website: https://www.btaskee.com/
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: 'grey',
              marginRight: 20
            }}
          ></View>
        </View>
      </View>
    </View>
  )
}

export default SupportScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    paddingTop: 16,
    paddingLeft: 16
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  item: {},
  item1: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15
  },
  stretch: {
    width: 50,
    height: 50,
    resizeMode: 'cover'
  },
  textStyle: {},
  item2: {
    flexDirection: 'row',

    paddingTop: 25
  }
})
