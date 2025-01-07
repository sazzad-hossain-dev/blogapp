"use client";
import { Auth } from "@/components/global/auth/Auth";
import LoadingSpinner from "@/components/global/loading/LoadingSpin"; // Import LoadingSpinner
import { db } from "@/configs/firebase";
import { useAppSelector } from "@/lib/hooks";
import { formatDistanceToNow } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile = () => {
    const currentUser = useAppSelector((state) => state.auth.user);
    const useruid = currentUser.userId;

    // State for user data
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const docRef = doc(db, "users", useruid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [useruid]);

    // Loading state
    if (!userData) {
        return <LoadingSpinner />; // Show loading spinner while fetching data
    }

    const { email, profileImage, username, createdAt } = userData;
    const formattedDate = createdAt?.seconds
        ? formatDistanceToNow(new Date(createdAt.seconds * 1000), {
              addSuffix: true,
          })
        : "Date not available";

    const handleUpdateProfile = () => {
        console.log("Update profile clicked!");
    };

    return (
        <div className="max-w-5xl mx-auto p-6 sm:p-8">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-x-0 sm:space-x-6 bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-xl">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                    <img
                        src={profileImage}
                        alt={`${username}'s profile`}
                        className="w-full h-full object-cover shadow-md border-2 border-gray-600 rounded-md"
                    />
                </div>
                <div className="text-white text-center sm:text-left mt-4 sm:mt-0">
                    <h1 className="text-2xl sm:text-3xl font-bold">
                        {username}
                    </h1>
                    <p className="text-lg">{email}</p>
                    <p className="text-sm text-gray-400">
                        Joined {formattedDate}
                    </p>
                    {/* Update Profile Button (Moved to the top) */}
                    <div className="mt-4 sm:mt-6">
                        <Link
                            href={"/update-profile"}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transform transition-all w-full sm:w-auto"
                        >
                            Update Profile
                        </Link>
                    </div>
                </div>
            </div>

            {/* Profile Information Cards */}
            <div className="space-y-8 mt-8">
                {/* About Section */}
                <div className="bg-gray-800 p-6 rounded-2xl shadow-xl text-gray-200">
                    <h2 className="text-2xl font-semibold text-indigo-400">
                        About Me
                    </h2>
                    <p className="text-sm text-gray-400 mt-4">
                        This section can contain a brief description or bio
                        about the user. For example, hobbies, interests, or a
                        personal quote.
                    </p>
                </div>

                {/* Social Links Section */}
                <div className="bg-gray-800 p-6 rounded-2xl shadow-xl text-gray-200">
                    <h2 className="text-2xl font-semibold text-indigo-400">
                        Social Links
                    </h2>
                    <ul className="mt-4 text-sm text-gray-400">
                        <li>
                            Twitter:{" "}
                            <a
                                href="#"
                                className="text-violet-400 hover:text-violet-500 transition"
                            >
                                @username
                            </a>
                        </li>
                        <li>
                            GitHub:{" "}
                            <a
                                href="#"
                                className="text-violet-400 hover:text-violet-500 transition"
                            >
                                @username
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Auth(Profile);
