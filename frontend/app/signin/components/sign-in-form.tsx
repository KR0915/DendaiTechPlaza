'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function SignInForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const handleOAuthSignIn = async () => {
        setIsLoading(true)
        try {
            await signIn("credentials", {
                username,
                password,
                callbackUrl: "/"
            })
        } catch (error) {
            console.error("Error during sign in:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
                <form onSubmit={handleOAuthSignIn}>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="mt-5"
                    />
                    <Button type="submit"  disabled={isLoading} className="mt-5">Sign In</Button>
                </form>
            </CardContent>
        </Card>
    )
}