/** @type {import('next').NextConfig} */

const nextConfig = {
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
};

module.exports = nextConfig;
