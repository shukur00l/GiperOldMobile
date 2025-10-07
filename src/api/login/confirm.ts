// USED IN confirm.tsx FILE

// confirm funciton

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";
import { Platform } from "react-native";


export const confirmApi = async ( confirmCode: string) => {

  const deviceId = Platform.OS === 'ios' ?
    `mps-${await Application.getIosIdForVendorAsync()}`
    :
    `android2_phone${await Application.getAndroidId()}`
   
    const phone = await AsyncStorage.getItem('phonenumber')

    const code = confirmCode
    const owner = deviceId
    const loginType = "phoneNumber"
    const phoneNumber = phone
   
  
   
     console.log(code, owner, phoneNumber, loginType)
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL1}profile/confirm`, {
      method: 'POST',
      body: JSON.stringify({
        loginType,
        phoneNumber,
        owner,
        code
      }),
    }).then((data) => data.json())
    return response
  } catch (error) {
    console.log(error)
  }
}
