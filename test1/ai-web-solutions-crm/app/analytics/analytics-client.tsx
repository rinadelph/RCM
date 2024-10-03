'use client'

import { useSession } from "next-auth/react"
import { Loader2 } from "lucide-react"
import AnalyticsPage from "./analytics-page"

export default function AnalyticsClient() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (!session) {
        return <div>Please sign in to view analytics</div>
    }

    return <AnalyticsPage session={session} />
}