import { Tabs } from 'expo-router';
import { ClipboardList, Heart, House, ShoppingCart, User } from 'lucide-react-native';
import { Image } from "react-native";

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
          tabBarIcon: ({ focused }) => focused ?  <Image source={require('../../../assets/images/focusedHome.png')} /> : <Image source={require('../../../assets/images/home.png')} /> ,
          headerShown: false,
        
        }}
        
        />

          <Tabs.Screen name="(katalog)"  
       options={{
          title: '',
          tabBarIcon: ({ focused }) => focused ?  <Image source={require('../../../assets/images/focusedCategory.png')} /> : <Image source={require('../../../assets/images/Category.png')} /> ,     
          headerTransparent: true,
          
         
        }}/>

          <Tabs.Screen name="(zbasket)"  
       options={{
          title: '',
          tabBarIcon: ({ focused }) => focused ?  <Image source={require('../../../assets/images/basketdark.png')} style={{width: 24, height: 24}}/> : <Image source={require('../../../assets/images/basketlight.png')} style={{width: 24, height: 24}} />,
          headerShown: false,
        }}/>
    
         <Tabs.Screen name="(zfavourite)"  
       options={{
          title: '',
          tabBarIcon: ({ color }) => <Heart    size={28}  color={color}/>,
          headerShown: false,
        }}/>

          <Tabs.Screen name="(profile)"  
       options={{
          title: '',
          tabBarIcon: ({ focused }) => focused ?  <Image source={require('../../../assets/images/focusedProfile.png')} style={{width: 24, height: 24}}/> : <Image source={require('../../../assets/images/profile.png')} style={{width: 24, height: 24}} /> ,
          headerShown: false,
        }}/>
    </Tabs>
  );
}
