import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'react-native-paper';

import ProfilesScreen from './ProfilesScreen';
import EditProfileScreen from './SignupScreen';
import SavedSalesScreen from './SavedSalesScreen';

const ProfilesStack = createStackNavigator();

function ProfilesStackScreen({ theme }) {
  const { colors } = theme;
  return (
    <ProfilesStack.Navigator screenOptions={({ route }) => 
      ({
        headerBackTitleVisible:false,
        headerShown: route.name === 'ProfilesScreen' ? false : route.name === 'EditProfileScreen' ? true : route.name === 'SavedSalesScreen' ? true : false,
        headerTitleStyle: {
          fontFamily: 'dosis-bold',
          
        },
        headerMode: 'screen'
      })} initialRouteName="ProfilesScreen">
      <ProfilesStack.Screen name="ProfilesScreen" component={ProfilesScreen} />
      <ProfilesStack.Screen name="EditProfileScreen"   options={{ title: 'EDITAR PERFIL', headerTitleAlign:'center'}} component={EditProfileScreen} />
      <ProfilesStack.Screen name="SavedSalesScreen"   options={{ title: 'VENTAS GUARDADAS', headerTitleAlign:'center'}} component={SavedSalesScreen} />
    </ProfilesStack.Navigator>
  );
}

export default withTheme(ProfilesStackScreen);
