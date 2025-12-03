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
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '192.168.18.7',
                port: '3000',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '192.168.18.7',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'backend.veraos.io',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'backend.veraos.io',
                port: '',
                pathname: '/**',
            }
        ],
    },
};
