import { View, Text, TextInput, Pressable, Image } from 'react-native'
import React from 'react'
import { authentication } from '@/src/api/login/signin';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeft } from 'lucide-react-native';

const Logine = () => {
    const [phonenumber, onChangePhoneNumber] = React.useState('');
    const [password, onChangePassowrd] = React.useState('');
    const [active, setActive] = React.useState(false);
    const [errorIndicator, setErrorIndicator] = React.useState(false);


    const SigninType = [
        {
            title: 'Sign in whith Google',
          logo: require('../../../assets/images/google.png'),
            url: 'google',
        },
        {
            title: 'Sign in with Apple',
           logo: require('../../../assets/images/apple-logo.png'),
            url: 'apple',
        },
    ]

    const Auth = async () => {
        try {
            if (!phonenumber) {
               setErrorIndicator(true)
                return
            }
            const phoneRegex = /^\+?\d{1,8}$/;

            if (!phoneRegex.test(phonenumber)) {
          setErrorIndicator(true);
           return;
}
            const response = await authentication(phonenumber)
            
            
            if (response.status === true) {
               await AsyncStorage.setItem('phonenumber', `993${phonenumber}`)
                router.push('/login/confirm')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <View className='pt-2'>
      <View className='w-full h-16'>
        <Pressable className='flex-row items-center w-16 justify-between h-14' onPress={() => router.back()}><ArrowLeft  size={20}/><Text className='text-black'>Yza</Text></Pressable>
      </View>
        <View>
      <Text className='text-[#5600B3] font-bold text-4xl mt-20'>Ulgama gir</Text>
      <Text className='pt-5'>Hasabyňyza girmegiňizi haýyş edýäris</Text>
    </View>
    <View className='mt-8'>
      <Text>Telefon nomer</Text>
      <View className='flex flex-row items-center border-2 border-[#EECCFF] rounded-lg  w-full h-12 pl-5 mt-3'>
        <View className='w-12 h-12 items-center justify-center'>
          <Text className='text-[#5600B3] font-bold'>+993</Text>
        </View>
           <TextInput
          onChangeText={onChangePhoneNumber}
          value={phonenumber}
          placeholder="Telefon nomeriňiz"
          keyboardType="numeric"
          className='w-full h-12 pl-4'
          maxLength={8}
        />
      </View>
      {errorIndicator && (
        <Text className='text-red-500 text-sm mt-3'>Dogry telefon belgi girizmegiňizi haýyş edýäris!</Text>
      )}
       

            {/* <Text className='mt-8'>Password</Text>
          <TextInput
          onChangeText={onChangePassowrd}
          value={password}
          placeholder="ulanyjy kod"
          keyboardType="numeric"
          className='border-2 border-[#EECCFF] rounded-lg  w-full h-12 pl-5 mt-3'
        /> */}
    </View>

    <Pressable className='w-full h-12 bg-[#5600B3] rounded-lg items-center justify-center mt-8' 
    onPress={Auth}
    >
      <Text className='text-white font-bold'>Sign in</Text>
    </Pressable>

    {/* <View className='mt-8'>
      {SigninType.map((item, index) => (
        <Pressable key={index} className='w-full h-12 bg-white rounded-lg items-center justify-center mt-8 border-[1px] border-[#EECCFF] flex flex-row' >
         <Image source={item.logo} className="w-6 h-6 mr-2" resizeMode="contain" />
          <Text className='text-black font-bold text-base'>{item.title}</Text>
        </Pressable>
      ))}
      </View> */}
    </View>
  )
}

export default Logine