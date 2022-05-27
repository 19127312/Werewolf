import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authSlice from './authSlice'
const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    middleware: customizedMiddleware
})