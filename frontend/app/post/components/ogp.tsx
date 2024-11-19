import Image from "next/image"
import Link from "next/link"
import { getOgp } from "../utils/getOgp"

interface OgpProps {
    url: string
}

export default async function Ogp({ url }: OgpProps) {
    const ogp = await getOgp(url)

    return (
        <Link href={url} className="block h-full">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-full transition-shadow hover:shadow-md">
                {ogp?.ogImage?.[0]?.url && (
                    <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                            src={ogp.ogImage[0].url}
                            alt={ogp.ogImage[0].alt ?? "OGP Image"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                )}
                <div className="p-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                        {ogp?.ogTitle ?? "No Title"}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                        {ogp?.ogDescription}
                    </p>
                </div>
            </div>
        </Link>
    )
}