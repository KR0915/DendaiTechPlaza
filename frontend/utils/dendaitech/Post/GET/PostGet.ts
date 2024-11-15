'use server';

import { authOptions } from "@/lib/auth";
import { Post, PostResponse } from "@/types/post";
import { getServerSession } from "next-auth";

// APIへのURLを宣言
const baseApiUrl: string = `${process.env.SPRING_REST_API_URL}`;

/**
 * 投稿をIDで取得する
 *
 * @param postId - 取得したい投稿のID
 * @param commentPage - コメントのページ番号 (デフォルト: "0")
 * @param commentSize - 1ページあたりのコメント数 (デフォルト: "10")
 * @param replyPage - 返信のページ番号 (デフォルト: "0")
 * @param replySize - 1ページあたりの返信数 (デフォルト: "10")
 * @returns 指定されたIDの投稿データ
 * @throws {Error} 投稿の取得に失敗した場合
 */
export async function getPostById(postId: string, commentPage = "0", commentSize = "10", replyPage = "0", replySize = "10"): Promise<Post> {
    const res = await fetch(`${baseApiUrl}/posts/${postId}?commentPage=${commentPage}&commentSize=${commentSize}&replyPage=${replyPage}&replySize=${replySize}`, { method: 'GET' });
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
}

/**
 * 投稿をブックマークしているかどうか取得する
 *
 * @param postId - ブックマークしているかどうか確認したい投稿のID
 * @returns ブックマークしているかどうか true or false 
 * @throws {Error} 投稿の取得に失敗した場合
 */
export async function getIsBookmark(postId: string): Promise<boolean> {
    const session = await getServerSession(authOptions);
    console.log(`${baseApiUrl}/posts/${postId}/isBookmark`);
    if (!session) {
        return false;
    }
    try {
        const res = await fetch(`${baseApiUrl}/posts/${postId}/isBookmark`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            },
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const text = await res.text();
        return text.toLowerCase() === 'true';
    } catch (error) {
        console.error('Error fetching bookmark status:', error);
        return false;
    }
}

/**
 * 人気の投稿を取得する
 * 
 * この関数は、APIから人気の投稿のリストを非同期で取得します。
 * 取得したデータはページネーション情報を含む PostResponse オブジェクトとして返されます。
 * 
 * @returns {Promise<PostResponse>} 人気の投稿データとページネーション情報を含む Promise
 * @throws {Error} 投稿の取得に失敗した場合にエラーをスローします
 */
export async function getPopularPosts(): Promise<PostResponse> {
    const res = await fetch(`${baseApiUrl}/posts/popular`, { method: 'GET' });
    if (!res.ok) {
        throw new Error('Failed to fetch popular posts');
    }
    return res.json();
}