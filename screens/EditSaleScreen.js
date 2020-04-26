import React from 'react';
import { Image, StyleSheet, View,KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { TextInput, withTheme, Text, Button } from 'react-native-paper';
import { reduxForm, Field } from 'redux-form';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker,* as imageUploadFunctions from '../components/ImagePickerProduct';

import * as firebase from "firebase";
import MyTextInput from '../components/textInput';

const signUp = values => {
  console.log('submitting form', values)
}

function EditSaleScreen({ theme, navigation, dirty, valid, handleSubmit }) {
  const { colors, roundness } = theme;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Field name={'image'} component={ImagePicker} image={null}/>
          <Field name={'name'} component={MyTextInput} label='Nombre' placeholder='Ingresa el nombre del producto'/>
          <Field name={'description'} component={MyTextInput} label='Descripción' placeholder='Ingresa una descripción'/>
          <Field name={'price'} component={MyTextInput} label='Precio' placeholder='Ingresa el precio que tendrá el producto' keyboardType='numeric'/>
          <Button
            disabled={!(dirty && valid)}
            theme={roundness}
            color={'#000000'}
            icon="cart"
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
            CREAR
          </Button>
        </View>
        </ScrollView>
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
  contentContainer: {
    paddingTop: '5%',
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
    fontSize:25,
    paddingBottom: '10%',
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
    errors.description = !values.description
      ? 'Este campo es obligatorio'
      : undefined;
    errors.price = !values.price
      ? 'Este campo es obligatorio'
      : isNaN(parseInt(values.price))
      ? 'Ingresa un número correcto'
      : undefined;

    return errors;
  }
})(withTheme(EditSaleScreen)));