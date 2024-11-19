'use client';
import { signOut } from "next-auth/react";
import { useState } from "react";
import SubmitButton from "../SubmitButton/SubmitButton";

export default function SignOutButton() {
    const [isSignout, setIsSignout] = useState<boolean>(false);

    const handleSignOut = () => {
        setIsSignout(true);
        try {
            signOut({ callbackUrl: '/signin' })
        } catch (error) {
            console.error("Error during sign out:", error);
        } finally {
            setIsSignout(false);
        }
    }
    return (
        <form onSubmit={handleSignOut}>
            <SubmitButton preText={"ログアウト"} postText={"ログアウト中"} disabled={isSignout}></SubmitButton>
        </form>
    )
}