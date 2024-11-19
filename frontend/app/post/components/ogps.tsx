import Ogp from "./ogp"

interface ogp {
  urls: string[]
}

export default async function Ogps({ urls }: ogp) {
  return (
    <div className="bg-white rounded-lg overflow-hidden grid grid-cols-2 gap-2">
      {urls.map(url => (
        <div key={url} className="h-full">
          <Ogp url={url} />
        </div>
      ))}
    </div>
  )
}