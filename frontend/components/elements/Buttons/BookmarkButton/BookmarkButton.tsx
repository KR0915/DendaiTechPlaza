import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface BookmarkButtonProps {
    isBookmarked: boolean;
    onToggle: () => void;
    isLoading: boolean;
}

export default function BookmarkButton({ isBookmarked, onToggle, isLoading }: BookmarkButtonProps) {
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            disabled={isLoading}
            className={`transition-colors ${isBookmarked ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-400 hover:text-gray-500'}`}
            aria-label={isBookmarked ? "ブックマークを解除" : "ブックマークに追加"}
        >
            <Star className="h-6 w-6" fill={isBookmarked ? 'currentColor' : 'none'} />
            <span className="sr-only">{isBookmarked ? "ブックマークを解除" : "ブックマークに追加"}</span>
        </Button>
    )
}