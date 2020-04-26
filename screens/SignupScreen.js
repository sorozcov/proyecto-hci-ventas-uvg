import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { TextInput, withTheme, Text, Button ,Avatar, TouchableRipple} from 'react-native-paper';
import { reduxForm, Field } from 'redux-form';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from '../components/ImagePickerUser';
import * as firebase from "firebase";
import MyTextInput from '../components/textInput';

const signUp = values => {
  console.log('submitting form', values)
}

function SignupScreen({ theme, navigation, dirty, valid, handleSubmit }) {
  const { colors, roundness } = theme;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text style={{...styles.titleStyle, color: colors.accent, }}>Registro</Text>
          <Field name={'image'} component={ImagePicker} image={null}/>
          <Field name={'name'} component={MyTextInput} label='Nombre' placeholder='Ingresa tu nombre'/>
          <Field name={'lastName'} component={MyTextInput} label='Apellido' placeholder='Ingresa tu apellido'/>
          <Field name={'email'} component={MyTextInput} label='Correo' placeholder='Ingresa tu correo' keyboardType='email-address'/>
          <Field name={'password'} component={MyTextInput} label='Contraseña' placeholder='Ingresa tu contraseña' secureTextEntry={true}/>
          <Field name={'passwordConfirm'} component={MyTextInput} label='Confirmación Contraseña' placeholder='Confirma tu contraseña' secureTextEntry={true}/>
          <Field name={'phoneNumber'} component={MyTextInput} label='Teléfono' placeholder='Ingresa tu número de teléfono' keyboardType='numeric'/>
          <Button
            disabled={!(dirty && valid)}
            theme={roundness}
            color={'#000000'}
            icon="login"
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
            REGISTRARSE
          </Button>
        </View>
        <Text style={styles.textStyle}>¿Ya tienes una cuenta?  
          <Text style={{...styles.textStyle, color: colors.accent }} onPress={() => navigation.navigate('Login') }> Inicia Sesión</Text>
        </Text>
        </ScrollView>
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
    paddingTop: '4%',
    paddingBottom: '4%',
    fontSize:16
  }
});

export default connect(
  undefined,
  undefined,
)(reduxForm({ 
  form: 'signUp',
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