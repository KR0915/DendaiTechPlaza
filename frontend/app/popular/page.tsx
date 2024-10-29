'use client';
import { useEffect, useState } from 'react';

interface Post {
    postId: string
    title: string
    description: string
    year: string
    department: string
    grade: string
    semester: string
    likes: number
    createdAt: string
}


async function getPosts(): Promise<Post[]> {
    const res = await fetch(`http://localhost:8080/api/posts/popular`)
    if (!res.ok) {
        throw new Error('Failed to fetch users')
    }
    return res.json()
}

export default function PopularPosts() {
    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchUsers() {
            try {
                const fetchedUsers = await getPosts()
                setPosts(fetchedUsers)
                setIsLoading(false)
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
                setError(errorMessage)
                setIsLoading(false)
            }
        }

        fetchUsers()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }
    return (
        <div>
            <h2>人気の投稿</h2>
            {posts.map(post => (
                <div key={post.postId} className="post">
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <p>年度: {post.year}</p>
                    <p>学科: {post.department}</p>
                    <p>学年: {post.grade}</p>
                    <p>学期: {post.semester}</p>
                    <p>いいね数: {post.likes}</p>
                    <p>投稿日: {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}
