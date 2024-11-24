'use server';
import { authOptions } from "@/lib/auth";
import { copyFile } from "fs/promises";
import { getServerSession } from "next-auth";
import path from "path";

export default async function GenarateIcon(): Promise<boolean> {
    const session = await getServerSession(authOptions);
    if (!session) {
        return false;
    }
    try {
        console.log("tyoke")
        const publicDir = path.join(process.cwd(), 'public/user/icons');

        const sourceFile = path.join(publicDir, 'base.webp');
        const destinationFile = path.join(publicDir, `${session.user.id}.webp`);
        await copyFile(sourceFile, destinationFile);
        return true;
    } catch {
        console.error('The file could not be copied');
        return false;
    }
}