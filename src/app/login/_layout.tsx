import { Stack } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { View, Text, Pressable } from 'react-native';
import { router } from "expo-router";
import React from 'react';

export default function LoginLayout() {
  return (
     <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',

        },
        headerTransparent: true,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
       
      }}>
      <Stack.Screen name="signin" 
      options={{
        title: 'Giriş',
        headerShown: false,
        //  headerLeft: () => <Pressable className='flex-row items-center w-16 justify-between h-14' onPress={() => router.back()}><ArrowLeft  size={20}/><Text className='text-black'>Yza</Text></Pressable>,
      }}/>
      <Stack.Screen name="signup" 
      options={{
        title: 'Agza bol',
        // headerLeft: () => <Pressable className='flex-row items-center w-16 justify-between h-14' onPress={() => router.back()}><ArrowLeft  size={20}/><Text className='text-black'>Yza</Text></Pressable>,
      }}/>
       <Stack.Screen name="confirm" 
      options={{
        title: 'Agza bol'
      }}/>
      <Stack.Screen name="registersucces" 
      options={{
        title: 'Agza bol',
        // headerLeft: () => <Pressable className='flex-row items-center w-16 justify-between h-14' onPress={() => router.back()}><ArrowLeft  size={20}/><Text className='text-black'>Yza</Text></Pressable>,
      }}/>
    </Stack>
  );
}
