import { createSlice } from "@reduxjs/toolkit";

// Load user data from localStorage (if available)
const userFromStorage = JSON.parse(localStorage.getItem("user")) || null;

// Initial state
const initialState = {
    user: userFromStorage, // Initialize from localStorage
    isAuthenticated: !!userFromStorage, // True if user exists in localStorage
};

// Create the auth slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; // Update user data
            state.isAuthenticated = true; // Set authenticated to true

            // Save to localStorage
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null; // Clear user data
            state.isAuthenticated = false; // Reset authentication status

            // Remove from localStorage
            localStorage.removeItem("user");
        },
    },
});

// Export actions
export const { setUser, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
