"use client";
import PostCard from "@/components/elements/Card/PostCard/PostCard";
import PostCards from "@/components/elements/Card/PostCards/PostCards";
import { Post, PostResponse } from "@/types/post";
import {
  getPopularPosts,
  getRecentPosts,
} from "@/utils/dendaitech/Post/GET/PostGET";
import { useEffect, useState } from "react";

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        const fetchedPosts: PostResponse = await getRecentPosts(0, 20);
        console.log(fetchedPosts);
        setRecentPosts(fetchedPosts.content);
        setIsLoading(false);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        setIsLoading(false);
      }
    }

    async function fetchPopularPosts() {
      try {
        const fetchedPosts: PostResponse = await getPopularPosts(0, 20);
        setPopularPosts(fetchedPosts.content);
        setIsLoading(false);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        setIsLoading(false);
      }
    }

    fetchRecentPosts();
    fetchPopularPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="bg-slate-200">
      <div className="space-y-2 p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">最近の投稿</h1>
        <div>
          {recentPosts.map(post => (
            <div key={post.postId}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
        <div>
          <h1 className="mt-16 text-2xl font-bold mb-6">人気の投稿</h1>
          <PostCards posts={popularPosts} />
        </div>
      </div>
    </div>
  );
}
