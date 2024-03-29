import React from 'react'
import { View, Text, TouchableHighlight, Image, ScrollView, SafeAreaView, TextInput,FlatList, Modal, Pressable} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function HomeScreen({ navigation }) {
  const [products,setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [types,setTypes] = React.useState([]);
  const [login, setLogin] = React.useState(false)

  const Getdata = async() =>{
    try{
      const res = await axios.get(`https://test5.nhathuoc.store/api/products/show-for-app`)
      return res.data
    }catch(error){
      console.error("e",error)
    }
  }

  React.useEffect( () => {
    const fetchData = async () => {
      const data = await Getdata();
      console.log("Data:", data);
      setProducts(data.data)
    };
    fetchData();
    
  }, []);

  // React.useEffect(() => {
  //   // const fetchDataProductType = async () => {
  //   //   try {
  //   //     const response = await fetch('https://test5.nhathuoc.store/api/product-types/show');
  //   //     const result = await response.json();
    
  //   //     setTypes(result.data);
  //   //     setLoading(false);

  //   //   } catch (error) {
  //   //     console.error('Error fetching data:', error);
  //   //     setLoading(false);
  //   //   }
  //   // };

  //   const data = Getdata();
  //   console.log(data);
  //   // fetchDataProductType();
  // }, []);

  const readToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      return storedToken;
    } catch (error) {
      console.error('Error reading token:', error);
      return null;
    }
  };

  const handleClickCart = async () => {
    const storedToken = await readToken();
    if (!storedToken) {
      setLogin(true)
      return;
    }
    navigation.navigate('ShoppingCart');
  }


  const renderItem = ({ item }) => (
    <View style={{ width: 100,padding: 10, marginHorizontal: 5, justifyContent: 'center', borderWidth: 0.5, borderBottomColor: '#ccc', borderRadius: 10,backgroundColor: "#0198d7"}}>
      <Text style={{color:"#fff", textAlign: 'center',fontWeight: 500}}>{item.name}</Text>
    </View>
  );

  const renderItemProduct = ({ item }) => (
    <View style={{ marginHorizontal: 5,width: 175, marginBottom: 8}} >
      <TouchableHighlight onPress={() => {navigation.navigate('ProductDetail', { id: item })}} underlayColor="#DDDDDD">
        <View style={{ padding: 10, justifyContent: 'center', borderWidth: 0.5, borderBottomColor: '#ccc', borderRadius: 10}}>
          <View style={{padding: 5}}>
            <Image source={{uri: 'https://test5.nhathuoc.store/storage/images/products/'+ item.img}} style={{ height: 150}}/>
          </View>
          <View style={{paddingHorizontal: 2, marginBottom: 5}}>
            <Text numberOfLines={2} style={{ textAlign: 'center',fontWeight: 300, fontSize: 16,flexWrap: 'wrap'}}>{item.name}</Text>
          </View>
          <View style={{paddingHorizontal: 10, marginBottom: 5}}>
            <Text style={{ fontWeight: 500, fontSize: 16}}>{item.price}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );

  return (
    <SafeAreaView style={{
      backgroundColor: "#fff",
      flex: 1, 
      justifyContent: 'space-between',
      }}>
      <ScrollView >
      <Modal
          animationType="slide"
          transparent={true}
          visible={login}
          >
            <View style={stylesModal.centeredView}>
              <View style={stylesModal.modalView}>
                <Text style={stylesModal.modalText}>Bạn Chưa Đăng Nhập!</Text>
                <Pressable
                  style={[stylesModal.button, stylesModal.buttonClose]}
                  onPress={()=>{setLogin(false); navigation.navigate("Login")}}>
                  <Text style={stylesModal.textStyle}>Đồng ý</Text>
                </Pressable>
              </View>
            </View>
        </Modal>
      <View style={{
        display: 'flex',
        flexDirection: 'row' , 
        justifyContent: 'space-between',
        height: 200, 
        backgroundColor: "#0198d7", 
        paddingTop: 25, 
        padding: 8,
        borderBottomEndRadius: 50,
        borderBottomStartRadius: 50,
        }}>
        <View style={{
          display: 'flex', 
          alignContent: 'center', 
          flexDirection: "row", 
          height: "100%", 
          paddingTop: 50,
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
          marginTop: 20, 
          marginRight: 10,
          }}>
          <TouchableHighlight
            onPress={handleClickCart} 
            style={{
              borderRadius: 10,
            }}>
            <View style={{
              backgroundColor: 'white',
              paddingRight: 18,
              paddingLeft: 18,
              paddingVertical: 14, 
              borderRadius: 10,
              display: 'flex', 
              borderWidth: 1,
              borderColor: '#0072bc',
              flexDirection: "row"
              }}>
              <AntDesign 
                name="shoppingcart" 
                size={24} 
                color="#0072bc" 
              />
              {/* <Text style={{
                color: "white", 
                fontSize: 13, 
                fontWeight: "300", 
                marginTop: -7,
                textAlign: "center",
                height: 18,
                width: 18, 
                backgroundColor: '#fa624a',
                borderRadius: 25
                }}>
                  11
              </Text> */}
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <View style={{
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column'
        }}>
        <View style={{
          flex: 1, 
          paddingHorizontal: "5%",
          marginBottom: 15,
          }}>
          <View style={{
            backgroundColor: "#FFF", 
            borderWidth: 0.5, 
            marginTop: -50, 
            borderRadius: 20, 
            padding: 5
            }} >
            <View style={{
              paddingVertical: 10,
              paddingHorizontal: 20
              }} >
                <TouchableHighlight 
                  onPress={() => {navigation.navigate('Search')}}
                >
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 15,
                    paddingVertical: 6,
                  }}>
                    <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      opacity: 0.5,
                    }}
                    >
                      Bạn cần tìm....
                    </Text>
                    <AntDesign 
                      name="search1" 
                      size={16} 
                      color="black" 
                    />
                  </View>
                </TouchableHighlight>
              
            </View>
            <View style={{padding: 5}}>
                <FlatList
                  data={types}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingVertical: 10 }}
                />
            </View>
          </View>
        </View>

        <View style={{}}>
            <View style={{flex: 1, marginBottom: 10, paddingVertical: 10, borderWidth: 0.8, borderColor: "#ccc"}}>
              <View style={{backgroundColor: "#ccc", padding: 5, paddingLeft: 15, borderRadius: 5,marginBottom: 5}}>
                <Text style={{fontSize: 25, fontWeight: 500, color: 'red'}}>
                    TOP BÁN CHẠY
                </Text>
              </View>

              <View style={{padding:5, marginBottom: 5}}>
                <FlatList
                    data={products.slice(0, 5)}
                    renderItem={renderItemProduct}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 10 }}
                  />
              </View>
            </View>
            <View style={{flex: 1, marginBottom: 10, paddingVertical: 10, borderWidth: 0.8, borderColor: "#ccc"}}>
              <View style={{backgroundColor: "#ccc", padding: 5, paddingLeft: 15, borderRadius: 5,marginBottom: 5}}>
                <Text style={{fontSize: 25, fontWeight: 500, color: 'red'}}>
                    Sản Phẩm Đề Cử
                </Text>
              </View>

              <View style={{padding:5, marginBottom: 5}}>
                <FlatList
                    data={products.slice(3, 8)}
                    renderItem={renderItemProduct}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 10 }}
                  />
              </View>
            </View>

            <View style={{flex: 1, marginBottom: 10, paddingVertical: 10, borderWidth: 0.8, borderColor: "#ccc"}}>
              <View style={{backgroundColor: "#ccc", padding: 5, paddingLeft: 15, borderRadius: 5,marginBottom: 5}}>
                <Text style={{fontSize: 25, fontWeight: 500, color: 'red'}}>
                    Gợi Ý Hôm Nay
                </Text>
              </View>

              <View style={{padding:5, marginBottom: 5}}>
                <ScrollView>
                <FlatList
                    data={products}
                    renderItem={renderItemProduct}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    numColumns={2}
                    contentContainerStyle={{ paddingVertical: 10, }}
                  />
                </ScrollView>
              </View>
            </View>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

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