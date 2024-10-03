/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
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
}

module.exports = nextConfig