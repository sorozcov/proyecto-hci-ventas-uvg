import * as React from 'react';
import  { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { ActionPicker } from 'react-native-action-picker';
import * as firebase from "firebase";

uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };
      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      
      xhr.send(null);
    });
  }


  uploadToFirebase = (blob) => {
    return new Promise((resolve, reject)=>{
      var storageRef = firebase.storage().ref();
      storageRef.child('UserImages/photo.jpg').put(blob, {
        contentType: 'image/jpeg'
      }).then((snapshot)=>{
        blob.close();
        resolve(snapshot);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

 

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    actionPickerVisible:false
  };

  render() {
    let { image,actionPickerVisible } = this.state;
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button style={{fontFamily:"dosis-medium"}} title="Subir imagen" onPress={()=>this.setState({ actionPickerVisible: true })} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 ,borderRadius:50}} />}
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
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    
  };

  _takeImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      }).then(result=>{
            if (!result.cancelled) {
                this.setState({ image: result.uri });
                return uriToBlob(result.uri)
            }

            console.log(result);
            }).then(blob=>{
                return uploadToFirebase(blob);
            }).then((snapshot)=>{

                console.log("File uploaded");
            
            }).catch((error)=>{
        
                throw error;
        
            }); 
    } catch (E) {
      console.log(E);
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      }).then(result=>{
            if (!result.cancelled) {
                this.setState({ image: result.uri });
                return uriToBlob(result.uri)
            }

            console.log(result);
            }).then(blob=>{
                return uploadToFirebase(blob);
            }).then((snapshot)=>{

                console.log("File uploaded");
            
            }).catch((error)=>{
        
                throw error;
        
            }); 
    } catch (E) {
      console.log(E);
    }
  };

  createOptions = () => {
    return [
      {label: 'Abrir Galería', action: () => this._pickImage()},
      {label: 'Abrir cámara', action: () => this._takeImage()},
      
    ];
  }
}