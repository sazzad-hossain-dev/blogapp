import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
    user: userFromStorage,
    isAuthenticated: !!userFromStorage,
};

// Create the auth slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;

            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;

            localStorage.removeItem("user");
        },
    },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
