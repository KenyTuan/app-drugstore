import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function AddAddressScreen({navigation , route}) {

  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [area, setArea] = React.useState(route.params?.data);
  const [apply,setApply] = React.useState(false);

  console.log(area)

  React.useEffect(() => {
    const areFieldsFilled = name.trim() !== '' && phone.trim() !== '' && address.trim() !== '';
    setApply(areFieldsFilled);
  }, [name, phone, address]);

  React.useEffect(() => {
    setArea(route.params?.data);
  }, [route.params?.data]);
  return (
    <View style={{ flex: 1, backgroundColor: "#EEEEEE", }}>
      <Text style={{padding: 10,}}>
          Liên hệ
      </Text>
      <TextInput
        style={{
          backgroundColor: "#FFF",
          padding: 10,
          borderWidth: 1,
          fontSize: 18,
          borderColor: "#EEEEEE",
          marginBottom: 0.5,
        }}
        placeholder='Họ và tên'
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={{
          backgroundColor: "#FFF",
          padding: 10,
          borderWidth: 1,
          fontSize: 18,
          borderColor: "#EEEEEE",
          marginBottom: 0.5,
        }}
        placeholder='Số điện thoại'
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType='numeric'
      />
      <Text style={{padding: 10,}}>
          Địa chỉ
      </Text>
      <TouchableOpacity  onPress={()=>{navigation.navigate("ChooseArea",{data: area})}}>
        <View style={{
            flexDirection: "row",
            backgroundColor: "white",
            padding: 10,
            borderBottomWidth: 0.5,
        }}>
          {(area) ? (
            <View style={{flex: 1,}}>
              <Text style={{
                fontSize: 16,
                paddingBottom: 5,
              }}>
                {area[0]?.province_name}
              </Text>
              <Text style={{
                fontSize: 16,
                paddingBottom: 5,
              }}>
                {area[1]?.district_name}
              </Text>
              <Text style={{
                fontSize: 16,
                paddingBottom: 5,
              }}>
                {area[2]?.ward_name}
              </Text>
            </View>
          ):(
            <View style={{flex: 1,}}>
              <Text style={{
                fontSize: 16,
                paddingBottom: 5,
              }}>
                Chọn khu vực 
              </Text>
          </View>
              )}
                
            <View style={{justifyContent: "center"}}>
              <AntDesign name="right" size={24}  color="black" />
            </View>
        </View>
      </TouchableOpacity>

      <TextInput
        style={{
          backgroundColor: "#FFF",
          padding: 10,
          borderWidth: 1,
          fontSize: 18,
          borderColor: "#EEEEEE",
          marginBottom: 30,
        }}
        placeholder='Tên đường, Tòa nhà, Số nhà'
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      <TouchableOpacity  onPress={()=>{navigation.navigate("Address")}} disabled={!apply}>
        <View style={{
            backgroundColor: (apply)? "#0198d7" : "#ddd",
            padding: 10,
            elevation: 2,
        }}>
          <Text style={{
              fontSize: 16,
              paddingBottom: 5,
              textAlign: "center",
              color: (apply)? "#fff" : "#bbb"
          }}>
              HOÀN THÀNH
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
