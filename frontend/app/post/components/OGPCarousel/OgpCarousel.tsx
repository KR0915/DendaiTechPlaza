import { OgObject } from '@/types/ogp'
import { Suspense } from "react"
import { OgpMobileSkeleton } from "../skelton-fallback"
import OgpCarouselClient from "./OgpCarouselClient"

interface OgpCarouselProps {
    urls: string[]
    ogpData: Record<string, OgObject>
}

export default function OgpCarousel({ urls, ogpData }: OgpCarouselProps) {
    return (
        <Suspense fallback={<OgpMobileSkeleton />}>
            <OgpCarouselClient urls={urls} ogpData={ogpData} />
        </Suspense>
    )
}

