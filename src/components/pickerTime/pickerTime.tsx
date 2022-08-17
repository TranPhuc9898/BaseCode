import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Moment } from 'moment'
import { SafeAreaView } from 'react-native-safe-area-context'

import RNDateTimePicker, {
  DateTimePickerEvent
} from '@react-native-community/datetimepicker'

interface IPickerTime {
  date?: any
  onChange?: (event: DateTimePickerEvent) => void
}
const PickerTime: React.FC<IPickerTime> = ({ date, onChange }) => {
  useEffect(() => {}, [date])
  return (
    <View>
      <RNDateTimePicker
        style={{
          width: 100
        }}
        testID="dateTimePicker"
        value={date.toDate()}
        timeZoneOffsetInMinutes={7 * 60}
        mode={'time'}
        is24Hour={false}
        display="default"
        locale="es-ES"
        onChange={onChange}
        themeVariant="light"
      />
    </View>
  )
}

export default PickerTime
