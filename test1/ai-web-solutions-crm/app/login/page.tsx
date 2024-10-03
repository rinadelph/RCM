import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const DynamicLoginForm = dynamic(() => import('@/components/LoginForm'), {
    ssr: false,
})

export const runtime = 'edge'

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <DynamicLoginForm />
                </Suspense>
            </div>
        </div>
    )
}