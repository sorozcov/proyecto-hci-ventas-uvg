import React, { useState } from 'react';
import { StyleSheet, View,KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { TextInput, withTheme, Text, Button, Modal } from 'react-native-paper';
import { reduxForm, Field } from 'redux-form';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker,* as imageUploadFunctions from '../components/ImagePickerProduct';
import * as firebase from "firebase";


import * as actionsMySales from '../src/actions/mySales';
import * as selectors from '../src/reducers';
import MyTextInput from '../components/textInput';
import PickerInput from '../components/PickerInput';


function EditSaleScreen({ theme, navigation, dirty, valid, handleSubmit, categories, saveSale, loggedUser }) {
  const { colors, roundness } = theme;
  const [modalVisibleIndicatorSale, setmodalVisibleIndicatorSale] = useState(false);
  async function createSaleCollectionFirebase(values){
    Keyboard.dismiss();
    setmodalVisibleIndicatorSale(true);
    //Se guarda la imagen
    try {

      let newSaleDoc = firebase.firestore().collection('sales').doc();
      let uid = newSaleDoc.id;

      values.image = values.image!==undefined ? values.image : null;
      if(values.image!==null){
        let blob = await imageUploadFunctions.uriToBlob(values.image);
        await imageUploadFunctions.uploadToFirebase(blob,uid);
      
        values.image = uid;
      }

      var newSaleInfo = {
        saleid: uid, 
        name: values.name,
        description: values.description,
        price: values.price,
        state: values.state[0],
        category: values.category,
        image: values.image,
        user: loggedUser,
        isSold: false,
        usersSaveForLater: [],
      };

      newSaleDoc.set(newSaleInfo);
      setmodalVisibleIndicatorSale(false);
      saveSale(navigation, newSaleInfo);

    } catch (error) {
      console.log(error.toString());
      let errorMessage = "No se pudo guardar la venta"
      
      setmodalVisibleIndicatorSale(false);
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
    <View style={{...styles.container}}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Field name={'image'} component={ImagePicker} image={null}/>
        <Field name={'name'} component={MyTextInput} label='Nombre' placeholder='Ingresa el nombre del producto'/>
        <Field name={'description'} component={MyTextInput} label='Descripción' placeholder='Ingresa una descripción'/>
        <Field name={'price'} component={MyTextInput} label='Precio' placeholder='Ingresa el precio que tendrá el producto' keyboardType='numeric'/>
        <Field name={'state'} component={PickerInput} title='Estado' single={true} selectedText="Estado" placeholderText="Seleccionar estado" options={[{ label:'Nuevo', value:"1" }, { label:'Usado', value:"2" }]} selectedItems={[]}/>
        <Field name={'category'} component={PickerInput} title='Categoría' single={false} selectedText="Categoría" placeholderText="Seleccionar categoría" options={categories.map(category => ({ label:category.name, value:category.categoryid }))} selectedItems={[]}/>
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
          onPress={handleSubmit(createSaleCollectionFirebase)}>
          CREAR
        </Button>
        <Modal
            transparent={true}
            animationType={'none'}
            visible={modalVisibleIndicatorSale}>
            <View style={styles.modalBackground}>
              <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator size="large" animating={modalVisibleIndicatorSale} color={colors.primary}/>
              </View>
            </View>
        </Modal>
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
    paddingBottom: '5%',
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
    categories: selectors.getCategories(state),
    loggedUser: selectors.getLoggedUser(state),
  }),
  dispatch => ({
    async saveSale(navigation, sale) {
      dispatch(actionsMySales.addMySale(sale));
      navigation.navigate('SalesScreen');
    },
  }),
)(reduxForm({ 
  form: 'signUp',
  validate: (values) => {
    const errors = {};
    errors.image = !values.image
      ? 'Este campo es obligatorio'
      : undefined;
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
    errors.state = values.state && values.state.length === 0
      ? 'Este campo es obligatorio'
      : undefined;
    errors.category = values.category && values.category.length === 0
      ? 'Este campo es obligatorio'
      : undefined;

    return errors;
  }
})(withTheme(EditSaleScreen)));