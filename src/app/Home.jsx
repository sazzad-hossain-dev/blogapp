"use client";
import { Auth } from "@/components/global/auth/Auth";
import CreatePostLink from "@/components/global/links/CreatePostLink";
import DiscoverPeopleLink from "@/components/global/links/DiscoverPeopleLink";
import LoadingSpinner from "@/components/global/loading/LoadingSpin";
import Post from "@/components/global/post/Post";
import { db } from "@/configs/firebase";
import { useAppSelector } from "@/lib/hooks";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const stateUser = useAppSelector((state) => state.auth.user);
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const userDocRef = doc(db, "users", stateUser.userId);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setCurrentUser(userDoc.data());
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

    useEffect(() => {
        if (!currentUser) return;

        const fetchPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "posts"));
                const postsArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const filteredPosts = postsArray.filter((post) => {
                    return currentUser.following?.includes(post.userId);
                });

                setPosts(filteredPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [currentUser]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <CreatePostLink />
            <div className="mb-16">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Post
                            key={post.id}
                            post={post}
                            currentUser={currentUser}
                        />
                    ))
                ) : (
                    <DiscoverPeopleLink />
                )}
            </div>
        </>
    );
};

export default Auth(Home);
