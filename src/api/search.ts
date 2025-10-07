// USED IN (home)/_Layout.tsx FILE

// Home funciton
export const SearchApi = async (search : string) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL2}products?offset=0&max=40&lang=tk&mask=${search}`, {
      method: 'GET',
    }).then((data) => data.json())
    return response
  } catch (error) {
    console.log(error)
  }
}
