import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        username: "",
        uid: ''
    },
    reducers: {
        authenticate: (state, action) => {
            state.uid = action.payload.uid;
            state.username = action.payload.username;
            AsyncStorage.setItem('uid', action.payload.uid);
            AsyncStorage.setItem('username', action.payload.username);
        },
        logout: (state, action) => {
            state.uid = '';
            AsyncStorage.removeItem('uid');
        }
        , setUser: (state, action) => {
            state.uid = action.payload;
        }
    }
})

export const { authenticate, logout, setUser } = authSlice.actions;
export default authSlice