import { authOptions } from "@/lib/auth";
import { PostResponse } from "@/types/post";
import { getIsBookmark } from "@/utils/dendaitech/Post/GET/PostGET";
import { getServerSession } from "next-auth";

export async function getBookmarkStatus(recentPosts:PostResponse, popularPosts:PostResponse): Promise<[Map<number, boolean>, Map<number,number>]> {
    const bookmarkStatus = new Map<number, boolean>();
    const bookmarkCount = new Map<number, number>();
    const session = await getServerSession(authOptions);
    if (!session) {
        for (const post of recentPosts.content) {
            if (bookmarkStatus.has(post.postId)) continue;
            bookmarkStatus.set(post.postId, false);
            bookmarkCount.set(post.postId, post.likesCount);
        }
        for (const post of popularPosts.content) {
            if (bookmarkStatus.has(post.postId)) continue;
            bookmarkStatus.set(post.postId, false);
            bookmarkCount.set(post.postId, post.likesCount);
        }
    } else {
        for (const post of recentPosts.content) {
            if (bookmarkStatus.has(post.postId)) continue;
            bookmarkStatus.set(post.postId, await getIsBookmark(post.postId));
            bookmarkCount.set(post.postId, post.likesCount);
        }
        for (const post of popularPosts.content) {
            if (bookmarkStatus.has(post.postId)) continue;
            bookmarkStatus.set(post.postId, await getIsBookmark(post.postId));
            bookmarkCount.set(post.postId, post.likesCount);
        }
    }
    return [bookmarkStatus, bookmarkCount];
}