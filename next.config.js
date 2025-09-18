module.exports = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'siren-music.s3.us-east-1.amazonaws.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '*.s3.amazonaws.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '*.s3.us-east-1.amazonaws.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'us-east-1.console.aws.amazon.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '*.console.aws.amazon.com',
                port: '',
                pathname: '/**',
            }
        ],
    },
};
