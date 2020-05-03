import React from 'react';
import { Switch, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';


export default function SwitchInput(props) {
  const { input, meta, ...inputProps } = props;
  return (
    <View style={styles.containerSwitch}>
      <Text style={styles.textSwitchStyle} >{inputProps.title}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={true ? "white" : "#03A9F4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={input.onChange}
        value={input.value}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  containerSwitch: {
    flex: 1,
    flexDirection: 'row',
    marginLeft:'4%',
  },
  textSwitchStyle:{ 
    fontFamily: 'dosis-regular',
    padding: '4%',
    fontSize:16
  },
});