import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import '../../global.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from 'react';
const queryClient = new QueryClient();

SplashScreen.setOptions({
    duration: 1000,
  fade: false,
});

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded] = useFonts({
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

   return (
     <QueryClientProvider client={queryClient}>
    <SafeAreaProvider>   
       <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
    </SafeAreaProvider>
       </QueryClientProvider>
  );
}



