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
import ChoiceScreen from '@/screens/choice'
import { View } from 'react-native'

export type HomeTabParams = {
  HomeScreen: undefined
  AccountScreen: undefined
  SupportScreen: undefined
  DetailScreen: undefined
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
        name={'DetailScreen'}
        component={DetailScreen}
        options={{
          tabBarLabel: 'Currency Converter',
          headerShown: false,
          tabBarTestID: 'Currency Converter'
        }}
      />

      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Feedback',

          tabBarBadge: 3,
          headerShown: false,
          tabBarTestID: 'Feedback'
        }}
      />
    </Tab.Navigator>
  )
}

export type RootStackParams = {
  BottomMenu: undefined

  CleanHouseScreen: undefined
  InputScreen: undefined
  ChoiceScreen: undefined
  DetailScreen: undefined
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
      <Stack.Screen
        name={'CleanHouseScreen'}
        component={CleanHouseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'InputScreen'}
        component={InputScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'ChoiceScreen'}
        component={ChoiceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'DetailScreen'}
        component={DetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
export default AppNavigation
