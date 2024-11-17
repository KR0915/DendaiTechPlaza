import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function SubmitButton(preText: string, postText: string, disabled: boolean) {
    return (
        <Button type="submit" disabled={disabled}>
            {disabled ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {`${postText}`}...
                </>
            ) : (
                `${preText}`
            )}
        </Button>
    )
}