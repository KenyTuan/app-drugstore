import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingCartScreen from '../screen/ShoppingCart';
import SearchScreen from '../screen/SearchScreen';
import ProductDetailScreen from '../screen/ProductDetailScreen';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ListProductScreen from '../screen/ListProductScreen';
import { useNavigation } from '@react-navigation/native';
import ModalFilter from '../modal/ModalFilter';
import AppTab from './AppTab';
import OrderScreen from '../screen/OrderScreen';
import ListAddressScreen from '../screen/ListAddressScreen';
import EditAddressScreen from '../screen/EditAddressScreen';
import AreaScreen from '../screen/AreaScreen';
import AddAddressScreen from '../screen/AddAddressScreen';
import MyAccountScreen from '../screen/MyAccountScreen';
import ListOrderScreen from '../screen/ListOrderScreen';
import ProfileScreen from '../screen/ProfileScreen';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import headerSearch from '../header/HeaderSearch';
import ChossenAddress from '../screen/ChossenAddress'
import UpdateProfile from '../screen/UpdateProfile';
import SelectedAddress from '../screen/SelectedAddress';

const Stack = createStackNavigator();


const headerListProduct = () => {
    const navigation = useNavigation();
    const [isFilterVisible, setFilterVisible] = React.useState(false);

    const openFilter = () => {
        setFilterVisible(true);
    };

    const closeFilter = () => {
        setFilterVisible(false);
    };

    return(
        <View style={{
            width: '110%',
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between"
        }}>
            <View style={{
                    width: '85%',
                }}>
                <TouchableHighlight 
                    onPress={() => {navigation.navigate('Search')}}
                > 
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        backgroundColor: "#FFF",
                        padding: 5,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderColor: "#0198d7",
                        borderRadius: 5,
                        alignItems: "center"
                    }}>
                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: "400",
                            opacity: 0.5,
                            padding: 4
                        }}
                    >
                        Bạn cần tìm....
                    </Text>
                    <AntDesign 
                        name="search1" 
                        size={16} 
                        color="black" 
                    />
                </View>
                </TouchableHighlight>
            </View>
            
        </View>
    )
}




const AppStack = () => {

    return (
        <Stack.Navigator >
            <Stack.Screen 
                name="Home" 
                component={AppTab}  
                options={{ 
                    headerShown: false,  
                }}
                />
            <Stack.Screen 
                name="ProductDetail" 
                component={ProductDetailScreen} 
                options={{
                    title: '', 
                }} />
            <Stack.Screen 
                name="Search" 
                component={SearchScreen} 
                options={{
                    title: null, 
                    headerRight: headerSearch,

                }}
            />
            <Stack.Screen 
                name="ShoppingCart" 
                component={ShoppingCartScreen}
                options={
                    {
                        title: "Giỏ Hàng",
                    }
                } 
            />
            <Stack.Screen 
                name="ListProduct" 
                component={ListProductScreen} 
                options={{
                    title: null, 
                    headerRight: headerListProduct,
                }}
            />
            <Stack.Screen 
                name="Order" 
                component={OrderScreen} 
                options={{
                    title: "Đặt Hàng", 
                }}
            />
            <Stack.Screen 
                name="Address" 
                component={ListAddressScreen} 
                options={{
                    title: "Thông tin nhận hàng", 
                }}
            />
            <Stack.Screen 
                name="ChossenAddress" 
                component={ChossenAddress} 
                options={{
                    title: "Chọn địa chỉ nhận hàng", 
                }}
            />
            <Stack.Screen 
                name="EditAddress" 
                component={EditAddressScreen} 
                options={{
                    title: "Sửa Địa Chỉ", 
                }}
            />
            <Stack.Screen 
                name="AddAddress" 
                component={AddAddressScreen} 
                options={{
                    title: "Thêm Địa Chỉ", 
                }}
            />
            <Stack.Screen 
                name="ChooseArea" 
                component={AreaScreen} 
                options={{
                    title: "Chọn Khu Vực", 
                }}
            />
            <Stack.Screen 
                name="ChooseEditArea" 
                component={SelectedAddress} 
                options={{
                    title: "Chọn Khu Vực", 
                }}
            />
            <Stack.Screen 
                name="ListOrder" 
                component={ListOrderScreen} 
                options={{
                    title: "Đơn Hàng", 
                }}
            />
            <Stack.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{
                    title: "Hồ Sơ", 
                }}
            />
            <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{
                    headerShown: false,  
                }}
            />
            <Stack.Screen 
                name="Register" 
                component={RegisterScreen} 
                options={{
                    headerShown: false,  
                }}
            />
            <Stack.Screen 
                name="UpdateProfile" 
                component={UpdateProfile} 
                options={{
                    title: "Cập Nhật Tài Khoản", 
                }}
            />
        </Stack.Navigator>
    );
}

export default AppStack;