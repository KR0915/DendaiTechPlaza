'use client'

import { Button } from '@/components/ui/button';
import { deleteBookmark } from '@/utils/dendaitech/Post/DELETE/PostDELTE';
import { addBookmark } from '@/utils/dendaitech/Post/POST/PostPOST';
import { useState } from 'react';
import StarButton from './StarButton';

interface BookmarkButtonProps {
    postId: number;
    InitialState: boolean;
}

export default function BookmarkButton({ postId, InitialState}: BookmarkButtonProps) {
    const [isBookmark, setIsBookmark] = useState<boolean>(InitialState);

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
            <StarButton isBookmark={isBookmark} color='DendaiTechBlue'></StarButton>
            <span className="sr-only">ブックマーク</span>
        </Button>
    )
}