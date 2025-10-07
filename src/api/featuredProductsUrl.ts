// USED IN (katalog)/index.tsx FILE

// Home funciton
export const GetCategoryApi = async () => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL2}products/group`, {
      method: 'GET',
    }).then((data) => data.json())
    return response
  } catch (error) {
    console.log(error)
  }
}
