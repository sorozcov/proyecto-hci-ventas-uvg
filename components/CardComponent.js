import * as React from 'react';
import { Card,Paragraph,IconButton } from 'react-native-paper';
import { StyleSheet,View } from 'react-native';

export default function CardSale(props) {
  const {indexShowTab,sale} = props;
  const {productName,description,price,phoneNumber,name} = sale;
  return (
     
        <Card style={{ margin: '1.1%',flex:0.5,backgroundColor:'white',elevation:10  }}>
        <Card.Title
            
            title={"Nombre Producto"}
            titleStyle={{fontFamily:"dosis-bold",color:'black',fontSize:indexShowTab==0 ? 21 : 16.5}}
            subtitle="Descripción"
            subtitleStyle={{fontFamily:'dosis-semi-bold',color:'black',fontSize:indexShowTab==0 ? 14 : 12}}
            
        >
            
        </Card.Title>
        
        <Card.Cover style={{resizeMode: 'contain'}}source={{ uri: 'https://i.ytimg.com/vi/8Qqo6EWH5cI/hqdefault.jpg' }} />
        <Card.Content >
            <View style={{flex:1,flexDirection:'row'}}>
            <Paragraph style={{fontFamily:"dosis-bold",flex:0.7,color:'black',fontSize:indexShowTab==0 ? 18 : 15,marginTop:10,marginBottom:20,paddingRight:10}}>GTQ PRECIO</Paragraph>
        
            <IconButton
            icon="whatsapp"
            color={"white"}
            style={{backgroundColor:"green",flex:0.35}}
            size={(indexShowTab==0 ? 25 : 17)}
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
            size={(indexShowTab==0 ? 25 : 17)}
            onPress={() => console.log('Pressed')}
            />
            </View>
            
            
        </Card.Content>
        
        
        </Card>
    )
}

const styles = StyleSheet.create({
  
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
