import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import CheckBox from 'react-native-check-box';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

export default function OrderScreen({navigation}) {
    const handleCheckout = () => {

        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], 
        });
        };
  return (
    <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
        }}>
  
        <View style={{
          flex: 8,
          backgroundColor: "#ccc",
          width: "100%",
          paddingVertical: 10,
        }}>

            <TouchableHighlight onPress={()=>{navigation.navigate("Address")}} >
                <View style={{
                    flexDirection: "row",
                    backgroundColor: "#FFF",
                    padding: 5,
                    elevation: 2,
                    marginBottom: 10,
                }}>
                    <View style={{
                        padding: 10,
                    }}>
                        <AntDesign name="enviromento" size={24} color="#0198d7" />
                    </View>
                    <View style={{
                        flex: 1,
                        padding: 10
                    }}>
                        <Text style={{
                            fontSize: 16,
                            paddingBottom: 10,
                        }}>
                            Địa chỉ nhận hàng
                        </Text>
                        <Text style={{
                            fontSize: 14,
                        }}>
                            Họ Và Tên | (+84) 921 198 391
                        </Text>
                        <Text style={{
                            fontSize: 14,
                        }}>
                            92 Từ Văn Tư
                        </Text>
                        <Text style={{
                            fontSize: 14,
                        }}>
                            Phường Phú Trinh, Tp. Phan Thiết, Bình Thuận
                        </Text>
                    </View>

                    <View style={{
                        padding: 10,
                        justifyContent: "center",
                    }}>
                        <AntDesign name="right" size={18} color="black" style={{opacity: 0.5}} />
                    </View>

                </View>
            </TouchableHighlight>
            

            <View style={{
                padding: 5,
                backgroundColor: "#FFF",
                elevation: 2,
                marginBottom: 10
            }}>
                <View style={{
                    backgroundColor: "#EEEEEE",
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
            </View>

            <View style={{
                padding: 5,
                backgroundColor: "#FFF",
                elevation: 2,
                marginBottom: 10
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",

                }}>
                    <AntDesign name="calendar" size={28} color="#0198d7" style={{padding: 5}} />
                    <Text style={{
                            fontSize: 16,
                            padding: 5,
                        }}>
                        Chi tiết thanh toán
                    </Text>
                </View>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <Text style={{
                        fontSize: 14,
                        padding: 5,
                        opacity: 0.5,
                    }}>
                        Tổng tiền hàng
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        padding: 5,
                        opacity: 0.5,
                    }}>
                        100.000đ
                    </Text>
                </View>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <Text style={{
                        fontSize: 18,
                        padding: 5,
                    }}>
                        Tổng tiền hàng
                    </Text>
                    <Text style={{
                        fontSize: 18,
                        padding: 5,
                        color: "#0198d7"
                    }}>
                        100.000đ
                    </Text>
                </View>
            </View>

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
              100.000đ
            </Text>
          </View>
          
          <View style={{
            flex: 1,
          }}>
            <TouchableHighlight style={{
              backgroundColor: "#0198d7",
              flex: 1,
              justifyContent: "center"
            }}
            onPress={handleCheckout}
            >
              <Text style={{
                color: "#fff",
                fontWeight: "500",
                fontSize: 18,
                textAlign: "center",
              }}>
                Đặt Hàng
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
  );
};
