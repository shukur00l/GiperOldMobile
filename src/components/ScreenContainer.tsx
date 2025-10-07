/* eslint-disable @typescript-eslint/no-floating-promises */
import * as NavigationBar from 'expo-navigation-bar'
import * as SystemUI from 'expo-system-ui'
import React, { useEffect } from 'react'
import { View, StyleSheet, ViewStyle, Platform, Dimensions } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import { useThemeStore } from '../store/store'
import { usePathname } from 'expo-router'

interface ScreenContainerProps {
  children: React.ReactNode
  style?: ViewStyle
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, style }) => {
  // const theme = useThemeStore((state) => state.theme)
  const insets = useSafeAreaInsets()
  const dims = Dimensions.get('screen')
  const pathname = usePathname()

  // useEffect(() => {
  //   const adjustColors = async () => {
  //     // if (theme === 'dark') {
  //     //   // SystemUI.setBackgroundColorAsync('#181A20')
  //     //   if (Platform.OS === 'android') {
  //     //     NavigationBar.setBackgroundColorAsync('#181A20')
  //     //     NavigationBar.setButtonStyleAsync('light')
  //     //     // StatusBar.setBackgroundColor('#181A20')
          
  //     //   }
  //     //   // StatusBar.setBarStyle('light-content')
  //     // } else {
  //     //   // SystemUI.setBackgroundColorAsync('white')
  //     //   if (Platform.OS === 'android') {
  //     //     NavigationBar.setBackgroundColorAsync('#ffffff01')
  //     //     NavigationBar.setButtonStyleAsync('dark')
  //     //     // StatusBar.setBackgroundColor('white')
  //     //   }
  //     //   // StatusBar.setBarStyle('dark-content')
  //     // }
  //   }

  //   adjustColors()
  // }, [theme])

  const styles = StyleSheet.create({
    statusbar: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: dims.width,
      // height: insets.top,
      // backgroundColor: theme === 'dark' ? '#181A20' : 'white',
    },
    container: {
      position: 'relative',
      // backgroundColor: theme === 'dark' ? '#181A20' : 'white',
      backgroundColor: 'white',
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 16 + insets.top,
      // marginBottom: 60 + insets.bottom,
      ...style,
    },
  })

  return (
    <View style={styles.container} className='h-full flex-1'>
      {/* <View style={styles.statusbar} /> */}
      <StatusBar translucent
      //  style={pathname == '/home' ? 'light' : theme == 'dark' ? 'light' : 'dark'} 
       />
      {children}
    </View>
  )
}

export { ScreenContainer }
