import React from 'react';
import { View, Text, TouchableHighlight,  } from 'react-native';
import { Ionicons, AntDesign, MaterialIcons, FontAwesome   } from '@expo/vector-icons';

export default function ProfileScreen({route, navigation}) {
  const [user, setUser] = React.useState();

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        const data = route.params.data;
        if(!data){
          navigation.goBack()
          return;
        }
        setUser(data);
      };
  
      loadData();
  
    }, [])
  );


  return (
    <View style={{ flex: 1,  paddingVertical: 10}}>
      <TouchableHighlight >
          <View style={{padding: 10, flexDirection: "row", backgroundColor: "#FFF", marginBottom: 5, alignItems: 'center' }}>
            <Text style={{flex: 1,fontSize: 16, padding: 5, fontStyle: "italic"}}>{user.fullname}</Text>
            <Text style={{flex: 1,fontSize: 16, padding: 5, textAlign: "right", fontStyle: "italic"}}>Tuấn</Text>
            <AntDesign name="right" size={16} color="black" style={{padding: 5}} />
          </View>
      </TouchableHighlight>

      <TouchableHighlight >
          <View style={{padding: 10, flexDirection: "row", backgroundColor: "#FFF", marginBottom: 5, alignItems: 'center' }}>
            <Text style={{flex: 1,fontSize: 16, padding: 5, fontStyle: "italic"}}>Giới Tính</Text>
            <Text style={{flex: 1,fontSize: 16, padding: 5, textAlign: "right", fontStyle: "italic"}}>Nam</Text>
            <AntDesign name="right" size={16} color="black" style={{padding: 5}} />
          </View>
      </TouchableHighlight>

      <TouchableHighlight >
          <View style={{padding: 10, flexDirection: "row", backgroundColor: "#FFF", marginBottom: 5, alignItems: 'center' }}>
            <Text style={{flex: 1,fontSize: 16, padding: 5, fontStyle: "italic"}}>Ngày Sinh</Text>
            <Text style={{flex: 1,fontSize: 16, padding: 5, textAlign: "right", fontStyle: "italic"}}>10-02-2003</Text>
            <AntDesign name="right" size={16} color="black" style={{padding: 5}} />
          </View>
      </TouchableHighlight>

      <TouchableHighlight >
          <View style={{padding: 10, flexDirection: "row", backgroundColor: "#FFF", marginBottom: 5, alignItems: 'center' }}>
            <Text style={{flex: 1,fontSize: 16, padding: 5, fontStyle: "italic"}}>Email</Text>
            <Text style={{flex: 1,fontSize: 16, padding: 5, textAlign: "right", fontStyle: "italic"}}>v*******2@gmail.com</Text>
            <AntDesign name="right" size={16} color="black" style={{padding: 5}} />
          </View>
      </TouchableHighlight>
    </View>
  );
};
