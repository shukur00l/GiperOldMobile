import { TreshBasketApi } from '@/src/api/trashbasket';
import { Stack } from 'expo-router';
import { ArrowLeft, Trash } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

export default function BasketLayout() {
  const [visible, setVisible] = useState(false);
  

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: '',
            headerLeft: () => <Text className="text-[18px] font-bold ml-5">Sebet</Text>,
            headerRight: () => (
              <Pressable onPress={() => setVisible(true)}>
                <Trash />
              </Pressable>
            ),
          }}
        />

           <Stack.Screen
          name="chekout"
          options={{
            title: '',
            headerLeft: () => <Text className="text-[18px] font-bold ml-5">Barlag</Text>
          }}
        />
      </Stack>

      <Modal visible={visible} animationType="none" transparent={true}>
        <View className="bg-[#000000] bg-opacity-[0.5] h-full w-full items-center justify-center">
          <View className="bg-white px-5 w-full h-60  justify-center items-center">
          

            <Text className="text-[14px] mt-[5px] h-10 font-bold">
             Sebediňizdäki ähli harytlary pozmalymy?
            </Text>

            <View className='flex flex-row justify-between w-full'>
               <Pressable
              className="w-40 h-12 bg-white mt-8 rounded-[10px] flex items-center justify-center border-2 border-[#5600B3]"
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text className="text-[#5600B3] text-[14px]">Yza</Text>
            </Pressable>

            <Pressable
              className="w-40 h-12 bg-red-600 mt-8 rounded-[10px] flex items-center justify-center"
              onPress={() => {
                TreshBasketApi();
                setVisible(false);
              }}
            >
              <Text className="text-white text-[14px]">Poz</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}