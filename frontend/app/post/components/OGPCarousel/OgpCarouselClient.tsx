'use client'

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { OgObject } from '@/types/ogp'
import { useEffect, useState } from "react"
import OgpMobile from "./ogpMobile"

interface OgpCarouselClientProps {
    urls: string[]
    ogpData: Record<string, OgObject>
}

export default function OgpCarouselClient({ urls, ogpData }: OgpCarouselClientProps) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div className="mx-auto">
            <Carousel setApi={setApi} className="w-full"
                opts={{
                    loop: true,
                }}
            >
                <CarouselContent>
                    {urls.map((url) => (
                        <CarouselItem key={url}>
                            <div className="h-full">
                                {ogpData[url] && <OgpMobile url={url} ogData={ogpData[url]} />}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground">
                {current}/{count}
            </div>
        </div>
    )
}

