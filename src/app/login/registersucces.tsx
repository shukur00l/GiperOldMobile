import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { ArrowLeft } from 'lucide-react-native'
import { router } from 'expo-router'

const Registersucces = () => {
  return (
    <View className='h-full bg-white pt-20'>
         <View className='w-full h-16'>
        <Pressable className='flex-row items-center w-16 justify-between h-14' onPress={() => router.back()}><ArrowLeft  size={20}/><Text className='text-black'>Yza</Text></Pressable>
      </View>

      <View className='absolute h-full justify-center items-center w-full'>
        <Image source={require('../../../assets/images/succesPage.png')} className='w-40 h-40'/>
     <Text className='font-bold text-2xl text-center pt-5 text-[#5600B3]'>Hasabyňyz üstünlikli döredildi!</Text>
     <Text className='text-center pt-5'>Müňlerçe önüm tapmakdan bary-ýogy bir gezek basyň.</Text>
     <Pressable className='w-96 h-12 bg-[#5600B3] rounded-lg items-center justify-center mt-10' onPress={() => router.push('/(tabs)/(home)')}>
       <Text className='text-white font-bold'>Esasy ekrana dolan</Text>
     </Pressable>
      </View>
     
    </View>
  )
}

export default Registersucces