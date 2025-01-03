"use client";
import { auth } from "@/configs/firebase";
import { setUser } from "@/lib/data/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const router = useRouter();
    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            dispatch(
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    accessToken: user.accessToken,
                    userProfile: user.profileImage,
                })
            );
            console.log(user);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen  bg-gray-900">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md p-6 space-y-6 rounded-lg bg-gray-800 text-gray-200 shadow-lg">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="username"
                            className="blocktext-gray-200"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="password"
                            className="block text-gray-200"
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
                            className="w-full px-4 py-3 rounded-md bborder-gray-700 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        <div className="flex justify-end text-xs text-gray-400">
                            <a href="#" className="hover:underline">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="block w-full py-3 text-center rounded-md bg-violet-600 text-white font-semibold hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
                    >
                        Sign in
                    </button>
                </form>
                <div className="flex items-center pt-4 space-x-2">
                    <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                    <p className="text-sm text-gray-400">
                        Login with social accounts
                    </p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    {/* Google Button */}
                    <button
                        aria-label="Log in with Google"
                        className="flex items-center justify-center space-x-3 w-full py-3 rounded-md bg-white border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <FcGoogle className="text-blue-600" />
                        <span className="text-sm text-gray-700 font-semibold">
                            Login with Google
                        </span>
                    </button>

                    {/* Facebook Button */}
                    {/* <button
                        aria-label="Log in with Facebook"
                        className="flex items-center justify-center space-x-3 w-full py-3 rounded-md bg-blue-600 border border-blue-500 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <FaFacebook className="text-white" />
                        <span className="text-sm text-white font-semibold">
                            Login with Facebook
                        </span>
                    </button> */}
                </div>
                <p className="text-xs text-center sm:px-6 dark:text-gray-400">
                    Don't have an account?{" "}
                    <a
                        href="#"
                        className="underline text-violet-600 hover:text-violet-800 dark:text-violet-400"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
