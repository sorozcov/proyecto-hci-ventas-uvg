// Configuracion de Firebase
import * as firebase from "firebase";

//Firebase Config del Proyecto
var firebaseConfig = {
  apiKey: "AIzaSyCwhuq5VMyE4DAM5jMUTCUP4pMC5AkKyG8",
  authDomain: "uvget-hci.firebaseapp.com",
  databaseURL: "https://uvget-hci.firebaseio.com",
  projectId: "uvget-hci",
  storageBucket: "uvget-hci.appspot.com",
  messagingSenderId: "900955853000",
  appId: "1:900955853000:web:5383727fa1729ba05b55fd"
};

//Inicializar configuración de Firebase
export default  () => firebase.initializeApp(firebaseConfig);
