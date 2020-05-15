import React, { useState } from 'react';
import { Image, StyleSheet, View,Keyboard,Alert,KeyboardAvoidingView,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { TextInput, withTheme, Text, Button ,Avatar, Modal} from 'react-native-paper';
import { reduxForm, Field } from 'redux-form';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from "firebase";
import 'firebase/firestore';


import ImagePicker,* as imageUploadFunctions from '../components/ImagePickerUser';
import MyTextInput from '../components/textInput';
import * as actionsLoggedUser from '../src/actions/loggedUser';
import * as selectors from '../src/reducers';
let UUIDGenerator = require('react-native-uuid');

async function createUserCollectionFirebase ({email,name,lastName,image,phoneNumber,uid}){
  let db = firebase.firestore();
  let newUserDoc = db.collection('users').doc(uid);
  return newUserDoc.set({
    email:email, 
    name:name,
    lastName:lastName,
    phoneNumber:phoneNumber,
    uid:uid,
    image:image
  });
 
  
}




function SignupScreen({ theme, navigation, dirty, valid, handleSubmit, initialValues, saveUser }) {
  const { colors, roundness } = theme;
  const [modalVisibleIndicatorLogin, setmodalVisibleIndicatorLogin] = useState(false);
  const isNew = initialValues.uid==null;
  
  const signUp = values => {
    console.log('submitting form', values)
    signupFirebase(values)
  
  }
  async function signupFirebase({email, password,name,lastName,image,phoneNumber}) {
    Keyboard.dismiss();
    setmodalVisibleIndicatorLogin(true);
    try {
      if(isNew){
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        let uid = await firebase.auth().currentUser.uid;
        image = image!==undefined ? image : null;
        if(image!==null){
          let blob = await imageUploadFunctions.uriToBlob(image);
          let imageUid =  UUIDGenerator.v4();
          Console.log(imageUid);
          await imageUploadFunctions.uploadToFirebase(blob,imageUid);
          
          image = imageUid;
        }
        await createUserCollectionFirebase({email,name,lastName,image,phoneNumber,uid}) 
          await firebase.auth().currentUser.sendEmailVerification()
         setmodalVisibleIndicatorLogin(false);
         setTimeout(function(){
          Alert.alert(
           "Bienvenido " + name,
           "Su cuenta se ha creado con éxito. Revise su correo para verificar su cuenta.",
           [
             {text: 'OK', onPress: () => {}},
           ],
          )},100)
         // Navigate to the Home page, the user is auto logged in
         navigation.navigate('Login')
      } else {
        const userDoc = firebase.firestore().collection('users').doc(initialValues.uid);
        let uid = userDoc.id;
        image = image!==undefined ? image : null;
        if(image!==null && imageUploadFunctions.isEdited(image, initialValues.image)){
          let blob = await imageUploadFunctions.uriToBlob(image);
          let imageUid = await UUIDGenerator.v4();
          await imageUploadFunctions.uploadToFirebase(blob,imageUid);
          
          image = imageUid;
        }else{
          image = (await userDoc.get()).data().image;
        }
        await userDoc.update({email,name,lastName,image,phoneNumber,uid})
        saveUser(navigation, {email,name,lastName,image,phoneNumber,uid})
      }
      
    } catch (error) {
         console.log(error.toString());
         let errorMessage = ""
         switch(error.toString()) {
          case "Error: The email address is already in use by another account.":
            errorMessage="El correo ingresado ya está en uso por otro usuario."
            break;

          default:
            errorMessage = isNew ? "No se pudo crear el usuario." : "No se pudo editar el usuario."
        }
         setmodalVisibleIndicatorLogin(false);
         setTimeout(function(){
         Alert.alert(
          "Error",
          errorMessage,
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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.formContainer}>
          { isNew && (<Text style={{...styles.titleStyle, color: colors.accent, }}>Registro</Text>)}
          <Field name={'image'} component={ImagePicker} image={isNew ? null : initialValues.image}/>
          <Field name={'name'} component={MyTextInput} label='Nombre' placeholder='Ingresa tu nombre'/>
          <Field name={'lastName'} component={MyTextInput} label='Apellido' placeholder='Ingresa tu apellido'/>
          <Field name={'email'} component={MyTextInput} label='Correo' placeholder='Ingresa tu correo' keyboardType='email-address' disabled={isNew ? null : true}/>
          { isNew && (<Field name={'password'} component={MyTextInput} label='Contraseña' placeholder='Ingresa tu contraseña' secureTextEntry={true}/>)}
          { isNew && (<Field name={'passwordConfirm'} component={MyTextInput} label='Confirmación Contraseña' placeholder='Confirma tu contraseña' secureTextEntry={true}/>)}
          <Field name={'phoneNumber'} component={MyTextInput} label='Teléfono' placeholder='Ingresa tu número de teléfono' keyboardType='number-pad'/>
          <Button
            disabled={!(dirty && valid)}
            theme={roundness}
            color={'#000000'}
            icon={isNew ? 'login' : 'pencil'}
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
              marginTop:'4%',
              justifyContent: 'center',            
              
            }}
            onPress={handleSubmit(signUp)}>
            {isNew ? 'REGISTRARSE' : 'EDITAR PERFIL'}
          </Button>
        </View>
         
        { isNew && (<Text style={styles.textStyle}>¿Ya tienes una cuenta?  
          <Text style={{...styles.textStyle, color: colors.accent }} onPress={() => navigation.navigate('Login') }> Inicia Sesión</Text>
        </Text>)}
        </ScrollView>
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
  contentContainer: {
    paddingTop: 30,
  },
  inputContainerStyle: {
    margin: 8,
  },
  inputContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  titleStyle:{
    textAlign: 'center', 
    fontFamily: 'dosis-extra-bold',
    fontSize:30,
    paddingBottom: '6%',
    paddingTop: '8%'
  },
  textStyle:{
    textAlign: 'center', 
    fontFamily: 'dosis-semi-bold',
    paddingTop: 20,
    paddingBottom: 20,
    fontSize:16
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
  state => ({
    initialValues: selectors.getLoggedUser(state),
  }),
  dispatch => ({
    saveUser(navigation, sale) {
      dispatch(actionsLoggedUser.changeLoggedUser(sale));
      navigation.navigate('ProfilesScreen');
    },
  }),
)(reduxForm({ 
  form: 'signUp',
  enableReinitialize : true,
  validate: (values) => {
    const errors = {};
    errors.name = !values.name
      ? 'Este campo es obligatorio'
      : undefined;
    errors.lastName = !values.lastName
      ? 'Este campo es obligatorio'
      : undefined;
    errors.email = !values.email
      ? 'Este campo es obligatorio'
      :  !values.email.includes('@uvg.edu.gt')
      ? 'Tienes que ingresar un correo de la UVG'
      : undefined;
      errors.password = !values.password
        ? 'Este campo es obligatorio'
        : values.password.length < 8
        ? 'La contraseña debe de tener por lo menos 8 caracteres'
        : undefined;
      errors.passwordConfirm = !values.passwordConfirm
        ? 'Debe confirmar su contraseña'
        : values.passwordConfirm !== values.password 
        ? 'La contraseñas ingresadas no coinciden'
        : undefined;
      errors.phoneNumber = !values.phoneNumber
        ? 'Este campo es obligatorio'
        : values.phoneNumber.length != 8 || isNaN(parseInt(values.phoneNumber))
        ? 'Ingresa un número de teléfono correcto'
        : undefined;

    return errors;
  }
})(withTheme(SignupScreen)));