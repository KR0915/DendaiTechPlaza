import { OgObject } from '@/types/ogp';
import { getOgp } from "../..//utils/getOgp";
import OgpCarouselClient from "./OgpCarouselClient";

interface OgpCarouselServerProps {
    urls: string[]
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));


export default async function OgpCarouselServer({ urls }: OgpCarouselServerProps) {
    const ogpData: Record<string, OgObject> = {}
    for (const url of urls) {
        ogpData[url] = await getOgp(url);
        await sleep(1000);
        
    }

    return <OgpCarouselClient urls={urls} ogpData={ogpData} />
}

