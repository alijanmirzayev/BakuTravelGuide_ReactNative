import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { FirstLoginProvider } from './src/context/FirstLogin'
import OpenScreen from './src/helpers/OpenScreen'

export default function App() {
  // AsyncStorage.clear()
  return (
    <NavigationContainer>
      <FirstLoginProvider>
          <OpenScreen />
      </FirstLoginProvider>
    </NavigationContainer>
  )
}