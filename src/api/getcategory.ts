// USED IN (katalog)/index.tsx FILE

// Category funciton
export const GetCategoryKatalogApi = async () => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL1}category/hierarchy`, {
      method: 'GET',
    }).then((data) => data.json())
    return response
  } catch (error) {
    console.log(error)
  }
}
