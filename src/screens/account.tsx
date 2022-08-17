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
      <Header nameHeader="Tài khoản" />
      <View style={styles.body}>
        <View style={styles.textView}>
          <Text style={styles.text}>
            *Vui lòng đăng nhập để sử dụng thêm nhiều dịch vụ tiện ích khác cả
            chúng tôi!
          </Text>
        </View>

        <View style={styles.boxView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 5
            }}
          >
            <View style={{ marginTop: 20 }}>
              <Text style={styles.textStyle}>Tải app bTaskee tại đây!</Text>
            </View>
            <TouchableOpacity style={styles.textStyle2} onPress={_openAppStore}>
              <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                TẢI APP BTASKEE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body2}>
          <Text style={{ fontWeight: 'bold' }}>Hướng dẫn đăng nhập</Text>
        </View>
        <View style={styles.boxView2}>
          <View
            style={{
              position: 'absolute',
              zIndex: 999,
              top: 10,
              left: 10,
              right: 10
            }}
          >
            <Text style={styles.textStyle}>Bạn đã sử dụng app bTaskee</Text>
            <View style={{ padding: 2, marginTop: 8 }}>
              <Text>
                - Sử dụng số điện thoại, mật khẩu đã có thể đăng nhập vào app
                bTaskee và sử dụng dịch vụ
              </Text>
            </View>
            <View style={{ paddingTop: 5 }}>
              <Text style={styles.textStyle}>
                Bạn chưa từng sử dụng app bTaskee
              </Text>
            </View>
            {/* // View Box */}
            <View style={{ paddingTop: 5 }}>
              <Text>- Mở app bTaskee và nhấn chọn</Text>
              <View
                style={{
                  borderWidth: 0.5,
                  borderRadius: 5,
                  borderColor: 'green',

                  marginRight: 150,
                  paddingVertical: 10
                }}
              >
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: 'green' }}>
                    Đăng nhập /Tạo tài khoản
                  </Text>
                </View>
              </View>
            </View>
            {/* //Another View */}
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
              <View style={{ paddingTop: 10 }}>
                <Text>- Bấm chọn</Text>
              </View>
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: 'green',
                  marginLeft: 5,
                  paddingVertical: 10,
                  borderRadius: 5,
                  paddingHorizontal: 5
                }}
              >
                <Text style={{ color: 'green' }}>Đăng nhập</Text>
              </View>
            </View>
            {/* // Another Agains Screen */}
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
              <View style={{ paddingTop: 10 }}>
                <Text>- Nhấn vào chữ</Text>
              </View>
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: 'green',
                  marginLeft: 5,
                  paddingVertical: 10,
                  borderRadius: 5,
                  paddingHorizontal: 5
                }}
              >
                <Text style={{ color: 'green' }}>Quên mật khẩu</Text>
              </View>
            </View>
            <Text> và nhập số điện thoại đang hiển thị ở phía trên</Text>

            <View style={{ paddingTop: 10 }}>
              <Text>
                - Nhập mã OTP gồm 4 số được gửi về số điện thoại cuả bạn
              </Text>
              <View style={{ paddingTop: 10 }}>
                <Text>
                  - Đăng nhập bằng số điện thoại, mật khẩu bạn vừa tạo
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
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
