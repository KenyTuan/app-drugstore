
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import HomeScreen from '../screen/HomeScreen';
import MyAccountScreen from '../screen/MyAccountScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

  
const Tab = createBottomTabNavigator();


export default function AppTab() {






  return (

    <Tab.Navigator
      screenOptions={
        {
          headerShown: false,
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [
            {
              display: "flex"
            },
            null
          ]
        }
      }
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={MyAccountScreen}
        options={{
          tabBarLabel: 'My Account',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="bars" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
    );
}
;