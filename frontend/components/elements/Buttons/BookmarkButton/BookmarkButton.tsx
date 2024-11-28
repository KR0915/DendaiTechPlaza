'use client';
import { Button } from '@/components/ui/button';
import { deleteBookmark } from '@/utils/dendaitech/Post/DELETE/PostDELTE';
import { getIsBookmark } from '@/utils/dendaitech/Post/GET/PostGET';
import { addBookmark } from '@/utils/dendaitech/Post/POST/PostPOST';
import { useEffect, useState } from 'react';
import StarButton from './StarButton';

interface BookmarkButtonProps {
    postId: number;
    State: boolean;
    OnClickBookmarkButton?: (postId: number, type: string) => void;
}

export default function BookmarkButton({ postId, State, OnClickBookmarkButton }: BookmarkButtonProps) {
    const [bookmarkStatus, setBookmarkStatus] = useState<boolean>(State);
    useEffect(() => {
        const fetchBookmarkStatus = async () => {
            try {
                if (!OnClickBookmarkButton) {
                    const isPreBookmark = await getIsBookmark(postId);
                    setBookmarkStatus(isPreBookmark);
                }
            } catch (error) {
                console.error('Error fetching bookmark status:', error);
            }
        };

        fetchBookmarkStatus();
    }, [OnClickBookmarkButton, postId])


    const pushBookmark = async () => {
        if (State == false) {
            await addBookmark(postId);
            if (OnClickBookmarkButton) {
                OnClickBookmarkButton(postId, "add");
            } else {
                setBookmarkStatus(true);
            }
        } else {
            await deleteBookmark(postId);
            if (OnClickBookmarkButton) {
                OnClickBookmarkButton(postId, "delete");
            } else {
                setBookmarkStatus(false);
            }
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={pushBookmark}
        >
            <StarButton isBookmark={OnClickBookmarkButton ? State :bookmarkStatus} color='DendaiTechBlue'></StarButton>
            <span className="sr-only">ブックマーク</span>
        </Button>
    )
}