import AuthWrapper from "@/app/signin/components/auth-wrapper"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-200">
            <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
                <AuthWrapper initialSession={session} />
            </main>
        </div>
    )
}