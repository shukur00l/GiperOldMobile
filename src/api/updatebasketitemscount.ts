// USED IN (tabs)/(katalog)/categori/_Layout.tsx FILE

import { Platform } from "react-native"
import * as Application from "expo-application";

// Katalog/shops funciton
export const UpdateBasketItemApi = async (lineItemId: number, newQuantity: number,) => {
  try {
       const deviceId = Platform.OS === 'ios' ?
    `mps-${await Application.getIosIdForVendorAsync()}`
    :
    `android2_phone${await Application.getAndroidId()}`
    
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL2}cart?lang=tk`, {
      method: 'POST',
      body: JSON.stringify({
        productAvailabilityId: lineItemId,
        quantity: newQuantity,
        owner: deviceId,
      }),
    }).then((data) => data.json())
    return response
  } catch (error) {
    console.log(error)
  }
}
