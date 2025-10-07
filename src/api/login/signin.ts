// USED IN login.tsx FILE

// authorization funciton
export const authentication = async (phoneNumber: string,) => {
    const username = `993${phoneNumber}`
    const loginType = "phoneNumber"
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL1}profile/register`, {
      method: 'POST',
      body: JSON.stringify({
        loginType,
        username
      }),
    }).then((data) => data.json())
    return response
  } catch (error) {
    console.log(error)
  }
}
