import { Post } from "@/types/post";
import { checkUserBookmarks } from "@/utils/dendaitech/User/POST/UserPOST";

export async function getBookmarkStatus(recentPosts: Post[], popularPosts: Post[]): Promise<[Map<number, boolean>, Map<number, number>]> {
    const bookmarkStatus = new Map<number, boolean>();
    const bookmarkCount = new Map<number, number>();
    
    const recentPostIds: number[] = recentPosts.map(post => post.postId);
    const popularPostIds: number[] = popularPosts.map(post => post.postId);
    const combinedUniquePostIds: number[] = Array.from(new Set([...recentPostIds, ...popularPostIds]));

    try {
        const result = await checkUserBookmarks(combinedUniquePostIds);
        
        if (Array.isArray(result)) {
            combinedUniquePostIds.forEach((postId, index) => {
                bookmarkStatus.set(postId, result[index]);
            });

            [...recentPosts, ...popularPosts].forEach(post => {
                if (!bookmarkCount.has(post.postId)) {
                    bookmarkCount.set(post.postId, post.likesCount);
                }
            });

            return [bookmarkStatus, bookmarkCount];
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('ブックマーク状態の取得に失敗しました:', error);
        throw error;
    }
}