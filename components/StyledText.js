import * as React from 'react';
import { Text } from 'react-native';

export function DosisText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'dosis' }]} />;
}
