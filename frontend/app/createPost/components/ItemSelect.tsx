import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DepartmentSelectProps {
    data: string[];
    labelName: string;
    value: string;
    onChange: (value: string) => void;
}

export function ItemSelect({labelName, data, value, onChange }: DepartmentSelectProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={`${labelName}`} />
            </SelectTrigger>
            <SelectContent>
                {data.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                        {dept}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

