import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false, // Initially false login status
    user: null,
    token: localStorage.getItem('token') || null, // Check for token in local storage
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true; // Set logged in after successful login
        },
        registers: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = false; 
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false; // Update login status on logout
        },
    },
});

export const { login, registers, logout } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
