import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Modal ,Pressable, ScrollView, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-neat-date-picker'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdateProfile({navigation,route}) {
  const [fullName, setFullName] = useState(route.params.data.fullname? route.params.data.fullname : '');
  const [email, setEmail] = useState('');
  const [gender,setGender] = useState(route.params.data.gender);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formValid, setFormValid] = useState('');
  const [formSuccess, setFormSucess] = useState('');
  const [success, setSuccess] = useState(false);
  const [phone, setPhone] = useState(route.params.data.fullname? route.params.data.phone : '');
  const [address, setAddress] = useState(route.params.data.fullname? route.params.data.fullname : '');
  const [date, setDate] = useState(route.params.data.fullname? route.params.data.birthday : '')
  const [showDatePickerSingle, setShowDatePickerSingle] = useState(false)
  const openDatePickerSingle = () => setShowDatePickerSingle(true)

    const readToken = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            return storedToken;
        } catch (error) {
            console.error('Error reading token:', error);
            return null;
        }
      };
      
      const handleSubmit = async ()=>{
        const storedToken = await readToken();
          try{
              const res = await axios.put(`https://test5.nhathuoc.store/api/users/change-profile`,
              {
                fullname: fullName,
                gender: gender,
                confirm_password: confirmPassword, 
                phone: phone,
                birthday: date,
              },
              {
                  headers:{
                      'Authorization': `Bearer ${storedToken}`,
                      'Content-Type': 'application/json',
                  }
              })
      
              if(res.data.status_code == 200){
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }], 
              });
              }
              console.log("res",res)
              return;
          }catch(error){
              console.error("error",error)
          }
        }
    const onCancelSingle = () => {
      setShowDatePickerSingle(false)
    }
  
    const onConfirmSingle = (output) => {
      setShowDatePickerSingle(false)
      console.log(output)
      setDate(output.dateString)
    }
      

  return (
    <ScrollView >
    <View style={styles.container}>
      <DatePicker
        isVisible={showDatePickerSingle}
        mode={'single'}
        onCancel={onCancelSingle}
        onConfirm={onConfirmSingle}
      />
          
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={success}
        onRequestClose={() => {
          Alert.alert(formSuccess);
          navigation.replace('Login');
        }}>
          <View style={stylesModal.centeredView}>
            <View style={stylesModal.modalView}>
              <Text style={stylesModal.modalText}>{formSuccess}</Text>
              <Pressable
                style={[stylesModal.button, stylesModal.buttonClose]}
                onPress={() => navigation.replace('Login')}>
                <Text style={stylesModal.textStyle}>Đồng ý</Text>
              </Pressable>
            </View>
          </View>
      </Modal>
      <View style={{
          width: "100%",
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: 20,
          }} >
        {
          formValid &&
            <Text style={{color: "red", opacity: 0.5, marginBottom: 5, fontSize: 18,fontWeight: 500}}>{formValid}</Text>
        }
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={fullName}
          onChangeText={text => setFullName(text)}
        />
        <View style={{
          borderColor: "black", 
          borderWidth: 0.5, 
          width: "100%", 
          marginBottom: 10, 
          borderRadius: 15, 
          backgroundColor: "white",
          }}>
          <RNPickerSelect
            onValueChange={(value) => setGender(value)}
            value={gender}
            items={[
              { label: 'Nam', value: 1 },
              { label: 'Nữ', value: 0 },
            ]}
          />
        </View>
        <TextInput
            style={styles.input}
            placeholder="Số Điện Thoại"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={text => setPhone(text)}
          />
        <TouchableOpacity style={{
            width: '100%',
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 15,
            backgroundColor: "white",
            borderRadius: 15,
            paddingVertical: 15,
          }} onPress={openDatePickerSingle}>
          <Text style={{
            fontSize: 20,
            opacity: 0.5
          }}>{!date?"Nhập Ngày Sinh":date}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          secureTextEntry
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cập Nhật</Text>
        </TouchableOpacity>
      </View>

      <View>
      </View>
    </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    fontWeight: "900",
    color: "gray",
    elevation: 5,
  },
  input: {
    fontSize: 20,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 15,
    },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: "600",
  },
  linkText: {
    color: '#2196F3',
    fontSize: 20,
  },
});

const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingHorizontal: 35
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22
  },
});