import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import OrderConfirm from '../tab/OrderConfirmTab';
import OrderReceivedTab from '../tab/OrderReceivedTab';
import OrderCancelledTab from '../tab/OrderCancelledTab';
import OrderApprovedTab from '../tab/OrderApprovedTab';

  
    const renderScene = SceneMap({
        first: OrderConfirm,
        second: OrderApprovedTab,
        third: OrderReceivedTab,
        fourth: OrderCancelledTab,
    });
    

export default function ListOrderScreen() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Chờ Duyệt' },
        { key: 'second', title: 'Đã Duyệt' },
        { key: 'third', title: 'Đã Nhận' },
        { key: 'fourth', title: 'Đã Hủy' },
    ]);

  return (
    <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
            <TabBar
              {...props}
              scrollEnabled
              tabStyle={{ width: 125 }}
              indicatorStyle={{ backgroundColor: '#0198d7' }}
              style={{ backgroundColor: '#FFF',   }}
              labelStyle={{color: "black"}}
              activeColor='#0198d7'
            />
          )}
    />
  );
};
