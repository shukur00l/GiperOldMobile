import { Stack } from 'expo-router';

export default function CategoriLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" 
      options={{ 
    
        title: '',
        headerStyle: {
       
        },
        headerTransparent: true,
       
         }} />
      <Stack.Screen name="subcategory" 
      options={{ 
    
        title: '',
        headerStyle: {
          
        },
        headerTransparent: true,
       
         }} />
    </Stack>
  );
}
