'use client';
import { Post, PostResponse } from '@/types/post';
import { useEffect, useState } from 'react';

async function getPosts(): Promise<PostResponse> {
    const res = await fetch(`http://localhost:8080/api/posts/popular`);
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
}

export default function PopularPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const fetchedPosts = await getPosts();
                setPosts(fetchedPosts.content);
                setIsLoading(false);
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
                setError(errorMessage);
                setIsLoading(false);
            }
        }

        fetchPosts();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>人気の投稿</h2>
            {posts.map(post => (
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
    );
}