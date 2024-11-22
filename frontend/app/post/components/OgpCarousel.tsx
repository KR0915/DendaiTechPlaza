import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Ogp from "./ogp";

interface OgpsProps {
    urls: string[]
}

export default function OgpCarousel({ urls }: OgpsProps) {

    return (
        <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
                {urls.map(url => (
                    <CarouselItem key={url} className="md:basis-1/2">
                        <div className="h-full">
                            <Ogp url={url} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="pl-2">
                <CarouselPrevious />
            </div>
            <div className="pr-2">
                <CarouselNext />
            </div>
        </Carousel>
    );
}