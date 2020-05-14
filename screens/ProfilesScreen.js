import React,{useState} from 'react';
import { Image, StyleSheet, View ,FlatList} from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Text, Button,Card,FAB,Paragraph } from 'react-native-paper';
import CardComponent from '../components/CardComponent';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from "firebase";
import { useScrollToTop } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as selectors from '../src/reducers';
import * as actionsMySales from '../src/actions/mySales';
import SegmentedControlTab from "react-native-segmented-control-tab";

function SalesScreen({ theme, navigation, mySalesNotSold,mySalesSold, selectSale, newSale }) {
  const { colors, roundness } = theme;
  const refFlatList = React.useRef(null);
  const [indexShowTab, changeIndexShowTab] = useState(0);
  useScrollToTop(refFlatList);
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
          marginTop:15             
          
        }}
        onPress={() => newSale(navigation)}>
        NUEVA VENTA
      </Button>
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
          marginTop:15             
          
        }}
        onPress={() => navigation.navigate('EditProfileScreen')}>
        NUEVA VENTA
      </Button>
      <Button
        theme={roundness}
        color={'#000000'}
        icon="logout"
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
          marginTop:15             
          
        }}
        onPress={() => navigation.replace('Login')}>
        CERRAR SESIÓN
      </Button>
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
  containerScrollView: {
    flex: 1,
    marginTop:"2%",
    marginBottom:"-10%",
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'dosis-regular',
  },
  contentContainer: {
    paddingTop: 0
  },
  textStyle:{
    textAlign: 'center', 
    fontFamily: 'dosis-light',
    padding: '2%',
    fontSize:20
  },
});

export default connect(
  state => ({

    mySalesNotSold: selectors.getMySales(state),
    mySalesSold: selectors.getMySoldSales(state),
  }),
  dispatch => ({
    selectSale(navigation, sale) {
      dispatch(actionsMySales.selectMySale(sale));
      navigation.navigate('EditSaleScreen');
    },
    newSale(navigation) {
      dispatch(actionsMySales.deselectMySale());
      navigation.navigate('EditSaleScreen');
    },
  }),
)(withTheme(SalesScreen));
