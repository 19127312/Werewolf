import AuthContent from '../components/Auth/AuthContent';
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
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
