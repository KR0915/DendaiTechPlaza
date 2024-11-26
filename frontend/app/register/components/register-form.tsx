'use client'

import SubmitButton from "@/components/elements/Buttons/SubmitButton/SubmitButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addUser } from "@/utils/dendaitech/Authentication/POST/AuthenticationPOST"
import GenarateIcon from "@/utils/file/GenarateIcon"
import { signIn } from 'next-auth/react'
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import { useState } from 'react'

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [commonPassword, setCommonPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<Error>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || process.env.NEXT_PUBLIC_URL as string;




    // TODO 新規登録の実装
    const handleOAuthRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const isAddUser = await addUser(userName, userEmail, password, commonPassword, "student");
            if (isAddUser) {
                const result = await signIn("credentials", {
                    redirect: false,
                    userEmail,
                    password
                });
                if (result?.ok) {
                    try {
                        console.log("1111111111111111111111111111111");
                        const genatateAction = await GenarateIcon();
                        if (genatateAction) {
                            console.log("Icon111111111111111111111");
                            router.push(callbackUrl);
                        }
                    } catch (error) {
                        if (error instanceof Error) {
                            setErrorMessage(error);
                        }
                    }
                }
                if (result?.error) {
                    console.error(result.error);
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full md:w-3/5 max-w-4xl md:h-4/5">
            <CardHeader>
                <CardTitle>
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="text-DendaiTechBlue">電大テックプラザ</span>
                    </h1>
                    <p>電大テックプラザにアカウントを登録する</p>
                </CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
                <form onSubmit={handleOAuthRegister} className="space-y-2">
                    <div className="space-y-2">
                        <Label htmlFor="userName" className="block text-left font-bold">ユーザー名</Label>
                        <Input
                            id="userName"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="block text-left font-bold">メールアドレス</Label>
                        <Input
                            id="email"
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="block text-left font-bold">パスワード</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="block text-left font-bold">共通パスワード</Label>
                        <Input
                            id="commonPassword"
                            type="password"
                            value={commonPassword}
                            onChange={(e) => setCommonPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-red-500">
                        {errorMessage && `${errorMessage}`}
                    </div>
                    <div className="space-y-2">
                        <div className="mt-16 grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <SubmitButton preText={"新規登録"} postText={"新規登録中..."} disabled={isLoading} padding="px-12" width="w-full"></SubmitButton>
                            </div>
                            <div>
                                <Link href={"/signin"}>
                                    <Button variant="outline" className="px-12 text-slate-400 w-full">キャンセル</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}