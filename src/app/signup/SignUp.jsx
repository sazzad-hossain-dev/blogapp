"use client";
import { auth, db } from "@/configs/firebase";
import { setUser } from "@/lib/data/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useAppDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,
                profilePicture: "",
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
            dispatch(
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    accessToken: user.accessToken,
                })
            );
            console.log(user);
        } catch (error) {
            console.error(error);
        }
    };
    console.log(db);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-6 space-y-6 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 shadow-lg">
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="username"
                            className="block dark:text-gray-200"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            re
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="email"
                            className="block dark:text-gray-200"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="password"
                            className="block dark:text-gray-200"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="confirmPassword"
                            className="block dark:text-gray-200"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="block w-full py-3 text-center rounded-md bg-violet-600 text-white font-semibold hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="flex items-center pt-4 space-x-2">
                    <div className="flex-1 h-px sm:w-16 bg-gray-300 dark:bg-gray-700"></div>
                    <p className="text-sm dark:text-gray-400">
                        Sign up with social accounts
                    </p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    {/* Google Button */}
                    <button
                        aria-label="Sign up with Google"
                        className="flex items-center justify-center space-x-3 w-full py-3 rounded-md bg-white border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <FcGoogle className="text-blue-600" />
                        <span className="text-sm text-gray-700 font-semibold">
                            Sign up with Google
                        </span>
                    </button>

                    {/* Facebook Button */}
                    {/* <button
                        aria-label="Sign up with Facebook"
                        className="flex items-center justify-center space-x-3 w-full py-3 rounded-md bg-blue-600 border border-blue-500 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <FaFacebook className="text-white" />
                        <span className="text-sm text-white font-semibold">
                            Sign up with Facebook
                        </span>
                    </button> */}
                </div>
                <p className="text-xs text-center sm:px-6 dark:text-gray-400">
                    Already have an account?{" "}
                    <a
                        href="#"
                        className="underline text-violet-600 hover:text-violet-800 dark:text-violet-400"
                    >
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
