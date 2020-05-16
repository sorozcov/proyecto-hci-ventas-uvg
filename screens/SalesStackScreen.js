import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'react-native-paper';

import SalesScreen from './SalesScreen';
import EditSaleScreen from './EditSaleScreen';

const SalesStack = createStackNavigator();

function SalesStackScreen({ theme, navigation, route }) {
  const { colors } = theme;
  if(route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false})
  } else {
    navigation.setOptions({tabBarVisible: true})
  };
  return (
    <SalesStack.Navigator screenOptions={({ route }) => 
      ({
        headerBackTitleVisible:false,
        headerShown: route.name === 'SalesScreen' ? false : route.name === 'EditSaleScreen' ? true : false,
        headerTitleStyle: {
          fontFamily: 'dosis-bold',
          
        },
        headerMode: 'screen'
      })} initialRouteName="SalesScreen">
      <SalesStack.Screen name="SalesScreen" component={SalesScreen} />
      <SalesStack.Screen name="EditSaleScreen"   options={{ title: 'NUEVA VENTA', headerTitleAlign:'center'}} component={EditSaleScreen} />
    </SalesStack.Navigator>
  );
}

export default withTheme(SalesStackScreen);
