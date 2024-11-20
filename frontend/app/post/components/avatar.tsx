import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type AvatarSize = "sm" | "md" | "lg" | "xl"

interface AvatarPostprops {
    src: string
    alt: string
    fallback: string
    size?: AvatarSize
}

const sizeClasses: Record<AvatarSize, string> = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
}

export default function AvatarPost({ src, alt, fallback, size = "md" }: AvatarPostprops) {
    return (
        <Avatar className={sizeClasses[size]}>
            <AvatarImage src={`${src}`} alt={alt} />
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    )
}