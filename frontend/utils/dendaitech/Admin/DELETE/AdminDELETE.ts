'use server';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// APIへのURLを宣言
const baseApiUrl: string = `${process.env.SPRING_REST_API_URL}`;

/**
 * 管理者権限でユーザーを削除する関数
 * @param userId 削除対象のユーザーID
 * @param callbackUrl 削除後のリダイレクト先URL（オプション）
 * @returns 削除成功時はtrue、失敗時はErrorオブジェクト
 * @throws Error セッションが存在しない場合、ログインページにリダイレクト
 * 
 * @example
 * try {
 *   const result = await deleteUserByAdmin(123);
 *   if (result === true) {
 *     console.log('ユーザーが正常に削除されました');
 *   } else {
 *     console.error(result.message);
 *   }
 * } catch (error) {
 *   console.error('エラーが発生しました:', error);
 * }
 */
export async function deleteUserByAdmin(userId: number, callbackUrl?: string): Promise<boolean | Error> {
    const session = await getServerSession(authOptions);
    if (!session) {
        const loginUrl = new URL(`${process.env.NEXT_PUBLIC_URL}/signin`);
        if (callbackUrl) {
            loginUrl.searchParams.append('callbackUrl', callbackUrl)
        }
        redirect(loginUrl.href);
    }

    try {
        const res = await fetch(`${baseApiUrl}/admin/users/${userId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            },
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        // TODO ユーザー削除に伴うアイコン削除処理
        return res.ok;
    } catch (error) {
        return new Error(`ユーザーの削除に失敗しました:\n${error}`);
    }
}

/**
 * 管理者権限で投稿を削除する関数
 * @param postId 削除対象の投稿ID
 * @param callbackUrl 削除後のリダイレクト先URL（オプション）
 * @returns 削除成功時はtrue、失敗時はErrorオブジェクト
 * @throws Error セッションが存在しない場合、ログインページにリダイレクト
 * 
 * @example
 * try {
 *   const result = await deletePostByAdmin(456);
 *   if (result === true) {
 *     console.log('投稿が正常に削除されました');
 *   } else {
 *     console.error(result.message);
 *   }
 * } catch (error) {
 *   console.error('エラーが発生しました:', error);
 * }
 */
export async function deletePostByAdmin(postId: number, callbackUrl?: string): Promise<boolean | Error> {
    const session = await getServerSession(authOptions);
    if (!session) {
        const loginUrl = new URL(`${process.env.NEXT_PUBLIC_URL}/signin`);
        if (callbackUrl) {
            loginUrl.searchParams.append('callbackUrl', callbackUrl)
        }
        redirect(loginUrl.href);
    }
    try {
        const res = await fetch(`${baseApiUrl}/admin/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            },
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.ok;
    } catch (error) {
        return new Error(`投稿の削除に失敗しました:\n${error}`);
    }
}
