import React from 'react'
import { FlatList, View, Text, ScrollView, Image, TextInput,TouchableHighlight,useWindowDimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
// import PagerView from 'react-native-pager-view';
import { TabView, SceneMap } from 'react-native-tab-view';





export default function ProductDetailScreen({ navigation, route }) {
  const [products,setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [number, onChangeNumber] = React.useState(1);
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Mô tả sản phẩm' },
    { key: 'second', title: 'Chi tiết sản phẩm' },
  ]);
  const receivedData = route.params?.id || '';

  const FirstRoute = () => (
    <View style={{borderRadius: 5,backgroundColor: "#fff",}}>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 18,fontStyle: "italic"}}>{receivedData.info}</Text>
      </View>
    </View>
  );

  const SecondRoute = () => (
    <View style={{height: 150,borderRadius: 5,backgroundColor: "#fff",}}>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 18, fontStyle: "italic"}}>{receivedData.describe}</Text>
      </View>
    </View>
  );



  React.useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await fetch('https://test5.nhathuoc.store/api/products/show');
        const result = await response.json();
    
        setProducts(result.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchDataProduct();
  }, []);
  
  const renderItemProduct = ({ item }) => (
    <View style={{ marginHorizontal: 5,width: 175, marginBottom: 8}} >
      <TouchableHighlight onPress={() => {navigation.navigate('ProductDetail', { id: item })}} underlayColor="#DDDDDD">
        <View style={{ padding: 10, justifyContent: 'center', borderWidth: 0.5, borderBottomColor: '#ccc', borderRadius: 10}}>
          <View style={{padding: 5}}>
            <Image source={{uri: 'https://test5.nhathuoc.store/storage/images/products/'+ item.img}} style={{ height: 150}}/>
          </View>
          <View style={{height: 35, marginBottom: 5}}>
            <Text style={{ textAlign: 'center',fontWeight: 300, fontSize: 14}}>{item.name}</Text>
          </View>
          <View style={{paddingHorizontal: 10, marginBottom: 5}}>
            <Text style={{ fontWeight: 500, fontSize: 16}}>{item.price}VND</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
  
  return (
    <View style={{ flex: 1, backgroundColor: "#ccc", padding: 5}}>
      <ScrollView>
        <View style={{backgroundColor: "#fff", marginBottom: 5,padding: 5}}>
          <View style={{paddingVertical: 10, marginBottom: 5, paddingHorizontal: 35}}>
            <Image source={{uri: 'https://test5.nhathuoc.store/storage/images/products/'+ receivedData.img}} style={{ height: 300}}/>
          </View>
          
          <View style={{marginBottom: 5, paddingHorizontal: 13,}}>
            <Text style={{fontSize: 20, fontWeight: '600', textAlign: 'center'}}>{receivedData.name}</Text>
          </View>

          <View  style={{flexDirection: 'row', justifyContent: "flex-end",paddingRight: 35, marginBottom: 5}}>
            {/* <View style={{ marginRight: 5}}>
              <Text style={{ fontWeight: 300, fontSize: 16, color: "#ccc", textDecorationLine: "line-through", textAlign: 'right'}}>150.000đ</Text>
            </View> */}
            <View style={{ }}>
              <Text style={{ fontWeight: 500, fontSize: 18, color: "#000", textAlign: 'right'}}>{receivedData.price}VND</Text>
            </View>
          </View>

          <View  style={{flexDirection: 'row', justifyContent: "flex-end",paddingRight: 35, marginBottom: 5}}>
            <View style={{ padding: 3, borderWidth: 1, borderRadius: 5,borderColor: "#0072bc", marginRight: 5}}>
              <TouchableHighlight onPress={()=> {onChangeNumber(number + 1)}}>
                  <AntDesign name="plus" size={24} color="#0072bc" />
              </TouchableHighlight>
            </View>

              <View>
                <TextInput
                  style={{
                    height: 30,
                    borderWidth: 0.5,
                    textAlign: "center",
                    padding: 3,}}
                    value={number.toString()}
                    keyboardType="numeric"
                />
              </View>
              <View style={{padding: 3,borderWidth: 1, borderRadius: 5, borderColor: "#0072bc" ,marginLeft: 5}}>
                <TouchableHighlight onPress={()=> {(number > 1)?onChangeNumber(number - 1): number}}>
                    <AntDesign name="minus" size={24} color="#0072bc" />
                </TouchableHighlight>
              </View>

          </View>
         
          <View style={{flexDirection: 'row', justifyContent: "space-evenly", paddingVertical: 15}}>
            <TouchableHighlight>
              <View style={{ padding: 5, paddingHorizontal: 15, borderWidth: 0.8, borderRadius: 10,backgroundColor: '#0072bc' }}>
                <Text style={{ fontWeight: 500, fontSize: 18, color: "#000", textAlign: 'right', color: 'white'}}>Thêm Giỏ Hàng</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight>
              <View style={{padding: 5, paddingHorizontal: 15,borderWidth: 1, borderRadius: 10, borderColor: "#0072bc" }}>
                <Text style={{ fontWeight: 500, fontSize: 18, color: "#000", textAlign: 'right', color: '#0072bc'}}>Mua Ngay</Text>
              </View>
            </TouchableHighlight>
          </View>

        </View>

        <View style={{height: 250,borderRadius: 5,backgroundColor: "#fff",marginBottom: 10}}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={SceneMap({
              first: FirstRoute,
              second: SecondRoute,
            })}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            tabBarStyle={{ backgroundColor: 'green' }}
            labelStyle={{ color: 'white' }}
          />
        </View>
        
        <View style={{ backgroundColor: "#fff",marginBottom: 5,marginBottom: 10}}>
          <FlatList
              data={products.slice(0,6)}
              renderItem={renderItemProduct}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              numColumns={2}
              contentContainerStyle={{ paddingVertical: 10, }}
            />
        </View>
      </ScrollView>
    </View>
  )
}
