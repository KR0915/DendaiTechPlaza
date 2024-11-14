import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function post({ params }: { params: Promise<{ id: string }> }) {
    const postParams = await params;
    const session = await getServerSession(authOptions);

    console.log(JSON.stringify(session));
    return (
        <div>このページは投稿番号{`${postParams.id}`}番のページである。</div>
    );
}