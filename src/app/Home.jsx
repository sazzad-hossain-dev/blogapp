"use client";
import { Auth } from "@/components/global/auth/Auth";
import CreatePostLink from "@/components/global/links/CreatePostLink";
import LoadingSpinner from "@/components/global/loading/LoadingSpin";
import Post from "@/components/global/post/Post";
import { db } from "@/configs/firebase"; // Ensure this points to your Firebase config
import { useAppSelector } from "@/lib/hooks";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
// Assuming you're using Redux for user state

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [currentUser, setCurrentUser] = useState(null); // Track current user
    const stateUser = useAppSelector((state) => state.auth.user); // Assuming Redux for user state

    // Fetch the current user's data to get their following list
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const userDocRef = doc(db, "users", stateUser.userId); // Get current user by ID
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setCurrentUser(userDoc.data()); // Set the current user's data (including following list)
                    console.log("current user data:", userDoc.data());
                } else {
                    console.error("User not found");
                }
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };

        if (stateUser?.userId) {
            fetchCurrentUser();
        }
    }, [stateUser?.userId]);

    // Fetch posts only from users the current user is following
    useEffect(() => {
        if (!currentUser) return; // If currentUser is null, do nothing

        const fetchPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "posts"));
                const postsArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id, // Document ID
                    ...doc.data(), // Document data
                }));

                // Filter posts to show only those from followed users
                const filteredPosts = postsArray.filter((post) => {
                    return currentUser.following?.includes(post.userId); // Assuming each post has an 'authorId' field
                });

                setPosts(filteredPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setIsLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchPosts();
    }, [currentUser]); // Fetch posts when the currentUser state is updated

    if (isLoading) {
        return <LoadingSpinner />; // Use the LoadingSpinner component here
    }

    return (
        <>
            <CreatePostLink />
            <div className="flex flex-col max-w-lg mx-auto py-6 px-2 my-3 space-y-6 overflow-hidden rounded-lg shadow-md bg-gray-800 text-gray-200">
                <div className="overflow-hidden">
                    {posts.length > 0 ? (
                        posts.map((post) => <Post key={post.id} post={post} />)
                    ) : (
                        <div className="text-center text-gray-200 mt-12">
                            No posts available. Be the first to create one!
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Auth(Home);
