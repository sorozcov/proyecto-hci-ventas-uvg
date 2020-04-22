import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SigninScreen from './SigninScreen';
import LoginScreen from './LoginScreen';


const Stack = createStackNavigator();

export default function AuthScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}