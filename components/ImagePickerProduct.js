import * as React from 'react';
import  { useState } from 'react';
import {  Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { ActionPicker } from 'react-native-action-picker';
import * as firebase from "firebase";
import {Avatar} from 'react-native-elements';
import {Button,TextInput} from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

export const isEdited = (imageLink, image) => {
  return (imageLink !== `https://firebasestorage.googleapis.com/v0/b/uvget-hci.appspot.com/o/ProductImages%2F${image}_600x600.jpg?alt=media`);
};

export const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      // return the blob
      resolve(xhr.response);
    };
    
    xhr.onerror = function() {
      // something went wrong
      console.log("error");
      reject(new Error('uriToBlob failed'));
      
    };
    // this helps us get a blob
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    
    xhr.send(null);
  });
}

export const uriToBase64 = async(uri)=>{
   let base64 = await  ImageManipulator.manipulateAsync(uri, [], { base64: true });
   return base64.base64
  
}

export const uploadToFirebaseBase64 = async (base64,uid) => {
  let storageRef = await firebase.storage().ref();
  let img = "ProductImages/" + uid+'.jpg';
  let snapshot = await storageRef.child(img).putString(base64, 'base64', {contentType:'image/jpg'});
  console.log('Uploaded a base64 string!');
  return;
}


export const uploadToFirebase2 = (blob,uid) => {
  return new Promise((resolve, reject)=>{
    let storageRef = firebase.storage().ref();
    let img = "ProductImages/" + uid+'.jpg';
    storageRef.child(img).put(blob, {
      contentType: 'image/jpeg'
    }).then((snapshot)=>{
      blob.close();
      resolve(snapshot);
      console.log(snapshot);
      snapshot.ref.getDownloadURL().then( 
        (downloadURL) =>{
          
          resolve(downloadURL);
       })
    }).catch((error)=>{
      reject(error);
    });
  });
}

export const uploadToFirebase = async (blob,uid) => {
  let storageRef = await firebase.storage().ref();
  let img = "ProductImages/" + uid+'.jpg';
  let snapshot = await storageRef.child(img).put(blob, {
    contentType: 'image/jpeg'
  });
  return;
}
 

export default class ImagePickerUser extends React.Component {
  
  state = {
    image: null,
    actionPickerVisible:false,
  };
  input = this.props.input;
  constructor(props){
    super(props)
    if(props.image != null)
      this.state.image = `https://firebasestorage.googleapis.com/v0/b/uvget-hci.appspot.com/o/ProductImages%2F${props.image}_600x600.jpg?alt=media`;
  };
  render() {
    this.props.input.onChange(this.state.image)
    let { image,actionPickerVisible } = this.state;
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        {!image &&  <Avatar size={200} overlayContainerStyle={{backgroundColor: '#00C331'}} icon={{name: 'image', color: 'white',type: 'material'}}  />}
        
        {image &&  <Avatar  size={200} source={{ uri: image }}  />}
        <Button labelStyle={{fontFamily:"dosis-bold"}} onPress={()=>this.setState({ actionPickerVisible: true })} >Cambiar Imagen</Button>
        <ActionPicker
            style={{fontFamily:"dosis-medium"}}
          options={this.createOptions()}
          isVisible={actionPickerVisible}
          onCancelRequest={()=>this.setState({ actionPickerVisible: false})} />
       
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Lo siento, necesitamos los permisos de la cámara para funcionar!');
      }
    }
    if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status !== 'granted') {
          alert('Lo siento, necesitamos los permisos de la cámara para funcionar!');
        }
      }
    
  };

  _takeImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.4,
      }).then(result=>{
        if (!result.cancelled) {
            this.setState({ image: result.uri });
            this.setState({ actionPickerVisible: false});
        }

      }) 
    } catch (E) {
      console.log(E);
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.4,
      }).then(result=>{
            if (!result.cancelled) {
                this.setState({ image: result.uri });
                this.setState({ actionPickerVisible: false});
            }

          })    
    } catch (E) {
      console.log(E);
    }
  };

  createOptions = () => {
    return [
      {label: 'Abrir Galería', action: () => this._pickImage()},
      {label: 'Abrir Cámara', action: () => this._takeImage()},
      
    ];
  }
}