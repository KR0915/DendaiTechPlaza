'use client';
import PostCards from "@/components/elements/Card/PostCards/PostCards";
import { Post } from "@/types/post";
import { getPopularPosts, getRecentPosts } from "@/utils/dendaitech/Post/GET/PostGET";
import { useCallback, useEffect, useState } from "react";
import { getBookmarkStatus } from "../utils/getTopBookmarkStatus";

export default function TopClientComponent() {
    const [bookmarkStatus, setBookmarkStatus] = useState<Map<number, boolean>>(new Map());
    const [bookmarkCount, setBookmarkCount] = useState<Map<number, number>>(new Map());
    const [recentPosts, setRecentPosts] = useState<Post[]>([]);
    const [popularPosts, setPopularPosts] = useState<Post[]>([]);

    const fetchTopData = useCallback(async () => {
        try {
            const [recentPostsData, popularPostsData] = await Promise.all([
                getRecentPosts(0, 20),
                getPopularPosts(0, 20)
            ]);

            setRecentPosts(recentPostsData.content);
            setPopularPosts(popularPostsData.content);

            const [newBookmarkStatus, newBookmarkCount] = await getBookmarkStatus(recentPostsData.content, popularPostsData.content);
            setBookmarkStatus(newBookmarkStatus);
            setBookmarkCount(newBookmarkCount);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchTopData();
    }, [fetchTopData]);

    const handleOnClickBookmarkButton = useCallback((postId: number, type: string) => {
        setBookmarkStatus(prevStatus => {
            const newStatus = new Map(prevStatus);
            newStatus.set(postId, type === "add");
            return newStatus;
        });

        setBookmarkCount(prevCount => {
            const newCount = new Map(prevCount);
            const currentCount = newCount.get(postId) || 0;
            newCount.set(postId, type === "add" ? currentCount + 1 : currentCount - 1);
            return newCount;
        });
    }, []);

    return (
        <>
            <div>
                <h1 className="text-2xl font-bold mb-6">最近の投稿</h1>
                {recentPosts.length > 0 && (
                    <PostCards
                        posts={recentPosts}
                        bookmarkStatus={bookmarkStatus}
                        bookmarkCount={bookmarkCount}
                        OnClickBookmarkButton={handleOnClickBookmarkButton}
                    />
                )}
            </div>
            <div>
                <h1 className="mt-16 text-2xl font-bold mb-6">人気の投稿</h1>
                {popularPosts.length > 0 && (
                    <PostCards
                        posts={popularPosts}
                        bookmarkStatus={bookmarkStatus}
                        bookmarkCount={bookmarkCount}
                        OnClickBookmarkButton={handleOnClickBookmarkButton}
                    />
                )}
            </div>
        </>
    );
}

