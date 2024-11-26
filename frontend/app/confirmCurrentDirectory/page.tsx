import CheckCurrentDirectory from "@/utils/file/CheckCurrentDirectory";


export default async function post() {
    const Direcory = await CheckCurrentDirectory();
    return (
        <>
        <div>このページはワークスペースのディレクトリー確認のページである。開発中の確認のみに用いること</div>
        <h1>以下である。</h1>
        <div>
            {Direcory}
        </div>
        </>
    );
}