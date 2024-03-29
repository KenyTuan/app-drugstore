import React from 'react';
import {PanResponder, Animated, TouchableOpacity, View, Text, ScrollView, FlatList, TouchableHighlight, Image, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';



export default function ListProductScreen({navigation, route }) {
  const keySearch = route.params?.data || '';
  const [products,setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);


  const Getdata = async() =>{
    try{
      const res = await axios.get(`https://test5.nhathuoc.store/api/products/show-for-app`)
      return res.data.data
    }catch(error){
      console.error("e",error)
    }

  }

  React.useEffect( () => {
    const fetchData = async () => {
      const data = await Getdata();
      console.log("Data:", keySearch);

      const product_search = data.filter(
        (product)=>{
            product_name = product.name.trim().toUpperCase().normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D')
            console.log("product",product_name.indexOf(keySearch.trim().toUpperCase()))
          
          if(product_name.indexOf(keySearch.trim().toUpperCase()) > - 1){
            console.log("a",product)
            return product;
          }
          return;
        }
      )
      console.log("product_search",product_search)
      setProducts(product_search)
    };
    fetchData();
    
  }, []);


  const renderItemProduct = ({ item }) => (
    <View style={{ width: '50%', marginBottom: 8,paddingHorizontal: '0.5%' } } >
      <TouchableHighlight onPress={() => {navigation.navigate('ProductDetail',{ id: item })}} >
        <View style={{ padding: 10, justifyContent: 'center',  borderRadius: 10, backgroundColor: "#FFF"}}>
          <View style={{padding: 5}}>
            <Image source={{uri: 'https://test5.nhathuoc.store/storage/images/products/'+ item.img}} style={{ height: 150}}/>
          </View>
          <View style={{ marginBottom: 10}}>
            <Text numberOfLines={2} style={{ textAlign: 'center',fontWeight: 300, fontSize: 18,flexWrap: 'wrap'}}>{item.name}</Text>
          </View>
          <View style={{paddingHorizontal: 10, marginBottom: 5 , flexDirection: "row", justifyContent: "flex-start"}}>
            <Text style={{ fontWeight: 500, fontSize: 16}}>{item.price}VND</Text>
            {/* <Text style={{ fontWeight: 500, fontSize: 14, color: "#ccc", textDecorationLine: "line-through"}}>150.000đ</Text> */}
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );

  console.log(keySearch);
  return (
    <View style={{
      flex: 1,
      backgroundColor: "#ccc"
    }}>
      <ScrollView>
        <View style={{padding:5, marginBottom: 5}}>
          <FlatList
              data={products}
              renderItem={renderItemProduct}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              numColumns={2}
              contentContainerStyle={{paddingVertical: 10}}
            />
        </View>
      </ScrollView> 
    </View>
  );
};
