import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { useDeliveryStore } from "@/src/store/useDeliveryStore";
import { ChekoutApi } from "@/src/api/chekout";

const Chekout = () => {
  const [selectedTime, setSelectedTime] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [telephone, setTelephone] = useState<number>(0);
  const [address, setAddress] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const deliveryTimesToday = useDeliveryStore(
    (state) => state.deliveryTimesToday
  );
  const deliveryTimesTomorrow = useDeliveryStore(
    (state) => state.deliveryTimesTomorrow
  );
  const code = useDeliveryStore(
    (state) => state.code
  );


    const renderDeliveryItem = (item: any) => (
        
    <TouchableOpacity
      style={{
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5,
        backgroundColor: selectedTime?.id === item.id ? "#D0E8FF" : "#fff",
      }}
      onPress={() => setSelectedTime(item)}
    >
      <Text>{item.startTime} - {item.endTime}</Text>
      <Text style={{ fontSize: 12, color: "gray" }}>
        Last order: {item.lastTime}
      </Text>
    </TouchableOpacity>
  );

  const handleCheckout = async () => {
    if (!selectedTime || !name || !telephone || !address) {
      alert("Please fill in all fields");
    }else{
      const response = await ChekoutApi(selectedTime.id, address, name, telephone, comment, code)
      if(response?.success){
        alert('Sargyt kabul edildi')
      }
    }
  };
  
  return (
    <ScrollView className="h-full w-full bg-white px-5 ">
      {/* Заголовок */}
      <Text className="text-[15px] font-semibold ml-5 mt-5">
        Salgyňyzy goşuň
      </Text>

      {/* Имя */}
      <View>
        <Text className="text-[12px] font-semibold mt-5">
          Adyňyz Familiýaşyz
        </Text>
        <TextInput
          className="border-[1px] rounded-lg h-12 pl-5"
          placeholder="Aman Amanow"
          onChangeText={(text) => setName(text)}
        />
      </View>

      {/* Телефон */}
      <View className="mt-5">
        <Text className="text-[12px] font-semibold mb-2">
          El telefonyňyz
        </Text>
        <View className="flex-row items-center border-[1px] rounded-lg h-12 px-3">
          <Text className="text-gray-500 text-[16px] font-medium mr-2">
            +993
          </Text>
          <TextInput
            className="flex-1 text-[16px]"
            keyboardType="number-pad"
            placeholder="XXXXXXXX"
            maxLength={8}
            onChangeText={(text) => setTelephone(Number(text))}
          />
        </View>
      </View>

      {/* Адрес */}
      {/* <View>
        <Text className="text-[12px] font-semibold mt-5">
          Öý we köçe
        </Text>
        <TextInput
          className="border-[1px] rounded-lg h-20 pl-5"
          placeholder="Aşgabat Parahat7"
        />
      </View> */}

      {/* Город и Велаят */}
      {/* <View className="flex flex-row justify-between items-center">
        <View className="w-52">
          <Text className="text-[12px] font-semibold mt-5">Şäher</Text>
          <TextInput
            className="border-[1px] rounded-lg h-20 pl-5"
            placeholder="Aşgabat"
          />
        </View>

        <View className="w-52">
          <Text className="text-[12px] font-semibold mt-5">Welaýat</Text>
          <TextInput
            className="border-[1px] rounded-lg h-20 pl-5"
            placeholder="Ahal"
          />
        </View>
      </View> */}


 <View>
        <Text className="text-[12px] font-semibold mt-5">
          Adress
        </Text>
        <TextInput
          className="border-[1px] rounded-lg h-12 pl-5"
          placeholder=""
          onChangeText={(text) => setAddress(text)}
        />
      </View>

      {/* Комментарий */}
      <View>
        <Text className="text-[12px] font-semibold mt-5">
          Goşmaça teswir
        </Text>
        <TextInput
          className="border-[1px] rounded-lg h-20 pl-5"
          placeholder=""
          onChangeText={(text) => setComment(text)}
        />
      </View>

      {/* Время доставки */}
   <View style={{ padding: 16 }}>
       

        {deliveryTimesToday.map((item) => (
            <View key={item.id}>
                 <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
          Сегодня
        </Text>
          <View key={item.id}>
            {renderDeliveryItem(item)}
          </View>
          </View>
        ))}

        <Text style={{ fontWeight: "bold", marginVertical: 8 }}>
          Завтра
        </Text>

        {deliveryTimesTomorrow.map((item) => (
          <View key={item.id}>
            {renderDeliveryItem(item)}
          </View>
        ))}
     
    </View>
        <Pressable
          className="w-full h-12 bg-[#5600B3] rounded-[10px] flex items-center justify-center mb-20"
          onPress={handleCheckout}
        >
          <Text className="text-white text-[14px]">Sarga</Text>
        </Pressable>
 
    </ScrollView>
  );
};

export default Chekout;