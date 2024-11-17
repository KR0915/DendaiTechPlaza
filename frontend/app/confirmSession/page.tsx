import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";


export default async function post() {
    const Session = await getServerSession(authOptions);
    if (!Session) {
        return <p>セッション無いよ</p>
    }

    const SessionJson = await JSON.stringify(Session);
    const SessionJsonParse = await JSON.parse(SessionJson);
    const userData = await JSON.stringify(SessionJsonParse.user);
    return (
        <>
        <div>このページはセッション確認のページである。開発中の確認のみに用いること</div>
        <h1>以下が生セッションである。</h1>
        <div>
            {SessionJson}
        </div>

        <h1>以下がセッションからユーザーデータを取り出したものである。</h1>
        <div>
            {userData}
        </div>
        </>
    );
}