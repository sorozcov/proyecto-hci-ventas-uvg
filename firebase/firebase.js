// Configuracion de Firebase
import * as firebase from "firebase";

//Firebase Config del Proyecto
var firebaseConfig = {
  apiKey: "AIzaSyDx00LholF4DDcvNLfoPDvky1xB03DX6w4",
  authDomain: "hci-ventas-uvg.firebaseapp.com",
  databaseURL: "https://hci-ventas-uvg.firebaseio.com",
  projectId: "hci-ventas-uvg",
  storageBucket: "hci-ventas-uvg.appspot.com",
  messagingSenderId: "744300525247",
  appId: "1:744300525247:web:a8730f68318ad2d3bd380a",
  measurementId: "G-RLWRV7Y8SK"
};

//Inicializar configuración de Firebase
export default  () => firebase.initializeApp(firebaseConfig);