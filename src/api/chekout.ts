// USED IN (tabs)/(katalog)/categori/_Layout.tsx FILE

import { Platform } from "react-native"
import * as Application from "expo-application"
// Katalog/brend funciton
export const ChekoutApi = async (selectedTime: string, adress: string, firstName: string, telephone: number, comment: string, code?: string) => {
  try {
    console.log(selectedTime, adress, firstName, telephone, code, comment)
      const deviceId = Platform.OS === 'ios' ?
    `mps-${await Application.getIosIdForVendorAsync()}`
    :
    `android2_phone${await Application.getAndroidId()}`
    
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL1}cart/checkout`, {
      method: 'POST',
      body: JSON.stringify({
        "delivery.address": adress,
         "delivery.description": comment,
         "delivery.firstName": firstName,
         "delivery.telephone": `+993${telephone}`,
         "shoppingCartCode": code,
         "deliveryTime": selectedTime,
      })
    }).then((data) => data.json())
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
  }
}
