import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';
import { Ionicons } from '@expo/vector-icons';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  iconName,
}) {
  let text = ""
  switch (iconName) {
    case "mail":
      text = "Email không đúng định dạng"
      break;
    case "person":
      text = "Vui lòng nhập tên đúng định dạng"
      break
    case "key":
      text = "Mật khẩu phải 6 ký tự trở lên"
      break
    case "key-outline":
      text = "Mật khẩu không khớp"
      break
  }
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label}
      </Text>
      <View style={styles.inputIcon}>
        <View style={{ margin: 4 }}>
          <Ionicons name={iconName} color={Colors.primary100} size={24} />
        </View>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onUpdateValue}
          value={value}
        />
      </View>
      {isInvalid && <Text style={styles.labelInvalid}>
        {text}
      </Text>}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 15,
  },
  label: {
    color: Colors.primary100,
    marginBottom: 2,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    fontSize: 16,
    flex: 1
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
  inputIcon: {
    flexDirection: "row", borderBottomColor: Colors.primary100,
    borderBottomWidth: 1
  }
});
