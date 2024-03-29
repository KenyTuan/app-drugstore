import React, { useEffect } from 'react';
import { View, Text, TouchableHighlight, Image, FlatList, ScrollView } from 'react-native';
import CheckBox from 'react-native-check-box';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrderScreen({navigation, route}) {
    console.log("route",route.params)
    const [data,setData] = React.useState()
    const [total,setTotal] = React.useState(0)
    const [address,setAddress] = React.useState(null)
    const handleCheckout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], 
        });
    };

    useEffect(
        ()=>{
            setAddress((route.params.address) ? route.params.address : null)
        },[]
    )



    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                console.log("address",address)
                console.log("param: ", route.params)
                try {
                    setData(route.params.data)
                    setTotal(route.params.total)
                } catch (e) {

                }
              };
            fetchData()
        }, [])
    )
    console.log("address",address)

    const renderItemProduct = ({ item }) => (
        <View style={{
                backgroundColor: "#EEE",
                padding: 8,
                flexDirection: "row",
                marginBottom: 10,
                elevation: 2
            }}>
            <Image source={{uri: 'https://test5.nhathuoc.store/storage/images/products/'+ item.img}} height={120} width={120} marginRight={5}/>
            <View style={{
                flex: 1,
                padding: 5,
                justifyContent: "space-between",
            }}>
                <Text numberOfLines={1} style={{fontSize: 16, flexWrap: 'wrap', marginBottom: 5}}>
                    {item.name_product}
                </Text>
                {(item.discount == 0)? (
                        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                        <Text style={{
                        fontSize: 18,
                        color: "#0198d7",
                        marginRight: 3,
                        }}>
                        {item.price}
                        </Text>
                    </View>
                    ):(
                        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                        <Text style={{
                            fontSize: 18,
                            color: "#0198d7",
                            marginRight: 3,
                        }}>
                            {item.discount}
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            opacity: 0.5,
                            textDecorationLine: "line-through",
                        }}>
                            {item.price}
                        </Text>
                        </View>
                    )}
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{
                        fontSize: 18,
                        opacity: 0.5,
                        fontWeight: "300",
                        marginLeft: 10
                    }}>
                        x{item.quantity}
                    </Text>
                </View>
            </View>
        </View>
      );

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
            const res = await axios.post(`https://test5.nhathuoc.store/api/orders/post-checkout`,
            {
              address_id: address.id,
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
                return
            }
            setFormValid(dataRes);
            console.error("res",error.request.data)
            return;
        }catch(error){
            const dataRes = error.response.data.data
            // console.log(dataRes)

            // console.error("error",error)
        }
      }
    

  return (
 
    <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
        }}>

            <View style={{
            flex: 8,
            backgroundColor: "#ccc",
            width: "100%",
            paddingVertical: 10,
            }}>
            <ScrollView>
            {
                address == null ?(
                <TouchableHighlight onPress={()=>{navigation.replace("ChossenAddress",{
                    data,
                    total
                })}} >
                    <View style={{
                        flexDirection: "row",
                        backgroundColor: "#FFF",
                        padding: 5,
                        elevation: 2,
                        marginBottom: 10,
                        alignItems: "center"
                    }}>
                        <View style={{
                            padding: 10,
                        }}>
                            <AntDesign name="enviromento" size={24} color="#0198d7" />
                        </View>
                        <Text style={{
                            fontSize: 16,
                            paddingBottom: 10,
                            textAlign: "center"
                        }}>
                            Chọn Thông Tin Nhận Hàng
                        </Text>
                    </View>
                </TouchableHighlight>
                ):(
                <TouchableHighlight onPress={
                    ()=>{navigation.navigate("ChossenAddress",{
                    data,
                    total
                })}} >
                    <View style={{
                        flexDirection: "row",
                        backgroundColor: "#FFF",
                        padding: 5,
                        elevation: 2,
                        marginBottom: 10,
                    }}>
                        <View style={{
                            padding: 10,
                        }}>
                            <AntDesign name="enviromento" size={24} color="#0198d7" />
                        </View>
                        <View style={{
                            flex: 1,
                            padding: 10
                        }}>
                            <Text style={{
                                fontSize: 16,
                                paddingBottom: 10,
                            }}>
                                Địa chỉ nhận hàng
                            </Text>
                            <Text style={{
                                fontSize: 14,
                            }}>
                                {address.receiver_name} | {address.phone}
                            </Text>
                            <Text style={{
                                fontSize: 14,
                            }}>
                                {address.address}
                            </Text>
                        </View>

                        <View style={{
                            padding: 10,
                            justifyContent: "center",
                        }}>
                            <AntDesign name="right" size={18} color="black" style={{opacity: 0.5}} />
                        </View>

                    </View>
                </TouchableHighlight>
                )
            }
            
            
                <View style={{
                    padding: 5,
                    backgroundColor: "#FFF",
                    elevation: 2,
                    marginBottom: 10
                }}>
                    <FlatList
                        data={data}
                        renderItem={renderItemProduct}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        contentContainerStyle={{ paddingVertical: 10, }}
                    />
                </View>

                </ScrollView>
            </View>
        
        <View style={{
          flex:1,
          width: "100%",
          flexDirection: "row",
          borderTopWidth: 0.5,
          elevation: 5,
          backgroundColor: '#fff',
        }}>
          
          <View style={{
            flex: 2,
            backgroundColor: "white",
            justifyContent:"center",
            padding: 5,
          }}>
            <Text style={{
              fontSize: 14,
              opacity: 0.5,
  
            }}>
              Tổng Thành Tiền
            </Text>
            <Text style={{
              textAlign: "right",
              fontSize: 20,
              color: "#0198d7",
              fontWeight: "500",
            }}>
              {total}.000đ
            </Text>
          </View>
          <View style={{
            flex: 1,
          }}>
            <TouchableHighlight style={{
              backgroundColor: "#0198d7",
              flex: 1,
              justifyContent: "center"
            }}
            onPress={handleSubmit}
            >
              <Text style={{
                color: "#fff",
                fontWeight: "500",
                fontSize: 18,
                textAlign: "center",
              }}>
                Đặt Hàng
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>

  );
};
