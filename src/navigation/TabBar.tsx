import React, { useState, useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
  Text,
  Image
} from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { BottomMenuItem } from './BottomMenuItem'
import { bTaskee } from '../themes/color'
import { IconType } from '@/utils/types'
import { ICON } from '@/utils/data'

export const TabBar = ({
  state,
  descriptors,
  navigation
}: BottomTabBarProps) => {
  const [translateValue] = useState(new Animated.Value(0))

  const totalWidth = Dimensions.get('window').width
  const tabWidth = totalWidth / state.routes.length + 5

  const animateSlider = (index: number) => {
    Animated.spring(translateValue, {
      toValue: index * tabWidth,
      velocity: 10,
      useNativeDriver: true
    }).start()
  }
  // const [set, setState] = useState(0)
  useEffect(() => {
    animateSlider(state.index)
    console.log('TCL: state.index', state.index)
  }, [state.index])

  return (
    <View style={[style.tabContainer, { width: totalWidth }]}>
      <View style={{ flexDirection: 'row' }}>
        <Animated.View
          style={[
            style.slider,
            {
              transform: [{ translateX: translateValue }],
              width: tabWidth - 20
            }
          ]}
        />

        {state.routes.map((route, index) => {
          const a = ICON.find((item: IconType) => item.id === index) //important
          console.log('TCL: a', a)
          const { options } = descriptors[route.key]
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name

          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,

              canPreventDefault: true
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }

            animateSlider(index)
          }

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key
            })
          }
          // console.log('TCL: options.tabBarTestID', options.tabBarTestID)

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={index}
            >
              <View
                style={{
                  flexDirection: 'column'
                }}
              >
                <BottomMenuItem
                  Name={label.toString()}
                  isCurrent={isFocused}
                  iconNumber={a?.iconName}
                />
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  tabContainer: {
    height: 70,
    shadowOffset: {
      width: 0,
      height: -1
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    backgroundColor: 'white',
    elevation: 10,
    bottom: 0
  },
  slider: {
    height: 2,
    position: 'absolute',
    top: -1,
    zIndex: 999,
    backgroundColor: bTaskee,
    borderRadius: 10
  }
})
