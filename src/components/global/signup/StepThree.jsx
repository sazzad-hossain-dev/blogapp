"use client";

import { uploadImageToImageKit } from "@/configs/imagekit"; // Make sure this function is correctly configured

const StepThree = ({ formData, onInputChange }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [image, setImage] = useState(null);

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
                onInputChange("profileImageUrl", imageUrl); // Update the formData with the uploaded image URL
            } catch (error) {
                console.error("Image upload failed:", error);
                alert("Failed to upload image. Please try again.");
            } finally {
                setIsUploading(false);
            }
        }
    };

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
};

export default StepThree;
