import * as React from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {withTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Constants} from 'expo';
import ImagePicker from '../components/ImagePickerUser';

import SalesStackScreen from './SalesStackScreen';
import ProfileStackScreen from './ProfileStackScreen';
import ExploreScreen from './ExploreScreen';





const Tab = createBottomTabNavigator();

function Main({theme, navigation}) {
  const {colors} = theme;
  return (
      <Tab.Navigator
        initialRouteName="Explorar"
        tabBarOptions={{
          keyboardHidesTabBar:true,
          activeBackgroundColor:"#f0edf6",
          activeTintColor:"white",
          inactiveTintColor:"black",
          inactiveBackgroundColor:"#000000",
          tabStyle:{ backgroundColor: colors.primary ,paddingBottom:Platform.OS=="ios" ?38:8,marginBottom:Platform.OS=="ios" ? -40:0,paddingTop:20,marginTop:-15,fontSize:'50px'},
          labelStyle:{fontSize: 12,fontFamily:'dosis-bold'}
        }}
        >
       
        <Tab.Screen name="Explorar"  component={ExploreScreen}
          options={{            
            tabBarLabel: 'EXPLORAR',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cart" color={color} size={25}
              style={{ marginTop: 0,paddingBottom:8 }} />
            ),
          }}
        />
        <Tab.Screen name="Mis Ventas" component={SalesStackScreen} 
          options={{
            tabBarLabel: 'MIS VENTAS',
            tabBarIcon: ({ color }) => (
             <MaterialCommunityIcons name="shopify" color={color} size={25}
             style={{ marginTop: 0,paddingBottom:8 }}/>
           ),
         }}/>
         <Tab.Screen name="Perfil" component={ProfileStackScreen}
          options={{
            tabBarLabel: 'PERFIL',
          
           tabBarIcon: ({ color }) => (
             <MaterialCommunityIcons name="account"  color={color} size={25}
             style={{ marginTop: 0,paddingBottom:8 }}  />
           ),
           
         }}/>
             
      </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'dosis-regular',
  },
  topContainer: {
    flex: 0.8,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  inputContainerStyle: {
    margin: 8,
  },
  imageContainer: {
    alignItems: 'center'
  },
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  inputContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  textStyle:{
    textAlign: 'center', 
    fontFamily: 'dosis-semi-bold',
    fontSize:16
  }
});

export default withTheme(Main);