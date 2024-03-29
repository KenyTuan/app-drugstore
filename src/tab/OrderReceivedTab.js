import React, { useEffect } from 'react'
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function OrderReceivedTab() {

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
            if(product.status === 3) {
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
        <Text style={{fontSize: 18, fontStyle: "italic"}}>{item.status_content}</Text>
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

      {/* <View style={{
              padding: 5,
              backgroundColor: "#FFF",
              elevation: 2,
              marginBottom: 10
          }}>
          <View style={{
              padding: 5,
              flexDirection: "row",
          }}>
              <Image source={{uri: 'https://reactjs.org/logo-og.png'}} height={100} width={100} />

              <View style={{
                  flex: 1,
                  padding: 5,
                  justifyContent: "space-between",
              }}>
                  <Text numberOfLines={1} style={{fontSize: 16, flexWrap: 'wrap', marginBottom: 5}}>
                      Thực phẩm bảo vệ sức khỏe viên uống tinh dầu hoa anh thảo Blackmores Evening Primrose Oil (Chai 190 viên)
                  </Text>
                  <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                      <Text style={{
                          fontSize: 16,
                          opacity: 0.5,
                          fontWeight: "300",
                      }}>
                      150.000đ
                      </Text>

                      <Text style={{
                          fontSize: 16,
                          opacity: 0.5,
                          fontWeight: "300",
                      }}>
                        x1
                      </Text>
                  </View>
              </View>
          </View>
          <View style={{padding: 5, alignItems: "flex-end"}}>
            <TouchableOpacity style={{backgroundColor: "#0198d7", padding: 10, paddingHorizontal: 25, borderRadius: 5,}}>
              <Text style={{fontSize: 18, fontWeight: "500", color: "#FFF"}}>Mua Lại</Text>
            </TouchableOpacity>
          </View>
      </View> */}
    </View>
  )
}
