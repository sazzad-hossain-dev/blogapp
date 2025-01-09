"use client";

import PeopleCard from "@/components/global/card/PeopleCard";
import LoadingSpinner from "@/components/global/loading/LoadingSpin";
import { db } from "@/configs/firebase";
import { useAppSelector } from "@/lib/hooks";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const Followers = () => {
    const [followers, setFollowers] = useState([]);
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

                const filteredFollowers = allUsers.filter((user) =>
                    currentUser.followers?.includes(user.id)
                );

                setFollowers(filteredFollowers);
                setIsLoading(false);
            },
            (err) => {
                console.error(err);
                setError("Failed to load followers.");
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, [currentUser]);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-200 mb-4 text-center">
                Your Followers
            </h1>
            <div className="space-y-3">
                {followers.length > 0 ? (
                    followers.map((user) => (
                        <PeopleCard
                            key={user.id}
                            user={user}
                            onFollow={() => {}} // No action for followers
                            isFollowing={false} // Button disabled, so this value is irrelevant
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-400">
                        You don&apos;t have any followers yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Followers;
