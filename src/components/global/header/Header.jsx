"use client";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { CgExtension } from "react-icons/cg";

const Header = () => {
    const isUserAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );

    const router = useRouter();

    // if (!isUserAuthenticated) {
    //     router.push("/login");
    // }

    const links = ["Home", "About", "Contact"];
    isUserAuthenticated ? (
        <div className="navbar bg-gray-900 text-gray-100">
            <div className="navbar-start">
                <button>
                    <CgExtension size={44} />
                </button>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-gray-100">
                    {links.map((link, index) => (
                        <li key={index}>
                            <a className="hover:bg-violet-600 hover:text-white">
                                {link}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden text-gray-100 hover:bg-gray-800"
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
                        className="menu menu-sm dropdown-content bg-gray-900 text-gray-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {links.map((link, index) => (
                            <li key={index}>
                                <a className="hover:bg-violet-600 hover:text-white">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="avatar mx-3">
                    <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="navbar bg-gray-900 text-gray-100">
            <div className="navbar-start">
                <button>
                    <CgExtension size={44} />
                </button>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-gray-100">
                    {links.map((link, index) => (
                        <li key={index}>
                            <a className="hover:bg-violet-600 hover:text-white">
                                {link}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden text-gray-100 hover:bg-gray-800"
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
                        className="menu menu-sm dropdown-content bg-gray-900 text-gray-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {links.map((link, index) => (
                            <li key={index}>
                                <a className="hover:bg-violet-600 hover:text-white">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="avatar mx-3">
                    <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
