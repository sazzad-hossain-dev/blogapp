import { auth, db } from "@/configs/firebase";
import { setUser } from "@/lib/data/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const useSignup = () => {
    const dispatch = useAppDispatch();

    const handleSignup = async (formData) => {
        const {
            username,
            email,
            password,
            confirmPassword,
            profileImageUrl,
            gender,
            location,
            study,
        } = formData;

        // Validate form data
        if (!username || !email || !password || !confirmPassword) {
            toast.error("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            // Create user
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            // Update profile
            await updateProfile(user, { displayName: username });

            // Store user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                username,
                email,
                profileImage: profileImageUrl || "",
                gender,
                location,
                study,
                createdAt: serverTimestamp(),
            });

            // Dispatch user data to Redux
            dispatch(
                setUser({
                    email,
                    username,
                    profileImage: profileImageUrl,
                    userId: user.uid,
                })
            );

            toast.success("User successfully created!");
        } catch (error) {
            console.error("Error during signup:", error.message);
            toast.error("Signup failed, please try again.");
        }
    };

    return { handleSignup };
};

export default useSignup;
