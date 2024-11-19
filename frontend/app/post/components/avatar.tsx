import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AvatarPostprops{
    image:string;
}

export default function AvatarPost({image}:AvatarPostprops) {
    return (
        <Avatar>
            <AvatarImage src={`${image}`} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}