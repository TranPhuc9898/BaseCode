import { bTaskee } from '@/themes/color'
import { IData } from '@/utils/types'

import React, { useEffect } from 'react'

import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LogBox
} from 'react-native'
import FastImage from 'react-native-fast-image'

import Header from '../components/header/header'
import { LIST_DATA, LIST_DATA2 } from '../utils/data'

import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { IData2 } from '../utils/types'

const { width, height } = Dimensions.get('window')
const HomeScreen: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  useEffect(() => {
    console.log("hello")
  }, [])
  const onPress = () => {
    navigation.navigate('AccountScreen'
  }
  const _renderItem = ({ item, index }: { item: IData; index: number }) => {
    return (
      <View style={styles.renderItemView}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/icon/images.jpeg')}
            style={{ width: 20, height: 20 }}
          />
        </View>

        <View style={{ margin: 5 }}>
          <Text style={{}}>{item.nameData}</Text>
        </View>
      </View>
    )
  }

  const _renderItem2 = ({ item, index }: { item: IData2; index: number }) => {
    return (
      <View style={styles.renderItemView}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/icon/images.jpeg')}
            style={{ width: 20, height: 20, marginTop: 4 }}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ margin: 5 }}>
            <Text style={styles.text}>{item.nameData}</Text>
          </View>
          <View>
            <Text>{item.nameSup}</Text>
          </View>
        </View>
      </View>
    )
  }
  const image =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSmz2mNKmV-x3_cXKE9Qn8l8VkNOzbAy5nQ&usqp=CAU'

  return (
    <View style={{ flex: 1 }}>
      <Header nameHeader="bTaskee" />

      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.text}>Dịch vụ</Text>
        </View>
        {/* // View Header \\ */}
        <View style={styles.image}>
          <View style={{ marginTop: 15 }}>
            <FastImage
              style={{ width: width - 40, height: 150 }}
              source={{
                uri: image,
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#fff',
              shadowColor: bTaskee,
              paddingVertical: 'auto',
              borderRadius: 1,
              shadowOpacity: 2,
              shadowRadius: 2,
              shadowOffset: {
                height: 0.3,
                width: 0.3
              },
              borderRightColor: bTaskee,
              borderEndColor: bTaskee,
              padding: 20
            }}
          >
            <View>
              <Image
                source={require('../assets/icon/images.jpeg')}
                style={{ width: 35, height: 35, borderRadius: 10 }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: width - 120,
                alignItems: 'center',
                marginLeft: 5
              }}
            >
              <View>
                <Text style={styles.text}>Dọn dẹp nhà</Text>
              </View>
              <View
                style={{
                  backgroundColor: bTaskee,
                  borderRadius: 7,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#fff'
                }}
              >
                <TouchableOpacity testID="btnDangViec"
                  onPress={() => {
                    navigation.navigate('CleanHouseScreen')
                  }}
                >
                  <Text style={{ color: '#fff' }}>Đăng việc ngay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* // View next \\ */}

        <View style={{ paddingTop: 20 }}>
          <Text style={styles.text}>Các dịch vụ bTaskee cung cấp</Text>
          <View
            style={{
              marginTop: 20,
              paddingVertical: 160,
              borderRadius: 10,
              backgroundColor: '#fff',
              shadowColor: bTaskee,
              shadowOpacity: 4,
              shadowRadius: 2,
              shadowOffset: {
                height: 0.5,
                width: 0.3
              },
              borderRightColor: bTaskee,
              borderEndColor: bTaskee
            }}
          >
            <View style={{ position: 'absolute', zIndex: 999 }}>
              <FlatList
                data={LIST_DATA}
                renderItem={_renderItem}
                keyExtractor={(item, index) => `${item.toString()}-${index}`}
              />
            </View>
          </View>
        </View>

        {/* // View Third \\ */}
        <View style={{ paddingTop: 20 }}>
          <Text style={styles.text}>Các tình năng trên app bTaskee</Text>
          <View style={styles.viewBox}>
            <FlatList
              data={LIST_DATA2}
              renderItem={_renderItem2}
              keyExtractor={(item, index) => `${item.toString()}-${index}`}
            />
          </View>
        </View>
        {/* // View Four \\ */}

        <View style={{ paddingTop: 20 }}>
          <Text style={styles.text}>
            Để có một trải nghiệm đầy đủ hơn. Vui lòng tải app bTaskee!
          </Text>
          <View style={{ paddingTop: 5 }}>
            <Text>*Nhấn vào đây để xem hướng dẫn tải và sử dụng app.</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 5
            }}
          >
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Text style={{ fontSize: 12, color: '#fff' }}>HƯỚNG DẪN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    width: width,
    height: height
  },
  bodySer: {
    marginLeft: 19,
    marginTop: 8
  },
  bodyTitle: {},
  text: {
    fontWeight: 'bold',
    fontSize: 14
  },
  secondBody: {
    width: width * 0.9,
    height: height / 3.5,
    backgroundColor: '#000',
    paddingTop: 25
  },
  hello: {
    borderRadius: 15,
    marginTop: 15,
    marginRight: 15,
    backgroundColor: '#fff'
  },
  container: {
    margin: 20
  },
  image: {
    flexDirection: 'column'
  },
  button: {
    backgroundColor: bTaskee,
    borderRadius: 50,
    padding: 12,
    borderWidth: 1,
    borderColor: '#fff',
    width: 100
  },
  renderItemView: {
    flexDirection: 'row',
    marginTop: 2,
    marginLeft: 6
  },
  viewBox: {
    marginTop: 20,
    paddingVertical: 'auto',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: bTaskee,
    shadowOpacity: 4,
    shadowRadius: 2,
    shadowOffset: {
      height: 0.5,
      width: 0.3
    },
    borderRightColor: bTaskee,
    borderEndColor: bTaskee
  }
})

export default HomeScreen
