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
    const [isLiked, setIsLiked] = useState<boolean>(false);

    useEffect(() => {
        const fetchBookmarkStatus = async () => {
            try {
                const isBookmark = await getIsBookmark(postId);
                setIsLiked(isBookmark);
            } catch (error) {
                console.error('Error fetching bookmark status:', error);
            }
        };

        fetchBookmarkStatus();
    }, [])

    const pushLike = async () => {
        if (isLiked == false) {
            await addBookmark(postId);
        } else {
            await deleteBookmark(postId);
        }
        setIsLiked(!isLiked)
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={pushLike}
            className={`transition-colors ${isLiked ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-400 hover:text-gray-500'}`}
        >
            <Star className="h-6 w-6" fill={isLiked ? 'currentColor' : 'none'} />
            <span className="sr-only">ブックマーク</span>
        </Button>
    )
}