'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from 'next-auth/react'
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from 'react'

export default function SignInForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userEmail, setUserEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';



    const handleOAuthSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await signIn("credentials", {
                userEmail,
                password,
                callbackUrl: `${callbackUrl}`
            });
            if (result?.error) {
                console.error(result.error);
            }
        } catch (error) {
            console.error("Error during sign in:", error);
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
                    <p>電大テックプラザにログイン</p>
                </CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
                <form onSubmit={handleOAuthSignIn} className="space-y-2">
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
                        <Button type="submit" disabled={isLoading} className="mt-10 px-12 bg-DendaiTechBlue hover:bg-DendaiTechBlue/75">ログイン</Button>
                    </div>
                    <div className="space-y-2">
                        <Link href={"/register"}>
                            <Button variant="outline" className="px-12">新規登録</Button>
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}