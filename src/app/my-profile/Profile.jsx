"use client";
import { Auth } from "@/components/global/auth/Auth";
import LoadingSpinner from "@/components/global/loading/LoadingSpin";
import { db } from "@/configs/firebase";
import { useAppSelector } from "@/lib/hooks";
import { formatDistanceToNow } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile = () => {
    const currentUser = useAppSelector((state) => state.auth.user);
    const userId = currentUser.userId;

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const docRef = doc(db, "users", userId);
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
    }, [userId]);

    if (!userData) {
        return <LoadingSpinner />;
    }

    const {
        email,
        profileImage,
        username,
        createdAt,
        followers,
        following,
        location,
        study,
    } = userData;
    const formattedDate = createdAt?.seconds
        ? formatDistanceToNow(new Date(createdAt.seconds * 1000), {
              addSuffix: true,
          })
        : "Date not available";

    return (
        <div className="max-w-5xl mx-auto p-6 sm:p-8">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-x-0 sm:space-x-6 bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-xl">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                    <Image
                        src={profileImage}
                        alt={`${username}'s profile`}
                        className="w-full h-full object-cover shadow-md border-2 border-gray-600 rounded-md"
                        width={160} // or use dynamic width
                        height={160} // or use dynamic height
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
                    <div className="text-sm flex gap-2 text-gray-400 mt-2">
                        <Link href={"/followers"}>
                            <span className="font-semibold text-indigo-400">
                                {followers?.length || 0}
                            </span>
                            Followers
                        </Link>
                        <Link href={"/following"}>
                            <span className="font-semibold text-indigo-400">
                                {following?.length || 0}
                            </span>
                            Following
                        </Link>
                    </div>
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

            <div className="bg-gray-800 p-6 rounded-2xl shadow-xl flex flex-col justify-center items-center text-gray-200 mt-8">
                <h2 className="text-2xl font-semibold text-indigo-400">
                    Profile Details
                </h2>
                <ul className="mt-4 text-sm text-gray-400 space-y-2">
                    <li>
                        <span className="font-semibold text-gray-200">
                            Location:
                        </span>
                        {location || "Not provided"}
                    </li>
                    <li>
                        <span className="font-semibold text-gray-200">
                            Study:
                        </span>
                        {study || "Not provided"}
                    </li>
                    <li>
                        <span className="font-semibold text-gray-200">
                            Email:
                        </span>
                        {email}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Auth(Profile);
