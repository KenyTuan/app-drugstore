import React from 'react';
import { View, Text, TouchableHighlight,  } from 'react-native';
import { Ionicons, AntDesign, MaterialIcons, FontAwesome   } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({route, navigation}) {
  const [user, setUser] = React.useState();
  const [inputEmail, setInputEmail] = React.useState('');
  const obfuscatedEmail = obfuscateEmail(inputEmail);
  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        console.log(route.params.data)
        const data = route.params.data;
        if(!data){
          navigation.goBack()
          return;
        }
        setUser(data);
        setInputEmail(obfuscateEmail(data?.email))
      };
  
      loadData();
  
    }, [])
  );

  function obfuscateEmail(email) {
    const parts = email.split('@');
    const username = parts[0];
    const domain = parts[1];

    const obfuscatedUsername = username.charAt(0) + '******' + username.charAt(username.length - 1);

    return obfuscatedUsername + '@' + domain;
}


  return (
    <View style={{ flex: 1,  paddingVertical: 10}}>
      <TouchableHighlight >
          <View style={{padding: 10, flexDirection: "row", backgroundColor: "#FFF", marginBottom: 5, alignItems: 'center' }}>
            <Text style={{flex: 1,fontSize: 16, padding: 5, fontStyle: "italic"}}>Tên</Text>
            <Text style={{flex: 1,fontSize: 16, padding: 5, textAlign: "right", fontStyle: "italic"}}>{user?.fullname}</Text>
            <AntDesign name="right" size={16} color="black" style={{padding: 5}} />
          </View>
      </TouchableHighlight>

      <TouchableHighlight >
          <View style={{padding: 10, flexDirection: "row", backgroundColor: "#FFF", marginBottom: 5, alignItems: 'center' }}>
            <Text style={{flex: 1,fontSize: 16, padding: 5, fontStyle: "italic"}}>Giới Tính</Text>
            <Text style={{flex: 1,fontSize: 16, padding: 5, textAlign: "right", fontStyle: "italic"}}>{user?.gender ? "Nam": "Nữ"}</Text>
            <AntDesign name="right" size={16} color="black" style={{padding: 5}} />
          </View>
      </TouchableHighlight>

      <TouchableHighlight >
          <View style={{padding: 10, flexDirection: "row", backgroundColor: "#FFF", marginBottom: 5, alignItems: 'center' }}>
            <Text style={{flex: 1,fontSize: 16, padding: 5, fontStyle: "italic"}}>Ngày Sinh</Text>
            <Text style={{flex: 1,fontSize: 16, padding: 5, textAlign: "right", fontStyle: "italic"}}>{user?.birthday}</Text>
            <AntDesign name="right" size={16} color="black" style={{padding: 5}} />
          </View>
      </TouchableHighlight>

      <TouchableHighlight >
          <View style={{padding: 10, flexDirection: "row", backgroundColor: "#FFF", marginBottom: 5, alignItems: 'center' }}>
            <Text style={{flex: 1,fontSize: 16, padding: 5, fontStyle: "italic"}}>Email</Text>
            <Text style={{flex: 1,fontSize: 16, padding: 5, textAlign: "right", fontStyle: "italic"}}>{inputEmail}</Text>
            <AntDesign name="right" size={16} color="black" style={{padding: 5}} />
          </View>
      </TouchableHighlight>
      <TouchableHighlight >
          <View style={{padding: 10, flexDirection: "row", backgroundColor: "#FFF", marginBottom: 5, alignItems: 'center' }}>
            <Text style={{flex: 1,fontSize: 16, padding: 5, fontStyle: "italic"}}>Phone</Text>
            <Text style={{flex: 1,fontSize: 16, padding: 5, textAlign: "right", fontStyle: "italic"}}>{user?.phone}</Text>
            <AntDesign name="right" size={16} color="black" style={{padding: 5}} />
          </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={()=>navigation.navigate("UpdateProfile",{data: user})} >
            <View style={{backgroundColor: "#FFF",flexDirection: "row", justifyContent: "center", paddingVertical: 20, borderTopWidth: 0.5, elevation: 1}} >
                <Text style={{fontWeight: "600",color:"#0198d7", paddingHorizontal: 5, textAlign: "center",fontSize: 18}}>Cập Nhật Thông Tin</Text>
            </View>
        </TouchableHighlight>
    </View>
  );
};
