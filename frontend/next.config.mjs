/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,//TODO 開発中に二回フックが発火？する原因なので一旦OFFにしたけど、本番稼働時にもどす
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;
