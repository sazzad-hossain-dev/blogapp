/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs: ["src"], // Or adjust to the appropriate directories for your project
    },
    images: {
        domains: ["ik.imagekit.io", "storage.googleapis.com"], // Add ImageKit and Firebase domains
    },
};

module.exports = nextConfig;
