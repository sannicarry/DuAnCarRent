/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    env: {
        SERVER_URL: "http://localhost:5290",
    },
};

export default nextConfig;
