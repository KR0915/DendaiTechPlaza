import Ogp from "./ogp"

interface OgpsProps {
  urls: string[]
}

export default function Ogps({ urls }: OgpsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      {urls.map(url => (
        <div key={url} className="h-full">
          <Ogp url={url} />
        </div>
      ))}
    </div>
  )
}