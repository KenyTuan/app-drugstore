import React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function ListAddressScreen({navigation}) {
  return (
    <View style={{ 
        flex: 1, 
        backgroundColor: "#EEEEEE",
        }}>
        <Text style={{padding: 10,}}>
            Địa chỉ
        </Text>
        <View style={{
            flex: 1,
            backgroundColor: "#FFF"
        }}>
            <View style={{
                    paddingHorizontal: 10,
                    flexDirection: "row",
                }}>
                <TouchableOpacity  onPress={()=>{navigation.navigate("Order")}}>
                    <View style={{
                        flexDirection: "row",
                    }}>
                        <View style={{paddingVertical: 20}}>
                            <View style={{
                                width: 25,
                                height: 25,
                                borderRadius: 15,
                                borderColor: "#0198d7",
                                borderWidth: 4,
                                padding: 3
                            }}>
                                <View style={{
                                    flex: 1,
                                    borderRadius: 15,
                                    backgroundColor: "#0198d7",
                                }}>
                                </View>
                            </View>
                        </View>
                    
                        <View style={{
                            padding: 20,
                            borderBottomWidth: 0.5,
                        }}>
                            <Text style={{
                                fontSize: 16,
                                paddingBottom: 10,
                            }}>
                                Họ Và Tên | (+84) 921 198 391
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                opacity: 0.5,
                                fontStyle: 'italic',
                            }}>
                                92 Từ Văn Tư
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                opacity: 0.5,
                                fontStyle: 'italic',
                            }}>
                                Phường Phú Trinh, Tp. Phan Thiết, Bình Thuận
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate("EditAddress")}}>
                    <Text style={{
                        paddingVertical: 20,
                        fontSize: 16,
                        color: "#0198d7"
                    }}> 
                        Sửa 
                    </Text>
                </TouchableOpacity>
            </View>
            
            <TouchableHighlight onPress={()=>{navigation.navigate("AddAddress")}}>
                <View style={{flexDirection: "row", justifyContent: "center", paddingVertical: 20, borderTopWidth: 0.5, elevation: 1}} >
                    <AntDesign name="pluscircleo" size={24} color="#0198d7" />
                    <Text style={{color:"#0198d7", paddingHorizontal: 5,fontStyle: 'italic', textAlign: "center"}}>Thêm Địa Chỉ Mới</Text>
                </View>
            </TouchableHighlight>
        </View>
    </View>
  );
};
