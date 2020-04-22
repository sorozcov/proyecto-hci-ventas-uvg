import * as React from 'react';
import { Provider } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import useLinking from './navigation/useLinking';
import * as firebase from "firebase";
import configureStore from './store';

const Stack = createStackNavigator();
// Your web app's Firebase configuration
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Se crea el store
const store = configureStore();

//Se configura el tema 
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00C331',
    accent: '#03A9F4',
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: require('./assets/fonts/Dosis-Regular.ttf'),
    medium: require('./assets/fonts/Dosis-Medium.ttf'),
    light: require('./assets/fonts/Dosis-Light.ttf'),
    thin: require('./assets/fonts/Dosis-Bold.ttf')
  }
};

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'dosis': require('./assets/fonts/Dosis-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <LoginScreen />
          </View>
        </PaperProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
