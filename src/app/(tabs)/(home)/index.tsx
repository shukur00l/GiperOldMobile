import React from "react"
import { SafeAreaView } from 'react-native-safe-area-context';
import MainScreen from "@/src/components/home/cardspisok";
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {



  return (
    <SafeAreaView className="h-full bg-white mt-20 pb-20"> 
      <StatusBar style="dark" />
      <MainScreen/>
    </SafeAreaView>
  );
}
