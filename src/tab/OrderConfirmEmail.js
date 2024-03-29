import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect } from 'react'
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native'

export default function OrderConfirmEmail() {

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

  const handleDelete = async (id)=>{
    const storedToken = await readToken();
    console.log("ud",id)
    try{
        const res = await axios.get(`https://test5.nhathuoc.storeapi/orders/cancel/${id}`,
        {
            headers:{
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
            }
        })
        console.log("res",res)

        if(res.data.status_code == 200){
        }
        return;
    }catch(error){
        console.error("error",error)
    }
  }

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
            if(product.status === 1) {
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

  const renderItem = ({ item }) => (
    <View style={{
      width: "100%",
      marginBottom: 8,
      backgroundColor: "#FFF"
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
              fontSize: 18,
              opacity: 0.5,
              fontWeight: "600",
              textAlign: "right"
          }}>
            {item.totalPrice}
          </Text>
      </View>
      <View style={{padding: 10, alignItems: "flex-start",borderTopWidth: 0.5,borderBottomWidth: 0.5,opacity: 0.5}}>
        <Text style={{fontSize: 18, fontStyle: "italic"}}>{item.status_content}....</Text>
      </View>
      <View style={{padding: 5, alignItems: "flex-end"}}>
        <TouchableOpacity style={{backgroundColor: "#0198d7", padding: 10, paddingHorizontal: 25, borderRadius: 5,}} 
            onPress={() => handleDelete(item.id)}>
          <Text style={{fontSize: 18, fontWeight: "500", color: "#FFF"}}>Hủy Đơn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <View style={{ flex: 1, backgroundColor: '#eee', padding: 5, }} >
      <View style={{
              padding: 5,
              backgroundColor: "#FFF",
              elevation: 2,
              marginBottom: 10
          }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
            contentContainerStyle={{ marginVertical: 10, width: "100%", backgroundColor: "#CCC",}}
          />
      </View>
    </View>
  )
}
