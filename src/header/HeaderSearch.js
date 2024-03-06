import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function headerSearch (){
    const navigation = useNavigation();
    const [searchText, setSearchText] = React.useState('');
    const [searchHistory, setSearchHistory] = React.useState([]);



    const saveSearchHistory = async (search) => {
        try {
          if (!searchHistory.includes(search)) {
            const updatedHistory = [...searchHistory, search];
            setSearchHistory(updatedHistory);

            await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
          
        }
        } catch (error) {
          console.error('Error saving search history:', error);
        }
    };



    const handleSearch = () => {
        if(searchText){
            console.log('Searching for:', searchText);
            saveSearchHistory(searchText);
        }
        navigation.navigate('ListProduct', {data: searchText});
        setSearchText('');
    };

    return(
        <View style={{
            width: '110%', 
            flexDirection: 'row',
            justifyContent: "space-between",
            paddingHorizontal: 10
            }}>
            <TextInput
                style={{
                    width: '85%',
                    backgroundColor: "#FFF",
                    padding: 5,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: "#0198d7",
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                }}
                placeholder='Bạn cần tìm....'
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
            />
            <View style={{
                    width: "15%",
                    justifyContent: "center",
                    backgroundColor: "#0198d7",
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    alignItems: 'center'
                }}>
                <TouchableHighlight 
                    onPress={handleSearch}
                >   
                    <AntDesign 
                        name="search1" 
                        size={16} 
                        color="white" 
                    />
                </TouchableHighlight>
            </View>
        </View>
    )
}
