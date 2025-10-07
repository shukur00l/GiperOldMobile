// Use in (home) screen

export const getSpuList = async () => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-token': `${process.env.EXPO_PUBLIC_API_KEY}`,
      },
      body: JSON.stringify({   
        "startId": 0,
        "pageSize": 200,
        "querySku": false
      }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}