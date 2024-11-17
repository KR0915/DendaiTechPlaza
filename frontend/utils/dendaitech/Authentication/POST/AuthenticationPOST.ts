'use server';

import { z } from "zod";


// APIへのURLを宣言
const baseApiUrl: string = `${process.env.SPRING_REST_API_URL}`;

/**
 * 新しいユーザーを追加する
 * 
 * @param username - ユーザー名
 * @param email - メールアドレス（東京電機大学の学生メールアドレス形式）
 * @param password - パスワード
 * @param commonPassword - 共通パスワード（学生用または管理者用）
 * @param role - ユーザーの役割（'student' または 'admin'）
 * @param callbackUrl - コールバックURL（オプション）
 * @returns 追加が成功した場合はtrue、バリデーションエラーの場合はエラーメッセージ
 * @throws {Error} ユーザーの追加に失敗した場合
 * 
 * @example
 * // 成功例
 * const result = await addUser(
 *   "john_doe",
 *   "21ec001@ms.dendai.ac.jp",
 *   "SecurePass1!",
 *   process.env.COMMON_STUDENT_PASSWORD,
 *   "student"
 * );
 * console.log(result); // true
 * 
 * @example
 * // バリデーションエラーの例
 * const result = await addUser(
 *   "jo",
 *   "invalid@email.com",
 *   "weakpass",
 *   "wrongcommonpass",
 *   "invalid_role"
 * );
 * console.log(result); // "ユーザー名は3文字以上必要です"
 */
export async function addUser(username: string, email: string, password: string, commonPassword: string, role: string, callbackUrl?: string): Promise<boolean | string> {
    const departmentCodes = ['ad', 'aj', 'ek', 'ef', 'es', 'ec', 'ej', 'eh', 'fi', 'fa', 'fr', 'nc', 'nm', 'ne', 'rb', 're', 'rd', 'ru', 'rm', 'rg'];

    const registerSchema = z.object({
        username: z.string().min(3, "ユーザー名は3文字以上必要です").max(30, "ユーザー名は30文字までです。"),
        email: z.string().refine(
            (email) => {
                const regex = new RegExp(`^\\d{2}(${departmentCodes.join('|')})\\d{3}@ms\\.dendai\\.ac\\.jp$`);
                return regex.test(email.toLowerCase());
            },
            {
                message: "メールアドレスは '99xx999@ms.dendai.ac.jp' の形式で、xxは指定された学科コードのいずれかである必要があります。"
            }
        ),
        password: z.string()
            .min(8, "パスワードは最低8文字以上である必要があります。")
            .regex(/[A-Z]/, "パスワードは少なくとも1つの大文字を含む必要があります。")
            .regex(/[a-z]/, "パスワードは少なくとも1つの小文字を含む必要があります。")
            .regex(/[0-9]/, "パスワードは少なくとも1つの数字を含む必要があります。")
            .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/, "パスワードは少なくとも1つの特殊文字(!@#$%^&*()_+-=[]{};\':\"\\|,.<>/?)を含む必要があります。"),
        commonPassword: z.enum([`${process.env.COMMON_STUDENT_PASSWORD}`, `${process.env.COMMON_ADMIN_PASSWORD}`], {
            errorMap: () => ({ message: "入力された共通パスワードは不適切です" })
        }),
        role: z.enum(['student', 'admin'], {
            errorMap: () => ({ message: "入力されたロールは不適切です" })
        }),
    });

    try {
        // すべてのデータを一度にバリデーション
        const validatedData = registerSchema.parse({
            username,
            email,
            password,
            commonPassword,
            role
        });

        const res = await fetch(`${baseApiUrl}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: validatedData.username,
                email: validatedData.email,
                password: validatedData.password,
                commonPassword: validatedData.commonPassword,
                role: validatedData.role
            }),
        });

        if (!res.ok) {
            throw new Error('ユーザーの追加に失敗しました。');
        }
        // TODO ユーザーのアイコン画像追加処理を書く public/user/id.webpに保存する。

        return true;
    } catch (error) {
        if (error instanceof z.ZodError) {
            // 最初のエラーメッセージを返す
            return error.errors[0].message;
        }
        throw error;
    }
}