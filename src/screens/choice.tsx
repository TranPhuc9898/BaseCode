import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useEffect } from 'react'
import { LIST_DATA3, LIST_DATA4 } from '@/utils/data'
import { useDispatch, useSelector } from 'react-redux'
import Header from '@/components/header/header'
import { RootState } from '@/redux/store'
import { useNavigation } from '@react-navigation/native'
import { bTaskee } from '@/themes/color'
import { Icon } from 'react-native-eva-icons'
import { currencyFormat, formatLetter } from '@/helpers'
import moment from 'moment'
const ChoiceScreen: React.FC = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  // const choiceSlice = useSelector((state: RootState) => state.choiceSlice)
  const infoSlice = useSelector((state: RootState) => state.infoSlice)
  const mutiSlice = useSelector((state: RootState) => state.mutiSlice)
  console.log('TCL: ChoiceScreen:React.FC -> mutiSlice', mutiSlice)
  const choiceSlice = useSelector((state: RootState) => state.choiceSlice)
  const timeSlice = useSelector((state: RootState) => state.timeSlice)
  const momentSlice = useSelector((state: RootState) => state.momentSlice)
  const current = moment.unix(momentSlice.timeData ?? 0)
  // console.log('TCL: choiceScreen:React.FC -> choiceSlice', choiceSlice)

  useEffect(() => {
    console.log(infoSlice?.InfoList?.money, 'hello')
  }, [mutiSlice, infoSlice])

  return (
    <View style={{ flex: 1 }}>
      <Header
        nameHeader="Xác nhận và thanh toán"
        iconHeader={'arrow-ios-back-outline'}
      />
      <ScrollView>
        <View style={styles.container}>
          <View style-={styles.body}>
            <View style={styles.body2}>
              <View>
                <Text style={styles.text}>Vị trí làm việc</Text>
              </View>

              <View style={styles.viewBox}>
                <View style={styles.flexDirectionRow}>
                  <View style={styles.flexDirectionCol}>
                    <View style={{ paddingTop: 5 }}>
                      <Text style={styles.text}>
                        {infoSlice.InfoList.address ? (
                          <Text> {infoSlice.InfoList.address}</Text>
                        ) : (
                          'Hoàng Hoa Thám'
                        )}
                      </Text>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                      <Text style={{ fontSize: 13, width: 240 }}>
                        {infoSlice.InfoList?.district ? (
                          <View>
                            <View>
                              <Text>
                                {infoSlice.InfoList?.district},
                                {infoSlice.InfoList.city}
                              </Text>
                            </View>
                            <View>
                              {
                                <View style={{ paddingTop: 10 }}>
                                  {LIST_DATA4?.[choiceSlice.index]?.id !==
                                  -1 ? (
                                    <Text>
                                      {
                                        LIST_DATA4?.[choiceSlice.index]
                                          ?.nameChoice
                                      }
                                    </Text>
                                  ) : null}
                                </View>
                              }
                            </View>
                          </View>
                        ) : (
                          'Hồ Chí Minh, Quận Tân Bình'
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* View Information */}
            </View>
          </View>
          <View>
            <View style={styles.padding}>
              <Text style={styles.text}> Thông tin công việc</Text>
            </View>
            <View style={[styles.viewBox]}>
              <View style={[styles.flexDirectionCol, { paddingLeft: 15 }]}>
                <View style={{ paddingTop: 10, paddingRight: 15 }}>
                  <Text style={styles.text2}>Thời gian làm việc</Text>
                  <View style={[styles.right, { marginTop: 10 }]}>
                    <View>
                      <Text>Ngày làm việc</Text>
                    </View>
                    <View>
                      <Text>
                        {formatLetter(timeSlice?.TimeList?.date)},
                        {timeSlice?.TimeList?.day}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.right, { marginTop: 10 }]}>
                    <View>
                      <Text>Làm Trong</Text>
                    </View>
                    <View>
                      <Text>
                        {LIST_DATA3?.[mutiSlice.index]?.id !== -1 ? (
                          <Text>
                            {LIST_DATA3?.[mutiSlice?.index]?.time} giờ,
                            <Text> </Text>
                            <Text>
                              bắt đâu từ{' '}
                              {current.hour?.().toString().padStart(2, '0')} :{' '}
                            </Text>
                            <Text>{current.minutes?.()}</Text>
                          </Text>
                        ) : null}
                        {<View style={{ flexDirection: 'row' }}></View>}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Text style={styles.text}>Chi tiết công việc</Text>
                    <Text>{infoSlice?.InfoList?.text}</Text>
                  </View>
                  <View style={[styles.right, { marginTop: 10 }]}>
                    <View>
                      <Text>Khối lượng công việc</Text>
                    </View>
                    <View>
                      <Text>
                        {LIST_DATA3?.[mutiSlice.index]?.id !== -1 ? (
                          <Text>
                            {LIST_DATA3?.[mutiSlice.index]?.description}
                          </Text>
                        ) : null}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.text}>Phuơng thức thanh toán</Text>
              <View style={styles.viewBox}>
                <View
                  style={[
                    styles.flexDirectionRow,
                    {
                      justifyContent: 'space-between',
                      marginRight: 100,
                      alignItems: 'center',
                      marginBottom: 10
                    }
                  ]}
                >
                  <View>
                    <Icon
                      name={'checkmark-square-outline'}
                      fill={bTaskee}
                      width={25}
                      height={25}
                    />
                  </View>
                  <View>
                    <Text>Thanh toán qua Tiki</Text>
                  </View>
                  <View
                    style={{
                      height: '100%',
                      width: 2,
                      backgroundColor: '#b0acac'
                    }}
                  ></View>
                  <View>
                    <Text>Khuyến mãi</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* <Text>
        {LIST_DATA3?.[mutiSlice.index]?.id !== -1 ? (
          <Text>
            {LIST_DATA3?.[mutiSlice.index]?.time + ' ' + 'giờ'}
            <View>
              <Text>
                {infoSlice.InfoList.address ? (
                  <View>
                    <Text> {infoSlice.InfoList.address}</Text>
                    <Text> {infoSlice.InfoList.text}</Text>
                  </View>
                ) : (
                  'Hoàng Hoa Thám'
                )}
              </Text>
            </View>
          </Text>
        ) : null}
        <Text> {LIST_DATA3?.[mutiSlice.index]?.mo}</Text>
      </Text> */}
        </View>
      </ScrollView>
      {/* // Footer */}
      <View style={[styles.flexDirectionCol, { height: 100 }]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 15,
            marginRight: 15
          }}
        >
          <View>
            <Text style={styles.text}>Tổng cộng</Text>
          </View>
          <View>
            <Text style={styles.text}>
              {currencyFormat(infoSlice.InfoList.money)}
            </Text>
          </View>
        </View>
        <View style={styles.headerFooterStyle}>
          <View style={styles.textStyle}>
            <TouchableOpacity
              testID="btnPayment"
              onPress={() => {
                // navigation.reset({
                //   index: 0,
                //   routes: [{ name: 'DetailScreen' }]
                // })
                navigation.navigate('BottomMenu', { screen: 'DetailScreen' })
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  marginTop: 13,
                  color: '#fff',
                  fontWeight: 'bold'
                }}
              >
                Thanh toán và đăng việc
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ChoiceScreen

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
    flex: 1
  },
  body: {},
  headerFooterStyle: {
    height: 40,
    backgroundColor: '#2CB55E',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5
  },

  body2: {
    paddingTop: 15
  },
  viewBox: {
    shadowColor: '#b0acac',
    marginTop: 10,
    borderColor: '#b0acac',
    borderWidth: 1,
    borderRadius: 5,
    width: 'auto'
  },
  flexDirectionRow: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingTop: 10
  },
  flexDirectionCol: {
    flexDirection: 'column',
    paddingBottom: 15
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15
  },
  text2: {
    fontWeight: 'bold',
    fontSize: 14
  },
  padding: {
    paddingTop: 15
  },
  paddingLeft: {
    paddingLeft: 15
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textStyle: {}
})
