/** @type {import('next').NextConfig} */

const nextConfig = {
    devIndicators: false,
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "1337",
                pathname: "/uploads/**",
            },
            {
                protocol: "https",
                hostname: `${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
            },
            {
                protocol: "https",
                hostname: "www.google.com",
            },
        ],
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.mdx/,
            use: ['@mdx-js/loader'],
        });

        return config;
    },
    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    },
    async headers() {
        return [
            {
                source: '/manifest.json',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600, must-revalidate',
                    },
                    {
                        key: 'Content-Type',
                        value: 'application/manifest+json',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
