'use client'

import { useState, useEffect, useCallback, ReactNode } from 'react'

export type ToastType = 'default' | 'destructive'
export interface Toast {
    id: string
    title?: string
    description: string
    variant: ToastType
    duration?: number
    action?: ReactNode
}

export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([])

    const toast = useCallback((props: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9)
        setToasts((prevToasts) => [...prevToasts, { ...props, id }])
    }, [])

    const removeToast = useCallback((id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, [])

    useEffect(() => {
        const timers = toasts.map((toast) => {
            if (toast.duration) {
                return setTimeout(() => removeToast(toast.id), toast.duration)
            }
        })

        return () => timers.forEach((timer) => timer && clearTimeout(timer))
    }, [toasts, removeToast])

    return { toasts, toast, removeToast }
}