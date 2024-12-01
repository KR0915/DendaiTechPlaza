"use client";

import { useState } from "react";
import PostCards from "@/components/elements/Card/PostCards/PostCards";
import { Post } from "@/types/post";

export default function BookmarkListClient({
    initialBookmarks,
    initialBookmarkStatus,
}: {
    initialBookmarks: Post[];
    initialBookmarkStatus: [Map<number, boolean>, Map<number, number>];
}) {
    // const [bookmarks, setBookmarks] = useState(initialBookmarks);
    // const [bookmarkStatus, setBookmarkStatus] = useState(initialBookmarkStatus[0]);
    // const [bookmarkCount, setBookmarkCount] = useState(initialBookmarkStatus[1]);
    
    // ESLint避け
    const [bookmarks] = useState(initialBookmarks);
    const [bookmarkStatus] = useState(initialBookmarkStatus[0]);
    const [bookmarkCount] = useState(initialBookmarkStatus[1]);

    const handleOnClickBookmarkButton = async (postId: number, type: string) => {
        // ESLint避け
        console.log(postId, type);
    };

    return <PostCards posts={bookmarks} bookmarkStatus={bookmarkStatus} bookmarkCount={bookmarkCount} OnClickBookmarkButton={handleOnClickBookmarkButton} />;
}
