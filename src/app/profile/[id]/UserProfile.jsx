"use client";

import LoadingSpinner from "@/components/global/loading/LoadingSpin";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = ({ userData }) => {
    const [user, setUser] = useState(userData);
    const [isLoading, setIsLoading] = useState(!userData);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (userData) {
            setUser(userData);
            setIsLoading(false);
        }
    }, [userData]);

    if (isLoading) return <LoadingSpinner />;

    if (error)
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <p className="text-red-500">{error}</p>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-900 mb-24 text-gray-200">
            <div className="max-w-4xl mx-auto py-12 px-6">
                {/* Profile Header */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-6">
                    <Image
                        src={
                            user.profileImage ||
                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                        alt={`${user.username}'s profile`}
                        className="w-24 h-24 rounded-full object-cover shadow-lg"
                        width={96}
                        height={96}
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-violet-400">
                            {user.username}
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            {user.location || "Location not available"}
                        </p>
                    </div>
                </div>

                {/* About Section */}
                <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-violet-400 mb-4">
                        About
                    </h2>
                    <p className="text-gray-300">
                        {user.bio || "This user has not provided a bio yet."}
                    </p>
                </div>

                {/* Stats Section */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <p className="text-2xl font-bold text-violet-400">
                            {user.followers?.length || 0}
                        </p>
                        <p className="text-gray-400">Followers</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <p className="text-2xl font-bold text-violet-400">
                            {user.following?.length || 0}
                        </p>
                        <p className="text-gray-400">Following</p>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-violet-400 mb-4">
                        Contact
                    </h2>
                    <p className="text-gray-300">
                        Email: {user.email || "Not available"}
                    </p>
                </div>

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-md shadow-md"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
