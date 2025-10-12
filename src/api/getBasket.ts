// USED IN (katalog)/index.tsx FILE

import { Platform } from "react-native"
import * as Application from "expo-application";
// Home funciton
export const GetBasketApi = async () => {
  try {
      const deviceId = Platform.OS === 'ios' ?
    `mps-${await Application.getIosIdForVendorAsync()}`
    :
    `android2_phone${await Application.getAndroidId()}`
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL2}cart/${deviceId}?lang=tk`, {
      method: 'GET',
    }).then((data) => data.json())
    return response
  } catch (error) {
    console.log(error)
  }
}
