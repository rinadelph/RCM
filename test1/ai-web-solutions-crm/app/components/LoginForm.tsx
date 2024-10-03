'use client'

import { signIn, useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LoginForm() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/settings')
        }
    }, [status, router])

    const handleGoogleSignIn = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const result = await signIn('google', { callbackUrl: '/settings', redirect: false })
            if (result?.error) {
                setError(result.error)
            } else if (result?.url) {
                router.push(result.url)
            }
        } catch (error) {
            console.error('Sign in error:', error)
            setError('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    return (
        <div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Button
                onClick={handleGoogleSignIn}
                className="w-full"
                disabled={isLoading}
            >
                {isLoading ? 'Signing in...' : 'Sign in with Google'}
            </Button>
        </div>
    )
}