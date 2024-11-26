import { Post } from "@/types/post";
import { getIsBookmark } from "@/utils/dendaitech/Post/GET/PostGET";

export async function getBookmarkStatus(recentPosts: Post[], popularPosts: Post[]): Promise<[Map<number, boolean>, Map<number, number>]> {
    const bookmarkStatus = new Map<number, boolean>();
    const bookmarkCount = new Map<number, number>();
    for (const post of recentPosts) {
        if (bookmarkStatus.has(post.postId)) continue;
        bookmarkStatus.set(post.postId, await getIsBookmark(post.postId));
        bookmarkCount.set(post.postId, post.likesCount);
    }
    for (const post of popularPosts) {
        if (bookmarkStatus.has(post.postId)) continue;
        bookmarkStatus.set(post.postId, await getIsBookmark(post.postId));
        bookmarkCount.set(post.postId, post.likesCount);
    }
    return [bookmarkStatus, bookmarkCount];
}