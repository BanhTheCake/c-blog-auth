import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogin: false,
    accessToken: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLogin(state, action) {
            const newState = { ...state }
            newState.isLogin = action.payload
            return newState
        },
        setAccessToken(state, action) {
            const newState = {...state}
            newState.accessToken = action.payload
            return newState
        }
    },
});

export const { setIsLogin, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
