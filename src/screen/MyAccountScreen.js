import React from 'react';
import { Modal,Pressable,View, Text, StyleSheet, TouchableOpacity, Touchable, TouchableHighlight } from 'react-native';
import { Ionicons, AntDesign, MaterialIcons, FontAwesome   } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function MyAccountScreen({ navigation, route }) {
  const [token,setToken] = React.useState()
  const [user, setUser] = React.useState({})
  const [success, setSuccess] = React.useState(false)
  const [formSuccess, setFormSucess] = React.useState('');

  const readToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      return storedToken;
    } catch (error) {
      console.error('Error reading token:', error);
      return null;
    }
  };

  const fetchData = async () => {
    try {
      const data = await readToken();
      console.log("data", data);
        setToken(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  React.useEffect(() => {
    fetchData();
  }, []);

  const Getdata = async() =>{
    try{
      const storedToken = await readToken();
      console.log("data",storedToken)

      if (!!storedToken) {
        setToken(storedToken); 
        const res = await axios.get(`https://test5.nhathuoc.store/api/users/profile-for-app`,{
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        })

        console.log("data",res.data)
        return res.data
      }
    }catch(error){
      console.error("e",error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
            const data = await Getdata();
            if(!!data){
              setUser(data.data);
              return
            }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          console.log('Màn hình sẽ mất focus');
        }
      };
      fetchData();
    }, [])
  );
  
  async function portData(url) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });
      return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  }

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      fetchData()
      console.log('Token removed successfully');
    } catch (error) {
      console.error('Error removing token:', error);

    }
  };

  const handleLogOut = async () => {
    const response = await portData("https://test5.nhathuoc.store/api/users/logout");
    removeToken();
    if (response.status_code == 200) {
      setFormSucess(response.message);
      setSuccess(true);
      return;
    }
  }

  return (
    <View style={{ flex: 1, }}>
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
                onPress={()=>{setSuccess(false);navigation.navigate('HomeTab')}}>
                <Text style={stylesModal.textStyle}>Đồng ý</Text>
              </Pressable>
            </View>
          </View>
      </Modal>
      <View style={{marginBottom: 10,paddingTop: 50, paddingBottom: 10,backgroundColor: "#0198d7", alignItems: "center"}}>
          <TouchableHighlight>
            <View style={{alignItems: "center"}}>
              <View style={{width: 75,height: 75,padding: 10, borderRadius: 50, backgroundColor: "#FFF",justifyContent: "center", alignItems: "center"}}>
                <Ionicons name="person" size={50} color="#0198d7" />
              </View>
              {
                token && (
                  <Text style={{fontSize: 20, textAlign: "center", color: "#FFF"}}>
                    {user?.fullname}
                  </Text>
                )
              }

            </View>
          </TouchableHighlight>
      </View>

      <View style={{ flex: 2, backgroundColor: "#EEE"}}>
        {
          !token &&
          (
            <View style={{ flex: 2, backgroundColor: "#EEE"}}>
              <TouchableHighlight onPress={() => navigation.navigate("Login")}>
                <View style={{padding: 10, flexDirection: "row", backgroundColor: "#FFF", marginBottom: 5 }}>
                <AntDesign name="login" size={24} color="black" style={{padding: 5}}/>
                  <Text style={{flex: 1,fontSize: 18, padding: 5}}>Đăng Nhập</Text>
                  <AntDesign name="right" size={24} color="black" style={{padding: 5}} />
                </View>
              </TouchableHighlight>
            </View>            
          )
        }
        {
          token &&
          (
            <View style={{ flex: 2, backgroundColor: "#EEE"}}>
              <TouchableHighlight onPress={() => navigation.navigate("Profile", {data: user})}>
                <View style={{padding: 10, flexDirection: "row", backgroundColor: "#FFF", marginBottom: 5 }}>
                  <MaterialIcons name="account-box" size={24} color="black" style={{padding: 5}} />
                  <Text style={{flex: 1,fontSize: 18, padding: 5}}>Tài Khoản</Text>
                  <AntDesign name="right" size={24} color="black" style={{padding: 5}} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight  onPress={() => navigation.navigate("ListOrder")}>
                <View style={{padding: 10, flexDirection: "row", backgroundColor: "#FFF", marginBottom: 5 }}>
                  <AntDesign name="calendar" size={24} color="black" style={{padding: 5}} />
                  <Text style={{flex: 1,fontSize: 18, padding: 5}}>Đơn Hàng</Text>
                  <AntDesign name="right" size={24} color="black" style={{padding: 5}} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => navigation.navigate("Address")}>
                <View style={{padding: 10, flexDirection: "row", backgroundColor: "#FFF", marginBottom: 5 }}>
                <FontAwesome name="address-book-o" size={24} color="black" style={{padding: 5}} />
                  <Text style={{flex: 1,fontSize: 18, padding: 5}}>Địa Chỉ</Text>
                  <AntDesign name="right" size={24} color="black" style={{padding: 5}} />
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={handleLogOut}>
              <View style={{padding: 10, flexDirection: "row", backgroundColor: "#FFF", marginBottom: 5 }}>
              <Ionicons name="exit-outline" size={24} color="black" style={{padding: 5}} />
                <Text style={{flex: 1,fontSize: 18, padding: 5}}>Đăng Xuất</Text>
                <AntDesign name="right" size={24} color="black" style={{padding: 5}} />
              </View>
            </TouchableHighlight>
            </View>
          )
        }
      </View>
    </View>
  );
};

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