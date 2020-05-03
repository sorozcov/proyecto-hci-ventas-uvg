import React, { useState, useRef } from 'react';
import { StyleSheet, View,KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator, Switch } from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Text, Button, Modal, IconButton } from 'react-native-paper';
import { Tooltip } from 'react-native-elements';
import { reduxForm, Field } from 'redux-form';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker,* as imageUploadFunctions from '../components/ImagePickerProduct';
import * as firebase from "firebase";


import * as actionsMySales from '../src/actions/mySales';
import * as selectors from '../src/reducers';
import MyTextInput from '../components/textInput';
import PickerInput from '../components/PickerInput';
import SwitchInput from '../components/SwitchInput';


function EditSaleScreen({ theme, navigation, dirty, valid, handleSubmit, categories, saveSale, deleteSale, loggedUser, initialValues }) {
  const { colors, roundness } = theme;
  const [modalVisibleIndicatorSale, setmodalVisibleIndicatorSale] = useState(false);
  const tooltipRef = useRef(null);
  const isNew = initialValues==null;
  if(!isNew)
    navigation.setOptions({ title: 'EDITAR VENTA' });

  async function createSaleCollectionFirebase(values){
    Keyboard.dismiss();
    setmodalVisibleIndicatorSale(true);
    //Se guarda la imagen
    try {

      var newSaleDoc = null;
      var uid = "";
      if(isNew){
        newSaleDoc = firebase.firestore().collection('sales').doc();
        uid = newSaleDoc.id;
      } else {
        newSaleDoc = firebase.firestore().collection('sales').doc(initialValues.saleid);
        uid = newSaleDoc.id;
      }

      values.image = values.image!==undefined ? values.image : null;
      if(values.image!==null && (isNew || imageUploadFunctions.isEdited(values.image, initialValues.image))){

        if(!isNew){ 
          await firebase.storage().ref("ProductImages/" + uid + '.jpg').delete();
          await firebase.storage().ref("ProductImages/" + uid + '_300x300.jpg').delete();
          await firebase.storage().ref("ProductImages/" + uid + '_600x600.jpg').delete();
        }

        let blob = await imageUploadFunctions.uriToBlob(values.image);        
        //console.log(base64);
        let upload = await imageUploadFunctions.uploadToFirebase(blob,uid);
        //let upload = await imageUploadFunctions.uploadToFirebaseBase64(base64,uid);
        values.image = uid;
      }
      let selectedCategories = [];
      values.category.map(categorySelectedId => {
        selectedCategories.push(categories.filter(category => category.categoryid === categorySelectedId)[0]);
      })
      let categoriesFilter = {}
      values.category.forEach(categoryId => {
            categoriesFilter[categoryId]=true 
      });
      let dateCreated = new Date();
      dateCreated = dateCreated.getTime();
      if(isNew){
        var newSaleInfo = {
          saleid: uid, 
          name: values.name,
          description: values.description,
          price: values.price,
          state: values.state[0],
          category: selectedCategories,
          categories:categoriesFilter,
          image: values.image,
          user: loggedUser,
          dateCreated:dateCreated,
          isSold: false,
          usersSaveForLater: [],
        };
        newSaleDoc.set(newSaleInfo);
        setmodalVisibleIndicatorSale(false);
        saveSale(navigation, newSaleInfo, isNew);
      } else {
        var editSaleInfo = {
          saleid: uid,
          name: values.name,
          description: values.description,
          price: values.price,
          state: values.state[0],
          category: selectedCategories,
          categories:categoriesFilter,
          dateLastEdited:dateCreated,
          isSold: values.isSold,
        };
        newSaleDoc.update(editSaleInfo);
        setTimeout(function(){
          setmodalVisibleIndicatorSale(false);
        },500)
        saveSale(navigation, editSaleInfo, isNew);
      }

    } catch (error) {
      console.log("ERROR" + error.toString());
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
  async function deleteSaleCollectionFirebase(){
    Keyboard.dismiss();
    setmodalVisibleIndicatorSale(true);
    //Se guarda la imagen
    try {

      await firebase.firestore().collection('sales').doc(initialValues.saleid).delete();
      await firebase.storage().ref("ProductImages/" + initialValues.saleid + '.jpg').delete();
      await firebase.storage().ref("ProductImages/" + initialValues.saleid + '_300x300.jpg').delete();
      await firebase.storage().ref("ProductImages/" + initialValues.saleid + '_600x600.jpg').delete();
      setmodalVisibleIndicatorSale(false);
      deleteSale(navigation, initialValues.saleid);

    } catch (error) {
      console.log("ERROR" + error.toString());
      let errorMessage = "No se pudo eliminar la venta"
      
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
        <Field name={'image'} component={ImagePicker} image={isNew ? null : initialValues.image}/>
        {!isNew && <Field name={'isSold'} component={SwitchInput} title={'Vendido:'} />} 
        <Field name={'name'} component={MyTextInput} label='Título' placeholder='Ingresa el nombre del producto' maxLength={20} />
        <Field name={'description'} component={MyTextInput} label='Descripción' placeholder='Ingresa una descripción' multiline={true}/>
        <Field name={'price'} component={MyTextInput} label='Precio' placeholder='Ingresa el precio que tendrá el producto' keyboardType='numeric'/>
        <Field name={'state'} component={PickerInput} title='Estado' single={true} selectedText="Estado" placeholderText="Seleccionar estado" options={[{ label:'Nuevo', value:"1" }, { label:'Usado', value:"2" }]} 
          selectedItems={!isNew?[initialValues.state]:[]}/>
        <View style={styles.containerTooltip}>
          <View style={styles.tooltipStyle}>
            <Tooltip ref={tooltipRef} height={120} popover={<Text style={{color:'white'}}>Las categorías serán usadas para filtrar las busquedas en la aplicación.</Text>} backgroundColor={"#03A9F4"}/>
            <IconButton
              icon="information"
              color={"white"}
              style={{backgroundColor:"#03A9F4",flex:0}}
              size={18}
              onPress={() => tooltipRef.current.toggleTooltip()}
              />
          </View>
          <Field name={'category'} component={PickerInput} title='Categoría' single={false} selectedText="Categoría" placeholderText="Seleccionar categoría" options={categories.map(category => ({ label:category.name, value:category.categoryid }))} 
            selectedItems={!isNew?initialValues.category.map(category => (category.categoryid)):[]}/>
        </View>
        <View style={{marginTop:'2%'}}>
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
              justifyContent: 'center',            
              
            }}
            onPress={handleSubmit(createSaleCollectionFirebase)}>
            {isNew ? 'CREAR' : 'EDITAR'}
          </Button>
        </View>
        <View style={{marginTop:'2%'}}>
          {!isNew && <Button
            theme={roundness}
            color={'red'}
            icon="delete"
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
              
            }}
            onPress={() => deleteSaleCollectionFirebase()}>
            {'ELIMINAR'}
          </Button>}
        </View>
        <Text style={styles.textStyle} >{'En esta aplicación solo esta permitido la venta de artículos para su uso en la Universidad del Valle de Guatemala.'}</Text>
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
  textStyle:{
    textAlign: 'center', 
    fontFamily: 'dosis-light',
    padding: '4%',
    fontSize:16
  },
  containerTooltip: {
    flex: 1,
    flexDirection: 'row',
  },
  tooltipStyle: {
    width:30,
    paddingLeft:8,
    paddingTop:25,
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
    initialValues: selectors.getMySaleSelected(state),
  }),
  dispatch => ({
    saveSale(navigation, sale, isNew) {
      if(isNew)
        dispatch(actionsMySales.addMySale(sale));
      if(!isNew)
        dispatch(actionsMySales.changeMySale(sale));
      navigation.navigate('SalesScreen');
    },
    deleteSale(navigation, saleid) {
      dispatch(actionsMySales.deleteMySale(saleid));
      navigation.navigate('SalesScreen');
    },
  }),
)(reduxForm({ 
  form: 'signUp',
  enableReinitialize : true,
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