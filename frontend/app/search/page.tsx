import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function search() {
  const yearOptions = [
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
  ];

  const departmentOptions = [
    { value: "FI", label: "FI" },
    { value: "SE", label: "SE" },
    { value: "CS", label: "CS" },
  ];

  const gradeOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  const semesterOptions = [
    { value: "前期", label: "前期" },
    { value: "後期", label: "後期" },
  ];
  return (
    <div className="bg-slate-200 min-h-screen">
      <div className="space-y-2 p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="キーワード or 投稿ID" className="pl-10 w-full" />
        </div>
      </div>
    </div>
  );
}
