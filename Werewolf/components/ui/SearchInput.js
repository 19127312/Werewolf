import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const SearchInput = ({ value, onChange }) => {
    return (
        <View style={styles.textContainer}>
            <Ionicons name="search" color="black" size={20} />
            <TextInput style={styles.textInput} value={value} onChangeText={onChange} placeholder="Tìm tên phòng hoặc tên chủ phòng" />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        paddingLeft: 5,
        flex: 1
    }
    , textContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 1000,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    }
})
export default SearchInput