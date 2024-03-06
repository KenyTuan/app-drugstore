import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Modal ,Pressable } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender,setGender] = useState(1);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formValid, setFormValid] = useState('');
  const [formSuccess, setFormSucess] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    const data = 
      {
        email: email,
        fullname: fullName,
        gender: gender,
        password: password,
        confirm_password: confirmPassword, 
      }
    
    console.log(data)
    const response = await postData("https://test5.nhathuoc.store/api/users/register", data);
    console.log(response.status_code)

    if(response.status_code === 200){
      setFormSucess(response.message)
      setFormValid(null)
      setSuccess(true)
      console.log(response.message)
      return;
    }

    const dataRes = response.data
    console.log(dataRes)
    setFormValid(dataRes[0]);

  };

  async function postData(url, data = {}) {
    const response = await fetch(url, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    });

    return response.json();
  }

  return (
    
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={success}
        onRequestClose={() => {
          Alert.alert(formSuccess);
          navigation.navigate('Login');
        }}>
          <View style={stylesModal.centeredView}>
            <View style={stylesModal.modalView}>
              <Text style={stylesModal.modalText}>{formSuccess}</Text>
              <Pressable
                style={[stylesModal.button, stylesModal.buttonClose]}
                onPress={() => navigation.navigate('Login')}>
                <Text style={stylesModal.textStyle}>Đồng ý</Text>
              </Pressable>
            </View>
          </View>
      </Modal>
      <View style={{ 
          flexDirection: "row",
          marginBottom: 25, 
          padding: 50, 
          backgroundColor: "#2196F3",
          width: "100%" ,
          alignItems: "center", 
          justifyContent: "center", 
          elevation: 5,
          borderWidth: 1,
          }}>
          <Text style={{
            fontSize: 36, 
            color: "white", 
            fontWeight: 600
            }}>
              Medicine
          </Text>
          <Text style={{
            fontSize: 28, 
            color: "green", 
            fontWeight: 600
            }}>
              Mart
          </Text>
      </View>
      <View style={{
        width: "100%",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 20,
        }}>
        <Text style={styles.title}>Đăng Ký</Text>
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
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          secureTextEntry
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Đăng Ký</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{    borderColor: "#2196F3",borderWidth: 1,width: "100%", justifyContent: 'center', alignItems: "center",paddingVertical: 10,}}>
          <Text style={styles.linkText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
      <View>

      </View>
    </View>
  );
};

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

export default RegisterScreen;
