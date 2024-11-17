'use server';

import { DendaiUserPaginatedResponse } from "@/types/user";
import { z } from "zod";

// APIへのURLを宣言
const baseApiUrl: string = `${process.env.SPRING_REST_API_URL}`;

/**
 * ユーザーを検索する関数
 * @param query 検索クエリ（オプション）
 * @param page ページ番号（デフォルト: 0）
 * @param size 1ページあたりの結果数（デフォルト: 10）
 * @returns ユーザーの検索結果（ページネーション付き）またはエラー
 * 
 * @example
 * try {
 *   const result = await getSearchUser('John', 0, 20);
 *   if (result instanceof Error) {
 *     console.error(result.message);
 *   } else {
 *     console.log('検索結果:', result);
 *   }
 * } catch (error) {
 *   console.error('エラーが発生しました:', error);
 * }
 */
export async function getSearchUser(query?: string, page = 0, size = 10): Promise<DendaiUserPaginatedResponse | Error> {
    const targetUrl = new URL(`${baseApiUrl}/admin/users/search`);
    targetUrl.searchParams.append('page', page.toString());
    targetUrl.searchParams.append('size', size.toString());
    try {
        if (query) {
            const verification = z.string().max(50, '検索文字列は50文字以内でお願いします').safeParse(query);
            if (!verification.success) {
                return new Error(verification.error.errors[0].message);
            }
            targetUrl.searchParams.append('query', query);
        }
        const res = await fetch(targetUrl, { method: 'GET' });
        if (!res.ok) {
            return new Error('ユーザーの検索に失敗しました。');
        }
        return res.json();
    } catch (error) {
        return new Error(`ユーザーの検索に失敗しました。\n${error}`);
    }
}
