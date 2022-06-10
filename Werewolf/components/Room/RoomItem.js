import { Pressable, View, Text, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import { Colors } from '../../constants/styles'
import { Ionicons } from '@expo/vector-icons';


const RoomItem = ({ id, owner, sizePlayer, title, lock }) => {
    const navigation = useNavigation()
    function roomPressHandler() {
        console.log(id)
        // navigation.navigate('ManageExpense', {
        //     expenseId: id
        // })
    }

    return (
        <Pressable onPress={roomPressHandler}
            style={({ pressed }) => [styles.roomItem, pressed && styles.pressed]}>
            <View style={{ flexDirection: 'row', }}>

                <View>
                    <Text style={[styles.textBase, styles.description]}>{title}</Text>
                    <Text style={styles.textBase}>Chủ phòng: {owner}</Text>
                    <Text style={styles.textBase}>{sizePlayer}/16 người</Text>

                </View>
                <View style={{ flex: 1 }}>

                </View>
                <View style={styles.amount}>
                    {lock ? <Ionicons name="lock-closed" color="black" size={26} /> : <Ionicons name="lock-open" color="white" size={26} />}

                </View>
            </View>

        </Pressable>
    )
}
const styles = StyleSheet.create({
    roomItem: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: Colors.primary200,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        justifyContent: 'space-between',
    },
    textBase: {
        color: "white",
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: "bold",
    },
    amount: {

        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        minWidth: 50
    }
    , amountText: {
        color: "black",
        fontWeight: "bold"
    }, pressed: {
        opacity: 0.75
    }

})
export default RoomItem