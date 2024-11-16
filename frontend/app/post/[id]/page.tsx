import BookmarkButton from "@/components/elements/Buttons/BookmarkButton/BookmarkButton";

export default async function post({ params }: { params: Promise<{ id: string }> }) {
    const postParams = await params;

    return (
        <><div>このページは投稿番号{`${postParams.id}`}番のページである。</div>
        <BookmarkButton postId={`${postParams.id}`} /></>
    );
}