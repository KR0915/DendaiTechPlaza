"use server";
import type { OgObject } from '@/types/ogp';
import ogs from "open-graph-scraper";


export async function getOgp(url: string): Promise<OgObject> {
    try {
        const { result } = await ogs({ url });
        return result;
    } catch (error) {
        console.error("Error fetching OGP:", error);
        throw error;
    }
}

