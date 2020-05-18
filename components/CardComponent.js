import  React,{useState,useEffect} from 'react';
import  { connect } from 'react-redux';
import { Card,Paragraph,IconButton,Button,Avatar,Chip} from 'react-native-paper';
import { StyleSheet, View,Text,Linking,Alert,ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { change } from 'redux-form';
import Image from 'react-native-image-progress';
import { Dimensions } from "react-native";
import * as actionsSavedSales from '../src/actions/savedSales';
import * as firebase from "firebase";

import * as selectors from '../src/reducers';
import SwitchInput from '../components/SwitchInput';

function CardSale(props) {
  const {indexShowTab,isMySale, loggedUser, saveSavedSale, removeSavedSale, saved } = props;
  let {onCardClick} = props;
  const sale = props.sale.item;
  const [showModalInformation, changeShowModalInformation] = useState(false);
  if(onCardClick==null || onCardClick==undefined){
      onCardClick = function(){
            changeShowModalInformation(!showModalInformation);
      }
  }
  const [imageUrl, setImage] = useState(null);
  const [errorLoadingImage, setErrorLoadingImage] = useState(false);
  useEffect(()=>{async function getImage(){
    
    if(!errorLoadingImage){
      try{
        
        if(sale.image!=null){
            let img = await firebase.storage().ref().child(`ProductImages/${sale.image}_600x600.jpg`).getDownloadURL();
            setImage(img);
            
        } 
      }catch(error){
          setErrorLoadingImage(true);
          setTimeout(getImage,1000);
      }
    }
  }
  getImage();

  },[sale.image])
  const saleUserImage = `https://firebasestorage.googleapis.com/v0/b/uvget-hci.appspot.com/o/UserImages%2F${sale.user.image}_600x600.jpg?alt=media`;
  //const imageUrl = `https://firebasestorage.googleapis.com/v0/b/uvget-hci.appspot.com/o/ProductImages%2F${sale.image}_600x600.jpg?alt=media`;
  function openWhatsapp(){
    let url = 'whatsapp://send?text=' + `Hola ${sale.user.name}, vi tu producto ${sale.name} en UVGet y estoy interesado.` + '&phone=502' + `${sale.user.phoneNumber}`;
    Linking.openURL(url).then((data) => {
    console.log('WhatsApp Opened');
    }).catch(() => {
      Alert.alert(
        "Whatsapp Error",
        "Whatsapp no está instalado en su dispositivo.",
        [
          {text: 'Ok', onPress: () => {}},
        ],
       )
    });
  }
  async function saveSale(){
    var saleDoc = firebase.firestore().collection('sales').doc(sale.saleid);
    var saleEdited = await (await saleDoc.get()).data();
    var usersSaveForLater = saleEdited.usersSaveForLater;
    if(usersSaveForLater.includes(loggedUser.uid)){
      usersSaveForLater = usersSaveForLater.filter(userid => userid!==loggedUser.uid);
      await saleDoc.update({usersSaveForLater: usersSaveForLater});
      saleEdited = { ...saleEdited , usersSaveForLater: usersSaveForLater };
      removeSavedSale(saleEdited);
    } else {
      usersSaveForLater.push(loggedUser.uid);
      await saleDoc.update({usersSaveForLater: usersSaveForLater});
      saleEdited = { ...saleEdited , usersSaveForLater: usersSaveForLater };
      saveSavedSale(saleEdited);
    }
  }
  //const imageUrl = "https://firebasestorage.googleapis.com/v0/b/proyectoapp-add00.appspot.com/o/5ugr1aI1GoZ0QudkbzbeyRAv1iJ3?alt=media"
  return (
        <View style={{flex:0.5}}> 
        <Card onPress={()=> onCardClick()} style={{ margin: '1.1%',flex:0.5,backgroundColor:'white',elevation:10  }}>
        <Card.Title
             //left={(props) => <Avatar.Icon {...props} icon="folder" size={30}/>}
            title={sale.name}
            titleStyle={{fontFamily:"dosis-bold",color:'black',fontSize:indexShowTab==0 ? 21 : 16.5}}
            // subtitle={sale.description}
            // subtitleStyle={{fontFamily:'dosis-semi-bold',color:'black',fontSize:indexShowTab==0 ? 14 : 12}}
           
        >
            
        </Card.Title>
        
        <Image  resizeMode="stretch" source={{ uri: (imageUrl==null ? undefined : imageUrl)}} style={{height: 200}} />

        <Card.Content >
            <View style={{flex:1,flexDirection:'row'}}>
            <Paragraph style={{fontFamily:"dosis-bold",flex:0.7,color:'black',fontSize:indexShowTab==0 ? 18 : 15,marginTop:10,marginBottom:20,paddingRight:10}}>Q {sale.price} </Paragraph>
        
          { !isMySale &&
             <IconButton
            icon="whatsapp"
            color={"white"}
            style={{backgroundColor:"green",flex:0.35}}
            size={(indexShowTab==0 ? 25 : 17)}
            onPress={() => openWhatsapp()}
            /> 
          }
          { !isMySale &&
            <IconButton
            icon={ saved ? "bookmark-check" : "bookmark"}
            color={"white"}
            style={{backgroundColor:"black",flex:0.35}}
            size={(indexShowTab==0 ? 25 : 17)}
            onPress={() => saveSale()}
            />
          }
          {isMySale && <SwitchInput saleid={sale.saleid} isSold={sale.isSold} title={'Vendido:'} />} 
            </View>
            
            
        </Card.Content>
        
        
        </Card>
        <Modal
        testID={'modal'}
        
        onBackdropPress={()=>onCardClick()} 
        isVisible={showModalInformation}
        backdropColor="#ACDCF1"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        deviceWidth={Dimensions.get('window').width}
        style={{marginHorizontal: 0,paddingTop:30,}}
        >
      
            <ScrollView style={styles.content}>
                <Image resizeMode="stretch" source={{ uri: imageUrl}} style={{height: 350,width:Dimensions.get('window').width}} />
                <Text style={styles.contentTitle}>{sale.name}</Text>
                {sale.isSold && <Text style={styles.contentTitleSold}>Este artículo ya ha sido marcado como vendido.</Text>}
                <Text style={styles.contentTitleAtributte}>Descripción</Text>
                <Text style={styles.contentDescription}>{sale.description}</Text>
                <Text style={styles.contentTitleAtributte}>Detalles</Text>
                <Text style={styles.contentAttributes}>Estado: {sale.state==1 ? "Nuevo" : ''}{sale.state==2 ? "Usado como Nuevo" : ''}{sale.state==3 ? "Usado al 50%" : ''}{sale.state==4 ? "Usado con bastante desgaste" : ''}</Text>
                <Text style={styles.contentAttributes}>Precio: GTQ {sale.price}</Text>
                
                <View style={{flexDirection:'row',flexWrap:'wrap',width:Dimensions.get('window').width}}>
                <Text style={styles.contentAttributes}>Categorías: </Text>
                  {sale.category.map((cat,index)=>
                      (<Chip  key={index} style={{marginLeft:10,padding:2,alignItems:'center',backgroundColor:'black',color:'white',marginTop:10}} textStyle={{color:'white',fontFamily:'dosis-light',fontSize:16,}} disabled={true} onPress={() => console.log('Pressed')}>{cat.name}</Chip>)
                  
                  )}
                </View>
                <Text style={styles.contentTitleAtributte}>Vendedor</Text>
                
                <Card.Title
                    style={{marginBottom:20,marginTop:10}}
                    titleStyle={{fontFamily:'dosis-semi-bold'}}
                    subtitleStyle={{fontFamily:'dosis-light',fontSize:15}}
                    title={sale.user.name + " " + sale.user.lastName}
                    subtitle={sale.user.email + "\n"
                   + sale.user.phoneNumber}
                    subtitleNumberOfLines={2}
                    
                    left={(props) => sale.user.image!=null ? (<Avatar.Image key={sale.user.image} {...props} size={48} source={{uri:saleUserImage}} />):(<Avatar.Icon size={48} {...props} icon='account' />)}
                    right={(props) => <View>
                      <IconButton
                      icon="whatsapp"
                      color={"white"}
                      style={{backgroundColor:"green",marginRight:15}}
                      size={30}
                      onPress={() => openWhatsapp()}
                      /> 
                      <IconButton
                      icon="email"
                      color={"white"}
                      style={{backgroundColor:"red",marginRight:15}}
                      size={30}
                      
                      onPress={() => Linking.openURL(`mailTo:${sale.user.email}?subject=Producto UVGET ${sale.name}&body=Hola ${sale.user.name}, estoy interesado en tu producto ${sale.name}.`)}
                      /> 
                      </View>}
                  />
               
            </ScrollView>
            <IconButton testID={'close-button'}  icon="close"  size={30} style={{top:35,right:3,position:'absolute',backgroundColor:'white'}} mode="contained" onPress={()=>onCardClick()}  />
        </Modal>
    </View> 
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
    content: {
        backgroundColor: 'white',
        
        height:'100%',
        bottom:0,
        
        
       
       
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      contentTitle: {
        fontSize: 25,
        alignSelf:'center',
        fontFamily:'dosis-bold',
        paddingTop:12,
        paddingLeft:10,
        paddingRight:10,
        
      },
      contentTitleAtributte: {
        fontSize: 20,
        paddingLeft:12,
       
        fontFamily:'dosis-bold',
        paddingTop:10,
        
      },
      contentTitleSold: {
        fontSize: 20,
        color:'red',
        alignSelf:'center',
        paddingLeft:10,
        paddingRight:10,
        fontFamily:'dosis-semi-bold',
        paddingTop:12,
        
      },
      contentDescription: {
        fontSize: 20,
        paddingLeft:20,
        
        fontFamily:'dosis-light',
        paddingTop:10,
        paddingBottom: 10,
      },
      contentAttributes: {
        fontSize: 20,
        paddingLeft:20,
        
        fontFamily:'dosis-light',
        paddingTop:8,
        
      },
  });

export default connect(
  state => ({
    loggedUser: selectors.getLoggedUser(state),
  }),
  dispatch => ({
    saveSavedSale(sale) {
      dispatch(actionsSavedSales.saveSale(sale));
    },
    removeSavedSale(sale) {
      dispatch(actionsSavedSales.unsaveSale(sale.saleid));
    },
  }),
)(CardSale); 