import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'react-native-paper';

import SalesScreen from './SalesScreen';
import EditSaleScreen from './EditSaleScreen';

const SalesStack = createStackNavigator();

function SalesStackScreen({ theme }) {
  const { colors } = theme;
  return (
    <SalesStack.Navigator screenOptions={({ route }) => 
      ({
        headerShown: route.name === 'SalesScreen' ? false : route.name === 'EditSaleScreen' ? true : false,
        headerTitleStyle: {
          fontFamily: 'dosis-bold',
        },
      })} initialRouteName="Mis Ventas">
      <SalesStack.Screen name="SalesScreen" component={SalesScreen} />
      <SalesStack.Screen name="EditSaleScreen" options={{ title: 'NUEVA VENTA', headerTitleAlign:'center' }}component={EditSaleScreen} />
    </SalesStack.Navigator>
  );
}

export default withTheme(SalesStackScreen);
