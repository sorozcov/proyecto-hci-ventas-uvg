import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Text, Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

import * as firebase from "firebase";
import * as actionsCategories from '../src/actions/categories';


function SalesScreen({ theme, navigation, onClick }) {
  const { colors, roundness } = theme;
  return (
    <View style={styles.container}>
      <Button
        theme={roundness}
        color={'#000000'}
        icon="plus"
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
        onPress={() => navigation.navigate('EditSaleScreen')}>
        NUEVA VENTA
      </Button>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:"15%",
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'dosis-regular',
  },
  contentContainer: {
    paddingTop: 30,
  },
});

export default withTheme(SalesScreen);
