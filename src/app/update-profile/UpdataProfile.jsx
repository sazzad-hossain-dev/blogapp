"use client";

import { Auth } from "@/components/global/auth/Auth";
import { db } from "@/configs/firebase";
import { uploadImageToImageKit } from "@/configs/imagekit";
import { setUser } from "@/lib/data/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdateProfile = () => {
    const user = useAppSelector((state) => state.auth.user);
    const [username, setUsername] = useState(user?.username || "");
    const [profileImage, setProfileImage] = useState(null);
    const [bio, setBio] = useState(user?.bio || "");
    const [location, setLocation] = useState(user?.location || "");
    const [study, setStudy] = useState(user?.study || "");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const userId = user?.userId;

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
                `profiles/${userId}`
            );
            await updateDoc(doc(db, "users", userId), {
                profileImage: imageUrl,
            });
            dispatch(setUser({ ...user, profileImage: imageUrl }));
            toast.success("Image update successfully ");
            setProfileImage(null);
            router.push("/my-profile");
        } catch (error) {
            console.error("Failed to update profile image:", error);
            toast.error("Failed to update profile image. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateUsername = async () => {
        if (!username.trim()) return;

        try {
            setIsLoading(true);
            await updateDoc(doc(db, "users", userId), {
                displayName: username,
            });
            dispatch(setUser({ ...user, displayName: username }));
            toast.success("Username updated successfully!");
            router.push("/my-profile");
        } catch (error) {
            console.error("Failed to update username:", error);
            toast.error("Failed to update username. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateBioLocationStudy = async () => {
        try {
            setIsLoading(true);
            await updateDoc(doc(db, "users", userId), {
                bio: bio || user?.bio,
                location: location || user?.location,
                study: study || user?.study,
            });
            dispatch(
                setUser({
                    ...user,
                    bio: bio || user?.bio,
                    location: location || user?.location,
                    study: study || user?.study,
                })
            );
            toast.success("Profile information updated successfully!");
            router.push("/my-profile");
        } catch (error) {
            console.error("Failed to update bio, location, or study:", error);
            toast.error(
                "Failed to update profile information. Please try again."
            );
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
                {!profileImage && user?.profileImage && (
                    <img
                        src={user.profileImage}
                        alt="Current Profile"
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
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
