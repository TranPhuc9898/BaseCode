import { Text } from '@/atoms'

import * as React from 'react'
import { memo } from 'react'
import { View, StyleSheet, Pressable, Alert } from 'react-native'

//
import Header from '../components/header/header'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { black, bTaskee, grey } from '@/themes/color'
import { Icon } from 'react-native-eva-icons'
import { currencyFormat, formatLetter } from '@/helpers'
import { LIST_DATA3 } from '@/utils/data'
import moment from 'moment'

const DetailScreen = () => {
  const infoSlice = useSelector((state: RootState) => state.infoSlice)
  const mutiSlice = useSelector((state: RootState) => state.mutiSlice)
  const choiceSlice = useSelector((state: RootState) => state.choiceSlice)
  const timeSlice = useSelector((state: RootState) => state.timeSlice)
  const momentSlice = useSelector((state: RootState) => state.momentSlice)
  const current = moment.unix(momentSlice.timeData ?? 0)
  return (
    <View style={{ flex: 1 }}>
      <Header nameHeader="Danh sách công việc" />

      <View style={styles.body}>
        {infoSlice.InfoList.money === undefined ||
        infoSlice === null ||
        infoSlice === undefined ? (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Bạn hiện tại chưa có công việc nào!</Text>
          </View>
        ) : (
          <Pressable
            onPress={() => {
              Alert.alert('hello')
            }}
            style={({ pressed }) => [
              { backgroundColor: '#fff', opacity: pressed ? 0.2 : 1 }
            ]}
          >
            <View style={styles.viewBox}>
              {/* firstViewBox */}

              <View
                style={[
                  styles.firstViewBox,
                  {
                    marginTop: 15,
                    marginLeft: 15,
                    marginRight: 15
                  }
                ]}
              >
                <View style={styles.itemFirstViewBox}>
                  <View>
                    <Text style={styles.text}>Dọn dẹp nhà</Text>
                  </View>
                  <View style={{}}>
                    <View style={{ paddingTop: 5 }}>
                      <Text style={[styles.subText, {}]}>
                        Đã đăng vài giây tới
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.button}>
                  <Text
                    style={[
                      styles.subText,
                      { color: bTaskee, textAlign: 'center' }
                    ]}
                  >
                    Mới đăng
                  </Text>
                </View>
              </View>
              <View style={styles.lineBox} />

              <View style={styles.flexItem}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.center}>
                    <Icon
                      name={'clipboard-outline'}
                      fill={bTaskee}
                      width={22}
                      height={22}
                    />
                  </View>
                  <View>
                    <Text style={styles.contentText}>
                      {formatLetter(timeSlice?.TimeList?.date)},
                      {timeSlice?.TimeList?.day}
                    </Text>
                  </View>
                </View>
                {/* Item 2 */}
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <View>
                    <Icon
                      name={'clock-outline'}
                      fill={bTaskee}
                      width={22}
                      height={22}
                    />
                  </View>
                  <View>
                    <Text style={styles.contentText}>
                      {LIST_DATA3?.[mutiSlice.index]?.id !== -1 ? (
                        <Text style={styles.contentText}>
                          {LIST_DATA3?.[mutiSlice?.index]?.time} giờ,
                          <Text style={styles.contentText}> Bắt đầu từ </Text>
                          <Text style={styles.contentText}>
                            {current.hour?.().toString().padStart(2, '')} :
                          </Text>
                          <Text style={styles.contentText}>
                            {current.minutes?.()}
                            <Text style={styles.contentText}>
                              {' '}
                              cho đến{' '}
                              {current.hour?.() +
                                LIST_DATA3?.[mutiSlice?.index]?.time}{' '}
                              {':'} {current.minutes?.()}
                            </Text>
                          </Text>
                        </Text>
                      ) : null}
                    </Text>
                  </View>
                </View>
                {/* Item 3 */}
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <View>
                    <Icon
                      name={'smiling-face-outline'}
                      fill={bTaskee}
                      width={22}
                      height={22}
                    />
                  </View>
                  <View>
                    <Text style={styles.contentText}>
                      {currencyFormat(infoSlice?.InfoList?.money)}
                    </Text>
                  </View>
                </View>
                {/* Item 4 */}
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <View>
                    <Icon
                      name={'car-outline'}
                      fill={bTaskee}
                      width={22}
                      height={22}
                    />
                  </View>
                  <View>
                    <Text style={styles.contentText}>Chờ thanh toán</Text>
                  </View>
                </View>
                {/* Item 5 */}
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <View>
                    <Icon
                      name={'pin-outline'}
                      fill={bTaskee}
                      width={22}
                      height={22}
                    />
                  </View>
                  <View style={{ paddingRight: 20 }}>
                    <Text
                      style={[styles.contentText, { width: 300 }]}
                      numberOfLines={3}
                    >
                      Công ty TNHH bTaskee, Hẻm 284/25 Lý Thường Kiệt, phường
                      14, Quận 10, Thành phố Hồ Chí Minh, Việt Nam
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.lineBox} />
              <View
                style={[
                  styles.firstViewBox,
                  { marginTop: 20, marginLeft: 20, marginRight: 20 }
                ]}
              >
                <View style={styles.button1}>
                  <Text style={[styles.subText, { color: 'red' }]}>
                    Hủy Việc
                  </Text>
                </View>
                <View style={[styles.button2, {}]}>
                  <Text style={[styles.subText, { color: 'green' }]}>
                    Thanh Toán Lại
                  </Text>
                </View>
              </View>

              <View
                style={[styles.center, { paddingTop: 20, paddingBottom: 20 }]}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    color: '#98eba8'
                  }}
                >
                  Các CTV bTaskee đều có ít nhất 1 mũi vaccine
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      </View>
    </View>
  )
}
export default memo(DetailScreen)

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
