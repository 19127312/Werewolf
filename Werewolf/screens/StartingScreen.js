import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Button from '../components/ui/Button'
import { useSelector } from 'react-redux';
import { selectIsAuthenticate } from '../store/selectors';
const StartingScreen = ({ navigation }) => {
    //Chỉ đc gọi trong function component, k nên gọi trong function
    const isAuthenticated = useSelector(state => state.auth.uid)

    function handleOffline() {

    }

    function handleOnline() {
        if (isAuthenticated) {
            navigation.replace('Home')
        } else {
            navigation.navigate('Login')
        }
    }
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Werewolf</Text>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/images/logoWerewolf.jpg')} />
            </View>
            <View style={styles.buttonContainer}>
                <Button buttonStyle={{ backgroundColor: "black" }} title="Chơi Online" onPress={handleOnline} />
            </View>
            <View style={styles.buttonContainer}>
                <Button buttonStyle={{ backgroundColor: "#fff", borderColor: "black", borderWidth: 2 }} textStyle={{ color: "black" }} title="Chơi Offline" onPress={handleOffline} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop: 10,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: '100%',
        height: '50%',
    },
    buttonContainer: {
        width: '80%',
        margin: 10
    },
    title: {
        fontFamily: 'poppins_regular',
        fontWeight: "bold",
        fontSize: 32
    }
})
export default StartingScreen