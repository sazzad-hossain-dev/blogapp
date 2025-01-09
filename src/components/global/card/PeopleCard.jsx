import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import { AiOutlineUserAdd } from "react-icons/ai";

const PeopleCard = ({ user, onFollow, isFollowing }) => {
    const { username, profileImage, location, email } = user;

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800 text-gray-200 rounded shadow-md max-w-md mx-auto">
            <div className="flex items-center space-x-3">
                <Image
                    height={170}
                    width={170}
                    alt={username}
                    src={profileImage}
                    className="object-cover w-10 h-10 rounded-full shadow bg-gray-500"
                />
                <div>
                    <Link href={`/profile/${user.id}`}>
                        <p className="text-sm font-semibold text-violet-400 hover:text-violet-500 cursor-pointer">
                            {username}
                        </p>
                    </Link>
                    <p className="text-xs text-gray-400">
                        {location || "Location not available"}
                    </p>
                    <p className="text-xs text-gray-400">
                        {email || "Email not available"}
                    </p>
                    <Link href={`/profile/${user.id}`}>
                        <p className="text-xs link">View Details</p>
                    </Link>
                </div>
            </div>

            <button
                type="button"
                className="flex items-center px-3 py-1 text-sm font-medium text-gray-800 bg-violet-400 hover:bg-violet-500 rounded"
                onClick={() => onFollow(user)}
                disabled={isFollowing} // Disable button when following
            >
                {isFollowing ? (
                    "Following..."
                ) : (
                    <>
                        <AiOutlineUserAdd className="mr-1 text-base" /> Follow
                    </>
                )}
            </button>
        </div>
    );
};

PeopleCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        profileImage: PropTypes.string,
        location: PropTypes.string,
        email: PropTypes.string,
    }).isRequired,
    onFollow: PropTypes.func.isRequired,
    isFollowing: PropTypes.bool.isRequired,
};

export default PeopleCard;
