import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import { Colors } from './constants/styles';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/store';
import { logout, setUser } from './store/authSlice';
import IconButton from './components/ui/IconButton'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat/app';
import { logoutFirebase, readeData } from './util/firebase';
import { getDatabase, ref, onValue, set, get, off } from 'firebase/database';
import { LogBox } from 'react-native';
import StartingScreen from './screens/StartingScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

LogBox.ignoreLogs(['Setting a timer for a long period of time'])
const Stack = createNativeStackNavigator();

// function AuthStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: Colors.primary500 },
//         headerTintColor: 'white',
//         contentStyle: { backgroundColor: Colors.primary100 },
//       }}
//     >
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Signup" component={SignupScreen} />
//     </Stack.Navigator>
//   );
// }

// function AuthenticatedStack() {
//   const dispatch = useDispatch()
//   function logOutHandler() {
//     logoutFirebase()
//     dispatch(logout())
//   }
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: Colors.primary500 },
//         headerTintColor: 'white',
//         contentStyle: { backgroundColor: Colors.primary100 },
//       }}
//     >
//       <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
//         headerRight: ({ tintColor }) => <IconButton icon="exit" size={24} color={tintColor} onPress={logOutHandler} />
//       }} />
//     </Stack.Navigator>
//   );
// }

// function Navigation() {
//   const isAuthenticated = useSelector(state => state.auth.uid)
//   return <NavigationContainer>
//     {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
//   </NavigationContainer>
// }
// function Root() {
//   const [isLoading, setIsLoading] = useState(true);
//   const dispatch = useDispatch()



//   useEffect(() => {
//     async function fecthToken() {
//       const user = await AsyncStorage.getItem("uid")
//       if (user) {
//         dispatch(setUser(user))
//       }
//       setIsLoading(false)
//     }
//     fecthToken()

//   }, [])
//   if (isLoading) {
//     return <AppLoading />
//   }

//   return (
//     <Navigation />
//   );

// }

export default function App() {

  const [fontsLoaded] = useFonts({
    'baron_neue_black': require('./assets/fonts/baron_neue_black.otf'),
    'baron_neue_black': require('./assets/fonts/baron_neue_black.otf'),
    'baron_neue_italic': require('./assets/fonts/baron_neue_italic.otf'),
    'poppins_regular': require('./assets/fonts/poppins_regular.ttf'),
    'sf_ui_display_bold': require('./assets/fonts/sf_ui_display_bold.otf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar style="dark" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Starting" component={StartingScreen} options={
              {
                headerShown: false,
              }
            } />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Đăng nhập" }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ title: "Đăng ký" }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Đăng nhập" }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>

    </>
  );
}
