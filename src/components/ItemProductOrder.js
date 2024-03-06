import React, { useState } from 'react';
import { View, Text, TouchableHighlight, Image, TextInput } from 'react-native';
import CheckBox from 'react-native-check-box';
import { AntDesign } from '@expo/vector-icons';

export default function YourComponent() {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [number, setNumber] = useState(1);

  const onChangeNumber = (newNumber) => {
    setNumber(newNumber);
  };

  const handleEditPress = () => {
    setIsEditMode(!isEditMode);
  };

  const handleDeletePress = () => {
    // Implement your delete logic here
    console.log('Item deleted!');
  };

  return (
    <View style={{ borderBottomWidth: 0.5, elevation: 1, marginBottom: 5 }}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 10 }}>
        <TouchableHighlight onPress={handleEditPress}>
          <Text style={{ fontSize: 16, opacity: 0.5 }}>{isEditMode ? 'Xong' : 'Sửa'}</Text>
        </TouchableHighlight>
      </View>

      <View style={{ padding: 10, flexDirection: "row", justifyContent: "center" }}>
        <CheckBox
          style={{ flex: 1 / 8, justifyContent: "center", marginRight: 5 }}
          onClick={() => {
            setIsChecked(!isChecked);
          }}
          isChecked={isChecked}
        />

        <Image source={{ uri: 'https://reactjs.org/logo-og.png' }} height={120} width={120} marginRight={5} />
        <View style={{ flex: 1, backgroundColor: "white", padding: 5 }}>
          <Text numberOfLines={2} style={{ fontSize: 16, flexWrap: 'wrap', marginBottom: 5 }}>
            Thực phẩm bảo vệ sức khỏe viên uống tinh dầu hoa anh thảo Blackmores Evening Primrose Oil (Chai 190 viên)
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={{ fontSize: 18, color: "#0198d7", marginRight: 3 }}>
              150.000đ
            </Text>
            <Text style={{ fontSize: 14, opacity: 0.5, textDecorationLine: "line-through" }}>
              150.000đ
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: "center", marginBottom: 5, padding: 5 }}>
            <TouchableHighlight onPress={() => { onChangeNumber(number + 1) }}
              style={{
                padding: 3, borderWidth: 1, borderRadius: 5, borderColor: "#0072bc", marginRight: 5, justifyContent: "center"
              }}>
              <AntDesign name="plus" size={16} color="#0072bc" />
            </TouchableHighlight>

            <TextInput
              style={{
                borderWidth: 1, textAlign: "center",
              }}
              value={number.toString()}
              keyboardType="numeric"
            />

            <TouchableHighlight onPress={() => { (number > 1) ? onChangeNumber(number - 1) : number }}
              style={{
                padding: 3, borderWidth: 1, borderRadius: 5, borderColor: "#0072bc", marginLeft: 5, justifyContent: "center"
              }}>
              <AntDesign name="minus" size={16} color="#0072bc" />
            </TouchableHighlight>

            {isEditMode && (
              <TouchableHighlight onPress={handleDeletePress}
                style={{
                  padding: 3, borderWidth: 1, borderRadius: 5, borderColor: "#ff0000", marginLeft: 5, justifyContent: "center"
                }}>
                <Text style={{ color: "#ff0000" }}>Xóa</Text>
              </TouchableHighlight>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
