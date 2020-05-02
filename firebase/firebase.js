// Configuracion de Firebase
import * as firebase from "firebase";

//Firebase Config del Proyecto
var firebaseConfig = {
  apiKey: "AIzaSyDhdshsSdY-__OSwNe3qNd_MHTw0oBYags",
  authDomain: "uvget-638aa.firebaseapp.com",
  databaseURL: "https://uvget-638aa.firebaseio.com",
  projectId: "uvget-638aa",
  storageBucket: "uvget-638aa.appspot.com",
  messagingSenderId: "146887177592",
  appId: "1:146887177592:web:ae63fcf331258061a9048d"
};

//Inicializar configuración de Firebase
export default  () => firebase.initializeApp(firebaseConfig);
