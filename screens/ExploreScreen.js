import React ,{useState}from 'react';
import { Image, StyleSheet, View,Linking,SafeAreaView ,FlatList} from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Text, Button,Card,Avatar,Title, Paragraph,FAB,IconButton  } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import SegmentedControlTab from "react-native-segmented-control-tab";
import * as firebase from "firebase";
import * as actionsCategories from '../src/actions/categories';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardComponent from '../components/CardComponent';
import { Random } from 'expo';
import { useScrollToTop } from '@react-navigation/native';
import * as actionsApplicationSales from '../src/actions/applicationSales';
import * as selectors from '../src/reducers';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import FilterInput from '../components/FilterInput';
import categories from '../src/reducers/categories';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
const RightContent = props => <FAB {...props} small style={{marginRight:10,backgroundColor:"white",color:'black'}} icon="whatsapp"onPress={() => console.log('Pressed')}/>;
function ExploreScreen({ theme, navigation,applicationSales,refresh,loadMore,lastFetched,categories, savedSales }) {
  const { colors, roundness } = theme;
  const [indexShowTab, changeIndexShowTab] = useState(1);
  const [data, changeData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [categoriesSearch, setCategoriesSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const refFlatList = React.useRef(null);
  const onRefresh = async (categoriesSearch)=>{
    
    if(!refreshing){
      setRefreshing(true);
      console.log(categoriesSearch);
      console.log(categoriesSearch.length);
      if(categoriesSearch.length==0){

        const newApplicationSales = await firebase.firestore().collection('sales').where("isSold", "==", false).orderBy("dateCreated", "desc").limit(20).get();
        let appSales= [];
        newApplicationSales.docs.forEach(sale => {
          appSales.push(sale.data());
        })
        refresh(appSales);
        console.log("refresh without filters");
      }else{
        let newApplicationSales = await firebase.firestore().collection('sales').where("isSold", "==", false);
        for (let i = 0; i < categoriesSearch.length; i++) {
          newApplicationSales = await newApplicationSales.where(`categories.${categoriesSearch[i]}`, "==", true);
        }
        newApplicationSales = await newApplicationSales.get();
        let appSales= [];
        newApplicationSales.docs.forEach(sale => {
          appSales.push(sale.data());
        });
        
        refresh(appSales);
        console.log("refresh with filters");
      }
      setRefreshing(false);

      
    }
  };
  const onLoadMore = async ()=>{
    if(!loading && applicationSales.length>19){
      if(categoriesSearch.length==0){
        setLoading(true);
        console.log(lastFetched);
        const moreApplicationSales = await firebase.firestore().collection('sales').where("isSold", "==", false).orderBy("dateCreated", "desc").startAfter(lastFetched).limit(20).get();
        let appSales= [];
        moreApplicationSales.docs.forEach(sale => {
          appSales.push(sale.data());
        })
        loadMore(appSales);
        setLoading(false);
        console.log("new load");
      }
    }
  };
  const changeFilter = (newFilters) => {
    setCategoriesSearch(newFilters);
    onRefresh(newFilters);
   
  }

  useScrollToTop(refFlatList);
  
  return (
    <View style={styles.container}>
    <ScrollView style={{marginBottom:'-130%'}}>
     <FilterInput title='Categorías' single={false} selectedText="Buscar por categorías..." placeholderText="Buscar por categorías..." options={categories.map(category => ({ label:category.name, value:category.categoryid }))} 
            selectedItems={categoriesSearch} onSelectedItemsChange={changeFilter}/>
    </ScrollView>
      {/* <SegmentedControlTab
          values={[ "1 por Columna" , "2 por Columna"]}
          activeTabStyle={{backgroundColor:colors.primary}}
          tabsContainerStyle={{paddingTop:8,marginRight:"10%",marginLeft:"10%"}}
          tabTextStyle={{fontFamily:'dosis-semi-bold',color:'black'}}
          tabStyle={{borderColor:'black'}}
          selectedIndex={indexShowTab}
          badges={["1","2"]}
          onTabPress={changeIndexShowTab}
          tabBadgeContainerStyle={{backgroundColor:'black'}}
        /> */}
      
    
  
        

      
     
     <View 

       style={styles.containerScrollView} >
      <View style={{...styles.contentContainer, flexDirection: 'column',justifyContent:"space-evenly",flex:1}} >
      { applicationSales.length==0 &&
        <View style={{flex:0.1}}>
        <MaterialCommunityIcons name="cart-remove" color={'black'} size={80}
                   style={{textAlign:'center'}} />
        <Text style={styles.textStyle} >
          Lo sentimos. No hay ninguna venta para mostrar. </Text>
        
        </View>
        }
      <FlatList style={{margin:0}}
          data={applicationSales}
          ref={refFlatList}
          key={"FlatListAppSales"} 
          numColumns={2}
          keyExtractor={(saleItem, index) => saleItem.saleid }
          onEndReachedThreshold={0.1}
          refreshing={refreshing}
          onRefresh={()=>{onRefresh(categoriesSearch)}}
          onEndReached={()=> onLoadMore()}
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
    marginTop:"12%",
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
    marginBottom: 20,
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
    applicationSales: selectors.getAllSales(state),
    lastFetched: selectors.getLastFetched(state),
    categories: selectors.getCategories(state),
    savedSales: selectors.getSavedSales(state),
  }),
  dispatch => ({
    refresh(appSales) {
      dispatch(actionsApplicationSales.fetchNewSales(appSales));
    },
    loadMore(appSales) {
      dispatch(actionsApplicationSales.fetchMoreSales(appSales));
    },
  }),
) (withTheme(ExploreScreen));
