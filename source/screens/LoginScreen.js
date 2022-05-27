import AuthContent from '../components/Auth/AuthContent';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { login } from '../util/auth';
import { useState } from 'react'
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
      dispatch(authenticate(loginUser.user))
    } catch (error) {
      Alert.alert('Authenticate failed', 'Please check your input and try again.')
      setIsAuthenticating(false)
    }
    //const token = await login(email, password)
    //dispatch(authenticate(token))


  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging..." />
  }
  return <AuthContent isLogin onAuthenticate={signInHandler} />;
}

export default LoginScreen;
