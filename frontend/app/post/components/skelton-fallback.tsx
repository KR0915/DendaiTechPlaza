"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function OgpSkeleton() {
    return (
        <div className="rounded-lg p-4 max-w-screen-sm md:max-w-screen-md">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-36 w-48" />
                    <Skeleton className="h-8 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-36 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-36 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-36 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            </div>
        </div>
    )
}

export function CommentsSkeleton() {
    return (
        <div className="p-8">
            <Skeleton className="h-6 w-1/3 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    )
}

