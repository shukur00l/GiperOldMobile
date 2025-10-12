import { TabBasketActive, TabBasketPassive, TabCategoryActive, TabCategoryPassive, TabHomeActive, TabHomePassive, TabProfileActive, TabProfilePassive } from '@/src/utils/svg';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  
  return (
    <Tabs
     backBehavior="initialRoute"
     initialRouteName="(home)"
     screenOptions={{
      tabBarActiveTintColor: '#5600B3',
      tabBarInactiveTintColor: '#BABDED',
      tabBarStyle: {
        backgroundColor: '#FBF8FF',
      },
     }}
     >
      <Tabs.Screen name="(home)"
      options={{
          title: '',
          tabBarIcon: ({ focused }) => focused ?  <TabHomeActive/> : <TabHomePassive/> ,
          headerShown: false,
        
        }}
        
        />

          <Tabs.Screen name="(katalog)"  
       options={{
          title: '',
          tabBarIcon: ({ focused }) => focused ?  <TabCategoryActive/> : <TabCategoryPassive/> ,     
          headerTransparent: true,
          
         
        }}/>

          <Tabs.Screen name="(zbasket)"  
       options={{
          title: '',
          tabBarIcon: ({ focused }) => focused ?  <TabBasketActive/> : <TabBasketPassive/>,
          headerShown: false,
        }}/>
    

          <Tabs.Screen name="(profile)"  
       options={{
          title: '',
          tabBarIcon: ({ focused }) => focused ?  <TabProfileActive/> : <TabProfilePassive/> ,
          headerShown: false,
        }}/>
    </Tabs>
  );
}
