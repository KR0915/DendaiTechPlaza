'use server';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// APIへのURLを宣言
const baseApiUrl: string = `${process.env.SPRING_REST_API_URL}`;

/**
 * 投稿のブックマークを削除する
 *
 * @param postId - 削除したいブックマークがある投稿ID
 * @returns ブックマークが削除できたらtrue できなかったらfalse
 * @throws {Error} ブックマークの削除に失敗した場合
 * 
 * @example
 * // ブックマークの削除成功例
 * const result = await deleteBookmark(123);
 * console.log(result); // true
 * 
 * @example
 * // ブックマークの削除失敗例（エラーがスローされる）
 * try {
 *   await deleteBookmark(456);
 * } catch (error) {
 *   console.error(error.message); // "ブックマークの削除に失敗しました。"
 * }
 */
export async function deleteBookmark(postId: number): Promise<boolean | Error> {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            const loginUrl = `${process.env.NEXT_PUBLIC_URL}/signin/?callbackUrl=${process.env.NEXT_PUBLIC_URL}/post/${postId}`
            redirect(loginUrl);
        }
        const res = await fetch(`${baseApiUrl}/posts/${postId}/bookmark`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            return new Error('ブックマークの削除に失敗しました。');
        }
        return res.ok;
    } catch (error) {
        return new Error(`ブックマークの削除に失敗しました。:\n${error}`)
    }
}


/**
 * 投稿を削除する
 *
 * @param postId - 削除したい投稿のID
 * @param callbackUrl - コールバックURL（オプション）
 * @returns 投稿が削除できたらtrue できなかったらfalse
 * @throws {Error} 投稿の削除に失敗した場合
 * 
 * @example
 * // 投稿の削除成功例
 * const result = await deletPost(789);
 * console.log(result); // true
 * 
 * @example
 * // 投稿の削除失敗例（エラーがスローされる）
 * try {
 *   await deletPost(101112, '/dashboard');
 * } catch (error) {
 *   console.error(error.message); // "投稿の削除に失敗しました。"
 * }
 */
export async function deletPost(postId: number, callbackUrl?: string): Promise<boolean | Error> {
    const session = await getServerSession(authOptions);
    if (!session) {
        const loginUrl = new URL(`${process.env.NEXT_PUBLIC_URL}/signin`);
        if (callbackUrl) {
            loginUrl.searchParams.append('callbackUrl', callbackUrl)
        }
        redirect(loginUrl.href);
    }
    const res = await fetch(`${baseApiUrl}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('投稿の削除に失敗しました。');
    }
    return res.ok;
}



/**
 * 返信を削除する
 *
 * @param replyId - 削除したい返信のID
 * @param callbackUrl - コールバックURL（オプション）
 * @returns 返信が削除できたらtrue できなかったらfalse
 * @throws {Error} 返信の削除に失敗した場合
 * 
 * @example
 * // 返信の削除成功例
 * const result = await deletReply(456);
 * console.log(result); // true
 * 
 * @example
 * // 返信の削除失敗例（エラーがスローされる）
 * try {
 *   await deletReply(789, '/post/123#comment-456');
 * } catch (error) {
 *   console.error(error.message); // "返信の削除に失敗しました。"
 * }
 */
export async function deletReply(replyId: number, callbackUrl?: string): Promise<boolean | Error> {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            const loginUrl = new URL(`${process.env.NEXT_PUBLIC_URL}/signin`);
            if (callbackUrl) {
                loginUrl.searchParams.append('callbackUrl', callbackUrl)
            }
            redirect(loginUrl.href);
        }
        const res = await fetch(`${baseApiUrl}/posts/replies/${replyId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            return new Error('返信の削除に失敗しました。');
        }
        return res.ok;
    } catch (error) {
        return new Error(`返信の削除に失敗しました。\n${error}`);
    }
}


/**
 * コメントを削除する
 *
 * @param commentId - 削除したいコメントのID
 * @param callbackUrl - コールバックURL（オプション）
 * @returns コメントが削除できたらtrue できなかったらfalse
 * @throws {Error} コメントの削除に失敗した場合
 * 
 * @example
 * // コメントの削除成功例
 * const result = await deletComment(123);
 * console.log(result); // true
 * 
 * @example
 * // コメントの削除失敗例（エラーがスローされる）
 * try {
 *   await deletComment(456, '/post/789');
 * } catch (error) {
 *   console.error(error.message); // "コメントの削除に失敗しました。"
 * }
 */
export async function deletComment(commentId: number, callbackUrl?: string): Promise<boolean> {
    const session = await getServerSession(authOptions);
    if (!session) {
        const loginUrl = new URL(`${process.env.NEXT_PUBLIC_URL}/signin`);
        if (callbackUrl) {
            loginUrl.searchParams.append('callbackUrl', callbackUrl)
        }
        redirect(loginUrl.href);
    }
    const res = await fetch(`${baseApiUrl}/posts/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('コメントの削除に失敗しました。');
    }
    return res.ok;
}