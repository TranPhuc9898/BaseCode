import {
  Linking,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Platform
} from 'react-native'
import React, { useState, useEffect } from 'react'

import Header from '../components/header/header'
import { bTaskee } from '@/themes/color'

import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { backgroundWhite } from '../themes/color'
import { getWeekDays } from '../helpers/index'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { addMoment } from '@/redux/moment'
import { SafeAreaView } from 'react-native-safe-area-context'

const AccountScreen = () => {
  const _openAppStore = () => {
    Linking.canOpenURL(
      'https://apps.apple.com/vn/app/btaskee-maids-and-cleaning/id1054302942'
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Header nameHeader="STDIO" />
    </View>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  body: {},

  textView: {
    paddingRight: 12,
    marginLeft: 16
  },
  text: {
    paddingTop: 15,
    color: '#FF3366'
  },
  boxView: {
    borderWidth: 0.5,
    borderColor: bTaskee,
    marginHorizontal: 15,
    marginTop: 20,
    paddingVertical: 20,
    borderRadius: 10
    // justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 15
  },
  textStyle2: {
    backgroundColor: bTaskee,
    borderRadius: 50,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: '#fff'
  },
  body2: {
    marginLeft: 16,
    paddingTop: 17
  },
  boxView2: {
    borderWidth: 0.5,
    marginHorizontal: 15,
    marginTop: 20,
    paddingVertical: 200,
    borderRadius: 10
  }
})
