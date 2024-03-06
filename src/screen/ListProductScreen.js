import React from 'react';
import {PanResponder, Animated, TouchableOpacity, View, Text, ScrollView, FlatList, TouchableHighlight, Image, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';




export default function ListProductScreen({navigation, route }) {
  const keySearch = route.params?.data || '';
  const [products,setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await fetch('https://test5.nhathuoc.store/api/products/show');
        const result = await response.json();

        const data = result.data;
        
        const filteredResults = data.filter((product) => product.name.toLowerCase().includes(keySearch.toLowerCase()));

        setProducts(filteredResults);
        setLoading(false);
        console.log(products);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchDataProduct();
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
