'use client';
import PostCards from "@/components/elements/Card/PostCards/PostCards";
import { PostResponse } from "@/types/post";
import { getPopularPosts, getRecentPosts } from "@/utils/dendaitech/Post/GET/PostGET";
import { useEffect, useState } from "react";
import { getBookmarkStatus } from "../utils/getTopBookmarkStatus";

export default function TopClientComponent() {
    const [bookmarkStatus, setBookmarkStatus] = useState<Map<number, boolean>>();
    const [bookmarkCount, setBookmarkCount] = useState<Map<number, number>>();
    useEffect(() => {
        const TopData = async function name() {
            try {
                const recentPosts: PostResponse = await getRecentPosts(0, 20);
                const popularPosts: PostResponse = await getPopularPosts(0, 20);
                const getTopInfo = await getBookmarkStatus(recentPosts, popularPosts);
                setBookmarkStatus(getTopInfo[0]);
                setBookmarkCount(getTopInfo[1]);
            } catch (error) {
                console.error(error);
            }
        }
        TopData();
    }, []);


    const handleOnClickBookmarkButton = (postId:number, type:string) =>{
        if (type === "add" && bookmarkStatus && bookmarkCount) {
            bookmarkStatus.set(postId, true);
            const n =  bookmarkCount.get(postId);
            if (typeof n === "number") {
                bookmarkCount.set(postId, n+1)
            }
        }
    }
    


    return (
        <PostCards posts={fetchedPosts.content} bookmarkStatus={bookmarkStatus} />
    );

}