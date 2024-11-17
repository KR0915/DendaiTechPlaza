'use client'
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";


export default function Home() {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/signin' })
  }
  return (
    <Button onClick={handleSignOut}>SignOut</Button>
  );
}
