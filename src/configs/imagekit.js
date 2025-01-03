import ImageKit from "imagekit";

export const imageKit = new ImageKit({
    publicKey: "public_8BjkvL9Lj9vaW62PygKgUCR7z2U=",
    privateKey: "private_3+gkaCkZPQS+ij8/kSaDygTN/ek=",
    urlEndpoint: "https://ik.imagekit.io/blogap/",
});
export const uploadImageToImageKit = async (file, fileName) => {
    try {
        const response = await imageKit.upload({
            file, // This is the image file or base64 data
            fileName, // Name for the file
        });
        return response.url; // This URL will be used for the image
    } catch (error) {
        console.error("Image upload failed:", error);
        throw error;
    }
};
