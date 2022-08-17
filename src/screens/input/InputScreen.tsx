import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import React, { forwardRef, memo, useEffect, useRef, useState } from 'react'
//component
import Header from '@/components/header/header'

import { useNavigation } from '@react-navigation/native'
//data
import { ChoiceType } from '@/utils/types'
import { LIST_DATA4 } from '@/utils/data'
//redux
import choiceSlice, { addChoiceIndex } from '@/redux/choiceSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import infoSlice, { addInfoToList } from '@/redux/infoSlice'
import { Icon } from 'react-native-eva-icons'

const InputScreen = () => {
  const infoSlice = useSelector((state: RootState) => state.infoSlice)

  const navigation = useNavigation()
  const [address, setAddress] = useState(
    infoSlice?.InfoList.address ? infoSlice?.InfoList?.address : ''
  )
  const [city, setCity] = useState(
    infoSlice?.InfoList.city ? infoSlice?.InfoList?.city : ''
  )
  const [district, setDistrict] = useState(
    infoSlice?.InfoList.district ? infoSlice?.InfoList?.district : ''
  )
  const dispatch = useDispatch()
  const [isChoice, setIsChoice] = useState(0)

  const [isSelected, setIsSelected] = useState(true)

  const choice = useSelector((state: RootState) => {
    state.choiceSlice
  })

  const onPress = () => {
    dispatch(addChoiceIndex(isChoice))

    dispatch(addInfoToList({ address, city, district }))
  }
  const onPressIn = () => {
    // dispatch(addChoiceIndex(isChoice))

    // dispatch(addInfoToList({ address, city, district }))
    navigation.navigate('CleanHouseScreen')
  }
  const prev = useRef('')
  useEffect(() => {}, [infoSlice])

  const onPressHello = () => {
    Alert.alert('hello')
  }

  const renderItem = ({ item, index }: { item: ChoiceType; index: number }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setIsChoice(index)
          }}
        >
          {index === isChoice ? (
            <View style={{ flexDirection: 'row', borderColor: '#FB6D3B' }}>
              <View key={index}>
                <Icon
                  name="radio-button-on"
                  width={20}
                  height={20}
                  fill="#4774fc"
                />
              </View>
              <Text>{item.nameChoice}</Text>
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Icon
                  name="radio-button-off"
                  width={20}
                  height={20}
                  fill="#CFD2D7"
                />
              </View>

              <Text>{item.nameChoice}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View>
      <Header nameHeader="Nhập địa chỉ" iconHeader={'arrow-ios-back-outline'} />
      <View style={styles.body}>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold'
            }}
          >
            Số nhà, hẻm (Ngõ)
          </Text>
        </View>
        <View style={{}}>
          {/* TextInput */}
          <View>
            <TextInput
              style={{
                marginTop: 10,
                borderColor: 'gray',
                borderWidth: 1,
                padding: 10,
                borderRadius: 5
              }}
              placeholder="Nhập Số nhà,tên đường..."
              onChangeText={setAddress}
              value={address}
              testID="text1"
            />
          </View>

          <View style={{ paddingTop: 10 }}></View>
          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold'
              }}
            >
              Tỉnh / Thành Phố
            </Text>
            {/* TextInput */}
            <TextInput
              style={{
                marginTop: 10,
                borderColor: 'gray',
                borderWidth: 1,
                padding: 10,
                borderRadius: 5
              }}
              placeholder="Tỉnh / Thành Phố"
              onChangeText={setCity}
              value={city}
              testID="text2"
            />
            <View style={{ paddingTop: 10 }}></View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold'
              }}
            >
              Quận / Huyện
            </Text>
            {/* TextInput */}
            <TextInput
              style={{
                marginTop: 10,
                borderColor: 'gray',
                borderWidth: 1,
                padding: 10,
                borderRadius: 5
              }}
              placeholder=" Quận / Huyện"
              onChangeText={setDistrict}
              value={district}
              testID="text3"
            />
          </View>
        </View>
        <View style={{ paddingTop: 15 }}>
          <View>
            <Text style={styles.text}>Loại nhà</Text>
          </View>
          <View style={{ paddingTop: 15 }}>
            <FlatList
              data={LIST_DATA4}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item.toString()}-${index}`}
            />
            <View style={{ paddingTop: 15 }}>
              <Text>
                *Vui lòng chọn số nhà, loại nhà phù hợp. Để Cộng Tác Viên dễ
                dàng tìm kiếm.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          {/* Button */}
          <TouchableOpacity
            style={{
              marginTop: 10,
              backgroundColor: 'green',
              padding: 10,
              width: 'auto',
              borderRadius: 5,
              alignItems: 'center'
            }}
            onPress={onPress}
            onPressIn={onPressIn}
          >
            <Text style={{ color: 'white' }} testID="PressInThis">
              Chon vị trí này
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default InputScreen

const styles = StyleSheet.create({
  body: {
    padding: 20
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15
  },
  dot: {
    marginRight: 10,
    width: 10,
    height: 10,
    backgroundColor: '#FB6D3B',
    borderRadius: 4,
    marginTop: 5
  },
  dot2: {
    marginRight: 10,
    width: 10,
    height: 10,
    backgroundColor: '#b0acac',
    borderRadius: 4,
    marginTop: 5
  }
})
