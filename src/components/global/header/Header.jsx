"use client";
import { logout } from "@/lib/data/auth/authSlice";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CgExtension } from "react-icons/cg";
import { useDispatch } from "react-redux";

const Header = () => {
    const user = useAppSelector((state) => state.auth.user);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        router.push("/login");
    };

    return (
        <div className="navbar bg-gray-900 text-white w-full px-4 sm:px-8 py-3 border-b border-white">
            {/* Navbar Start: Left Section (Logo) */}
            <div className="navbar-start flex items-center space-x-4">
                <Link
                    href="/"
                    className="text-2xl font-semibold tracking-wide flex items-center"
                >
                    <CgExtension size={40} />
                    <span className="ml-2">Postit</span>
                </Link>
            </div>

            {/* Navbar: Links for Large Devices */}
            <div className="navbar-center hidden lg:flex flex-grow justify-center">
                {user ? (
                    <ul className="menu menu-horizontal p-1 space-x-6 text-white">
                        <li>
                            <Link
                                href={"/"}
                                className="hover:bg-violet-600 hover:text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={"/profile"}
                                className="hover:bg-violet-600 hover:text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
                            >
                                Profile
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <div className="hidden lg:flex space-x-4">
                        <Link
                            href="/signup"
                            className="btn btn-outline bg-transparent hover:bg-violet-600 hover:text-white text-white px-6 py-2 rounded-md"
                        >
                            Join Us
                        </Link>
                    </div>
                )}
            </div>

            {/* Navbar: Dropdown Button for Small Devices */}
            <div className="navbar-end flex items-center space-x-4 relative lg:hidden">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
                    >
                        {user ? (
                            <>
                                <li>
                                    <Link href={"/"}>Home</Link>
                                </li>
                                <li>
                                    <Link href={"/profile"}>Profile</Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left py-2 px-4 text-white bg-red-600 rounded-md"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/signup">Join Us</Link>
                                </li>
                                <li>
                                    <Link href="/login">Login</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            {/* Navbar: Right Section (Profile dropdown or button) */}
            <div className="navbar-end flex items-center space-x-4 relative hidden lg:flex">
                {user ? (
                    <div className="relative">
                        {/* Avatar */}
                        <div className="avatar cursor-pointer">
                            <div className="w-12 h-12 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                                <img
                                    src={user?.profileImage}
                                    alt="Profile"
                                    className="object-cover w-full h-full rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Header;
