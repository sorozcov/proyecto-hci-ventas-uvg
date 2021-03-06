import React, { useState } from 'react';
import { Image, StyleSheet, ActivityIndicator,View,Modal,Alert,Keyboard ,KeyboardAvoidingView} from 'react-native';
import { TextInput, withTheme,Text, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import * as firebase from "firebase";

import * as actionsLoggedUser from '../src/actions/loggedUser';
import * as actionsCategories from '../src/actions/categories';
import * as actionsMySales from '../src/actions/mySales';
import * as actionsSavedSales from '../src/actions/savedSales';
import * as actionsApplicationSales from '../src/actions/applicationSales';


function LoginScreen({ theme, navigation, saveLoggedUser }) {
  const { colors, roundness } = theme;
  const [modalVisibleIndicatorLogin, setmodalVisibleIndicatorLogin] = useState(false);
  const [mailInput, changeMailInput] = useState('');
  const [password, changePassword] = useState('');
  async function login(email, pass) {
    Keyboard.dismiss();
    console.log("started");
    setmodalVisibleIndicatorLogin(true);
     try {
         
         await firebase.auth()
             .signInWithEmailAndPassword(email, pass);
   
            
            setmodalVisibleIndicatorLogin(false);
         // Navigate to the Home page, the user is auto logged in
         user=await firebase.auth().currentUser; 
         if(user.emailVerified){
            saveLoggedUser(navigation,user)
            console.log("Login succesfull");
         }else{
          console.log("Verificar correo!");
          setTimeout(function(){
            Alert.alert(
             "Verificar correo",
             "Verifique su correo electrónico para ingresar a la plataforma.",
             [
              {text: 'Enviar correo de nuevo', onPress: () => {firebase.auth().currentUser.sendEmailVerification()}},
               {text: 'Ok', onPress: () => {}},
             ],
            )},100)
         }
         
     } catch (error) {
         console.log(error.toString());
         setmodalVisibleIndicatorLogin(false);
         setTimeout(function(){
         Alert.alert(
          "Error",
          "Los datos ingresados no son válidos para ningún usuario.",
          [
            {text: 'OK', onPress: () => {}},
          ],
         )},100)
     }
   
  }
  async function resetPassword(email) {
    Keyboard.dismiss();
    setmodalVisibleIndicatorLogin(true);
     try {
         
         await firebase.auth().sendPasswordResetEmail(email);
   
        console.log("Password reset succesfull");
        setmodalVisibleIndicatorLogin(false);
        setTimeout(function(){
          Alert.alert(
           "Recuperación Contraseña",
           "Correo para reestablecimiento de contraseña enviado.",
           [
             {text: 'OK', onPress: () => {}},
           ],
          )},100)   
         

        
         
     } catch (error) {
         console.log(error.toString());
         setmodalVisibleIndicatorLogin(false);
         setTimeout(function(){
         Alert.alert(
          "Error",
          "Error, correo ingresado no válido.",
          [
            {text: 'OK', onPress: () => {}},
          ],
         )},100)
     }
   
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{flex:0.4}}/>
        <View style={styles.imageContainer}>
          <Image
            source={ require('../assets/images/logoUVGet.png') }
            style={styles.logoImage}
          />
        </View>
        <View style={{flex:0.2}}/>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputContainerStyle}
            mode={'outlined'}
            keyboardType='email-address'
            label="Correo"
            placeholder="Ingresa tu correo"
            value={mailInput}
            onChangeText={changeMailInput}
            returnKeyType={ "done" }
            
          />
          <TextInput
            style={styles.inputContainerStyle}
            mode={'outlined'}
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChangeText={changePassword}
            secureTextEntry={true}
            returnKeyType={ "done" }
          />
          <Button
            theme={roundness}
            color={'#000000'}
            icon="login"
            height = "18%"
            mode="contained"
            labelStyle={{
              fontFamily:"dosis-bold",
              fontSize: 15,
            }}
            style={{
              fontFamily: 'dosis',
              marginLeft: '5%',
              marginRight: '5%',
              marginTop:'4%',
              justifyContent: 'center',            
              
            }}
            onPress={() => login(mailInput,password)}>
            INICIAR SESIÓN
          
          </Button>
        <Text style={styles.textStyle}>¿Olvidaste tu contraseña?
          <Text style={{...styles.textStyle, color: colors.accent }} onPress={() => resetPassword(mailInput)}> Recuperar contraseña.</Text>
        </Text>
        <Text style={styles.textStyle}>¿No tienes una cuenta?  
          <Text style={{...styles.textStyle, color: colors.accent, }} onPress={() => navigation.navigate('Signup') }> Regístrate</Text>
        </Text>
        </View>    
       
      </View>
      
      <Modal
        transparent={true}
        animationType={'none'}
        visible={modalVisibleIndicatorLogin}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" animating={modalVisibleIndicatorLogin} color={colors.primary}/>
          </View>
        </View>
    </Modal>     
            
         
    

    </View>
    </KeyboardAvoidingView>
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
    paddingTop:50
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 5,
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
    width: 150,
    height: 150,
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
    fontSize:16,
    paddingTop:'4%',
    
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default connect(
  undefined,
  dispatch => ({
    async saveLoggedUser(navigation,user) {
      //Se cargan las categorias
      dispatch(actionsCategories.clearCategories());
      const categories = await firebase.firestore().collection('categories').orderBy("name").get();
      categories.docs.map(doc=> dispatch(actionsCategories.addCategory(doc.data())));
      //Se cargan los usuarios
      const userLoggedIn = await firebase.firestore().collection('users').doc(user.uid).get();
      dispatch(actionsLoggedUser.login(userLoggedIn.data()));
      //Se cargan las ventas del usuario en sesión
      dispatch(actionsMySales.clearMySales());
      const userSales = await firebase.firestore().collection('sales').where('user.uid','==',user.uid).get();
      userSales.docs.map(sale => dispatch(actionsMySales.addMySale(sale.data())));
      //Se cargan las ventas que el usuario en sesión guardo
      dispatch(actionsSavedSales.clearSavedSales());
      const savedSales = await firebase.firestore().collection('sales').where('usersSaveForLater','array-contains',user.uid).get();
      savedSales.docs.map(sale => dispatch(actionsSavedSales.saveSale(sale.data())));
      //Se cargan las primeras 20 application sales
      const applicationSales = await firebase.firestore().collection('sales').where("isSold", "==", false).orderBy("dateCreated", "desc").limit(20).get();
      let appSales= [];
      applicationSales.docs.forEach(sale => {
        appSales.push(sale.data());
      })
      dispatch(actionsApplicationSales.fetchNewSales(appSales));
      navigation.replace('Home');
    },
  }),
)(withTheme(LoginScreen));