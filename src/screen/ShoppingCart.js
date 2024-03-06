import React from 'react';
import { View, Text, TouchableHighlight, TextInput, Image, FlatList, Animated } from 'react-native';
import CheckBox from 'react-native-check-box';
import { AntDesign } from '@expo/vector-icons';
import YourComponent from '../components/ItemProductOrder';

export default function ShoppingCartScreen({ navigation }) {
  const [isChecked, setIsChecked] = React.useState(false)
  const [number, onChangeNumber] = React.useState(1);
  const [showDeleteButton, setShowDeleteButton] = React.useState(false);
  const deleteButtonOpacity = React.useRef(new Animated.Value(0)).current;

  const fadeInDeleteButton = () => {
    Animated.timing(deleteButtonOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false, 
    }).start();
  };

  const fadeOutDeleteButton = () => {
    Animated.timing(deleteButtonOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false, // Set to true if supported by your version of React Native
    }).start(() => setShowDeleteButton(false));
  };

  const toggleDeleteButton = () => {
    setShowDeleteButton(!showDeleteButton);
    if (!showDeleteButton) {
      fadeInDeleteButton();
    } else {
      fadeOutDeleteButton();
    }
  };

  const data = [
    { id: '1', title: 'Dược Phẩm' },
    { id: '2', title: 'Chăm Sóc Sức Khỏe' },
    { id: '3', title: 'Chăm sóc cá nhân' },
    { id: '4', title: 'Sản phẩm tiện lợi' },
    { id: '5', title: 'Thực phẩm chức năng' },
    { id: '6', title: 'Mẹ và Bé' },
    { id: '7', title: 'Chăm sóc sắc đẹp' },
    { id: '8', title: 'Thiết bị y tế' },
  ];

  const renderItemProduct = ({ item }) => (
    // YourComponent()
    <View style={{
      borderBottomWidth: 0.5,
      elevation: 1,
      marginBottom: 5,
    }}>
      <View style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 10,
      }}>
        <TouchableHighlight onPress={toggleDeleteButton}>
          <Text style={{fontSize: 16, opacity: 0.5}}>Sửa</Text>
        </TouchableHighlight>
      </View>
      

      <View style={{
        padding: 10,
        flexDirection: "row",
        justifyContent: "center",
      }}>
        <CheckBox
          style={[{flex: 1/8, justifyContent: "center", marginRight: 10,},(showDeleteButton)?{marginLeft: -35}: null]}
          onClick={()=>{
            setIsChecked(!isChecked)
          }}
          isChecked={isChecked}
        />

        <Image source={{uri: 'https://reactjs.org/logo-og.png'}} height={120} width={120} marginRight={5}/>
        <View style={{
          flex: 1,
          backgroundColor: "white",
          padding: 5,
        }}>
        <Text numberOfLines={2} style={{fontSize: 16, flexWrap: 'wrap', marginBottom: 5}}>
          Thực phẩm bảo vệ sức khỏe viên uống tinh dầu hoa anh thảo Blackmores Evening Primrose Oil (Chai 190 viên)
        </Text>
        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
          <Text style={{
            fontSize: 18,
            color: "#0198d7",
            marginRight: 3,
          }}>
            150.000đ
          </Text>

          <Text style={{
            fontSize: 14,
            opacity: 0.5,
            textDecorationLine: "line-through",
          }}>
            150.000đ
          </Text>
        </View>

        <View  style={{flexDirection: 'row', justifyContent: "center", marginBottom: 5, padding: 5}}>
          
          <TouchableHighlight onPress={()=> {onChangeNumber(number + 1)}} 
            style={{ 
              padding: 3, 
              borderWidth: 1, 
              borderRadius: 5,
              borderColor: "#0072bc", 
              marginRight: 5,
              justifyContent: "center"
              }}>
              <AntDesign name="plus" size={16} color="#0072bc" />
          </TouchableHighlight>

          <TextInput
            style={{
              borderWidth: 1,
              textAlign: "center",
            }}
              value={number.toString()}
              keyboardType="numeric"
          />

          <TouchableHighlight onPress={()=> {(number > 1)?onChangeNumber(number - 1): number}} 
            style={{
              padding: 3,
              borderWidth: 1, 
              borderRadius: 5, 
              borderColor: "#0072bc",
              marginLeft: 5,
              justifyContent: "center",
              }}>
              <AntDesign name="minus" size={16} color="#0072bc" />
          </TouchableHighlight>

          </View>
        </View>
        {showDeleteButton && (
            <Animated.View style={{ opacity: deleteButtonOpacity }}>
              <View style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                padding: 10,
              }}>
                <TouchableHighlight>
                  <Text style={{ fontSize: 16, opacity: 0.5, color: 'red' }}>Xóa</Text>
                </TouchableHighlight>
              </View>
            </Animated.View>
          )}
      </View>
    </View>
  );

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' 
      }}>

      <View style={{
        flex: 8,
        backgroundColor: "#FFF",
        width: "100%",
      }}>
        <FlatList
          data={data}
          renderItem={renderItemProduct}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          contentContainerStyle={{ paddingVertical: 10, }}
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
            onClick={()=>{
                setIsChecked(!isChecked)
            }}
            isChecked={isChecked}
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
            0đ
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
            onPress={()=>{navigation.navigate("Order")}}
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
