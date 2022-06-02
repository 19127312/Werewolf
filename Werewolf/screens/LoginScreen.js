import AuthContent from '../components/Auth/AuthContent';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, onValue, child, set, get, off } from 'firebase/database';
import { StyleSheet, View, Text, Image } from 'react-native';

import { login } from '../util/auth';
import { useState, useEffect } from 'react'
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { authenticate } from '../store/authSlice'
import { signInFirebase } from '../util/firebase';
function LoginScreen() {
  const dispatch = useDispatch()
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signInHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      const loginUser = await signInFirebase(email, password)
      console.log(loginUser.user)
      //dispatch(authenticate(loginUser.user))
    } catch (error) {
      Alert.alert('Authenticate failed', 'Please check your input and try again.')
      setIsAuthenticating(false)
    }
    setIsAuthenticating(false)
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging..." />
  }
  return <View style={{ flex: 1 }}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>
        ĐĂNG NHẬP VÀO TÀI KHOẢN
      </Text>
      <Image style={styles.image} source={require('../assets/images/LoginIcon.png')} />
    </View>

    <View style={styles.authContainer}>
      <AuthContent isLogin onAuthenticate={signInHandler} />
    </View>
  </View>
}
const styles = StyleSheet.create({
  title: {
    fontFamily: 'poppins_regular',
    fontWeight: "bold",
    fontSize: 32,
    flex: 2,
    padding: 40,
    marginTop: 10
  },
  titleContainer: {
    flexDirection: "row",
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 3
  },
  authContainer: {
    flex: 2
  }
})
export default LoginScreen;
