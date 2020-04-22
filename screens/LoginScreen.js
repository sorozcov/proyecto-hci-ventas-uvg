import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TextInput, Theme } from 'react-native-paper';

//import { DosisText } from '../components/StyledText';



export default function LoginScreen() {
  const [mailInput, changeMailInput] = useState('');
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={ require('../assets/images/logoUVGet.png') }
            style={styles.logoImage}
          />
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputContainerStyle}
            mode={'outlined'}
            label="Correo"
            placeholder="Ingresa tu correo"
            value={mailInput}
            onChangeText={changeMailInput}
          />
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainerStyle: {
    margin: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 120,
    marginBottom: 50,
  },
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  inputContainerStyle: {
    padding: 20
  },
});
