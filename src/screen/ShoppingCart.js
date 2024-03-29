import React from 'react';
import { View, Text, TouchableHighlight, TextInput, Image, FlatList, Animated } from 'react-native';
import CheckBox from 'react-native-check-box';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ItemShoppingCart from '../components/ItemShoppingCart/ItemShoppingCart';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

export default function ShoppingCartScreen({ navigation }) {
  const [isChecked, setIsChecked] = React.useState(false)
  const [cart, setCart] = React.useState([])
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [checkedAll, setCheckedAll] = React.useState(false);
  const [checkedItems, setCheckedItems] = React.useState([]);
  const [productCarts, setProductCarts] = React.useState([]);
  const isFocused = useIsFocused();

  const calculateTotalPrice = () => {
    let totalPrice = 0; 
    productCarts.forEach((item) => {
      if (!item.checked) {
        const price =  parseFloat(item.price)
        const quantity = parseInt(item.quantity)
        const discount = parseFloat(item.discount);
        
        totalPrice += quantity * (discount === 0 ? price : discount); 
      }
    });
    setTotalPrice(totalPrice);
  };

  const calculateCheckedTotalPrice = () => {
    let totalPrice = 0; 
    productCarts.forEach((item) => {
      if (item.checked) {
        const price =  parseFloat(item.price)
        const quantity = parseInt(item.quantity)
        const discount = parseFloat(item.discount);
        
        totalPrice += quantity * (discount === 0 ? price : discount); 
      }
    });
    setTotalPrice(totalPrice);
  };

  const handleCheckedAll = () => {
    const allItemsChecked = productCarts.every((item) => item.checked);

    const updatedCheckedAll = !allItemsChecked;

    setCheckedAll(updatedCheckedAll);

    setProductCarts(() => {
        const updatedProductCarts = productCarts.map((item) => ({
            ...item,
            checked: updatedCheckedAll,
        }));

        const checkedItems = updatedCheckedAll ? updatedProductCarts : [];

        setCheckedItems(checkedItems);

        return updatedProductCarts;
    });

    calculateTotalPrice();

};

  const handleCheckboxChange = (index) => {
    productCarts.map(
      (item)=>{
        console.log("item ",item.checked)
        if(item.id === index){
          console.log("item ",item.checked)

          item.checked = !item.checked
          return
        }
    })
    calculateCheckedTotalPrice();
    const allItemsChecked = productCarts.every((item) => item.checked);
    setCheckedAll(allItemsChecked);

    const checkedItems = productCarts.filter((item) => item.checked);
    setCheckedItems(checkedItems);
  };

  const renderItemProduct = ({ item }) => (
    <ItemShoppingCart 
      item={item} 
      checkedAll={checkedAll} 
      handleQuantityChange={handleQuantityChange} 
      handleCheckboxChange={handleCheckboxChange}
      deleteProductCart={deleteProductCart}/>
  );

  const updateProductCart = async(latestProductCarts) =>{
    const storedToken = await readToken();
    try{
        const res = await axios.post(`https://test5.nhathuoc.store/api/carts/save-quantities`,
        {
          quantities: latestProductCarts
        },
        {
            headers:{
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
            }
        })
        return res
    }catch(error){
        console.error("error",error.config)
    }
  }

  const deleteProductCart = async(id) =>{
    const storedToken = await readToken();
    try{
        const res = await axios.get(`https://test5.nhathuoc.store/api/carts/delete/${id}`,
        {
            headers:{
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
            }
        })
        if(res.status == 200){
          fetchData()
        }
    }catch(error){
        console.error("error",error.config)
    }
  }

  const handleCheckOut = () => {
      if(productCarts && productCarts.length > 0 && cart){
          const quantitiesObject = {};
          productCarts.forEach(({ id, quantity }) => {
              quantitiesObject[id] = quantity.toString(); 
          });
          
          updateProductCart(quantitiesObject);
      }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
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

  const handleQuantityChange = (itemId,newQuantity) => {
    setProductCarts((prevProductCarts) => {
      return prevProductCarts.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const fetchData = async () => {
    try{
      const storedToken = await readToken();
      console.log("token",storedToken)
      if (!!storedToken) {
        const res = await axios.get(`https://test5.nhathuoc.store/api/carts/cart-for-app`,{
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        })

        const cartsWithChecked = res.data.data.map((item) => ({ ...item, checked: checkedAll }));
        
        setProductCarts(cartsWithChecked);
      }
    }catch(error){
      console.error("e",error)
    }
  };

  React.useEffect(() => {
    if(!isFocused){
      console.log(isFocused)
      handleCheckOut()
    }
  })

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' 
      }}>
      <View style={{
        flex: 8,
        backgroundColor: "#CCC",
        width: "100%",
      }}>
        <FlatList
          data={productCarts}
          renderItem={renderItemProduct}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          contentContainerStyle={{ paddingVertical: 10,}}
        />
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
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}>
          <CheckBox
            style={{
              marginRight: 5
            }}
            onClick={handleCheckedAll}
            isChecked={checkedAll}
          />
          <Text style={{
              fontSize: 14
          }}>
            Tất cả
          </Text>
        </View>
        
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
            {(totalPrice != 0 )? totalPrice.toLocaleString('en-US', {
              style: 'decimal',
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
              }): totalPrice}đ
          </Text>
        </View>
        
        <View style={{
          flex: 3/2,
        }}>
          <TouchableHighlight style={{
            backgroundColor: "#0198d7",
            flex: 1,
            justifyContent: "center"
          }}
            onPress={()=>{
              if(checkedItems.length != 0){
              navigation.navigate("Order",{
              data: checkedItems,
              total: totalPrice
              })
            }
            
          }}
          >
            <Text style={{
              color: "#fff",
              fontWeight: "400",
              fontSize: 16, 
              textAlign: "center",
            }}>
              Mua Hàng
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};
