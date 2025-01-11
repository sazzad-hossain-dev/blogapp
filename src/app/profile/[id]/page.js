import { db } from "@/configs/firebase";
import { doc, getDoc } from "firebase/firestore";
import UserProfile from "./UserProfile";

export default async function Page({ params }) {
    const { id } = params;

    const userDoc = await getDoc(doc(db, "users", id));
    const user = userDoc.exists() ? userDoc.data() : null;

    if (user && user.createdAt) {
        user.createdAt = new Date(user.createdAt.seconds * 1000);
    }
    if (!user) {
        return (
            <div className="text-center">
                <h1 className="text-2xl text-red-500">User not found</h1>
            </div>
        );
    }

    return <UserProfile userData={user} />;
}
