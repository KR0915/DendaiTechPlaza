'use client'

import BookmarkButton from "@/components/elements/Buttons/BookmarkButton/BookmarkButton";
import { deleteBookmark } from "@/utils/dendaitech/Post/DELETE/PostDELTE";
import { getIsBookmark } from "@/utils/dendaitech/Post/GET/PostGet";
import { addBookmark } from "@/utils/dendaitech/Post/POST/PostPOST";
import { useEffect, useState } from "react";

export default function Post({ params }: { params: { id: string } }) {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBookmarkStatus = async () => {
            try {
                const status = await getIsBookmark(params.id);
                setIsBookmarked(status);
            } catch (error) {
                console.error('Error fetching bookmark status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookmarkStatus();
    }, [params.id]);

    const handleBookmarkToggle = async () => {
        setIsLoading(true);
        try {
            if (isBookmarked) {
                await deleteBookmark(params.id);
            } else {
                await addBookmark(params.id);
            }
            setIsBookmarked(!isBookmarked);
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">投稿番号 {params.id}</h1>
            <p className="mb-4">このページは投稿番号{params.id}番のページです。</p>
            <BookmarkButton 
                isBookmarked={isBookmarked} 
                onToggle={handleBookmarkToggle} 
                isLoading={isLoading}
            />
        </div>
    );
}