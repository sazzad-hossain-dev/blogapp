import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import { db } from "@/configs/firebase";

const Post = ({ post }) => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    const {
        title,
        description,
        image,
        createdAt,
        userName,
        userProfile,
        userId,
    } = post;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProfile(docSnap.data());
                } else {
                    console.error("No such document!");
                    setError("User data not found.");
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Failed to load user data.");
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <div className="flex flex-col max-w-lg mx-auto py-6 px-2 my-3 space-y-6 overflow-hidden rounded-lg shadow-md bg-gray-800 text-gray-200">
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex space-x-4">
                <img
                    alt={profile?.name || userName}
                    src={profile?.profileImage || userProfile}
                    className="object-cover w-12 h-12 rounded-full shadow bg-gray-500"
                />
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold text-violet-400 hover:text-violet-500">
                        {profile?.name || userName}
                    </p>
                    <span className="text-xs text-gray-400">
                        {createdAt
                            ? formatDistanceToNow(
                                  new Date(createdAt.seconds * 1000),
                                  { addSuffix: true }
                              )
                            : "Unknown"}
                    </span>
                </div>
            </div>
            <div>
                <img
                    src={image}
                    alt={title}
                    className="object-cover w-full mb-4 h-60 sm:h-96 bg-gray-700"
                />
                <h2 className="mb-1 text-xl font-semibold text-gray-100">
                    {title}
                </h2>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
            <div className="flex flex-wrap justify-between">
                <div className="flex space-x-2 text-sm text-gray-400">
                    <button
                        type="button"
                        className="flex items-center p-1 space-x-1.5 hover:text-gray-200"
                    >
                        <AiOutlineLike />
                        <span>30</span>
                    </button>
                    <button
                        type="button"
                        className="flex items-center p-1 space-x-1.5 hover:text-gray-200"
                    >
                        <FaRegCommentAlt />
                        <span>283</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

Post.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        createdAt: PropTypes.object.isRequired,
        userName: PropTypes.string.isRequired,
        userProfile: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
    }).isRequired,
};

export default Post;
