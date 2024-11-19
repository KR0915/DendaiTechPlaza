import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { getOgp } from "../utils/getOgp"

interface ogp {
  url: string
}

export default async function Ogp({ url }: ogp) {
  const ogp = await getOgp(url)
  
  return (
    <Link href={url} className="block h-full" target="_blank" rel="noopener noreferrer">
      <Card className="h-full shadow-none">
        <CardHeader>
          {ogp?.ogImage?.[0]?.url && (
            <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
              <Image
                src={ogp.ogImage[0].url}
                alt={ogp.ogImage[0].alt ?? "OGP Image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <CardTitle className="line-clamp-2">{ogp?.ogTitle ?? "No Title"}</CardTitle>
          <CardDescription className="line-clamp-3">{ogp?.ogDescription}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}