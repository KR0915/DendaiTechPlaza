import { authOptions } from "@/lib/auth";
import { PostResponse } from "@/types/post";
import {
  getIsBookmark,
  getPopularPosts,
  getRecentPosts,
} from "@/utils/dendaitech/Post/GET/PostGET";
import { getServerSession } from "next-auth";
import TopClientComponent from "./topPage/components/topClient";

export default async function Home() {
  const recentPosts: PostResponse = await getRecentPosts(0, 20);
  const popularPosts: PostResponse = await getPopularPosts(0, 20);
  const bookmarkStatus = new Map<number, boolean>();
  const session = await getServerSession(authOptions);
  if (!session) {
    for (const post of recentPosts.content) {
      if (bookmarkStatus.has(post.postId)) continue;
      bookmarkStatus.set(post.postId, false);
    }
    for (const post of popularPosts.content) {
      if (bookmarkStatus.has(post.postId)) continue;
      bookmarkStatus.set(post.postId, false);
    }
  } else {
    for (const post of recentPosts.content) {
      if (bookmarkStatus.has(post.postId)) continue;
      bookmarkStatus.set(post.postId, await getIsBookmark(post.postId));
    }
    for (const post of popularPosts.content) {
      if (bookmarkStatus.has(post.postId)) continue;
      bookmarkStatus.set(post.postId, await getIsBookmark(post.postId));
    }
  }



  return (
    <div className="bg-slate-200">
      <div className="space-y-2 p-8 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold mb-6">最近の投稿</h1>
          <TopClientComponent fetchedPosts={recentPosts} bookmarkStatus={bookmarkStatus} />
        </div>
        <div>
          <h1 className="mt-16 text-2xl font-bold mb-6">人気の投稿</h1>
          <TopClientComponent fetchedPosts={popularPosts} bookmarkStatus={bookmarkStatus} />
        </div>
      </div>
    </div>
  );
}
