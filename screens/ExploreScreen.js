import React ,{useState}from 'react';
import { Image, StyleSheet, View,Linking,SafeAreaView ,FlatList} from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Text, Button,Card,Avatar,Title, Paragraph,FAB,IconButton  } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import SegmentedControlTab from "react-native-segmented-control-tab";
import * as firebase from "firebase";
import * as actionsCategories from '../src/actions/categories';
import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';

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
      
     
      <ScrollView style={styles.containerScrollView} contentContainerStyle={styles.contentContainer}>
      <View style={{ flexDirection: 'column',justifyContent:"space-evenly",flex:1}}>
      <FlatList style={{margin:5}}
          data={[{id:1},{id:2},{id:3},{id:4}]}
          key={indexShowTab+1} 
          numColumns={indexShowTab+1}
          keyExtractor={(item, index) => item.id }
          renderItem={(item) => ( <Card style={{ margin: '1.5%',flex:0.5,backgroundColor:'white',elevation:10  }}>
          <Card.Title
            //style={{backgroundColor:'black'}}
            title="Nombre Producto"
            titleStyle={{fontFamily:"dosis-bold",color:'black'}}
            subtitle="Descripción"
            subtitleStyle={{fontFamily:'dosis-semi-bold',color:'black'}}
            //right={RightContent}
          >
            
          </Card.Title>
         
          <Card.Cover style={{resizeMode: 'contain'}}source={{ uri: 'https://i.ytimg.com/vi/8Qqo6EWH5cI/hqdefault.jpg' }} />
          <Card.Content >
            <View style={{flex:1,flexDirection:'row'}}>
            <Paragraph style={{fontFamily:"dosis-bold",flex:0.7,color:'black',fontSize:18,marginTop:10,marginBottom:20,paddingRight:10}}>GTQ PRECIO</Paragraph>
           
            <IconButton
              icon="whatsapp"
              color={"white"}
              style={{backgroundColor:"green",flex:0.35}}
              size={(indexShowTab==0 ? 25 : 21)}
              onPress={() => {
                let url = 'whatsapp://send?text=' + "Hola, vi tu producto en UVGet y estoy interesado." + '&phone=502' + "58508720";
                Linking.openURL(url).then((data) => {
                  console.log('WhatsApp Opened');
                }).catch(() => {
                  alert('Whatsapp no está instalado en su teléfono.');
                });
              }}
            />
            <IconButton
              icon="bookmark"
              color={"white"}
              style={{backgroundColor:"#03A9F4",flex:0.35}}
              size={(indexShowTab==0 ? 25 : 21)}
              onPress={() => console.log('Pressed')}
            />
            </View>
             
              
          </Card.Content>
          
          
        </Card>)
  
          }
          />
           
            
           
          </View>
      </ScrollView>
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
  fab: {
    position: 'absolute',
    backgroundColor:'green',
    margin: 16,
    right: 50,
    bottom: 0,
  },
  littleFab: {
    position: 'absolute',
    backgroundColor:'green',
    margin: 8,
    right: 42,
    bottom: 0,
  },
  littleFab2: {
    position: 'absolute',
    backgroundColor:'#03A9F4',
    margin: 8,
    right: 0,
    bottom: 0,
    
  },
  fab2: {
    position: 'absolute',
    backgroundColor:'#03A9F4',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default withTheme(ExploreScreen);
