// USED IN (home)/_Layout.tsx FILE

// Home funciton
export const ProductitemsApi = async (id : string) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL1}products/${id}`, {
      method: 'GET',
    }).then((data) => data.json())
    return response
  } catch (error) {
    console.log(error)
  }
}
