import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    user: null, // This will hold the user object once logged in
    isAuthenticated: false, // To track whether the user is logged in or not
};

// Create the auth slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; // Set the user data (e.g., from Firebase)
            state.isAuthenticated = true; // Set isAuthenticated to true
        },
        logout: (state) => {
            state.user = null; // Reset user state
            state.isAuthenticated = false; // Set isAuthenticated to false
        },
    },
});

// Export actions
export const { setUser, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
