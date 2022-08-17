import {
  Dimensions,
  ImageStyle,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  ViewStyle
} from 'react-native'
import React, { memo } from 'react'
import { TouchableOpacity } from '../../atoms/touchable'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-eva-icons'

interface IHeader {
  nameHeader: string
  iconHeader?: string
  style?: StyleProp<ViewStyle>
}
const { width, height } = Dimensions.get('window')
const header: React.FC<IHeader> = ({ nameHeader, iconHeader, style }) => {
  console.log(header, 'header ')

  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewText}>
        <View>
          {iconHeader ? (
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 9
              }}
            >
              <View style={[styles.icon, style]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack()
                  }}
                >
                  <View>
                    <Icon
                      name={iconHeader}
                      width={28}
                      height={28}
                      fill="#fff"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <View style={{ marginLeft: 15 }}>
                  <Text style={styles.text}>{nameHeader}</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={{ marginLeft: 5 }}>
              <Text style={styles.text}>{nameHeader}</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default memo(header)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF8328',
    height: height / 9
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#ffff'
  },
  viewText: {
    marginLeft: 15
  },
  icon: {}
})
