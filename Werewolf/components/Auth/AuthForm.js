import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../ui/Button';
import Input from './Input';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
    username: usernameIsInvalid,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'username':
        setEnteredUsername(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      username: enteredUsername,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          iconName="mail"
        />
        {!isLogin && (
          <Input
            label="Username"
            onUpdateValue={updateInputValueHandler.bind(this, 'username')}
            value={enteredUsername}
            isInvalid={usernameIsInvalid}
            iconName="person"
          />
        )}
        <Input
          label="Mật khẩu"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
          iconName="key"
        />
        {!isLogin && (
          <Input
            label="Nhập lại mật khẩu"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              'confirmPassword'
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
            iconName="key-outline"
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler} title={isLogin ? 'Đăng nhập' : 'Đăng ký'} />
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 30,
  },
});
