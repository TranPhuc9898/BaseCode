import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { Platform } from 'react-native'

// SessionStorage implement

const SessionStorage = {
  data: {} as { [key: string]: any },
  getItem: <T extends unknown>(key: string): T | null => {
    const item = SessionStorage.data[key]
    try {
      return !!item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  setItem: <T extends unknown>(key: string, value: T) => {
    if (value === null) return
    SessionStorage.data[key] = JSON.stringify(value)
  },
  removeItem: (key: string) => {
    delete SessionStorage.data[key]
  }
}

// SyncStorage implement

const getAppPackageName = () => {
  if (Platform.OS === 'ios') return Constants.manifest?.ios?.bundleIdentifier
  else if (Platform.OS === 'android')
    return Constants.manifest?.android?.package
  else return null
}

const STORAGE_VERSION = 1
const LOCAL_STORAGE_ID = getAppPackageName()

export const Storage = {
  initAsync: async () => {
    if (!!!LOCAL_STORAGE_ID) return null

    try {
      const localStorage = await AsyncStorage.getItem(LOCAL_STORAGE_ID)

      if (!!localStorage) {
        const data = JSON.parse(localStorage)
        if (!!!data.__v || data.__v !== STORAGE_VERSION)
          throw `Wrong storage version, reset all storage data to version ${STORAGE_VERSION}`

        SessionStorage.data = data
      }
    } catch (err) {
      console.warn('STDIO', err)
      SessionStorage.data = { __v: STORAGE_VERSION }
      await AsyncStorage.setItem(
        LOCAL_STORAGE_ID,
        JSON.stringify(SessionStorage.data)
      )
    }
  },
  getItemSync: <T extends unknown>(key: string): T | null => {
    if (!!!LOCAL_STORAGE_ID) return null

    return SessionStorage.getItem(key)
  },
  setItemAsync: async <T extends unknown>(key: string, value: T) => {
    if (!!!LOCAL_STORAGE_ID) return null

    if (value === null) return null
    SessionStorage.setItem(key, value)

    await AsyncStorage.setItem(
      LOCAL_STORAGE_ID,
      JSON.stringify(SessionStorage.data)
    )
  },
  removeItemAsync: async (key: string) => {
    if (!!!LOCAL_STORAGE_ID) return

    SessionStorage.removeItem(key)

    await AsyncStorage.setItem(
      LOCAL_STORAGE_ID,
      JSON.stringify(SessionStorage.data)
    )
  }
}
