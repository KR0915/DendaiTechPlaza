'use client'

import { Button } from '@/components/ui/button';
import { deleteBookmark } from '@/utils/dendaitech/Post/DELETE/PostDELTE';
import { getIsBookmark } from '@/utils/dendaitech/Post/GET/PostGet';
import { addBookmark } from '@/utils/dendaitech/Post/POST/PostPOST';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BookmarkButtonProps {
    postId: string;
}

export default function BookmarkButton({ postId }: BookmarkButtonProps) {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchBookmarkStatus(postId: string) {
            try {
                const isBookmark = await getIsBookmark(postId);
                setIsBookmarked(isBookmark);
            } catch (error) {
                console.error('Error fetching bookmark status:', error);
            }
        }

        fetchBookmarkStatus(postId);
    }, [postId]);

    const toggleBookmark = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            if (isBookmarked) {
                await deleteBookmark(postId);

            } else {
                await addBookmark(postId);

            }
            setIsBookmarked(!isBookmarked);
        } catch (error) {
            console.error('Error toggling bookmark:', error);

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleBookmark}
            disabled={isLoading}
            className={`transition-colors ${isBookmarked ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-400 hover:text-gray-500'}`}
        >
            <Star className="h-6 w-6" fill={isBookmarked ? 'currentColor' : 'none'} />
            <span className="sr-only">ブックマーク</span>
        </Button>
    )
}