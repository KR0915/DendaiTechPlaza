import AuthWrapper from "@/app/signin/components/auth-wrapper"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-4xl font-bold mb-8">
                    Welcome to <span className="text-blue-600">DendaiTechPlaza!</span>
                </h1>

                <AuthWrapper initialSession={session} />
            </main>
        </div>
    )
}