import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import { Colors } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';

function AuthContent({ isLogin, onAuthenticate }) {

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const navigation = useNavigation()
  function switchAuthModeHandler() {
    // Todo
    if (isLogin) {
      navigation.navigate('Signup')
    } else {
      navigation.navigate('Login')
    }
  }

  function submitHandler(credentials) {
    let { email, password, confirmPassword, username } = credentials;

    email = email.trim();
    password = password.trim();
    username = username.trim();
    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;
    const usernameIsValid = username.length > 0;
    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!passwordsAreEqual || !usernameIsValid))
    ) {
      Alert.alert('Thông tin sai', 'Kiểm tra lại thông tin đăng nhập.');
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
        username: !usernameIsValid,
      });
      return;
    }

    onAuthenticate({ email, password, username });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}  >
          {isLogin ? 'Tạo tài khoản mới' : 'Đã có tài khoản'}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginHorizontal: 32,
    padding: 16,
  },

  buttons: {
    marginTop: 8,
  },
});
