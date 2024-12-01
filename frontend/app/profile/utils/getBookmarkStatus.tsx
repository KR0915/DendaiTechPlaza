import { Post } from "@/types/post";
import { getIsBookmark } from "@/utils/dendaitech/Post/GET/PostGET";

export async function getBookmarkStatus(posts: Post[]): Promise<[Map<number, boolean>, Map<number, number>]> {
    const bookmarkStatus = new Map<number, boolean>();
    const bookmarkCount = new Map<number, number>();
    for (const post of posts) {
        if (bookmarkStatus.has(post.postId)) continue;
        bookmarkStatus.set(post.postId, await getIsBookmark(post.postId));
        bookmarkCount.set(post.postId, post.likesCount);
    }
    return [bookmarkStatus, bookmarkCount];
}
