// USED IN logout.tsx FILE

// logout funciton
export const logout = async () => {
    const token = `token=${localStorage.getItem("access")}`
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL1}profile/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer${token}`,
      },
      body: JSON.stringify({
      token
      }),
    }).then((data) => data.json())
    return response
  } catch (error) {
    console.log(error)
  }
}
