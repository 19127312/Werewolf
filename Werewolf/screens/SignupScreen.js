import AuthContent from '../components/Auth/AuthContent';
import { ScrollView, StyleSheet, View, Text, Image, KeyboardAvoidingView } from 'react-native';
import { getDatabase, ref, onValue, child, set, get, off } from 'firebase/database';

import { createUser } from '../util/auth';
import { useState } from 'react'
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/authSlice'
import { signUpFirebase } from '../util/firebase';
function SignupScreen({ navigation }) {
  const dispatch = useDispatch()
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({ email, password, username }) {
    setIsAuthenticating(true)
    console.log(email, password, username)


    try {
      // Kiểm tra tài khoản đã tồn tại chưa
      const dbRef = ref(getDatabase());
      const data = await get(child(dbRef, `user/${username}`))
      if (data.exists()) {
        Alert.alert('Đăng ký thất bại', 'Tên đã được sử dụng')
        setIsAuthenticating(false)
        return
      } else {
        //Nếu tài khoản chưa tồn tại username
        //Tạo tài khoản mới qua firebase authentication
        const newUser = await signUpFirebase(email, password)
        //Update profile cho user đã tạo
        const update = await newUser.user.updateProfile({ displayName: username })

        //Lưu tài khoản mới vào database
        const db = getDatabase();
        set(ref(db, 'user/' + username), {
          username,
          email: email,
          password: password,
          uid: newUser.user.uid
        });

        //Lưu tài khoản vào store
        dispatch(authenticate({
          uid: newUser.user.uid,
          username: username,
        }))
        navigation.replace("Home")
      }
    } catch (error) {
      Alert.alert('Đăng ký thất bại', 'Vui lòng đăng ký lại')
    }
    setIsAuthenticating(false)


  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Đang tạo tài khoản, vui lòng chờ..." />
  }
  return <ScrollView style={{ flex: 1 }}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
      <View style={{ flex: 1 }}>
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
    </KeyboardAvoidingView>
  </ScrollView>


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