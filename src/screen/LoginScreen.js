import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal,Pressable  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setFormValid] = useState('');
  const [formSuccess, setFormSucess] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async () => {
    const data = 
    {
      email: username,
      password: password,
    }
  
    console.log(data)
    const response = await postData("https://test5.nhathuoc.store/api/users/login", data);
    console.log(response.status_code)

    if(response.status_code === 200){
      await AsyncStorage.setItem('token', response.token);
      setFormValid(null)
      setFormSucess("Success!")
      setSuccess(true)
      return;
    }

    const dataRes = response.data
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
          navigation.navigate('Home');
        }}>
          <View style={stylesModal.centeredView}>
            <View style={stylesModal.modalView}>
              <Text style={stylesModal.modalText}>{formSuccess}</Text>
              <Pressable
                style={[stylesModal.button, stylesModal.buttonClose]}
                onPress={() => 
                  navigation.goBack()
                }>
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
        <Text style={styles.title}>Đăng Nhập</Text>
        {
          formValid &&
            <Text style={{color: "red", opacity: 0.5, marginBottom: 5, fontSize: 18,fontWeight: 500}}>{formValid}</Text>
        }
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
          <View style={{flexDirection: "col",width:"100%"}}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Đăng Nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonOutlineText}>Quay lại</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký ngay</Text>
          </TouchableOpacity>
            
        <View/>
      </View>
      <View></View>
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
  buttonOutline: {
    borderColor: '#2196F3',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonOutlineText: {
    color: '#2196F3',
    fontSize: 20,
    fontWeight: "600",
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

export default LoginScreen;
