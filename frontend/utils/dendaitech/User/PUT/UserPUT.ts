'use server';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// APIへのURLを宣言
const baseApiUrl: string = `${process.env.SPRING_REST_API_URL}`;

/**
 * ユーザーのパスワードを更新する
 * 
 * @param currentPassword - 現在のパスワード
 * @param newPassword - 新しいパスワード
 * @param callbackUrl - コールバックURL（オプション）
 * @returns パスワード更新が成功した場合はtrue、失敗した場合はErrorオブジェクト
 * @throws {Error} セッションが存在しない場合（ログインページにリダイレクト）
 * 
 * @example
 * // パスワード更新成功の例
 * const result = await updateUserPassword('oldPassword123', 'newSecurePass456');
 * if (result === true) {
 *   console.log('パスワードが正常に更新されました');
 * } else {
 *   console.error('パスワード更新エラー:', result.message);
 * }
 * 
 * @example
 * // パスワード更新失敗の例（現在のパスワードが間違っている場合など）
 * const result = await updateUserPassword('wrongOldPass', 'newPass123');
 * if (result instanceof Error) {
 *   console.error('パスワード更新エラー:', result.message);
 * }
 */
export async function updateUserPassword(currentPassword: string, newPassword: string, callbackUrl?: string): Promise<boolean | Error> {
    const session = await getServerSession(authOptions);
    if (!session) {
        const loginUrl = new URL(`${process.env.NEXT_PUBLIC_URL}/signin`);
        if (callbackUrl) {
            loginUrl.searchParams.append('callbackUrl', callbackUrl)
        }
        redirect(loginUrl.href);
    }

    try {
        const res = await fetch(`${baseApiUrl}/user/password`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            },
            body: JSON.stringify({
                currentPassword: currentPassword,
                newPassword: newPassword
            }),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.ok;
    } catch (error) {
        return new Error(`ユーザーのパスワードの変更に失敗しました:\n${error}`);
    }
}
