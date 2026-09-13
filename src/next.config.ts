import type { NextConfig } from "next";

const nextConfig: NextConfig = {
        // config option here
        reactCompiler: true,
        images: {
            remotePatterns:[
                {
                    protocol: 'https',
                    hostname: 'image.shadecnspace.com'
                },
                {
                    protocol: "https",
                    hostname: "fakestoreapi.com",
                }
                
            ]
        }
};

export default nextConfig;