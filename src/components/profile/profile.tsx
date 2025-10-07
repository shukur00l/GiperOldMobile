import { View, Text, Pressable, Image } from 'react-native'
import { Ellipsis, Pen, User, ShieldAlert, Bell, LockKeyhole, CreditCard, BadgeQuestionMark, CircleAlert, Flag, Users, LogOut, LogIn } from 'lucide-react-native';
import React from 'react'
import { router } from 'expo-router'
import { useAuthStore } from '@/src/store/authstore';

  // const ProfilesActions = [
  //   {
  //     Bigtitle: 'Account',
  //     SubTitles:[
  //       //   {
  //       //   title: 'Agza bol',
  //       //   icon: User,
  //       //   url: '/login/signup',
  //       // },
  //       {
  //         title: 'Ulgama gir',
  //         icon: LogIn,
  //         url: '/login/signin',
  //       },
  //       {
  //         title: 'Security',
  //         icon: ShieldAlert,
  //         url: '#'
  //       },
  //     {
  //       title: 'Notifycations',
  //       icon: Bell,
  //       url: '#',
  //     },
  //     {
  //       title: 'Privacy',
  //       icon: LockKeyhole,
  //       url: '#',
  //     }
  //     ] 
  //   },
  //   {
  //     Bigtitle: 'Support & About',
  //     SubTitles:[
  //       {
  //         title: 'My Subscribtion',
  //         icon: CreditCard,
  //         url: '#',
  //       },
  //       {
  //         title: 'Help & Support',
  //         icon: BadgeQuestionMark,
  //         url: '#',
  //       },
  //     {
  //       title: 'Terms and Policies',
  //       icon: CircleAlert,
  //       url: '#',
  //     }
  //     ] 
  //   },
  //      {
  //     Bigtitle: 'Actions',
  //     SubTitles:[
  //       {
  //         title: 'Report a problem',
  //         icon: Flag,
  //         url: '#',
  //       },
  //       {
  //         title: 'Add account',
  //         icon: Users,
  //         url: '#',
  //       },
  //     {
  //       title: 'Ulgamdan çyk',
  //       icon: LogOut,
  //       url: '#',
  //     }
  //     ] 
  //   },
  // ]

  const ProfilesActions = (isLoggedIn: boolean) => [
  {
    Bigtitle: "Account",
    SubTitles: [
      !isLoggedIn && {
        title: "Ulgama gir",
         icon: require('../../../assets/images/Vector.png'),
        url: "/login/signin",
      },
      isLoggedIn && {
        title: "Ulgamdan çyk",
         icon: require('../../../assets/images/Logout.png'),
        url: "#",
      },
      {
        title: "Meniň sargytlarym",
          icon: require('../../../assets/images/MyOrders.png'),
        url: "#",
      },
      {
        title: "Notifycations",
          icon: require('../../../assets/images/Vector.png'),
        url: "#",
      },
      {
        title: "Privacy",
         icon: require('../../../assets/images/Vector.png'),
        url: "#",
      },
    ].filter(
      (x): x is { title: string; icon: any; url: string } => Boolean(x)
    ),
  },
  {
    Bigtitle: "Support & About",
    SubTitles: [
      {
        title: "Notifycations",
         icon: require('../../../assets/images/VectorNot3.png'),
        url: "#",
      },
      {
        title: "Inbox",
       icon: require('../../../assets/images/Vector3.png'),
        url: "#",
      },
      // {
      //   title: "Terms and Policies",
      //   icon: require('../../../assets/images/Vector3.png'),
      //   url: "#",
      // },
         {
        title: "Settings",
        icon: require('../../../assets/images/Vector.png'),
        url: "#",
      },
    ],
  },
  {
    Bigtitle: "Actions",
    SubTitles: [
      {
        title: "Contact Us",
        icon: require('../../../assets/images/Group89.png'),
        url: "#",
      },
    ],
  },
];


// const Profile = () => {
//   return (
//     <View>
      
//        <View className='h-40 w-full items-center relative'>
//        <View className='absolute bg-white h-40 w-40 rounded-full p-4 z-10'>
//       <View className='w-full h-full rounded-full bg-[#D9D9D9]'></View>
//       <View className='absolute w-8 h-8 bg-[#FF8C00] rounded-full top-24 right-2 justify-center items-center'><Pen size={17} color={'white'}/></View>
//       </View>
     
//         <View className='h-20 bg-[#5600B3] w-full'>
//       </View>
//     </View>


//     <View className='w-full items-center flex flex-col'>
//       <Text className='text-[#000] font-semibold text-xl'>Fernandez Williamson</Text>
//       <View className='flex flex-row items-center'>
//         <Text className='text-[#000] font-semibold text-sm'>fernandezwilliamson@example.com</Text>
//         <Ellipsis color={'#FF8C00'} size={20}/>
//         <Text className='text-[#000] font-semibold text-sm'>+99365802929</Text>
//       </View>
      
//     </View>

//       <View className='px-5'>
//         {ProfilesActions.map((item, index) => (
//           <View key={index} className='w-full'>
//             <Text className='text-[#000] font-bold text-lg'>{item.Bigtitle}</Text>
//             {item.SubTitles.map((subItem, subIndex) => (
//               <Pressable key={subIndex} onPress={() => {router.push(subItem.url as any)}} className='w-full items-center flex flex-row  pl-5 py-2 h-10 '>
//                 <subItem.icon color={'#000'} size={20}/>
//                 <Text className='text-[#000] font-semibold text-sm pl-5'>{subItem.title}</Text>          
//               </Pressable>
//             ))}
//           </View>
//         ))}
//       </View>
//     </View>
//   )
// }

const Profile = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  const actions = ProfilesActions(isLoggedIn);

  return (
    <View>
      {/* Профиль пользователя */}
      {/* <View className="h-40 w-full items-center relative">
        <View className="absolute bg-white h-40 w-40 rounded-full p-4 z-10">
          <View className="w-full h-full rounded-full bg-[#D9D9D9]"></View>
          <View className="absolute w-8 h-8 bg-[#FF8C00] rounded-full top-24 right-2 justify-center items-center">
            <Pen size={17} color={"white"} />
          </View>
        </View>
        <View className="h-20 bg-[#5600B3] w-full"></View>
      </View> */}

      {/* <View className="w-full items-center flex flex-col">
        <Text className="text-[#000] font-semibold text-xl">Fernandez Williamson</Text>
        <View className="flex flex-row items-center">
          <Text className="text-[#000] font-semibold text-sm">fernandezwilliamson@example.com</Text>
          <Ellipsis color={"#FF8C00"} size={20} />
          <Text className="text-[#000] font-semibold text-sm">+99365802929</Text>
        </View>
      </View> */}

      {/* Список действий */}
      <View className="px-5 pt-10">
        {actions.map((item, index) => (
          <View key={index} className="w-full border-b-[1px]">
            
            {item.SubTitles.map((subItem, subIndex) => (
              <Pressable
                key={subIndex}
                onPress={() => {
                  if (subItem.title === "Ulgamdan çyk") {
                    setLoggedIn(false); // выйти из системы
                  } else if (subItem.title === "Ulgama gir") {
                    router.push(subItem.url as any);
                  } else {
                    router.push(subItem.url as any);
                  }
                }}
                className="w-full items-center flex flex-row pl-5 py-2 h-10 mt-5"
              >
                <Image source={subItem.icon} className="w-7 h-7" />
                <Text className="text-[#000] font-semibold text-sm pl-5">{subItem.title}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Profile