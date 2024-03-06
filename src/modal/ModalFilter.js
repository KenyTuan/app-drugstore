import React from 'react'
import {PanResponder, Animated, TouchableOpacity, View, Text, ScrollView, FlatList, TouchableHighlight, Image, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';

export default function ModalFilter({isVisible , eventClose}) {

    const data = [
        { id: '1', title: 'Dược Phẩm' },
        { id: '2', title: 'Chăm Sóc Sức Khỏe' },
        { id: '3', title: 'Chăm sóc cá nhân' },
        { id: '4', title: 'Sản phẩm tiện lợi' },
        { id: '5', title: 'Thực phẩm chức năng' },
        { id: '6', title: 'Mẹ và Bé' },
        { id: '7', title: 'Chăm sóc sắc đẹp' },
        { id: '8', title: 'Thiết bị y tế' },
      ];
    
    const [initialData , setInitialData ] = React.useState(data);
    const [showAll, setShowAll] = React.useState(false);
    const itemsToShow = showAll ? initialData : initialData.slice(0, 2); 
    const [animatedValue] = React.useState(new Animated.Value(-300));

    const renderItem = ({ item }) => (

    <View style={{width: "50%", padding: 5 }}>
        <TouchableHighlight>
        <View style={{ height: 45 ,justifyContent: 'center', borderRadius: 10,backgroundColor: "#ccc", paddingHorizontal: 5}}>
            <Text style={{color:"#000", textAlign: 'center',fontWeight: 400,textTransform: 'capitalize'}}>{item.title}</Text>
        </View>
        </TouchableHighlight>
    </View>

    );

    const renderFooter = () => {
    if (initialData.length <= 2) {
        return null; 
    }

    return (
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
            <Text>{showAll ? 'Ẩn Bớt' : 'Xem Thêm'}</Text>
        </TouchableOpacity>
        </View>
    );
    };

    const panResponder = React.useRef(
    PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dx: animatedValue }], {
        useNativeDriver: false,
        }),
        onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 100) {
            eventClose();
        } else {
            Animated.spring(animatedValue, { toValue: -300, useNativeDriver: false }).start();
        }
        },
    })
    ).current;

    React.useEffect(() => {
    if (isVisible) {
        Animated.timing(animatedValue, { toValue: 0, useNativeDriver: false }).start();
    } else {
        Animated.timing(animatedValue, { toValue: -300, useNativeDriver: false }).start();
    }
    }, [isVisible]);

    return (
        <Modal 
            transparent={true}
            visible={isVisible}
        >
          <Animated.View style={[{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: "100%",
          },
            { transform: [{ translateX: animatedValue }] }
          ]}
            {...panResponder.panHandlers}

          >
          <View style={{
            flex: 1,
            width: "90%",
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: "space-between"
          }}>
            <View style={{
                marginBottom: 15,
                backgroundColor: "#ccc",
                width: "100%",
                padding: 10
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: "500"
              }}>
                Bộ Lọc Tìm Kiếm
              </Text>
            </View>
            <View style={{
              flex: 1,
            }}>
              <ScrollView >
                <View style={{
                  width: "100%",
                  padding: 10,
                  borderBottomWidth: 0.5,
                  marginBottom: 5,
                }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: "300",
                      marginBottom: 10,
                    }}>
                      Theo Loại
                    </Text>
                    <FlatList
                      data={itemsToShow}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.id}
                      numColumns={2}
                      scrollEnabled={false}
                      ListFooterComponent={renderFooter}
                    />
                </View>

              </ScrollView>
            </View>
            
            <View style={{
              flex: 1/12,
              width: "100%",
              padding: 10,
              borderTopWidth: 0.5,
              marginBottom: 5,
              flexDirection: "row",
              justifyContent: "space-between",              
            }}>
              <TouchableHighlight
                style={{
                  flex: 1,
                  borderRadius: 20,
                  marginHorizontal: 5
                }}>
                <View style={{
                    flex: 1,
                    borderRadius: 20,
                    padding: 10,
                    borderColor: "#0198d7",
                    borderWidth: 0.5,
                    justifyContent: "center",
                  }}>
                  <Text style={{
                      color: '#0198d7',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: 16,
                    }}>
                      Thiết Lập Lại
                    </Text>
                  </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  flex: 1,
                  borderRadius: 20,
                  marginHorizontal: 5
                }}>
                  <View style={{
                    flex: 1,
                    borderRadius: 20,
                    padding: 10,
                    backgroundColor: "#0198d7",
                    justifyContent: "center",
                  }}>
                  <Text style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: 16
                    }}>
                      Áp Dụng
                    </Text>
                  </View>

              </TouchableHighlight>
            </View>
            
          </View>
        </Animated.View>
    </Modal>
    )
}
