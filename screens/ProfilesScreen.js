import React,{useState} from 'react';
import { Image, StyleSheet, View ,FlatList} from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Text, Button,Card,FAB,Avatar } from 'react-native-paper';
import CardComponent from '../components/CardComponent';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from "firebase";
import { useScrollToTop } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as selectors from '../src/reducers';
import * as actionsMySales from '../src/actions/mySales';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Asset } from 'react-native-unimodules';

import { Font } from 'expo';


function ProfileScreen({ theme, navigation, user }) {
  const { colors, roundness } = theme;
  
  const image = `https://firebasestorage.googleapis.com/v0/b/uvget-hci.appspot.com/o/UserImages%2F${user.image}_600x600.jpg?alt=media` ;
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {user.image!=null &&  <Avatar.Image style={{alignSelf:'center'}} size={190} source={{ uri: image }}  />}
        {user.image==null &&  <Avatar.Icon  style={{alignSelf:'center'}}  size={190} icon="account" color="black"  />}
        <Text style={{
              fontFamily: 'dosis-bold',
              alignSelf: 'center', 
              marginTop:15,
              fontSize:35,
              textTransform:'uppercase'             
        }}>{user.name + " " + user.lastName}</Text>
        <Text style={{
              fontFamily: 'dosis-light',
              alignSelf: 'center', 
              marginTop:15,
              fontSize:20,
              textTransform:'uppercase'     
        }}>{"Correo " + user.email}</Text>
        <Text style={{
              fontFamily: 'dosis-light',
              alignSelf: 'center', 
              marginTop:15,
              fontSize:20,
              textTransform:'uppercase'          
        }}>{"Teléfono " + user.phoneNumber}</Text>
      </View>
      <View style={styles.bottomContainer}>
          <Button
            theme={roundness}
            color={'#000000'}
            icon="bookmark"
            height={50}
            mode="contained"
            labelStyle={{
              fontFamily:"dosis-bold",
              fontSize: 15,
            }}
            style={{
              fontFamily: 'dosis',
              marginLeft: '5%',
              marginRight: '5%',
              justifyContent: 'center', 
              marginTop:15             
              
            }}
            onPress={() => null}>
            MIS VENTAS GUARDADAS
          </Button>
          <Button
            theme={roundness}
            color={'#000000'}
            icon="account-edit"
            height={50}
            mode="contained"
            labelStyle={{
              fontFamily:"dosis-bold",
              fontSize: 15,
            }}
            style={{
              fontFamily: 'dosis',
              marginLeft: '5%',
              marginRight: '5%',
              justifyContent: 'center', 
              marginTop:15             
              
            }}
            onPress={() => navigation.navigate('EditProfileScreen')}>
            EDITAR PERFIL
          </Button>
          <Button
            theme={roundness}
            color={'#000000'}
            icon="logout"
            height={50}
            mode="contained"
            labelStyle={{
              fontFamily:"dosis-bold",
              fontSize: 15,
            }}
            style={{
              fontFamily: 'dosis',
              marginLeft: '5%',
              marginRight: '5%',
              justifyContent: 'center', 
              marginTop:15             
              
            }}
            onPress={() => navigation.replace('Login')}>
            CERRAR SESIÓN
          </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:"15%",
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'dosis-regular',
    height:'100%',
    
  },
  profileContainer: {
    flex:0.7,
    paddingTop:40
    
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flex:0.3
    
  },
  containerScrollView: {
    flex: 1,
    marginTop:"2%",
    marginBottom:"-10%",
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'dosis-regular',
  },
  contentContainer: {
    paddingTop: 0
  },
  textStyle:{
    textAlign: 'center', 
    fontFamily: 'dosis-light',
    padding: '2%',
    fontSize:20
  },
});
ProfileScreen = withTheme(ProfileScreen)
export default connect(
  state => ({

    user: selectors.getLoggedUser(state),
  }),
  dispatch => ({
  
  }),
)(ProfileScreen);
