import React ,{useState}from 'react';
import { Image, StyleSheet, View,Linking,SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Text, Button,Card,Avatar,Title, Paragraph,FAB,Portal  } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

import * as firebase from "firebase";
import * as actionsCategories from '../src/actions/categories';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
const RightContent = props => <FAB {...props} small style={{marginRight:10,backgroundColor:"white",color:'black'}} icon="whatsapp"onPress={() => console.log('Pressed')}/>;
function ExploreScreen({ theme, navigation, onClick }) {
  const { colors, roundness } = theme;
  const [fabOpen, changeFabOpen] = useState(false);
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
      <ScrollView style={styles.containerScrollView} contentContainerStyle={styles.contentContainer}>
      <View style={{ flexDirection: 'column',justifyContent:"space-evenly" }}>
            
            <View style={{ flexDirection: 'row',justifyContent:"space-evenly",flex:0.2 }}>
              <Card style={{ margin: '1%',flex:0.9,backgroundColor:'white',elevation:10  }}>
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
                
                  <Paragraph style={{fontFamily:"dosis-bold",color:'black',fontSize:18,marginTop:10,marginBottom:20}}>GTQ PRECIO</Paragraph>
                  <FAB
                      style={styles.littleFab}
                      small
                      icon="whatsapp"
                      onPress={() => {
                        let url = 'whatsapp://send?text=' + "Hola, vi tu producto en UVGet y estoy interesado." + '&phone=502' + "58508720";
                        Linking.openURL(url).then((data) => {
                          console.log('WhatsApp Opened');
                        }).catch(() => {
                          alert('Whatsapp no está instalado en su teléfono.');
                        });
                      }}
                    />
                    <FAB
                      style={styles.littleFab2}
                      small
                      icon="bookmark"
                      onPress={() => console.log('Pressed')}
                    />
                  
                   
                    
                </Card.Content>
                
                
              </Card>
              <Card style={{ margin: '1%',flex:0.9,backgroundColor:'white',elevation:10  }}>
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
                
                  <Paragraph style={{fontFamily:"dosis-bold",color:'black',fontSize:18,marginTop:10,marginBottom:20}}>GTQ PRECIO</Paragraph>
                  
                  <FAB
                      style={styles.fab}
                      small
                      icon="whatsapp"
                      onPress={() => {
                        let url = 'whatsapp://send?text=' + "Hola, vi tu producto en UVGet y estoy interesado." + '&phone=502' + "58508720";
                        Linking.openURL(url).then((data) => {
                          console.log('WhatsApp Opened');
                        }).catch(() => {
                          alert('Whatsapp no está instalado en su teléfono.');
                        });
                      }}
                    />
                    <FAB
                      style={styles.fab2}
                      small
                      icon="bookmark"
                      onPress={() => console.log('Pressed')}
                    />
                    
                </Card.Content>
                
                
              </Card>
              
            </View>
            <View style={{ flexDirection: 'column',justifyContent:"space-evenly",flex:0.2 }}>
              <Card style={{ margin: '1%',flex:0.9,backgroundColor:'white',elevation:10  }}>
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
                
                  <Paragraph style={{fontFamily:"dosis-bold",color:'black',fontSize:18,marginTop:10,marginBottom:20}}>GTQ PRECIO</Paragraph>
                  
                  <FAB
                      style={styles.fab}
                      small
                      icon="whatsapp"
                      onPress={() => {
                        let url = 'whatsapp://send?text=' + "Hola, vi tu producto en UVGet y estoy interesado." + '&phone=502' + "58508720";
                        Linking.openURL(url).then((data) => {
                          console.log('WhatsApp Opened');
                        }).catch(() => {
                          alert('Whatsapp no está instalado en su teléfono.');
                        });
                      }}
                    />
                    <FAB
                      style={styles.fab2}
                      small
                      icon="bookmark"
                      onPress={() => console.log('Pressed')}
                    />
                    
                </Card.Content>
                
                
              </Card>
              <Card style={{ margin: '1%',flex:0.9,backgroundColor:'white',elevation:10  }}>
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
                
                  <Paragraph style={{fontFamily:"dosis-bold",color:'black',fontSize:18,marginTop:10,marginBottom:20}}>GTQ PRECIO</Paragraph>
                  
                  <FAB
                      style={styles.fab}
                      small
                      icon="whatsapp"
                      onPress={() => {
                        let url = 'whatsapp://send?text=' + "Hola, vi tu producto en UVGet y estoy interesado." + '&phone=502' + "58508720";
                        Linking.openURL(url).then((data) => {
                          console.log('WhatsApp Opened');
                        }).catch(() => {
                          alert('Whatsapp no está instalado en su teléfono.');
                        });
                      }}
                    />
                    <FAB
                      style={styles.fab2}
                      small
                      icon="bookmark"
                      onPress={() => console.log('Pressed')}
                    />
                    
                </Card.Content>
                
                
              </Card>
              
            </View>
            
            
           
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
