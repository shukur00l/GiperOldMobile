// USED IN (tabs)/(katalog)/categori/_Layout.tsx FILE

// Katalog/shops funciton
export const StoresApi = async (offset: number, max: number) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL1}merchantStore?offset=${offset}&max=${max}`, {
      method: 'GET',
    }).then((data) => data.json())
    return response
  } catch (error) {
    console.log(error)
  }
}
