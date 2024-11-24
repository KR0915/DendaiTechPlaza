import type { SuccessResult } from 'open-graph-scraper/dist/lib/types';

export type { OgObject } from 'open-graph-scraper/dist/lib/types';

export interface ExtendedOgObject extends OgObject {
}

interface OGImage {
    height: string;
    type: string;
    url: string;
    width: string;
}

interface OGResponse extends SuccessResult {
}

export type { OGImage, OGResponse };

