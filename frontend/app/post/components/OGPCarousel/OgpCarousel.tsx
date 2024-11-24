import { Suspense } from "react"
import { OgpMobileSkeleton } from "../skelton-fallback"
import OgpCarouselServer from "./OgpCarouselServer"

interface OgpCarouselProps {
    urls: string[]
}

export default function OgpCarousel({ urls }: OgpCarouselProps) {
    return (
        <Suspense fallback={<OgpMobileSkeleton />}>
            <OgpCarouselServer urls={urls} />
        </Suspense>
    )
}