'use server';

export default async function CheckCurrentDirectory(): Promise<string> {
    return `Current directory: ${process.cwd()}`
}