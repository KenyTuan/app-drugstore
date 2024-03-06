import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function EditAddressScreen({navigation}) {

  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');

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
      />
      <Text style={{padding: 10,}}>
          Địa chỉ
      </Text>
      <TouchableOpacity  onPress={()=>{navigation.navigate("ChooseArea")}}>
        <View style={{
            flexDirection: "row",
            backgroundColor: "white",
            padding: 10,
            borderBottomWidth: 0.5,
        }}>
            <View style={{flex: 1,}}>
                <Text style={{
                    fontSize: 16,
                    paddingBottom: 5,
                }}>
                    Bình Thuận
                </Text>
                <Text style={{
                    fontSize: 16,
                    paddingBottom: 5,
                }}>
                    Tp. Phan Thiết
                </Text>
                <Text style={{
                    fontSize: 16,
                    paddingBottom: 5,
                }}>
                    Phường Phú Trinh
                </Text>
            </View>
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

      <TouchableOpacity  onPress={()=>{navigation.navigate("Address")}}>
        <View style={{
            backgroundColor: "white",
            padding: 10,
            elevation: 2,
        }}>
          <Text style={{
              fontSize: 16,
              paddingBottom: 5,
              textAlign: "center",
              color: "#0198d7"
          }}>
              Xóa địa chỉ
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
