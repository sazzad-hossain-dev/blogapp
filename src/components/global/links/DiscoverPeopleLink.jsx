import Link from "next/link";

const DiscoverPeopleLink = () => {
    return (
        <div className="flex justify-center items-center pt-6 pb-2 px-2">
            <div className="flex flex-col sm:flex-row items-center mx-auto p-4 sm:p-6 space-y-4 sm:space-x-6 sm:space-y-0 overflow-hidden rounded-lg shadow-md bg-gray-800 text-gray-200 w-full sm:max-w-lg">
                <p className="text-lg text-gray-100 text-center sm:text-left">
                    find new people to connect with?
                </p>
                <Link href="/discover-people">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out w-full sm:w-auto">
                        Discover People
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default DiscoverPeopleLink;
