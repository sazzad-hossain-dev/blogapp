"use client";

import { setUser } from "@/lib/data/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import LoadingSpinner from "../loading/LoadingSpin";

const AuthLoader = ({ children }) => {
    const dispatch = useAppDispatch();
    const [isInitialized, setIsInitialized] = useState(false);
    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (user) {
                    dispatch(setUser(user));
                }
            } catch (error) {
                console.error("Failed to load user from localStorage:", error);
            } finally {
                setIsInitialized(true); // Ensure initialization completes
            }
        };

        initializeAuth();
    }, [dispatch]);

    if (!isInitialized) {
        // Optional: Add a loading spinner or skeleton UI during initialization
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    return isAuthenticated ? <>{children}</> : null; // Render only if authenticated
};

export default AuthLoader;
