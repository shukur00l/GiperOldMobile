import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="profile" 
      options={{ 
    
        title: '',
        headerStyle: {
          backgroundColor: '#5600B3',
        },
        headerTransparent: true,
       
         }} />
    </Stack>
  );
}
