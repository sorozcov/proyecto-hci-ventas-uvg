import React ,{useState}from 'react';
import { Image, StyleSheet, View,Linking,SafeAreaView ,FlatList} from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Text, Button,Card,Avatar,Title, Paragraph,FAB,IconButton  } from 'react-native-paper';
import * as firebase from "firebase";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardComponent from '../components/CardComponent';
import * as actionsSavedSales from '../src/actions/savedSales';
import * as selectors from '../src/reducers';

function SavedSalesScreen({ savedSales, refresh }) {
  const refFlatList = React.useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async ()=>{
    
    if(!refreshing){
      setRefreshing(true);
      //Se cargan las ventas que el usuario en sesión guardo
      const savedSales = await firebase.firestore().collection('sales').where('usersSaveForLater','array-contains',user.uid).get();
      refresh(savedSales);
      setRefreshing(false);
    }
  };
    
    
  return (
    <View style={styles.container}>
     <View 

       style={styles.containerScrollView} >
      <View style={{...styles.contentContainer, flexDirection: 'column',justifyContent:"space-evenly",flex:1}} >
      { savedSales.length==0 &&
        <View >
        <MaterialCommunityIcons name="bookmark-off" color={'black'} size={80}
                   style={{textAlign:'center'}} />
        <Text style={styles.textStyle} >
          Usted no tiene ninguna venta guardada. </Text>
        </View>
        }
      <FlatList style={{margin:0}}
          data={savedSales}
          ref={refFlatList}
          key={"FlatListAppSales"} 
          numColumns={2}
          keyExtractor={(saleItem, index) => saleItem.saleid }
          onEndReachedThreshold={0.1}
          refreshing={refreshing}
          onRefresh={()=>{onRefresh()}}
          renderItem={(saleItem) => (
            
            <CardComponent indexShowTab={1} sale={saleItem} onCardClick={null} isMySale={false} saved={savedSales.filter(sale => sale.saleid === saleItem.item.saleid).length === 1}/>
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
    paddingTop: 0,
    marginBottom: 55,
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
    savedSales: selectors.getSavedSales(state),
  }),
  dispatch => ({
    refresh(savedSales) {
      dispatch(actionsSavedSales.clearSavedSales());
      savedSales.docs.map(sale => dispatch(actionsSavedSales.saveSale(sale.data())));
    },
  }),
) (withTheme(SavedSalesScreen));
