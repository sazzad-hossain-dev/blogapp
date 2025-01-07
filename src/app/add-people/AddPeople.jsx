"use client";
import PeopleCard from "@/components/global/card/PeopleCard";
import LoadingSpinner from "@/components/global/loading/LoadingSpin";
import { db } from "@/configs/firebase";
import { useAppSelector } from "@/lib/hooks";
import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const AddPeople = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [followingStatus, setFollowingStatus] = useState({}); // Track follow status for each user
    const stateUser = useAppSelector((state) => state.auth.user);

    // Fetch current user data
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const querySnapshot = await getDoc(
                    doc(db, "users", stateUser.userId)
                );
                if (querySnapshot.exists()) {
                    const userData = querySnapshot.data();
                    setCurrentUser({
                        ...userData,
                        following: Array.isArray(userData.following)
                            ? userData.following
                            : [],
                    });
                } else {
                    setError("Current user not found.");
                }
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching current user:", err);
                setError("Failed to load current user data.");
                setIsLoading(false);
            }
        };
        fetchCurrentUser();
    }, [stateUser.userId]);

    // Fetch users to follow
    useEffect(() => {
        if (!currentUser) return;

        const unsubscribe = onSnapshot(
            collection(db, "users"),
            (snapshot) => {
                const fetchedUsers = snapshot.docs
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    .filter(
                        (user) =>
                            user.id !== currentUser.id &&
                            !currentUser.following.includes(user.id)
                    );

                setUsers(fetchedUsers);
                setIsLoading(false);
            },
            (error) => {
                console.error("Error fetching users:", error);
                setError("Failed to load user data.");
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, [currentUser]);

    const handleFollow = async (user) => {
        if (!currentUser || !currentUser.id) {
            console.error("Current user is undefined or missing userId.");
            alert("Current user data is not available.");
            return;
        }

        // Mark user as following immediately for feedback
        setFollowingStatus((prevStatus) => ({
            ...prevStatus,
            [user.id]: true,
        }));

        try {
            // Update the current user's following and the target user's followers
            await updateDoc(doc(db, "users", currentUser.id), {
                following: arrayUnion(user.id),
            });
            await updateDoc(doc(db, "users", user.id), {
                followers: arrayUnion(currentUser.id),
            });

            // Update follow status after API call success
            setFollowingStatus((prevStatus) => ({
                ...prevStatus,
                [user.id]: true,
            }));
        } catch (error) {
            console.error("Failed to follow user:", error);
            setError("An error occurred while trying to follow this user.");
            // Optionally reset the button state in case of error
            setFollowingStatus((prevStatus) => ({
                ...prevStatus,
                [user.id]: false,
            }));
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="container mx-auto p-6 text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-200">
                Discover People
            </h1>
            <div className="space-y-3">
                {users.map((user) => (
                    <PeopleCard
                        key={user.id}
                        user={user}
                        onFollow={handleFollow}
                        isFollowing={followingStatus[user.id] || false} // Track follow status per user
                    />
                ))}
            </div>
        </div>
    );
};

export default AddPeople;
