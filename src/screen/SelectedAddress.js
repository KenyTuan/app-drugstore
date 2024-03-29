import React from 'react';
import { View, Text, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native';

export default function SelectedAddress({navigation, route}) {
  const titleSelected = ['Tỉnh/Thành Phố',"Quận/Huyện", "Phường/Xã"]
  const receivedData = route.params?.data
  const [provinces, setProvinces] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [wards, setWards] = React.useState([]);
  const [selected,setSelected] = React.useState(receivedData?[receivedData[0].province_name,receivedData[1].district_name, receivedData[2].ward_name] : []);
  const [newSelected,setNewSelected] = React.useState((route.params?.data)? 2 : 0);
  const [data, setData] = React.useState(route.params?.data || null)
  const fetchProvinces = async () => {
    try {
      const response = await fetch('https://vapi.vnappmob.com/api/province');
      const data = await response.json();

      const modifiedProvinces = data.results.map(province => {
        if (province.province_name.includes('Tỉnh ')) {
          province.province_name = province.province_name.replace('Tỉnh ', '');
        } else if ( province.province_name.includes('Thành phố ')) {
          province.province_name = province.province_name.replace('Thành phố ', 'TP. ');
        }
        return province;
      });

      const sortedProvinces = modifiedProvinces.slice().sort((a, b) => a.province_name.localeCompare(b.province_name));

      setProvinces(sortedProvinces);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  const fetchDistrict = async (id) => {
    try {
      const response = await fetch('https://vapi.vnappmob.com/api/province/district/' + id);
      const data = await response.json();

      setDistricts(data.results);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  const fetchWard = async (id) => {
    try {
      const response = await fetch('https://vapi.vnappmob.com/api/province/ward/' + id);
      const data = await response.json();

      setWards(data.results);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  React.useEffect(() => {
    fetchProvinces();
    if(data){
      fetchDistrict(data[0].province_id);
      fetchWard(data[1].district_id)
    }
  }, []);

  const handleSelectedProvince = ( province ) => {
    setNewSelected(1);
    setSelected([province.province_name, "Chọn " + titleSelected[newSelected+1]])
    setData([province]);
    fetchDistrict(province.province_id);
  }

  const handleSelectedDistrict = ( district ) => {
    setNewSelected(2);
    setSelected([selected[0],district.district_name, "Chọn " + titleSelected[newSelected+1]])
    setData([data[0], district])
    console.log("data",data)
    fetchWard(district.district_id);
  }

  const handleSelectedWard = ( ward ) => {
    selected[2] = ward.ward_name
    data.push(ward)
    receiver = route.params.receiver
    const temp = receiver.address.split(", ")
    receiver.address = temp[0] + ", " + ward.ward_name + ", " + data[1].district_name+", " + data[0].province_name
    console.log("receiver",temp[0] + ", " + ward.ward_name + ", " + data[1].district_name+", " + data[0].province_name)
    navigation.replace('EditAddress', { receiver });
  }

  const handleSelectedItem = (index) =>{
    if(index == newSelected){
      return;
    }
    setNewSelected(index)
  }

  const renderItemProvince = ({ item }) => (
    <TouchableOpacity key={item.province_id} onPress={() => handleSelectedProvince(item)}>
      <View style={{padding: 5,backgroundColor: "#fff", marginBottom: 2,}}>
        <Text  style={{fontSize: 16, padding: 10}}>{item.province_name}</Text> 
      </View>
    </TouchableOpacity>
  );

  const renderItemDistrict = ({ item }) => (
    <TouchableOpacity key={item.district_id} onPress={() => handleSelectedDistrict(item)}>
      <View style={{padding: 5,backgroundColor: "#fff", marginBottom: 2,}}>
        <Text  style={{fontSize: 16, padding: 10}}>{item.district_name}</Text> 
      </View>
    </TouchableOpacity>
  );

  const renderItemWard = ({ item }) => (
    <TouchableOpacity key={item.ward_id} onPress={() => handleSelectedWard(item)}>
      <View style={{padding: 5,backgroundColor: "#fff", marginBottom: 2,}}>
        <Text  style={{fontSize: 16, padding: 10}}>{item.ward_name}</Text> 
      </View>
    </TouchableOpacity>
  );

  const renderSeletedItem = ({ item, index }) => (
    <TouchableHighlight onPress={()=>handleSelectedItem(index)}  underlayColor="#DDDDDD">
      <View style={[{padding: 5,backgroundColor: "#fff", marginBottom: 5,},(index === newSelected) ? {elevation: 5, borderWidth: 0.5,}: null]}>
      <Text style={{
          fontSize: 16,
          padding: 10,
          color: index === newSelected ? "#0198d7" : "#000",
        }}>{item}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#EEE"}}>
      {
        (selected) ? (
        <View style={{padding: 10, backgroundColor: "#FFF"}}>
          <Text style={{fontWeight: "300", padding: 10}}>Khu vực đã chọn</Text>
          <FlatList
            data={selected}
            renderItem={renderSeletedItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        ) :
          null
      }
      
      
        <View style={{paddingVertical: 10}}>
          <Text style={{fontWeight: "300", padding: 10}}>{titleSelected[newSelected]}</Text>
            {(newSelected === 1)?
            (
              <FlatList
                data={districts}
                renderItem={renderItemDistrict}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingVertical: 10 }}
              />
            )  : ((newSelected === 2 )?(
              <FlatList
                data={wards}
                renderItem={renderItemWard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingVertical: 10 }}
              />
            ):(
              <FlatList
              data={provinces}
              renderItem={renderItemProvince}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
            )
            )
          }
        </View>
    </View>
  );
};
