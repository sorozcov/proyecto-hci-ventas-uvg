import React, { useState} from 'react';
import { Switch, StyleSheet, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Text ,Snackbar} from 'react-native-paper';
import * as firebase from "firebase";

import * as actionsMySales from '../src/actions/mySales';


function SwitchInput(props) {
  const [value, changeValue] = useState(props.isSold);
  const [snackbarShow, changeSnackbarShow] = useState(false);
  
  async function saveSaleSold(){
    const sold = !value;
    changeValue();
    changeSnackbarShow(true)
    await firebase.firestore().collection('sales').doc(props.saleid).update({ isSold: sold});
    props.saveSale({ saleid: props.saleid, isSold: sold});
  }
  return (
    <View style={styles.containerSwitch}>
      <Text style={styles.textSwitchStyle} >{props.title}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#00C331" }}
        thumbColor={true ? "white" : "#03A9F4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={saveSaleSold}
        value={value}
      />
  
    </View>
  );
}


const styles = StyleSheet.create({
  containerSwitch: {
    flex: 1,
    flexDirection: 'row',
    marginLeft:'4%',
    marginTop:Platform.OS=="ios"?10:-10
  },
  textSwitchStyle:{ 
    fontFamily: 'dosis-regular',
    padding: '4%',
    fontSize:12,
    marginTop: Platform.OS=="ios"?10:19,
  },
});

export default connect(
  undefined,
  dispatch => ({
    saveSale(sale) {
      dispatch(actionsMySales.changeMySale(sale));
    },
  }),
)(SwitchInput);