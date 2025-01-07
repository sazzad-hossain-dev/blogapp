"use client";
import { auth, db } from "@/configs/firebase";
import { uploadImageToImageKit } from "@/configs/imagekit";
import { setUser } from "@/lib/data/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons for eye toggle
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Password strength checker function
const checkPasswordStrength = (password) => {
    const strength = { score: 0, message: "" };
    if (password.length < 6) {
        strength.score = 1;
        strength.message = "Very Weak";
    } else if (password.length < 8) {
        strength.score = 2;
        strength.message = "Weak";
    } else if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
        strength.score = 3;
        strength.message = "Medium";
    } else if (
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
        strength.score = 4;
        strength.message = "Strong";
    } else {
        strength.score = 3;
        strength.message = "Medium";
    }
    return strength;
};

const Signup = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const router = useRouter();
    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        location: "",
        study: "",
        profileImageUrl: "",
    });
    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Added for confirm password
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        message: "",
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validateStep = () => {
        if (step === 1) {
            const { username, email, password, confirmPassword } = formData;
            if (!username || !email || !password || !confirmPassword) {
                toast.error("All fields are required in Step 1.");
                return false;
            }
            if (password !== confirmPassword) {
                toast.error("Passwords do not match.");
                return false;
            }
        } else if (step === 2) {
            const { gender, location, study } = formData;
            if (!gender || !location || !study) {
                toast.error("All fields are required in Step 2.");
                return false;
            }
        } else if (step === 3) {
            if (!formData.profileImageUrl) {
                toast.error("Profile image is required in Step 3.");
                return false;
            }
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep()) setStep((prev) => prev + 1);
    };

    const handlePrevious = () => {
        setStep((prev) => prev - 1);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please select a valid image file.");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert("Image size should not exceed 5MB.");
                return;
            }

            setIsUploading(true);

            try {
                const imageUrl = await uploadImageToImageKit(
                    file,
                    "profile-images/"
                );
                setImage(imageUrl);
                handleInputChange("profileImageUrl", imageUrl);
            } catch (error) {
                console.error("Image upload failed:", error);
                alert("Failed to upload image. Please try again.");
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleSubmit = async () => {
        const {
            username,
            email,
            password,
            profileImageUrl,
            gender,
            location,
            study,
        } = formData;

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            await updateProfile(user, { displayName: username });
            await setDoc(doc(db, "users", user.uid), {
                username,
                email,
                profileImage: profileImageUrl || "",
                gender,
                location,
                study,
                createdAt: serverTimestamp(),
                id: user.uid,
                following: [],
                followers: [],
            });

            dispatch(
                setUser({
                    email,
                    username,
                    profileImage: profileImageUrl,
                    userId: user.uid,
                })
            );

            toast.success("User successfully created!");
            router.push("/");
        } catch (error) {
            console.error("Error during signup:", error.message);
            toast.error("Signup failed, please try again.");
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h2 className="text-xl font-semibold dark:text-gray-200">
                            Basic Information
                        </h2>
                        <input
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            onChange={(e) =>
                                handleInputChange("username", e.target.value)
                            }
                            className="w-full px-4 py-3 mt-2 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 focus:ring-violet-500"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                                handleInputChange("email", e.target.value)
                            }
                            className="w-full px-4 py-3 mt-2 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 focus:ring-violet-500"
                        />
                        <div className="relative mt-2">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => {
                                    handleInputChange(
                                        "password",
                                        e.target.value
                                    );
                                    setPasswordStrength(
                                        checkPasswordStrength(e.target.value)
                                    );
                                }}
                                className="w-full px-4 py-3 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 focus:ring-violet-500"
                            />
                            <div
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={() =>
                                    setPasswordVisible((prev) => !prev)
                                }
                            >
                                {passwordVisible ? (
                                    <FaEyeSlash size={20} />
                                ) : (
                                    <FaEye size={20} />
                                )}
                            </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                            <span>
                                Password Strength: {passwordStrength.message}
                            </span>
                        </div>
                        <div className="relative mt-2">
                            <input
                                type={
                                    confirmPasswordVisible ? "text" : "password"
                                }
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    handleInputChange(
                                        "confirmPassword",
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-3 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 focus:ring-violet-500"
                            />
                            <div
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={() =>
                                    setConfirmPasswordVisible((prev) => !prev)
                                }
                            >
                                {confirmPasswordVisible ? (
                                    <FaEyeSlash size={20} />
                                ) : (
                                    <FaEye size={20} />
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2 className="text-xl font-semibold dark:text-gray-200">
                            Additional Information
                        </h2>
                        <select
                            value={formData.gender}
                            onChange={(e) =>
                                handleInputChange("gender", e.target.value)
                            }
                            className="w-full px-4 py-3 mt-2 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 focus:ring-violet-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Location"
                            value={formData.location}
                            onChange={(e) =>
                                handleInputChange("location", e.target.value)
                            }
                            className="w-full px-4 py-3 mt-2 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 focus:ring-violet-500"
                        />
                        <input
                            type="text"
                            placeholder="Study"
                            value={formData.study}
                            onChange={(e) =>
                                handleInputChange("study", e.target.value)
                            }
                            className="w-full px-4 py-3 mt-2 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 focus:ring-violet-500"
                        />
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h2 className="text-xl font-semibold dark:text-gray-200">
                            Profile Picture
                        </h2>
                        <div className="mb-4">
                            {image && (
                                <div className="relative mb-4">
                                    <img
                                        src={image}
                                        alt="Profile Preview"
                                        className="w-20 h-20 object-cover rounded-full"
                                    />
                                    <button
                                        onClick={() => setImage(null)}
                                        className="absolute top-2 right-2 bg-gray-800 text-gray-200 rounded-full p-1 hover:bg-gray-700"
                                    >
                                        ✖
                                    </button>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={isUploading}
                                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-700"
                            />
                            {isUploading && (
                                <p className="text-center text-sm text-gray-400">
                                    Uploading...
                                </p>
                            )}
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <h2 className="text-xl font-semibold dark:text-gray-200">
                            Confirm & Submit
                        </h2>
                        <div className="space-y-2 mt-4">
                            <div>
                                <strong>Username:</strong> {formData.username}
                            </div>
                            <div>
                                <strong>Email:</strong> {formData.email}
                            </div>
                            <div>
                                <strong>Gender:</strong> {formData.gender}
                            </div>
                            <div>
                                <strong>Location:</strong> {formData.location}
                            </div>
                            <div>
                                <strong>Study:</strong> {formData.study}
                            </div>
                            <div>
                                <strong>Profile Image:</strong>
                                <img
                                    src={formData.profileImageUrl}
                                    alt="Profile Preview"
                                    className="w-20 h-20 object-cover rounded-full mt-2"
                                />
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full flex flex-col justify-between">
                {/* Step Tracker */}
                <ul className="steps mb-6 text-lg">
                    {[
                        "Basic Info",
                        "Additional Info",
                        "Profile Picture",
                        "Confirm & Submit",
                    ].map((label, index) => (
                        <li
                            key={index}
                            className={`step ${
                                index + 1 <= step
                                    ? "step-primary"
                                    : "step-neutral"
                            } text-sm sm:text-base`}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
                {renderStep()}
                <div className="flex justify-between mt-4">
                    {step > 1 && (
                        <button
                            onClick={handlePrevious}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        >
                            Previous
                        </button>
                    )}
                    {step < 4 ? (
                        <button
                            onClick={handleNext}
                            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
