import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';


import BottomTabNavigator from './navigation/BottomTabNavigator';



export default function MainScreen() {
  return (
    <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
