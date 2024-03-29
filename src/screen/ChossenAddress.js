import React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ChossenAddress({navigation, route}) {
    const [datas,setData] = React.useState([]);
    console.log("receiver",route.params.data)
    const data = route.params?.data;
    const total = route.params?.total;

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
          console.log("storedToken",storedToken)
    
          if (!!storedToken) {
            const res = await axios.get(`https://test5.nhathuoc.store/api/users/address`,{
              headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
              },
            })
    
            console.log("data",res.data.data)
            return res.data.data
          }
        }catch(error){
          console.error("e",error)
        }
      }

    const fetchData = async () => {
        try {
            const data = await getData();
            console.log("data",data)
            setData(data);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    useFocusEffect(
        React.useCallback(
        () => {
            fetchData();
        }, [])
    )

    const renderItemProduct = ({ item }) => (
        <TouchableOpacity onPress={()=>navigation.navigate("Order",{
            address: item, 
            data,
            total
            })}>
            <View style={{
                backgroundColor: "#FFF",
                flexDirection: "row",
                marginBottom: 15,
                padding: 10,
            }}>
                <View style={{
                    padding: 2,
                    width: "90%"
                }}>
                    <View style={{
                        justifyContent: "space-between"
                    }}>
                        <Text style={{
                            fontSize: 16,
                            paddingBottom: 10,
                        }}>
                            Name: {item.receiver_name} 
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            paddingBottom: 10,
                        }}>
                        Phone: {item.phone}
                        </Text>
                    </View>
                    <Text style={{
                        fontSize: 14,
                        opacity: 0.5,
                        fontStyle: 'italic',
                    }}>
                        {item.address}
                    </Text>
                    </View>
            </View>
        </TouchableOpacity>
      );


  return (
    <View style={{ 
        flex: 1,
        backgroundColor: "#EEEEEE",
        }}>
        {
            datas.length != 0 && (
            <Text style={{padding: 10,}}>
                Địa chỉ
            </Text>
            )
        }
        <View
            style={{
                flex: 1
            }}
        >
        {
            datas.length == 0 && (
            <TouchableHighlight onPress={()=>{navigation.navigate("Address")}}>
                <View style={{backgroundColor: "#FFF",flexDirection: "row", justifyContent: "center", paddingVertical: 20, borderTopWidth: 0.5, elevation: 1,marginTop: 10}} >
                    <Text style={{color:"#0198d7", paddingHorizontal: 5,fontStyle: 'italic', textAlign: "center"}}>Quay Lại Trang Thêm Thông Tin</Text>
                </View>
            </TouchableHighlight>
            )  
        } 
            <FlatList
                data={datas}
                renderItem={renderItemProduct}
                keyExtractor={(item) => item.id}
                scrollEnabled={true}
            />
        </View>

        
    </View>
  );
};
