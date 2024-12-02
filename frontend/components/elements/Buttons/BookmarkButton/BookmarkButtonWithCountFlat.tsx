'use client';
import StarButton from "@/components/elements/Buttons/BookmarkButton/StarButton";
import { Button } from "@/components/ui/button";
import { deleteBookmark } from "@/utils/dendaitech/Post/DELETE/PostDELTE";
import { getIsBookmark } from "@/utils/dendaitech/Post/GET/PostGET";
import { addBookmark } from "@/utils/dendaitech/Post/POST/PostPOST";
import { useEffect, useState } from "react";

interface bookmarkCountButtonProps {
    count: number;
    postId: number;
}

export default function BookmarkButtonWithCountFlat({ count, postId }: bookmarkCountButtonProps) {
    const [bookmarkCount, setBookmarkCount] = useState<number>(count);
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
        try {
            if (isBookmark == false) {
                await addBookmark(postId);
                setBookmarkCount((prevCount) => prevCount + 1);
            } else {
                await deleteBookmark(postId);
                setBookmarkCount((prevCount) => prevCount - 1);
            }
            setIsBookmark(!isBookmark)
        } catch (error) {
            console.error('Error fetching bookmark status:', error);
        }
    }

    return (
        <Button variant="ghost" className="flex gap-2 my-auto" onClick={pushBookmark}>
            <StarButton isBookmark={isBookmark} color="DendaiTechBlue" />
            <span className="sr-only">ブックマーク</span>
            {isBookmark
                ? <div className="font-bold text-DendaiTechBlue">{bookmarkCount}</div>
                : <div className="text-black">{bookmarkCount}</div>
            }
        </Button>
    );
}