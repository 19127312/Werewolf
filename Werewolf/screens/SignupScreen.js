import AuthContent from '../components/Auth/AuthContent';
import { StyleSheet, View, Text, Image } from 'react-native';

import { createUser } from '../util/auth';
import { useState } from 'react'
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/authSlice'
import { signUpFirebase } from '../util/firebase';
function SignupScreen() {
  const dispatch = useDispatch()
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      //const token = await createUser(email, password)
      const newUser = await signUpFirebase(email, password)
      dispatch(authenticate(newUser.user))
    } catch (error) {
      Alert.alert('Authenticate failed', 'Please check your input and try again.')
      setIsAuthenticating(false)
    }

  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user" />
  }
  return <View style={{ flex: 1 }}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>
        CHÀO MỪNG THÀNH VIÊN MỚI
      </Text>
      <Image style={styles.image} source={require('../assets/images/RegisterIcon.png')} />
    </View>

    <View style={styles.authContainer}>
      <AuthContent onAuthenticate={signupHandler} />
    </View>
  </View>
}
const styles = StyleSheet.create({
  title: {
    fontFamily: 'poppins_regular',
    fontWeight: "bold",
    fontSize: 25,
    flex: 3,
    padding: 30,
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
    flex: 3
  }
})
export default SignupScreen;