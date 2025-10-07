import React from "react"
import { SafeAreaView } from 'react-native-safe-area-context';
import MainScreen from "@/src/components/home/cardspisok";


export default function HomeScreen() {



  return (
    <SafeAreaView className="h-full bg-white pt-20"> 
      <MainScreen/>
    </SafeAreaView>
  );
}
