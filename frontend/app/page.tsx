'use client';
import { Post, PostResponse } from "@/types/post";
import { getPopularPosts, getRecentPosts } from "@/utils/dendaitech/Post/GET/PostGET";
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
        setRecentPosts(fetchedPosts.content);
        setIsLoading(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
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
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        setIsLoading(false);
      }
    }

    fetchRecentPosts();
    fetchPopularPosts();
  }, [])



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>

      <div>
        <h1>最近の投稿</h1>
        {recentPosts.map(post => (
          <div key={post.postId} className="post">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>年度: {post.year}</p>
            <p>学科: {post.departmentName}</p>
            <p>学年: {post.grade}</p>
            <p>学期: {post.semester}</p>
            <p>いいね数: {post.likesCount}</p>
            <p>投稿者: {post.username}</p>
            <p>投稿日: {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <h1>人気の投稿</h1>
        {popularPosts.map(post => (
          <div key={post.postId} className="post">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>年度: {post.year}</p>
            <p>学科: {post.departmentName}</p>
            <p>学年: {post.grade}</p>
            <p>学期: {post.semester}</p>
            <p>いいね数: {post.likesCount}</p>
            <p>投稿者: {post.username}</p>
            <p>投稿日: {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

    </>

  );
}
