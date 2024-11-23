import { OgObject } from "open-graph-scraper/types"
import { Suspense } from "react"
import Ogp from "./ogp"
import { OgpSkeleton } from "./skelton-fallback"

interface OgpsProps {
  urls: string[]
  ogpData: Record<string, OgObject>
}

export default function Ogps({ urls, ogpData }: OgpsProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden grid grid-cols-2 gap-4 p-4">
      {urls.map(url => (
        <div key={url} className="h-full">
          <Suspense fallback={<OgpSkeleton />}>
            <Ogp url={url} ogData={ogpData[url]} />
          </Suspense>
        </div>
      ))}
    </div>
  )
}
