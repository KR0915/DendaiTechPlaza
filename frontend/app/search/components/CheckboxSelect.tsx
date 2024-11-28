import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

//label:1(年度),FI(学科)等 (utils/searchUtils.tsを参照)
//value:上記と同様
//onValueChange:ドロップダウンで選択変更時に選択した値を受ける
//checkeḍ:チェックボックスの状態(選択されているか、されていないか)
//onChecked:チェックボックスの状態の変更時に値を受ける
interface CheckboxSelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  options: { value: string; label: string }[];
}

//チェックボックスとドロップダウンをまとめたコンポーネント
export function CheckboxSelect({
  label,
  value,
  onValueChange,
  checked,
  onCheckedChange,
  options,
}: CheckboxSelectProps) {
  return (
    <div className="mt-4 flex flex-col gap-1.5">
      <label className="pl-6 text-sm font-medium">{label}</label>
      <div className="flex items-center gap-2">
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
          className="rounded-sm"
        />
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder={label} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
