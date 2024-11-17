'use server';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// APIへのURLを宣言
const baseApiUrl: string = `${process.env.SPRING_REST_API_URL}`;

/**
 * 現在のユーザーが管理者かどうかを確認する
 * 
 * @param callbackUrl - コールバックURL（オプション）
 * @returns ユーザーが管理者の場合はtrue、そうでない場合はfalse
 * @throws {Error} セッションが存在しない場合（ログインページにリダイレクト）
 * 
 * @example
 * // 管理者の場合
 * const isAdmin = await getIsAdmin();
 * console.log(isAdmin); // true
 * 
 * @example
 * // 管理者でない場合
 * const isAdmin = await getIsAdmin();
 * console.log(isAdmin); // false
 * 
 * @example
 * // セッションがない場合（この例ではエラーがスローされる代わりにリダイレクトが発生）
 * try {
 *   const isAdmin = await getIsAdmin('/dashboard');
 * } catch (error) {
 *   console.error(error); // リダイレクトが発生するため、このコードは実行されない
 * }
 */
export async function getIsAdmin(callbackUrl?: string): Promise<boolean> {
    const session = await getServerSession(authOptions);
    if (!session) {
        const loginUrl = new URL(`${process.env.NEXT_PUBLIC_URL}/signin`);
        if (callbackUrl) {
            loginUrl.searchParams.append('callbackUrl', callbackUrl)
        }
        redirect(loginUrl.href);
    }
    try {
        const res = await fetch(`${baseApiUrl}/auth/isAdmin`, {
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
        console.error('管理者チェックに失敗しました:', error);
        return false;
    }
}