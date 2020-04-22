import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import BottomTabNavigator from '../navigation/BottomTabNavigator';

const Stack = createStackNavigator();

export default function MainScreen() {

  return (
    <NavigationContainer >
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
