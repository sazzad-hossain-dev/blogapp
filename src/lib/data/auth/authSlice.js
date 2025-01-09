import { createSlice } from "@reduxjs/toolkit";

// Utility functions for localStorage
const getFromLocalStorage = (key) => {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem(key));
    }
    return null;
};

const saveToLocalStorage = (key, value) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

const removeFromLocalStorage = (key) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(key);
    }
};

// Initial state
const initialState = {
    user: null,
    isAuthenticated: false,
};

// Auth slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        initializeUser: (state) => {
            const userFromStorage = getFromLocalStorage("user");
            if (userFromStorage) {
                state.user = userFromStorage;
                state.isAuthenticated = true;
            }
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            saveToLocalStorage("user", action.payload);
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            removeFromLocalStorage("user");
        },
    },
});

export const { initializeUser, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
