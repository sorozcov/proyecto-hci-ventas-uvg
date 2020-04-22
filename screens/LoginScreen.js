import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TextInput, withTheme, Text, Button } from 'react-native-paper';

//import { DosisText } from '../components/StyledText';



function LoginScreen(props) {
  const { colors } = props.theme;
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
            color={'#000000'}
            icon="face"
            roundness="4"
            mode="contained"
            style={{
              fontFamily: 'dosis',
              marginLeft: '5%',
              marginRight: '5%',
              
              alignText: 'center',
              fontSize: '18px',
            }}
            onPress={() => console.log('Pressed')}>
            INICIAR SESIÓN
          </Button>
        </View>      
      </View>
      <View style={styles.bottomContainer}>
      <View style={styles.bottomContainer}></View>
        <Text style={{textAlign: 'center'}}>¿No tienes una cuenta?  
          <Text style={{textAlign: 'center', color: colors.accent}}> Regístrate</Text>
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
    bottom: 10,
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
});

export default withTheme(LoginScreen);