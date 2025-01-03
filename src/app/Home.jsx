"use client";
import { Auth } from "@/components/global/auth/Auth";
import CreatePostLink from "@/components/global/links/CreatePostLink";
import LoadingSpinner from "@/components/global/loading/LoadingSpin";

import Post from "@/components/global/post/Post";
import { db } from "@/configs/firebase"; // Ensure this points to your Firebase config
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "posts")); // Replace 'posts' with your collection name
                const postsArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id, // Document ID
                    ...doc.data(), // Document data
                }));
                setPosts(postsArray);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setIsLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchPosts();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    if (isLoading) {
        return <LoadingSpinner />; // Use the LoadingSpinner component here
    }

    return (
        <>
            <CreatePostLink />
            <div>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Post key={post.id} post={post} /> // Passing post data as a prop
                    ))
                ) : (
                    <div className="text-center text-gray-200 mt-12">
                        No posts available. Be the first to create one!
                    </div>
                )}
            </div>
        </>
    );
};

export default Auth(Home);
