import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect } from 'react'
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function OrderApprovedTab() {

  const [data,setData] = React.useState([])
  const readToken = async () => {
    try {
        const storedToken = await AsyncStorage.getItem('token');
        return storedToken;
    } catch (error) {
        console.error('Error reading token:', error);
        return null;
    }
  };

  const getData = async() =>{
    try{
      const storedToken = await readToken();

      if (!!storedToken) {
        const res = await axios.get(`https://test5.nhathuoc.store/api/orders/history`,{
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        })

        const data_filter = res.data.data.filter(
          (product)=>{
            if(product.status === 2) {
              return  product
            }else{
              return;
            }
          }
        )
        console.log("data",data_filter)

        setData(data_filter)
      }
    }catch(error){
      console.error("e",error)
    }
  }

  const fetchData = async () => {
    try {
      getData()
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(
    () => {
      fetchData();
    }, []
  )

  console.log("data",data)


  const renderItem = ({ item }) => (
    <View style={{
      width: "100%",
      marginBottom: 10,
    }}>
      <View style={{
        padding: 15,
        flexDirection: "col",
        justifyContent: "space-between",
        }}>
          <Text numberOfLines={1} style={{fontSize: 16, flexWrap: 'wrap', marginBottom: 5}}>
            Mã Đơn {item.tracking_number}
          </Text>
          <Text style={{
              fontSize: 16,
              opacity: 0.5,
              fontWeight: "300",
              textAlign: "right"
          }}>
            {item.order_date}
          </Text>
          <Text style={{
              fontSize: 20,
              opacity: 0.5,
              fontWeight: "600",
              textAlign: "right",
              padding: 5
          }}>
            {item.totalPrice}
          </Text>
      </View>
      <View style={{padding: 10, justifyContent: "flex-end",borderTopWidth: 0.5,borderBottomWidth: 0.5,opacity: 0.5, flexDirection: "row"}}>
        <Text style={{fontSize: 18, fontStyle: "italic"}}>Đang Giao Hàng....</Text>
        <FontAwesome5 name="shipping-fast" size={24} color="black" style={{opacity: 0.5,}} />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#eee', padding: 5, }} >
      <View 
      style={{
        padding: 5,
        backgroundColor: "#FFF",
        elevation: 2,
        marginBottom: 10
      }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={{ paddingVertical: 10,width: "100%" }}
      />
    </View>

    </View>
  )
}
