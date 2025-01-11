/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        dirs: ["src"],
    },
    images: {
        domains: [
            "ik.imagekit.io",
            "storage.googleapis.com",
            "img.daisyui.com",
        ],
    },
};

module.exports = nextConfig;
