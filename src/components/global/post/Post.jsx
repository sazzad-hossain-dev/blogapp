import { db } from "@/configs/firebase";
import { formatDistanceToNow } from "date-fns";
import {
    arrayRemove,
    arrayUnion,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

const Post = ({ post, currentUser }) => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
    const [isLiked, setIsLiked] = useState(
        post.likes?.includes(currentUser?.id) || false
    );
    const [comments, setComments] = useState(post.comments || []);
    const [newComment, setNewComment] = useState("");

    const {
        id,
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
                    setError("User data not found.");
                }
            } catch (err) {
                setError("Failed to load user data.");
            }
        };

        fetchUserData();
    }, [userId]);

    const toggleLike = async () => {
        if (!currentUser?.id) return;

        const postRef = doc(db, "posts", id);

        try {
            if (isLiked) {
                await updateDoc(postRef, {
                    likes: arrayRemove(currentUser.id),
                });
                setLikesCount((prev) => prev - 1);
            } else {
                await updateDoc(postRef, { likes: arrayUnion(currentUser.id) });
                setLikesCount((prev) => prev + 1);
            }
            setIsLiked((prev) => !prev);
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };

    const addComment = async () => {
        if (newComment.trim() === "") return;

        const postRef = doc(db, "posts", id);

        try {
            const comment = {
                userId: currentUser?.id,
                userName: currentUser?.username,
                comment: newComment,
            };

            await updateDoc(postRef, { comments: arrayUnion(comment) });

            const newCommentWithLocalTimestamp = {
                ...comment,
                createdAt: { seconds: Date.now() / 1000 },
            };

            setComments((prev) => [...prev, newCommentWithLocalTimestamp]);
            setNewComment(""); // Clear input
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <div className="flex flex-col max-w-lg mx-auto py-6 px-2 my-3 space-y-6 rounded-lg shadow-lg bg-gray-800 text-gray-200">
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex space-x-4">
                <Image
                    alt={profile?.name || userName}
                    src={
                        profile?.profileImage ||
                        userProfile ||
                        "/default-avatar.png"
                    }
                    className="object-cover w-12 h-12 rounded-full shadow-lg bg-gray-500"
                    width={48}
                    height={48}
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
                <Image
                    src={image}
                    alt={title}
                    className="object-cover w-full mb-4 h-60 sm:h-96 bg-gray-700 rounded-lg"
                    width={640}
                    height={360}
                />
                <h2 className="mb-1 text-xl font-semibold text-gray-100">
                    {title}
                </h2>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
            <div className="flex flex-wrap justify-between mt-4">
                <div className="flex space-x-2 text-sm text-gray-400">
                    <button
                        type="button"
                        className={`flex items-center p-1 space-x-1.5 hover:text-blue-500 ${
                            isLiked ? "text-blue-500" : ""
                        }`}
                        onClick={toggleLike}
                    >
                        <AiOutlineLike />
                        <span>{likesCount}</span>
                    </button>
                    <button
                        type="button"
                        className="flex items-center p-1 space-x-1.5 hover:text-gray-200"
                    >
                        <FaRegCommentAlt />
                        <span>{comments.length}</span>
                    </button>
                </div>
            </div>
            <div className="mt-4 space-y-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-2 text-sm text-gray-200 bg-gray-700 rounded-md shadow-sm"
                />
                <button
                    onClick={addComment}
                    className="w-full py-2 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700"
                >
                    Post Comment
                </button>
            </div>
            <div className="mt-4 space-y-3">
                {comments.map((comment, index) => (
                    <div
                        key={index}
                        className="flex items-start space-x-3 bg-gray-700 p-3 rounded-md shadow-sm"
                    >
                        <p className="text-sm text-gray-200">
                            <span className="font-semibold text-violet-400">
                                {comment.userName}
                            </span>
                            : {comment.comment}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Post;
