import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

export default function OrderApprovedTab() {
  return (
    <View style={{ flex: 1, backgroundColor: '#eee', padding: 5, }} >
      <View style={{
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
          <View style={{padding: 10, justifyContent: "flex-end",borderTopWidth: 0.5,borderBottomWidth: 0.5,opacity: 0.5, flexDirection: "row"}}>
            <Text style={{fontSize: 18, fontStyle: "italic"}}>Đang Giao Hàng....</Text>
            <FontAwesome5 name="shipping-fast" size={24} color="black" style={{opacity: 0.5,}} />
          </View>
      </View>
    </View>
  )
}
