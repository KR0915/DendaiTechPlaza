"use client";

import PostCards from "@/components/elements/Card/PostCards/PostCards";
import { Post } from "@/types/post";

export default function BookmarkListClient({
    initialBookmarks,
}: {
    initialBookmarks: Post[];
}) {
    // const [bookmarks, setBookmarks] = useState(initialBookmarks);
    // const [bookmarkStatus, setBookmarkStatus] = useState(initialBookmarkStatus[0]);
    // const [bookmarkCount, setBookmarkCount] = useState(initialBookmarkStatus[1]);
    
    // ESLint避け

    return <PostCards posts={initialBookmarks}/>;
}
