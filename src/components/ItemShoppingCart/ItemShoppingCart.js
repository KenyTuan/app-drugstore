import React from 'react'
import { View, Text, TouchableHighlight, TextInput, Image, FlatList, Animated } from 'react-native';
import CheckBox from 'react-native-check-box';
import { AntDesign } from '@expo/vector-icons';




export default function ItemShoppingCart({ item,checkedAll,handleCheckboxChange, handleQuantityChange,deleteProductCart }) {
  const [number, onChangeNumber] = React.useState(item.quantity);
  const [isChecked, setIsChecked] = React.useState(checkedAll);
  const deleteButtonOpacity = React.useRef(new Animated.Value(0)).current;
  const [showDeleteButton, setShowDeleteButton] = React.useState(false);

  React.useEffect(() => {
    setIsChecked(checkedAll);
  }, [checkedAll]);

  const handleChange = (value) => {
    if (0 < value && value < 100) {
        onChangeNumber(value);
        handleQuantityChange(item.id, value);
    }
    };
    const toggleDeleteButton = () => {
        setShowDeleteButton(!showDeleteButton);
        if (!showDeleteButton) {
        fadeInDeleteButton();
        } else {
        fadeOutDeleteButton();
        }
    };

    const handleChecked = (value) => {
        setIsChecked(!value);
        handleCheckboxChange();
      };
  

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
      useNativeDriver: false, 
    }).start(() => setShowDeleteButton(false));
  };

  return (
    <View style={{
        borderBottomWidth: 0.5,
        elevation: 1,
        marginBottom: 5,
        backgroundColor: "#FFF"
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
                setIsChecked(!isChecked);
                handleCheckboxChange(item.id);
            }}
            isChecked={isChecked}
          />
  
          <Image source={{uri: 'https://test5.nhathuoc.store/storage/images/products/'+ item.img}} height={120} width={120} marginRight={5}/>
          <View style={{
            flex: 1,
            backgroundColor: "white",
            padding: 5,
          }}>
          <Text numberOfLines={2} style={{fontSize: 16, flexWrap: 'wrap', marginBottom: 5}}>
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
          <View  style={{flexDirection: 'row', justifyContent: "center", marginBottom: 5, padding: 5}}>
            <TouchableHighlight onPress={()=> {handleChange(number + 1)}} 
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
  
            <TouchableHighlight onPress={()=> {handleChange(number - 1)}} 
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
                  <TouchableHighlight onPress={()=>deleteProductCart(item.id)}>
                    <Text style={{ fontSize: 16, opacity: 0.5, color: 'red' }}>Xóa</Text>
                  </TouchableHighlight>
                </View>
              </Animated.View>
            )}
        </View>
      </View>
  )
}