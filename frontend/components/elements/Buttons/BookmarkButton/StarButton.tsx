import { Star } from "lucide-react";

interface StarButtonProps {
    isBookmark: boolean;
}

export default function StarButton({ isBookmark }: StarButtonProps) {
    return (
        <div className={`transition-colors ${isBookmark ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-400 hover:text-gray-500'}`}>
            <Star className="h-6 w-6" fill={isBookmark ? 'currentColor' : 'none'} />
        </div>
    );
}