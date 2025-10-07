import { View, Text, Pressable,  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { OtpInput } from "react-native-otp-entry";
import React, { useState } from 'react'
import { confirmApi } from '@/src/api/login/confirm';
import {router} from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Confirm = () => {
  const [confirm , setConfirm] = useState('')
  const [error , setError] = useState(false)

const confirmFunc = async () => {
        try {
            if (!confirm) {
               setError(true)
                return
            }
            const phoneRegex = /^\+?\d{1,8}$/;

            if (!phoneRegex.test(confirm)) {
          setError(true);
           return;
}
            const response = await confirmApi(confirm)
            console.log(response)
            
            if (response.status === true) {
              await AsyncStorage.setItem('token', response.access_token)
              
                router.push('/login/registersucces')
            }
        } catch (error) {
            console.log(error)
        }
    }
  
  return (
    <SafeAreaView className='bg-white h-full px-6 pt-4' >
      <View className='pt-20'>
        <Text className='text-[#5600B3] font-bold text-4xl'>Telefon belgiňizi tassyklaň</Text>
        <Text className='w-96 mt-5 text-lg'>6 sanly kody görkezen telefon nomeriňize gelen bolmaly.</Text>
      </View>
      <View className='mt-20 '>
       <OtpInput
        numberOfDigits={6} 
        onTextChange={(confirm) => setConfirm(confirm)} 
        focusColor="#5600B3"
        autoFocus={true}
        placeholder="******"
        type="numeric"
        theme={
          {
           pinCodeContainerStyle:{
            width: 50,
            height: 74,
            borderWidth: 1,
            borderColor: "#5600B3",
            borderRadius: 8,
           }
          }
        }
        />
      </View>
      <View className='mt-10 flex flex-row justify-between'>

        <Pressable className='bg-[#5600B3] rounded-xl flex items-center w-[163px] h-12 justify-center'>
          <Text className='text-white font-semibold text-lg' 
          onPress={confirmFunc}
          >
            Tassykla</Text>
        </Pressable>

         <Pressable className='bg-white rounded-xl flex items-center justify-center border-[#5600B3] border-[1px] w-[163px] h-12'
         onPress={() => router.back()}
         >
          <Text className='text-[#5600B3] font-semibold text-lg'>Ýatyr</Text>
        </Pressable>
        
      </View>
    
    </SafeAreaView>
  )
}

export default Confirm