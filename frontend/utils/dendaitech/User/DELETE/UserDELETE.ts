'use server';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// APIへのURLを宣言
const baseApiUrl: string = `${process.env.SPRING_REST_API_URL}`;

/**
 * ユーザーアカウントを削除する
 * 
 * @param callbackUrl - コールバックURL（オプション）
 * @returns アカウント削除が成功した場合はtrue、失敗した場合はErrorオブジェクト
 * @throws {Error} セッションが存在しない場合（ログインページにリダイレクト）
 * 
 * @example
 * // ユーザーアカウント削除成功の例
 * const result = await deleteUser();
 * if (result === true) {
 *   console.log('ユーザーアカウントが正常に削除されました');
 * } else {
 *   console.error('アカウント削除エラー:', result.message);
 * }
 * 
 * @example
 * // ユーザーアカウント削除失敗の例
 * const result = await deleteUser('/dashboard');
 * if (result instanceof Error) {
 *   console.error('アカウント削除エラー:', result.message);
 * }
 */
export async function deleteUser(callbackUrl?:string): Promise<boolean | Error> {
    const session = await getServerSession(authOptions);
    if (!session) {
        const loginUrl = new URL(`${process.env.NEXT_PUBLIC_URL}/signin`);
        if (callbackUrl) {
            loginUrl.searchParams.append('callbackUrl', callbackUrl)
        }
        redirect(loginUrl.href);
    }

    try {
        const res = await fetch(`${baseApiUrl}/user/account`, {
            method: 'PUT',
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
