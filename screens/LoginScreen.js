import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TextInput, withTheme, Text, Button } from 'react-native-paper';

//import { DosisText } from '../components/StyledText';



function LoginScreen(props) {
  const { colors, roundness } = props.theme;
  const [mailInput, changeMailInput] = useState('');
  const [password, changePassword] = useState('');
  return (
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
            onPress={() => console.log('Pressed')}>
            INICIAR SESIÓN
          </Button>
        </View>      
      </View>
      <View style={styles.bottomContainer}>
      <View style={styles.bottomContainer}></View>
        <Text style={styles.textStyle}>¿No tienes una cuenta?  
          <Text style={{...styles.textStyle, color: colors.accent, }}> Regístrate</Text>
        </Text>
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

export default withTheme(LoginScreen);