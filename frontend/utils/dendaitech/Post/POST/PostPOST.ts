'use server';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

// APIへのURLを宣言
const baseApiUrl: string = `${process.env.SPRING_REST_API_URL}`;

/**
 * 投稿を追加する
 *
 * @param title - 投稿のタイトル
 * @param description - 投稿の説明
 * @param year - 学年度
 * @param grade - 学年
 * @param department - 学科
 * @param semester - 学期
 * @param sharedUrls - 共有URL配列
 * @param callbackUrl - コールバックURL（オプション）
 * @returns 投稿が成功したらtrue、バリデーションエラーがある場合はエラーメッセージ
 * @throws {Error} 投稿の追加に失敗した場合
 * 
 *  * @example
 * // 成功例
 * const result = await addPost(
 *   "プログラミング入門の講義ノート",
 *   "この講義ノートには、Javaプログラミングの基礎が含まれています。",
 *   2023,
 *   1,
 *   "ES",
 *   "前期",
 *   ["https://example.com/notes1", "https://example.com/notes2"],
 *   "/dashboard"
 * );
 * console.log(result); // true
 *
 * @example
 * // バリデーションエラーの例
 * const result = await addPost(
 *   "短い",
 *   "短い説明",
 *   2025,
 *   5,
 *   "XX",
 *   "夏期",
 *   ["invalid-url"],
 *   "/dashboard"
 * );
 * console.log(result); // "タイトルは5文字以上必要です"
 */
export async function addPost(title: string, description: string, year: number, grade: number, department: string, semester: string, sharedUrls: string[], callbackUrl?: string): Promise<boolean | string> {
    const session = await getServerSession(authOptions);
    if (!session) {
        const loginUrl = new URL(`${process.env.NEXT_PUBLIC_URL}/signin`);
        if (callbackUrl) {
            loginUrl.searchParams.append('callbackUrl', callbackUrl)
        }
        redirect(loginUrl.href);
    }

    const postSchema = z.object({
        title: z.string().min(5, "タイトルは5文字以上必要です").max(100, "タイトルは100文字までです。"),
        description: z.string().min(5, "説明は5文字以上必要です").max(1000, "説明は1000文字までです。"),
        year: z.number().min(1800, "yearの値は1800以上でお願いします。").max(new Date().getFullYear(), `yearの値は${new Date().getFullYear()}以下でお願いします。`),
        grade: z.number().min(1, "gradeの値は1以上でお願いします。").max(4, "gradeの値は4以下でお願いします。"),
        department: z.enum(['AD', 'AJ', 'EK', 'EF', 'ES', 'EC', 'EJ', 'EH', 'FI', 'FA', 'FR', 'NC', 'NM', 'NE', 'RB', 'RE', 'RD', 'RU', 'RM', 'RG'], {
            errorMap: () => ({ message: "指定された学科は東京電機大学に存在しません" })
        }),
        semester: z.enum(['前期', '後期', 'その他'], {
            errorMap: () => ({ message: "指定された学期は不適切です" })
        }),
        sharedUrls: z.array(z.string().url().max(2000)).max(4, "URLは最大4つまでです"),
    });

    try {
        // すべてのデータを一度にバリデーション
        const validatedData = postSchema.parse({
            title,
            description,
            year,
            grade,
            department,
            semester,
            sharedUrls
        });

        const res = await fetch(`${baseApiUrl}/posts`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: validatedData.title,
                description: validatedData.description,
                academicYear: validatedData.year,
                department: validatedData.department,
                grade: validatedData.grade,
                relatedPeriod: validatedData.semester,
                sharedUrls: validatedData.sharedUrls
            }),
        });

        if (!res.ok) {
            throw new Error('投稿の追加に失敗しました。');
        }

        return true;
    } catch (error) {
        if (error instanceof z.ZodError) {
            // 最初のエラーメッセージを返す
            return error.errors[0].message;
        }
        throw error;
    }
}


/**
 * 投稿にコメントを追加する
 *
 * @param postId - コメントを追加する投稿のID
 * @param content - コメントの内容
 * @param callbackUrl - コールバックURL（オプション）
 * @returns コメントが成功したらtrue、バリデーションエラーがある場合はエラーメッセージ
 * @throws {Error} コメントの追加に失敗した場合
 *
 * @example
 * // 成功例
 * const result = await addComment(
 *   123,
 *   "この投稿は非常に参考になりました。ありがとうございます！",
 *   "/post/123"
 * );
 * console.log(result); // true
 *
 * @example
 * // バリデーションエラーの例
 * const result = await addComment(
 *   456,
 *   "短い",
 *   "/post/456"
 * );
 * console.log(result); // "コメントは5文字以上必要です"
 */
export async function addComment(postId: number, content: string, callbackUrl?: string): Promise<boolean> {
    console.log(content)
    const session = await getServerSession(authOptions);
    if (!session) {
        const loginUrl = new URL(`${process.env.NEXT_PUBLIC_URL}/signin`);
        if (callbackUrl) {
            loginUrl.searchParams.append('callbackUrl', callbackUrl)
        }
        redirect(loginUrl.href);
    }

    const CommentSchema = z.object({
        content: z.string().min(5, "コメントは5文字以上必要です").max(1000, "コメントは1000文字までです。"),
        postId: z.number(),
    });

    try {

        const validatedData = CommentSchema.parse({
            content,
            postId,
        });

        const res = await fetch(`${baseApiUrl}/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: validatedData.content,
                postId: validatedData.postId
            }),
        });

        if (!res.ok) {
            throw new Error('コメントの追加に失敗しました。');
        }

        return true;
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(error.errors[0].message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('予期せぬエラーが発生しました。');
    }
}


/**
 * 投稿をブックマークする
 *
 * @param postId - ブックマークしたい投稿のID
 * @returns ブックマークできたらtrue できなかったらfalse
 * @throws {Error} 投稿の取得に失敗した場合
 */
export async function addBookmark(postId: number): Promise<boolean> {
    const session = await getServerSession(authOptions);
    if (!session) {
        const loginUrl = `${process.env.NEXT_PUBLIC_URL}/signin/?callbackUrl=${process.env.NEXT_PUBLIC_URL}/post/${postId}`
        redirect(loginUrl);
    }
    const res = await fetch(`${baseApiUrl}/posts/${postId}/bookmark`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('Failed to add bookmark');
    }
    return res.ok;
}


/**
 * コメントに返信を追加する
 *
 * @param commentId - 返信を追加するコメントのID
 * @param content - 返信の内容
 * @param callbackUrl - コールバックURL（オプション）
 * @returns 返信が成功したらtrue、バリデーションエラーがある場合はエラーメッセージ
 * @throws {Error} 返信の追加に失敗した場合
 *
 * @example
 * // 成功例
 * const result = await addReply(
 *   456,
 *   "このコメントに同意します。さらに補足すると...",
 *   "/post/123#comment-456"
 * );
 * console.log(result); // true
 *
 * @example
 * // バリデーションエラーの例
 * const result = await addReply(
 *   789,
 *   "短い",
 *   "/post/123#comment-789"
 * );
 * console.log(result); // "返信は5文字以上必要です"
 */
export async function addReply(commentId: number, content: string, callbackUrl?: string): Promise<boolean | string> {
    const session = await getServerSession(authOptions);
    if (!session) {
        const loginUrl = new URL(`${process.env.NEXT_PUBLIC_URL}/signin`);
        if (callbackUrl) {
            loginUrl.searchParams.append('callbackUrl', callbackUrl)
        }
        redirect(loginUrl.href);
    }

    const ReplySchema = z.object({
        content: z.string().min(5, "返信は5文字以上必要です").max(1000, "返信は1000文字までです。"),
        commentId: z.number(),
    });

    try {

        const validatedData = ReplySchema.parse({
            content,
            commentId,
        });

        const res = await fetch(`${baseApiUrl}/posts/comments/${commentId}/replies`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: validatedData.content,
                postId: validatedData.commentId
            }),
        });

        if (!res.ok) {
            throw new Error('返信の追加に失敗しました。');
        }

        return true;
    } catch (error) {
        if (error instanceof z.ZodError) {
            // 最初のエラーメッセージを返す
            return error.errors[0].message;
        }
        throw error;
    }
}