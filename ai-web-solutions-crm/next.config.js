/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    publicRuntimeConfig: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://crm.rinconnect.org:3000',
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GA4_PROPERTY_ID: process.env.GA4_PROPERTY_ID,
        SEARCH_CONSOLE_SITE_URL: process.env.SEARCH_CONSOLE_SITE_URL,
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'Host', value: 'crm.rinconnect.org' }
                ],
            },
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: '/api/:path*',
            },
        ]
    },
}

module.exports = nextConfig