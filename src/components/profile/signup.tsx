import { View, Text, TextInput, Pressable, Image } from 'react-native'
import { Checkbox } from 'expo-checkbox';
import React from 'react'
import { router } from 'expo-router';
const Signup = () => {
    const [email, onChangeEmail] = React.useState('');
    const [fullname, onChangeFullname] = React.useState('');    
    const [password, onChangePassowrd] = React.useState('');
    const [active, setActive] = React.useState(false);
    const [isChecked, setChecked] = React.useState(false);
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

  return (
    <View >
        <View>
      <Text className='text-[#5600B3] font-bold text-4xl mt-20'>Agza boluň</Text>
      <Text className='pt-5'>Please create a new account</Text>
    </View>
    <View className='mt-8'>
      <Text>Name and surname</Text>
          <TextInput
          onChangeText={onChangeFullname}
          value={fullname}
          placeholder="Aman Amanow"
          keyboardType="numeric"
          className='border-2 border-[#EECCFF] rounded-lg  w-full h-12 pl-5 mt-3'
        />

         <Text className='mt-8'>Email</Text>
          <TextInput
          onChangeText={onChangeEmail}
          value={email}
          placeholder="ulanyjy@gmail.com"
          keyboardType="numeric"
          className='border-2 border-[#EECCFF] rounded-lg  w-full h-12 pl-5 mt-3'
        />

            <Text className='mt-8'>Password</Text>
          <TextInput
          onChangeText={onChangePassowrd}
          value={password}
          placeholder="ulanyjy kod"
          keyboardType="numeric"
          className='border-2 border-[#EECCFF] rounded-lg  w-full h-12 pl-5 mt-3'
        />
    </View>

      <View className='flex-row items-center' >
        <Checkbox  value={isChecked} onValueChange={setChecked} className='m-6 ml-0 mr-2' color={isChecked ? '#FF8C00' : undefined}/>
        <Text className='font-extralight'>Agree the terms of use and privacy policy</Text>
      </View>

    <Pressable className='w-full h-12 bg-[#5600B3] rounded-lg items-center justify-center mt-6'
    onPress={() => router.push('/login/confirm')}
    >
      <Text className='text-white font-bold'>Sign up</Text>
    </Pressable>

    <View className='mt-8'>
      {SigninType.map((item, index) => (
        <Pressable key={index} className='w-full h-12 bg-white rounded-lg items-center justify-center mt-8 border-[1px] border-[#EECCFF] flex flex-row' >
         <Image source={item.logo} className="w-6 h-6 mr-2" resizeMode="contain" />
          <Text className='text-black font-bold text-base'>{item.title}</Text>
        </Pressable>
      ))}
      </View>
    </View>
  )
}

export default Signup