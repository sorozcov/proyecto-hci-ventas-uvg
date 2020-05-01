import React from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, View } from 'react-native';
import { withTheme, Text, Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from "firebase";

import * as selectors from '../src/reducers';


function SalesScreen({ theme, navigation, mySales }) {
  const { colors, roundness } = theme;
  console.log(mySales);
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

export default connect(
  state => ({
    mySales: selectors.getMySales(state),
  }),
  undefined,
)(withTheme(SalesScreen));
