import AuthContent from '../components/Auth/AuthContent';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, onValue, child, set, get, off } from 'firebase/database';

import { login } from '../util/auth';
import { useState, useEffect } from 'react'
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { authenticate } from '../store/authSlice'
import { signInFirebase } from '../util/firebase';
function LoginScreen() {
  const dispatch = useDispatch()
  useEffect(() => {
    const db = getDatabase();
    const reference = ref(db, 'user/');
    onValue(reference, (snapshot) => {
      console.log(snapshot.val())
    });
    return () => {
      off(reference, 'value')
    }
  }, [])
  // const dbRef = ref(getDatabase());
  // get(child(dbRef, `user/`)).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });



  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signInHandler({ email, password }) {

    const db = getDatabase();
    set(ref(db, 'user/' + 2), {
      username: "name",
      email: email,
      password: password
    });

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
