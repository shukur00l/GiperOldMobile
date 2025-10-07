import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Platform } from 'react-native';
import Profile from '@/src/components/profile/profile';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';


export default function ProfileScreen() {
  return (
    <SafeAreaProvider>
    <SafeAreaView>
     {Platform.OS === 'ios' && (
          <View>
            <Profile/>
            </View>
          )}
     {Platform.OS === 'android' && (
          <View className='pt-16'>
            <Profile/>
            </View>
          )}
    </SafeAreaView>
    </SafeAreaProvider>
  );
}
