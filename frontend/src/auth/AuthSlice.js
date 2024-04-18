import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        registers: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem('token'); // Clear token from local storage
        },
    }
})

export const { login, registers, logout } = authSlice.actions

export default authSlice.reducer