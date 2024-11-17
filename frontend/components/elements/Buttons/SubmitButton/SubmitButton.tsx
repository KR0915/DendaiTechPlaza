import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps{
    preText:string;
    postText:string;
    disabled:boolean;
    padding?:string;
    baseColor?:string;
    hoverColor?:string;
    textColor?:string;
}

export default function SubmitButton({preText, postText, disabled, padding, baseColor, hoverColor, textColor}:SubmitButtonProps) {
    return (
        <Button type="submit" className={`${padding} ${baseColor} ${hoverColor} ${textColor}`} disabled={disabled}>
            {disabled ? (
                <><div className="flex">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {`${postText}`}...
                </div>
                </>
            ) : (
                `${preText}`
            )}
        </Button>
    )
}