import { db } from "@/configs/firebase";
import { doc, getDoc } from "firebase/firestore";
import UserProfile from "./UserProfile";

export default async function Page({ params }) {
    const { id } = params;

    // Fetch user data from Firestore
    const userDoc = await getDoc(doc(db, "users", id));
    const user = userDoc.exists() ? userDoc.data() : null;

    // Convert Firestore Timestamp to Date object if present
    if (user && user.createdAt) {
        user.createdAt = new Date(user.createdAt.seconds * 1000); // Convert Firestore Timestamp to Date
    }

    // If the user doesn't exist, you can return a 404 page here
    if (!user) {
        return (
            <div className="text-center">
                <h1 className="text-2xl text-red-500">User not found</h1>
            </div>
        );
    }

    return <UserProfile userData={user} />;
}
