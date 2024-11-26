import { Button } from '@/components/ui/button';
import { deleteBookmark } from '@/utils/dendaitech/Post/DELETE/PostDELTE';
import { addBookmark } from '@/utils/dendaitech/Post/POST/PostPOST';
import StarButton from './StarButton';

interface BookmarkButtonProps {
    postId: number;
    State: boolean;
    OnClickBookmarkButton?: (postId: number, type: string) => void;
}

export default function BookmarkButton({ postId, State, OnClickBookmarkButton }: BookmarkButtonProps) {

    const pushBookmark = async () => {
        if (State == false) {
            await addBookmark(postId);
            if (OnClickBookmarkButton) {
                OnClickBookmarkButton(postId, "add");
            }
        } else {
            await deleteBookmark(postId);
            if (OnClickBookmarkButton) {
                OnClickBookmarkButton(postId, "delete");
            }
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={pushBookmark}
        >
            <StarButton isBookmark={State} color='DendaiTechBlue'></StarButton>
            <span className="sr-only">ブックマーク</span>
        </Button>
    )
}