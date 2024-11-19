import { Star } from "lucide-react";

interface StarButtonProps {
    isBookmark: boolean;
    color?: string;
}

export default function StarButton({ isBookmark, color }: StarButtonProps) {
    if (color === 'DendaiTechBlue') {
        return (
            <div className={`transition-colors ${isBookmark ? 'text-DendaiTechBlue hover:text-DendaiTechBlue' : 'text-gray-400 hover:text-gray-500'}`}>
                <Star className="h-6 w-6" fill={isBookmark ? 'currentColor' : 'none'} />
            </div>
        );
    } else {
        return (
            <div className={`transition-colors ${isBookmark ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-400 hover:text-gray-500'}`}>
                <Star className="h-6 w-6" fill={isBookmark ? 'currentColor' : 'none'} />
            </div>
        );
    }
}