import type { NextConfig } from 'next'

const authMiddleware = (): string => {
    const isAuth = false

    if (!isAuth) return '/welcome'
    return '/dashboard'
}

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: authMiddleware(),
                permanent: false,
            },
        ]
    },
}

export default nextConfig
