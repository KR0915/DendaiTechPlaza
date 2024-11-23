'use client'

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { OgObject } from '@/types/ogp'
import { useEffect, useState } from "react"
import { getOgp } from "../utils/getOgp"
import OgpMobile from "./ogpMobile"

interface OgpCarouselProps {
    urls: string[]
}

export default function OgpCarousel({ urls }: OgpCarouselProps) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)
    const [ogpData, setOgpData] = useState<Record<string, OgObject>>({})

    useEffect(() => {
        const fetchOgpData = async () => {
            const data: Record<string, OgObject> = {}
            for (const url of urls) {
                data[url] = await getOgp(url)
            }
            setOgpData(data)
        }

        fetchOgpData()
    }, [urls])

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
        <div className="mx-auto max-w-xs">
            <Carousel setApi={setApi} className="w-full max-w-xs"
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

