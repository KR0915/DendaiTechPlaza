'use client'

import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import RegisterForm from "./register-form"

interface AuthWrapperProps {
    initialSession: Session | null
}

export default function AuthWrapper({ initialSession }: AuthWrapperProps) {
    const { data: session } = useSession()

    

    // セッションデータが利用可能になるまで、初期セッションを使用
    const currentSession = session ?? initialSession

    if (!currentSession) {
        return <RegisterForm />
    }
}