import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditAddressScreen({navigation, route}) {
  const [address_receiver,setAddress_Receiver] = React.useState(route.params?.receiver.address.split(", "))
  const [name, setName] = React.useState(!route.params.receiver.receiver_name ? '' : route.params.receiver.receiver_name);
  const [phone, setPhone] = React.useState(!route.params.receiver.phone ? '' : route.params.receiver.phone);
  const [address, setAddress] = React.useState(!address_receiver[0] ? '' : address_receiver[0]);
  const [area, setArea] = React.useState();
  const [apply,setApply] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [id,setId] = React.useState(route.params?.receiver?.id)

  React.useEffect(() => {
    const areFieldsFilled = name.trim() !== '' && phone.trim() !== '' && address.trim() !== '' && password.trim();
    setApply(areFieldsFilled);
  }, [name, phone, address,password]);

  React.useEffect(
    ()=> {
      const fetchData = async () =>{
          setAddress_Receiver(route.params?.receiver.address.split(", "))
      }
      fetchData()
    },[]
  )


  useFocusEffect(
    React.useCallback(
       ()=> {
        const fetchData = async () =>{
          const sortedProvinces = await fetchProvinces();
          const province_selected = sortedProvinces.filter(
            (province)=>(
              province.province_name == address_receiver[3]
            )
          )
          
          
          const district_1 = await fetchDistrict(province_selected[0].province_id)
          
          const district_selected = district_1.filter(
            (district)=>(
              district.district_name == address_receiver[2]
            )
          )
          const ward_1 = await fetchWard(district_selected[0].district_id)
          
          const ward_selected = ward_1.filter(
            (ward)=>(
              ward.ward_name === address_receiver[1]
            )
          )

          const areas = [province_selected[0],district_selected[0],ward_selected[0]]
          setArea(areas)
        }
        fetchData()
      },[]
    )
  )

  const fetchProvinces = async () => {
    try {
      const response = await fetch('https://vapi.vnappmob.com/api/province');
      const data = await response.json();

      const modifiedProvinces = data.results.map(province => {
        if (province.province_name.includes('Tỉnh ')) {
          province.province_name = province.province_name.replace('Tỉnh ', '');
        } else if ( province.province_name.includes('Thành phố ')) {
          province.province_name = province.province_name.replace('Thành phố ', 'TP. ');
        }
        return province;
      });

      const sortedProvinces = modifiedProvinces.slice().sort((a, b) => a.province_name.localeCompare(b.province_name));
      
      return sortedProvinces
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  const fetchDistrict = async (id) => {
    try {
      const response = await fetch('https://vapi.vnappmob.com/api/province/district/' + id);
      const data = await response.json();

      return data.results
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  const fetchWard = async (id) => {
    try {
      const response = await fetch('https://vapi.vnappmob.com/api/province/ward/' + id);
      const data = await response.json();

      return data.results
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  const readToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      return storedToken;
    } catch (error) {
      console.error('Error reading token:', error);
      return null;
    }
  };

  const handleDelete = async ()=>{
    const storedToken = await readToken();
    console.log("storedToken",storedToken)
    try{
        const res = await axios.post(`https://test5.nhathuoc.store/api/users/delete-address/${id}`,
        {
          user_id: route.params.receiver.user_id 
        },
        {
            headers:{
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
            }
        })
        console.log("res",res)

        if(res.data.status_code == 200){
          navigation.navigate("Address")
        }
        return;
    }catch(error){
        console.error("error",error)
    }
  }

  const handleSubmit = async ()=>{
    const storedToken = await readToken();
    try{
        const res = await axios.put(`https://test5.nhathuoc.store/api/users/edit-address/${id}`,
        {
          receiver_name: name,
          phone: phone,
          address: address + ", " + area[2].ward_name + ", " + area[1].district_name + ", " +  area[0].province_name,
          confirm_password: password
        },
        {
            headers:{
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
            }
        })

        if(res.data.status_code == 200){
          navigation.navigate("Address")
        }
        console.log("res",res)
        return;
    }catch(error){
        console.error("error",error)
    }
  }


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
      <TextInput
        style={{
          backgroundColor: "#FFF",
          padding: 10,
          borderWidth: 1,
          fontSize: 18,
          borderColor: "#EEEEEE",
          marginBottom: 0.5,
        }}
        placeholder='Xác thực mật khẩu'
        value={password}
        onChangeText={(text) => setPassword(text)}
        keyboardType='numeric'
      />
      <Text style={{padding: 10,}}>
          Địa chỉ
      </Text>
      <TouchableOpacity  onPress={()=>{navigation.replace("ChooseEditArea",{data: area,receiver: route.params?.receiver})}}>
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

      <TouchableOpacity  onPress={handleSubmit}>
        <View style={{
            backgroundColor: "#0198d7",
            padding: 10,
            elevation: 2,
            marginBottom: 15
        }}>
          <Text style={{
              fontSize: 18,
              paddingBottom: 5,
              textAlign: "center",
              color: "#fff",
              fontWeight: "800"
          }}>
              Cập Nhật
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleDelete}>
        <View style={{
            backgroundColor: "white",
            padding: 10,
            elevation: 2,
        }}
        >
          <Text style={{
              fontSize: 16,
              paddingBottom: 5,
              textAlign: "center",
              color: "#0198d7"
          }}
          >
              Xóa địa chỉ
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
