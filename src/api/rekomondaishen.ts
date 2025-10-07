// USED IN (katalog)/index.tsx FILE

import { Platform } from "react-native"
import * as Application from "expo-application";
// Home funciton
export const GetRekomondaishenApi = async (id: number, cCode: string, pCode: string, bCode:string, bId:number, cId:number) => {
  try {
      const deviceId = Platform.OS === 'ios' ?
    `mps-${await Application.getIosIdForVendorAsync()}`
    :
    `android2_phone${await Application.getAndroidId()}`
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL2}products/looksByThisProduct/${id}?${deviceId}&cCode=${cCode}&pCode=${pCode}&bCode=${bCode}&bId=${bId}&cId=${cId}`, {
      method: 'GET',
    }).then((data) => data.json())
    return response
  } catch (error) {
    console.log(error)
  }
}
