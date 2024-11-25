import TopClientComponent from "./topPage/components/topClient";

export default async function Home() {
  return (
    <div className="bg-slate-200">
      <div className="space-y-2 p-8 max-w-4xl mx-auto">
        <TopClientComponent />
        {/* <div>
          <h1 className="text-2xl font-bold mb-6">最近の投稿</h1>
          <TopClientComponent fetchedPosts={recentPosts} bookmarkStatus={bookmarkStatus} />
        </div>
        <div>
          <h1 className="mt-16 text-2xl font-bold mb-6">人気の投稿</h1>
          <TopClientComponent fetchedPosts={popularPosts} bookmarkStatus={bookmarkStatus} />
        </div> */}
      </div>
    </div>
  );
}
