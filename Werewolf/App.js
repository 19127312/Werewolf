import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/store';
import { setUser } from './store/authSlice';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LogBox } from 'react-native';
import StartingScreen from './screens/StartingScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Colors } from './constants/styles';

LogBox.ignoreLogs(['Setting a timer for a long period of time'])
const Stack = createNativeStackNavigator();


function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    async function fecthToken() {
      const uid = await AsyncStorage.getItem("uid")
      const username = await AsyncStorage.getItem("username")
      if (username && uid) {
        dispatch(setUser({
          uid,
          username
        }))
      }
      setIsLoading(false)
    }
    fecthToken()

  }, [])
  if (isLoading) {
    return <AppLoading />
  }
  return <NavigationContainer>
    <Stack.Navigator initialRouteName='Starting'>
      <Stack.Screen name="Starting" component={StartingScreen} options={
        {

          headerShown: false,
        }
      } />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Đăng nhập" }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ title: "Đăng ký" }} />
    </Stack.Navigator>
  </NavigationContainer>
}

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
        <Navigation />
      </Provider>

    </>
  );
}
