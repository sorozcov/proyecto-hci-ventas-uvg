import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TextInput, withTheme, Text, Button } from 'react-native-paper';
import * as firebase from "firebase";


async function login(email, pass) {
  console.log("started");
   try {
       await firebase.auth()
           .signInWithEmailAndPassword(email, pass);
 
       console.log("Login succesfull");
 
       // Navigate to the Home page, the user is auto logged in
 
   } catch (error) {
       console.log(error.toString())
   }
 
}

function SigninScreen({ theme, navigation }) {
  const { colors, roundness } = theme;
  const [mailInput, changeMailInput] = useState('');
  const [password, changePassword] = useState('');
  return (
    <View style={styles.container}>
      <View style={{flex:0.2}}/>
      <View style={styles.formContainer}>
        <Text style={{...styles.textStyle, color: colors.accent, }}>Registro</Text>
        <TextInput
          style={styles.inputContainerStyle}
          mode={'outlined'}
          label="Correo"
          placeholder="Ingresa tu correo"
          value={mailInput}
          onChangeText={changeMailInput}
        />
        <TextInput
          style={styles.inputContainerStyle}
          mode={'outlined'}
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChangeText={changePassword}
          secureTextEntry={true}
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
          REGISTRARSE
        </Button>
      </View>  
    </View>
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
  inputContainerStyle: {
    margin: 8,
  },
  inputContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  textStyle:{
    textAlign: 'center', 
    fontFamily: 'dosis-extra-bold',
    fontSize:30,
    paddingBottom: 10
  }
});

export default withTheme(SigninScreen);