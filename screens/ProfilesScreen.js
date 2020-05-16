import React,{useState, useEffect} from 'react';
import { Image, StyleSheet, View ,FlatList} from 'react-native';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
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
import * as actionsLoggedUser from '../src/actions/loggedUser';


function ProfileScreen({ theme, navigation, user, logout }) {
  const { colors, roundness } = theme;
  const [image, setImage] = useState(null);
  const [errorLoadingImage, setErrorLoadingImage] = useState(false);
  useEffect(()=>{async function getImage(){
    
    if(!errorLoadingImage){
      
      try{
        
        if(user.image!=null){
            let img = await firebase.storage().ref().child(`UserImages/${user.image}_600x600.jpg`).getDownloadURL();
            setImage(img);
            
        } 
      }catch(error){
        
        
          setErrorLoadingImage(true);
          setTimeout(getImage,1000);
      
      }
    }
  }
  getImage();

  },[user.image])
 

  //const image = `https://firebasestorage.googleapis.com/v0/b/uvget-hci.appspot.com/o/UserImages%2F${user.image}_600x600.jpg?alt=media` ;
  return (
    <View style={styles.container}>
      { user.uid!=null && <View style={styles.profileContainer}>
        {image!=null &&  <Avatar.Image  style={{alignSelf:'center'}} size={Constants.platform.ios ? 190 : 140} source={{ uri: image }} onError={()=>console.log("error")}  />}
        {image==null &&  <Avatar.Icon  style={{alignSelf:'center'}}  size={Constants.platform.ios ? 190 : 140} icon="account" color="black"  />}
        
        <Text style={{
              fontFamily: 'dosis-bold',
              alignSelf: 'center', 
              marginTop:15,
              fontSize:Constants.platform.ios ? 35 : 28,
              textTransform:'uppercase'             
        }}>{user.name + " " + user.lastName}</Text>
        <Text style={{
              fontFamily: 'dosis-light',
              alignSelf: 'center', 
              marginTop:15,
              fontSize:Constants.platform.ios ? 20 : 18,
              textTransform:'uppercase'     
        }}>{"Correo " + user.email}</Text>
        <Text style={{
              fontFamily: 'dosis-light',
              alignSelf: 'center', 
              marginTop:15,
              fontSize:Constants.platform.ios ? 20 : 18,
              textTransform:'uppercase'          
        }}>{"Teléfono " + user.phoneNumber}</Text>
      </View>}
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
            onPress={() => navigation.navigate("SavedSalesScreen")}>
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
            onPress={() => logout(navigation)}>
            CERRAR SESIÓN
          </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "ios"? "15%" : "8%",
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
    bottom: 40,
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
    logout(navigation) {
      dispatch(actionsLoggedUser.logout());
      navigation.replace('Login');
    },
  }),
)(ProfileScreen);
