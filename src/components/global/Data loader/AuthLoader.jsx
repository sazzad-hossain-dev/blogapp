"use client";

import { setUser } from "@/lib/data/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect, useState } from "react";
import LoadingSpinner from "../loading/LoadingSpin";

const AuthLoader = ({ children }) => {
    const dispatch = useAppDispatch();
    const [isInitialized, setIsInitialized] = useState(false);

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
                setIsInitialized(true);
            }
        };

        initializeAuth();
    }, [dispatch]);

    if (!isInitialized) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }
    if (!isInitialized) {
        console.log("not initialized");
    }
    return <> {children}</>;
};

export default AuthLoader;
