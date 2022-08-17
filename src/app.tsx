import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { ThemeProvider } from '@shopify/restyle'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import 'react-native-gesture-handler'
import { useAtom } from 'jotai'
import { activeThemeAtom } from './states/theme'
import AppNavigation, { BottomMenu } from './navigation/BottomMenu'
//
import { Provider } from 'react-redux'
import store from './redux/store'
import { AppearanceProvider } from 'react-native-appearance'

const App = (): JSX.Element => {
  const [activeTheme] = useAtom(activeThemeAtom)
  return (
    <ThemeProvider theme={activeTheme}>
      <SafeAreaProvider>
        <AppearanceProvider>
          <NavigationContainer>
            <Provider store={store}>
              <AppNavigation />
            </Provider>
          </NavigationContainer>
        </AppearanceProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default App
