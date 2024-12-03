'use server';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

// APIへのURLを宣言
const baseApiUrl: string = `${process.env.SPRING_REST_API_URL}`;

/**
 * 指定された投稿IDのリストに対して、ユーザーがブックマークしているかどうかを確認する
 * 
 * @param postIds - 確認したい投稿IDの配列
 * @returns ブックマーク状態の真偽値配列、またはエラーオブジェクト
 * 
 * @example
 * // ブックマーク状態の確認成功例
 * const result = await checkUserBookmarks([1, 2, 3, 4, 5]);
 * if (Array.isArray(result)) {
 *   console.log('ブックマーク状態:', result);
 *   // 出力例: [true, false, true, false, true]
 * } else {
 *   console.error('エラー:', result.message);
 * }
 * 
 * @example
 * // セッションがない場合の例
 * const result = await checkUserBookmarks([1, 2, 3]);
 * console.log(result); // [false, false, false]
 * 
 * @example
 * // エラーの例
 * const result = await checkUserBookmarks([1, 2, 3]);
 * if (result instanceof Error) {
 *   console.error('ブックマーク状態の確認に失敗:', result.message);
 * }
 */
export async function checkUserBookmarks(postIds: number[]): Promise<boolean[] | Error> {
    const session = await getServerSession(authOptions);
    if (!session) {
        // セッションがない場合、全ての投稿IDに対してfalseを返す
        return postIds.map(() => false);
    }

    try {
        const res = await fetch(`${baseApiUrl}/user/bookmarkswithPostNumber`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postIds })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: boolean[] = await res.json();
        return data;
    } catch (error) {
        return new Error(`ブックマーク状態の確認に失敗しました: ${error}`);
    }
}