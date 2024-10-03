// In app/auth/error/page.tsx

export const dynamic = 'force-dynamic'
import { Suspense } from 'react'
import ErrorContent from './error-content'

export default function AuthErrorPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Authentication Error</h1>
                <Suspense fallback={<p>Loading error details...</p>}>
                    <ErrorContent />
                </Suspense>
            </div>
        </div>
    )
}