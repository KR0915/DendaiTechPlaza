'use client'

import { Button } from '@/components/ui/button';
import { deleteBookmark } from '@/utils/dendaitech/Post/DELETE/PostDELTE';
import { getIsBookmark } from '@/utils/dendaitech/Post/GET/PostGET';
import { addBookmark } from '@/utils/dendaitech/Post/POST/PostPOST';
import { useEffect, useState } from 'react';
import StarButton from './StarButton';

interface BookmarkButtonProps {
    postId: number;
}

export default function BookmarkButton({ postId }: BookmarkButtonProps) {
    const [isBookmark, setIsBookmark] = useState<boolean>(false);

    useEffect(() => {
        const fetchBookmarkStatus = async () => {
            try {
                const isPreBookmark = await getIsBookmark(postId);
                setIsBookmark(isPreBookmark);
            } catch (error) {
                console.error('Error fetching bookmark status:', error);
            }
        };

        fetchBookmarkStatus();
    }, [postId])

    const pushBookmark = async () => {
        if (isBookmark == false) {
            await addBookmark(postId);
        } else {
            await deleteBookmark(postId);
        }
        setIsBookmark(!isBookmark)
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={pushBookmark}
        >
            <StarButton isBookmark={isBookmark}></StarButton>
            <span className="sr-only">ブックマーク</span>
        </Button>
    )
}