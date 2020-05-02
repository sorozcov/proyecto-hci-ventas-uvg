import React ,{useState}from 'react';
import { Image, StyleSheet, View,Linking,SafeAreaView ,FlatList} from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Text, Button,Card,Avatar,Title, Paragraph,FAB,IconButton  } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import SegmentedControlTab from "react-native-segmented-control-tab";
import * as firebase from "firebase";
import * as actionsCategories from '../src/actions/categories';
import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';
import CardComponent from '../components/CardComponent';
import { Random } from 'expo';
import { useScrollToTop } from '@react-navigation/native';

const renderValueWithImage = function(text, imageUri) {
  return (
    <Text> 
      <MaterialCommunityIcons name="cart" color={'black'} size={25}
                    style={{ marginTop: 0,paddingBottom:8 }} />
      {text}
    </Text>
    )
}

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
const RightContent = props => <FAB {...props} small style={{marginRight:10,backgroundColor:"white",color:'black'}} icon="whatsapp"onPress={() => console.log('Pressed')}/>;
function ExploreScreen({ theme, navigation, onClick }) {
  const { colors, roundness } = theme;
  const [indexShowTab, changeIndexShowTab] = useState(1);
  const [data, changeData] = useState([{id:1},{id:2},{id:3},{id:4}]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
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
          marginTop:5,
          marginBottom:0      
          
        }}
        onPress={() => navigation.navigate('EditSaleScreen')}>
        NUEVA VENTA
      </Button>
      <SegmentedControlTab
          values={[ "1 por Columna" , "2 por Columna"]}
          activeTabStyle={{backgroundColor:colors.primary}}
          tabsContainerStyle={{paddingTop:8,marginRight:"10%",marginLeft:"10%"}}
          tabTextStyle={{fontFamily:'dosis-semi-bold',color:'black'}}
          tabStyle={{borderColor:'black'}}
          selectedIndex={indexShowTab}
          badges={["1","2"]}
          onTabPress={changeIndexShowTab}
          tabBadgeContainerStyle={{backgroundColor:'black'}}
        />
      
     
      <View 

       style={styles.containerScrollView} >
      <View style={{...styles.contentContainer, flexDirection: 'column',justifyContent:"space-evenly",flex:1}} >
      <FlatList style={{margin:0}}
          data={data}
          ref={refFlatList}
          key={indexShowTab+1} 
          numColumns={indexShowTab+1}
          keyExtractor={(item, index) => item.id }
          onEndReachedThreshold={0.1}
          refreshing={refreshing}
          onRefresh={()=>{setRefreshing(true);setTimeout(function(){setRefreshing(false);},1000)}}
          onEndReached={()=>
            {
              if(loading){
                return;
              }
                setLoading(true);
                setTimeout(function(){
                let myData = [...data]; 
                myData.push({id:Math.random()},{id:Math.random()},{id:Math.random()}
                ,{id:Math.random()});
                changeData(myData);console.log(data.length);
                setLoading(false)}
                ,1000);
          }
          }
          renderItem={(item) => (
            <CardComponent indexShowTab={indexShowTab} sale={{}} onCardClick={null}/>
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
    paddingTop: 0
  },
});

export default withTheme(ExploreScreen);
