import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/styles';

function Button({ onPress, textStyle, buttonStyle, title }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed, buttonStyle]}
      onPress={onPress}
    >
      <View >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    display: 'flex'
    , alignItems: 'center'
    , paddingVertical: 14
    , width: "100%"
    , backgroundColor: Colors.primary100
    , borderRadius: 1000,
    elevation: 2,
    shadowColor: Colors.primary100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5

  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
});
