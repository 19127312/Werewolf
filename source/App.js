import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/store';
import { logout, setUser } from './store/authSlice';
import IconButton from './components/ui/IconButton'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import firebase from 'firebase/compat/app';
import { logoutFirebase } from './util/firebase';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch()
  function logOutHandler() {
    logoutFirebase()
    dispatch(logout())
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({ tintColor }) => <IconButton icon="exit" size={24} color={tintColor} onPress={logOutHandler} />
      }} />
    </Stack.Navigator>
  );
}


function Root() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        setIsLoggedIn(true)
        setUser(user)
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false)
    });
    return subscriber
  }, [])

  useEffect(() => {
    async function fecthToken() {
      const user = await AsyncStorage.getItem("uid")
      if (user) {
        dispatch(setUser(user))
        setIsLoggedIn(true)
      }
      setIsLoading(false)
    }
    fecthToken()

  }, [])

  if (isLoading) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );

}

export default function App() {

  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Root />
      </Provider>

    </>
  );
}
