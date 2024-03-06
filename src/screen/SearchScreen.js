import React from 'react';
import { View, TextInput, TouchableHighlight, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function SearchScreen({ navigation }) {
  const [searchHistory, setSearchHistory] = React.useState([]);
  
  const loadSearchHistory = React.useCallback(async () => {
    try {
      const history = await AsyncStorage.getItem('searchHistory');
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  }, []);


  useFocusEffect(React.useCallback(() => {
    async function fetchData() {
      await loadSearchHistory();
    }

    fetchData();
  }, [loadSearchHistory]));

  return (
    <View style={styles.container}>
      <View style={styles.historyContainer}>
        {searchHistory.map((historyItem, index) => (
          <TouchableHighlight key={index}>
            <View style={{
              backgroundColor: "#FFF",
              padding: 10,
              paddingHorizontal: 15,
              borderBottomWidth: 1,
              borderColor: "#ccc",
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '400'
              }}>
                {historyItem}
              </Text>
            </View>
          </TouchableHighlight>
          
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  historyContainer: {
    marginTop: 10,
  },
});