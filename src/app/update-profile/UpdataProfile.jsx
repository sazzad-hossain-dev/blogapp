"use client";

import { Auth } from "@/components/global/auth/Auth";
import { db } from "@/configs/firebase";
import { uploadImageToImageKit } from "@/configs/imagekit";
import { setUser } from "@/lib/data/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

const UpdateProfile = () => {
    const user = useAppSelector((state) => state.auth.user);
    const [username, setUsername] = useState(user?.displayName || "");
    const [profileImage, setProfileImage] = useState(null);
    const [bio, setBio] = useState(user?.bio || ""); // New state for bio
    const [location, setLocation] = useState(user?.location || ""); // New state for location
    const [study, setStudy] = useState(user?.study || ""); // New state for study
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please select a valid image file.");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert("Image size should not exceed 5MB.");
                return;
            }

            setProfileImage(file);
        }
    };

    const handleUpdateProfileImage = async () => {
        if (!profileImage) return;

        try {
            setIsLoading(true);
            const imageUrl = await uploadImageToImageKit(
                profileImage,
                `profiles/${user.uid}`
            );
            await updateDoc(doc(db, "users", user.uid), {
                profileImage: imageUrl,
            });
            dispatch(setUser({ ...user, profileImage: imageUrl }));
            alert("Profile image updated successfully!");
        } catch (error) {
            console.error("Failed to update profile image:", error);
            alert("Failed to update profile image. Please try again.");
        } finally {
            setIsLoading(false);
            setProfileImage(null);
        }
    };

    const handleUpdateUsername = async () => {
        if (!username.trim()) return;

        try {
            setIsLoading(true);
            await updateDoc(doc(db, "users", user.uid), {
                displayName: username,
            });
            alert("Username updated successfully!");
        } catch (error) {
            console.error("Failed to update username:", error);
            alert("Failed to update username. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateBioLocationStudy = async () => {
        try {
            setIsLoading(true);
            await updateDoc(doc(db, "users", user.uid), {
                bio: bio,
                location: location,
                study: study,
            });
            alert("Profile information updated successfully!");
        } catch (error) {
            console.error("Failed to update bio, location, or study:", error);
            alert("Failed to update profile information. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col max-w-xl mx-auto p-8 my-10 space-y-8 rounded-lg shadow-lg bg-gray-800 text-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-100">
                Update Profile
            </h2>

            {/* Update Profile Image */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300">
                    Profile Image
                </h3>
                {profileImage && (
                    <div className="relative">
                        <img
                            src={URL.createObjectURL(profileImage)}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                        <button
                            onClick={() => setProfileImage(null)}
                            className="absolute top-2 right-2 bg-gray-800 text-gray-300 rounded-full p-1 hover:bg-red-600 hover:text-white"
                        >
                            ✖
                        </button>
                    </div>
                )}
                <label className="block w-full px-4 py-2 text-sm text-gray-400 border-2 border-dashed rounded-lg cursor-pointer hover:border-violet-500 hover:text-violet-500">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                    Select an image file to upload
                </label>
                <button
                    onClick={handleUpdateProfileImage}
                    className={`w-full px-6 py-3 rounded-md font-semibold transition duration-200 ${
                        isLoading
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : "bg-violet-600 text-white hover:bg-violet-700"
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? "Updating..." : "Update Profile Image"}
                </button>
            </div>

            {/* Update Username */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300">
                    Username
                </h3>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter new username"
                    className="w-full px-4 py-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <button
                    onClick={handleUpdateUsername}
                    className={`w-full px-6 py-3 rounded-md font-semibold transition duration-200 ${
                        isLoading
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? "Updating..." : "Update Username"}
                </button>
            </div>

            {/* Update Bio, Location, and Study */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300">Bio</h3>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself"
                    className="w-full px-4 py-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                <h3 className="text-lg font-semibold text-gray-300">
                    Location
                </h3>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your location"
                    className="w-full px-4 py-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                <h3 className="text-lg font-semibold text-gray-300">Study</h3>
                <input
                    type="text"
                    value={study}
                    onChange={(e) => setStudy(e.target.value)}
                    placeholder="Enter your study details"
                    className="w-full px-4 py-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <button
                    onClick={handleUpdateBioLocationStudy}
                    className={`w-full px-6 py-3 rounded-md font-semibold transition duration-200 ${
                        isLoading
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={isLoading}
                >
                    {isLoading
                        ? "Updating..."
                        : "Update Bio, Location, and Study"}
                </button>
            </div>
        </div>
    );
};

export default Auth(UpdateProfile);
