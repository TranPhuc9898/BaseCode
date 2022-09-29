import React from 'react'
import {
  createBottomTabNavigator,
  BottomTabBarProps
} from '@react-navigation/bottom-tabs'
import { TabBar } from './TabBar'

import DetailScreen from '../screens/detail'
import AccountScreen from '../screens/account'
// import SupportScreen from '../screens/support'
import CleanHouseScreen from '../screens/clean'

//

import { createStackNavigator } from '@react-navigation/stack'
//

import InputScreen from '@/screens/input/InputScreen'

import HomeScreen from '../screens/home'
import CurrencyScreen from '../screens/detail'

export type HomeTabParams = {
  HomeScreen: undefined

  CurrencyScreen: undefined
}

export const BottomMenu = () => {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Calculator',
          headerShown: false,
          tabBarTestID: 'Calculator'
        }}
      />

      <Tab.Screen
        name={'CurrencyScreen'}
        component={CurrencyScreen}
        options={{
          tabBarLabel: 'Currency Converter',
          headerShown: false,
          tabBarTestID: 'Currency Converter'
        }}
      />
    </Tab.Navigator>
  )
}

export type RootStackParams = {
  BottomMenu: undefined
}

const Stack = createStackNavigator<RootStackParams>()

const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'BottomMenu'}
        component={BottomMenu}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
export default AppNavigation
