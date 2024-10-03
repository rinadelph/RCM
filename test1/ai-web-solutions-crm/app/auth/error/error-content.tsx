'use client'

import { useSearchParams } from 'next/navigation'

export default function ErrorContent() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    return (
        <p className="text-center text-red-500">{error || 'An unknown error occurred'}</p>
    )
}