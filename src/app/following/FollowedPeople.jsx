"use client";

import PeopleCard from "@/components/global/card/PeopleCard";
import LoadingSpinner from "@/components/global/loading/LoadingSpin";
import { db } from "@/configs/firebase";
import { useAppSelector } from "@/lib/hooks";
import {
    arrayRemove,
    collection,
    doc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const FollowedPeople = () => {
    const [followedUsers, setFollowedUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const stateUser = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const docRef = doc(db, "users", stateUser.userId);
            onSnapshot(docRef, (snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.data();
                    setCurrentUser(userData);
                }
                setIsLoading(false);
            });
        };

        fetchCurrentUser();
    }, [stateUser.userId]);

    useEffect(() => {
        if (!currentUser) return;

        const unsubscribe = onSnapshot(
            collection(db, "users"),
            (snapshot) => {
                const allUsers = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const followed = allUsers.filter((user) =>
                    currentUser.following?.includes(user.id)
                );

                setFollowedUsers(followed);
                setIsLoading(false);
            },
            (err) => {
                console.error(err);
                setError("Failed to load users.");
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, [currentUser]);

    const handleUnfollow = async (user) => {
        try {
            await updateDoc(doc(db, "users", currentUser.id), {
                following: arrayRemove(user.id),
            });

            await updateDoc(doc(db, "users", user.id), {
                followers: arrayRemove(currentUser.id),
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-200 mb-4 text-center">
                People You Follow
            </h1>
            <div className="space-y-3">
                {followedUsers.length > 0 ? (
                    followedUsers.map((user) => (
                        <PeopleCard
                            key={user.id}
                            user={user}
                            onFollow={handleUnfollow}
                            isFollowing={true}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-400">
                        You are not following anyone yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default FollowedPeople;
