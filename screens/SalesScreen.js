import React from 'react';
import { Image, StyleSheet, View ,FlatList} from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Text, Button,Card,FAB,Paragraph } from 'react-native-paper';
import CardComponent from '../components/CardComponent';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from "firebase";

import * as selectors from '../src/reducers';
import { useScrollToTop } from '@react-navigation/native';

function SalesScreen({ theme, navigation, mySales }) {
  const { colors, roundness } = theme;
  console.log(mySales);
  const refFlatList = React.useRef(null);
 
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
        onPress={() => navigation.navigate('EditSaleScreen')}>
        NUEVA VENTA
      </Button>
      <View 

        style={styles.containerScrollView} >
        <View style={{...styles.contentContainer, flexDirection: 'column',justifyContent:"space-evenly",flex:1}} >
        <FlatList style={{margin:0}}
          data={mySales}
          ref={refFlatList}
         
          numColumns={2}
          keyExtractor={(saleItem, index) => saleItem.saleid}
          onEndReachedThreshold={0.1}
          renderItem={(saleItem) => (
            <CardComponent indexShowTab={1} sale={saleItem} onCardClick={null} isMySale={true}/>
            )
            
          }
          
            
          />
            
            
            
          </View>
        </View>
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
});

export default connect(
  state => ({
    mySales: selectors.getMySales(state),
  }),
  undefined,
)(withTheme(SalesScreen));
