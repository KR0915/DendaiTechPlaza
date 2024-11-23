"use server";
import type { OgObject } from '@/types/ogp';
import { getOgp } from "./getOgp";

export async function getOgps(urls: string[]): Promise<OgObject[]> {
    try {
        const results = await Promise.all(urls.map(url => getOgp(url)));
        return results;
    } catch (error) {
        console.error("Error fetching OGP:", error);
        throw error;
    }
}