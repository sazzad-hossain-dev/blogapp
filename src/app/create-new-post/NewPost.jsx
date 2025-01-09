"use client";
import { Auth } from "@/components/global/auth/Auth";
import { db } from "@/configs/firebase";
import { uploadImageToImageKit } from "@/configs/imagekit";
import { useAppSelector } from "@/lib/hooks";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const NewPost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const user = useAppSelector((state) => state.auth.user);
    const userId = user.userId;
    const userName = user.username;

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
            setImage(file);
        }
    };

    const handlePostSubmit = async () => {
        try {
            if (!title || !description) {
                alert("Title and description are required.");
                return;
            }

            setIsLoading(true);

            const postRef = await addDoc(collection(db, "posts"), {
                title,
                description,
                userId,
                createdAt: serverTimestamp(),
                userName,
            });
            const postId = postRef.id;
            let imageUrl = "";
            if (image) {
                try {
                    imageUrl = await uploadImageToImageKit(
                        image,
                        `posts/${postId}`
                    );
                } catch (uploadError) {
                    console.error("Image upload failed:", uploadError);
                    toast.error("Failed to upload image. Please try again.");
                    setIsLoading(false);
                    return;
                }
            }
            await updateDoc(doc(db, "posts", postId), {
                id: postId,
                image: imageUrl,
            });

            toast.success("Post created successfully!");
            setTitle("");
            setDescription("");
            setImage(null);
            router.push("/");
        } catch (error) {
            console.error("Failed to create post:", error);
            toast.error("Failed to create post. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col max-w-lg mx-auto p-6 my-3 space-y-6 overflow-hidden rounded-lg shadow-md bg-gray-800 text-gray-200">
            <h2 className="text-xl font-semibold text-gray-100">
                Create New Post
            </h2>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Post Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <textarea
                    placeholder="Post Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-24 px-4 py-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                ></textarea>
                <div>
                    {image && (
                        <div className="relative">
                            <Image
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                className="w-full h-60 object-cover rounded-md mb-2"
                                width={500} // Adjust width/height as needed
                                height={250}
                            />
                            <button
                                onClick={() => setImage(null)}
                                className="absolute top-2 right-2 bg-gray-800 text-gray-200 rounded-full p-1 hover:bg-gray-700"
                            >
                                ✖
                            </button>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-700"
                    />
                </div>
            </div>
            <button
                onClick={handlePostSubmit}
                className={`px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    isLoading
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-violet-600 text-gray-200 hover:bg-violet-700"
                }`}
                disabled={isLoading}
            >
                {isLoading ? "Posting..." : "Post"}
            </button>
        </div>
    );
};

export default Auth(NewPost);
