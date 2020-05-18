import * as React from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, Platform,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {withTheme,Avatar, Title, Caption, Paragraph, Drawer} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ImagePicker from '../components/ImagePickerUser';
import { createDrawerNavigator,  DrawerItem,DrawerContentScrollView, } from '@react-navigation/drawer';
import SalesStackScreen from './SalesStackScreen';
import ProfileStackScreen from './ProfileStackScreen';
import ExploreScreen from './ExploreScreen';
import * as selectors from '../src/reducers';
import { connect } from 'react-redux';
import * as actionsLoggedUser from '../src/actions/loggedUser';
import Constants from 'expo-constants';


const Tab = createBottomTabNavigator();
const DrawerR = createDrawerNavigator();

function DrawerContent(props) {
  const {navigation} = props;
  const {user,logout} = props.otherProps;
  const image = (user.image!=null ? `https://firebasestorage.googleapis.com/v0/b/uvget-hci.appspot.com/o/UserImages%2F${user.image}_600x600.jpg?alt=media` : null) ;

  return (
    <DrawerContentScrollView {...props}>
    <View
      style={
        styles.drawerContent
      }
    >
   
      <View style={styles.userInfoSection}>

        {image!=null && <Avatar.Image   size={Constants.platform.ios ? 160 : 140} source={{ uri: image }} onError={()=>console.log("error")}  />}
        {image==null && <Avatar.Icon    size={Constants.platform.ios ? 160 : 140} icon="account" color="black"  />}
        <Title style={styles.title}>{user.name + " "+ user.lastName}</Title>
        <Caption style={styles.caption}>{user.email}</Caption>
       
      </View>
      <Drawer.Section style={styles.drawerSection}>
      <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={size}
            />
          )}
          label="Perfil"
          labelStyle={{ fontSize: 16,fontFamily:'dosis-bold' }}
          onPress={() => navigation.navigate('Perfil', { screen: 'ProfilesScreen' })}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="logout"
              color={color}
              size={size}
            />
          )}
          label="Cerrar sesión"
          labelStyle={{ fontSize: 16,fontFamily:'dosis-bold' }}
          onPress={() => logout(navigation)}
        />
        
      </Drawer.Section>
      <View style={styles.footer}>
      <Image
            source={ require('../assets/images/logoUVGet.png') }
            style={styles.logoImage}
          />
         
      </View>
     
    </View>
  </DrawerContentScrollView>
  );
}

function RootNavigator({theme,navigation,user,logout}) {
  return (
    <DrawerR.Navigator drawerContent={() => <DrawerContent navigation={navigation} otherProps={{user,logout}} />}>
      <DrawerR.Screen name="Main" component={Main} />
    </DrawerR.Navigator>
  );
};

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
    width: 100,
    height: 100,
    marginTop:40,
    resizeMode: 'contain',
    alignSelf:'center',
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
  },
  drawerContent: {
    flex: 1,
    flexDirection:'column',
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor:'black',
    marginBottom:10,
    paddingBottom:10,
    paddingTop:10,
  },
  checkpointInfo: {
    paddingLeft: 20,
    backgroundColor:'red',
    marginBottom:10,
    paddingBottom:10,
    paddingTop:10,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
    fontFamily:'dosis-bold',
    color:'white'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily:'dosis-bold',
    color:'white'
  },
  restaurantName: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily:'dosis-bold',
    color:'black',

  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

Main = withTheme(Main);
export default connect(
  state => ({
    user: selectors.getLoggedUser(state),
  }),
  dispatch => ({
    logout(navigation) {
      dispatch(actionsLoggedUser.logout());
      navigation.replace('Login');
    },
  }),
)(withTheme(RootNavigator));